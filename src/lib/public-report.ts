import { getOpenAI, OPENAI_MODEL } from "./openai";
import { analyzeReviews } from "./analysis/sentiment";
import { computeReputationScore } from "./analysis/summary";

// ============================================================================
//  Informe de reputación PÚBLICO (lead magnet "Análisis gratis").
//  Busca un negocio en Google, trae sus reseñas y las analiza con IA — SIN
//  guardar nada en la BD ni requerir login. Es el gancho de captación.
// ============================================================================

export interface PublicReport {
  business: {
    name: string;
    address: string;
    rating: number;
    totalReviews: number;
  };
  reputationScore: number;
  averageRating: number;
  reviewsAnalyzed: number;
  sentiment: { positive: number; neutral: number; negative: number };
  topThemes: string[];
  strengths: string[];
  improvements: string[];
  summary: string;
  samples: { author: string; rating: number; text: string; sentiment: string }[];
}

export type PublicReportResult =
  | { ok: true; report: PublicReport }
  | { ok: false; error: string };

interface PlaceReview {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
}
interface Place {
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
}

export async function generatePublicReport(
  query: string
): Promise<PublicReportResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return { ok: false, error: "Servicio no disponible temporalmente." };
  if (!query || query.trim().length < 3) {
    return { ok: false, error: "Escribe el nombre de tu negocio y la ciudad." };
  }

  // 1) Buscar el negocio + sus reseñas (una sola llamada a Places)
  let place: Place | undefined;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews",
      },
      body: JSON.stringify({ textQuery: query, languageCode: "es" }),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, error: "No se pudo consultar Google. Inténtalo de nuevo." };
    const data = (await res.json()) as { places?: Place[] };
    place = data.places?.[0];
  } catch {
    return { ok: false, error: "Error al conectar con Google. Inténtalo de nuevo." };
  }

  if (!place) {
    return { ok: false, error: "No encontramos ese negocio. Prueba con el nombre + ciudad (p. ej. \"Café Aurora, Valencia\")." };
  }

  const reviews = (place.reviews ?? [])
    .map((r, i) => ({
      id: String(i),
      rating: Math.max(1, Math.min(5, Math.round(r.rating ?? 0))),
      author: r.authorAttribution?.displayName ?? "Anónimo",
      text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
    }))
    .filter((r) => r.text.length > 0);

  if (reviews.length === 0) {
    return { ok: false, error: "Ese negocio aún no tiene reseñas con texto en Google." };
  }

  // 2) Análisis IA por reseña
  const analyses = await analyzeReviews(
    reviews.map((r) => ({ id: r.id, rating: r.rating, text: r.text }))
  );
  let pos = 0,
    neu = 0,
    neg = 0;
  const themeCounts = new Map<string, number>();
  for (const r of reviews) {
    const a = analyses.get(r.id);
    if (a?.sentiment === "POSITIVE") pos++;
    else if (a?.sentiment === "NEGATIVE") neg++;
    else neu++;
    for (const t of a?.themes ?? []) themeCounts.set(t, (themeCounts.get(t) ?? 0) + 1);
  }
  const n = reviews.length;
  const avgRating = place.rating ?? reviews.reduce((s, r) => s + r.rating, 0) / n;
  const positive = Math.round((pos / n) * 100);
  const neutral = Math.round((neu / n) * 100);
  const negative = Math.round((neg / n) * 100);
  const reputationScore = computeReputationScore(
    avgRating,
    positive,
    negative,
    place.userRatingCount ?? n
  );
  const topThemes = [...themeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);

  // 3) Resumen narrativo con IA (fortalezas / mejoras), con fallback
  let strengths: string[] = topThemes.slice(0, 3);
  let improvements: string[] = [];
  let summary = "";
  const openai = getOpenAI();
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Eres un consultor de reputación. A partir de reseñas reales de un negocio, devuelve SOLO JSON: " +
              '{"summary": string (2 frases en español, tono cercano y útil), "strengths": string[] (3), "improvements": string[] (3)}.',
          },
          {
            role: "user",
            content: JSON.stringify({
              negocio: place.displayName?.text,
              media: Number(avgRating.toFixed(1)),
              positivasPct: positive,
              reseñas: reviews.map((r) => ({ rating: r.rating, text: r.text.slice(0, 240) })),
            }),
          },
        ],
      });
      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}") as {
        summary?: string;
        strengths?: string[];
        improvements?: string[];
      };
      if (parsed.summary) summary = parsed.summary;
      if (parsed.strengths?.length) strengths = parsed.strengths;
      if (parsed.improvements?.length) improvements = parsed.improvements;
    } catch {
      /* fallback abajo */
    }
  }
  if (!summary) {
    summary =
      `${place.displayName?.text} tiene una calificación de ${avgRating.toFixed(1)}★ y un ${positive}% de reseñas positivas. ` +
      (negative >= 30
        ? "Hay señales de insatisfacción que conviene atender."
        : "La percepción general es buena, con margen de mejora en algunos puntos.");
  }

  const samples = reviews.slice(0, 3).map((r) => ({
    author: r.author,
    rating: r.rating,
    text: r.text.slice(0, 220),
    sentiment: analyses.get(r.id)?.sentiment ?? "NEUTRAL",
  }));

  return {
    ok: true,
    report: {
      business: {
        name: place.displayName?.text ?? query,
        address: place.formattedAddress ?? "",
        rating: Number(avgRating.toFixed(1)),
        totalReviews: place.userRatingCount ?? n,
      },
      reputationScore,
      averageRating: Number(avgRating.toFixed(1)),
      reviewsAnalyzed: n,
      sentiment: { positive, neutral, negative },
      topThemes,
      strengths,
      improvements,
      summary,
      samples,
    },
  };
}
