// Mocked submission layer. Every form calls submitEnquiry; swap the body for a real endpoint later.

export type EnquiryKind = 'reservation' | 'catering' | 'career'

export interface SubmitResult {
  ok: true
  reference: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock submission. Resolves after 800ms. Payloads containing "simulate error" reject,
 * so the error state can be exercised in development and tests.
 */
export async function submitEnquiry(kind: EnquiryKind, payload: object): Promise<SubmitResult> {
  // TODO: connect to backend or form service
  await delay(800)
  if (JSON.stringify(payload).includes('simulate error')) {
    throw new Error('Simulated submission failure')
  }
  if (import.meta.env.DEV) {
    console.debug('[mock submit]', kind, payload)
  }
  return { ok: true, reference: `RSV-${Math.random().toString(36).slice(2, 8).toUpperCase()}` }
}
