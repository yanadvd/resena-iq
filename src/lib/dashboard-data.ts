import { prisma } from "./prisma";
import { computeReputationScore } from "./analysis/summary";
import { subMonths, format, startOfMonth, isAfter } from "date-fns";
import { es } from "date-fns/locale";
import type { Review } from "@prisma/client";

export interface OverviewData {
  totalReviews: number;
  averageRating: number;
  reputationScore: number;
  sentiment: { positive: number; neutral: number; negative: number };
  sentimentPct: { positive: number; neutral: number; negative: number };
  trend: { label: string; positive: number; neutral: number; negative: number }[];
  ratings: { rating: string; count: number }[];
  recentReviews: Review[];
  latestSummary: Awaited<ReturnType<typeof prisma.analysisSummary.findFirst>>;
  topThemes: { theme: string; count: number }[];
}

/** Agrega todas las métricas que muestra el dashboard a partir de la BD. */
export async function getOverview(orgId: string): Promise<OverviewData> {
  const [reviews, latestSummary] = await Promise.all([
    prisma.review.findMany({
      where: { orgId },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.analysisSummary.findFirst({
      where: { orgId },
      orderBy: { generatedAt: "desc" },
    }),
  ]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews
      : 0;

  const positive = reviews.filter((r) => r.sentiment === "POSITIVE").length;
  const neutral = reviews.filter((r) => r.sentiment === "NEUTRAL").length;
  const negative = reviews.filter((r) => r.sentiment === "NEGATIVE").length;
  const denom = totalReviews || 1;

  const reputationScore =
    latestSummary?.reputationScore ??
    computeReputationScore(
      averageRating,
      (positive / denom) * 100,
      (negative / denom) * 100,
      totalReviews
    );

  // Tendencia: últimos 6 meses
  const trend: OverviewData["trend"] = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(new Date(), i));
    const monthEnd = startOfMonth(subMonths(new Date(), i - 1));
    const inMonth = reviews.filter(
      (r) =>
        isAfter(r.publishedAt, monthStart) && !isAfter(r.publishedAt, monthEnd)
    );
    trend.push({
      label: format(monthStart, "LLL", { locale: es }),
      positive: inMonth.filter((r) => r.sentiment === "POSITIVE").length,
      neutral: inMonth.filter((r) => r.sentiment === "NEUTRAL").length,
      negative: inMonth.filter((r) => r.sentiment === "NEGATIVE").length,
    });
  }

  // Distribución por estrellas
  const ratings = [1, 2, 3, 4, 5].map((star) => ({
    rating: `${star}★`,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  // Temas más mencionados
  const themeCounts = new Map<string, number>();
  for (const r of reviews) {
    for (const t of r.themes) themeCounts.set(t, (themeCounts.get(t) ?? 0) + 1);
  }
  const topThemes = [...themeCounts.entries()]
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    totalReviews,
    averageRating: Number(averageRating.toFixed(2)),
    reputationScore,
    sentiment: { positive, neutral, negative },
    sentimentPct: {
      positive: Math.round((positive / denom) * 100),
      neutral: Math.round((neutral / denom) * 100),
      negative: Math.round((negative / denom) * 100),
    },
    trend,
    ratings,
    recentReviews: reviews.slice(0, 6),
    latestSummary,
    topThemes,
  };
}
