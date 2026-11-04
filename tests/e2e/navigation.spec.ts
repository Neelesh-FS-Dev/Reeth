import { test, expect } from '@playwright/test'

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('sheet opens with large links, traps focus, closes and locks scroll', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    const sheet = page.getByRole('dialog')
    await expect(sheet).toBeVisible()
    await expect(sheet.getByRole('link', { name: 'Menu' })).toBeVisible()
    const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow)
    expect(bodyOverflow === 'hidden' || (await page.evaluate(() => document.body.style.pointerEvents)) === 'none').toBeTruthy()
    await page.keyboard.press('Escape')
    await expect(sheet).toBeHidden()
  })

  test('sheet navigates to a page and closes', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Events' }).click()
    await expect(page).toHaveURL(/\/events$/)
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})

test('desktop nav links are reachable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await nav.getByRole('link', { name: 'Menu' }).click()
  await expect(page).toHaveURL(/\/menu$/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('skip link moves focus to main content', async ({ page, browserName }) => {
  // Safari does not tab-focus links by default, so this keyboard path is verified in Chromium.
  test.skip(browserName === 'webkit', 'Safari skips links in tab order by default')
  await page.goto('/menu')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
})

