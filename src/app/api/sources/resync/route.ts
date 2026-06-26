import { requireSession, errorResponse } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { syncSource } from "@/lib/reviews/ingest";

/**
 * POST /api/sources/resync?id=<sourceId>
 * Borra todas las reseñas de la fuente y las reimporta desde cero.
 * Necesario cuando las reseñas se guardaron con una traducción incorrecta.
 */
export async function POST(req: Request) {
  try {
    const ctx = await requireSession();
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Falta el id de la fuente" }, { status: 400 });
    }

    // Verificar propiedad
    const source = await prisma.reviewSource.findFirst({
      where: { id, orgId: ctx.orgId },
    });
    if (!source) {
      return Response.json({ error: "Fuente no encontrada" }, { status: 404 });
    }

    // Borrar reseñas existentes (y sus análisis en cascada)
    await prisma.review.deleteMany({ where: { sourceId: id } });

    // Resetear fecha de última sync para que traiga todo el histórico
    await prisma.reviewSource.update({
      where: { id },
      data: { lastSyncedAt: null },
    });

    // Re-importar desde la API
    const ingest = await syncSource(ctx.org, { ...source, lastSyncedAt: null });

    return Response.json({ ok: true, ingest });
  } catch (error) {
    return errorResponse(error);
  }
}
