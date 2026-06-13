import { prisma } from "./prisma";
import { getPlanConfig, isUnlimited } from "./plans";
import { startOfMonth } from "./utils";
import type { Plan } from "@prisma/client";

export interface UsageSnapshot {
  reviewsThisMonth: number;
  maxReviewsPerMonth: number;
  sourcesUsed: number;
  maxSources: number;
  reviewsRemaining: number;
  sourcesRemaining: number;
  reviewsUnlimited: boolean;
  sourcesUnlimited: boolean;
}

/** Calcula el uso actual de una organización frente a los límites de su plan. */
export async function getUsage(orgId: string, plan: Plan): Promise<UsageSnapshot> {
  const cfg = getPlanConfig(plan);
  const monthStart = startOfMonth();

  const [reviewsThisMonth, sourcesUsed] = await Promise.all([
    prisma.review.count({
      where: { orgId, createdAt: { gte: monthStart } },
    }),
    prisma.reviewSource.count({
      where: { orgId, status: { not: "DISCONNECTED" } },
    }),
  ]);

  const reviewsUnlimited = isUnlimited(cfg.maxReviewsPerMonth);
  const sourcesUnlimited = isUnlimited(cfg.maxSources);

  return {
    reviewsThisMonth,
    maxReviewsPerMonth: cfg.maxReviewsPerMonth,
    sourcesUsed,
    maxSources: cfg.maxSources,
    reviewsRemaining: reviewsUnlimited
      ? Number.POSITIVE_INFINITY
      : Math.max(0, cfg.maxReviewsPerMonth - reviewsThisMonth),
    sourcesRemaining: sourcesUnlimited
      ? Number.POSITIVE_INFINITY
      : Math.max(0, cfg.maxSources - sourcesUsed),
    reviewsUnlimited,
    sourcesUnlimited,
  };
}

/**
 * ¿Cuántas reseñas nuevas puede ingerir esta org sin superar su cuota mensual?
 * Devuelve Infinity si el plan es ilimitado.
 */
export async function reviewIngestAllowance(
  orgId: string,
  plan: Plan
): Promise<number> {
  const usage = await getUsage(orgId, plan);
  return usage.reviewsRemaining;
}

export async function canAddSource(orgId: string, plan: Plan): Promise<boolean> {
  const usage = await getUsage(orgId, plan);
  return usage.sourcesUnlimited || usage.sourcesRemaining > 0;
}
