import type { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  body: ReactNode;
}

// Artículos optimizados para búsquedas con intención. Edita o añade más aquí.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-responder-resena-negativa",
    title: "Cómo responder a una reseña negativa (con ejemplos)",
    description:
      "Guía práctica para responder reseñas negativas de Google sin perder clientes: qué decir, qué evitar y plantillas listas para usar.",
    date: "2026-06-17",
    readingTime: "5 min",
    body: (
      <>
        <p>
          Una reseña negativa no es el fin del mundo: es una oportunidad. El{" "}
          <strong>89% de los consumidores</strong> lee cómo responde un negocio
          a las críticas antes de decidir. Una buena respuesta puede convertir a
          un cliente molesto en uno fiel —y demuestra a los futuros clientes que
          te importa.
        </p>

        <h2>1. Responde rápido y con calma</h2>
        <p>
          El tiempo importa: responder en menos de 48 horas transmite que estás
          atento. Nunca respondas en caliente. Si la reseña te ha molestado,
          espera unos minutos antes de escribir.
        </p>

        <h2>2. La estructura que funciona</h2>
        <ul>
          <li><span>Agradece el comentario, aunque sea negativo.</span></li>
          <li><span>Discúlpate por la experiencia (sin admitir culpa legal).</span></li>
          <li><span>Reconoce el problema concreto que menciona.</span></li>
          <li><span>Ofrece una solución o invita a continuar en privado.</span></li>
          <li><span>Firma con un nombre real, no &quot;el equipo&quot;.</span></li>
        </ul>

        <h2>3. Plantilla lista para usar</h2>
        <p>
          <em>
            &quot;Hola [nombre], gracias por tomarte el tiempo de escribirnos.
            Sentimos mucho que tu experiencia con [problema] no fuera la
            esperada. Nos lo tomamos muy en serio y nos gustaría arreglarlo:
            escríbenos a [email] y lo resolvemos. Gracias por ayudarnos a
            mejorar. — [Tu nombre], [Negocio].&quot;
          </em>
        </p>

        <h2>4. Lo que NUNCA debes hacer</h2>
        <ul>
          <li><span>Discutir o ponerte a la defensiva en público.</span></li>
          <li><span>Copiar y pegar la misma respuesta genérica a todos.</span></li>
          <li><span>Pedir que borren la reseña.</span></li>
          <li><span>Ignorarla (el silencio también comunica).</span></li>
        </ul>

        <h2>Detecta las negativas antes que nadie</h2>
        <p>
          El problema de responder rápido es <strong>enterarte a tiempo</strong>.
          Con <strong>Repusense</strong> recibes una alerta por email en cuanto
          llega una reseña negativa, en todos tus canales, para que respondas
          antes de que haga daño.
        </p>
      </>
    ),
  },
  {
    slug: "mejorar-reputacion-google-negocio-local",
    title: "Cómo mejorar tu reputación en Google: guía para negocios locales",
    description:
      "7 acciones concretas para subir tu valoración en Google, conseguir más reseñas positivas y atraer más clientes a tu negocio local.",
    date: "2026-06-17",
    readingTime: "6 min",
    body: (
      <>
        <p>
          Tu valoración en Google es, hoy, tu mejor escaparate. Un negocio con{" "}
          <strong>4,5★ recibe el doble de clics</strong> que uno con 3,5★. La
          buena noticia: la reputación se trabaja. Aquí tienes 7 acciones que
          funcionan.
        </p>

        <h2>1. Pide reseñas (de forma sistemática)</h2>
        <p>
          La mayoría de clientes satisfechos no deja reseña… salvo que se lo
          pidas. Hazlo en el momento de máxima satisfacción: al pagar, tras un
          buen servicio, en el email de seguimiento. Un QR en la mesa o el
          mostrador multiplica las reseñas.
        </p>

        <h2>2. Pónselo fácil</h2>
        <p>
          Cuantos menos clics, mejor. Usa tu enlace directo de reseña de Google
          (lo encuentras en tu perfil de empresa) y compártelo por WhatsApp,
          email o QR.
        </p>

        <h2>3. Responde a TODAS las reseñas</h2>
        <p>
          A las buenas y a las malas. Google premia la actividad, y los clientes
          valoran que estés presente. Mira nuestra{" "}
          <a href="/blog/como-responder-resena-negativa">guía para responder reseñas negativas</a>.
        </p>

        <h2>4. Escucha lo que se repite</h2>
        <p>
          Si tres clientes mencionan &quot;la espera&quot;, no es casualidad: es
          un patrón. Detectar los <strong>temas recurrentes</strong> en tus
          reseñas te dice exactamente qué arreglar para subir la nota.
        </p>

        <h2>5. Convierte lo negativo en mejora</h2>
        <p>
          Cada crítica es información gratis. Arregla la causa, y díselo a quien
          se quejó: &quot;hemos cambiado X gracias a tu comentario&quot;. Muchos
          actualizan su reseña.
        </p>

        <h2>6. Mantén tu ficha impecable</h2>
        <ul>
          <li><span>Horario, teléfono y dirección actualizados.</span></li>
          <li><span>Fotos recientes y de calidad.</span></li>
          <li><span>Categoría correcta y descripción con tus palabras clave.</span></li>
        </ul>

        <h2>7. Mide y mejora en el tiempo</h2>
        <p>
          Lo que no se mide no mejora. Vigila tu nota media, el volumen de
          reseñas y la tendencia del sentimiento mes a mes.
        </p>

        <h2>Hazlo en automático con Repusense</h2>
        <p>
          <strong>Repusense</strong> centraliza tus reseñas, las analiza con IA
          (sentimiento, temas y puntuación de reputación), te avisa de las
          negativas y te muestra exactamente qué mejorar.{" "}
          <a href="/analisis-gratis">Analiza tu negocio gratis</a> en 30 segundos.
        </p>
      </>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
