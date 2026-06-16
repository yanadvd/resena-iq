import { requireSession, errorResponse, requireFeature } from "@/lib/guard";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/**
 * Exporta reseñas y métricas.
 *   ?format=csv  -> descarga CSV (requiere feature csvExport)
 *   ?format=pdf  -> documento imprimible (requiere feature pdfExport)
 *
 * El control de acceso por plan se aplica vía requireFeature, conectando la
 * suscripción con las funcionalidades reales.
 */
export async function GET(req: Request) {
  try {
    const ctx = await requireSession();
    const format = new URL(req.url).searchParams.get("format") ?? "csv";

    const [reviews, summary] = await Promise.all([
      prisma.review.findMany({
        where: { orgId: ctx.orgId },
        orderBy: { publishedAt: "desc" },
        take: 2000,
      }),
      prisma.analysisSummary.findFirst({
        where: { orgId: ctx.orgId },
        orderBy: { generatedAt: "desc" },
      }),
    ]);

    if (format === "csv") {
      requireFeature(ctx, "csvExport");
      const header = [
        "fecha", "fuente", "autor", "rating", "sentimiento",
        "score", "temas", "keywords", "texto",
      ];
      const rows = reviews.map((r) =>
        [
          r.publishedAt.toISOString().slice(0, 10),
          r.source,
          r.author ?? "",
          r.rating,
          r.sentiment ?? "",
          r.sentimentScore ?? "",
          r.themes.join("; "),
          r.keywords.join("; "),
          r.text,
        ]
          .map(csvEscape)
          .join(",")
      );
      const csv = [header.join(","), ...rows].join("\n");
      return new Response("﻿" + csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="resenas-${ctx.org.slug}.csv"`,
        },
      });
    }

    if (format === "pdf") {
      requireFeature(ctx, "pdfExport");
      // Documento HTML listo para imprimir / guardar como PDF (Ctrl+P).
      const html = buildReportHtml(ctx.org.name, summary, reviews.length);
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return Response.json({ error: "Formato no soportado" }, { status: 400 });
  } catch (error) {
    return errorResponse(error);
  }
}

function buildReportHtml(
  businessName: string,
  summary: Awaited<ReturnType<typeof prisma.analysisSummary.findFirst>>,
  totalReviews: number
): string {
  const s = summary;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Reporte de reputación — ${businessName}</title>
<style>
  @page { margin: 24mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  .sub { color: #666; margin: 0 0 32px; }
  .score { font-size: 64px; font-weight: 700; color: #4f46e5; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
  .card { border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; }
  .card h3 { margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: .05em; color: #888; }
  ul { margin: 8px 0; padding-left: 20px; }
  .pos { color: #059669; } .neg { color: #dc2626; }
  .print-btn { background:#4f46e5;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:14px;cursor:pointer;margin-bottom:24px }
  @media print { .print-btn { display:none } }
</style></head><body>
  <button class="print-btn" onclick="window.print()">🖨 Imprimir / Guardar como PDF</button>
  <h1>Reporte de Reputación</h1>
  <p class="sub">${businessName} · Generado el ${new Date().toLocaleDateString("es-ES")}</p>
  ${
    s
      ? `<div class="score">${s.reputationScore}<span style="font-size:24px;color:#999">/100</span></div>
  <p class="sub">Puntuación de reputación · ${totalReviews} reseñas analizadas · ${s.averageRating.toFixed(1)}★ media</p>
  <div class="card"><h3>Resumen ejecutivo</h3><p>${s.summary}</p></div>
  <div class="grid">
    <div class="card"><h3>Distribución de sentimiento</h3>
      <p class="pos">Positivo: ${s.positivePct}%</p>
      <p>Neutro: ${s.neutralPct}%</p>
      <p class="neg">Negativo: ${s.negativePct}%</p>
    </div>
    <div class="card"><h3>Temas principales</h3>
      <ul>${s.topThemes.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <div class="card"><h3 class="pos">Puntos fuertes</h3>
      <ul>${s.strengths.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <div class="card"><h3 class="neg">Áreas de mejora</h3>
      <ul>${s.improvements.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
  </div>`
      : `<p>Aún no hay datos suficientes para generar un reporte. Sincroniza o importa reseñas primero.</p>`
  }
  <p style="margin-top:40px;color:#aaa;font-size:12px">Generado por Repusense</p>
</body></html>`;
}
