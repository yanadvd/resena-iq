import { z } from "zod";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { requireSession, errorResponse } from "@/lib/guard";
import { getStripePriceId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  plan: z.enum(["PRO", "BUSINESS"]),
});

export async function POST(req: Request) {
  try {
    if (!isStripeConfigured()) {
      return Response.json(
        { error: "Stripe no está configurado en el servidor." },
        { status: 503 }
      );
    }
    const ctx = await requireSession();
    const { plan } = schema.parse(await req.json());

    const priceId = getStripePriceId(plan);
    if (!priceId) {
      return Response.json(
        { error: `No hay Price ID configurado para el plan ${plan}.` },
        { status: 400 }
      );
    }

    // Reutiliza o crea el customer de Stripe para esta organización.
    let customerId = ctx.org.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        name: ctx.org.name,
        email: ctx.org.alertEmail ?? undefined,
        metadata: { orgId: ctx.org.id },
      });
      customerId = customer.id;
      await prisma.organization.update({
        where: { id: ctx.org.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: {
        metadata: { orgId: ctx.org.id, plan },
      },
      metadata: { orgId: ctx.org.id, plan },
      success_url: `${appUrl}/dashboard/settings?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return errorResponse(error);
  }
}
