import { requireSession, errorResponse } from "@/lib/guard";
import { sendEmail, negativeReviewEmail } from "@/lib/email";

/** Envía un email de alerta de prueba a la dirección configurada. */
export async function POST() {
  try {
    const ctx = await requireSession();
    const to = ctx.org.alertEmail;
    if (!to) {
      return Response.json(
        { error: "Configura primero un email de alertas." },
        { status: 400 }
      );
    }
    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/reviews`;
    const delivered = await sendEmail({
      to,
      subject: `🔔 Alerta de prueba — ${ctx.org.name}`,
      html: negativeReviewEmail({
        businessName: ctx.org.name,
        author: "Cliente de ejemplo",
        rating: 2,
        source: "Google Reviews",
        text: "Esta es una reseña de prueba para verificar que tus alertas funcionan correctamente.",
        dashboardUrl,
      }),
    });
    return Response.json({
      ok: true,
      delivered,
      message: delivered
        ? `Email de prueba enviado a ${to}.`
        : `Alerta registrada en consola (configura RESEND_API_KEY para enviar emails reales).`,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
