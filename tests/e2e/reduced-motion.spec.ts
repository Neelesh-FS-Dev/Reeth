import { test, expect } from '@playwright/test'
import { isAllowedConsoleError } from './helpers'

test.use({ reducedMotion: 'reduce' })

test('home degrades cleanly with reduced motion: content visible, no errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error' && !isAllowedConsoleError(m.text())) errors.push(m.text())
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.locator('#hero-title')).toBeVisible()
  // Reveal targets fade in on scroll even under reduced motion; scroll through to trigger them.
  for (let y = 0; y < 20000; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(120)
  }
  await page.waitForTimeout(1200)
  const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity === '0').length)
  expect(hidden).toBe(0)
  expect(errors).toEqual([])
})
