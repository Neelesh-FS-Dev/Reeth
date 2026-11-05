import { siteConfig } from '../../data/site.config'

export interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
  className?: string
}

/**
 * Placehlder roundel until the real logo file arrives. Light variant is for light surfaces,
 * dark variant for night sections. Replace the SVG body here to swap in the final mark.
 */
export function Logo({ variant = 'light', size = 48, className }: LogoProps) {
  const ring = variant === 'light' ? 'var(--color-brand-navy)' : 'var(--color-brand-cream)'
  const field = variant === 'light' ? 'var(--color-brand-navy)' : 'var(--color-brand-cream)'
  const ink = variant === 'light' ? 'var(--color-brand-cream)' : 'var(--color-brand-navy-deep)'
  const accent = 'var(--color-brand-saffron)'

  return (
    <svg
      role="img"
      aria-label={`${siteConfig.name}, ${siteConfig.tagline}`}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      // PLACEHOLDER: replace with the supplied logo SVG
    >
      <circle cx="60" cy="60" r="58" fill={field} />
      <circle cx="60" cy="60" r="50" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="60" cy="60" r="44" fill="none" stroke={ring} strokeOpacity="0.35" strokeWidth="0.75" />
      <text
        x="60"
        y="63"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ink}
        style={{ fontFamily: 'var(--face-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em' }}
      >
        Reeth
      </text>
      <text
        x="60"
        y="84"
        textAnchor="middle"
        fill={accent}
        style={{ fontFamily: 'var(--face-body)', fontSize: 6.5, letterSpacing: '0.22em' }}
      >
        SPICE &amp; SPIRIT
      </text>
    </svg>
  )
}
