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

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "mejores-herramientas-gestion-resenas-agencias",
    title: "Las mejores herramientas de gestión de reseñas para agencias (2026)",
    description:
      "Comparativa de las mejores plataformas para gestionar reseñas de múltiples clientes desde una sola herramienta: BrightLocal, Vendasta, Podium, Grade.us y Repusense. Criterios, precios y cuál elegir según el tamaño de tu agencia.",
    date: "2026-06-18",
    readingTime: "12 min",
    body: (
      <>
        <p>
          Gestionar la reputación online de un cliente ya es suficientemente
          complejo. Hacerlo para 10, 20 o 50 clientes simultáneamente —
          con plataformas distintas, fichas distintas y expectativas distintas —
          es otro nivel. Sin la herramienta adecuada, se convierte en un cuello de
          botella que impide crecer tu agencia sin contratar más personal.
        </p>
        <p>
          Esta guía compara las principales plataformas del mercado en 2026
          con criterios prácticos para agencias: precio por cliente gestionado,
          capacidad multi-cuenta, calidad de reportes y curva de aprendizaje.
        </p>

        <h2>Por qué las agencias necesitan una herramienta específica</h2>
        <p>
          Google My Business y las plataformas de reseñas están diseñadas para
          que el propio negocio gestione su cuenta. No están pensadas para que
          una tercera persona gestione decenas de cuentas simultáneamente.
          Las consecuencias sin una herramienta adecuada son siempre las mismas:
        </p>
        <ul>
          <li>
            <span>
              Decenas de pestañas abiertas: cada cliente, su propio acceso,
              su propio panel, sin visión global.
            </span>
          </li>
          <li>
            <span>
              Reportes manuales que consumen entre 2 y 4 horas por cliente al mes.
            </span>
          </li>
          <li>
            <span>
              Crisis de reputación detectadas tarde porque nadie monitoriza
              activamente las reseñas de todos los clientes.
            </span>
          </li>
          <li>
            <span>
              Imposibilidad de demostrar ROI: el cliente no ve datos comparativos
              de su reputación antes/después de trabajar contigo.
            </span>
          </li>
        </ul>
        <p>
          Una herramienta específica para agencias resuelve los cuatro problemas.
          La pregunta es cuál.
        </p>

        <h2>Criterios para evaluar una herramienta de reseñas para agencias</h2>
        <p>
          Antes de analizar las opciones, estos son los criterios que realmente
          importan cuando gestionas múltiples clientes:
        </p>
        <ul>
          <li>
            <span>
              <strong>Dashboard multi-cliente:</strong> ¿Puedes ver todos tus
              clientes en una sola vista sin cambiar de cuenta?
            </span>
          </li>
          <li>
            <span>
              <strong>Alertas automáticas:</strong> ¿Te avisa cuando un cliente
              recibe una reseña negativa sin que tengas que entrar a comprobarlo?
            </span>
          </li>
          <li>
            <span>
              <strong>Reportes exportables:</strong> ¿Genera informes PDF/CSV
              automáticos listos para enviar al cliente?
            </span>
          </li>
          <li>
            <span>
              <strong>Precio por cliente gestionado:</strong> El modelo de precios
              debe escalar razonablemente con el número de clientes.
            </span>
          </li>
          <li>
            <span>
              <strong>Integración con plataformas clave:</strong> Google, Yelp,
              TripAdvisor, Trustpilot. Cuantas más, mejor.
            </span>
          </li>
          <li>
            <span>
              <strong>Facilidad de onboarding:</strong> El tiempo que tardas en
              añadir un cliente nuevo determina tu eficiencia real.
            </span>
          </li>
        </ul>

        <h2>BrightLocal — La referencia del sector para Local SEO</h2>
        <p>
          BrightLocal es probablemente la herramienta más conocida entre agencias
          de marketing local en el mercado anglosajón. Su punto fuerte es la
          integración de reseñas con datos de Local SEO: citations, rankings
          locales y auditorías de presencia online.
        </p>
        <ul>
          <li>
            <span>
              <strong>Lo mejor:</strong> Herramienta de citation building, auditoría
              de NAP, integración con más de 80 plataformas de directorios.
            </span>
          </li>
          <li>
            <span>
              <strong>Limitaciones:</strong> Interfaz densa, curva de aprendizaje
              alta, precio que escala rápido por encima de 10 clientes.
              Principalmente orientada al mercado de habla inglesa.
            </span>
          </li>
          <li>
            <span>
              <strong>Precio orientativo:</strong> Desde ~29$/mes para un solo
              local hasta planes de agencia desde 49$/mes (4 clientes).
            </span>
          </li>
          <li>
            <span>
              <strong>Ideal para:</strong> Agencias con fuerte componente de
              Local SEO técnico que necesitan datos de citations y rankings.
            </span>
          </li>
        </ul>

        <h2>Vendasta — Suite completa para agencias de marketing</h2>
        <p>
          Vendasta no es solo una herramienta de reseñas: es una plataforma
          completa de marketing digital para agencias (social media, email,
          páginas web, CRM). La gestión de reputación es una de sus módulos.
        </p>
        <ul>
          <li>
            <span>
              <strong>Lo mejor:</strong> Suite all-in-one, white-label potente,
              marketplace de productos que puedes revender a clientes.
            </span>
          </li>
          <li>
            <span>
              <strong>Limitaciones:</strong> Precio elevado (desde 79$/mes con
              módulos básicos), complejidad alta, excesivo para agencias que
              solo necesitan gestión de reseñas.
            </span>
          </li>
          <li>
            <span>
              <strong>Ideal para:</strong> Agencias grandes que quieren centralizar
              todos sus servicios digitales en una sola plataforma.
            </span>
          </li>
        </ul>

        <h2>Podium — Fuerte en generación de reseñas y mensajería</h2>
        <p>
          Podium destaca en la generación activa de reseñas a través de SMS
          y mensajería directa. Si tu agencia necesita ayudar a clientes a
          conseguir más reseñas (no solo gestionarlas), Podium tiene un
          enfoque diferenciado.
        </p>
        <ul>
          <li>
            <span>
              <strong>Lo mejor:</strong> Flujos automatizados de solicitud de
              reseñas por SMS con altas tasas de conversión. Bandeja de entrada
              unificada para mensajes de clientes del negocio.
            </span>
          </li>
          <li>
            <span>
              <strong>Limitaciones:</strong> Precio elevado (300-500$/mes),
              orientado principalmente a EE.UU. El análisis de reseñas existentes
              es menos profundo que competidores especializados.
            </span>
          </li>
          <li>
            <span>
              <strong>Ideal para:</strong> Negocios que quieren automatizar la
              solicitud de reseñas a pacientes o clientes por SMS.
            </span>
          </li>
        </ul>

        <h2>Grade.us — Especializado en agencias, sin excesos</h2>
        <p>
          Grade.us (ahora Broadly en algunos mercados) está diseñado
          específicamente para agencias que gestionan reputación de múltiples
          clientes. Su modelo es más limpio y su precio más predecible que Vendasta.
        </p>
        <ul>
          <li>
            <span>
              <strong>Lo mejor:</strong> Modelo de precios claro por número de
              locales, white-label sólido, generación de reseñas automatizada.
            </span>
          </li>
          <li>
            <span>
              <strong>Limitaciones:</strong> Análisis de sentimiento con IA
              limitado, menos integraciones que BrightLocal, soporte orientado
              al mercado norteamericano.
            </span>
          </li>
          <li>
            <span>
              <strong>Ideal para:</strong> Agencias medianas que necesitan una
              herramienta de reseñas limpia y escalable, sin la complejidad
              de una suite completa.
            </span>
          </li>
        </ul>

        <h2>Repusense — Análisis de reseñas con IA para el mercado hispanohablante</h2>
        <p>
          Repusense está construido específicamente para negocios y agencias del
          mercado hispanohablante. Su diferencial frente a las herramientas
          anglosajona es el análisis de sentimiento en español con IA, la
          detección automática de temas y el dashboard multi-cliente pensado
          para la escala de las agencias locales.
        </p>
        <ul>
          <li>
            <span>
              <strong>Lo mejor:</strong> Análisis de sentimiento en español,
              inglés y otros idiomas. Dashboard multi-cliente unificado. Alertas
              en tiempo real. Respuestas sugeridas con IA adaptadas al tono de
              cada sector. Precio accesible para agencias pequeñas y medianas.
            </span>
          </li>
          <li>
            <span>
              <strong>Integraciones:</strong> Google Reviews, Yelp, TripAdvisor,
              Trustpilot. Importación CSV para plataformas adicionales.
            </span>
          </li>
          <li>
            <span>
              <strong>Precio:</strong> Plan Business desde 79€/mes con clientes
              ilimitados. Sin coste por cliente adicional.
            </span>
          </li>
          <li>
            <span>
              <strong>Ideal para:</strong> Agencias de marketing local en España
              y Latinoamérica que gestionan entre 3 y 50 clientes y necesitan
              análisis de IA en español.
            </span>
          </li>
        </ul>

        <h2>Tabla comparativa rápida</h2>
        <p>
          Resumen de los criterios más importantes para tomar la decisión:
        </p>
        <ul>
          <li>
            <span>
              <strong>BrightLocal:</strong> Local SEO completo, inglés, precio
              escalado, curva alta. Mejor para agencias SEO técnicas.
            </span>
          </li>
          <li>
            <span>
              <strong>Vendasta:</strong> All-in-one, white-label potente, caro,
              complejo. Mejor para agencias grandes y diversificadas.
            </span>
          </li>
          <li>
            <span>
              <strong>Podium:</strong> Generación de reseñas por SMS, caro,
              EE.UU. Mejor para clientes que quieren más reseñas activamente.
            </span>
          </li>
          <li>
            <span>
              <strong>Grade.us:</strong> Limpio, escalable, anglosajón. Mejor
              para agencias medianas sin necesidad de suite completa.
            </span>
          </li>
          <li>
            <span>
              <strong>Repusense:</strong> IA en español, multi-cliente, precio
              fijo. Mejor para agencias del mercado hispanohablante.
            </span>
          </li>
        </ul>

        <h2>Cómo elegir según el tamaño de tu agencia</h2>
        <p>
          La herramienta correcta depende de cuántos clientes gestionas y qué
          servicio ofreces exactamente:
        </p>
        <ul>
          <li>
            <span>
              <strong>1-5 clientes:</strong> Cualquier herramienta con plan de
              entrada funciona. Prioriza la facilidad de uso y el precio. Repusense
              con plan Pro o Business cubre este rango con margen.
            </span>
          </li>
          <li>
            <span>
              <strong>5-20 clientes:</strong> Aquí el dashboard multi-cliente y
              los reportes automáticos se vuelven críticos. Evalúa Grade.us o
              Repusense Business.
            </span>
          </li>
          <li>
            <span>
              <strong>+20 clientes:</strong> Necesitas un modelo de precios
              predecible, acceso por roles para tu equipo y automatización de
              reportes. Vendasta o Repusense con acuerdo de agencia.
            </span>
          </li>
        </ul>

        <h2>El coste real: precio de la herramienta vs. tiempo recuperado</h2>
        <p>
          La variable que más infravaloran las agencias al evaluar herramientas
          es el tiempo. Si preparas reportes de reputación manualmente y cada
          uno te cuesta 2,5 horas con 10 clientes, son 25 horas al mes —
          más de 3 jornadas completas. A 50€/hora, eso son 1.250€ de coste
          de oportunidad mensual, todos los meses.
        </p>
        <p>
          Una herramienta que genera esos reportes automáticamente y cuesta
          79€/mes te devuelve 1.171€ netos el primer mes. El ROI de la
          automatización no es discutible: la pregunta es solo cuánto tardas
          en implementarla.
        </p>
        <p>
          Si tu agencia gestiona reseñas para clientes en España o Latinoamérica,{" "}
          <a href="/para-agencias">Repusense para agencias</a> es el punto de partida
          más rápido.{" "}
          <a href="/register">Empieza gratis</a> y añade tus primeros clientes
          hoy mismo.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "como-mejorar-posicion-google-maps-negocio-local",
    title: "Cómo mejorar tu posición en Google Maps: guía práctica para negocios locales",
    description:
      "Aprende los factores que Google usa para posicionar negocios en Maps y el Local Pack. Optimización de Google My Business, gestión de reseñas, consistencia NAP y estrategias que funcionan en 2026.",
    date: "2026-06-19",
    readingTime: "10 min",
    body: (
      <>
        <p>
          Aparecer en los primeros resultados de Google Maps para búsquedas
          como "restaurante cerca de mí" o "dentista en Madrid" puede significar
          la diferencia entre un mes lleno o un mes vacío para un negocio local.
          El{" "}
          <strong>Local Pack</strong> — los tres negocios que aparecen en un mapa
          en la parte superior de los resultados — recibe el{" "}
          <strong>44% de los clics</strong> en búsquedas locales.
        </p>
        <p>
          Esta guía explica exactamente qué factores controla Google para
          posicionar negocios en Maps y qué puedes hacer hoy para mejorar tu
          posición — sin necesidad de conocimientos técnicos avanzados.
        </p>

        <h2>Los 3 factores de posicionamiento local de Google</h2>
        <p>
          Google lo dice explícitamente en su documentación: el Local Pack se
          ordena según tres factores principales. Entenderlos es el primer paso
          para optimizarlos.
        </p>
        <ul>
          <li>
            <span>
              <strong>Relevancia:</strong> ¿Cuánto coincide tu negocio con lo
              que el usuario busca? Si buscas "clínica dental urgencias" y tu
              ficha de Google no menciona urgencias en ningún sitio, difícilmente
              aparecerás.
            </span>
          </li>
          <li>
            <span>
              <strong>Distancia:</strong> ¿Qué tan cerca está tu negocio del
              usuario que busca (o de la ubicación que indica)? Este factor no
              puedes controlarlo directamente, pero sí puedes trabajar el área
              de servicio en tu ficha.
            </span>
          </li>
          <li>
            <span>
              <strong>Prominencia:</strong> ¿Cómo de reconocido es tu negocio
              online? Aquí entran las reseñas, los enlaces, las menciones y tu
              presencia general en Internet.
            </span>
          </li>
        </ul>
        <p>
          La mayoría de negocios se centran solo en la relevancia (rellenar la
          ficha) e ignoran la prominencia. Es exactamente donde está la oportunidad.
        </p>

        <h2>1. Optimiza tu ficha de Google My Business al 100%</h2>
        <p>
          Una ficha incompleta es una ficha invisible. Google prioriza los negocios
          que proporcionan información completa y actualizada. Esto incluye:
        </p>
        <ul>
          <li>
            <span>
              <strong>Nombre exacto del negocio</strong> (sin keywords de relleno:
              "Clínica Dental López" sí, "Clínica Dental López — El Mejor Dentista
              Madrid" no — Google penaliza el keyword stuffing en el nombre).
            </span>
          </li>
          <li>
            <span>
              <strong>Categoría principal y categorías secundarias.</strong> Elige
              la categoría principal más específica posible y añade todas las
              secundarias relevantes. Un restaurante puede añadir "Restaurante de
              cocina mediterránea", "Restaurante con terraza" y "Pizzería".
            </span>
          </li>
          <li>
            <span>
              <strong>Horario actualizado</strong> incluyendo festivos y horarios
              especiales. Las fichas con horario desactualizado pierden posiciones.
            </span>
          </li>
          <li>
            <span>
              <strong>Descripción de 750 caracteres</strong> con las palabras clave
              naturales de tu negocio. No es publicidad: describe exactamente qué
              haces, dónde y para quién.
            </span>
          </li>
          <li>
            <span>
              <strong>Fotos de calidad actualizadas.</strong> Los negocios con más
              fotos reciben un 42% más de solicitudes de ruta. Añade foto de
              exterior, interior, equipo y productos/servicios.
            </span>
          </li>
          <li>
            <span>
              <strong>Atributos específicos del sector.</strong> "Accesible para
              sillas de ruedas", "Wifi disponible", "Reservas aceptadas" — cada
              atributo relevante suma.
            </span>
          </li>
        </ul>

        <h2>2. Las reseñas son el factor de prominencia más potente</h2>
        <p>
          Las reseñas tienen un impacto directo y documentado en el posicionamiento
          en Google Maps. No es una teoría: Google lo confirma en su documentación
          de posicionamiento local. Estos son los mecanismos específicos:
        </p>
        <ul>
          <li>
            <span>
              <strong>Volumen total de reseñas:</strong> Más reseñas = más señales
              de prominencia. Un negocio con 200 reseñas suele superar a uno con
              20 aunque la nota sea similar.
            </span>
          </li>
          <li>
            <span>
              <strong>Valoración media:</strong> Google favorece negocios con alta
              valoración. Bajar de 4.0 estrellas tiene un impacto negativo
              significativo en el ranking.
            </span>
          </li>
          <li>
            <span>
              <strong>Frecuencia de nuevas reseñas:</strong> Un negocio que recibe
              reseñas regularmente envía señales de actividad. Un negocio sin
              reseñas nuevas en 6 meses puede perder posiciones.
            </span>
          </li>
          <li>
            <span>
              <strong>Tasa de respuesta:</strong> Google confirma que los negocios
              que responden a sus reseñas (positivas y negativas) reciben un
              trato favorable en el algoritmo local.
            </span>
          </li>
          <li>
            <span>
              <strong>Keywords en el texto de las reseñas:</strong> Cuando los
              clientes mencionan en sus reseñas lo que haces ("el mejor café
              de especialidad de Bilbao"), esas palabras se indexan y mejoran
              tu relevancia para esas búsquedas.
            </span>
          </li>
        </ul>

        <h2>3. Consistencia NAP en todos los directorios</h2>
        <p>
          NAP significa Name, Address, Phone (Nombre, Dirección, Teléfono). Google
          verifica la coherencia de estos datos en todos los sitios donde aparece
          tu negocio: Yelp, TripAdvisor, páginas amarillas, directorios sectoriales,
          tu propia web.
        </p>
        <p>
          Una dirección que en Google pone "Calle Mayor 14, 2ºA" y en Yelp pone
          "C/ Mayor 14" es técnicamente inconsistente. Google lo interpreta como
          señal de baja fiabilidad. Audita todos los sitios donde apareces y
          asegúrate de que el NAP sea <em>idéntico</em> en todos.
        </p>

        <h2>4. Google Posts: contenido fresco directamente en Maps</h2>
        <p>
          Los Google Posts son publicaciones que aparecen directamente en tu ficha
          de Google Maps. Pueden ser ofertas, novedades, eventos o productos.
          Publicar Posts con regularidad (mínimo una vez a la semana) envía
          señales de actividad a Google y da contexto adicional de relevancia.
        </p>
        <p>
          El impacto directo en el ranking es moderado, pero el efecto secundario
          es importante: los usuarios que llegan a tu ficha ven contenido
          actualizado, lo que mejora el CTR y el tiempo de interacción — señales
          que sí impactan el ranking.
        </p>

        <h2>5. Enlaza tu ficha con tu sitio web optimizado</h2>
        <p>
          Google cruza la información de tu ficha con tu sitio web. Asegúrate de:
        </p>
        <ul>
          <li>
            <span>
              La URL de tu web en Google My Business apunta a la página correcta
              (no a una landing genérica).
            </span>
          </li>
          <li>
            <span>
              Tu web incluye el NAP exacto, preferiblemente en el footer y en
              una página de contacto.
            </span>
          </li>
          <li>
            <span>
              Si tienes varias sedes, cada sede tiene su propia página con su
              propia dirección y número de teléfono — no una sola página genérica
              de "contacto".
            </span>
          </li>
        </ul>

        <h2>6. Preguntas y respuestas (Q&A) en la ficha</h2>
        <p>
          La sección de Preguntas y Respuestas de Google My Business es subestimada.
          Cualquier usuario puede hacer preguntas, y cualquier usuario puede
          responderlas — incluido tú. Proactivamente, puedes añadir las preguntas
          más frecuentes de tu negocio y responderlas tú mismo antes de que
          alguien más lo haga mal.
        </p>
        <p>
          Además, las palabras clave que aparecen en las Q&A contribuyen a la
          relevancia de tu ficha para esas búsquedas.
        </p>

        <h2>El factor que más descuidan los negocios: responder reseñas</h2>
        <p>
          De todos los factores listados, la respuesta a reseñas es el que más
          diferencia al negocio promedio del que aparece en el Top 3 de Maps.
          La razón: es relativamente fácil de hacer, pero la mayoría no lo hace.
        </p>
        <p>
          Responder a todas las reseñas — positivas y negativas — en menos de
          48 horas es la acción individual con mejor ratio esfuerzo/impacto para
          mejorar en Google Maps. Si el volumen de reseñas hace esto difícil,
          las herramientas de análisis con IA como{" "}
          <a href="/analisis-gratis">Repusense</a> pueden generar respuestas
          sugeridas en segundos, reduciendo el tiempo de respuesta sin perder
          calidad.
        </p>

        <h2>Plan de acción en 30 días</h2>
        <p>
          Si empiezas desde cero o llevas tiempo sin optimizar tu ficha, este
          es el orden de prioridades:
        </p>
        <ul>
          <li>
            <span>
              <strong>Semana 1:</strong> Completa tu ficha de Google My Business
              al 100% (nombre, categorías, horario, descripción, fotos, atributos).
            </span>
          </li>
          <li>
            <span>
              <strong>Semana 2:</strong> Audita la consistencia NAP en Yelp,
              TripAdvisor, páginas amarillas y tu web. Corrige todas las
              discrepancias.
            </span>
          </li>
          <li>
            <span>
              <strong>Semana 3:</strong> Responde a todas las reseñas que no
              tienen respuesta. Configura un sistema de alertas para responder
              a las nuevas en menos de 24 horas.
            </span>
          </li>
          <li>
            <span>
              <strong>Semana 4:</strong> Publica tu primer Google Post y añade
              las Q&A más frecuentes de tu negocio.
            </span>
          </li>
        </ul>
        <p>
          El posicionamiento en Maps no es inmediato: los cambios suelen tardar
          entre 2 y 8 semanas en reflejarse. La clave es la consistencia. Un{" "}
          <a href="/analisis-gratis">análisis gratuito de tu reputación</a> es
          el mejor diagnóstico para saber exactamente dónde empezar.
        </p>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gestion-reputacion-online-clinicas-dentales",
    title: "Gestión de la reputación online para clínicas dentales: guía completa",
    description:
      "Cómo gestionar las reseñas online de una clínica dental de forma profesional: dónde buscan los pacientes, cómo responder sin violar la privacidad, plantillas de respuesta y cómo conseguir más valoraciones positivas.",
    date: "2026-06-20",
    readingTime: "11 min",
    body: (
      <>
        <p>
          La odontología es uno de los sectores donde la reputación online tiene
          mayor impacto en la decisión de compra. El{" "}
          <strong>81% de los pacientes</strong> lee reseñas antes de elegir un
          dentista. Y a diferencia de elegir un restaurante, donde una mala
          experiencia tiene consecuencias limitadas, la elección de clínica dental
          implica confianza, dolor potencial y coste económico elevado.
        </p>
        <p>
          Esto significa que los pacientes son <em>extraordinariamente</em> exigentes
          con las valoraciones de clínicas dentales. Y significa también que una
          gestión activa de la reputación tiene un impacto directo y medible en
          el número de primeras visitas que recibe tu clínica cada mes.
        </p>

        <h2>Dónde buscan los pacientes antes de elegir clínica dental</h2>
        <p>
          El recorrido habitual del paciente antes de su primera cita:
        </p>
        <ul>
          <li>
            <span>
              <strong>Google Maps / Local Pack:</strong> La búsqueda "dentista en
              [ciudad]" muestra el Local Pack de Google con las clínicas más
              cercanas y valoradas. Es el primer filtro para la mayoría de pacientes.
            </span>
          </li>
          <li>
            <span>
              <strong>Google Reviews directamente:</strong> Una vez encontrada la
              clínica, el 90% de los pacientes lee las reseñas de Google. Son las
              más visibles y las que más pesan en la decisión.
            </span>
          </li>
          <li>
            <span>
              <strong>Doctoralia:</strong> La plataforma líder de reseñas médicas
              en España. Los pacientes que buscan específicamente especialistas
              (ortodoncistas, implantólogos) suelen consultar Doctoralia además
              de Google.
            </span>
          </li>
          <li>
            <span>
              <strong>Boca a boca digital:</strong> Grupos de Facebook locales,
              foros de comunidades y WhatsApp. No indexables en Google pero
              con alto impacto en la decisión final.
            </span>
          </li>
        </ul>
        <p>
          La prioridad de optimización es clara: Google primero, Doctoralia segundo,
          y una estrategia de monitorización para el resto.
        </p>

        <h2>Los tipos de reseñas negativas más comunes en clínicas dentales</h2>
        <p>
          Conocer los patrones de quejas del sector te permite anticiparte y
          responder con más eficacia. Los temas que más aparecen en reseñas
          negativas de clínicas dentales son:
        </p>
        <ul>
          <li>
            <span>
              <strong>Tiempo de espera:</strong> "Tenía cita a las 10 y me
              atendieron a las 11:15." Es la queja más frecuente y la más
              fácil de gestionar sistémicamente.
            </span>
          </li>
          <li>
            <span>
              <strong>Precio y transparencia:</strong> "No me informaron del
              coste total antes del tratamiento." La sorpresa económica genera
              las reseñas más duras.
            </span>
          </li>
          <li>
            <span>
              <strong>Trato del personal de recepción:</strong> A menudo más
              mencionado que la calidad clínica. La primera impresión, en persona
              o por teléfono, es crítica.
            </span>
          </li>
          <li>
            <span>
              <strong>Gestión del dolor o incomodidad:</strong> "Me dolió mucho
              y nadie me explicó qué esperar." La comunicación antes y después
              del tratamiento reduce este tipo de quejas.
            </span>
          </li>
          <li>
            <span>
              <strong>Seguimiento post-tratamiento:</strong> La ausencia de
              contacto tras un procedimiento invasivo genera sensación de abandono.
            </span>
          </li>
        </ul>
        <p>
          Identificar cuál de estos temas es el más frecuente en tu clínica
          te permite intervenir en la causa raíz, no solo en las reseñas.
        </p>

        <h2>El reto específico de responder reseñas en salud: privacidad del paciente</h2>
        <p>
          Las clínicas dentales tienen una restricción que no tienen otros negocios:
          la privacidad del paciente. Bajo el RGPD y la legislación sanitaria
          española, no puedes confirmar ni desmentir información clínica de un
          paciente en tu respuesta pública, incluso si la reseña contiene
          información errónea o difamatoria.
        </p>
        <p>
          Esto significa que la estructura de respuesta para una clínica dental
          es diferente a la de un restaurante o un hotel:
        </p>
        <ul>
          <li>
            <span>
              <strong>Nunca confirmes que esa persona es tu paciente,</strong>{" "}
              aunque lo sea. Una respuesta que empiece con "Hola María, lamentamos
              que tu tratamiento de implantes no..." ya está revelando datos
              protegidos.
            </span>
          </li>
          <li>
            <span>
              <strong>Nunca desmintas detalles clínicos en público.</strong>{" "}
              Si la reseña dice algo incorrecto sobre su tratamiento, no lo
              corrijas en la respuesta pública. Invita al diálogo privado.
            </span>
          </li>
          <li>
            <span>
              <strong>Usa formulaciones genéricas pero empáticas.</strong>{" "}
              "Nos preocupa que tu experiencia no haya sido la esperada. Nos
              gustaría poder hablar contigo para entender mejor lo ocurrido
              y encontrar una solución."
            </span>
          </li>
        </ul>

        <h2>Plantillas de respuesta para reseñas de clínica dental</h2>
        <p>
          Estas plantillas respetan la privacidad del paciente y mantienen un
          tono profesional y empático:
        </p>
        <ul>
          <li>
            <span>
              <strong>Reseña negativa sobre espera:</strong> "Lamentamos mucho
              que hayas tenido que esperar más de lo previsto. Los retrasos
              pueden ocurrir cuando un caso requiere más tiempo del esperado,
              aunque entendemos que eso no debería afectar tu experiencia.
              Estamos trabajando para mejorar nuestra puntualidad. Si quieres
              hablar con nosotros sobre tu visita, llámanos a [teléfono] y
              haremos todo lo posible para compensar el inconveniente."
            </span>
          </li>
          <li>
            <span>
              <strong>Reseña negativa sobre precio:</strong> "Agradecemos que
              compartas tu experiencia. La transparencia en presupuestos es
              fundamental para nosotros. Si en algún momento no recibiste toda
              la información que necesitabas sobre el coste del tratamiento,
              nos gustaría poder revisarlo contigo. Puedes contactarnos en
              [teléfono o email] y te atenderemos con mucho gusto."
            </span>
          </li>
          <li>
            <span>
              <strong>Reseña negativa sobre trato del equipo:</strong> "Nos
              apena leer esto. El trato a nuestros pacientes es nuestra
              prioridad y nos tomamos muy en serio cualquier comentario al
              respecto. Te invitamos a contactarnos directamente en [teléfono]
              para poder escucharte y, si es posible, mejorar tu experiencia
              con nosotros."
            </span>
          </li>
          <li>
            <span>
              <strong>Reseña positiva:</strong> "Muchas gracias por tus palabras,
              [nombre si aparece]. Para nosotros es muy importante que te hayas
              sentido bien atendido/a. Nos alegra contar con pacientes como tú.
              ¡Hasta la próxima visita!"
            </span>
          </li>
        </ul>

        <h2>Cómo conseguir más reseñas positivas sin violaciones éticas</h2>
        <p>
          La forma más eficaz de mejorar tu reputación no es solo gestionar las
          reseñas negativas — es conseguir que los pacientes satisfechos también
          escriban. El problema: los pacientes contentos raramente lo hacen
          espontáneamente.
        </p>
        <p>
          La solución es el momento y el canal adecuado. Pedir una reseña en
          el momento correcto multiplica la tasa de conversión:
        </p>
        <ul>
          <li>
            <span>
              <strong>Inmediatamente tras una experiencia positiva.</strong> El
              paciente sale de la clínica aliviado o satisfecho. Es el mejor
              momento. Un simple "Si has quedado contento, nos ayudaría mucho
              que dejaras una reseña en Google" funciona mejor que cualquier
              email posterior.
            </span>
          </li>
          <li>
            <span>
              <strong>SMS o WhatsApp de seguimiento 24-48h después.</strong>{" "}
              "¿Cómo te encuentras tras tu visita de ayer? Si todo fue bien,
              nos encantaría que lo compartieras en Google [enlace directo]."
              La tasa de respuesta a mensajes es significativamente mayor que
              al email.
            </span>
          </li>
          <li>
            <span>
              <strong>Un QR en recepción</strong> que lleve directamente a tu
              ficha de Google. El acceso inmediato reduce la fricción.
            </span>
          </li>
          <li>
            <span>
              <strong>Nunca ofrezcas incentivos a cambio de reseñas.</strong>{" "}
              Descuentos, regalos o cualquier compensación por reseñas positivas
              viola las políticas de Google y puede derivar en la eliminación
              de tu ficha.
            </span>
          </li>
        </ul>

        <h2>Sistema de monitorización para clínicas con poco tiempo</h2>
        <p>
          La mayoría de directores de clínica no tienen tiempo de revisar sus
          reseñas en Google, Doctoralia y otras plataformas cada día. La solución
          no es dedicar más tiempo — es automatizar el seguimiento.
        </p>
        <p>
          Un sistema básico incluye:
        </p>
        <ul>
          <li>
            <span>
              <strong>Alertas de email</strong> cuando llegue una reseña nueva
              (Google My Business permite configurarlas de forma nativa, aunque
              con retraso y sin análisis).
            </span>
          </li>
          <li>
            <span>
              <strong>Panel centralizado</strong> que agrupe todas las plataformas
              en un solo lugar, con análisis de temas para saber qué está
              generando las quejas (¿esperas? ¿precio? ¿trato?).
            </span>
          </li>
          <li>
            <span>
              <strong>Respuestas sugeridas con IA</strong> que respeten la
              privacidad del paciente y estén listas para revisar y publicar en
              segundos, no en minutos.
            </span>
          </li>
        </ul>
        <p>
          Repusense está diseñado para este flujo. Las respuestas que genera la
          IA para clínicas nunca revelan datos del paciente y mantienen el tono
          profesional que el sector requiere. El{" "}
          <a href="/analisis-gratis">análisis gratuito</a> te muestra en 30
          segundos cuál es la puntuación de reputación de tu clínica ahora mismo
          y qué áreas están generando más comentarios negativos.
        </p>

        <h2>El impacto medible de gestionar bien tu reputación</h2>
        <p>
          Los estudios del sector son consistentes: las clínicas dentales que
          responden activamente a sus reseñas y mantienen una valoración por
          encima de 4.5 estrellas en Google reciben entre un{" "}
          <strong>40% y un 70% más de primeras visitas</strong> desde búsquedas
          orgánicas que clínicas equivalentes con valoración entre 3.5 y 4.0.
        </p>
        <p>
          La diferencia de 0.5-1 estrella en Google puede representar, según el
          tamaño de la clínica, entre 5 y 20 pacientes nuevos al mes. A un ticket
          medio de primera visita de 80-150€, el impacto económico anual es
          significativo y cuantificable.
        </p>
        <p>
          La gestión de reputación no es un coste de marketing — es una inversión
          con retorno directo y medible. Y para las clínicas dentales, donde la
          confianza lo es todo, es la inversión con mejor ratio
          impacto/esfuerzo que existe.
        </p>
      </>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
