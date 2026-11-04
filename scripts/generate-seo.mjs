// Generates public/sitemap.xml from the route list. Run automatically before `pnpm build`.
// Keep the list in sync with src/app/App.tsx and src/lib/seo.ts.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE_URL = 'https://reeth.example' // PLACEHOLDER: replace with the production domain
const ROUTES = ['/', '/menu', '/events', '/reels', '/about', '/catering', '/careers', '/contact']

const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.map(
  (path) => `  <url>\n    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml')
writeFileSync(out, xml)
console.log(`sitemap.xml written with ${ROUTES.length} routes`)
