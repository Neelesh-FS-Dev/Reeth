import type { Page } from '@playwright/test'

export const ROUTES = ['/', '/menu', '/events', '/reels', '/about', '/catering', '/careers', '/contact', '/does-not-exist']

/** Console errors we accept: third-party font requests may be blocked in offline test runs. */
export function isAllowedConsoleError(text: string): boolean {
  return /fonts\.(googleapis|gstatic)\.com|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|Failed to load resource: net::ERR/i.test(
    text,
  )
}

/** True when the document is wider than the viewport. Must be false at every width from 320px up. */
export async function hasHorizontalScroll(page: Page): Promise<boolean> {
  return page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
}
