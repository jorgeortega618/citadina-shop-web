const { site, nav, categories, products, sizeGuide, testimonials } = require('./data');
const policies = require('./policies');

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const money = (n) => '$' + n.toLocaleString('es-CO', { maximumFractionDigits: 0 }).replace(/,/g, '.');
const year = new Date().getFullYear();

const igUrl = `https://instagram.com/${site.instagram}`;
const buyLabel = site.whatsapp ? 'Comprar por WhatsApp' : 'Pedir por Instagram';
const chatHref = (msg) =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}` : `https://ig.me/m/${site.instagram}`;

// Iconos de línea fina
const icon = (name) => {
  const p = {
    menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    chat: '<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/>',
    truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="2.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
  }[name];
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
};

// Imagen responsive (WebP 640/1200, proporción vertical de origen)
const picture = (base, alt, { sizes = '(min-width: 1024px) 25vw, 50vw', eager = false, cls = '' } = {}) =>
  `<img class="${cls}" src="/img/${base}-640.webp" srcset="/img/${base}-640.webp 640w, /img/${base}-1200.webp 1200w" sizes="${sizes}" width="640" height="1120" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const square = (n, alt, sizes = '(min-width: 1024px) 25vw, 50vw') =>
  `<img src="/img/social-${n}-720.webp" srcset="/img/social-${n}-720.webp 720w, /img/social-${n}-1400.webp 1400w" sizes="${sizes}" width="720" height="720" alt="${esc(alt)}" loading="lazy" decoding="async">`;

function layout({ title, description = site.description, path = '/', body, jsonld, ogImage = '/img/og-citadina.jpg' }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} · Moda femenina elegante y versátil`;
  const canonical = site.url + path;
  const navLinks = nav
    .map((l) => `<li><a href="${l.href}"${l.href === path ? ' aria-current="page"' : ''}>${l.label}</a></li>`)
    .join('');
  return `<!doctype html>
<html lang="es-CO">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#FCFAF7">
${site.metaDomainVerification ? `<meta name="facebook-domain-verification" content="${esc(site.metaDomainVerification)}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta property="og:locale" content="es_CO">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/favicon-32.png" sizes="32x32">
<link rel="icon" href="/img/icon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap">
<link rel="stylesheet" href="/css/styles.css?v=1">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body data-wa="${site.whatsapp}" data-ig="${site.instagram}">
<a class="skip" href="#main">Saltar al contenido</a>
<div class="announce">${esc(site.announcement)}</div>
<header class="header" id="header">
  <div class="header__inner container">
    <button class="header__toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">${icon('menu')}</button>
    <a class="wordmark" href="/" aria-label="CITADINA, inicio">CITADINA</a>
    <nav class="nav" id="menu" aria-label="Principal">
      <button class="nav__close" aria-label="Cerrar menú">${icon('close')}</button>
      <ul>${navLinks}</ul>
      <a class="nav__ig" href="${igUrl}" target="_blank" rel="noopener">${icon('instagram')} @${site.instagram}</a>
    </nav>
    <a class="header__ig" href="${igUrl}" target="_blank" rel="noopener" aria-label="Instagram de CITADINA">${icon('instagram')}</a>
  </div>
