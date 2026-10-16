# Genera imágenes WebP optimizadas en public/img a partir de assets/ (originales fuera del repo).
# Uso: python scripts/optimize-images.py   (requiere Pillow)
import os
from PIL import Image, ImageOps, ImageDraw

SRC, OUT = 'assets', 'public/img'
os.makedirs(OUT, exist_ok=True)

PRODUCTS = {
    'vestido-alba-cielo': ['IMG_3254.jpg', 'IMG_3259.jpg'],
    'vestido-alba-durazno': ['IMG_3289.jpg', 'IMG_3290.jpg'],
    'vestido-alba-chocolate': ['IMG_3312.jpg', 'IMG_3323.JPG'],
    'set-tiana-gris': ['IMG_3650.JPG', 'IMG_3645.JPG', 'IMG_3659.JPG', 'IMG_3660.JPG'],
    'set-tiana-rosa': ['IMG_3651.JPG', 'IMG_3653.JPG'],
}
SOCIAL = ['postinstagram1.PNG', 'post_instagram.PNG', 'postinstagram2.PNG', 'postinstagram3.PNG', 'postinstagram4.PNG']

def load(f):
    return ImageOps.exif_transpose(Image.open(os.path.join(SRC, f))).convert('RGB')

def save(im, name, width, q=78):
    im = im.copy()
    im.thumbnail((width, width * 3))
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=q, method=6)

for base, files in PRODUCTS.items():
    for i, f in enumerate(files, 1):
        im = load(f)
        for w in (640, 1200):
            save(im, f'{base}-{i}-{w}', w)

for i, f in enumerate(SOCIAL, 1):
    im = load(f)
    save(im, f'social-{i}-720', 720)
    save(im, f'social-{i}-1400', 1400)

# Logo: recorte del medallón -> favicon / apple touch / logo
logo = load('logo.jpg')
w, h = logo.size
s, cx, cy = int(w * 0.82), w // 2, int(h * 0.475)
box = (cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2)
medal = logo.crop(box)
mask = Image.new('L', medal.size, 0)
ImageDraw.Draw(mask).ellipse((2, 2, medal.size[0] - 2, medal.size[1] - 2), fill=255)
rgba = medal.convert('RGBA'); rgba.putalpha(mask)
for size, name in ((32, 'favicon-32.png'), (192, 'icon-192.png'), (512, 'icon-512.png')):
    rgba.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name))
medal.resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon.png'))
rgba.resize((320, 320), Image.LANCZOS).save(os.path.join(OUT, 'logo-medallon.webp'), 'WEBP', quality=88)

# Open Graph 1200x630
og = Image.new('RGB', (1200, 630), '#E9E0D4')
sq = load(SOCIAL[0]); sq.thumbnail((630, 630)); og.paste(sq, (570, 0))
m = rgba.resize((300, 300), Image.LANCZOS); og.paste(m, (135, 165), m)
og.save(os.path.join(OUT, 'og-citadina.jpg'), quality=85)
print('ok')
