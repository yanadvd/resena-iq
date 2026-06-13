import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { ensureOrganizationForUser } from "./organization";
import type { Plan, Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    // --- OAuth con Google ---
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),

    // --- Email + contraseña ---
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // En el primer login `user` está presente. Garantizamos la organización.
      if (user?.id) token.uid = user.id;
      const userId = (token.uid as string) ?? token.sub;

      // Resuelve la organización solo cuando aún no está en el token (sign-in)
      // o cuando llega un usuario nuevo. En el resto de peticiones evitamos
      // golpear la BD. El gating real siempre relee el plan desde la BD.
      if (userId && (!token.orgId || user)) {
        const membership = await ensureOrganizationForUser(
          userId,
          token.name as string | undefined
        );
        token.orgId = membership.orgId;
        token.role = membership.role;
        token.plan = membership.organization.plan;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.uid as string) ?? (token.sub as string);
        session.user.orgId = token.orgId as string;
        session.user.role = token.role as Role;
        session.user.plan = token.plan as Plan;
      }
      return session;
    },
  },
};

/** Helper para obtener la sesión en Server Components / route handlers. */
export function auth() {
  return getServerSession(authOptions);
}
