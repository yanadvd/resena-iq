import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "ReseñaIQ — Análisis de reseñas con IA para tu negocio",
  description:
    "Centraliza, analiza y mejora tu reputación online. Conecta Google, Yelp, TripAdvisor y Trustpilot, recibe análisis de sentimiento con IA y alertas automáticas.",
  keywords: [
    "análisis de reseñas",
    "reputación online",
    "sentimiento IA",
    "Google Reviews",
    "SaaS reseñas",
  ],
  openGraph: {
    title: "ReseñaIQ — Tu reputación online, bajo control",
    description:
      "Análisis de reseñas con IA, automatización y alertas para negocios.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-grain antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
