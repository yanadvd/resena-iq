import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bell, Bot, TrendingUp, Star,
  BarChart3, FileText, LayoutDashboard, ShieldAlert,
  CheckCircle2, AlertTriangle, GitCompare, Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Gestión de reputación para franquicias y redes de locales | Repusense";
const DESCRIPTION =
  "Monitoriza y compara la reputación de todas tus sedes desde un panel central. Detecta qué locales bajan la nota de tu marca, reportes automáticos por sede y alertas en tiempo real.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-franquicias" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PAIN_POINTS = [
  {
    heading: "Una sede con 3 estrellas daña a toda la red",
    text: "Cuando un cliente busca tu franquicia, Google muestra todas las sedes. Una con mala nota perjudica la percepción de marca aunque el resto esté en 4.8. Sin visibilidad centralizada, no lo sabes hasta que es tarde.",
  },
  {
    heading: "No sabes qué franquiciado está bajando el estándar",
    text: "Tienes 20 sedes. ¿Sabrías decir ahora mismo cuál tiene más reseñas negativas esta semana? ¿Cuál ha bajado medio punto en los últimos 3 meses? Sin datos comparativos, gestionas a ciegas.",
  },
  {
    heading: "El reporting manual de cada sede tarda días",
    text: "Agregar las métricas de reputación de cada franquicia, extraer los datos, formatearlos y enviarlos a dirección puede llevar jornadas enteras cada mes. Tiempo que no tiene nadie.",
  },
  {
    heading: "No puedes demostrar el impacto de tus estándares de calidad",
    text: "Tienes un manual de operaciones. ¿Pero puedes medir si las sedes que lo siguen tienen mejor reputación? Sin datos históricos por sede, el estándar de calidad es solo papel.",
  },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Panel central con todas las sedes",
    desc: "Una vista unificada con la puntuación de reputación, tendencia y últimas reseñas de cada local. Ves en segundos qué sede necesita atención.",
  },
  {
    icon: GitCompare,
    title: "Benchmarking entre sedes",
    desc: "Compara la reputación de tus franquicias entre sí. Clasifica las sedes por puntuación, volumen de reseñas o tendencia. Identifica a los mejores y a los que necesitan apoyo.",
  },
  {
    icon: Bell,
    title: "Alertas por sede antes que el franquiciado",
    desc: "Cuando una sede recibe una reseña negativa, la central recibe el aviso primero. Puedes contactar al franquiciado con contexto antes de que el problema escale.",
  },
  {
    icon: Bot,
    title: "Respuestas IA coherentes con la voz de marca",
    desc: "La IA genera respuestas alineadas con el tono de tu franquicia. Cada franquiciado puede aprobar y publicar desde su acceso — con el estilo de la marca siempre presente.",
  },
  {
    icon: FileText,
    title: "Reportes automáticos por sede y consolidados",
    desc: "PDF mensual por cada local y reporte global de red. Listo para enviar a franquiciados, presentar a dirección o incluir en auditorías de calidad.",
  },
  {
    icon: BarChart3,
    title: "Evolución histórica y KPIs de reputación",
    desc: "Mide cómo evoluciona la reputación de cada sede desde que abrió. Correlaciona cambios de equipo, reformas o campañas con movimientos en las valoraciones.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Añade todas tus sedes",
    desc: "Conecta la ficha de Google de cada local. Sin límite de sedes en el plan Business.",
  },
  {
    n: "02",
    title: "Dashboard de red en tiempo real",
    desc: "Todas las sedes en un panel comparativo. Alertas automáticas cuando una baja del umbral.",
  },
  {
    n: "03",
    title: "Reportes y acceso por roles",
    desc: "La central ve todo. Cada franquiciado ve solo su sede. Reportes automáticos cada mes.",
  },
];

const USE_CASES = [
  "Franquicias de restauración (hamburguesas, pizzas, bocadillos)",
  "Redes de clínicas dentales o centros de estética",
  "Cadenas de gimnasios y centros deportivos",
  "Grupos de academias o centros de formación",
  "Redes de talleres mecánicos o autolavados",
  "Grupos de inmobiliarias o seguros",
];

