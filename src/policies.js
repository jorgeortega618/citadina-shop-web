// Textos legales base. Revísalos con tu asesor antes de publicar.
const { site } = require('./data');

module.exports = {
  envios: {
    title: 'Envíos',
    body: `
<p>Realizamos envíos a toda Colombia a través de transportadoras aliadas. Una vez confirmado tu pedido y el pago, lo despachamos en un plazo de 1 a 2 días hábiles.</p>
<h2>Tiempos de entrega</h2>
<ul>
  <li><strong>Barranquilla y área metropolitana:</strong> 1 a 2 días hábiles. Contraentrega disponible.</li>
  <li><strong>Ciudades principales:</strong> 2 a 4 días hábiles.</li>
  <li><strong>Otros municipios:</strong> 4 a 7 días hábiles.</li>
</ul>
<h2>Costos</h2>
<p>El valor del envío depende de la ciudad de destino y se informa antes de confirmar tu compra. Sin sorpresas.</p>
<h2>Seguimiento</h2>
<p>Al despachar tu pedido te compartimos el número de guía para que puedas seguirlo en todo momento.</p>`,
  },
  cambios: {
    title: 'Cambios y devoluciones',
    body: `
<p>Queremos que ames lo que compras. Si necesitas otra talla o tono, te acompañamos en el proceso.</p>
<h2>Cambios</h2>
<ul>
  <li>Puedes solicitar un cambio dentro de los 5 días hábiles siguientes a la entrega.</li>
  <li>La prenda debe estar sin uso, sin lavar, con etiquetas y en su empaque original.</li>
  <li>El cambio está sujeto a disponibilidad. Los costos de envío del cambio corren por cuenta de la clienta, salvo defectos de fabricación.</li>
  <li>Por higiene, no se aceptan cambios en prendas en promoción final ni accesorios.</li>
</ul>
<h2>Derecho de retracto</h2>
<p>De acuerdo con el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor), en compras a distancia puedes ejercer el derecho de retracto dentro de los 5 días hábiles siguientes a la entrega. La prenda debe devolverse en las mismas condiciones en que la recibiste; los costos de transporte de la devolución corren por tu cuenta y reintegramos el dinero en un plazo máximo de 30 días calendario.</p>
<h2>Garantía</h2>
<p>Si tu prenda presenta un defecto de fabricación, escríbenos con fotos dentro de los 30 días siguientes a la entrega y gestionaremos la reparación, el cambio o la devolución del dinero.</p>
<h2>¿Cómo solicitarlo?</h2>
<p>Escríbenos a <a href="mailto:${site.email}">${site.email}</a> o por nuestros canales de atención indicando tu número de pedido.</p>`,
  },
  privacidad: {
    title: 'Política de privacidad',
    body: `
<p>En CITADINA respetamos tu privacidad. Esta política describe cómo tratamos tus datos personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.</p>
<h2>Datos que recopilamos</h2>
<p>Nombre, teléfono, correo electrónico y dirección de entrega, únicamente cuando nos los compartes para gestionar un pedido o una consulta.</p>
<h2>Finalidad</h2>
<ul>
  <li>Procesar y entregar tus pedidos.</li>
  <li>Responder tus consultas y brindarte atención personalizada.</li>
  <li>Enviarte novedades, solo si nos autorizas expresamente.</li>
</ul>
<h2>Tus derechos</h2>
<p>Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos en cualquier momento escribiendo a <a href="mailto:${site.email}">${site.email}</a>.</p>
<h2>Seguridad</h2>
<p>No vendemos ni compartimos tus datos con terceros, salvo con las transportadoras necesarias para entregar tu pedido.</p>
<h2>Cookies</h2>
<p>Este sitio no utiliza cookies de seguimiento propias. Si en el futuro incorporamos herramientas de medición, actualizaremos esta política.</p>`,
  },
  terminos: {
    title: 'Términos y condiciones',
    body: `
<p>Al usar citadina.shop aceptas estos términos. Te invitamos a leerlos con atención.</p>
<h2>Productos y precios</h2>
<p>Los precios están expresados en pesos colombianos (COP) e incluyen IVA cuando aplique. Los colores pueden variar ligeramente según la pantalla. La disponibilidad se confirma al momento del pedido.</p>
<h2>Pedidos y pagos</h2>
<p>Los pedidos se gestionan a través de nuestros canales de atención. Aceptamos transferencia bancaria, pagos digitales y contraentrega en Barranquilla. El pedido se despacha una vez confirmado el pago, excepto en contraentrega.</p>
<h2>Envíos, cambios y devoluciones</h2>
<p>Consulta nuestras políticas de <a href="/politicas/envios">envíos</a> y <a href="/politicas/cambios">cambios y devoluciones</a>.</p>
<h2>Propiedad intelectual</h2>
<p>Las fotografías, textos y la marca CITADINA son de uso exclusivo de la marca y no pueden reproducirse sin autorización.</p>
<h2>Contacto</h2>
<p>${site.city} · <a href="mailto:${site.email}">${site.email}</a></p>`,
  },
};
