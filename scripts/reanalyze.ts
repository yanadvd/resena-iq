/**
 * Re-analiza TODAS las reseñas existentes con el motor actual (GPT si hay
 * OPENAI_API_KEY, heurística si no) y regenera los resúmenes por organización.
 *
 *   npm run db:reanalyze
 *
 * Útil tras activar/cambiar la clave de OpenAI: las reseñas ya guardadas con el
 * motor heurístico se vuelven a procesar con GPT.
 */
import { prisma } from "../src/lib/prisma";
import { analyzeReviews } from "../src/lib/analysis/sentiment";
import { generateSummary } from "../src/lib/analysis/summary";
import { isOpenAIEnabled } from "../src/lib/openai";

async function main() {
  console.log(`Motor de análisis: ${isOpenAIEnabled() ? "OpenAI / GPT" : "heurístico local"}`);

  const reviews = await prisma.review.findMany({
    select: { id: true, rating: true, text: true, orgId: true },
  });
  console.log(`Re-analizando ${reviews.length} reseñas…`);

  const analyses = await analyzeReviews(
    reviews.map((r) => ({ id: r.id, rating: r.rating, text: r.text }))
  );

  let updated = 0;
  for (const r of reviews) {
    const a = analyses.get(r.id);
    if (!a) continue;
    await prisma.review.update({
      where: { id: r.id },
      data: {
        processed: true,
        sentiment: a.sentiment,
        sentimentScore: a.sentimentScore,
        themes: a.themes,
        keywords: a.keywords,
      },
    });
    updated++;
  }
  console.log(`Actualizadas ${updated} reseñas.`);

  // Muestra un par de ejemplos del resultado de GPT
  const sample = reviews.slice(0, 2);
  for (const r of sample) {
    const a = analyses.get(r.id);
    console.log(
      `  · "${r.text.slice(0, 50)}…" → ${a?.sentiment} (${a?.sentimentScore}) | temas: ${a?.themes.join(", ")}`
    );
  }

  const orgIds = [...new Set(reviews.map((r) => r.orgId))];
  for (const orgId of orgIds) {
    const s = await generateSummary(orgId);
    console.log(`Resumen regenerado (reputación ${s.reputationScore}/100).`);
  }
  console.log("✅ Re-análisis completado.");
}

main()
  .catch((e) => {
    console.error("Error en re-análisis:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
