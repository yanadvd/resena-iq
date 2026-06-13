import { requireSession, errorResponse } from "@/lib/guard";
import { generateSummary } from "@/lib/analysis/summary";

/** Regenera el resumen ejecutivo con IA para la organización. */
export async function POST() {
  try {
    const ctx = await requireSession();
    const summary = await generateSummary(ctx.orgId);
    return Response.json({ ok: true, summary });
  } catch (error) {
    return errorResponse(error);
  }
}
