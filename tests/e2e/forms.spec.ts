import { test, expect } from '@playwright/test'
import { toISODate } from '../../src/lib/formatters'

function dateInDays(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toISODate(d)
}

test.describe('reservation form', () => {
  test('success path shows the confirmation with a reference', async ({ page }) => {
    await page.goto('/contact')
    await page.getByLabel('Date').fill(dateInDays(5))
    await page.getByLabel('Time').selectOption('19:30')
    await page.getByLabel('Party size').selectOption('4')
    await page.getByLabel('Name').fill('Asha Rao')
    await page.getByLabel('Phone').fill('98765 43210')
    await page.getByLabel('Email').fill('asha@example.com')
    await page.getByRole('button', { name: /request reservation/i }).click()
    await expect(page.getByRole('status').filter({ hasText: /table is requested/i })).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/Reference:/)).toBeVisible()
  })

  test('error path shows the alert and a retry action', async ({ page }) => {
    await page.goto('/contact')
    await page.getByLabel('Date').fill(dateInDays(5))
    await page.getByLabel('Name').fill('Asha Rao')
    await page.getByLabel('Phone').fill('9876543210')
    await page.getByLabel('Email').fill('asha@example.com')
    await page.getByLabel('Special requests').fill('simulate error')
    await page.getByRole('button', { name: /request reservation/i }).click()
    await expect(page.getByRole('alert').filter({ hasText: /something went wrong/i })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()
  })

  test('invalid submit focuses the first invalid field', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: /request reservation/i }).click()
    await expect(page.getByLabel('Date')).toBeFocused()
  })
})

test('catering enquiry validates guest count', async ({ page }) => {
  await page.goto('/catering')
  await page.getByLabel('Guest count').fill('3')
  await page.getByRole('button', { name: /send enquiry/i }).click()
  await expect(page.getByText(/catering starts at 10 guests/i)).toBeVisible()
})
