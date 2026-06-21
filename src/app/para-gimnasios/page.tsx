import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bell, Bot, TrendingUp, Star,
  BarChart3, FileText, Dumbbell, CheckCircle2,
  AlertTriangle, Users, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Gestión de reseñas para gimnasios y centros deportivos | Repusense";
const DESCRIPTION =
  "Analiza las reseñas de tu gimnasio con IA. Detecta quejas sobre monitores, limpieza o maquinaria antes de perder socios. Alertas en tiempo real y respuestas automáticas para Google.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-gimnasios" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PROBLEMS = [
  {
    heading: "Un socio que se va suele dejar una reseña",
    text: "La baja del gym es el momento más probable para escribir una reseña. Sin un sistema de alertas, te enteras del problema cuando el cliente ya se fue — y lo publicó.",
  },
  {
    heading: "Abren 3 gimnasios nuevos cerca y empiezas a perder reseñas",
    text: "El mercado local de fitness es competitivo y estacional. Cuando un competidor abre, tus socios los comparan. Tu reputación online es tu primer diferencial visible.",
  },
  {
    heading: "No sabes si el problema es el monitor, la máquina o la limpieza",
    text: "Las quejas llegan mezcladas. Sin análisis de temas, todas las reseñas negativas parecen iguales — y no puedes saber dónde intervenir primero.",
  },
  {
    heading: "No tienes tiempo de responder 30 reseñas cada semana",
    text: "Responder bien a una reseña negativa puede revertir la percepción. Pero escribir una respuesta adecuada para cada una lleva tiempo que el gerente no tiene.",
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Alerta inmediata cuando llega una reseña negativa",
    desc: "Recibes el aviso en minutos. Puedes llamar al socio, ofrecer solución o publicar una respuesta antes de que la reseña acumule visitas.",
  },
  {
    icon: BarChart3,
    title: "Detecta qué genera más quejas en tu centro",
    desc: "¿Monitores? ¿Limpieza de vestuarios? ¿Maquinaria rota? ¿Masificación? La IA agrupa las reseñas por temas para que sepas dónde actuar primero.",
  },
  {
    icon: Bot,
    title: "Respuesta IA lista en segundos",
    desc: "Genera una respuesta profesional y personalizada para cada reseña. Tú la revisas y publicas. Sin redactar desde cero, sin bloqueos creativos.",
  },
  {
    icon: TrendingUp,
    title: "Tendencia de reputación: ¿creces o te estancas?",
    desc: "Visualiza la evolución de tu sentimiento mes a mes. Detecta si la campaña de captación de enero mejoró también tu reputación — o no.",
  },
  {
    icon: Users,
    title: "Puntuación de reputación que fideliza",
    desc: "Un único número 0-100 que sintetiza cómo te ven tus socios actuales y potenciales. Compáralo con tu media del año pasado.",
  },
  {
    icon: FileText,
    title: "Reportes para franquicia o propietario",
    desc: "Si perteneces a una cadena o tienes socios inversores, genera el PDF de reputación mensual automáticamente. Listo para enviar.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Conecta tu Google My Business",
    desc: "En menos de 5 minutos. Sin técnicos, sin APIs, sin complicaciones.",
  },
  {
    n: "02",
    title: "La IA analiza cada reseña automáticamente",
    desc: "Sentimiento, temas, tendencias y puntuación de reputación. Siempre actualizado.",
  },
  {
    n: "03",
    title: "Actúa antes de perder un socio más",
    desc: "Alerta de reseña negativa, respuesta IA y datos para mejorar tu servicio.",
  },
];

const CONTEXTS = [
  "Gimnasios low-cost y cadenas",
  "Boxes de CrossFit",
  "Centros de yoga y pilates",
  "Centros de artes marciales",
  "Piscinas y centros acuáticos",
  "Centros de padel y tenis",
  "Centros de musculación independientes",
  "Clubs deportivos multidisciplinar",
];

const FAQ = [
  {
    q: "¿Funciona con Google My Business de negocios deportivos?",
    a: "Sí. Si tu gimnasio tiene ficha en Google (Google My Business), Repusense la conecta en minutos y empieza a recopilar y analizar tus reseñas automáticamente.",
  },
  {
    q: "¿Puedo gestionar varios centros de la misma cadena?",
    a: "Sí. El plan Business permite añadir múltiples sedes sin límite. Verás la reputación de cada centro por separado y podrás comparar cuál tiene mejor valoración.",
  },
  {
    q: "¿Qué pasa si recibo una reseña falsa o de la competencia?",
    a: "Repusense te avisa de inmediato. Desde el panel puedes ver el contexto completo de la reseña y generar una respuesta profesional. Para solicitar la eliminación, debes gestionar el proceso directamente con Google.",
  },
  {
    q: "¿Puedo usar Repusense para pedir más reseñas a mis socios?",
    a: "Repusense se centra en el análisis y gestión de reseñas existentes. Para generar más reseñas, puedes usar el informe gratuito de /analisis-gratis como punto de partida para identificar a socios satisfechos a los que pedir una valoración.",
  },
];

export default function ParaGimnasiosPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para gimnasios", path: "/para-gimnasios" },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Dumbbell className="size-3.5 text-accent" />
            Para gimnasios, centros deportivos y boxes
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Tus socios te eligen
            <span className="block italic text-accent">por tus reseñas.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            El fitness local es el sector donde más importa la reputación online:
            la gente elige gimnasio igual que elige médico. Repusense te avisa
            de cada reseña negativa y te ayuda a responder antes de que tu
            próximo socio elija al de enfrente.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Analiza tu gimnasio gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Empezar gratis</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Resultados en 30 segundos · Cancela cuando quieras
          </p>
        </div>

        {/* Quick stats visual */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Zap, value: "< 1 min", label: "para recibir la alerta de una reseña negativa" },
              { icon: BarChart3, value: "6 temas", label: "detectados automáticamente por la IA" },
              { icon: Star, value: "+0.8★", label: "mejora media en 6 meses con gestión activa" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-accent">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">El problema</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Cada baja es una reseña en potencia
          </h2>
          <p className="mt-4 text-muted-foreground">
            Los socios que se van no te dicen por qué. Pero sí lo escriben en Google.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p.heading} className="flex gap-5 rounded-2xl border border-border bg-card/40 p-7">
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
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">La solución</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Convierte cada reseña en una oportunidad
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
              Funciona para todo tipo de centro
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Sea cual sea tu formato, mismo control
            </h2>
            <p className="mt-4 text-muted-foreground">
              Desde un box de CrossFit con 80 socios hasta una cadena de 5 gimnasios.
              Mismo panel, mismo nivel de detalle.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {CONTEXTS.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-2xl border border-border bg-card/50 p-6">
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

      {/* TESTIMONIAL */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-10">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="mt-6 font-display text-xl font-semibold leading-relaxed text-foreground">
            "Detectamos con Repusense que el problema de valoraciones era la limpieza
            de los vestuarios en las horas pico, no los monitores ni las máquinas.
            Con un cambio de turno de limpieza subimos de 3.8 a 4.5 estrellas en dos meses."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Álvaro M.</p>
            <p className="text-sm text-muted-foreground">Director · FitZone Centro Deportivo, Zaragoza</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              3.8 → 4.5★ en Google en 2 meses
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl py-20">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-border bg-card/50 p-6">
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
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Empieza hoy</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            ¿Qué dicen de tu gimnasio los socios que se fueron?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Descúbrelo con un análisis gratuito de tu reputación en Google.
            Sin tarjeta, sin compromiso, en menos de 30 segundos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Ver el informe de mi gimnasio <ArrowRight className="size-4" />
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
