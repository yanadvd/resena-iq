// ============================================================================
//  Brevo — email marketing / promocional (separado de Resend, que es solo
//  transaccional). Aquí solo SINCRONIZAMOS contactos opt-in con una lista de
//  Brevo; el envío de campañas se hace desde el panel de Brevo (con su gestión
//  de bajas, obligatoria por RGPD). No-op si BREVO_API_KEY no está configurado.
// ============================================================================

export interface MarketingContact {
  email: string;
  name?: string | null;
  attributes?: Record<string, string>;
}

export async function addMarketingContact(c: MarketingContact): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return false;
  const listId = process.env.BREVO_LIST_ID;

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: c.email,
        attributes: { FIRSTNAME: c.name ?? "", ...c.attributes },
        listIds: listId ? [Number(listId)] : undefined,
        updateEnabled: true, // si el contacto ya existe, lo actualiza en vez de fallar
      }),
    });
    if (!res.ok && res.status !== 204) {
      console.error("[brevo] respuesta inesperada:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[brevo] error añadiendo contacto:", e);
    return false;
  }
}

export function isBrevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}
