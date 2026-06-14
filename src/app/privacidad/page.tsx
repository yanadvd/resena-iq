import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal-shell";

export const metadata: Metadata = {
  title: "Política de Privacidad — ReseñaIQ",
  description:
    "Cómo ReseñaIQ recopila, usa y protege tus datos personales conforme al RGPD.",
};

// ⚠️ Sustituye estos valores por los datos reales de tu empresa antes de publicar.
const EMPRESA = {
  titular: "David Yana Nsang",
  nif: "60114599M",
  direccion: "Calle Doña Francisquita 3, 4ºD, 28041 Madrid (España)",
  email: "ratify@gmail.com",
  pais: "España",
};

export default function PrivacidadPage() {
  return (
    <LegalShell title="Política de Privacidad" lastUpdated="14 de junio de 2026">
      <p>
        En <strong>ReseñaIQ</strong> nos tomamos muy en serio la privacidad de
        tus datos. Esta política explica qué datos personales recopilamos, con
        qué finalidad, sobre qué base legal, con quién los compartimos y qué
        derechos tienes, de conformidad con el Reglamento (UE) 2016/679{" "}
        <strong>(RGPD)</strong> y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>Titular:</strong> {EMPRESA.titular}
        <br />
        <strong>NIF/CIF:</strong> {EMPRESA.nif}
        <br />
        <strong>Domicilio:</strong> {EMPRESA.direccion}
        <br />
        <strong>Email de contacto:</strong>{" "}
        <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>Tratamos las siguientes categorías de datos:</p>
      <ul>
        <li>
          <span><strong>Datos de cuenta:</strong> nombre, dirección de email y
          contraseña (almacenada cifrada con bcrypt). Si te registras con
          Google, recibimos tu nombre, email e imagen de perfil.</span>
        </li>
        <li>
          <span><strong>Datos del negocio:</strong> nombre del negocio, sector,
          sitio web y preferencias de alertas que tú configuras.</span>
        </li>
        <li>
          <span><strong>Reseñas y contenido:</strong> las reseñas que conectas o
          importas (autor, texto, calificación, fecha) y los análisis derivados
          (sentimiento, temas, palabras clave) generados por nuestro sistema.</span>
        </li>
        <li>
          <span><strong>Datos de facturación:</strong> gestionados por nuestro
          proveedor de pagos (Stripe). <strong>No almacenamos los datos
          completos de tu tarjeta</strong> en nuestros servidores.</span>
        </li>
        <li>
          <span><strong>Datos técnicos y de uso:</strong> dirección IP, tipo de
          navegador, páginas visitadas y registros de actividad, con fines de
          seguridad y mejora del servicio.</span>
        </li>
      </ul>

      <h2>3. Finalidades y base jurídica</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base jurídica (RGPD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Crear y gestionar tu cuenta y prestarte el servicio</td>
            <td>Ejecución de un contrato (art. 6.1.b)</td>
          </tr>
          <tr>
            <td>Procesar pagos y gestionar la suscripción</td>
            <td>Ejecución de un contrato (art. 6.1.b)</td>
          </tr>
          <tr>
            <td>Analizar reseñas con IA y generar informes</td>
            <td>Ejecución de un contrato (art. 6.1.b)</td>
          </tr>
          <tr>
            <td>Enviar alertas y comunicaciones del servicio</td>
            <td>Ejecución de un contrato e interés legítimo (art. 6.1.f)</td>
          </tr>
          <tr>
            <td>Seguridad, prevención del fraude y mejora del producto</td>
            <td>Interés legítimo (art. 6.1.f)</td>
          </tr>
          <tr>
            <td>Comunicaciones comerciales (si aplica)</td>
            <td>Consentimiento (art. 6.1.a)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Encargados del tratamiento y terceros</h2>
      <p>
        Para prestar el servicio compartimos datos con proveedores que actúan
        como <strong>encargados del tratamiento</strong>, sujetos a contrato y a
        las garantías del RGPD:
      </p>
      <ul>
        <li><span><strong>Vercel Inc.</strong> — alojamiento de la aplicación.</span></li>
        <li><span><strong>Neon / proveedor de base de datos</strong> — almacenamiento de datos.</span></li>
        <li><span><strong>Stripe, Inc.</strong> — procesamiento de pagos.</span></li>
        <li><span><strong>OpenAI</strong> — análisis de sentimiento y generación de resúmenes de las reseñas.</span></li>
        <li><span><strong>Resend</strong> — envío de emails transaccionales y alertas.</span></li>
        <li><span><strong>Google LLC</strong> — autenticación mediante OAuth (si la usas).</span></li>
      </ul>
      <p>
        No vendemos tus datos personales a terceros.
      </p>

      <h2>5. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros proveedores están ubicados fuera del Espacio
        Económico Europeo (p. ej. EE. UU.). En tales casos, las transferencias
        se amparan en mecanismos válidos como las <strong>Cláusulas
        Contractuales Tipo</strong> de la Comisión Europea y/o el{" "}
        <strong>EU-U.S. Data Privacy Framework</strong>.
      </p>

      <h2>6. Conservación de los datos</h2>
      <p>
        Conservamos tus datos mientras mantengas una cuenta activa. Tras la
        cancelación, los eliminamos o anonimizamos en un plazo razonable, salvo
        que debamos conservarlos para cumplir obligaciones legales (p. ej.
        fiscales o contables).
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de{" "}
        <strong>acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad</strong>, así como retirar tu consentimiento,
        escribiendo a{" "}
        <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>.
      </p>
      <p>
        Si consideras que el tratamiento no se ajusta a la normativa, tienes
        derecho a presentar una reclamación ante la{" "}
        <strong>Agencia Española de Protección de Datos</strong> (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ).
      </p>

      <h2>8. Cookies</h2>
      <p>
        Utilizamos únicamente <strong>cookies técnicas necesarias</strong> para
        el funcionamiento del servicio (mantener tu sesión iniciada y la
        seguridad de la autenticación). Estas cookies no requieren consentimiento
        previo. No usamos cookies publicitarias ni de seguimiento de terceros con
        fines comerciales.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas: cifrado en
        tránsito (HTTPS), contraseñas almacenadas con hash bcrypt, control de
        acceso por roles y verificación de firma en los webhooks de pago.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        El servicio está dirigido a empresas y profesionales. No está destinado a
        menores de 14 años y no recopilamos conscientemente sus datos.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios legales o del
        servicio. Publicaremos la versión vigente en esta página con su fecha de
        actualización.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier cuestión sobre privacidad, escríbenos a{" "}
        <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>.
      </p>
    </LegalShell>
  );
}
