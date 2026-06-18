# 📈 Repusense — Estrategia de captación

Guía operativa para conseguir tráfico y clientes. Todo lo técnico ya está
construido (informe gratis, SEO, blog, script de outreach). Esto es el "cómo".

---

## 1. Cliente ideal (ICP)
- **Primario:** negocios locales con reseñas activas y sensibles a su reputación
  — restaurantes, hoteles/hostales, clínicas dentales/estética, gimnasios,
  talleres, retail local. Tienen 50–1.000+ reseñas en Google.
- **Secundario (ticket alto):** agencias de marketing/reputación que gestionan
  varios clientes → plan **Business**, efecto multiplicador.

## 2. Canales por prioridad
1. **Informe gratis (PLG)** — `/analisis-gratis`. Tu motor de captación. ✅ hecho
2. **Outreach en frío con informe personalizado** — `npm run outreach`. ✅ hecho
3. **SEO + contenido** — blog + landings por vertical/ciudad. ✅ base hecha
4. **Agencias / partners** — plan Business, ángulo white-label.
5. **Ads (Google/Meta)** — cuando el embudo convierta; retarget a quien pidió informe.
6. **Comunidades/verticales** — asociaciones de hostelería, grupos de negocios.

## 3. El embudo
```
Visitante → Informe gratis (/analisis-gratis) → Registro (Free) → Pro / Business
```
**KPIs:** visitas, informes generados, registros, % a pago, CAC vs LTV.

---

## 4. El motor: informe de reputación gratis
- Página pública: **`/analisis-gratis`** (sin login).
- El visitante escribe su negocio → informe IA al instante → CTA a registro.
- **Difúndelo en todas partes:** firma de email, bio de redes, grupos locales,
  QR en eventos. Es el gancho con mejor conversión.

## 5. Outreach en frío (munición lista)
Genera informes + emails personalizados para una lista de negocios:
```bash
npm run outreach -- "Café Aurora, Valencia" "Restaurante Botín, Madrid"
# o desde un archivo (un negocio por línea):
npm run outreach -- --file outreach-businesses.txt
```
Se guardan los borradores en `outreach-output.md`, listos para enviar.

### Plantilla — email en frío (la genera el script, personalizada)
> **Asunto:** [Negocio] — XX/100 de reputación (informe gratis)
>
> Hola, he analizado con IA las reseñas de **[Negocio]** en Google: **XX/100**,
> X,X★, NN% positivas. Lo que más valoran: […]. A vigilar: […].
> En Repusense te avisamos al instante de las reseñas negativas para que
> respondas a tiempo. ¿Te paso el informe completo? Es gratis: [enlace].

### Plantilla — follow-up (a los 3 días, si no responde)
> Hola de nuevo, ¿pudiste ver el informe de **[Negocio]**? Si te viene bien,
> en 10 min te enseño cómo automatizar la monitorización. ¿Te cuadra esta semana?

### Plantilla — LinkedIn (a dueños/agencias)
> Hola [nombre], ayudo a negocios como [Negocio] a entender y mejorar sus
> reseñas con IA. Te he preparado un informe gratis de tu reputación, ¿te lo paso?

## 6. SEO — lo construido y cómo escalarlo
- **Hecho:** `sitemap.xml`, `robots.txt`, datos estructurados (schema.org),
  blog con 2 artículos, landing vertical `/para/restaurantes`.
- **Replica verticales** copiando `/para/restaurantes` para: `/para/hoteles`,
  `/para/clinicas-dentales`, `/para/gimnasios`, `/para/peluquerias`…
- **Páginas por ciudad** (alta intención): "software de reseñas en Madrid", etc.
- **Más artículos de blog** (añádelos en `src/content/blog.tsx`): "cómo pedir
  reseñas a tus clientes", "responder reseñas en Google paso a paso", "qué es
  la puntuación de reputación".
- **Da de alta el sitio** en Google Search Console y envía `sitemap.xml`.

## 7. Plan de los primeros 30 días
| Semana | Acción |
|---|---|
| 1 | Search Console + sitemap. Publicar `/analisis-gratis` en tus redes. Lista de 50 negocios objetivo. |
| 2 | `npm run outreach` con los 50 → enviar emails personalizados. Publicar 1 artículo nuevo. |
| 3 | Follow-ups. Crear 2 landings verticales más. Contactar 5 agencias (plan Business). |
| 4 | Medir: informes generados, registros, conversiones. Doblar lo que funcione; si hay señal, activar Google Ads en keywords de alta intención. |

---

*Todo el producto y los activos de captación están en producción en https://repusense.net*
