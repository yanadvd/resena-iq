import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bell, Bot, TrendingUp, Star, Hotel,
  BarChart3, FileText, Layers, MessageSquareQuote,
  CheckCircle2, AlertTriangle, ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Gestión de reseñas para hoteles y alojamientos | Repusense";
const DESCRIPTION =
  "Centraliza y analiza las reseñas de tu hotel en TripAdvisor, Google y Booking con IA. Alertas en tiempo real, respuestas automáticas y análisis por departamento para subir tu ranking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-hoteles" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PROBLEMS = [
  {
    heading: "200 reseñas al mes, imposible de gestionar manualmente",
    text: "Un hotel activo puede recibir cientos de reseñas. Leerlas todas, identificar los problemas y responder a cada una requiere tiempo que el equipo no tiene.",
  },
  {
    heading: "TripAdvisor premia la velocidad de respuesta",
    text: "El algoritmo de ranking de TripAdvisor penaliza a los hoteles que no responden. Sin un sistema de alertas, tu posición baja aunque tus valoraciones sean buenas.",
  },
  {
    heading: "No sabes qué departamento genera las quejas",
    text: "¿Es la recepción, el housekeeping, el restaurante o el spa? Sin análisis de temas, todas las quejas parecen iguales y no sabes dónde intervenir.",
  },
  {
    heading: "Las comparaciones estacionales son ciegas",
    text: "¿Tu reputación baja cada agosto? ¿Mejora tras el cambio de equipo? Sin datos históricos no puedes correlacionar decisiones con resultados.",
  },
];

const FEATURES = [
  {
    icon: Layers,
    title: "TripAdvisor, Google y más en un panel",
    desc: "Centraliza todas tus plataformas de reseñas. Un solo lugar para leer, analizar y responder — sin saltar entre herramientas.",
  },
  {
    icon: Bell,
    title: "Alerta inmediata por reseña negativa",
    desc: "Cuando llega una valoración de 1 o 2 estrellas recibes el aviso en minutos. Respondes antes de que la siguiente reserva potencial la lea.",
  },
  {
    icon: Bot,
    title: "Respuesta IA adaptada al tono hotelero",
    desc: "Genera respuestas profesionales, cálidas y personalizadas para cada reseña. Tú las revisas y publicas. Multiplica tu capacidad de respuesta sin ampliar el equipo.",
  },
  {
    icon: BarChart3,
    title: "Análisis por departamento",
    desc: "La IA detecta qué áreas menciona cada reseña: recepción, habitaciones, limpieza, desayuno, piscina. Sabes exactamente dónde actuar.",
  },
  {
    icon: TrendingUp,
    title: "Tendencia semanal y estacional",
    desc: "Visualiza cómo evoluciona tu reputación en el tiempo. Detecta patrones estacionales y mide el impacto de cada cambio operativo.",
  },
  {
    icon: FileText,
    title: "Reportes para dirección y propietarios",
    desc: "Genera informes mensuales en PDF con evolución de valoraciones, temas principales y puntuación de reputación. Listos para la reunión de gestión.",
  },
];

const PLATFORMS = [
  { name: "TripAdvisor", tag: "Principal" },
  { name: "Google Reviews", tag: "" },
  { name: "Yelp", tag: "" },
  { name: "Trustpilot", tag: "" },
];

const STEPS = [
  {
    n: "01",
    title: "Conecta todas tus plataformas",
    desc: "Google, TripAdvisor y más en 5 minutos. Sin accesos técnicos, sin APIs ni configuraciones complejas.",
  },
  {
    n: "02",
    title: "Análisis automático 24/7",
    desc: "Cada reseña se clasifica por sentimiento, tema y departamento. El dashboard se actualiza en tiempo real.",
  },
  {
    n: "03",
    title: "Responde más rápido y mejor",
    desc: "Alerta + respuesta IA lista para revisar. Reduce de 30 minutos a 3 minutos por reseña.",
  },
];

const STATS = [
  { value: "1 punto", label: "más en TripAdvisor = hasta 11% más RevPAR*" },
  { value: "79%", label: "de viajeros lee reseñas antes de reservar un hotel" },
  { value: "65%", label: "de huéspedes confía más en hoteles que responden a reseñas" },
  { value: "×4", label: "más reseñas procesa un hotel vs. un restaurante de mismo tamaño" },
];

