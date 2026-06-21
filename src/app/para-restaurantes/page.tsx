import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bell, Bot, TrendingUp, Star, UtensilsCrossed,
  AlertTriangle, BarChart3, MessageSquareQuote, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Software de reseñas para restaurantes | Repusense";
const DESCRIPTION =
  "Controla tu reputación en Google, TripAdvisor y TheFork con IA. Alertas de reseñas negativas, análisis por plato y temática, y respuestas sugeridas. Prueba gratis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-restaurantes" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PROBLEMS = [
  {
    stat: "Viernes 21:00",
    text: "Un cliente te pone 1 estrella en Google. Tú te enteras el lunes, cuando ya 40 personas lo vieron sin tu respuesta.",
  },
  {
    stat: "3 pestañas",
    text: "Cada mañana abres Google My Business, TripAdvisor y TheFork por separado. Sin visión global, sin historial, sin tiempo.",
  },
  {
    stat: "¿Qué falla?",
    text: "Recibes reseñas sobre la espera, la comida y el trato. Pero no sabes cuál es el problema principal porque no tienes datos.",
  },
  {
    stat: "Sin respuesta",
    text: "El 89% de los clientes lee las respuestas del negocio. Si no respondes, transmites indiferencia — aunque el comentario sea injusto.",
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Alerta inmediata de reseñas negativas",
    desc: "En cuanto alguien te pone 1, 2 o 3 estrellas recibes un email. Puedes responder antes de que el daño se extienda.",
  },
  {
    icon: Bot,
    title: "Detecta qué platos y experiencias critican",
    desc: "La IA agrupa las reseñas por temas: cocina, espera, precio, trato, ambiente. Sabes exactamente dónde mejorar.",
  },
  {
    icon: MessageSquareQuote,
    title: "Respuesta sugerida con IA en segundos",
    desc: "Genera una respuesta empática y profesional para cada reseña. Tú la revisas, la ajustas y la publicas. Sin bloqueos.",
  },
  {
    icon: TrendingUp,
    title: "Tendencia semanal de sentimiento",
    desc: "¿Mejoras después de cambiar el personal? ¿Empeoras en verano? Visualiza el sentimiento en el tiempo y actúa con datos.",
  },
  {
    icon: BarChart3,
    title: "Puntuación de reputación 0-100",
    desc: "Un único número que resume cómo te ven tus clientes. Actualizado a diario con cada nueva reseña.",
  },
  {
    icon: FileText,
    title: "Reportes listos para la dirección",
    desc: "Exporta en PDF o CSV el resumen mensual de reseñas, sentimiento y tendencias. Listo para presentar.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Conecta tus perfiles en 2 minutos",
    desc: "Enlaza tu ficha de Google, TripAdvisor y TheFork. Sin instalaciones, sin conocimientos técnicos.",
  },
  {
    n: "02",
    title: "La IA analiza cada reseña",
    desc: "Sentimiento, temas, platos mencionados, tendencias. Todo procesado automáticamente, 24/7.",
  },
  {
    n: "03",
    title: "Actúa antes de que escale",
    desc: "Recibe alertas, genera respuestas y consulta el dashboard. Tu reputación, siempre bajo control.",
  },
];

const STATS = [
  { value: "9%", label: "menos ingresos por cada estrella perdida en Google*" },
  { value: "88%", label: "de comensales lee reseñas antes de elegir dónde comer" },
  { value: "45%", label: "más probabilidad de que un cliente insatisfecho vuelva si respondes" },
  { value: "<1 min", label: "de alerta cuando llega una reseña negativa" },
];

const FAQ = [
  {
    q: "¿Funciona con TheFork?",
    a: "Actualmente integramos Google Reviews, Yelp y TripAdvisor. TheFork estará disponible próximamente. Mientras tanto, puedes importar tus reseñas de TheFork manualmente en CSV.",
  },
  {
    q: "¿Puedo usar Repusense con varios restaurantes?",
    a: "Sí. Con el plan Business puedes gestionar múltiples establecimientos desde el mismo panel. Cada uno tiene su propio dashboard y su puntuación de reputación.",
  },
  {
    q: "¿Las respuestas sugeridas con IA suenan naturales?",
    a: "Sí. La IA toma el contexto de la reseña (positiva, negativa, tema específico) y genera una respuesta empática y profesional. Siempre puedes editarla antes de publicarla.",
  },
  {
    q: "¿Cuánto tiempo tarda en configurarse?",
    a: "Menos de 5 minutos. Solo necesitas conectar tus perfiles de reseñas y la plataforma empieza a recopilar y analizar automáticamente.",
  },
];

export default function ParaRestaurantesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para restaurantes", path: "/para-restaurantes" },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <UtensilsCrossed className="size-3.5 text-accent" />
            Para restaurantes, bares y hostelería
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Una mala reseña
            <span className="block italic text-accent">cuesta mesas.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            Repusense analiza con IA las reseñas de tu restaurante en Google,
            TripAdvisor y más. Te dice qué funciona, qué no, y te avisa en
            minutos cuando llega una valoración negativa.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Analiza tu restaurante gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Ver planes y precios</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Resultados en 30 segundos · Cancela cuando quieras
          </p>
        </div>

        {/* Platforms */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/60 bg-card/30 px-8 py-5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conecta con
            </span>
            {["Google Reviews", "TripAdvisor", "Yelp", "Trustpilot"].map((p) => (
              <span key={p} className="font-semibold text-foreground/80">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            El problema real
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Sin visibilidad, no puedes mejorar
          </h2>
          <p className="mt-4 text-muted-foreground">
            Las reseñas afectan a tus reservas cada día — pero la mayoría de restaurantes las gestionan reactivamente, tarde o nunca.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div
              key={p.stat}
              className="flex gap-5 rounded-2xl border border-border bg-card/40 p-7"
            >
              <div className="shrink-0">
                <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/10">
                  <AlertTriangle className="size-5 text-destructive/70" />
                </span>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">{p.stat}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
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
            Todo lo que necesita tu restaurante
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
              Configuración en menos de 5 minutos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sin técnicos, sin integraciones complejas. Conectas tus perfiles
              y Repusense empieza a trabajar solo.
            </p>
            <Button className="mt-8" asChild>
              <Link href="/register">
                Empezar ahora <ArrowRight className="size-4" />
              </Link>
            </Button>
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
          *Fuente: Harvard Business School / análisis de Yelp sobre 14,000 restaurantes
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
            "Antes tardaba días en saber si teníamos una mala racha de reseñas.
            Ahora recibo la alerta en minutos y puedo llamar al jefe de sala
            antes de que el problema se repita al día siguiente."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Carlos M.</p>
            <p className="text-sm text-muted-foreground">Propietario · Restaurante La Terraza, Madrid</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Valoración Google: 4.2 → 4.7 en 90 días
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
            Empieza hoy
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            ¿Cuántas estrellas tiene tu restaurante hoy?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Descúbrelo gratis en 30 segundos. Sin tarjeta, sin compromiso.
            Tu primer análisis de reputación con IA está a un clic.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Ver mi informe gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver planes</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
