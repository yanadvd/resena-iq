import { prisma } from "../prisma";
import { analyzeReviews, type AnalyzableReview } from "../analysis/sentiment";
import { getAdapter, type RawReview } from "./sources";
import { reviewIngestAllowance } from "../usage";
import { sendEmail, negativeReviewEmail } from "../email";
import { planHasFeature } from "../plans";
import type { Organization, ReviewSource } from "@prisma/client";

export interface IngestResult {
  fetched: number;
  created: number;
  skippedDuplicate: number;
  skippedQuota: number;
  analyzed: number;
  alertsSent: number;
}

/**
 * Inserta reseñas crudas, evitando duplicados (sourceId+externalId),
 * respetando la cuota mensual del plan, ejecuta el análisis de IA y dispara
 * alertas por reseñas negativas. Es el núcleo que conecta automatización,
 * IA y alertas.
 */
export async function ingestRawReviews(
  org: Organization,
  source: ReviewSource,
  raw: RawReview[]
): Promise<IngestResult> {
  const result: IngestResult = {
    fetched: raw.length,
    created: 0,
    skippedDuplicate: 0,
    skippedQuota: 0,
    analyzed: 0,
    alertsSent: 0,
  };

  if (raw.length === 0) return result;

  // 1) Cuota del plan
  const allowance = await reviewIngestAllowance(org.id, org.plan);
  let remaining = allowance;

  // 2) Dedupe contra lo ya existente
  const externalIds = raw.map((r) => r.externalId);
  const existing = await prisma.review.findMany({
    where: { sourceId: source.id, externalId: { in: externalIds } },
    select: { externalId: true },
  });
  const existingSet = new Set(existing.map((e) => e.externalId));

  const toInsert = raw.filter((r) => {
    if (existingSet.has(r.externalId)) {
      result.skippedDuplicate++;
      return false;
    }
    if (remaining <= 0) {
      result.skippedQuota++;
      return false;
    }
    remaining--;
    return true;
  });

  if (toInsert.length === 0) return result;

  // 3) Persistir (sin analizar todavía)
  const created = await prisma.$transaction(
    toInsert.map((r) =>
      prisma.review.create({
        data: {
          orgId: org.id,
          sourceId: source.id,
          externalId: r.externalId,
          source: source.type,
          author: r.author,
          rating: r.rating,
          text: r.text,
          language: r.language ?? "es",
          publishedAt: r.publishedAt,
        },
      })
    )
  );
  result.created = created.length;

  // 4) Análisis IA / NLP
  const analyzable: AnalyzableReview[] = created.map((r) => ({
    id: r.id,
    rating: r.rating,
    text: r.text,
  }));
  const analyses = await analyzeReviews(analyzable);

  await prisma.$transaction(
    created.map((r) => {
      const a = analyses.get(r.id);
      return prisma.review.update({
        where: { id: r.id },
        data: {
          processed: true,
          sentiment: a?.sentiment ?? "NEUTRAL",
          sentimentScore: a?.sentimentScore ?? 0,
          themes: a?.themes ?? [],
          keywords: a?.keywords ?? [],
        },
      });
    })
  );
  result.analyzed = created.length;

  // 5) Alertas por reseñas negativas
  if (org.alertsEnabled && org.alertEmail) {
    const threshold = planHasFeature(org.plan, "customAlerts")
      ? org.alertRatingThreshold
      : 2; // sin plan custom, alerta solo en 1-2 estrellas
    for (const r of created) {
      const a = analyses.get(r.id);
      const isNegative =
        r.rating <= threshold || a?.sentiment === "NEGATIVE";
      if (!isNegative) continue;

      const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/reviews`;
      const sent = await sendEmail({
        to: org.alertEmail,
        subject: `⚠ Nueva reseña negativa (${r.rating}★) — ${org.name}`,
        html: negativeReviewEmail({
          businessName: org.name,
          author: r.author ?? "Anónimo",
          rating: r.rating,
          source: source.label,
          text: r.text,
          dashboardUrl,
        }),
      });
      await prisma.alert.create({
        data: {
          orgId: org.id,
          reviewId: r.id,
          type: "NEGATIVE_REVIEW",
          sentTo: org.alertEmail,
          message: `Reseña ${r.rating}★ de ${r.author ?? "Anónimo"} en ${source.label}`,
        },
      });
      if (sent) result.alertsSent++;
    }
  }

  // 6) Marcar la fuente como sincronizada
  await prisma.reviewSource.update({
    where: { id: source.id },
    data: { lastSyncedAt: new Date(), status: "CONNECTED" },
  });

  return result;
}

/** Sincroniza una fuente concreta: trae reseñas vía adaptador + ingiere. */
export async function syncSource(
  org: Organization,
  source: ReviewSource
): Promise<IngestResult> {
  const adapter = getAdapter(source.type);
  try {
    const raw = await adapter.fetchReviews(source, source.lastSyncedAt);
    return await ingestRawReviews(org, source, raw);
  } catch (err) {
    console.error(`[sync] error en fuente ${source.id}:`, err);
    await prisma.reviewSource.update({
      where: { id: source.id },
      data: { status: "ERROR" },
    });
    throw err;
  }
}

/** Sincroniza todas las fuentes activas de una organización. */
export async function syncOrganization(orgId: string): Promise<IngestResult> {
  const org = await prisma.organization.findUniqueOrThrow({
    where: { id: orgId },
  });
  const sources = await prisma.reviewSource.findMany({
    where: { orgId, type: { not: "CSV" }, status: { not: "DISCONNECTED" } },
  });

  const total: IngestResult = {
    fetched: 0,
    created: 0,
    skippedDuplicate: 0,
    skippedQuota: 0,
    analyzed: 0,
    alertsSent: 0,
  };
  for (const source of sources) {
    try {
      const r = await syncSource(org, source);
      total.fetched += r.fetched;
      total.created += r.created;
      total.skippedDuplicate += r.skippedDuplicate;
      total.skippedQuota += r.skippedQuota;
      total.analyzed += r.analyzed;
      total.alertsSent += r.alertsSent;
    } catch {
      // continúa con las demás fuentes
    }
  }
  return total;
}
