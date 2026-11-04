export interface Capabilities {
  /** Viewport width in CSS pixels. */
  width: number
  reducedMotion: boolean
  cores: number
  saveData: boolean
}

/**
 * Decides whether the Three.js hero may load. Disabled for reduced motion, weak devices,
 * data saver, and screens below 768px.
 */
export function canUse3D({ width, reducedMotion, cores, saveData }: Capabilities): boolean {
  if (reducedMotion) return false
  if (saveData) return false
  if (cores < 4) return false
  if (width < 768) return false
  return true
}

/** Reads the live browser capabilities. Safe to call during SSR-free boot only. */
export function readCapabilities(): Capabilities {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  return {
    width: window.innerWidth,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    cores: nav.hardwareConcurrency ?? 2,
    saveData: nav.connection?.saveData ?? false,
  }
}
