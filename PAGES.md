# Repusense — Descripción de páginas

## Índice

- [Marketing](#marketing)
  - [/ — Inicio (Landing)](#--inicio-landing)
  - [/pricing — Precios](#pricing--precios)
  - [/analisis-gratis — Análisis gratuito](#analisis-gratis--análisis-gratuito)
  - [/blog — Blog](#blog--blog)
  - [/blog/[slug] — Artículo de blog](#blogsluq--artículo-de-blog)
  - [/para-restaurantes, /para-agencias, /para-clinicas, /para-hoteles, /para-franquicias, /para-gimnasios — Landings verticales](#landings-verticales)
- [Autenticación](#autenticación)
  - [/login — Iniciar sesión](#login--iniciar-sesión)
  - [/register — Registro](#register--registro)
- [Dashboard](#dashboard)
  - [/dashboard/onboarding — Configuración inicial](#dashboardonboarding--configuración-inicial)
  - [/dashboard — Vista general](#dashboard--vista-general)
  - [/dashboard/reviews — Reseñas](#dashboardreviews--reseñas)
  - [/dashboard/sources — Fuentes](#dashboardsources--fuentes)
  - [/dashboard/reports — Reportes](#dashboardreports--reportes)
  - [/dashboard/settings — Suscripción y ajustes](#dashboardsettings--suscripción-y-ajustes)
- [Legal](#legal)
  - [/privacidad — Política de privacidad](#privacidad--política-de-privacidad)
  - [/terminos — Términos de uso](#terminos--términos-de-uso)
- [Elementos globales](#elementos-globales)

---

## Marketing

### `/` — Inicio (Landing)

Página principal pública. Objetivo: convertir visitantes en registros.

**Cabecera global** (`SiteHeader`)
- Logo Repusense → `/`
- Nav: Análisis gratis · Funcionalidades · Cómo funciona · Precios · Blog
- Botones: "Entrar" (ghost) → `/login` | "Empezar gratis" (filled) → `/register`

**Hero**
- Pill badge: "Análisis de reseñas potenciado por IA"
- Título H1: "Análisis de reseñas con IA / para negocios locales"
- Subtítulo descriptivo sobre centralización de reseñas
- CTA principal "Empezar gratis" → `/register`
- CTA secundario "Analiza tu negocio gratis" → `/analisis-gratis`
- Micro-copy: "Sin tarjeta · Plan Free para siempre · Cancela cuando quieras"
- Mock de dashboard: 4 tarjetas de métricas (Reputación, Media, Reseñas, Sentimiento) + gráfico de barras

**Barra de confianza**
- "Integra con" + nombres de plataformas: Google Reviews · Yelp · TripAdvisor · Trustpilot

**Sección de problemas** (`#features` adyacente)
- Título "¿Te suena familiar?"
- 6 tarjetas con problemas comunes: reseñas negativas tardías, sin visión global, sin datos de tendencia, respuestas manuales lentas, temas repetidos desconocidos, competencia mejor valorada

**Sección de funcionalidades** (`#features`)
- Título "De reseñas dispersas a inteligencia accionable"
- 6 tarjetas de características con icono, nombre y descripción:
  - Recopilación automática
  - Análisis con IA
  - Puntuación de reputación
  - Tendencias en el tiempo
  - Alertas inteligentes
  - Reportes exportables

**Sección "Cómo funciona"** (`#how`)
- Layout dos columnas: texto + 3 pasos numerados
  1. Conecta tus canales
  2. La IA hace el trabajo
  3. Actúa con datos

**Testimonios**
- 3 tarjetas con: valoración 5★, cita, nombre, cargo/negocio, y métrica destacada (ej. "4.2 → 4.8 estrellas")
  - Carlos M. (restaurante)
  - Dra. Lucía R. (clínica dental)
  - Javier A. (hotel)

**Barra de métricas**
- 4 estadísticas: plataformas integradas, análisis IA, monitorización 24/7, alertas <1 min

**Sección de precios**
- Componente `<PricingCards />` con los 3 planes

**CTA final**
- Tarjeta con fondo mesh: "Deja de adivinar lo que piensan tus clientes"
- Botón "Crear mi cuenta gratis" → `/register`

**Pie global** (`SiteFooter`)
- Logo + año · Nav: Análisis gratis · Blog · Precios · Entrar · Privacidad · Términos

---

### `/pricing` — Precios

Página pública de planes y precios.

**Hero**
- Título "Precios simples y transparentes"
- Subtítulo sobre ausencia de sorpresas ni permanencia

**Planes** (`<PricingCards />`)
- 3 columnas: **Free**, **Pro** (29 €/mes, destacado), **Business** (79 €/mes)
- Cada tarjeta: nombre del plan, precio, descripción, lista de características incluidas, CTA

**FAQ**
- 4 acordeones `<details>` con `+` animado:
  1. ¿Puedo cambiar de plan en cualquier momento?
  2. ¿Qué pasa al superar el límite de reseñas?
  3. ¿Cómo se realizan los pagos?
  4. ¿El plan Free caduca?
- JSON-LD `FAQPage` para SEO

---

### `/analisis-gratis` — Análisis gratuito

Herramienta pública para analizar reseñas de Google sin registro.

**Hero**
- Badge "Gratis · sin registro · en 30 segundos"
- Título con IA destacado
- Descripción de la herramienta
- Componente `<FreeReportTool />` (buscador interactivo)

**`<FreeReportTool />` — Herramienta principal**
- Input de búsqueda: nombre del negocio + ciudad
- Botón "Analizar"
- Resultados: informe generado con:
  - Puntuación de reputación (0–100)
  - Media de estrellas
  - Distribución sentimiento (barra positivo/neutro/negativo)
  - Puntos fuertes (lista)
  - Áreas de mejora (lista)
  - Reseñas de ejemplo
  - CTA para registrarse y monitorizar continuamente

**Cómo funciona** (3 mini-tarjetas inline)
- Escribe tu negocio · La IA lo analiza · Monitorízalo gratis

**Qué incluye el informe** (6 tarjetas)
- Puntuación de reputación, análisis de sentimiento, temas recurrentes, puntos fuertes y a mejorar, resumen ejecutivo IA, ejemplos de reseñas

**Preview de informe**
- Mock visual de informe para "Café Aurora, Valencia"

**Bloque SEO**
- 3 párrafos descriptivos para indexación

**FAQ**
- 5 acordeones: ¿es gratis?, ¿de dónde vienen las reseñas?, ¿qué negocios puedo analizar?, ¿necesito cuenta?, ¿con qué frecuencia se actualiza?

---

### `/blog` — Blog

Listado de artículos del blog.

**Hero**
- Título "Blog de Repusense"
- Subtítulo sobre gestión de reputación y reseñas

**Grid de artículos**
- Tarjetas con: categoría pill, título H2, descripción, enlace "Leer →"
- Enlace completo de cada tarjeta → `/blog/[slug]`

---

### `/blog/[slug]` — Artículo de blog

Página de artículo individual.

**Elementos**
- Breadcrumb: Blog → Título del artículo (JSON-LD `BreadcrumbList`)
- Metadatos: categoría, tiempo de lectura, fecha de publicación
- Título H1
- Imagen de cabecera (og:image)
- Cuerpo del artículo en HTML renderizado
- CTA al final: "Prueba Repusense gratis" → `/analisis-gratis` o `/register`
- JSON-LD `BlogPosting` y `BreadcrumbList`

---

### Landings verticales

Páginas de aterrizaje por sector con contenido específico.

| Ruta | Sector | Titular hero |
|------|--------|--------------|
| `/para-restaurantes` | Restauración | "Una mala reseña cuesta mesas" |
| `/para-agencias` | Agencias marketing | "Gestiona la reputación de todos tus clientes. Desde un panel." |
| `/para-clinicas` | Clínicas / salud | "Tus pacientes te buscan en Google antes de llamar." |
| `/para-hoteles` | Hoteles | "TripAdvisor mueve tus reservas. Repusense controla TripAdvisor." |
| `/para-franquicias` | Franquicias | "Una sede con 3 estrellas daña a toda tu red." |
| `/para-gimnasios` | Gimnasios / fitness | "Tus socios te eligen por tus reseñas." |

**Estructura común de cada landing vertical**
- Barra de plataformas (Google, TripAdvisor, Yelp, Trustpilot)
- 4 problemas específicos del sector con icono de alerta
- 6 funcionalidades en cuadrícula
- Cómo funciona en 3 pasos
- Estadísticas con fuentes (ej. Cornell Hospitality Research, Harvard/Yelp)
- Testimonio de cliente del sector
- FAQ con acordeones y JSON-LD `FAQPage`
- JSON-LD `BreadcrumbList`
- CTA "Empezar gratis" → `/register`

---

## Autenticación

### `/login` — Iniciar sesión

**Layout**: pantalla completa centrada, fondo con gradiente mesh.

**Elementos**
- Logo Repusense en esquina superior izquierda → `/`
- Título "Bienvenido de nuevo"
- Subtítulo "Entra para gestionar tu reputación"
- Botón OAuth "Continuar con Google" (con spinner de carga)
- Separador "o con tu email"
- Campo Email (tipo email, autocomplete)
- Campo Contraseña (tipo password, autocomplete)
- Mensaje de error inline: "Email o contraseña incorrectos."
- Botón "Entrar" (con spinner mientras carga)
- Link "¿No tienes cuenta? Regístrate gratis" → `/register`

**Comportamiento**
- Redirecciona a `callbackUrl` (por defecto `/dashboard`) tras login exitoso

---

### `/register` — Registro

**Layout**: pantalla completa centrada, fondo con gradiente mesh.

**Elementos**
- Logo Repusense → `/`
- Título "Crea tu cuenta"
- Subtítulo "Empieza gratis. Sin tarjeta de crédito."
- Badge de plan seleccionado (si `?plan=PRO` o `?plan=BUSINESS` en URL): "Plan X seleccionado · continúa el pago tras registrarte"
- Botón OAuth "Continuar con Google"
- Separador "o con tu email"
- Fila de 2 campos: Tu nombre + Negocio (opcional)
- Campo Email
- Campo Contraseña (mínimo 8 caracteres)
- Mensaje de error inline
- Checkbox de marketing: "Quiero recibir novedades, consejos y ofertas de Repusense por email. (Opcional)"
- Botón "Crear cuenta gratis" (con spinner)
- Texto legal con links a `/terminos` y `/privacidad`
- Link "¿Ya tienes cuenta? Inicia sesión" → `/login`

**Comportamiento post-registro**
- Si tiene `intendedPlan` → `/dashboard/settings?upgrade=[PLAN]`
- Si no → `/dashboard/onboarding`

---

## Dashboard

El dashboard tiene una barra lateral persistente con navegación y etiqueta del plan actual.

**Sidebar** (visible en todas las rutas `/dashboard/*`)
- Logo Repusense
- Navegación principal:
  - Vista general → `/dashboard`
  - Reseñas → `/dashboard/reviews`
  - Fuentes → `/dashboard/sources`
  - Reportes → `/dashboard/reports`
- Navegación inferior:
  - Ajustes → `/dashboard/settings`
- Etiqueta del plan activo (ej. "Plan Free")

---

### `/dashboard/onboarding` — Configuración inicial

Wizard de 4 pasos para nuevos usuarios. Se redirige a `/dashboard` si ya hay fuentes conectadas.

**Indicador de progreso**
- 4 pasos conectados con líneas: bienvenida → búsqueda → sincronizando → listo

**Paso 1 — Bienvenida**
- Icono Sparkles
- Título "Bienvenido/a, [nombre]"
- Descripción del proceso (3 pasos explicativos)
- Botón "Empezar"

**Paso 2 — Buscar negocio**
- Icono Search
- Input de búsqueda con debounce (500ms, mínimo 3 caracteres)
- Resultados de Google Places: nombre, dirección, valoración media, nº reseñas
- Selección de resultado (resaltado con borde primary)
- Estado vacío si no hay resultados
- Mensaje de error inline
- Botón "Buscar negocio" / "Conectar negocio" (activado al seleccionar)

**Paso 3 — Sincronizando**
- Spinner animado
- 3 mensajes de progreso: conectando con Google · descargando reseñas · analizando con IA

**Paso 4 — Listo**
- Icono CheckCircle
- Resumen: N reseñas importadas del negocio seleccionado
- 3 confirmaciones: puntuación calculada, análisis IA completado, alertas activas
- Botón "Ver mi dashboard" → `/dashboard`

---

### `/dashboard` — Vista general

Panel principal con métricas agregadas de toda la reputación.

**Estado vacío** (sin reseñas)
- Icono Plug
- Título "Conecta tu primera fuente de reseñas"
- Botón "Empezar guía" → `/dashboard/onboarding`
- Botón "Conectar manualmente" → `/dashboard/sources`

**Con datos:**

**Saludo**
- "Hola, [nombre] 👋" + email del usuario

**KPIs** (4 tarjetas)
| Métrica | Descripción |
|---------|-------------|
| Reputación | Puntuación 0–100 |
| Calificación media | Media de estrellas + total de reseñas |
| Reseñas totales | Suma de todas las fuentes |
| Sentimiento positivo | % positivas + % negativas como hint |

**Gráficos** (fila de 2 columnas)
- Gráfico de área "Tendencia de sentimiento" — últimos 6 meses
- Gráfico donut "Distribución" — positivas / neutras / negativas con leyenda

**Resumen IA + Valoraciones** (fila de 2 columnas)
- Tarjeta "Resumen ejecutivo IA": texto generado por IA + "Puntos fuertes" (verde) + "Áreas de mejora" (rojo) con listas de bullets
- Tarjeta "Reseñas por estrellas": gráfico de barras horizontales del 1★ al 5★

**Uso + Temas** (fila de 2 columnas)
- Tarjeta "Uso del plan [nombre]":
  - Barra de progreso: Reseñas este mes (usadas / máximo)
  - Barra de progreso: Canales conectados (usados / máximo)
  - Barras en rojo si >85% del límite
  - Botón "Mejorar plan" → `/dashboard/settings` (si no es BUSINESS)
- Tarjeta "Temas más mencionados": pills de etiquetas con contador

**Reseñas recientes**
- Título "Reseñas recientes" + link "Ver todas →" → `/dashboard/reviews`
- Cuadrícula de tarjetas de reseña (`<ReviewCard />`)

---

### `/dashboard/reviews` — Reseñas

Explorer completo de todas las reseñas. Hasta 500 reseñas, ordenadas por fecha desc.

**Estado vacío**
- Caja con borde discontinuo: "Aún no hay reseñas. Conecta una fuente o importa un CSV para empezar."

**Panel de filtros** (siempre visible)
- Input de búsqueda de texto libre en el contenido de las reseñas
- Filtro por sentimiento: Todos · Positivas · Neutras · Negativas (chips)
- Filtro por estrellas: Todas · 5★ · 4★ · 3★ · 2★ · 1★ (chips)
- Filtro por fuente: Todas · [nombre de cada fuente conectada] (chips, solo si hay fuentes)

**Resultados**
- Contador "N reseña(s)"
- Cuadrícula 2 columnas (`md:grid-cols-2`) de `<ReviewCard />`
- Estado vacío filtrado: "No hay reseñas que coincidan con los filtros."

**`<ReviewCard />`**
- Nombre del autor + fecha
- Valoración en estrellas (1–5)
- Plataforma origen (pill con color)
- Texto de la reseña en idioma original
- Etiqueta de sentimiento (Positiva / Neutra / Negativa)
- Botón "Sugerir respuesta IA" (solo si `canAiReply` y plan lo permite) → llama a `/api/reviews/reply`

---

### `/dashboard/sources` — Fuentes

Gestión de fuentes de reseñas conectadas.

**Intro**
- Texto explicativo sobre la recopilación automática periódica con IA

**Cuadrícula de 2 columnas + 1 fila completa:**

**Tarjeta "Conectar una fuente"**
- Si plan al límite: aviso de upgrade con link a `/dashboard/settings`
- Si puede agregar:
  - Selector de plataforma (4 botones en 2×2):
    - Google ✅ disponible
    - Yelp 🔜 "Pronto" (deshabilitado)
    - TripAdvisor 🔜 "Pronto" (deshabilitado)
    - Trustpilot 🔜 "Pronto" (deshabilitado)
  - Campo "Etiqueta" (nombre para identificar la fuente)
  - Campo "URL del perfil" (opcional)
  - Campo "Place ID de Google" (para Google) o "Business ID de Yelp" (para Yelp), con link de ayuda
  - Botón "Conectar y sincronizar"
  - Mensaje de éxito/error con icono

**Tarjeta "Importar reseñas (CSV)"**
- Descripción del formato: columnas `author`, `rating`, `text`, `date`
- Botón "Seleccionar archivo CSV" (abre selector de archivos)
- Mensaje de resultado tras importar

**Tarjeta "Fuentes conectadas"** (ancho completo)
- Lista de fuentes con:
  - Icono de plataforma (cuadrado con color)
  - Etiqueta de la fuente
  - Nombre de plataforma + fecha de última sincronización
  - Botón eliminar (papelera roja)

---

### `/dashboard/reports` — Reportes

Generación y descarga de reportes de reputación.

**Botones de acción** (`<ReportActions />`)
- "Exportar PDF" (solo en plan Pro y Business)
- "Exportar CSV" (solo en plan Pro y Business)
- "Regenerar resumen IA" → llama a `/api/reports/regenerate`

**Aviso de upgrade** (si plan Free)
- Icono de candado + texto sobre disponibilidad en plan Pro
- Link "Mejorar plan" → `/dashboard/settings`

**Estado vacío** (sin resumen IA aún)
- Caja: "Aún no hay un reporte. Pulsa 'Regenerar resumen IA' tras sincronizar reseñas."

**Tarjeta de reporte** (cuando hay datos):
- Cabecera: "Reporte de reputación" + rango de fechas + fecha de generación
- 4 métricas: Reputación (X/100), Media (X.X★), Reseñas (N), Positivas (X%)
- "Resumen ejecutivo" — párrafo de texto generado por IA
- Dos columnas: "Puntos fuertes" (verde) + "Áreas de mejora" (rojo) con listas
- "Temas clave" — pills de etiquetas (solo en plan Business)

---

### `/dashboard/settings` — Suscripción y ajustes

Gestión de suscripción y configuración del negocio.

**Sección "Suscripción"** (`<SubscriptionPanel />`)
- Plan actual (Free / Pro / Business)
- Estado de facturación
- Fecha de próximo ciclo
- Link al portal de Stripe (gestión de pago, facturas, cancelación)

**Sección "Negocio y alertas"** (`<SettingsForm />`)
- Campo "Nombre del negocio"
- Campo "Sector / industria"
- Campo "Sitio web"
- Campo "Email de alertas"
- Toggle "Activar alertas" (on/off)
- Selector "Umbral de alerta" (nota mínima para alertar, ej. ≤ 3★) — solo en planes con alertas personalizadas
- Botón guardar

---

## Legal

### `/privacidad` — Política de privacidad

Página estática con el texto legal de la política de privacidad de Repusense.

### `/terminos` — Términos de uso

Página estática con los términos y condiciones del servicio.

---

## Elementos globales

### `SiteHeader` (páginas públicas)
- Sticky, fondo blur con borde inferior
- Logo → `/`
- Nav central (oculto en móvil): Análisis gratis · Funcionalidades · Cómo funciona · Precios · Blog
- Botones: "Entrar" → `/login` | "Empezar gratis" → `/register`

### `SiteFooter` (páginas públicas)
- Logo + © año
- Nav: Análisis gratis · Blog · Precios · Entrar · Privacidad · Términos

### `Sidebar` (dashboard)
- Logo Repusense
- Navegación: Vista general · Reseñas · Fuentes · Reportes · Ajustes
- Etiqueta del plan actual

### `<ReviewCard />`
- Autor + fecha de publicación
- Estrellas (1–5)
- Plataforma (pill con color)
- Texto de la reseña en idioma original
- Badge de sentimiento
- Botón "Sugerir respuesta IA" (condicional al plan)

### `<PricingCards />`
- 3 columnas: Free · Pro · Business
- Cada plan: nombre, precio, descripción, lista de features, CTA

### JSON-LD por página
| Página | Schemas |
|--------|---------|
| `/pricing` | `FAQPage` |
| `/analisis-gratis` | `FAQPage` |
| `/para-[sector]` | `FAQPage` + `BreadcrumbList` |
| `/blog/[slug]` | `BlogPosting` + `BreadcrumbList` |
