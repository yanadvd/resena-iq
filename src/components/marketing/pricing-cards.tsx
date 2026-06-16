"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, PLAN_ORDER, isUnlimited } from "@/lib/plans";
import { cn } from "@/lib/utils";

const FEATURE_LABELS: Record<string, string> = {
  pdfExport: "Exportación a PDF",
  csvExport: "Exportación a CSV",
  advancedReports: "Reportes avanzados",
  customAlerts: "Alertas personalizadas",
  aiReplies: "Respuestas sugeridas con IA",
};

export function PricingCards({ compact = false }: { compact?: boolean }) {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(planId: string) {
    setError(null);
    if (planId === "FREE") {
      router.push(status === "authenticated" ? "/dashboard" : "/register");
      return;
    }
    if (status !== "authenticated") {
      router.push(`/register?plan=${planId}`);
      return;
    }
    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setLoading(null);
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-6 text-center text-sm text-destructive">{error}</p>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {PLAN_ORDER.map((id) => {
          const plan = PLANS[id];
          const highlight = plan.highlight;
          return (
            <div
              key={id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 transition-all",
                highlight
                  ? "border-primary/60 bg-card shadow-2xl shadow-primary/10 md:-translate-y-3"
                  : "border-border bg-card/60"
              )}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <Sparkles className="size-3" /> Más popular
                  </span>
                </div>
              )}
              <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
              {!compact && (
                <p className="mt-2 text-sm text-muted-foreground min-h-[2.5rem]">
                  {plan.description}
                </p>
              )}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">
                  {plan.priceMonthly}€
                </span>
                <span className="text-muted-foreground">/mes</span>
              </div>

              <Button
                variant={highlight ? "default" : "outline"}
                className="mt-6"
                disabled={loading === id}
                onClick={() => handleSelect(id)}
              >
                {loading === id && <Loader2 className="size-4 animate-spin" />}
                {id === "FREE" ? "Empezar gratis" : `Elegir ${plan.name}`}
              </Button>

              <ul className="mt-7 space-y-3 text-sm">
                <Feature>
                  {isUnlimited(plan.maxReviewsPerMonth)
                    ? "Reseñas ilimitadas"
                    : `Hasta ${plan.maxReviewsPerMonth} reseñas/mes`}
                </Feature>
                <Feature>
                  {isUnlimited(plan.maxSources)
                    ? "Todos los canales"
                    : `${plan.maxSources} ${plan.maxSources === 1 ? "canal" : "canales"} conectados`}
                </Feature>
                <Feature>Análisis de sentimiento con IA</Feature>
                <Feature>Dashboard y tendencias</Feature>
                {Object.entries(plan.features).map(([key, enabled]) => (
                  <Feature key={key} enabled={enabled}>
                    {FEATURE_LABELS[key]}
                  </Feature>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Feature({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5",
        !enabled && "text-muted-foreground/50 line-through"
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          enabled ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground/50"
        )}
      >
        <Check className="size-3" />
      </span>
      {children}
    </li>
  );
}
