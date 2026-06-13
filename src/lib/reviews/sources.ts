import type { ReviewSource, SourceType } from "@prisma/client";

// ============================================================================
//  Adaptadores de fuentes de reseñas.
//
//  Cada plataforma (Google, Yelp, TripAdvisor, Trustpilot) expone su propia
//  API o requiere scraping. Aquí definimos una interfaz común y un proveedor
//  "demo" que genera reseñas realistas para que la automatización sea
//  funcional sin credenciales externas.
//
//  Para producción: sustituye `demoFetch` por llamadas reales, p.ej.:
//   - Google:     Places API "Place Details" -> result.reviews
//                 https://developers.google.com/maps/documentation/places/web-service/details
//   - Yelp:       Fusion API GET /businesses/{id}/reviews
//   - Trustpilot: Business Units API GET /business-units/{id}/reviews
//   - TripAdvisor:Content API location/{id}/reviews
//  Mantén la misma forma de salida (RawReview[]) y el resto del pipeline
//  (dedupe + análisis IA + alertas) sigue funcionando sin cambios.
// ============================================================================

export interface RawReview {
  externalId: string;
  author: string;
  rating: number;
  text: string;
  publishedAt: Date;
  language?: string;
}

export interface SourceAdapter {
  type: SourceType;
  fetchReviews(source: ReviewSource, since?: Date | null): Promise<RawReview[]>;
}

// ---------------------------------------------------------------------------
//  Generador demo determinista por fuente.
// ---------------------------------------------------------------------------
const SAMPLE_AUTHORS = [
  "María G.", "John D.", "Laura P.", "Carlos M.", "Sophie L.", "Ahmed K.",
  "Elena R.", "Tom W.", "Lucía F.", "David S.", "Nina V.", "Pablo H.",
];

const POSITIVE_TEMPLATES = [
  "Servicio excelente y muy rápido. El personal fue super amable, repetiré sin duda.",
  "La calidad del producto es increíble y el precio justo. Muy recomendable.",
  "Todo impecable, lugar limpio y ambiente agradable. La atención de 10.",
  "Great experience, friendly staff and delicious food. Highly recommend!",
  "Llegó mi pedido antes de lo esperado y en perfecto estado. Encantada.",
];
const NEUTRAL_TEMPLATES = [
  "Está bien en general, aunque la espera fue un poco larga. Correcto.",
  "Cumple, sin más. El precio me pareció algo elevado para lo que ofrecen.",
  "It was okay. Nothing special but nothing bad either.",
  "El producto cumple, pero el embalaje llegó algo dañado.",
];
const NEGATIVE_TEMPLATES = [
  "Muy decepcionado. El servicio fue lento y el personal poco amable.",
  "La comida llegó fría y tardó muchísimo. No volveré, fatal.",
  "Terrible experience, the staff was rude and the place was dirty.",
  "Pedí un reembolso por un problema con el pedido y nunca respondieron.",
  "Caro para la calidad que dan. Esperaba mucho más, una pena.",
];

function pseudoRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

/** Genera entre 3 y 8 reseñas nuevas para una fuente, posteriores a `since`. */
function demoFetch(source: ReviewSource, since?: Date | null): RawReview[] {
  const rand = pseudoRandom(hashString(source.id + new Date().toDateString()));
  const count = 3 + Math.floor(rand() * 6);
  const reviews: RawReview[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const roll = rand();
    let rating: number;
    let text: string;
    if (roll < 0.55) {
      rating = 4 + Math.round(rand());
      text = POSITIVE_TEMPLATES[Math.floor(rand() * POSITIVE_TEMPLATES.length)];
    } else if (roll < 0.78) {
      rating = 3;
      text = NEUTRAL_TEMPLATES[Math.floor(rand() * NEUTRAL_TEMPLATES.length)];
    } else {
      rating = 1 + Math.round(rand());
      text = NEGATIVE_TEMPLATES[Math.floor(rand() * NEGATIVE_TEMPLATES.length)];
    }
    const publishedAt = new Date(now - Math.floor(rand() * 30) * 86400000);
    if (since && publishedAt <= since) continue;

    reviews.push({
      externalId: `${source.type.toLowerCase()}-${source.id.slice(0, 6)}-${now}-${i}`,
      author: SAMPLE_AUTHORS[Math.floor(rand() * SAMPLE_AUTHORS.length)],
      rating,
      text,
      publishedAt,
      language: "es",
    });
  }
  return reviews;
}

// ---------------------------------------------------------------------------
//  Registro de adaptadores. Todos usan demoFetch por defecto; reemplaza el
//  cuerpo de cada uno con la integración real cuando tengas las credenciales.
// ---------------------------------------------------------------------------
function makeAdapter(type: SourceType): SourceAdapter {
  return {
    type,
    async fetchReviews(source, since) {
      // TODO(producción): llamar a la API real de la plataforma `type`.
      // Por ahora, generador demo para que la automatización sea funcional.
      return demoFetch(source, since);
    },
  };
}

export const ADAPTERS: Record<SourceType, SourceAdapter> = {
  GOOGLE: makeAdapter("GOOGLE"),
  YELP: makeAdapter("YELP"),
  TRIPADVISOR: makeAdapter("TRIPADVISOR"),
  TRUSTPILOT: makeAdapter("TRUSTPILOT"),
  CSV: {
    type: "CSV",
    // CSV no se sincroniza automáticamente; se ingiere vía /api/reviews/import.
    async fetchReviews() {
      return [];
    },
  },
};

export function getAdapter(type: SourceType): SourceAdapter {
  return ADAPTERS[type];
}

export const SOURCE_META: Record<
  SourceType,
  { label: string; color: string; needsUrl: boolean }
> = {
  GOOGLE: { label: "Google Reviews", color: "#4285F4", needsUrl: true },
  YELP: { label: "Yelp", color: "#FF1A1A", needsUrl: true },
  TRIPADVISOR: { label: "TripAdvisor", color: "#34E0A1", needsUrl: true },
  TRUSTPILOT: { label: "Trustpilot", color: "#00B67A", needsUrl: true },
  CSV: { label: "Importación CSV", color: "#8B8B96", needsUrl: false },
};
