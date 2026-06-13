import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureOrganizationForUser } from "@/lib/organization";

const schema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto").max(80),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  businessName: z.string().min(2).max(80).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.errors[0]?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }
    const { name, email, password, businessName } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return Response.json(
        { error: "Ya existe una cuenta con ese email" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email: normalizedEmail, password: hashed },
    });

    // Crea la organización (tenant) con plan FREE por defecto.
    await ensureOrganizationForUser(user.id, businessName ?? name);

    return Response.json({ ok: true, userId: user.id }, { status: 201 });
  } catch (err) {
    console.error("[register] error:", err);
    return Response.json({ error: "Error al crear la cuenta" }, { status: 500 });
  }
}
