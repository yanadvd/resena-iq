/**
 * Generador de informes + emails de outreach en frío.
 *
 *   npm run outreach -- "Café Aurora, Valencia" "Restaurante Botín, Madrid"
 *   npm run outreach -- --file outreach-businesses.txt   (un negocio por línea)
 *
 * Para cada negocio: busca su ficha en Google, analiza sus reseñas con IA y
 * redacta un email en frío personalizado. Escribe todo en `outreach-output.md`
 * listo para enviar. Munición para vender desde mañana.
 *
 * Requiere GOOGLE_MAPS_API_KEY y OPENAI_API_KEY en el .env.
 */
import fs from "node:fs";
import { generatePublicReport, type PublicReport } from "../src/lib/public-report";

// Outreach a prospectos reales: siempre enlaza a la web en producción.
const APP_URL = "https://repusense.net";

function getBusinesses(): string[] {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf("--file");
  if (fileIdx !== -1 && args[fileIdx + 1]) {
    return fs
      .readFileSync(args[fileIdx + 1], "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }
  return args.filter((a) => !a.startsWith("--"));
}

function emailDraft(r: PublicReport): string {
  const debilidad = r.improvements[0] || r.topThemes[0] || "algún punto a mejorar";
  return `Asunto: ${r.business.name} — ${r.reputationScore}/100 de reputación (informe gratis)

Hola,

He analizado con IA las reseñas de ${r.business.name} en Google y quería compartir el resultado:

• Puntuación de reputación: ${r.reputationScore}/100 (${r.averageRating}★, ${r.business.totalReviews} reseñas)
• ${r.sentiment.positive}% de reseñas positivas
• Lo que más valoran: ${r.strengths.slice(0, 2).join(", ")}
• A vigilar: ${debilidad}

En Repusense centralizamos tus reseñas, las analizamos con IA y te avisamos al instante de las negativas, para que respondas antes de que hagan daño.

¿Te paso el informe completo de ${r.business.name}? Es gratis: ${APP_URL}/analisis-gratis

Un saludo,
[Tu nombre] — Repusense
${APP_URL}`;
}

async function main() {
  const businesses = getBusinesses();
  if (businesses.length === 0) {
    console.log('Uso: npm run outreach -- "Negocio, Ciudad" ["Otro, Ciudad" ...]');
    console.log("  o: npm run outreach -- --file outreach-businesses.txt");
    return;
  }

  const out: string[] = [`# Outreach — ${new Date().toLocaleDateString("es-ES")}\n`];
  for (const q of businesses) {
    process.stdout.write(`Analizando "${q}"… `);
    const result = await generatePublicReport(q);
    if (!result.ok) {
      console.log(`✗ ${result.error}`);
      out.push(`\n## ${q}\n\n_No se pudo generar: ${result.error}_\n`);
      continue;
    }
    const r = result.report;
    console.log(`✓ ${r.reputationScore}/100`);
    out.push(
      `\n## ${r.business.name} — ${r.reputationScore}/100\n` +
        `${r.business.address}\n\n` +
        "```\n" +
        emailDraft(r) +
        "\n```\n"
    );
  }

  fs.writeFileSync("outreach-output.md", out.join("\n"), "utf8");
  console.log(`\n✅ Borradores guardados en outreach-output.md (${businesses.length} negocios).`);
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
