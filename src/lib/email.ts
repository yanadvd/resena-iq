import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.ALERTS_FROM_EMAIL || "ReseñaIQ <onboarding@resend.dev>";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

/**
 * Envía un email. Si Resend no está configurado, lo registra en consola
 * (modo desarrollo) en lugar de fallar — la app sigue siendo funcional.
 */
export async function sendEmail({ to, subject, html }: SendArgs): Promise<boolean> {
  if (!resend) {
    console.log(
      `\n[email:dev] Para: ${to}\n[email:dev] Asunto: ${subject}\n[email:dev] (configura RESEND_API_KEY para enviar de verdad)\n`
    );
    return false;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
    return true;
  } catch (err) {
    console.error("[email] error enviando con Resend:", err);
    return false;
  }
}

export function negativeReviewEmail(opts: {
  businessName: string;
  author: string;
  rating: number;
  source: string;
  text: string;
  dashboardUrl: string;
}): string {
  const stars = "★".repeat(opts.rating) + "☆".repeat(5 - opts.rating);
  return `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#0b0b0f;color:#e7e7ea;padding:32px;border-radius:16px">
    <p style="color:#f43f5e;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:12px;margin:0 0 8px">⚠ Nueva reseña negativa</p>
    <h1 style="font-size:22px;margin:0 0 16px;color:#fff">${opts.businessName}</h1>
    <div style="background:#16161d;border:1px solid #26262f;border-radius:12px;padding:20px;margin-bottom:20px">
      <p style="margin:0 0 4px;color:#f59e0b;font-size:18px">${stars}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#9a9aa5">${opts.author || "Anónimo"} · ${opts.source}</p>
      <p style="margin:0;line-height:1.6">${opts.text}</p>
    </div>
    <a href="${opts.dashboardUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600">Ver en el dashboard →</a>
    <p style="margin:24px 0 0;font-size:12px;color:#6b6b76">Recibes esto porque tienes activadas las alertas en ReseñaIQ.</p>
  </div>`;
}
