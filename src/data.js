// Contenido editable del sitio. Precios, tallas, medidas y contactos son valores
// de referencia: ajústalos antes de publicar.

const site = {
  name: 'CITADINA',
  url: 'https://citadina.shop',
  tagline: 'Siempre contigo',
  description:
    'CITADINA: moda femenina elegante y versátil. Vestidos y sets pensados para acompañarte más de una temporada. Envíos a toda Colombia desde Barranquilla.',
  city: 'Barranquilla, Colombia',
  email: 'hola@citadina.shop',
  instagram: 'citadina.shop',
  // Número en formato internacional sin "+" ni espacios, p. ej. 573001234567.
  // Mientras esté vacío, los botones de compra abren Instagram Direct.
  whatsapp: process.env.WHATSAPP_NUMBER || '',
  announcement: 'Envíos a toda Colombia · Contraentrega en Barranquilla',
};

const nav = [
  { label: 'Novedades', href: '/coleccion' },
  { label: 'Vestidos', href: '/coleccion/vestidos' },
  { label: 'Sets', href: '/coleccion/sets' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

const categories = {
  vestidos: { title: 'Vestidos', intro: 'Siluetas limpias que resuelven el día y la noche.' },
  sets: { title: 'Sets', intro: 'Dos piezas que funcionan juntas o por separado.' },
};

const img = (base, n) => Array.from({ length: n }, (_, i) => `${base}-${i + 1}`);

const products = [
  {
    slug: 'vestido-larissa',
    name: 'Vestido Larissa',
    category: 'vestidos',
    price: 132900,
    badge: 'Nuevo',
    short: 'Un mini vestido de líneas puras que se adapta a cada plan. Fácil de llevar, difícil de olvidar.',
    description:
      'Corte recto con cuello redondo y espalda limpia. Una base versátil para llevar con sandalias de día o con accesorios dorados al caer la tarde. Tres tonos, una misma intención.',
    material: 'Tejido plano de caída suave con ligera elasticidad. Forro interno.',
    care: 'Lavar a mano o en ciclo delicado con agua fría. No usar blanqueador. Planchar a temperatura baja por el revés.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { id: 'cielo', name: 'Azul cielo', hex: '#A9C6E8', images: img('vestido-larissa-cielo', 2) },
      { id: 'durazno', name: 'Durazno', hex: '#EFA98A', images: img('vestido-larissa-durazno', 2) },
      { id: 'chocolate', name: 'Chocolate', hex: '#4A2C24', images: img('vestido-larissa-chocolate', 2) },
    ],
  },
  {
    slug: 'set-tiana',
    name: 'Set Tiana',
    category: 'sets',
    price: 198000,
    badge: 'Nuevo',
    short: 'Una silueta fresca y femenina pensada para llevar completa o combinar por separado.',
    description:
      'Top de tiras con fruncido central y pantalón amplio de tiro alto con cintura elástica y cordón. Ligero, cómodo y con movimiento: tu nueva fórmula para vestir bien sin pensarlo tanto.',
    material: 'Tejido liviano y transpirable con textura suave al tacto.',
    care: 'Lavar en ciclo delicado con agua fría. Secar a la sombra. Planchar a temperatura baja.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { id: 'gris', name: 'Gris perla', hex: '#C9CBC8', images: img('set-tiana-gris', 4) },
      { id: 'rosa', name: 'Rosa palo', hex: '#EBD3D3', images: img('set-tiana-rosa', 2) },
    ],
  },
];

// Medidas de referencia en centímetros.
const sizeGuide = {
  headers: ['Talla', 'Busto', 'Cintura', 'Cadera'],
  rows: [
    ['S', '84–88', '64–68', '90–94'],
    ['M', '88–92', '68–72', '94–98'],
    ['L', '92–98', '72–78', '98–104'],
  ],
};

// Agrega aquí reseñas reales de clientas (con su permiso). La sección se oculta si está vacía.
const testimonials = [
  // { quote: '...', author: 'Nombre, Ciudad' },
];

module.exports = { site, nav, categories, products, sizeGuide, testimonials };
