import { prisma } from "../prisma";
import { getOpenAI, OPENAI_MODEL } from "../openai";
import type { AnalysisSummary, Review } from "@prisma/client";

export interface SummaryPeriod {
  periodStart: Date;
  periodEnd: Date;
}

/**
 * Puntuación de reputación 0..100. Combina rating medio (peso alto),
 * proporción de sentimiento positivo y un pequeño bonus por volumen
 * (más reseñas = señal más fiable).
 */
export function computeReputationScore(
  avgRating: number,
  positivePct: number,
  negativePct: number,
  volume: number
): number {
  const ratingComponent = (avgRating / 5) * 70; // 0..70
  const sentimentComponent = (positivePct - negativePct) * 0.25; // -25..25 aprox
  const volumeBonus = Math.min(5, Math.log10(volume + 1) * 3); // 0..5
  const score = ratingComponent + sentimentComponent + volumeBonus;
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

function aggregateThemes(reviews: Review[]): { theme: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of reviews) {
    for (const t of r.themes) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Genera (y persiste) un resumen agregado para un periodo. Usa IA para la
 * narrativa de fortalezas/mejoras si OpenAI está configurado; si no, deriva
 * conclusiones de los temas por sentimiento.
 */
export async function generateSummary(
  orgId: string,
  period?: Partial<SummaryPeriod>
): Promise<AnalysisSummary> {
  const periodEnd = period?.periodEnd ?? new Date();
  const periodStart =
    period?.periodStart ??
    new Date(periodEnd.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 días

  const reviews = await prisma.review.findMany({
    where: { orgId, publishedAt: { gte: periodStart, lte: periodEnd } },
    orderBy: { publishedAt: "desc" },
  });

  const reviewCount = reviews.length;
  const avgRating =
    reviewCount > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviewCount
      : 0;

  const pos = reviews.filter((r) => r.sentiment === "POSITIVE").length;
  const neu = reviews.filter((r) => r.sentiment === "NEUTRAL").length;
  const neg = reviews.filter((r) => r.sentiment === "NEGATIVE").length;
  const positivePct = reviewCount ? (pos / reviewCount) * 100 : 0;
  const neutralPct = reviewCount ? (neu / reviewCount) * 100 : 0;
  const negativePct = reviewCount ? (neg / reviewCount) * 100 : 0;

  const reputationScore = computeReputationScore(
    avgRating,
    positivePct,
    negativePct,
    reviewCount
  );

  // Temas por sentimiento
  const positiveThemes = aggregateThemes(
    reviews.filter((r) => r.sentiment === "POSITIVE")
  );
  const negativeThemes = aggregateThemes(
    reviews.filter((r) => r.sentiment === "NEGATIVE")
  );
  const topThemes = aggregateThemes(reviews).slice(0, 6).map((t) => t.theme);

  let strengths = positiveThemes.slice(0, 4).map((t) => t.theme);
  let improvements = negativeThemes.slice(0, 4).map((t) => t.theme);
  let summaryText = "";

  const openai = getOpenAI();
  if (openai && reviewCount > 0) {
    try {
      const sample = reviews.slice(0, 40).map((r) => ({
        rating: r.rating,
        sentiment: r.sentiment,
        text: r.text.slice(0, 280),
      }));
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Eres un consultor de reputación. A partir de una muestra de reseñas, " +
              "produces un resumen ejecutivo en español. Devuelve SOLO JSON: " +
              '{"summary": string (2-3 frases), "strengths": string[] (3-5), "improvements": string[] (3-5)}.',
          },
          {
            role: "user",
            content: JSON.stringify({
              avgRating: Number(avgRating.toFixed(2)),
              reviewCount,
              positivePct: Math.round(positivePct),
              negativePct: Math.round(negativePct),
              reviews: sample,
            }),
          },
        ],
      });
      const parsed = JSON.parse(
        completion.choices[0]?.message?.content ?? "{}"
      ) as { summary?: string; strengths?: string[]; improvements?: string[] };
      if (parsed.summary) summaryText = parsed.summary;
      if (parsed.strengths?.length) strengths = parsed.strengths;
      if (parsed.improvements?.length) improvements = parsed.improvements;
    } catch (err) {
      console.error("[summary] fallo OpenAI, usando resumen heurístico:", err);
    }
  }

  if (!summaryText) {
    if (reviewCount === 0) {
      summaryText =
        "Aún no hay reseñas en este periodo. Conecta una fuente o importa un CSV para empezar a recibir análisis.";
    } else {
      const trend =
        positivePct >= 60
          ? "una percepción mayoritariamente positiva"
          : negativePct >= 40
            ? "señales de insatisfacción que conviene atender"
            : "una percepción mixta";
      summaryText =
        `Con ${reviewCount} reseñas y una calificación media de ${avgRating.toFixed(1)}/5, ` +
        `tu negocio muestra ${trend}. ` +
        (strengths.length ? `Destaca por: ${strengths.join(", ")}. ` : "") +
        (improvements.length ? `Áreas de mejora: ${improvements.join(", ")}.` : "");
    }
  }

  const summary = await prisma.analysisSummary.create({
    data: {
      orgId,
      periodStart,
      periodEnd,
      reviewCount,
      averageRating: Number(avgRating.toFixed(2)),
      reputationScore,
      positivePct: Number(positivePct.toFixed(1)),
      neutralPct: Number(neutralPct.toFixed(1)),
      negativePct: Number(negativePct.toFixed(1)),
      strengths,
      improvements,
      topThemes,
      summary: summaryText,
    },
  });

  return summary;
}
