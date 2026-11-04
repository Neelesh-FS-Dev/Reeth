import { test, expect } from '@playwright/test'
import { ROUTES, hasHorizontalScroll, isAllowedConsoleError } from './helpers'

for (const route of ROUTES) {
  test(`route ${route} renders with one H1 and no console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !isAllowedConsoleError(msg.text())) errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    const response = await page.goto(route)
    if (route === '/does-not-exist') {
      // SPA fallback: the host serves index.html, the router renders the 404 page.
      expect(response?.status()).toBeLessThan(500)
      await expect(page.getByRole('heading', { level: 1, name: /this table is not set/i })).toBeVisible()
    } else {
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
    }
    await page.waitForLoadState('networkidle')
    expect(errors, errors.join('\n')).toEqual([])
  })
}

test('home has Restaurant JSON-LD and Open Graph tags', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Reeth/)
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent()
  expect(JSON.parse(ld ?? '{}')['@type']).toBe('Restaurant')
})

test('no horizontal scroll on phone widths', async ({ page }) => {
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 800 })
    for (const route of ROUTES.slice(0, 8)) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      expect(await hasHorizontalScroll(page), `${route} at ${width}px`).toBe(false)
    }
  }
})
