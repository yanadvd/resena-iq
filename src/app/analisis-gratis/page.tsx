import type { Metadata } from "next";
import { Zap, Bot, Bell } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { FreeReportTool } from "@/components/marketing/free-report-tool";

const TITLE = "Análisis de reputación gratis con IA | Repusense";
const DESCRIPTION =
  "Analiza gratis las reseñas de tu negocio en Google con inteligencia artificial: puntuación de reputación, sentimiento y puntos a mejorar. Sin registro, en 30 segundos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/analisis-gratis" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export default function AnalisisGratisPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[600px] opacity-80" />
      <SiteHeader />

      <section className="container pt-12 pb-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="size-3.5 text-accent" /> Gratis · sin registro · en 30 segundos
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
            ¿Qué dicen tus clientes
            <span className="block italic text-accent">de tu negocio?</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Escribe el nombre de tu negocio y la IA de Repusense analizará tus reseñas
            de Google: tu puntuación de reputación, lo que más gusta y lo que tienes
            que mejorar.
          </p>
        </div>

        <FreeReportTool />

        {/* Cómo funciona */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Escribe tu negocio", desc: "Nombre + ciudad. Lo encontramos en Google al instante." },
            { icon: Bot, title: "La IA lo analiza", desc: "Sentimiento, temas y puntuación de reputación con IA." },
            { icon: Bell, title: "Monitorízalo gratis", desc: "Crea tu cuenta y recibe alertas de reseñas negativas." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card/40 p-6 text-center">
              <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
