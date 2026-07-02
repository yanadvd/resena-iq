import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd } from "@/components/marketing/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Repusense — Análisis de reseñas con IA para tu negocio",
  description:
    "Centraliza, analiza y mejora tu reputación online. Conecta Google, Yelp, TripAdvisor y Trustpilot, recibe análisis de sentimiento con IA y alertas automáticas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Repusense — Análisis de reseñas con IA para negocios locales",
    description:
      "Centraliza tus reseñas de Google y otras plataformas, analízalas con IA y mejora tu reputación online. Alertas, reportes y respuestas con IA.",
    type: "website",
    locale: "es_ES",
    siteName: "Repusense",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Repusense — Análisis de reseñas con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repusense — Análisis de reseñas con IA para negocios locales",
    description:
      "Centraliza tus reseñas, analízalas con IA y mejora tu reputación online.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
