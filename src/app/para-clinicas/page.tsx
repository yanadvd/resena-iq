import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bell, Bot, TrendingUp, Star, Stethoscope,
  ShieldCheck, Clock, FileText, BarChart3, MessageSquareQuote,
  CheckCircle2, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Gestión de reputación para clínicas dentales y centros médicos | Repusense";
const DESCRIPTION =
  "Analiza y mejora las reseñas de tu clínica dental, centro médico o veterinaria con IA. Alertas de valoraciones negativas, respuestas profesionales y seguimiento en Google y Doctoralia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-clinicas" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PROBLEMS = [
  {
    heading: "El paciente decide antes de llamar",
    text: "El 81% de los pacientes lee las reseñas de una clínica antes de pedir su primera cita. Una sola reseña negativa sin respuesta puede costarle a tu clínica 10 pacientes nuevos ese mes.",
  },
  {
    heading: "Una queja afecta a toda la especialidad",
    text: "Una mala experiencia con el tiempo de espera se generaliza: 'esta clínica no respeta los horarios'. Sin datos, no sabes si es un problema puntual o una tendencia real.",
  },
  {
    heading: "Responder requiere tacto y tiempo",
    text: "En salud no puedes responder a la ligera. Una respuesta mal redactada puede agravar la situación. Y preparar una respuesta profesional para cada reseña cuesta entre 10 y 30 minutos.",
  },
  {
    heading: "Tus pacientes satisfechos no escriben reseñas",
    text: "Los pacientes contentos se van sin decir nada. Los insatisfechos sí dejan reseñas. Sin un sistema de seguimiento, tu valoración refleja solo a los que tuvieron problemas.",
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Alerta inmediata de valoraciones negativas",
    desc: "En cuanto llega una reseña de 1, 2 o 3 estrellas recibes un email. Puedes valorar la situación y responder profesionalmente antes de que el paciente desaparezca.",
  },
  {
    icon: Bot,
    title: "Respuestas IA con tono clínico apropiado",
    desc: "La IA genera respuestas empáticas, profesionales y respetuosas con la privacidad del paciente. Nunca confirma ni desmiente datos clínicos. Tú la revisas antes de publicar.",
  },
  {
    icon: BarChart3,
    title: "Detecta qué áreas generan más quejas",
    desc: "¿Son las esperas? ¿El trato en recepción? ¿El precio? La IA agrupa las reseñas por temas para que sepas exactamente dónde intervenir.",
  },
  {
    icon: TrendingUp,
    title: "Tendencia de reputación por especialidad",
    desc: "Si tienes varias especialidades o médicos, identifica cuál está generando más valoraciones negativas — antes de que el problema afecte a toda la clínica.",
  },
  {
    icon: ShieldCheck,
    title: "Puntuación de reputación 0-100",
    desc: "Un único indicador que resume cómo perciben los pacientes tu clínica. Actualizado con cada nueva reseña y comparable entre períodos.",
  },
  {
    icon: FileText,
    title: "Informes para dirección y socios",
    desc: "Exporta en PDF el estado de la reputación de tu clínica. Ideal para reuniones de socios, evaluaciones de calidad o auditorías internas.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Conecta tus perfiles de reseñas",
    desc: "Enlaza tu ficha de Google My Business en minutos. Sin instalaciones ni conocimientos técnicos requeridos.",
  },
  {
    n: "02",
    title: "La IA analiza cada opinión",
    desc: "Sentimiento, temas recurrentes, áreas problemáticas y evolución en el tiempo. Procesado automáticamente.",
  },
  {
    n: "03",
    title: "Responde rápido y con criterio",
    desc: "Recibe la alerta, lee el contexto y publica una respuesta profesional en menos de 5 minutos.",
  },
];

const STATS = [
  { value: "81%", label: "de los pacientes lee reseñas antes de elegir clínica*" },
  { value: "72%", label: "no elegirá una clínica con valoración inferior a 4 estrellas" },
  { value: "3×", label: "más probable que un paciente insatisfecho deje reseña que uno contento" },
  { value: "<1 min", label: "de alerta cuando llega una valoración negativa" },
];

