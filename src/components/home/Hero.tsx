import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { HeroVideo } from './HeroVideo'
import { useHeroEntrance } from '../../animations/useHeroEntrance'
import { useMagnetic } from '../../animations/useMagnetic'
import { useFinePointer } from '../../hooks/useIsTouch'
import { heroCopy } from '../../data/copy'
import { siteConfig } from '../../data/site.config'
import { reels } from '../../data/reels'

const facts = [
  { label: 'Find us', value: `${siteConfig.address.area}, ${siteConfig.address.city}` },
  { label: 'Open', value: `${siteConfig.hours[0].open} to ${siteConfig.hours[0].close}` },
  { label: 'Made for', value: 'Sharing, every table' },
]

/**
 * Split hero. Copy on the left (headline, calls to action, facts); a vertical reel on the right.
 * On phones the copy comes first and the video follows.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const primary = useRef<HTMLAnchorElement>(null)
  const fine = useFinePointer()
  useHeroEntrance(ref)
  useMagnetic(primary, fine)
  const reel = reels.find((r) => r.id === 'reel-04') ?? reels[0]

  return (
    <section
      ref={ref}
      data-theme="night"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-bg text-fg"
    >
      {/* Decorative backdrop on the navy base: a faint saffron geometric lattice, a soft saffron glow, film grain. */}
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cpath d='M36 4 L68 36 L36 68 L4 36 Z M36 18 L54 36 L36 54 L18 36 Z' fill='none' stroke='%23d9a441' stroke-width='1'/%3E%3Ccircle cx='36' cy='36' r='2.5' fill='%23d9a441'/%3E%3C/svg%3E\")",
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute -right-32 top-1/4 size-[38rem] rounded-full bg-[radial-gradient(closest-side,var(--color-saffron),transparent)] opacity-[0.12] blur-3xl" />
      </div>
      <div className="container-x grid min-h-[calc(100svh-var(--header-h))] items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="order-1 lg:order-1 lg:col-span-7">
          <p className="script text-4xl text-accent-text md:text-5xl" data-hero-sub>
            Spice &amp; Spirit
          </p>
          <h1 id="hero-title" className="mt-4 max-w-[12ch] text-[clamp(3rem,7vw,6.25rem)] leading-[0.98]">
            {heroCopy.headline.map((line, i) => (
              <span key={line} className="line-mask block">
                <span className={i === 1 ? 'italic text-accent-text' : undefined}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted md:text-xl" data-hero-sub>
            {heroCopy.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact" ref={primary} data-hero-cta>
                {heroCopy.primaryCta}
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/menu" data-hero-cta>
                {heroCopy.secondaryCta}
              </Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-rule/30 pt-6" data-hero-sub>
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-[0.16em] text-fg-muted">{f.label}</dt>
                <dd className="mt-1 text-sm text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-2 lg:order-2 lg:col-span-4 lg:col-start-9" data-hero-arch>
          <HeroVideo reel={reel} arch />
        </div>
      </div>
    </section>
  )
}
