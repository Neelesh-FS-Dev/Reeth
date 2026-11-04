import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { ROUTES, isAllowedConsoleError } from './helpers'

// Light theme on every route. Night theme is checked on the events page below.
for (const route of ROUTES.filter((r) => r !== '/does-not-exist')) {
  test(`axe: no serious or critical violations on ${route}`, async ({ page }) => {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([])
  })
}

test('axe: night theme sections on events', async ({ page }) => {
  await page.goto('/events')
  await page.waitForLoadState('networkidle')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).include('[data-theme="night"]').analyze()
  const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([])
})

test('errors from the console are not hidden by the allowlist', () => {
  expect(isAllowedConsoleError('Uncaught TypeError: x is not a function')).toBe(false)
})
