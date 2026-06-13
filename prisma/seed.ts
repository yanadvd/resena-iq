/**
 * Seed de datos demo.
 *   npm run db:seed
 *
 * Crea una cuenta de prueba con reseñas ya analizadas para explorar la app
 * sin configurar integraciones externas.
 *
 *   Email:      demo@resenaiq.com
 *   Contraseña: demo12345
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ingestRawReviews } from "../src/lib/reviews/ingest";
import { generateSummary } from "../src/lib/analysis/summary";
import type { RawReview } from "../src/lib/reviews/sources";

const prisma = new PrismaClient();

const DEMO_EMAIL = "demo@resenaiq.com";
const DEMO_PASSWORD = "demo12345";

const TEMPLATES = {
  positive: [
    "Servicio excelente, el personal súper amable y todo muy limpio. Volveré seguro.",
    "La calidad es increíble y el precio muy justo. Totalmente recomendable.",
    "Pedido rápido y en perfecto estado. La atención al cliente de 10.",
    "Ambiente muy agradable y comida deliciosa. Una experiencia fantástica.",
    "Great experience! Friendly staff and fast service. Highly recommend.",
  ],
  neutral: [
    "Está bien en general, aunque la espera fue algo larga. Correcto sin más.",
    "Cumple, pero el precio me pareció un poco elevado para lo que ofrecen.",
    "El producto cumple, aunque el embalaje llegó algo dañado.",
    "It was okay, nothing special but nothing bad either.",
  ],
  negative: [
    "Muy decepcionado, el servicio fue lento y el personal poco amable.",
    "La comida llegó fría y tardó muchísimo. No volveré.",
    "Caro para la calidad que dan. Esperaba mucho más, una pena.",
    "Pedí un reembolso por un problema y nunca me respondieron. Fatal.",
    "Terrible experience, the place was dirty and the staff was rude.",
  ],
};
const AUTHORS = ["María G.", "John D.", "Laura P.", "Carlos M.", "Sophie L.", "Ahmed K.", "Elena R.", "Tom W.", "Lucía F.", "David S."];

function buildReviews(prefix: string, count: number): RawReview[] {
  const out: RawReview[] = [];
  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    let rating: number;
    let pool: string[];
    if (roll < 0.6) { rating = Math.random() < 0.5 ? 5 : 4; pool = TEMPLATES.positive; }
    else if (roll < 0.8) { rating = 3; pool = TEMPLATES.neutral; }
    else { rating = Math.random() < 0.5 ? 1 : 2; pool = TEMPLATES.negative; }

    const daysAgo = Math.floor(Math.random() * 180); // últimos 6 meses
    out.push({
      externalId: `${prefix}-${i}`,
      author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
      rating,
      text: pool[Math.floor(Math.random() * pool.length)],
      publishedAt: new Date(Date.now() - daysAgo * 86400000),
      language: "es",
    });
  }
  return out;
}

async function main() {
  console.log("🌱 Seed: creando cuenta demo…");

  const hashed = await bcrypt.hash(DEMO_PASSWORD, 12);
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: { email: DEMO_EMAIL, name: "Ana Demo", password: hashed },
  });

  let org = await prisma.organization.findFirst({
    where: { memberships: { some: { userId: user.id } } },
  });
  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: "Café Aurora",
        slug: "cafe-aurora-demo",
        industry: "Restauración",
        website: "https://cafeaurora.example",
        plan: "BUSINESS",
        subscriptionStatus: "ACTIVE",
        alertEmail: DEMO_EMAIL,
        alertsEnabled: true,
        currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
        memberships: { create: { userId: user.id, role: "OWNER" } },
      },
    });
  }

  // Limpia reseñas previas del demo para idempotencia
  await prisma.review.deleteMany({ where: { orgId: org.id } });
  await prisma.analysisSummary.deleteMany({ where: { orgId: org.id } });

  const sourcesData = [
    { type: "GOOGLE" as const, label: "Google - Café Aurora", count: 22 },
    { type: "YELP" as const, label: "Yelp - Café Aurora", count: 14 },
    { type: "TRUSTPILOT" as const, label: "Trustpilot - Café Aurora", count: 10 },
  ];

  for (const s of sourcesData) {
    const source = await prisma.reviewSource.upsert({
      where: { id: `${org.id}-${s.type}` },
      update: {},
      create: {
        id: `${org.id}-${s.type}`,
        orgId: org.id,
        type: s.type,
        label: s.label,
        status: "CONNECTED",
      },
    });
    const raw = buildReviews(`seed-${s.type}`, s.count);
    const result = await ingestRawReviews(org, source, raw);
    console.log(`   ${s.label}: ${result.created} reseñas analizadas`);
  }

  await generateSummary(org.id);
  console.log("   Resumen ejecutivo generado.");

  console.log("\n✅ Seed completado.");
  console.log(`   Entra en /login con:`);
  console.log(`   Email:      ${DEMO_EMAIL}`);
  console.log(`   Contraseña: ${DEMO_PASSWORD}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
