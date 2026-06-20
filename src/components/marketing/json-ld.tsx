const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://repusense.net";

/** Datos estructurados de la app para resultados enriquecidos en Google. */
export function SoftwareJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Repusense",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: APP_URL,
    description:
      "Análisis de reseñas con IA para negocios: centraliza Google y otras plataformas, mide tu reputación, detecta temas y recibe alertas de reseñas negativas.",
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Pro", price: "29", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Business", price: "79", priceCurrency: "EUR" },
    ],
    publisher: { "@type": "Organization", name: "Repusense", url: APP_URL },
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
