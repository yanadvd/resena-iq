import Link from "next/link";
import {
  Gauge, Star, MessageSquareQuote, TrendingUp, Sparkles, ArrowUpRight,
  ThumbsUp, AlertTriangle, Plug,
} from "lucide-react";
import { getDashboardContext } from "@/lib/dashboard-context";
import { getOverview } from "@/lib/dashboard-data";
import { getUsage } from "@/lib/usage";
import { PLANS } from "@/lib/plans";
import { Topbar } from "@/components/dashboard/topbar";
import { StatCard, ReviewCard } from "@/components/dashboard/widgets";
import { SentimentDonut, TrendArea, RatingBars } from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const ctx = await getDashboardContext();
  const [data, usage] = await Promise.all([
    getOverview(ctx.org.id),
    getUsage(ctx.org.id, ctx.org.plan),
  ]);
  const plan = PLANS[ctx.org.plan];

  return (
    <>
      <Topbar title={`Hola, ${ctx.name?.split(" ")[0] ?? "de nuevo"} 👋`} userEmail={ctx.email} />

      <main className="flex-1 space-y-6 p-6">
        {data.totalReviews === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Reputación" value={`${data.reputationScore}`} hint="sobre 100" accent icon={Gauge} />
              <StatCard label="Calificación media" value={`${data.averageRating.toFixed(1)}★`} hint={`${data.totalReviews} reseñas`} icon={Star} />
              <StatCard label="Reseñas totales" value={`${data.totalReviews}`} hint="todas las fuentes" icon={MessageSquareQuote} />
              <StatCard label="Sentimiento positivo" value={`${data.sentimentPct.positive}%`} hint={`${data.sentimentPct.negative}% negativo`} icon={TrendingUp} />
            </div>

            {/* Charts row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Tendencia de sentimiento</CardTitle>
                  <span className="text-xs text-muted-foreground">Últimos 6 meses</span>
                </CardHeader>
                <CardContent>
                  <TrendArea data={data.trend} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución</CardTitle>
                </CardHeader>
                <CardContent>
                  <SentimentDonut
                    data={[
                      { name: "Positivas", value: data.sentiment.positive, key: "positive" },
                      { name: "Neutras", value: data.sentiment.neutral, key: "neutral" },
                      { name: "Negativas", value: data.sentiment.negative, key: "negative" },
                    ]}
                  />
                  <div className="mt-4 space-y-2 text-sm">
                    <LegendRow color="hsl(var(--positive))" label="Positivas" value={data.sentiment.positive} />
                    <LegendRow color="hsl(var(--neutral))" label="Neutras" value={data.sentiment.neutral} />
                    <LegendRow color="hsl(var(--negative))" label="Negativas" value={data.sentiment.negative} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI summary + ratings */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader className="flex-row items-center gap-2">
                  <Sparkles className="size-5 text-accent" />
                  <CardTitle>Resumen ejecutivo IA</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.latestSummary ? (
                    <>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {data.latestSummary.summary}
                      </p>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--positive))]">
                            <ThumbsUp className="size-3.5" /> Puntos fuertes
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {data.latestSummary.strengths.map((s) => (
                              <li key={s}>• {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--negative))]">
                            <AlertTriangle className="size-3.5" /> Áreas de mejora
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {data.latestSummary.improvements.map((s) => (
                              <li key={s}>• {s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Sincroniza tus reseñas para generar el primer resumen con IA.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reseñas por estrellas</CardTitle>
                </CardHeader>
                <CardContent>
                  <RatingBars data={data.ratings} />
                </CardContent>
              </Card>
            </div>

            {/* Usage + themes */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Uso del plan {plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <UsageBar
                    label="Reseñas este mes"
                    used={usage.reviewsThisMonth}
                    max={usage.maxReviewsPerMonth}
                    unlimited={usage.reviewsUnlimited}
                  />
                  <UsageBar
                    label="Canales conectados"
                    used={usage.sourcesUsed}
                    max={usage.maxSources}
                    unlimited={usage.sourcesUnlimited}
                  />
                  {ctx.org.plan !== "BUSINESS" && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/dashboard/settings">Mejorar plan <ArrowUpRight className="size-3.5" /></Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Temas más mencionados</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.topThemes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aún no hay temas detectados.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {data.topThemes.map((t) => (
                        <span
                          key={t.theme}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm"
                        >
                          {t.theme}
                          <span className="rounded-full bg-primary/15 px-1.5 text-xs font-semibold text-primary">
                            {t.count}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent reviews */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Reseñas recientes</CardTitle>
                <Link href="/dashboard/reviews" className="text-sm font-semibold text-accent hover:underline">
                  Ver todas →
                </Link>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {data.recentReviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className="size-2.5 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function UsageBar({
  label, used, max, unlimited,
}: {
  label: string; used: number; max: number; unlimited: boolean;
}) {
  const pct = unlimited ? 0 : Math.min(100, (used / (max || 1)) * 100);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">
          {used} / {unlimited ? "∞" : max}
        </span>
      </div>
      {!unlimited && (
        <Progress
          value={pct}
          indicatorClassName={pct > 85 ? "bg-destructive" : "bg-accent"}
        />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Plug className="size-8" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-semibold">
        Conecta tu primera fuente de reseñas
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Añade un canal (Google, Yelp…) o importa un CSV. En segundos tendrás tus
        reseñas analizadas con IA en este panel.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/dashboard/sources">Conectar fuente</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/sources#import">Importar CSV</Link>
        </Button>
      </div>
    </div>
  );
}