</header>
<main id="main">
${body}
</main>
${trustBar()}
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="wordmark wordmark--light" href="/">CITADINA</a>
      <p class="footer__tag">${site.tagline}</p>
      <p class="footer__muted">${site.city}</p>
      <ul class="footer__legal">${site.identity.map(([k, v]) => `<li>${k}: ${esc(v)}</li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="eyebrow">Tienda</h2>
      <ul><li><a href="/coleccion">Novedades</a></li><li><a href="/coleccion/vestidos">Vestidos</a></li><li><a href="/coleccion/sets">Sets</a></li><li><a href="/nosotros">Nosotros</a></li></ul>
    </div>
    <div>
      <h2 class="eyebrow">Ayuda</h2>
      <ul><li><a href="/politicas/envios">Envíos</a></li><li><a href="/politicas/cambios">Cambios y devoluciones</a></li><li><a href="/politicas/privacidad">Privacidad</a></li><li><a href="/politicas/terminos">Términos</a></li></ul>
    </div>
    <div>
      <h2 class="eyebrow">Contacto</h2>
      <ul>
        <li><a href="${igUrl}" target="_blank" rel="noopener">Instagram</a></li>
        ${site.whatsapp ? `<li><a href="${chatHref('Hola, quiero más información.')}" target="_blank" rel="noopener">${site.phone} · WhatsApp</a></li>` : ''}
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li><a href="/contacto">Escríbenos</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer__bottom"><span>© ${year} CITADINA${site.legal.name ? ` · ${esc(site.legal.name)}` : ''}. Todos los derechos reservados.</span><a href="https://www.sic.gov.co" target="_blank" rel="noopener">Superintendencia de Industria y Comercio</a></div>
</footer>
<script src="/js/main.js?v=1" defer></script>
</body>
</html>`;
}

const trustBar = () => `
<section class="trust" aria-label="Beneficios de compra">
  <ul class="container trust__list">
    <li>${icon('truck')}<span><strong>Envíos nacionales</strong>A toda Colombia</span></li>
    <li>${icon('cash')}<span><strong>Contraentrega</strong>En Barranquilla</span></li>
    <li>${icon('heart')}<span><strong>Atención personalizada</strong>Te asesoramos en talla y tono</span></li>
    <li>${icon('swap')}<span><strong>Cambios</strong>Según nuestras <a href="/politicas/cambios">políticas</a></span></li>
  </ul>
</section>`;

// Una tarjeta por producto + tono
function productCard(p, c) {
  const href = `/productos/${p.slug}?tono=${c.id}`;
  const alt = `${p.name} en tono ${c.name.toLowerCase()}`;
  return `<article class="card reveal">
  <a href="${href}" class="card__media">
    ${picture(c.images[0], alt)}
    ${c.images[1] ? picture(c.images[1], '', { cls: 'card__alt' }) : ''}
    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
  </a>
  <div class="card__body">
    <h3 class="card__title"><a href="${href}">${p.name}</a></h3>
    <p class="card__meta"><span>${c.name}</span><span>${money(p.price)}</span></p>
    <ul class="swatches" aria-label="Tonos disponibles">${p.colors
      .map((x) => `<li><a href="/productos/${p.slug}?tono=${x.id}" class="swatch${x.id === c.id ? ' is-active' : ''}" style="--c:${x.hex}" title="${x.name}"><span class="sr">${x.name}</span></a></li>`)
      .join('')}</ul>
  </div>
</article>`;
}
const allCards = (list = products, max = Infinity) => list.flatMap((p) => p.colors.map((c) => productCard(p, c))).slice(0, max).join('');

const sectionHead = (eyebrow, title, link) => `
<div class="section-head">
  <div><p class="eyebrow">${eyebrow}</p><h2 class="h2">${title}</h2></div>
  ${link ? `<a class="link" href="${link.href}">${link.label} ${icon('arrow')}</a>` : ''}
</div>`;

function home() {
  const reviews = testimonials.length
    ? `<section class="section container"><p class="eyebrow center">Lo que dicen ellas</p>
       <div class="quotes">${testimonials.map((t) => `<figure class="reveal"><blockquote>“${esc(t.quote)}”</blockquote><figcaption>${esc(t.author)}</figcaption></figure>`).join('')}</div></section>`
    : '';
  const body = `
<section class="hero">
  <div class="hero__media">${picture('set-tiana-gris-1', 'Modelo con el Set Tiana en gris perla', { sizes: '(min-width: 1024px) 50vw, 100vw', eager: true })}</div>
  <div class="hero__content">
    <p class="eyebrow">Nueva colección</p>
    <h1 class="h1">Prendas que se quedan contigo.</h1>
    <p class="lead">Piezas pensadas para acompañarte más de una temporada.</p>
    <a class="btn" href="/coleccion">Ver novedades</a>
  </div>
</section>

<section class="section container">
  ${sectionHead('Recién llegado', 'Novedades', { href: '/coleccion', label: 'Ver todo' })}
  <div class="grid">${allCards(products, 4)}</div>
</section>

<section class="feature">
  <div class="feature__media reveal">${square(1, 'Vestido Larissa en azul cielo, durazno y chocolate', '(min-width: 1024px) 50vw, 100vw')}</div>
  <div class="feature__content reveal">
    <p class="eyebrow">Colección destacada · Vestido Larissa</p>
    <h2 class="h2">Tres tonos, una misma intención.</h2>
    <p>Azul cielo, durazno y chocolate. Un corte limpio que se siente especial y se lleva sin esfuerzo, del almuerzo a la cena.</p>
    <a class="btn btn--ghost" href="/productos/vestido-larissa">Descubrir el vestido</a>
  </div>
</section>

<section class="section editorial container reveal">
  <p class="eyebrow">CITADINA</p>
  <p class="editorial__quote">Nacimos para acompañar a mujeres que quieren vestirse bien sin complicarse.</p>
  <a class="link" href="/nosotros">Conoce nuestra historia ${icon('arrow')}</a>
</section>

<section class="styling">
  <div class="container styling__inner">
    <div class="styling__text reveal">
      <p class="eyebrow">Styling · Set Tiana</p>
      <h2 class="h2">Una pieza, mil planes.</h2>
      <p>Llévalo completo para un look relajado y pulido, o combina el top con jeans y el pantalón con una camiseta básica. Tú decides.</p>
      <a class="btn" href="/productos/set-tiana">Ver Set Tiana</a>
    </div>
    <div class="styling__pics">
      <a href="/productos/set-tiana?tono=gris" class="reveal">${picture('set-tiana-gris-3', 'Set Tiana gris perla', { sizes: '(min-width: 1024px) 25vw, 50vw' })}<span>Gris perla</span></a>
      <a href="/productos/set-tiana?tono=rosa" class="reveal">${picture('set-tiana-rosa-2', 'Set Tiana rosa palo', { sizes: '(min-width: 1024px) 25vw, 50vw' })}<span>Rosa palo</span></a>
    </div>
  </div>
</section>
${reviews}
<section class="section container">
  ${sectionHead('@' + site.instagram, 'Síguenos en Instagram', { href: igUrl, label: 'Ir a Instagram' })}
  <div class="insta">${[2, 3, 4, 5]
    .map((n) => `<a href="${igUrl}" target="_blank" rel="noopener" class="reveal">${square(n, 'Publicación de CITADINA en Instagram')}</a>`)
    .join('')}</div>
</section>`;
  return layout({
    path: '/',
    body,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'ClothingStore',
      name: site.name,
      url: site.url,
      logo: site.url + '/img/icon-512.png',
      image: site.url + '/img/og-citadina.jpg',
      email: site.email,
      ...(site.phone && { telephone: site.phone }),
      ...(site.legal.name && { legalName: site.legal.name }),
      ...(site.legal.taxId && { taxID: site.legal.taxId }),
      address: {
        '@type': 'PostalAddress',
        ...(site.legal.address && { streetAddress: site.legal.address }),
        addressLocality: 'Barranquilla',
        addressRegion: 'Atlántico',
        addressCountry: 'CO',
      },
      openingHours: 'Mo-Sa 09:00-18:00',
      sameAs: [igUrl, ...(site.whatsapp ? [`https://wa.me/${site.whatsapp}`] : [])],
    },
  });
}