const FAQ = [
  {
    q: "¿Funciona con Booking.com?",
    a: "Actualmente integramos Google Reviews, TripAdvisor, Yelp y Trustpilot. Booking.com está en el roadmap. Mientras tanto, puedes exportar las reseñas de Booking en CSV e importarlas manualmente en Repusense.",
  },
  {
    q: "¿Puedo gestionar varios establecimientos (cadena hotelera)?",
    a: "Sí. Con el plan Business puedes conectar múltiples propiedades y ver la reputación de cada hotel por separado o de forma consolidada. Ideal para cadenas o grupos hoteleros.",
  },
  {
    q: "¿El análisis por departamento funciona en español e inglés?",
    a: "Sí. El análisis de sentimiento y la detección de temas funciona en español, inglés, francés, alemán e italiano. Perfecto para hoteles con clientela internacional.",
  },
  {
    q: "¿Cuántas reseñas puede procesar al mes?",
    a: "El plan Business procesa reseñas ilimitadas, sin restricciones de volumen. Ideal para hoteles urbanos o resorts con alta afluencia de reseñas.",
  },
];

export default function ParaHotelesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para hoteles", path: "/para-hoteles" },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Hotel className="size-3.5 text-accent" />
            Para hoteles, apartamentos turísticos y alojamientos
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            TripAdvisor mueve tus reservas.
            <span className="block italic text-accent">Repusense controla TripAdvisor.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            Centraliza las reseñas de todas tus plataformas, detecta qué
            departamentos generan quejas y responde con IA antes de que la
            siguiente reserva potencial lea una reseña sin respuesta tuya.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Analiza tu hotel gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Ver el plan Business</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Análisis en 30 segundos · Cancela cuando quieras
          </p>
        </div>

        {/* Platforms */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/60 bg-card/30 px-8 py-5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conecta con
            </span>
            {PLATFORMS.map((p) => (
              <span key={p.name} className="flex items-center gap-2">
                <span className="font-semibold text-foreground/80">{p.name}</span>
                {p.tag && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    {p.tag}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRIPADVISOR RANKING CALLOUT */}
      <section className="container pb-4">
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/5 via-card to-primary/5 p-7">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <ArrowUpRight className="mt-0.5 size-6 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">TripAdvisor rankea por velocidad de respuesta</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  El algoritmo de popularidad de TripAdvisor tiene en cuenta cuánto tardas en
                  responder a las reseñas. Un sistema de alertas en tiempo real puede
                  mejorar tu posición directamente, sin nuevas reseñas.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0" asChild>
              <Link href="/analisis-gratis">Ver mi ranking</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            El problema
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            El volumen de reseñas de un hotel es imposible de gestionar a mano
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div
              key={p.heading}
              className="flex gap-5 rounded-2xl border border-border bg-card/40 p-7"
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive/70" />
              <div>
                <p className="font-semibold text-foreground">{p.heading}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            La solución
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            De cientos de reseñas a inteligencia accionable
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/50 p-7 transition-all hover:border-primary/40 hover:bg-card"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Cómo funciona
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Configuración en 5 minutos, resultados desde el primer día
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sin integraciones técnicas, sin IT. El equipo de recepción o
              dirección lo puede configurar solo.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Análisis multiidioma: español, inglés, francés, alemán",
                "Sin límite de volumen en el plan Business",
                "Histórico completo desde el día 1",
                "Análisis por departamento: habitaciones, recepción, desayuno, spa",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex gap-5 rounded-2xl border border-border bg-card/50 p-6"
              >
                <span className="font-display text-3xl font-semibold text-accent">{s.n}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container py-12">
        <div className="grid gap-6 rounded-3xl border border-border bg-card/40 p-10 text-center md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value}>
              <p className="font-display text-4xl font-semibold text-accent">{s.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          *Fuente: Cornell Center for Hospitality Research / TripAdvisor Economic Impact Study
        </p>
      </section>

      {/* TESTIMONIAL */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-10">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="mt-6 font-display text-xl font-semibold leading-relaxed text-foreground">
            "Repusense nos ayudó a identificar que el problema de valoraciones
            era el check-in, no las habitaciones. Lo corregimos y subimos medio
            punto en TripAdvisor en 6 semanas. Ese medio punto se traduce
            directamente en más reservas directas."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Javier A.</p>
            <p className="text-sm text-muted-foreground">Revenue Manager · Hotel Sol & Mar, Costa del Sol</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Puntuación reputación: 61 → 84 en 90 días
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl py-20">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card/50 p-6"
            >
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="flex items-center justify-between">
                  {item.q}
                  <span className="text-accent transition-transform group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-12 text-center md:p-16">
          <div className="bg-mesh absolute inset-0 -z-10 opacity-60" />
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Plan Business — sin límite de reseñas
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            ¿Dónde está tu hotel en TripAdvisor ahora mismo?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Descúbrelo con un análisis gratuito de tu reputación online.
            Sin tarjeta, sin compromiso, en menos de 30 segundos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Analizar mi hotel gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver el plan Business</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
