import Link from "next/link";
import {
  ArrowRight, Bell, Bot, FileText, Gauge, Workflow,
  MessageSquareQuote, Star, TrendingUp, Zap,
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
            Tu reputación online,
            <span className="block italic text-accent">bajo control</span>
          </h1>
          <p className="animate-fade-up mt-6 text-lg text-muted-foreground text-balance md:text-xl" style={{ animationDelay: "80ms" }}>
            Centraliza tus reseñas de todas las plataformas, deja que la IA las
            analice y convierte la opinión de tus clientes en decisiones que
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
