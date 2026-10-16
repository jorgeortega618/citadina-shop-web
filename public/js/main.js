(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const { wa, ig } = document.body.dataset;
  const chatHref = (msg) => (wa ? `https://wa.me/${wa}?text=${encodeURIComponent(msg)}` : `https://ig.me/m/${ig}`);

  // Header sticky
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  const nav = $('#menu');
  const toggle = $('.header__toggle');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    if (open) $('.nav__close').focus();
  };
  toggle.addEventListener('click', () => setMenu(true));
  $('.nav__close').addEventListener('click', () => { setMenu(false); toggle.focus(); });
  addEventListener('keydown', (e) => e.key === 'Escape' && nav.classList.contains('is-open') && setMenu(false));

  // Aparición suave
  const io = 'IntersectionObserver' in window && new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && (e.target.classList.add('is-in'), io.unobserve(e.target)));
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

  // Página de producto
  const pdp = $('.pdp');
  if (pdp) {
    const name = pdp.dataset.product;
    const buy = $$('[data-buy]');
    const update = () => {
      const color = $('input[name="color"]:checked', pdp);
      const size = $('input[name="size"]:checked', pdp);
      $$('.gallery__set', pdp).forEach((g) => (g.hidden = g.dataset.color !== color.value));
      $('[data-color-label]', pdp).textContent = color.dataset.name;
      const msg = `Hola 👋 Me interesa el ${name} en talla ${size ? size.value : '___'} y tono ${color.dataset.name}.`;
      buy.forEach((a) => (a.href = chatHref(msg)));
    };
    const tono = new URLSearchParams(location.search).get('tono');
    const pre = tono && $(`input[name="color"][value="${CSS.escape(tono)}"]`, pdp);
    if (pre) pre.checked = true;
    pdp.addEventListener('change', update);
    update();

    // Guía de medidas
    const dlg = $('#size-guide');
    $('[data-open-guide]').addEventListener('click', () => (dlg.showModal ? dlg.showModal() : $('.acc details:nth-child(3)').setAttribute('open', '')));
    $('[data-close-guide]').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());

    // CTA fijo en móvil cuando el botón principal sale de pantalla
    const sticky = $('.sticky-buy');
    if (io) new IntersectionObserver(([e]) => sticky.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(buy[0]);
  }

  // Formulario de contacto -> WhatsApp o correo
  const form = $('[data-contact]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const msg = `Hola, soy ${d.get('nombre')} (${d.get('contacto')}).\n\n${d.get('mensaje')}`;
      if (wa) window.open(chatHref(msg), '_blank', 'noopener');
      else location.href = `${form.action}?subject=${encodeURIComponent('Contacto desde citadina.store')}&body=${encodeURIComponent(msg)}`;
    });
  }
})();