const FAQ = [
  {
    q: "¿Puede cada franquiciado acceder a sus propios datos?",
    a: "Sí. Con el sistema de roles, cada franquiciado ve solo su sede. La central ve todas las sedes y los datos consolidados. Los reportes se pueden enviar automáticamente a cada franquiciado.",
  },
  {
    q: "¿Hay límite de sedes que puedo añadir?",
    a: "No. El plan Business permite añadir sedes ilimitadas. Para redes de más de 20 locales ofrecemos condiciones especiales — contáctanos para un precio personalizado.",
  },
  {
    q: "¿Puedo definir un umbral de alerta por reputación?",
    a: "Sí. Puedes configurar alertas automáticas cuando una sede baja de un determinado número de estrellas o puntuación de reputación. Recibes el aviso antes que nadie.",
  },
  {
    q: "¿Los reportes se pueden personalizar con el logo de la franquicia?",
    a: "Los reportes PDF incluyen los datos de cada sede y los totales de red. La personalización de marca completa está disponible bajo petición para redes grandes.",
  },
];

export default function ParaFranquiciasPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para franquicias", path: "/para-franquicias" },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Building className="size-3.5 text-accent" />
            Para franquicias, redes de locales y grupos multi-sede
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Una sede con 3 estrellas
            <span className="block italic text-accent">daña a toda tu red.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            Repusense centraliza la reputación de todos tus locales en un solo
            panel. Compara sedes, detecta cuál baja el estándar de marca,
            recibe alertas antes que tus franquiciados y genera reportes
            automáticos para dirección — sin Excel, sin horas perdidas.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Ver demo para redes <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver el plan Business</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Sedes ilimitadas · Soporte prioritario
          </p>
        </div>

        {/* Multi-location mock */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="glass rounded-3xl border border-border/80 p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Red de franquicias · 8 sedes activas
                </p>
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                  2 alertas pendientes
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Sede Madrid Centro", score: 91, stars: "4.8", delta: "+3", ok: true },
                  { name: "Sede Madrid Norte", score: 58, stars: "3.6", delta: "-8", ok: false },
                  { name: "Sede Barcelona Eixample", score: 85, stars: "4.6", delta: "+1", ok: true },
                  { name: "Sede Valencia", score: 48, stars: "3.2", delta: "-12", ok: false },
                  { name: "Sede Sevilla", score: 79, stars: "4.4", delta: "+2", ok: true },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      s.ok
                        ? "border-border/60 bg-card/40"
                        : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {!s.ok && <span className="size-2 shrink-0 rounded-full bg-destructive" />}
                      <div>
                        <p className="text-sm font-semibold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.stars}★ Google</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        Reputación <span className="font-semibold text-foreground">{s.score}</span>/100
                      </span>
                      <span className={`text-xs font-semibold ${s.ok ? "text-[hsl(var(--positive))]" : "text-destructive"}`}>
                        {s.delta}
                      </span>
                    </div>
                  </div>
                ))}
                <p className="pt-1 text-center text-xs text-muted-foreground">+ 3 sedes más</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            El problema de las redes
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Sin visibilidad central, no puedes proteger la marca
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PAIN_POINTS.map((p) => (
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

      {/* BENCHMARKING CALLOUT */}
      <section className="container pb-4">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-card to-accent/5 p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { label: "Mejor sede de la red", value: "4.9★", sub: "Madrid Centro · Rep. 91/100" },
              { label: "Media de la red", value: "4.3★", sub: "8 sedes · Rep. 74/100" },
              { label: "Sede a mejorar", value: "3.2★", sub: "Valencia · Rep. 48/100 ⚠" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-accent">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Vista de benchmarking disponible en el dashboard de red
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            La solución
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Control total de la reputación de tu red
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Válido para</p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Cualquier red con varias sedes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Desde 3 locales hasta 200. Mismo panel, mismo sistema de alertas,
              misma calidad de datos.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-2">
              {USE_CASES.map((u) => (
                <div key={u} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{u}</span>
                </div>
              ))}
            </div>
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
            "Con 11 sedes, antes era imposible saber qué franquiciado tenía problemas
            sin hacer rondas semanales. Ahora entro al panel el lunes y en 5 minutos
            sé qué sede necesita una llamada. Hemos subido la media de red de 4.1 a 4.5 en 4 meses."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Roberto G.</p>
            <p className="text-sm text-muted-foreground">Director de Operaciones · Red de 11 franquicias, España</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Media de red: 4.1 → 4.5★ en 4 meses
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
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Redes de 3 a 200 sedes</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            ¿Sabes qué sede está bajando la nota de tu marca ahora mismo?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Empieza con el plan Business y conecta todas tus sedes desde el
            primer día. Para redes grandes, hablamos de condiciones personalizadas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Empezar con mi red <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver el plan Business</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Sedes ilimitadas · Soporte prioritario para redes
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
