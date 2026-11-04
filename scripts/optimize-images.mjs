// Converts every original in media-src/images/ into AVIF, WebP and JPEG at 480, 768, 1200 and 1800px.
// Output names match src/lib/images.ts: <name>-<width>.<ext>.
import { readdirSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, parse } from 'node:path'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'media-src', 'images')
const OUT = join(ROOT, 'public', 'images')
const WIDTHS = [480, 768, 1200, 1800]

mkdirSync(OUT, { recursive: true })
const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
let count = 0
for (const file of files) {
  const { name } = parse(file)
  for (const width of WIDTHS) {
    const base = sharp(join(SRC, file)).resize({ width, withoutEnlargement: true })
    await base.clone().avif({ quality: 52, effort: 4 }).toFile(join(OUT, `${name}-${width}.avif`))
    await base.clone().webp({ quality: 78 }).toFile(join(OUT, `${name}-${width}.webp`))
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(join(OUT, `${name}-${width}.jpg`))
    count += 3
  }
}
console.log(`Optimised ${files.length} originals into ${count} files`)
