import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getPlanFromPriceId } from "@/lib/plans";
import type { SubscriptionStatus } from "@prisma/client";

// El webhook necesita el cuerpo crudo para verificar la firma.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mapStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "trialing":
      return "TRIALING";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
    case "unpaid":
      return "CANCELED";
    case "incomplete":
    case "incomplete_expired":
      return "INCOMPLETE";
    default:
      return "NONE";
  }
}

/** Sincroniza el estado de una suscripción de Stripe con la organización. */
async function syncSubscription(subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price.id;
  const plan = getPlanFromPriceId(priceId);
  const status = mapStatus(subscription.status);

  // Si está cancelada/expirada, vuelve a FREE.
  const effectivePlan =
    status === "CANCELED" || status === "NONE" ? "FREE" : plan;

  const orgId = subscription.metadata?.orgId;
  const where = orgId
    ? { id: orgId }
    : { stripeCustomerId: subscription.customer as string };

  await prisma.organization.updateMany({
    where,
    data: {
      plan: effectivePlan,
      subscriptionStatus: status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return Response.json(
      { error: "Webhook no configurado" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook] firma inválida:", err);
    return Response.json({ error: "Firma inválida" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          // Propaga el orgId al metadata de la suscripción si falta.
          if (!subscription.metadata?.orgId && session.metadata?.orgId) {
            subscription.metadata = {
              ...subscription.metadata,
              orgId: session.metadata.orgId,
            };
          }
          await syncSubscription(subscription);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await prisma.organization.updateMany({
            where: { stripeSubscriptionId: invoice.subscription as string },
            data: { subscriptionStatus: "PAST_DUE" },
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          await syncSubscription(subscription);
        }
        break;
      }

      default:
        // Otros eventos se ignoran de forma segura.
        break;
    }
  } catch (err) {
    console.error(`[webhook] error procesando ${event.type}:`, err);
    return Response.json({ error: "Error procesando webhook" }, { status: 500 });
  }

  return Response.json({ received: true });
}
