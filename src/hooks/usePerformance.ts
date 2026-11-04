import { useMemo } from 'react'
import { canUse3D, readCapabilities } from '../lib/perf'
import { useReducedMotion } from './useReducedMotion'
import { useMediaQuery } from './useMediaQuery'

/** True when the 3D hero is allowed on this device. Recomputed when motion or the 768px breakpoint changes. */
export function usePerformance3D(): boolean {
  const reduced = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  return useMemo(() => {
    const caps = readCapabilities()
    // Below the breakpoint the scene is disabled regardless of device, matching canUse3D.
    return canUse3D({ ...caps, reducedMotion: reduced, width: wide ? caps.width : 0 })
  }, [reduced, wide])
}
