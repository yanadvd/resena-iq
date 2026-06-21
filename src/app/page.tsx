import Link from "next/link";
import {
  ArrowRight, Bell, Bot, FileText, Gauge, Workflow,
  MessageSquareQuote, Star, TrendingUp, Zap,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { SoftwareJsonLd } from "@/components/marketing/json-ld";

const FEATURES = [
  {
    icon: Workflow,
    title: "Recopilación automática",
    desc: "Conecta Google, Yelp, TripAdvisor y Trustpilot. Un pipeline programado recoge tus nuevas reseñas sin que muevas un dedo.",
  },
  {
    icon: Bot,
    title: "Análisis con IA",
    desc: "Sentimiento por reseña y agregado, temas recurrentes y keywords. Resúmenes ejecutivos generados automáticamente.",
  },
  {
    icon: Gauge,
    title: "Puntuación de reputación",
    desc: "Un único número, de 0 a 100, que sintetiza cómo te perciben tus clientes y cómo evoluciona en el tiempo.",
  },
  {
    icon: TrendingUp,
    title: "Tendencias en el tiempo",
    desc: "Visualiza la evolución del sentimiento y el volumen. Detecta problemas antes de que se vuelvan crisis.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    desc: "Recibe un email en cuanto llega una reseña negativa. Responde rápido y protege tu reputación.",
  },
  {
    icon: FileText,
    title: "Reportes exportables",
    desc: "Genera informes en PDF y CSV listos para compartir con tu equipo o dirección.",
  },
];

const STEPS = [
  { n: "01", title: "Conecta tus canales", desc: "Añade tus perfiles de Google, Yelp y más, o importa un CSV." },
  { n: "02", title: "La IA hace el trabajo", desc: "Recopilamos y analizamos cada reseña: sentimiento, temas y keywords." },
  { n: "03", title: "Actúa con datos", desc: "Dashboard, alertas y reportes para mejorar tu reputación día a día." },
];

const PROBLEMS = [
  "Te enteras de una reseña negativa días después, cuando el daño ya está hecho.",
  "Gestionas Google, Yelp y TripAdvisor por separado, sin visión global.",
  "No tienes datos para saber si tu reputación está mejorando o empeorando.",
  "Responder cada reseña a mano te roba horas que no tienes.",
  "No sabes qué temas repiten tus clientes: ¿el servicio? ¿el precio? ¿la espera?",
  "Tu competencia tiene mejores valoraciones aunque tú des mejor servicio.",
];

const TESTIMONIALS = [
  {
    quote: "Antes tardaba días en saber si teníamos una mala racha de reseñas. Ahora recibo una alerta en minutos y puedo reaccionar antes de que el problema escale.",
    name: "Carlos M.",
    role: "Propietario · Restaurante La Terraza",
    metric: "+4.2 → 4.8 estrellas en Google",
    stars: 5,
  },
  {
    quote: "El resumen semanal con IA me da exactamente lo que necesito en 2 minutos. Sé qué valoran los pacientes y qué mejorar sin leerme 200 reseñas.",
    name: "Dra. Lucía R.",
    role: "Directora · Clínica Dental Novadent",
    metric: "+62% más citas desde Google en 3 meses",
    stars: 5,
  },
  {
    quote: "Repusense nos ayudó a identificar que el problema de valoraciones era el check-in, no las habitaciones. Lo corregimos y subimos medio punto en 6 semanas.",
    name: "Javier A.",
    role: "Revenue Manager · Hotel Sol & Mar",
    metric: "Puntuación reputación: 61 → 84",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[900px] opacity-80" />
      <SoftwareJsonLd />
      <SiteHeader />

      {/* HERO */}
      <section className="container relative pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="size-3.5 text-accent" />
            Análisis de reseñas potenciado por IA
          </div>
          <h1 className="animate-fade-up mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Análisis de reseñas con IA
            <span className="block italic text-accent">para negocios locales</span>
          </h1>
          <p className="animate-fade-up mt-6 text-lg text-muted-foreground text-balance md:text-xl" style={{ animationDelay: "80ms" }}>
            <strong className="font-semibold text-foreground">
              Tu reputación online, bajo control.
            </strong>{" "}
            Centraliza tus reseñas de Google y otras plataformas, deja que la IA
            las analice y convierte la opinión de tus clientes en decisiones que
            hacen crecer tu negocio.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "160ms" }}>
            <Button size="lg" asChild>
              <Link href="/register">
                Empezar gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/analisis-gratis">Analiza tu negocio gratis</Link>
            </Button>
          </div>
          <p className="animate-fade-up mt-4 text-xs text-muted-foreground" style={{ animationDelay: "200ms" }}>
            Sin tarjeta · Plan Free para siempre · Cancela cuando quieras
          </p>
        </div>

        {/* Mock dashboard preview */}
        <div className="animate-fade-up mx-auto mt-16 max-w-5xl" style={{ animationDelay: "260ms" }}>
          <div className="glass rounded-3xl border border-border/80 p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <StatPreview icon={Gauge} label="Reputación" value="87.4" accent />
                <StatPreview icon={Star} label="Media" value="4.6★" />
                <StatPreview icon={MessageSquareQuote} label="Reseñas" value="1.284" />
                <StatPreview icon={TrendingUp} label="Sentimiento" value="+12%" />
              </div>
              <div className="mt-4 flex items-end gap-1.5 rounded-xl border border-border/60 bg-card/40 p-4">
                {[40, 55, 48, 62, 70, 58, 75, 82, 78, 90, 85, 94].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-accent"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border/50 bg-card/30 py-8">
        <div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
          <span className="font-display text-base italic">Integra con</span>
          {["Google Reviews", "Yelp", "TripAdvisor", "Trustpilot"].map((b) => (
            <span key={b} className="font-semibold text-foreground/80">{b}</span>
          ))}
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            El problema
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            ¿Te suena familiar?
          </h2>
          <p className="mt-4 text-muted-foreground">
            La mayoría de negocios locales pierden clientes por problemas de reputación que ni siquiera saben que tienen.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p} className="flex gap-3 rounded-2xl border border-border bg-card/30 p-5">
              <XCircle className="mt-0.5 size-5 shrink-0 text-destructive/70" />
              <p className="text-sm leading-relaxed text-muted-foreground">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm font-semibold text-foreground">
          Repusense centraliza, analiza y te avisa — para que puedas actuar, no solo reaccionar.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Todo en un solo lugar
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            De reseñas dispersas a inteligencia accionable
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
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Cómo funciona
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Automatización de principio a fin
            </h2>
            <p className="mt-4 text-muted-foreground">
              Configúralo una vez y olvídate. Repusense trabaja en segundo plano
              recopilando, analizando y avisándote de lo que importa.
            </p>
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

      {/* TESTIMONIALS */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Casos reales
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Negocios que ya controlan su reputación
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card/50 p-7"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 border-t border-border pt-5">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="container py-12">
        <div className="grid gap-6 rounded-3xl border border-border bg-card/40 p-10 text-center md:grid-cols-4">
          {[
            ["4", "plataformas integradas"],
            ["IA", "análisis de sentimiento"],
            ["24/7", "monitorización automática"],
            ["<1 min", "alertas en tiempo real"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-semibold text-accent">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Precios</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Empieza gratis, crece a tu ritmo
          </h2>
          <p className="mt-4 text-muted-foreground">
            Planes mensuales sin permanencia. Sube o baja de plan cuando quieras.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-5xl">
          <PricingCards />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-12 text-center md:p-16">
          <div className="bg-mesh absolute inset-0 -z-10 opacity-60" />
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            Deja de adivinar lo que piensan tus clientes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Empieza hoy con el plan gratuito y descubre qué dicen de tu negocio.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/register">
              Crear mi cuenta gratis <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/34600000000?text=Hola%2C%20me%20interesa%20Repusense"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg viewBox="0 0 24 24" className="size-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

function StatPreview({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </div>
      <p className={`mt-2 font-display text-2xl font-semibold ${accent ? "text-accent" : ""}`}>
        {value}
      </p>
    </div>
  );
}
