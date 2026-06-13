"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, CreditCard, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLANS, PLAN_ORDER, isUnlimited } from "@/lib/plans";
import type { Plan, SubscriptionStatus } from "@prisma/client";

const STATUS_LABEL: Record<SubscriptionStatus, { label: string; variant: "positive" | "neutral" | "negative" | "secondary" }> = {
  ACTIVE: { label: "Activa", variant: "positive" },
  TRIALING: { label: "Prueba", variant: "neutral" },
  PAST_DUE: { label: "Pago pendiente", variant: "negative" },
  CANCELED: { label: "Cancelada", variant: "negative" },
  INCOMPLETE: { label: "Incompleta", variant: "neutral" },
  NONE: { label: "Sin suscripción", variant: "secondary" },
};

function Panel({
  plan,
  status,
  currentPeriodEnd,
  hasCustomer,
}: {
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  hasCustomer: boolean;
}) {
  const params = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const current = PLANS[plan];
  const st = STATUS_LABEL[status];

  async function startCheckout(targetPlan: string) {
    setError(null);
    setLoading(targetPlan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setLoading(null);
    }
  }

  async function openPortal() {
    setError(null);
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo abrir el portal");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setLoading(null);
    }
  }

  // Si el usuario llegó desde el registro eligiendo un plan, lanza el checkout.
  useEffect(() => {
    const intended = params.get("upgrade");
    if (intended && (intended === "PRO" || intended === "BUSINESS") && plan === "FREE") {
      startCheckout(intended);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkoutSuccess = params.get("checkout") === "success";
  const upgradeOptions = PLAN_ORDER.filter(
    (p) => p !== "FREE" && PLAN_ORDER.indexOf(p) > PLAN_ORDER.indexOf(plan)
  );

  return (
    <div className="space-y-6">
      {checkoutSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
          <Check className="size-4" /> ¡Suscripción activada! Tu plan se actualizará en unos segundos.
        </div>
      )}

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Tu plan</CardTitle>
          <Badge variant={st.variant}>{st.label}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-4xl font-semibold">
                {current.name}
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ${current.priceMonthly}/mes
                </span>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>• {isUnlimited(current.maxReviewsPerMonth) ? "Reseñas ilimitadas" : `${current.maxReviewsPerMonth} reseñas/mes`}</li>
                <li>• {isUnlimited(current.maxSources) ? "Todos los canales" : `${current.maxSources} canal(es)`}</li>
              </ul>
              {currentPeriodEnd && status === "ACTIVE" && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Se renueva el {new Date(currentPeriodEnd).toLocaleDateString("es-ES")}
                </p>
              )}
            </div>
            {hasCustomer && plan !== "FREE" && (
              <Button variant="outline" onClick={openPortal} disabled={loading === "portal"}>
                {loading === "portal" ? <Loader2 className="size-4 animate-spin" /> : <CreditCard className="size-4" />}
                Gestionar facturación
              </Button>
            )}
          </div>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      {upgradeOptions.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {upgradeOptions.map((p) => {
            const target = PLANS[p];
            return (
              <Card key={p} className="border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {target.highlight && <Sparkles className="size-4 text-accent" />}
                      <h3 className="font-display text-xl font-semibold">{target.name}</h3>
                    </div>
                    <span className="font-display text-2xl font-semibold">${target.priceMonthly}<span className="text-sm font-normal text-muted-foreground">/mes</span></span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{target.description}</p>
                  <Button className="mt-4 w-full" onClick={() => startCheckout(p)} disabled={loading === p}>
                    {loading === p ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                    Cambiar a {target.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {plan === "BUSINESS" && (
        <p className="text-center text-sm text-muted-foreground">
          Estás en el plan más completo. ¡Gracias por confiar en ReseñaIQ! 🎉
        </p>
      )}
    </div>
  );
}

export function SubscriptionPanel(props: {
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  hasCustomer: boolean;
}) {
  return (
    <Suspense fallback={<Loader2 className="size-5 animate-spin" />}>
      <Panel {...props} />
    </Suspense>
  );
}
