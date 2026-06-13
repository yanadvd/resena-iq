import { prisma } from "./prisma";
import { slugify } from "./utils";
import type { Membership, Organization } from "@prisma/client";

/**
 * Garantiza que un usuario tenga una organización (tenant) propia.
 * Se invoca al registrarse (credenciales) y al iniciar sesión con OAuth por
 * primera vez. Idempotente: si ya existe membership, lo devuelve.
 */
export async function ensureOrganizationForUser(
  userId: string,
  fallbackName?: string | null
): Promise<Membership & { organization: Organization }> {
  const existing = await prisma.membership.findFirst({
    where: { userId },
    include: { organization: true },
    orderBy: { createdAt: "asc" },
  });
  if (existing) return existing;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const baseName =
    fallbackName?.trim() ||
    user?.name?.trim() ||
    (user?.email ? user.email.split("@")[0] : "Mi negocio");

  // Generar slug único
  let slug = slugify(baseName) || "negocio";
  let suffix = 0;
  // Evita colisiones de slug
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const taken = await prisma.organization.findUnique({
      where: { slug: candidate },
    });
    if (!taken) {
      slug = candidate;
      break;
    }
    suffix++;
  }

  const organization = await prisma.organization.create({
    data: {
      name: baseName,
      slug,
      alertEmail: user?.email ?? undefined,
      memberships: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });

  const membership = await prisma.membership.findUniqueOrThrow({
    where: { userId_orgId: { userId, orgId: organization.id } },
    include: { organization: true },
  });

  return membership;
}
