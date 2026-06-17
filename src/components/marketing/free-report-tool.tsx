"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, Loader2, Star, Gauge, ThumbsUp, AlertTriangle, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PublicReport } from "@/lib/public-report";

export function FreeReportTool() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<PublicReport | null>(null);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 3) return;
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/public/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "No se pudo generar el informe.");
      setReport(data.report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Formulario */}
      <form onSubmit={analyze} className="glass rounded-2xl border border-border p-2 shadow-xl shadow-primary/10">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre de tu negocio + ciudad (p. ej. Café Aurora, Valencia)"
              className="h-14 border-0 bg-transparent pl-12 text-base focus-visible:ring-0"
            />
          </div>
          <Button type="submit" size="lg" disabled={loading} className="h-14">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Analizar gratis
          </Button>
        </div>
      </form>
      {error && <p className="mt-3 text-center text-sm text-destructive">{error}</p>}
      {!report && !loading && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Analizamos tus reseñas reales de Google con IA. Sin registro, sin tarjeta.
        </p>
      )}

      {loading && (
        <div className="mt-10 flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="size-6 animate-spin text-accent" />
          <p className="text-sm">Buscando tu negocio y analizando sus reseñas con IA…</p>
        </div>
      )}

      {/* Informe */}
      {report && (
        <div className="animate-fade-up mt-10 space-y-6">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">{report.business.name}</h2>
            <p className="text-sm text-muted-foreground">{report.business.address}</p>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric icon={Gauge} label="Reputación" value={`${report.reputationScore}`} hint="sobre 100" accent />
            <Metric icon={Star} label="Calificación" value={`${report.averageRating}★`} hint={`${report.business.totalReviews} reseñas`} />
            <Metric icon={ThumbsUp} label="Positivas" value={`${report.sentiment.positive}%`} hint={`${report.sentiment.negative}% negativas`} />
          </div>

          {/* Sentimiento */}
          <div className="rounded-2xl border border-border bg-card/50 p-5">
            <p className="mb-2 text-sm font-semibold">Distribución de sentimiento ({report.reviewsAnalyzed} reseñas analizadas)</p>
            <div className="flex h-3 overflow-hidden rounded-full">
              <span className="bg-[hsl(var(--positive))]" style={{ width: `${report.sentiment.positive}%` }} />
              <span className="bg-[hsl(var(--neutral))]" style={{ width: `${report.sentiment.neutral}%` }} />
              <span className="bg-[hsl(var(--negative))]" style={{ width: `${report.sentiment.negative}%` }} />
            </div>
          </div>

          {/* Resumen IA */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
              <Sparkles className="size-4" /> Resumen con IA
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">{report.summary}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--positive))]">
                  <ThumbsUp className="size-3.5" /> Puntos fuertes
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {report.strengths.map((s) => <li key={s}>• {s}</li>)}
                </ul>
              </div>
              {report.improvements.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--negative))]">
                    <AlertTriangle className="size-3.5" /> A mejorar
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {report.improvements.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CTA de conversión */}
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-card to-primary/10 p-7 text-center">
            <h3 className="font-display text-2xl font-semibold">
              Esto es solo una muestra
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Crea tu cuenta gratis para monitorizar <strong>{report.business.name}</strong> en
              continuo, recibir alertas de reseñas negativas y ver la evolución en el tiempo.
            </p>
            <Button size="lg" className="mt-5" asChild>
              <Link href={`/register?business=${encodeURIComponent(report.business.name)}`}>
                Monitorizar mi negocio gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  icon: Icon, label, value, hint, accent,
}: {
  icon: typeof Gauge; label: string; value: string; hint: string; accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 text-center">
      <Icon className={`mx-auto size-5 ${accent ? "text-accent" : "text-muted-foreground"}`} />
      <p className={`mt-2 font-display text-3xl font-semibold ${accent ? "text-accent" : ""}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label} · {hint}</p>
    </div>
  );
}
