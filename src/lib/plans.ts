import type { Plan } from "@prisma/client";

// ============================================================================
//  Definición central de planes de suscripción.
//  Esta es la "fuente de la verdad" para precios, límites y control de acceso.
//  Tanto la UI de precios como las comprobaciones de backend leen de aquí.
// ============================================================================

export type FeatureKey =
  | "pdfExport"
  | "csvExport"
  | "advancedReports"
  | "customAlerts"
  | "aiReplies";

export interface PlanConfig {
  id: Plan;
  name: string;
  description: string;
  priceMonthly: number; // en EUR
  // Límites
  maxReviewsPerMonth: number; // Infinity para ilimitado
  maxSources: number;
  // Funcionalidades activadas por plan
  features: Record<FeatureKey, boolean>;
  // Stripe Price ID (null para FREE)
  stripePriceIdEnv: string | null;
  highlight?: boolean;
}

export const PLANS: Record<Plan, PlanConfig> = {
  FREE: {
    id: "FREE",
    name: "Free",
    description: "Para empezar a entender tu reputación online.",
    priceMonthly: 0,
    maxReviewsPerMonth: 50,
    maxSources: 1,
    features: {
      pdfExport: false,
      csvExport: false,
      advancedReports: false,
      customAlerts: false,
      aiReplies: false,
    },
    stripePriceIdEnv: null,
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    description: "Para negocios que gestionan su reputación activamente.",
    priceMonthly: 29,
    maxReviewsPerMonth: 500,
    maxSources: 3,
    features: {
      pdfExport: true,
      csvExport: true,
      advancedReports: false,
      customAlerts: false,
      aiReplies: false,
    },
    stripePriceIdEnv: "STRIPE_PRICE_PRO",
    highlight: true,
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Business",
    description: "Reputación a escala, con reportes avanzados e IA.",
    priceMonthly: 79,
    maxReviewsPerMonth: Number.POSITIVE_INFINITY,
    maxSources: Number.POSITIVE_INFINITY,
    features: {
      pdfExport: true,
      csvExport: true,
      advancedReports: true,
      customAlerts: true,
      aiReplies: true,
    },
    stripePriceIdEnv: "STRIPE_PRICE_BUSINESS",
  },
};

export const PLAN_ORDER: Plan[] = ["FREE", "PRO", "BUSINESS"];

export function getPlanConfig(plan: Plan): PlanConfig {
  return PLANS[plan];
}

/** Devuelve el Price ID real de Stripe para un plan (desde variables de entorno). */
export function getStripePriceId(plan: Plan): string | null {
  const cfg = PLANS[plan];
  if (!cfg.stripePriceIdEnv) return null;
  return process.env[cfg.stripePriceIdEnv] ?? null;
}

/** Mapea un Price ID de Stripe de vuelta al plan correspondiente. */
export function getPlanFromPriceId(priceId: string | null | undefined): Plan {
  if (!priceId) return "FREE";
  if (priceId === process.env.STRIPE_PRICE_PRO) return "PRO";
  if (priceId === process.env.STRIPE_PRICE_BUSINESS) return "BUSINESS";
  return "FREE";
}

/** ¿El plan tiene acceso a una funcionalidad concreta? */
export function planHasFeature(plan: Plan, feature: FeatureKey): boolean {
  return PLANS[plan].features[feature];
}

export function isUnlimited(value: number): boolean {
  return !Number.isFinite(value);
}
