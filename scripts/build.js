// Genera el sitio estático en dist/ para Cloudflare (Workers static assets).
// Uso: npm run build
const fs = require('fs');
const path = require('path');
const { buildPages } = require('../src/views');
const { site } = require('../src/data');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

const { pages, notFound } = buildPages();
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

for (const [route, html] of Object.entries(pages)) {
  write(path.join(dist, route, 'index.html'), html);
}
write(path.join(dist, '404.html'), notFound);
write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages)
    .map((p) => `<url><loc>${site.url}${p === '/' ? '' : p}</loc></url>`)
    .join('')}</urlset>`
);
write(
  path.join(dist, '_headers'),
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/img/*\n  Cache-Control: public, max-age=2592000, immutable\n`
);

console.log(`Sitio generado en dist/ (${Object.keys(pages).length} páginas)`);
