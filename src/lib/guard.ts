import { auth } from "./auth";
import { prisma } from "./prisma";
import { planHasFeature, type FeatureKey } from "./plans";
import type { Organization } from "@prisma/client";

export class AuthError extends Error {
  status = 401;
}
export class ForbiddenError extends Error {
  status = 403;
}

export interface SessionContext {
  userId: string;
  orgId: string;
  org: Organization;
  role: string;
  plan: Organization["plan"];
}

/**
 * Obtiene el contexto de sesión para una API route. Lanza AuthError si no hay
 * sesión válida. Carga la organización fresca desde la BD (plan al día).
 */
export async function requireSession(): Promise<SessionContext> {
  const session = await auth();
  if (!session?.user?.id || !session.user.orgId) {
    throw new AuthError("No autenticado");
  }
  const org = await prisma.organization.findUnique({
    where: { id: session.user.orgId },
  });
  if (!org) throw new AuthError("Organización no encontrada");

  return {
    userId: session.user.id,
    orgId: org.id,
    org,
    role: session.user.role,
    plan: org.plan,
  };
}

/** Lanza ForbiddenError si el plan de la org no incluye la funcionalidad. */
export function requireFeature(ctx: SessionContext, feature: FeatureKey) {
  if (!planHasFeature(ctx.plan, feature)) {
    throw new ForbiddenError(
      `Tu plan (${ctx.plan}) no incluye esta funcionalidad. Mejora tu plan para acceder.`
    );
  }
}

/** Convierte errores de auth/forbidden en respuestas JSON consistentes. */
export function errorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return Response.json({ error: error.message }, { status: 401 });
  }
  if (error instanceof ForbiddenError) {
    return Response.json({ error: error.message }, { status: 403 });
  }
  console.error("[api] error:", error);
  const message =
    error instanceof Error ? error.message : "Error interno del servidor";
  return Response.json({ error: message }, { status: 500 });
}
