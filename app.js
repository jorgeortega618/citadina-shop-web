const path = require('path');
const express = require('express');
const compression = require('compression');
const { buildPages } = require('./src/views');
const { site } = require('./src/data');

const app = express();
const { pages, notFound } = buildPages();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(compression());

// Redirige www -> dominio raíz (HTTPS se fuerza desde el panel de GoDaddy/cPanel)
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://${host.replace(/^www\./, '')}${req.originalUrl}`);
  }
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '30d',
    setHeaders: (res, file) => file.endsWith('.html') && res.set('Cache-Control', 'no-cache'),
  })
);

app.get('/robots.txt', (req, res) => res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`));

app.get('/sitemap.xml', (req, res) => {
  const urls = Object.keys(pages).map((p) => `<url><loc>${site.url}${p === '/' ? '' : p}</loc></url>`).join('');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
});

app.get('*', (req, res) => {
  const key = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
  const html = pages[key];
  res.set('Cache-Control', 'public, max-age=300');
  if (html) return res.type('html').send(html);
  res.status(404).type('html').send(notFound);
});

app.listen(PORT, () => console.log(`CITADINA escuchando en http://localhost:${PORT}`));
