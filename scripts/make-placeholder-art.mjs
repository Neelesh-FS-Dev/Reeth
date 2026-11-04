// Generates the placeholder artwork used until real photography arrives.
// Each image is an abstract evening composition in the brand palette (arch, lamp glow, grain).
// Output: media-src/images/<name>.jpg at 1800x1200. Swap any file here for a real photo
// (same name) and run `pnpm images` to regenerate the derivatives.
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'media-src', 'images')
mkdirSync(OUT, { recursive: true })

const NAMES = [
  'hero', 'intro', 'about-teaser', 'about-hero', 'catering-hero', 'careers-hero', 'reels-hero', 'og-image',
  'highlight-nadru', 'highlight-belgaum', 'highlight-jaipuri', 'highlight-sour',
  'team-chef', 'team-bar', 'team-foh',
  ...Array.from({ length: 12 }, (_, i) => `gallery-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `menu-chakna-${i + 1}`),
  ...Array.from({ length: 6 }, (_, i) => `menu-main-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `menu-cocktail-${i + 1}`),
  ...Array.from({ length: 3 }, (_, i) => `menu-barbite-${i + 1}`),
  ...Array.from({ length: 3 }, (_, i) => `menu-dessert-${i + 1}`),
  'event-diwali', 'event-pork-table', 'event-saraswat', 'event-workshop', 'event-live-music', 'event-popup',
  ...Array.from({ length: 6 }, (_, i) => `event-past-${i + 1}`),
]

// Brand palettes: [background start, background end, lamp glow, arch tone]
const PALETTES = [
  ['#0F213F', '#1B3566', '#D9A441', '#B4532F'],
  ['#2A1B12', '#7A2E1A', '#D9A441', '#1B3566'],
  ['#1B3566', '#B4532F', '#F5EEE1', '#0F213F'],
  ['#0F213F', '#2A1B12', '#B4532F', '#D9A441'],
  ['#6E5F53', '#2A1B12', '#D9A441', '#F5EEE1'],
]

function hash(s) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return Math.abs(h)
}

function artwork(name) {
  const [c0, c1, glow, arch] = PALETTES[hash(name) % PALETTES.length]
  const W = 1800
  const H = 1200
  const archX = 300 + (hash(name) % 900)
  const archW = 520 + (hash(name + 'w') % 260)
  const archTop = 220 + (hash(name + 't') % 140)
  const r = archW / 2
  const cx = archX + r
  const cy = archTop + r
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/>
    </linearGradient>
    <radialGradient id="lamp" cx="${cx / W}" cy="${cy / H}" r="0.7">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#lamp)"/>
  <path d="M${archX} ${H} L${archX} ${cy} A${r} ${r} 0 0 1 ${archX + archW} ${cy} L${archX + archW} ${H} Z" fill="${arch}" opacity="0.32"/>
  <path d="M${archX + 28} ${H} L${archX + 28} ${cy} A${r - 28} ${r - 28} 0 0 1 ${archX + archW - 28} ${cy} L${archX + archW - 28} ${H}" fill="none" stroke="${glow}" stroke-width="2" opacity="0.55"/>
  <g fill="none" stroke="${glow}" stroke-width="1" opacity="0.28">
    <circle cx="${cx}" cy="${cy + 160}" r="180"/><circle cx="${cx}" cy="${cy + 160}" r="230"/><circle cx="${cx}" cy="${cy + 160}" r="280"/>
  </g>
  <g stroke="${glow}" stroke-width="1" opacity="0.18">
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" x2="${W}" y1="${H - 120 - i * 18}" y2="${H - 120 - i * 18}"/>`).join('')}
  </g>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.06"/>
</svg>`
}

for (const name of NAMES) {
  await sharp(Buffer.from(artwork(name))).jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`))
}
console.log(`Wrote ${NAMES.length} placeholder originals to media-src/images/`)
