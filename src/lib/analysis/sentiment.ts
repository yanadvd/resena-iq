import { getOpenAI, OPENAI_MODEL } from "../openai";
import type { Sentiment } from "@prisma/client";

export interface ReviewAnalysis {
  sentiment: Sentiment;
  sentimentScore: number; // -1..1
  themes: string[];
  keywords: string[];
}

export interface AnalyzableReview {
  id: string;
  rating: number;
  text: string;
}

// ---------------------------------------------------------------------------
//  Léxico para el analizador heurístico (fallback sin OpenAI).
//  Español + inglés básico. Suficiente para una demo funcional.
// ---------------------------------------------------------------------------
const POSITIVE_WORDS = [
  "excelente", "genial", "increíble", "recomiendo", "encanta", "encantó",
  "perfecto", "rápido", "amable", "limpio", "delicioso", "bueno", "buena",
  "fantástico", "maravilloso", "atento", "calidad", "feliz", "satisfecho",
  "great", "excellent", "amazing", "love", "perfect", "friendly", "clean",
  "delicious", "good", "wonderful", "best", "awesome", "fast", "helpful",
];
const NEGATIVE_WORDS = [
  "malo", "mala", "terrible", "horrible", "lento", "sucio", "caro", "pésimo",
  "decepción", "decepcionado", "frío", "grosero", "espera", "tardó", "nunca",
  "peor", "fatal", "error", "problema", "cancelar", "reembolso", "queja",
  "bad", "terrible", "horrible", "slow", "dirty", "rude", "worst", "awful",
  "disappointed", "expensive", "cold", "wait", "never", "refund", "complaint",
];

// Temas detectables por palabras clave -> etiqueta normalizada
const THEME_LEXICON: Record<string, string[]> = {
  "Atención al cliente": ["atención", "personal", "amable", "grosero", "staff", "service", "trato", "empleado"],
  "Tiempos de espera": ["espera", "lento", "rápido", "tardó", "wait", "slow", "fast", "demora", "cola"],
  "Calidad del producto": ["calidad", "producto", "delicioso", "sabor", "quality", "product", "comida", "food"],
  "Precio": ["precio", "caro", "barato", "price", "expensive", "cheap", "valor", "coste"],
  "Limpieza": ["limpio", "sucio", "clean", "dirty", "higiene", "limpieza"],
  "Ambiente": ["ambiente", "música", "ruido", "decoración", "atmosphere", "vibe", "lugar"],
  "Entrega / Envío": ["entrega", "envío", "delivery", "shipping", "paquete", "pedido"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9áéíóúñü\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function normalize(word: string): string {
  return word.normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/** Analizador heurístico: combina rating + léxico. Determinista y gratis. */
export function heuristicAnalyze(review: AnalyzableReview): ReviewAnalysis {
  const tokens = tokenize(review.text);
  const tokenSet = new Set(tokens);

  let score = 0;
  for (const w of POSITIVE_WORDS) if (tokenSet.has(normalize(w))) score += 1;
  for (const w of NEGATIVE_WORDS) if (tokenSet.has(normalize(w))) score -= 1;

  // Combina señal léxica con el rating (1..5 -> -1..1)
  const ratingSignal = (review.rating - 3) / 2; // 1->-1, 3->0, 5->1
  const lexSignal = Math.max(-1, Math.min(1, score / 3));
  const combined = Math.max(-1, Math.min(1, ratingSignal * 0.6 + lexSignal * 0.4));

  let sentiment: Sentiment = "NEUTRAL";
  if (combined > 0.2) sentiment = "POSITIVE";
  else if (combined < -0.2) sentiment = "NEGATIVE";

  // Temas
  const themes: string[] = [];
  for (const [theme, words] of Object.entries(THEME_LEXICON)) {
    if (words.some((w) => tokenSet.has(normalize(w)))) themes.push(theme);
  }

  // Keywords: palabras más significativas (no stopwords, >3 letras)
  const STOP = new Set([
    "para", "pero", "como", "este", "esta", "muy", "que", "con", "los", "las",
    "una", "del", "por", "the", "and", "was", "with", "for", "this", "that",
    "muchas", "todo", "todos", "han", "fue", "son", "más", "nos",
  ]);
  const freq = new Map<string, number>();
  for (const t of tokens) {
    if (t.length > 3 && !STOP.has(t)) freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);

  return { sentiment, sentimentScore: Number(combined.toFixed(2)), themes, keywords };
}

/**
 * Analiza un lote de reseñas. Usa OpenAI si está configurado; si no, recurre
 * al analizador heurístico local. Siempre devuelve un resultado por reseña.
 */
export async function analyzeReviews(
  reviews: AnalyzableReview[]
): Promise<Map<string, ReviewAnalysis>> {
  const results = new Map<string, ReviewAnalysis>();
  if (reviews.length === 0) return results;

  const openai = getOpenAI();
  if (!openai) {
    for (const r of reviews) results.set(r.id, heuristicAnalyze(r));
    return results;
  }

  // Procesa en lotes para limitar tokens por petición.
  const BATCH = 15;
  for (let i = 0; i < reviews.length; i += BATCH) {
    const batch = reviews.slice(i, i + BATCH);
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Eres un analista experto de reseñas de negocios. Devuelves SOLO JSON válido. " +
              "Para cada reseña determina: sentiment ('POSITIVE'|'NEUTRAL'|'NEGATIVE'), " +
              "sentimentScore (número de -1 a 1), themes (máx 3 temas en español, p.ej. " +
              "'Atención al cliente', 'Precio', 'Calidad del producto'), keywords (máx 5).",
          },
          {
            role: "user",
            content:
              `Analiza estas reseñas y responde con {"results":[{"id","sentiment","sentimentScore","themes":[],"keywords":[]}]}.\n` +
              JSON.stringify(
                batch.map((r) => ({ id: r.id, rating: r.rating, text: r.text }))
              ),
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(raw) as {
        results?: Array<{
          id: string;
          sentiment: Sentiment;
          sentimentScore: number;
          themes?: string[];
          keywords?: string[];
        }>;
      };
      for (const item of parsed.results ?? []) {
        results.set(item.id, {
          sentiment: item.sentiment ?? "NEUTRAL",
          sentimentScore: Number(item.sentimentScore ?? 0),
          themes: item.themes ?? [],
          keywords: item.keywords ?? [],
        });
      }
    } catch (err) {
      console.error("[analysis] fallo OpenAI, usando heurística para el lote:", err);
      for (const r of batch) results.set(r.id, heuristicAnalyze(r));
    }
  }

  // Garantiza que toda reseña tenga resultado
  for (const r of reviews) {
    if (!results.has(r.id)) results.set(r.id, heuristicAnalyze(r));
  }
  return results;
}