const TYPES = [
  "Clínicas dentales",
  "Centros de fisioterapia",
  "Clínicas de estética",
  "Consultas de medicina general",
  "Centros veterinarios",
  "Psicólogos y terapeutas",
  "Ópticas",
  "Clínicas de podología",
];

const FAQ = [
  {
    q: "¿Las respuestas automáticas pueden revelar datos del paciente?",
    a: "No. La IA está entrenada para responder sin confirmar ni desmentir información clínica ni identificar al paciente. Siempre usamos formulaciones genéricas como 'lamentamos que tu experiencia no haya sido la esperada'. Además, tú revisas cada respuesta antes de publicarla.",
  },
  {
    q: "¿Funciona con Doctoralia o iClinic?",
    a: "Actualmente integramos Google Reviews, Yelp y TripAdvisor. Las plataformas médicas especializadas como Doctoralia están en el roadmap. Puedes exportar reseñas de Doctoralia en CSV e importarlas manualmente.",
  },
  {
    q: "¿Puedo gestionar varias sedes o especialidades?",
    a: "Sí. Con el plan Business puedes conectar múltiples fichas de Google y gestionar varias sedes o especialidades desde el mismo panel, con su propia puntuación de reputación.",
  },
  {
    q: "¿Cuánto tiempo lleva configurarlo?",
    a: "Menos de 5 minutos para conectar tu ficha de Google. Sin instalaciones, sin formación técnica. En cuanto conectas, la plataforma empieza a recopilar y analizar tus reseñas.",
  },
];

export default function ParaClinicasPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para clínicas", path: "/para-clinicas" },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Stethoscope className="size-3.5 text-accent" />
            Para clínicas dentales, médicos y centros de salud
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Tus pacientes te buscan en Google
            <span className="block italic text-accent">antes de llamar.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            En salud, la reputación no es marketing — es confianza. Repusense
            analiza las reseñas de tu clínica con IA, detecta qué genera
            quejas y te ayuda a responder con el tono profesional que tu
            especialidad requiere.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Analiza tu clínica gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Ver planes</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Informe en 30 segundos · Cancela cuando quieras
          </p>
        </div>

        {/* Sector types */}
        <div className="mx-auto mt-14 max-w-3xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Ideal para
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TYPES.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
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
            En salud, una sola reseña negativa pesa el doble
          </h2>
          <p className="mt-4 text-muted-foreground">
            Los pacientes son más exigentes que cualquier otro tipo de consumidor.
            Y tienen razón: elegir a quién confiar su salud es la decisión más
            importante que toman.
          </p>
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
            Diseñado para la sensibilidad del sector salud
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
              Sin formación técnica, sin integraciones complejas
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pensado para clínicas que quieren resultados, no para equipos de IT.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Respuestas que no revelan datos del paciente",
                "Tono profesional adaptado al sector salud",
                "Revisión humana antes de publicar cada respuesta",
                "Historial de todas las reseñas y respuestas",
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
          *Fuente: Software Advice / PatientPop Healthcare Reputation Survey
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
            "El resumen semanal con IA me da exactamente lo que necesito en
            2 minutos. Sé qué valoran los pacientes y qué mejorar sin leerme
            200 reseñas. Detectamos que las esperas en recepción eran el
            problema principal y lo corregimos."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Dra. Lucía R.</p>
            <p className="text-sm text-muted-foreground">Directora · Clínica Dental Novadent, Valencia</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              +62% nuevas citas desde Google en 3 meses
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
            ¿Qué están diciendo de tu clínica?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Descúbrelo con un análisis gratuito. Sin tarjeta, sin compromiso,
            en menos de 30 segundos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/analisis-gratis">
                Ver el informe de mi clínica <ArrowRight className="size-4" />
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
