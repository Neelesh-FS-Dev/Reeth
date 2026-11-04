import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import type { RefObject } from 'react'

/**
 * Hero entrance: each .line-mask > span slides up from its mask, the sub-line fades,
 * then CTAs stagger in. Total under 1.6s. Reduced motion shows the final state.
 */
export function useHeroEntrance(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.line-mask > span', { yPercent: 110, duration: 1.0, stagger: 0.12 })
        .from('[data-hero-sub]', { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
        .from('[data-hero-cta]', { opacity: 0, y: 14, stagger: 0.1, duration: 0.6 }, '-=0.5')
    },
    { scope },
  )
}
