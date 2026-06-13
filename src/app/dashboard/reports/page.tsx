import { Lock } from "lucide-react";
import { getDashboardContext } from "@/lib/dashboard-context";
import { prisma } from "@/lib/prisma";
import { planHasFeature, PLANS } from "@/lib/plans";
import { Topbar } from "@/components/dashboard/topbar";
import { ReportActions } from "@/components/dashboard/report-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ReportsPage() {
  const ctx = await getDashboardContext();
  const summary = await prisma.analysisSummary.findFirst({
    where: { orgId: ctx.org.id },
    orderBy: { generatedAt: "desc" },
  });

  const canPdf = planHasFeature(ctx.org.plan, "pdfExport");
  const canCsv = planHasFeature(ctx.org.plan, "csvExport");
  const advanced = planHasFeature(ctx.org.plan, "advancedReports");

  return (
    <>
      <Topbar title="Reportes" userEmail={ctx.email} />
      <main className="flex-1 space-y-6 p-6">
        <ReportActions canPdf={canPdf} canCsv={canCsv} />

        {!canPdf && (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            <Lock className="size-4" />
            La exportación a PDF y CSV está disponible a partir del plan{" "}
            <span className="font-semibold text-foreground">Pro</span>.{" "}
            <a href="/dashboard/settings" className="font-semibold text-accent hover:underline">
              Mejorar plan
            </a>
          </div>
        )}

        {summary ? (
          <Card>
            <CardHeader>
              <CardTitle>Reporte de reputación</CardTitle>
              <p className="text-sm text-muted-foreground">
                Periodo {new Date(summary.periodStart).toLocaleDateString("es-ES")} –{" "}
                {new Date(summary.periodEnd).toLocaleDateString("es-ES")} · generado{" "}
                {new Date(summary.generatedAt).toLocaleDateString("es-ES")}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-4">
                <Metric label="Reputación" value={`${summary.reputationScore}/100`} accent />
                <Metric label="Media" value={`${summary.averageRating.toFixed(1)}★`} />
                <Metric label="Reseñas" value={`${summary.reviewCount}`} />
                <Metric label="Positivas" value={`${summary.positivePct}%`} />
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Resumen ejecutivo</h3>
                <p className="text-sm leading-relaxed text-foreground/90">{summary.summary}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--positive))]">
                    Puntos fuertes
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {summary.strengths.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[hsl(var(--negative))]">
                    Áreas de mejora
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {summary.improvements.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
              </div>

              {advanced && summary.topThemes.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold">
                    Temas clave <span className="text-xs text-accent">(reporte avanzado)</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {summary.topThemes.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Aún no hay un reporte. Pulsa “Regenerar resumen IA” tras sincronizar reseñas.
          </div>
        )}
      </main>
    </>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${accent ? "text-accent" : ""}`}>{value}</p>
    </div>
  );
}
