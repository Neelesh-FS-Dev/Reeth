import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Picture } from '../brand/Picture'
import { BlockPrint } from '../brand/Motif'
import { useHeroEntrance } from '../../animations/useHeroEntrance'
import { useMagnetic } from '../../animations/useMagnetic'
import { usePerformance3D } from '../../hooks/usePerformance'
import { useFinePointer } from '../../hooks/useIsTouch'
import { heroCopy } from '../../data/copy'
import { siteConfig } from '../../data/site.config'

// The 3D moment loads after first paint and only on capable devices.
const HeroScene = lazy(() => import('../three/HeroScene'))

const facts = [
  { label: 'Find us', value: `${siteConfig.address.area}, ${siteConfig.address.city}` },
  { label: 'Open', value: `${siteConfig.hours[0].open} to ${siteConfig.hours[0].close}` },
  { label: 'Made for', value: 'Sharing, every table' },
]

/**
 * Night hero. Left: the headline and the two calls to action, then three quiet facts.
 * Right: a jharokha arch holding the photograph, with a small saffron orb resting on its corner.
 * Stacks on phones: arch first, copy below.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const primary = useRef<HTMLAnchorElement>(null)
  const enable3D = usePerformance3D()
  const fine = useFinePointer()
  useHeroEntrance(ref)
  useMagnetic(primary, fine)

  return (
    <section
      ref={ref}
      data-theme="night"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-bg text-fg"
    >
      <BlockPrint />
      <div className="container-x grid min-h-[100svh] items-center gap-14 pb-16 pt-28 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-32">
        <div className="order-1 lg:order-1 lg:col-span-6">
          <p className="script text-4xl text-accent-text md:text-5xl" data-hero-sub>
            Spice &amp; Spirit
          </p>
          <h1 id="hero-title" className="mt-5 max-w-[11ch] text-[clamp(3rem,7.4vw,6.25rem)] leading-[0.98]">
            {heroCopy.headline.map((line, i) => (
              <span key={line} className="line-mask block">
                <span className={i === 1 ? 'italic text-accent-text' : undefined}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-md text-lg text-fg-muted md:text-xl" data-hero-sub>
            {heroCopy.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
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
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-rule/30 pt-6" data-hero-sub>
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-[0.16em] text-fg-muted">{f.label}</dt>
                <dd className="mt-1 text-sm text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-2 mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:col-start-8">
          <div data-hero-arch className="arch relative border border-rule/50 bg-surface">
            <Picture
              name={heroCopy.image}
              alt={heroCopy.imageAlt}
              aspect={4 / 5}
              sizes="(min-width: 1024px) 40vw, 90vw"
              priority
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-3 arch border border-rule/45" />
          </div>
          {enable3D ? (
            <div className="absolute -bottom-10 left-2 size-[200px] md:size-[260px] lg:-left-10">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
