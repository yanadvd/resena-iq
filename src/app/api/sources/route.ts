import { z } from "zod";
import { requireSession, errorResponse, ForbiddenError } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { canAddSource } from "@/lib/usage";
import { syncSource } from "@/lib/reviews/ingest";

const createSchema = z.object({
  type: z.enum(["GOOGLE", "YELP", "TRIPADVISOR", "TRUSTPILOT"]),
  label: z.string().min(2).max(80),
  url: z.string().url().optional().or(z.literal("")),
  externalId: z.string().max(120).optional(),
});

/** Conecta una nueva fuente de reseñas (respetando el límite de canales del plan). */
export async function POST(req: Request) {
  try {
    const ctx = await requireSession();
    const data = createSchema.parse(await req.json());

    const allowed = await canAddSource(ctx.orgId, ctx.plan);
    if (!allowed) {
      throw new ForbiddenError(
        `Has alcanzado el límite de canales de tu plan ${ctx.plan}. Mejora tu plan para conectar más fuentes.`
      );
    }

    const source = await prisma.reviewSource.create({
      data: {
        orgId: ctx.orgId,
        type: data.type,
        label: data.label,
        url: data.url || null,
        externalId: data.externalId || null,
        status: "CONNECTED",
      },
    });

    // Primera sincronización inmediata para poblar datos.
    let ingest = null;
    try {
      ingest = await syncSource(ctx.org, source);
    } catch {
      // no bloquea la creación si la primera sync falla
    }

    return Response.json({ ok: true, source, ingest }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

/** Desconecta (elimina) una fuente. */
export async function DELETE(req: Request) {
  try {
    const ctx = await requireSession();
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Falta el id de la fuente" }, { status: 400 });
    }
    // Verifica propiedad
    const source = await prisma.reviewSource.findFirst({
      where: { id, orgId: ctx.orgId },
    });
    if (!source) {
      return Response.json({ error: "Fuente no encontrada" }, { status: 404 });
    }
    await prisma.reviewSource.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
