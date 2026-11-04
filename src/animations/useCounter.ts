import { useGSAP } from '@gsap/react'
import { gsap } from './gsap'
import type { RefObject } from 'react'

/** Counts [data-count] elements up to their value once they scroll into view. */
export function useCounter(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.utils.toArray<HTMLElement>('[data-count]', scope.current ?? undefined).forEach((el) => {
        const target = Number(el.dataset.count ?? 0)
        const obj = { v: reduced ? target : 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-IN')
          },
        })
      })
    },
    { scope },
  )
}
