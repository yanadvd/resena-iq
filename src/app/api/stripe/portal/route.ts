import { stripe, isStripeConfigured } from "@/lib/stripe";
import { requireSession, errorResponse } from "@/lib/guard";

/**
 * Crea una sesión del Customer Portal de Stripe para que el usuario gestione
 * su suscripción: actualizar plan, cancelar, ver facturas e historial de pagos.
 */
export async function POST() {
  try {
    if (!isStripeConfigured()) {
      return Response.json(
        { error: "Stripe no está configurado en el servidor." },
        { status: 503 }
      );
    }
    const ctx = await requireSession();
    if (!ctx.org.stripeCustomerId) {
      return Response.json(
        { error: "No tienes una suscripción activa que gestionar." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: ctx.org.stripeCustomerId,
      return_url: `${appUrl}/dashboard/settings`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return errorResponse(error);
  }
}
