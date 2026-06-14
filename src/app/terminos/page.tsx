import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal-shell";

export const metadata: Metadata = {
  title: "Términos y Condiciones — ReseñaIQ",
  description: "Condiciones de uso del servicio ReseñaIQ.",
};

const EMPRESA = {
  titular: "[NOMBRE DE LA EMPRESA O TITULAR]",
  email: "soporte@tudominio.com",
  jurisdiccion: "[CIUDAD]",
  pais: "España",
};

export default function TerminosPage() {
  return (
    <LegalShell title="Términos y Condiciones" lastUpdated="14 de junio de 2026">
      <p>
        Estos Términos y Condiciones regulan el acceso y uso de{" "}
        <strong>ReseñaIQ</strong> (en adelante, "el Servicio"), titularidad de{" "}
        {EMPRESA.titular}. Al registrarte o utilizar el Servicio, aceptas estos
        términos en su totalidad.
      </p>

      <h2>1. Objeto del servicio</h2>
      <p>
        ReseñaIQ es una plataforma SaaS que permite a negocios centralizar
        reseñas de distintas plataformas, analizarlas mediante inteligencia
        artificial y gestionar su reputación online desde un panel único.
      </p>

      <h2>2. Registro y cuenta</h2>
      <ul>
        <li><span>Debes proporcionar información veraz y mantenerla actualizada.</span></li>
        <li><span>Eres responsable de la confidencialidad de tus credenciales y de toda la actividad que ocurra en tu cuenta.</span></li>
        <li><span>Debes ser mayor de edad y tener capacidad legal para contratar.</span></li>
      </ul>

      <h2>3. Planes, pagos y cancelación</h2>
      <ul>
        <li><span>El Servicio ofrece un plan gratuito y planes de pago (Pro y Business) con facturación <strong>mensual recurrente</strong> a través de Stripe.</span></li>
        <li><span>La suscripción se <strong>renueva automáticamente</strong> al final de cada periodo salvo que la canceles antes desde el portal de suscripción.</span></li>
        <li><span>Al cancelar, conservarás el acceso a las funciones de pago hasta el final del periodo ya abonado; no se realizan reembolsos por periodos parciales salvo obligación legal.</span></li>
        <li><span>Los precios pueden modificarse; cualquier cambio se notificará con antelación y se aplicará en el siguiente ciclo de facturación.</span></li>
      </ul>

      <h2>4. Uso aceptable</h2>
      <p>Te comprometes a no utilizar el Servicio para:</p>
      <ul>
        <li><span>Actividades ilícitas o que infrinjan derechos de terceros.</span></li>
        <li><span>Introducir malware, intentar accesos no autorizados o alterar la seguridad del Servicio.</span></li>
        <li><span>Realizar ingeniería inversa, revender o suplantar el Servicio sin autorización.</span></li>
        <li><span>Publicar o gestionar reseñas falsas o manipuladas con ánimo de engañar.</span></li>
      </ul>

      <h2>5. Contenido y reseñas</h2>
      <p>
        Eres el único responsable de los datos y reseñas que conectas o importas.
        Garantizas que dispones de los derechos necesarios y que su tratamiento
        cumple con la legislación aplicable y con los términos de servicio de las
        plataformas de origen (Google, Yelp, TripAdvisor, Trustpilot, etc.).
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El software, la marca, el diseño y los contenidos del Servicio son
        propiedad de su titular o de sus licenciantes. Conservas la titularidad
        de tus datos; nos concedes una licencia limitada para procesarlos con el
        único fin de prestarte el Servicio.
      </p>

      <h2>7. Disponibilidad y exención de garantías</h2>
      <p>
        El Servicio se presta "tal cual" y "según disponibilidad". Aunque nos
        esforzamos por mantener una alta disponibilidad, no garantizamos un
        funcionamiento ininterrumpido ni libre de errores. Los análisis generados
        por IA tienen carácter orientativo y no constituyen asesoramiento
        profesional.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, {EMPRESA.titular} no será
        responsable de daños indirectos, lucro cesante o pérdida de datos
        derivados del uso o la imposibilidad de uso del Servicio. Nuestra
        responsabilidad total se limitará al importe abonado por ti en los 12
        meses anteriores al hecho que origine la reclamación.
      </p>

      <h2>9. Terminación</h2>
      <p>
        Puedes cancelar tu cuenta en cualquier momento. Podremos suspender o
        cancelar el acceso en caso de incumplimiento de estos términos, con
        notificación cuando sea razonablemente posible.
      </p>

      <h2>10. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por la legislación de {EMPRESA.pais}. Para
        cualquier controversia, las partes se someten a los juzgados y tribunales
        de {EMPRESA.jurisdiccion}, salvo que la normativa de consumo disponga
        otro fuero.
      </p>

      <h2>11. Cambios en los términos</h2>
      <p>
        Podemos modificar estos términos. Publicaremos la versión vigente en esta
        página y, si los cambios son sustanciales, te lo notificaremos.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier consulta, escríbenos a{" "}
        <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>.
      </p>
    </LegalShell>
  );
}
