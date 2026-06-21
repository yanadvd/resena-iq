import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Bot, TrendingUp, FileText, LayoutDashboard,
  Bell, Users, Building2, CheckCircle2, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { BreadcrumbJsonLd } from "@/components/marketing/json-ld";

const TITLE = "Software de reputación para agencias de marketing | Repusense";
const DESCRIPTION =
  "Gestiona la reputación online de todos tus clientes desde un solo panel. Alertas por cuenta, reportes PDF automáticos con IA y dashboard multi-cliente. Escala sin contratar.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/para-agencias" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const PAIN_POINTS = [
  "Entras en cada Google My Business de cada cliente, uno a uno, cada semana.",
  "Los reportes mensuales te consumen 2-3 horas por cliente. Con 10 clientes, son 30 horas.",
  "Te enteras de una crisis de reputación cuando ya te ha llamado el cliente enfadado.",
  "No tienes datos históricos para demostrarles que tu gestión mejora sus valoraciones.",
  "No puedes crecer tu cartera sin contratar a alguien solo para monitorizar reseñas.",
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Dashboard multi-cliente unificado",
    desc: "Todos tus clientes en una sola vista. Puntuación de reputación, reseñas recientes y tendencia de cada cuenta sin cambiar de herramienta.",
  },
  {
    icon: Bell,
    title: "Alertas por cliente antes que ellos",
    desc: "Cuando un cliente recibe una reseña negativa, tú recibes el aviso primero. Gestionas la situación antes de que te llamen.",
  },
  {
    icon: Bot,
    title: "Respuestas IA listas para aprobar",
    desc: "Genera la respuesta adecuada para cada reseña. Tú la revisas y apruebas en segundos. El cliente ve tu agencia como experta.",
  },
  {
    icon: FileText,
    title: "Reportes PDF automáticos",
    desc: "Exporta el informe mensual de cada cliente con un clic. Sentimiento, evolución de valoraciones y temas destacados. Listo para enviar el lunes.",
  },
  {
    icon: TrendingUp,
    title: "Demuestra el ROI de tu servicio",
    desc: "Historial completo de la reputación de cada cliente desde que empezasteis a trabajar juntos. Datos que justifican la factura.",
  },
  {
    icon: Users,
    title: "Acceso por roles para tu equipo",
    desc: "Cada account manager ve solo sus clientes. El director ve todo. Permisos granulares sin compartir contraseñas.",
  },
];

const TIERS = [
  { clients: 5, price: 145, saving: "vs. 5 suscripciones" },
  { clients: 15, price: 295, saving: "vs. 15 suscripciones" },
  { clients: 30, price: 490, saving: "precio personalizado" },
];

const STEPS = [
  {
    n: "01",
    title: "Añade a tus clientes",
    desc: "Conecta las cuentas de Google Reviews, Yelp y TripAdvisor de cada cliente. En minutos, no en horas.",
  },
  {
    n: "02",
    title: "Un panel para todos",
    desc: "Todas las reseñas de todos los clientes centralizadas. Ves quién necesita atención sin revisar cuenta por cuenta.",
  },
  {
    n: "03",
    title: "Entrega reportes que impresionan",
    desc: "Descarga el PDF mensual de cada cliente con los datos de reputación. Demuestra el valor de tu trabajo con datos.",
  },
];

const CHECKLIST = [
  "Dashboard con todos tus clientes en una vista",
  "Alertas de reseñas negativas por cliente",
  "Reportes PDF/CSV listos para enviar",
  "Respuestas IA para cada reseña",
  "Historial y tendencias por cuenta",
  "Acceso multi-usuario con roles",
  "Sin límite de clientes en Business",
  "Soporte prioritario",
];

