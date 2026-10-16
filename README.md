# citadina.store

Sitio oficial de **CITADINA**. Sitio estático generado con Node.js (sin base de datos). Se publica en **Cloudflare Workers** (static assets); `app.js` (Express) queda para desarrollo local o un hosting Node.

## Estructura

```
app.js              Servidor Express (punto de entrada)
src/data.js         ← Contenido editable: contacto, productos, precios, tallas, reseñas
src/policies.js     Textos de envíos, cambios, privacidad y términos
src/views.js        Plantillas HTML
public/             CSS, JS e imágenes optimizadas (WebP)
scripts/optimize-images.py   Regenera public/img desde assets/ (Pillow)
```

## Local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Editar contenido

- **WhatsApp**: define la variable de entorno `WHATSAPP_NUMBER` (ej. `573001234567`) o edita `site.whatsapp` (actual: 573054139389) en `src/data.js`. Si se vacía, los botones de compra abren Instagram Direct.
- **Productos**: edita `products` en `src/data.js`. Para fotos nuevas, ponlas en `assets/`, regístralas en `scripts/optimize-images.py` y ejecuta `python scripts/optimize-images.py`.
- **Reseñas**: agrega reseñas reales en `testimonials` y la sección aparece en el inicio.

## Despliegue en Cloudflare

`wrangler.jsonc` ejecuta `npm run build` (genera `dist/`) y publica esa carpeta. En Cloudflare → Workers → el proyecto conectado a GitHub:

- Build command: *(vacío)* · Deploy command: `npx wrangler deploy`
- Cada `git push` a `main` despliega automáticamente.
- Dominio: Settings → Domains & Routes → *Add custom domain* → `citadina.store` (y `www.citadina.store`).

Probar el build en local: `npm run build` y abrir `dist/`, o `npx wrangler dev`.
