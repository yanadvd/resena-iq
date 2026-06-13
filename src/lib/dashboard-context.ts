import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./prisma";
import type { Organization } from "@prisma/client";

export interface DashboardContext {
  userId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  org: Organization;
}

/**
 * Contexto para Server Components del dashboard. Redirige a /login si no hay
 * sesión. Carga la organización fresca (plan/estado de suscripción al día).
 */
export async function getDashboardContext(): Promise<DashboardContext> {
  const session = await auth();
  if (!session?.user?.id || !session.user.orgId) {
    redirect("/login");
  }
  const org = await prisma.organization.findUnique({
    where: { id: session.user.orgId },
  });
  if (!org) redirect("/login");

  return {
    userId: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    org,
  };
}
