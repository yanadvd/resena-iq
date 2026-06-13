import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/marketing/site-header";
import { PricingCards } from "@/components/marketing/pricing-cards";

export const metadata: Metadata = {
  title: "Precios — ReseñaIQ",
  description:
    "Planes Free, Pro y Business. Análisis de reseñas con IA para negocios de cualquier tamaño.",
};

const FAQ = [
  {
    q: "¿Puedo cambiar de plan en cualquier momento?",
    a: "Sí. Desde el portal de suscripción puedes subir, bajar o cancelar tu plan cuando quieras. Los cambios se prorratean automáticamente.",
  },
  {
    q: "¿Qué pasa al superar el límite de reseñas?",
    a: "Seguimos mostrando tus reseñas existentes, pero la ingesta de nuevas se pausa hasta el siguiente ciclo o hasta que mejores de plan.",
  },
  {
    q: "¿Cómo se realizan los pagos?",
    a: "A través de Stripe, de forma 100% segura. Aceptamos las principales tarjetas y la facturación es mensual recurrente.",
  },
  {
    q: "¿El plan Free caduca?",
    a: "No. El plan Free es gratuito para siempre, ideal para empezar a monitorizar un canal con hasta 50 reseñas al mes.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh absolute inset-0 -z-10 h-[600px] opacity-70" />
      <SiteHeader />

      <section className="container py-16 text-center">
        <h1 className="font-display text-5xl font-semibold md:text-6xl">
          Precios simples y transparentes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Elige el plan que se adapta a tu negocio. Sin sorpresas, sin permanencia.
        </p>
      </section>

      <section className="container max-w-5xl pb-20">
        <PricingCards />
      </section>

      <section className="container max-w-3xl pb-28">
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

      <SiteFooter />
    </div>
  );
}
