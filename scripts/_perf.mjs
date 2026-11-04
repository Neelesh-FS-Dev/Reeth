import { chromium } from '@playwright/test'
const ROUTES = ['/', '/menu', '/events', '/reels', '/about', '/catering', '/careers', '/contact']
const browser = await chromium.launch()
const summary = []
for (const route of ROUTES) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  const cdp = await ctx.newCDPSession(page)
  // Slow 4G: 400 ms latency, ~1.6 Mbps down
  await cdp.send('Network.enable')
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 })
  const reqs = new Map()
  const failed = []
  page.on('response', async (r) => {
    const u = r.url()
    const type = r.request().resourceType()
    if (r.status() >= 400) failed.push(`${r.status()} ${u}`)
    if (['image', 'media'].includes(type)) {
      const len = Number((await r.allHeaders())['content-length'] ?? 0)
      reqs.set(u, { type, len })
    }
  })
  const t0 = Date.now()
  await page.goto('http://localhost:4173' + route, { waitUntil: 'load' })
  const loadMs = Date.now() - t0
  // Scroll the whole page so lazy images and reels are requested
  for (let y = 0; y < 60000; y += 700) { await page.evaluate((t) => window.scrollTo(0, t), y); await page.waitForTimeout(90) }
  await page.waitForTimeout(2500)
  const dom = await page.evaluate(() => {
    const imgs = [...document.images].map((i) => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0 }))
    const vids = [...document.querySelectorAll('video')].map((v) => ({ src: v.currentSrc, ready: v.readyState }))
    return { imgs, vids }
  })
  const imgBytes = [...reqs.values()].filter((r) => r.type === 'image').reduce((s, r) => s + r.len, 0)
  const vidBytes = [...reqs.values()].filter((r) => r.type === 'media').reduce((s, r) => s + r.len, 0)
  const broken = dom.imgs.filter((i) => !i.ok).length
  summary.push({ route, loadMs, images: dom.imgs.length, broken, imgMB: +(imgBytes / 1048576).toFixed(2), videoMB: +(vidBytes / 1048576).toFixed(2), videos: dom.vids.length, failed: failed.length, failedList: failed.slice(0, 3) })
  await ctx.close()
}
console.table(summary.map(({ failedList, ...s }) => s))
for (const s of summary) if (s.failedList.length) console.log(s.route, s.failedList)
await browser.close()
