import { requireSession, errorResponse } from "@/lib/guard";
import { syncOrganization } from "@/lib/reviews/ingest";
import { generateSummary } from "@/lib/analysis/summary";

/**
 * Sincronización manual ("Sincronizar ahora") desde el dashboard.
 * Trae nuevas reseñas de todas las fuentes conectadas, las analiza con IA y
 * regenera el resumen agregado.
 */
export async function POST() {
  try {
    const ctx = await requireSession();
    const result = await syncOrganization(ctx.orgId);
    // Regenera el resumen para que el dashboard refleje los datos nuevos.
    await generateSummary(ctx.orgId);
    return Response.json({ ok: true, ...result });
  } catch (error) {
    return errorResponse(error);
  }
}
