const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://repusense.net";

/** Datos estructurados de la app para resultados enriquecidos en Google. */
export function SoftwareJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Repusense",
    url: "https://repusense.net",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Centraliza, analiza y mejora tu reputación online. Conecta Google, Yelp, TripAdvisor y Trustpilot, recibe análisis de sentimiento con IA y alertas automáticas.",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "EUR",
        description: "Hasta 50 reseñas/mes, 1 canal conectado",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "29",
        priceCurrency: "EUR",
        description: "Hasta 500 reseñas/mes, 3 canales conectados",
      },
      {
        "@type": "Offer",
        name: "Business",
        price: "79",
        priceCurrency: "EUR",
        description: "Reseñas ilimitadas, todos los canales",
      },
    ],
    featureList: [
      "Análisis de sentimiento con IA",
      "Monitorización de Google Reviews, Yelp, TripAdvisor y Trustpilot",
      "Alertas de reseñas negativas en tiempo real",
      "Dashboard de reputación con puntuación 0-100",
      "Reportes exportables en PDF y CSV",
      "Respuestas sugeridas con IA",
    ],
    screenshot: "https://repusense.net/og-image.png",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage — hace que las preguntas aparezcan expandidas en Google. */
export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList — ruta de migas para Google. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${APP_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
