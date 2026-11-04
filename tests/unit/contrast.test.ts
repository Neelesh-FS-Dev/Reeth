import { describe, expect, it } from 'vitest'

// Palette values mirror src/styles/tokens.css. Keep in sync when tokens change.
const palette = {
  navy: '#1B3566',
  navyDeep: '#0F213F',
  terracotta: '#B4532F',
  saffron: '#D9A441',
  cream: '#F5EEE1',
  paper: '#FBF7EF',
  ink: '#2A1B12',
  ember: '#7A2E1A',
  muted: '#6E5F53',
  onAccent: '#FFFAF2',
  nightMuted: '#CFC5B4',
}

function luminance(hex: string) {
  const [r, g, b] = hex
    .replace('#', '')
    .match(/.{2}/g)!
    .map((h) => parseInt(h, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('WCAG 2.2 AA contrast for brand tokens', () => {
  const textPairs: [string, string, string][] = [
    ['body ink on cream', palette.ink, palette.cream],
    ['muted on cream', palette.muted, palette.cream],
    ['muted on paper card', palette.muted, palette.paper],
    ['ember accent text on paper', palette.ember, palette.paper],
    ['ember accent text on cream', palette.ember, palette.cream],
    ['on-accent on terracotta button', palette.onAccent, palette.terracotta],
    ['cream on navy-deep night body', palette.cream, palette.navyDeep],
    ['night muted on navy-deep', palette.nightMuted, palette.navyDeep],
    ['saffron accent on navy-deep', palette.saffron, palette.navyDeep],
    ['saffron accent on navy surface', palette.saffron, palette.navy],
    ['navy-deep text on saffron button', palette.navyDeep, palette.saffron],
  ]

  it.each(textPairs)('%s meets 4.5:1', (_name, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it('terracotta text on cream fails AA, which is why text uses ember instead', () => {
    expect(contrast(palette.terracotta, palette.cream)).toBeLessThan(4.5)
  })

  it('light focus ring (ember) meets 3:1 against cream', () => {
    expect(contrast(palette.ember, palette.cream)).toBeGreaterThanOrEqual(3)
  })
})
