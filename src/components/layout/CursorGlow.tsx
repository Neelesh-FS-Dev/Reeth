import { useEffect, useRef } from 'react'
import { useFinePointer } from '../../hooks/useIsTouch'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Soft radial glow that follows the cursor inside its parent (night sections). Off on touch. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent || !fine || reduced) return
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect()
      el.style.transform = `translate3d(${e.clientX - r.left - 200}px, ${e.clientY - r.top - 200}px, 0)`
      el.style.opacity = '1'
    }
    const onLeave = () => (el.style.opacity = '0')
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', onLeave)
    return () => {
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 size-[400px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)' }}
    />
  )
}
