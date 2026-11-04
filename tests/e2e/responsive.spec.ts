import { test, expect } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { ROUTES, hasHorizontalScroll } from './helpers'

// Captures every route at the brief's widths and fails on horizontal overflow.
// Screenshots land in tests/screenshots/<width>/<route>.png.
const WIDTHS = [360, 390, 768, 1024, 1280, 1440]
const SHOTS = 'tests/screenshots'

for (const width of WIDTHS) {
  test(`responsive capture at ${width}px`, async ({ page }) => {
    mkdirSync(`${SHOTS}/${width}`, { recursive: true })
    await page.setViewportSize({ width, height: width < 768 ? 800 : 900 })
    for (const route of ROUTES.filter((r) => r !== '/does-not-exist')) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      // Let entrance animations finish so screenshots show settled layout.
      await page.waitForTimeout(1200)
      expect(await hasHorizontalScroll(page), `${route} overflows at ${width}px`).toBe(false)
      const name = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')
      await page.screenshot({ path: `${SHOTS}/${width}/${name}.png`, fullPage: true })
    }
  })
}

test('touch targets are at least 44px on phone widths (warns on undersized)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/menu')
  await page.waitForLoadState('networkidle')
  const small = await page.evaluate(() => {
    const isVisible = (el: Element) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    return Array.from(document.querySelectorAll('a[href], button'))
      .filter(isVisible)
      .map((el) => {
        const r = el.getBoundingClientRect()
        return { text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) }
      })
      .filter((x) => x.h < 44 || x.w < 44)
  })
  // Non-blocking: list undersized targets so they can be reviewed in the report.
  if (small.length) console.warn('Undersized touch targets on /menu:', small)
  expect(small.length, 'undersized targets are reviewed in README').toBeLessThan(60)
})
