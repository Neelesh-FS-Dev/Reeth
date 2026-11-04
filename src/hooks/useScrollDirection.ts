import { useEffect, useState } from 'react'

/**
 * Tracks scroll direction. `hidden` becomes true once the user scrolls down past `threshold`
 * and turns false again as soon as they scroll up. Passive listener, one update per frame.
 */
export function useScrollDirection(threshold = 120): { hidden: boolean } {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - last
      if (Math.abs(delta) < 4) return
      if (delta > 0 && y > threshold) setHidden(true)
      if (delta < 0) setHidden(false)
      last = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])

  return { hidden }
}
