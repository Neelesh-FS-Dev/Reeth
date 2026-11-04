import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../animations/gsap'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Picture } from '../brand/Picture'
import { regions } from '../../data/regions'

/**
 * States of India as photo tiles. Desktop (1024px+, motion allowed): the section pins and the
 * track scrubs horizontally. Everywhere else: a native scroll-snap carousel, no pinning.
 */
export function RegionalJourney() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current
        const wrap = ref.current
        if (!el || !wrap) return
        const distance = () => el.scrollWidth - window.innerWidth
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            pin: true,
            scrub: 0.6,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} aria-labelledby="journey-title" className="overflow-hidden lg:h-dvh lg:py-0 lg:flex lg:flex-col lg:justify-center">
      <Container className="mb-10">
        <p className="script text-3xl text-accent-text">A map of flavour</p>
        <h2 id="journey-title" className="mt-2">
          Regional journey
        </h2>
        <p className="mt-3 max-w-xl text-fg-muted">Step through the states that shape our menu. Scroll or swipe.</p>
      </Container>
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pl-[var(--gutter)] pr-[var(--gutter)] [scrollbar-width:none] lg:w-max lg:snap-none lg:overflow-visible lg:pl-[calc((100vw-var(--container-max))/2+var(--gutter))] [&::-webkit-scrollbar]:hidden"
        aria-label="States of India"
      >
        {regions.map((r, i) => (
          <li
            key={r.id}
            className="relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-rule/40 bg-surface sm:w-[46vw] md:w-[36vw] lg:w-[24vw]"
          >
            <Picture name={r.image} alt={`${r.state}: ${r.dish}`} aspect={4 / 3} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 78vw" className="rounded-none" />
            <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: r.tone }} aria-hidden="true" />
            <span className="absolute right-5 top-4 font-display text-4xl leading-none text-brand-cream drop-shadow" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-fg-muted">{r.state}</p>
              <h3 className="mt-2 text-3xl">{r.dish}</h3>
              <p className="mt-3 text-fg-muted">{r.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
