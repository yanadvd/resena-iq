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
    title: "Cómo responder a una reseña negativa: guía completa con plantillas por sector",
    description:
      "Guía definitiva para responder reseñas negativas en Google: estructura paso a paso, plantillas para restaurante, clínica, taller y hotel, errores a evitar y cómo convertir una crítica en una oportunidad.",
    date: "2026-06-17",
    readingTime: "15 min",
    body: (
      <>
        <p>
          Una reseña negativa no es el fin del mundo: bien gestionada, puede ser
          la mejor publicidad de tu negocio. El{" "}
          <strong>89% de los consumidores</strong> lee cómo responde un negocio
          a las críticas antes de decidir si confía en él. Y el{" "}
          <strong>45% visita más probable mente un negocio</strong> cuando ve
          que responde a reseñas negativas con profesionalidad.
        </p>
        <p>
          Esta guía cubre todo lo que necesitas saber: la estructura que funciona,
          plantillas listas para usar por sector, cómo gestionar los casos más
          difíciles (reseñas falsas, agresivas, con datos erróneos) y los errores
          que convierten una crítica en una crisis de reputación.
        </p>

        <h2>Por qué importa tu respuesta (y no solo la nota)</h2>
        <p>
          Cuando un posible cliente ve una reseña de 1★, lo primero que hace es
          leer tu respuesta. Si no existe, deduce que no te importa. Si existe y
          es defensiva o genérica, confirma el miedo. Pero si es empática,
          concreta y profesional, transforma esa 1★ en una señal de confianza.
        </p>
        <p>
          Además, Google tiene en cuenta la actividad de respuestas en su
          algoritmo de posicionamiento local. Los negocios que responden a sus
          reseñas (positivas y negativas) suelen aparecer más arriba en Google Maps.
        </p>

        <h2>1. Antes de escribir: los primeros 5 minutos</h2>
        <p>
          El tiempo importa, pero la precipitación es tu peor enemiga. Sigue este
          protocolo antes de teclear:
        </p>
        <ul>
          <li>
            <span>
              <strong>Respira.</strong> Si la reseña te ha molestado o te
              parece injusta, espera al menos 15 minutos. Las respuestas
              impulsivas siempre se lamentan.
            </span>
          </li>
          <li>
            <span>
              <strong>Verifica.</strong> Busca en tu sistema si existe ese
              cliente, pedido o cita. La información concreta personaliza tu
              respuesta y demuestra que te has tomado el tiempo de investigar.
            </span>
          </li>
          <li>
            <span>
              <strong>Clasifica.</strong> ¿Es una queja legítima? ¿Un
              malentendido? ¿Una reseña falsa? ¿Un ataque de la competencia? El
              tipo de reseña determina la estrategia.
            </span>
          </li>
          <li>
            <span>
              <strong>Actúa en menos de 48 horas.</strong> Cuanto antes
              respondas, mejor. Pasada una semana, la respuesta pierde impacto y
              parece un trámite.
            </span>
          </li>
        </ul>

        <h2>2. La estructura de respuesta que funciona siempre</h2>
        <p>
          Independientemente del sector o del tipo de queja, toda buena
          respuesta tiene la misma anatomía:
        </p>
        <ul>
          <li>
            <span>
              <strong>Saludo personalizado.</strong> Usa su nombre si aparece.
              "Hola María" es mejor que "Hola cliente" o "Estimado usuario".
            </span>
          </li>
          <li>
            <span>
              <strong>Agradecimiento genuino.</strong> No sarcástico ni
              forzado. "Gracias por tomarte el tiempo de compartir tu
              experiencia" funciona aunque la reseña sea dura.
            </span>
          </li>
          <li>
            <span>
              <strong>Disculpa sin admitir culpa legal.</strong> "Lamentamos
              que tu experiencia no haya sido la esperada" es diferente a
              "Reconocemos que actuamos mal". El matiz importa.
            </span>
          </li>
          <li>
            <span>
              <strong>Reconoce el problema concreto.</strong> No de forma
              genérica. Si se quejó de la espera, menciona la espera. Demuestra
              que leíste la reseña.
            </span>
          </li>
          <li>
            <span>
              <strong>Ofrece una solución o invita al diálogo privado.</strong>{" "}
              Da un email o teléfono de contacto. El objetivo es sacar la
              conversación de la vista pública.
            </span>
          </li>
          <li>
            <span>
              <strong>Cierra con firma real.</strong> Un nombre de persona, no
              "el equipo de". Humaniza la respuesta.
            </span>
          </li>
        </ul>
        <p>
          Longitud ideal: <strong>3-5 frases</strong>. Suficiente para ser
          sustancial, corto para ser leído. Las respuestas larguísimas parecen
          defensivas.
        </p>

        <h2>3. La plantilla base (universal)</h2>
        <p>
          Usa esta como punto de partida y personalízala siempre con el
          problema específico:
        </p>
        <p>
          <em>
            "Hola [nombre], gracias por tomarte el tiempo de compartir tu
            experiencia. Lamentamos mucho que [problema concreto] no estuviera
            a la altura de lo que mereces. Nos lo tomamos muy en serio: nos
            gustaría entender qué ocurrió y resolverlo. Puedes escribirnos a
            [email] o llamarnos al [teléfono] y lo arreglamos. Gracias por
            ayudarnos a mejorar. — [Nombre], [Negocio]."
          </em>
        </p>

        <h2>4. Plantillas por sector con ejemplos reales</h2>
        <p>
          El mayor error es usar la misma plantilla para todos los casos. Un
          restaurante, una clínica y un taller tienen perfiles de queja muy
          distintos. Aquí tienes plantillas específicas para los casos más
          frecuentes en cada sector.
        </p>

        <h2>Restaurante y hostelería</h2>
        <p>
          Las quejas más habituales: espera, calidad del plato, temperatura de
          la comida, actitud del personal y ruido.
        </p>
        <p>
          <strong>Caso 1 — Queja por tiempo de espera:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], gracias por tu reseña. Tienes razón: el sábado por
            la noche tuvimos más demanda de la esperada y los tiempos se
            dispararon más de lo aceptable. Entendemos perfectamente tu
            frustración. Estamos trabajando en reforzar el equipo para los
            servicios de fin de semana. Nos encantaría que nos dieras una
            segunda oportunidad — escríbenos a [email] y te preparamos algo
            especial. — [Nombre]."
          </em>
        </p>
        <p>
          <strong>Caso 2 — Queja por calidad del plato:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], esto no es lo que queremos que vivas en [Restaurante].
            La calidad de nuestra cocina es nuestra prioridad y claramente
            fallamos en tu visita. Lo trasladaremos al equipo de cocina para que
            no vuelva a ocurrir. Si quieres contarnos más detalles, estamos en
            [email]. Esperamos poder recuperar tu confianza. — [Nombre]."
          </em>
        </p>
        <p>
          <strong>Caso 3 — Queja por precio:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], entendemos que la relación calidad-precio es clave
            al elegir dónde comer. Trabajamos con producto de temporada y
            proveedores locales, lo que tiene un coste que intentamos justificar
            en el plato. Tu comentario nos sirve para reflexionar sobre cómo
            comunicar mejor el valor de lo que ofrecemos. Gracias por ser
            honesto. — [Nombre]."
          </em>
        </p>

        <h2>Clínica dental y salud</h2>
        <p>
          Las quejas más habituales: tiempo de espera en sala, precio del
          tratamiento, resultados, trato del personal y dificultad para
          conseguir cita.
        </p>
        <p>
          <strong>Caso 1 — Queja por espera en sala:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], lamentamos que tuvieras que esperar más de lo
            previsto. Sabemos que tu tiempo es valioso y que una sala de espera
            no es un lugar agradable, especialmente si se alarga. Estamos
            revisando nuestra gestión de citas para reducir las demoras.
            Cualquier comentario adicional puedes enviárnoslo a [email]. Gracias
            por tu paciencia y confianza. — [Nombre], [Clínica]."
          </em>
        </p>
        <p>
          <strong>Caso 2 — Queja por precio del tratamiento:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], entendemos que el coste de ciertos tratamientos
            puede sorprender. En [Clínica] siempre informamos del presupuesto
            detallado antes de comenzar y ofrecemos opciones de financiación.
            Si en tu caso hubo alguna falta de claridad en la información
            previa, queremos saberlo: escríbenos a [email]. — [Nombre]."
          </em>
        </p>
        <p>
          <strong>Caso 3 — Queja por resultados del tratamiento:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], nos preocupa mucho leer que no estás satisfecho con
            el resultado de tu tratamiento. Tu salud y bienestar son nuestra
            prioridad absoluta. Te pedimos que te pongas en contacto con
            nosotros en [email] o [teléfono] para que podamos revisar tu caso
            personalmente y encontrar la mejor solución. — [Dr./Dra. Nombre]."
          </em>
        </p>

        <h2>Taller mecánico y automoción</h2>
        <p>
          Las quejas más habituales: precio de la reparación, tiempo de entrega,
          reparación no resuelta, trato al cliente y presupuestos que se
          disparan.
        </p>
        <p>
          <strong>Caso 1 — Queja por precio más alto del presupuesto:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], entendemos perfectamente la sorpresa cuando el coste
            final supera el estimado inicial. En mecánica, a veces aparecen
            piezas o daños adicionales que no son visibles hasta desmontar.
            Nuestra política es llamar siempre antes de proceder si hay cambios.
            Si en tu caso no fue así, es algo que queremos corregir. Escríbenos
            a [email] para que lo revisemos juntos. — [Nombre], [Taller]."
          </em>
        </p>
        <p>
          <strong>Caso 2 — El problema persiste tras la reparación:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], lamentamos que el problema no haya quedado resuelto.
            Eso nunca es aceptable para nosotros. Todos nuestros trabajos tienen
            garantía y queremos que tu vehículo quede perfectamente. Llámanos al
            [teléfono] o pásate por el taller para que lo revisemos sin coste.
            — [Nombre]."
          </em>
        </p>
        <p>
          <strong>Caso 3 — Queja por tiempo de entrega:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], tienes razón en estar molesto. El plazo de entrega
            se extendió más de lo prometido y eso te causó un inconveniente
            serio. Ha habido un problema con la disponibilidad de piezas que
            no supimos comunicarte a tiempo. Lo tenemos en cuenta para mejorar
            nuestra comunicación con los clientes. Gracias por decírnoslo.
            — [Nombre]."
          </em>
        </p>

        <h2>Hotel y alojamiento turístico</h2>
        <p>
          Las quejas más habituales: limpieza, ruido, temperatura, desayuno,
          actitud del personal y diferencia entre fotos y realidad.
        </p>
        <p>
          <strong>Caso 1 — Queja por limpieza de la habitación:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], la limpieza es un estándar innegociable para
            nosotros y lo que describes no refleja nuestro nivel habitual.
            Pedimos disculpas sinceras. Lo hemos trasladado a nuestro equipo de
            housekeeping para que no vuelva a ocurrir. Si tienes más detalles
            que quieras compartir, escríbenos a [email]. Esperamos que, a pesar
            de esto, nos des la oportunidad de recibirte de nuevo.
            — [Nombre], [Hotel]."
          </em>
        </p>
        <p>
          <strong>Caso 2 — Ruido y descanso afectado:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], sentimos mucho que el ruido afectara a tu descanso.
            Cuando hay incidencias de este tipo siempre intentamos ofrecer un
            cambio de habitación si está disponible. Si en tu caso no se ofreció
            esa opción, es algo que corregiremos en nuestros procedimientos.
            Gracias por tu comprensión y por escribirnos. — [Nombre]."
          </em>
        </p>
        <p>
          <strong>Caso 3 — Fotos no corresponden con la realidad:</strong>
        </p>
        <p>
          <em>
            "Hola [nombre], entendemos tu decepción cuando las expectativas no
            se corresponden con lo que encuentras al llegar. Estamos revisando
            las imágenes de nuestra ficha para que reflejen con exactitud el
            estado actual de las instalaciones. Tu comentario nos ayuda a ser
            más transparentes. — [Nombre]."
          </em>
        </p>

        <h2>5. Cómo gestionar los casos más difíciles</h2>

        <h2>Reseña falsa o de la competencia</h2>
        <p>
          Las reseñas falsas existen. Si sospechas que es de alguien que nunca
          fue cliente (o peor, de un competidor), hay dos acciones:
        </p>
        <ul>
          <li>
            <span>
              <strong>Reporta la reseña a Google</strong> (botón "Marcar como
              inapropiada"). No siempre funciona rápido, pero es necesario
              hacerlo.
            </span>
          </li>
          <li>
            <span>
              <strong>Responde de forma neutra y factual</strong>, sin atacar al
              autor. Tu respuesta la leen los clientes reales, no el que la
              escribió.
            </span>
          </li>
        </ul>
        <p>
          <em>
            "Hola [nombre], hemos revisado nuestros registros y no encontramos
            ninguna visita o pedido a tu nombre en las fechas que mencionas.
            Nos gustaría entender qué ocurrió: escríbenos a [email] con más
            detalles para que podamos investigarlo. — [Nombre]."
          </em>
        </p>

        <h2>Reseña agresiva u ofensiva</h2>
        <p>
          Mantén la calma y el tono profesional. El resto de los lectores juzga
          quién es más razonable. Si incluye insultos o lenguaje inapropiado,
          reporta la reseña a Google además de responder.
        </p>
        <p>
          <em>
            "Hola [nombre], lamentamos que tu experiencia haya generado tanta
            frustración. Queremos entender qué ocurrió y buscar una solución.
            Te invitamos a contactarnos en privado en [email] para tratarlo con
            la atención que merece. — [Nombre]."
          </em>
        </p>

        <h2>Reseña con datos incorrectos</h2>
        <p>
          Corrígela con datos, no con actitud. Nunca con sarcasmo.
        </p>
        <p>
          <em>
            "Hola [nombre], gracias por escribir. Queremos aclarar con
            respeto que [dato incorrecto]: en realidad [dato correcto]. Dicho
            esto, si hubo algún aspecto de tu visita que no estuvo a la altura,
            nos encantaría saberlo. Puedes escribirnos a [email]. — [Nombre]."
          </em>
        </p>

        <h2>Reseña sin texto (solo estrellas)</h2>
        <p>
          No la ignores. Una respuesta breve muestra que estás atento.
        </p>
        <p>
          <em>
            "Hola [nombre], sentimos que tu experiencia no haya sido la
            esperada. Si quieres contarnos qué ocurrió, estamos en [email].
            Nos ayudaría mucho para mejorar. — [Nombre]."
          </em>
        </p>

        <h2>6. Malas respuestas vs. buenas respuestas</h2>
        <p>
          Ver el contraste de forma directa es la forma más rápida de interiorizar
          qué funciona y qué no.
        </p>

        <p>
          <strong>Reseña:</strong>{" "}
          <em>"El servicio fue pésimo, esperé 40 minutos y nadie me atendió."</em>
        </p>

        <p>
          <strong>❌ Respuesta que arruina tu reputación:</strong>
          <br />
          <em>
            "Sentimos las molestias. A veces estamos muy ocupados. Gracias por
            tu opinión."
          </em>
          <br />
          <strong>Por qué falla:</strong> genérica, sin empatía real, sin solución,
          no menciona el problema concreto, no da ningún siguiente paso.
        </p>

        <p>
          <strong>✅ Respuesta que genera confianza:</strong>
          <br />
          <em>
            "Hola [nombre], 40 minutos de espera sin atención es inaceptable y
            lo entendemos perfectamente. Lo hemos trasladado al equipo para
            identificar qué falló ese día. Nos gustaría compensarte: escríbenos
            a [email] y lo arreglamos. Gracias por la honestidad. — [Nombre]."
          </em>
          <br />
          <strong>Por qué funciona:</strong> reconoce el problema exacto, valida
          la emoción del cliente, muestra acción concreta, ofrece solución y firma
          con nombre real.
        </p>

        <h2>7. Después de la respuesta: el paso que nadie da</h2>
        <p>
          Responder es el primer paso, pero hay uno más que multiplica el
          impacto: <strong>hacer un seguimiento</strong>.
        </p>
        <ul>
          <li>
            <span>
              Si resolviste el problema del cliente por privado, pídele (con
              educación) que considere actualizar su reseña. No lo exijas ni lo
              incentives económicamente (va contra las normas de Google).
            </span>
          </li>
          <li>
            <span>
              Un simple "hemos solucionado el problema que mencionaste, ¿pudiste
              probarlo?" por email puede convertir una 2★ en una 4★.
            </span>
          </li>
          <li>
            <span>
              Usa la queja como input real para mejorar: si tres personas se
              quejan del mismo problema, es una prioridad operativa, no solo de
              comunicación.
            </span>
          </li>
        </ul>

        <h2>8. Lo que nunca debes hacer</h2>
        <ul>
          <li><span>Discutir o ponerte a la defensiva en público.</span></li>
          <li>
            <span>
              Copiar y pegar la misma respuesta genérica: Google y los clientes
              lo detectan al instante.
            </span>
          </li>
          <li>
            <span>
              Pedir que borren la reseña directamente (viola las normas de Google).
            </span>
          </li>
          <li>
            <span>
              Ignorarla: el silencio comunica que no te importa.
            </span>
          </li>
          <li>
            <span>
              Ofrecer compensación económica públicamente a cambio de cambiar la
              reseña (va contra las políticas de Google y puede tener
              consecuencias legales).
            </span>
          </li>
          <li>
            <span>
              Usar el nombre de tu empresa o keywords en la respuesta de forma
              forzada (parece spam y queda fatal).
            </span>
          </li>
        </ul>

        <h2>9. Cómo escalar el sistema cuando tienes muchas reseñas</h2>
        <p>
          Con 5 reseñas al mes, todo esto es manejable a mano. Con 50, necesitas
          un sistema:
        </p>
        <ul>
          <li>
            <span>
              <strong>Alertas automáticas:</strong> recibe una notificación
              inmediata cada vez que llega una reseña nueva (y especialmente las
              negativas). Sin alertas, descubres las reseñas días después.
            </span>
          </li>
          <li>
            <span>
              <strong>Plantillas por categoría:</strong> ten preparadas versiones
              base para las 4-5 quejas más habituales en tu sector. Personalízalas,
              pero no empieces de cero cada vez.
            </span>
          </li>
          <li>
            <span>
              <strong>Asigna un responsable:</strong> define quién responde y en
              qué plazo. Sin responsable claro, no hay consistencia.
            </span>
          </li>
          <li>
            <span>
              <strong>Mide tu tasa de respuesta:</strong> Google te la muestra en
              tu panel de empresa. El objetivo es estar por encima del 90%.
            </span>
          </li>
        </ul>

        <h2>Detecta las negativas antes que nadie</h2>
        <p>
          El problema de responder rápido es <strong>enterarte a tiempo</strong>.
          La mayoría de negocios descubre una reseña negativa días después, cuando
          ya ha influido en decenas de decisiones de compra.
        </p>
        <p>
          Con <strong>Repusense</strong> recibes una alerta por email en cuanto
          llega una reseña negativa, con el texto completo y el análisis de
          sentimiento, para que respondas antes de que haga daño. Y si tienes el
          plan Business, la IA te sugiere directamente el borrador de respuesta.{" "}
          <a href="/analisis-gratis">Analiza tu reputación gratis</a> y empieza
          a monitorizar hoy.
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
          <a href="/blog/como-responder-resena-negativa">guía completa para responder reseñas negativas</a>.
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
