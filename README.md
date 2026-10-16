# citanida.shop

Sitio oficial de **CITADINA**. Node.js + Express, páginas renderizadas en el servidor al arrancar (sin build, sin base de datos).

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

## Despliegue en GoDaddy (cPanel → Setup Node.js App)

1. cPanel → **Git™ Version Control** → *Create* → clonar `https://github.com/jorgeortega618/citadina-shop-web.git` en p. ej. `/home/USUARIO/citadina-shop-web`.
2. cPanel → **Setup Node.js App** → *Create Application*:
   - Node.js version: 18 o superior
   - Application mode: Production
   - Application root: `citadina-shop-web`
   - Application URL: `citanida.shop`
   - Application startup file: `app.js`
   - Variable de entorno opcional: `WHATSAPP_NUMBER`
3. *Run NPM Install* y luego *Restart*.
4. cPanel → **Domains** → activar *Force HTTPS Redirect* para citanida.shop (SSL AutoSSL activo).
5. Para actualizar: `git push` a GitHub → cPanel Git → *Update from Remote* → *Restart* en Setup Node.js App.
