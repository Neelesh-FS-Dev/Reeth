import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import type { RefObject } from 'react'

/** Moves [data-parallax] images inside the scope with scroll scrub. Desktop and motion-friendly only. */
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { reduce: '(prefers-reduced-motion: reduce)', wide: '(min-width: 768px)' },
        (ctx) => {
          if (ctx.conditions?.reduce) return
          gsap.utils.toArray<HTMLElement>('[data-parallax]', scope.current ?? undefined).forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            )
          })
        },
      )
      return () => mm.revert()
    },
    { scope },
  )
}
