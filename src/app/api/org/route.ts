import { z } from "zod";
import { requireSession, errorResponse } from "@/lib/guard";
import { prisma } from "@/lib/prisma";
import { planHasFeature } from "@/lib/plans";

const schema = z.object({
  name: z.string().min(2).max(80).optional(),
  industry: z.string().max(80).optional(),
  website: z.string().url().optional().or(z.literal("")),
  alertEmail: z.string().email().optional().or(z.literal("")),
  alertsEnabled: z.boolean().optional(),
  alertRatingThreshold: z.number().int().min(1).max(5).optional(),
});

/** Actualiza el perfil del negocio y las preferencias de alertas. */
export async function PATCH(req: Request) {
  try {
    const ctx = await requireSession();
    const data = schema.parse(await req.json());

    // El umbral de alerta personalizado solo está disponible en planes con customAlerts.
    if (
      data.alertRatingThreshold != null &&
      !planHasFeature(ctx.plan, "customAlerts")
    ) {
      return Response.json(
        {
          error:
            "Personalizar el umbral de alertas requiere el plan Business.",
        },
        { status: 403 }
      );
    }

    const org = await prisma.organization.update({
      where: { id: ctx.orgId },
      data: {
        name: data.name,
        industry: data.industry,
        website: data.website || null,
        alertEmail: data.alertEmail || null,
        alertsEnabled: data.alertsEnabled,
        alertRatingThreshold: data.alertRatingThreshold,
      },
    });

    return Response.json({ ok: true, org });
  } catch (error) {
    return errorResponse(error);
  }
}
