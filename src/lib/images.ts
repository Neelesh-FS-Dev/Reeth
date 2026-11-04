// Image manifest helpers. Originals live in public/images/originals/ and are converted by
// scripts/optimize-images.mjs into <name>-<width>.{avif,webp,jpg} for each width below.
export const IMAGE_WIDTHS = [480, 768, 1200, 1800] as const

export function imageUrl(name: string, width: number, ext: 'avif' | 'webp' | 'jpg'): string {
  return `/images/${name}-${width}.${ext}`
}

export function srcSet(name: string, ext: 'avif' | 'webp' | 'jpg'): string {
  return IMAGE_WIDTHS.map((w) => `${imageUrl(name, w, ext)} ${w}w`).join(', ')
}
