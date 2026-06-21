import type { Metadata } from "next";
import {
  Zap, Bot, Bell, Gauge, Tags, ThumbsUp, FileText, MessageSquareQuote,
  Star, AlertTriangle,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { FreeReportTool } from "@/components/marketing/free-report-tool";
import { FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Análisis de reputación gratis con IA | Repusense";
const DESCRIPTION =
  "Analiza gratis las reseñas de tu negocio en Google con inteligencia artificial: puntuación de reputación, sentimiento y puntos a mejorar. Sin registro, en 30 segundos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/analisis-gratis" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const INCLUDES = [
  { icon: Gauge, title: "Puntuación de reputación", desc: "Un número de 0 a 100 que resume cómo te perciben tus clientes." },
  { icon: Bot, title: "Análisis de sentimiento", desc: "Qué porcentaje de tus reseñas es positivo, neutro o negativo." },
  { icon: Tags, title: "Temas y quejas recurrentes", desc: "Lo que más se repite: precio, servicio, espera, limpieza…" },
  { icon: ThumbsUp, title: "Puntos fuertes y a mejorar", desc: "Qué destacar y qué arreglar para subir tu valoración." },
  { icon: FileText, title: "Resumen ejecutivo con IA", desc: "Un análisis en lenguaje claro, sin tecnicismos, en segundos." },
  { icon: MessageSquareQuote, title: "Ejemplos de reseñas", desc: "Reseñas reales analizadas con su sentimiento detectado." },
];

const FAQ = [
  { q: "¿El análisis de reseñas es realmente gratis?", a: "Sí, totalmente. No pedimos tarjeta ni registro para ver tu informe de reputación." },
  { q: "¿De dónde salen las reseñas que analizáis?", a: "De la ficha pública de tu negocio en Google. Analizamos con IA las reseñas más recientes que Google expone." },
  { q: "¿Qué negocios puedo analizar?", a: "Cualquier negocio con ficha en Google: restaurantes, hoteles, clínicas, tiendas, gimnasios, talleres y más." },
  { q: "¿Necesito registrarme para ver el informe?", a: "No. El informe gratis es inmediato y sin cuenta. Si quieres monitorización continua y alertas de reseñas negativas, creas una cuenta gratuita." },
  { q: "¿Cada cuánto se actualiza el análisis?", a: "El informe gratis es puntual. Con una cuenta de Repusense, sincronizamos y analizamos tus reseñas de forma automática y te avisamos de las novedades." },
];

export default function AnalisisGratisPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[600px] opacity-80" />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      <section className="container pt-12 pb-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="size-3.5 text-accent" /> Gratis · sin registro · en 30 segundos
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
            Análisis de reseñas de Google
            <span className="block italic text-accent">gratis y con IA</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Escribe el nombre de tu negocio y la inteligencia artificial de Repusense
            analizará tus reseñas de Google: tu puntuación de reputación, lo que más
            gusta y lo que tienes que mejorar.
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

      {/* ¿Qué incluye? */}
      <section className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            ¿Qué incluye tu informe gratis?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Mucho más que una nota: un análisis completo de tu reputación en Google,
            generado con IA en segundos.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/50 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplo de informe */}
      <section className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Así se ve tu informe</h2>
          <p className="mt-3 text-muted-foreground">Un ejemplo del análisis que recibirás (datos de muestra).</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-card/60 p-7 shadow-xl shadow-primary/5">
          <div className="text-center">
            <p className="font-display text-lg font-semibold">Café Aurora</p>
            <p className="text-xs text-muted-foreground">Valencia, España</p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <Gauge className="mx-auto size-4 text-accent" />
              <p className="mt-1 font-display text-2xl font-semibold text-accent">87</p>
              <p className="text-[11px] text-muted-foreground">Reputación</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <Star className="mx-auto size-4 text-[hsl(var(--neutral))]" />
              <p className="mt-1 font-display text-2xl font-semibold">4.6★</p>
              <p className="text-[11px] text-muted-foreground">Media</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <ThumbsUp className="mx-auto size-4 text-[hsl(var(--positive))]" />
              <p className="mt-1 font-display text-2xl font-semibold">78%</p>
              <p className="text-[11px] text-muted-foreground">Positivas</p>
            </div>
          </div>
          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full">
            <span className="bg-[hsl(var(--positive))]" style={{ width: "78%" }} />
            <span className="bg-[hsl(var(--neutral))]" style={{ width: "14%" }} />
            <span className="bg-[hsl(var(--negative))]" style={{ width: "8%" }} />
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--positive))]">
                <ThumbsUp className="size-3.5" /> Puntos fuertes
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Atención cercana y rápida</li>
                <li>• Calidad del café y repostería</li>
                <li>• Ambiente acogedor</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--negative))]">
                <AlertTriangle className="size-3.5" /> A mejorar
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Tiempos de espera en hora punta</li>
                <li>• Variedad sin gluten</li>
                <li>• Ruido a media tarde</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque de contenido SEO */}
      <section className="container py-16">
        <div className="mx-auto max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Analiza las reseñas de Google de tu negocio, gratis
          </h2>
          <p>
            Las reseñas de Google son hoy tu mejor escaparate: la mayoría de clientes
            consulta tu valoración antes de decidir. Pero leerlas una a una y entender
            qué piensan de verdad es imposible cuando tienes cientos. Por eso creamos
            este <strong className="text-foreground">análisis de reseñas con
            inteligencia artificial</strong>, gratis y sin registro.
          </p>
          <p>
            En segundos, Repusense lee tus reseñas más recientes de Google, calcula tu{" "}
            <strong className="text-foreground">puntuación de reputación</strong>, detecta
            el <strong className="text-foreground">sentimiento</strong> (positivo, neutro o
            negativo) y los <strong className="text-foreground">temas recurrentes</strong>,
            y te dice qué destacas y qué deberías mejorar para subir tu nota.
          </p>
          <p>
            Es ideal para <strong className="text-foreground">restaurantes, hoteles,
            clínicas, gimnasios, peluquerías y cualquier negocio local</strong> que quiera
            entender y mejorar su reputación online sin perder horas. Y si quieres
            monitorización continua con alertas de reseñas negativas, puedes crear una
            cuenta gratuita en un clic.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl pb-24">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-border bg-card/50 p-6">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-accent transition-transform group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
