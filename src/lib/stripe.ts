import Stripe from "stripe";

// Cliente de Stripe (lado servidor). La key vive solo en el entorno del server.
if (!process.env.STRIPE_SECRET_KEY) {
  // No lanzamos error en build para permitir desplegar sin keys aún,
  // pero las rutas de pago fallarán de forma controlada si falta.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY no está definido. Los pagos estarán deshabilitados."
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
  apiVersion: "2024-06-20",
  typescript: true,
  appInfo: { name: "Repusense", version: "1.0.0" },
});

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("dummy")
  );
}
