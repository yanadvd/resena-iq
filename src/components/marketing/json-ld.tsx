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