export default function ParaAgenciasPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[700px] opacity-80" />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Para agencias", path: "/para-agencias" },
        ]}
      />
      <SiteHeader />

      {/* HERO */}
      <section className="container pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Building2 className="size-3.5 text-accent" />
            Para agencias de marketing local y consultoras
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
            Gestiona la reputación
            <span className="block italic text-accent">de todos tus clientes.</span>
            <span className="block">Desde un panel.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance md:text-xl">
            Deja de entrar en cada Google My Business por separado. Repusense
            centraliza todas las reseñas de todos tus clientes, genera reportes
            automáticos con IA y te avisa de las crisis antes que el cliente.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Empezar gratis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver planes para agencias</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · Plan Free para empezar · Cancela cuando quieras
          </p>
        </div>

        {/* Agency mock dashboard */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="glass rounded-3xl border border-border/80 p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Vista agencia · 6 clientes activos
              </p>
              <div className="space-y-3">
                {[
                  { name: "Restaurante La Terraza", score: 87, trend: "+5", platform: "Google", stars: "4.7" },
                  { name: "Clínica Dental Novadent", score: 92, trend: "+8", platform: "Google + Yelp", stars: "4.9" },
                  { name: "Hotel Sol & Mar", score: 74, trend: "-2", platform: "TripAdvisor", stars: "4.1", alert: true },
                  { name: "Taller Mecánico López", score: 81, trend: "+3", platform: "Google", stars: "4.5" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      {c.alert && (
                        <span className="flex size-2 rounded-full bg-destructive" />
                      )}
                      <div>
                        <p className="text-sm font-semibold">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.platform} · {c.stars}★</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden text-xs text-muted-foreground sm:block">
                        Reputación:{" "}
                        <span className="font-semibold text-foreground">{c.score}</span>
                        /100
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          c.trend.startsWith("+")
                            ? "text-[hsl(var(--positive))]"
                            : "text-destructive"
                        }`}
                      >
                        {c.trend}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
                <p className="pt-1 text-center text-xs text-muted-foreground">
                  + 2 clientes más · 1 alerta pendiente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              El coste oculto de gestionar manualmente
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              El tiempo que pierdes no vuelve
            </h2>
            <p className="mt-4 text-muted-foreground">
              Gestionar la reputación de múltiples clientes sin las herramientas
              adecuadas no es ineficiente — es imposible de escalar.
            </p>
          </div>
          <div className="space-y-4">
            {PAIN_POINTS.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5"
              >
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE MATH */}
      <section className="container py-12">
        <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-primary/5 p-10 md:p-14">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              El modelo de agencia
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Cada cliente vale más de lo que parece
            </h2>
            <p className="mt-3 text-muted-foreground">
              Si añades reputación a tu servicio a 150€/mes por cliente:
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: "5 clientes", revenue: "750€/mes", color: "text-foreground" },
              { n: "15 clientes", revenue: "2.250€/mes", color: "text-accent" },
              { n: "30 clientes", revenue: "4.500€/mes", color: "text-primary" },
            ].map((t) => (
              <div
                key={t.n}
                className="rounded-2xl border border-border bg-card/60 p-7 text-center"
              >
                <p className="text-sm font-semibold text-muted-foreground">{t.n}</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${t.color}`}>
                  {t.revenue}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  de ingreso recurrente adicional
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Repusense Business (~79€/mes) te cuesta menos que un solo cliente.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Diseñado para agencias
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Todo lo que necesitas para escalar
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
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Cómo funciona
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              En marcha en menos de 30 minutos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sin onboarding de semanas ni integraciones complejas. Añades los
              clientes, conectas sus perfiles y el panel se llena solo.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-10">
          <blockquote className="font-display text-xl font-semibold leading-relaxed text-foreground">
            "Antes tardaba 3 horas al mes en preparar el reporte de cada cliente.
            Ahora lo descargo en 2 minutos. Con 12 clientes activos, eso son
            36 horas al mes que invierto en conseguir clientes nuevos."
          </blockquote>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Marcos P.</p>
            <p className="text-sm text-muted-foreground">Director · Agencia LocalBoost, Barcelona</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              12 clientes gestionados · +280% eficiencia en reporting
            </span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-12 text-center md:p-16">
          <div className="bg-mesh absolute inset-0 -z-10 opacity-60" />
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Para agencias que quieren crecer
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold md:text-5xl">
            ¿Gestionas más de 3 negocios?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Empieza con el plan Business e integra todos tus clientes desde el
            primer día. Sin límite de cuentas conectadas, con reportes listos
            para enviar y alertas antes que nadie.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Crear cuenta de agencia <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Ver el plan Business</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta · 14 días de prueba gratuita · Soporte prioritario
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
