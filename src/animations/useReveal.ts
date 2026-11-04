import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap'
import type { RefObject } from 'react'

/**
 * Scroll reveal: every [data-reveal] inside the scope fades up 40px with a stagger, once,
 * when it reaches 80% of the viewport. Reduced motion gets a plain fade.
 * Animations live in a gsap.context, so they clean up on unmount and route change.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current ?? undefined)
      if (!items.length) return
      gsap.set(items, { opacity: 0, y: reduced ? 0 : 40 })
      ScrollTrigger.batch(items, {
        start: 'top 80%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: reduced ? 0.4 : 0.9, overwrite: true }),
      })
    },
    { scope, dependencies: deps },
  )
}