function collection(cat) {
  const c = cat ? categories[cat] : { title: 'Novedades', intro: 'Toda la colección. Piezas versátiles para llevar una y otra vez.' };
  const list = cat ? products.filter((p) => p.category === cat) : products;
  const path = cat ? `/coleccion/${cat}` : '/coleccion';
  const tabs = [['Todo', '/coleccion'], ...Object.entries(categories).map(([k, v]) => [v.title, `/coleccion/${k}`])]
    .map(([l, h]) => `<a href="${h}" class="tab"${h === path ? ' aria-current="page"' : ''}>${l}</a>`)
    .join('');
  const body = `
<section class="page-head container">
  <p class="eyebrow">Colección</p>
  <h1 class="h1">${c.title}</h1>
  <p class="lead">${c.intro}</p>
  <nav class="tabs" aria-label="Categorías">${tabs}</nav>
</section>
<section class="container section section--tight"><div class="grid">${allCards(list)}</div></section>`;
  return layout({ title: c.title, description: `${c.title} CITADINA. ${c.intro}`, path, body });
}

function product(p) {
  const path = `/productos/${p.slug}`;
  const first = p.colors[0];
  const galleries = p.colors
    .map(
      (c, ci) => `<div class="gallery__set" data-color="${c.id}"${ci ? ' hidden' : ''}>${c.images
        .map((im, i) => `<figure>${picture(im, `${p.name} en ${c.name.toLowerCase()}, foto ${i + 1}`, { sizes: '(min-width: 1024px) 30vw, 85vw', eager: !ci && !i })}</figure>`)
        .join('')}</div>`
    )
    .join('');
  const colorOpts = p.colors
    .map((c, i) => `<label class="opt-color" title="${c.name}"><input type="radio" name="color" value="${c.id}" data-name="${c.name}"${i ? '' : ' checked'}><span class="swatch" style="--c:${c.hex}"></span><span class="sr">${c.name}</span></label>`)
    .join('');
  const sizeOpts = p.sizes.map((s) => `<label class="opt-size"><input type="radio" name="size" value="${s}"><span>${s}</span></label>`).join('');
  const msg = `Hola 👋 Me interesa el ${p.name} en talla ___ y tono ${first.name}.`;
  const guide = `<table><thead><tr>${sizeGuide.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${sizeGuide.rows
    .map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;
  const others = products.filter((x) => x !== p);
  const body = `
<nav class="crumbs container" aria-label="Ruta"><a href="/">Inicio</a> / <a href="/coleccion/${p.category}">${categories[p.category].title}</a> / <span>${p.name}</span></nav>
<section class="pdp container" data-product="${esc(p.name)}">
  <div class="gallery">${galleries}</div>
  <div class="pdp__info">
    ${p.badge ? `<p class="eyebrow">${p.badge}</p>` : ''}
    <h1 class="h1 pdp__title">${p.name}</h1>
    <p class="pdp__price">${money(p.price)} <small>COP</small></p>
    <p class="pdp__short">${p.short}</p>
    <fieldset class="opts">
      <legend>Tono: <span data-color-label>${first.name}</span></legend>
      <div class="opts__row">${colorOpts}</div>
    </fieldset>
    <fieldset class="opts">
      <legend>Talla <button type="button" class="link link--small" data-open-guide>Ver guía de medidas</button></legend>
      <div class="opts__row">${sizeOpts}</div>
    </fieldset>
    <p class="stock"><span class="dot" aria-hidden="true"></span> Disponible · Confirmamos existencias al instante</p>
    <a class="btn btn--block" data-buy href="${chatHref(msg)}" target="_blank" rel="noopener">${icon('chat')} ${buyLabel}</a>
    <a class="btn btn--ghost btn--block" href="${chatHref(`Hola 👋 ¿Tienen disponible el ${p.name}?`)}" target="_blank" rel="noopener">Consultar disponibilidad</a>
    <ul class="pdp__ship">
      <li>${icon('truck')} Envíos a toda Colombia · Contraentrega en Barranquilla</li>
      <li>${icon('cash')} Transferencia, pagos digitales o contraentrega</li>
    </ul>
    <div class="acc">
      <details open><summary>Descripción</summary><p>${p.description}</p></details>
      <details><summary>Material y cuidados</summary><p>${p.material}</p><p>${p.care}</p></details>
      <details><summary>Guía de tallas</summary>${guide}<p class="muted">Medidas corporales en centímetros. ¿Dudas? Te asesoramos.</p></details>
      <details><summary>Envíos y cambios</summary><p>Despachamos en 1 a 2 días hábiles. Cambios dentro de los 5 días hábiles siguientes a la entrega. <a href="/politicas/envios">Envíos</a> · <a href="/politicas/cambios">Cambios</a></p></details>
    </div>
  </div>
</section>
<div class="sticky-buy" aria-hidden="true"><span>${p.name} · ${money(p.price)}</span><a class="btn" data-buy href="${chatHref(msg)}" target="_blank" rel="noopener" tabindex="-1">${site.whatsapp ? 'Comprar' : 'Pedir'}</a></div>
<dialog class="guide" id="size-guide" aria-labelledby="guide-title">
  <button class="guide__close" aria-label="Cerrar" data-close-guide>${icon('close')}</button>
  <h2 class="h2" id="guide-title">Guía de medidas</h2>${guide}
  <p class="muted">Medidas corporales en centímetros. Si estás entre dos tallas, elige la mayor para un calce más relajado.</p>
</dialog>
${others.length ? `<section class="section container">${sectionHead('Completa tu look', 'También te puede gustar')}<div class="grid">${allCards(others)}</div></section>` : ''}`;
  return layout({
    title: p.name,
    description: `${p.name} de CITADINA. ${p.short}`,
    path,
    body,
    ogImage: `/img/${first.images[0]}-1200.webp`,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description,
      brand: { '@type': 'Brand', name: site.name },
      image: p.colors.flatMap((c) => c.images.map((i) => `${site.url}/img/${i}-1200.webp`)),
      color: p.colors.map((c) => c.name).join(', '),
      offers: { '@type': 'Offer', priceCurrency: 'COP', price: p.price, availability: 'https://schema.org/InStock', url: site.url + path },
    },
  });
}

function about() {
  const body = `
<section class="about container">
  <div class="about__media reveal">${picture('vestido-larissa-chocolate-2', 'Modelo con el Vestido Larissa en chocolate', { sizes: '(min-width: 1024px) 40vw, 100vw', eager: true })}</div>
  <div class="about__text">
    <p class="eyebrow">Nosotros</p>
    <h1 class="h1">Hecho para acompañarte.</h1>
    <p class="lead">CITADINA nace para acompañar a mujeres que quieren vestirse bien sin complicarse.</p>
    <p>Seleccionamos cada pieza pensando en tu día a día: prendas versátiles, de buena calidad y con un estilo femenino actual, que puedas llevar en distintos planes y que permanezcan en tu armario más allá de una temporada.</p>
    <p>Trabajamos con talleres aliados y cuidamos cada detalle, desde el tejido hasta el acabado, para que lo que recibas se sienta especial desde el primer momento.</p>
    <ul class="values">
      <li><strong>Versatilidad</strong>Una pieza, mil planes.</li>
      <li><strong>Selección</strong>Pocas referencias, bien elegidas.</li>
      <li><strong>Calidad</strong>Tejidos y acabados cuidados.</li>
      <li><strong>Cercanía</strong>Atención personalizada, siempre.</li>
    </ul>
    <p class="about__sign">${site.tagline} · ${site.city}</p>
    <a class="btn" href="/coleccion">Ver la colección</a>
  </div>
</section>`;
  return layout({ title: 'Nosotros', description: 'Conoce CITADINA: moda femenina versátil, seleccionada con cuidado en Barranquilla, Colombia.', path: '/nosotros', body });
}

function contact() {
  const body = `
<section class="contact container">
  <div>
    <p class="eyebrow">Contacto</p>
    <h1 class="h1">Hablemos.</h1>
    <p class="lead">Te asesoramos en talla, tono y disponibilidad. Respondemos de lunes a sábado.</p>
    <ul class="contact__list">
      <li>${icon('instagram')}<a href="${igUrl}" target="_blank" rel="noopener">@${site.instagram}</a></li>
      ${site.whatsapp ? `<li>${icon('chat')}<a href="${chatHref('Hola, quiero más información.')}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}
      <li>${icon('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
      <li>${icon('pin')}<span>${site.legal.address ? `${esc(site.legal.address)}, ` : ''}${site.city}</span></li>
    </ul>
    <p class="contact__hours">${site.legal.hours}</p>
    ${site.legal.name ? `<p class="contact__hours">${esc(site.legal.name)}${site.legal.taxId ? ` · NIT ${esc(site.legal.taxId)}` : ''}</p>` : ''}
  </div>
  <form class="form" data-contact action="mailto:${site.email}" method="post" enctype="text/plain">
    <label>Nombre<input name="nombre" autocomplete="name" required></label>
    <label>Correo o teléfono<input name="contacto" autocomplete="email" required></label>
    <label>Mensaje<textarea name="mensaje" rows="5" required></textarea></label>
    <button class="btn" type="submit">Enviar mensaje</button>
    <p class="muted">Al enviar aceptas nuestra <a href="/politicas/privacidad">política de privacidad</a>.</p>
  </form>
</section>`;
  return layout({ title: 'Contacto', description: 'Escríbenos: atención personalizada en talla, tono y disponibilidad. CITADINA, Barranquilla.', path: '/contacto', body });
}

function policy(slug) {
  const p = policies[slug];
  const links = Object.entries(policies)
    .map(([k, v]) => `<a href="/politicas/${k}" class="tab"${k === slug ? ' aria-current="page"' : ''}>${v.title}</a>`)
    .join('');
  const body = `
<section class="page-head container"><p class="eyebrow">Políticas</p><h1 class="h1">${p.title}</h1><nav class="tabs" aria-label="Políticas">${links}</nav></section>
<article class="prose container">${p.body}<p class="muted">Última actualización: ${new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}.</p></article>`;
  return layout({ title: p.title, description: `${p.title} de CITADINA.`, path: `/politicas/${slug}`, body });
}

const notFound = () =>
  layout({
    title: 'Página no encontrada',
    path: '/404',
    body: `<section class="page-head container center"><p class="eyebrow">404</p><h1 class="h1">Esta página no está disponible.</h1><p class="lead">Te invitamos a descubrir la colección.</p><a class="btn" href="/coleccion">Ver novedades</a></section>`,
  });

// Renderiza todas las páginas una sola vez al arrancar
function buildPages() {
  const pages = {
    '/': home(),
    '/coleccion': collection(),
    '/nosotros': about(),
    '/contacto': contact(),
  };
  Object.keys(categories).forEach((c) => (pages[`/coleccion/${c}`] = collection(c)));
  products.forEach((p) => (pages[`/productos/${p.slug}`] = product(p)));
  Object.keys(policies).forEach((k) => (pages[`/politicas/${k}`] = policy(k)));
  return { pages, notFound: notFound() };
}

module.exports = { buildPages };
