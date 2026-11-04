import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Toggle button for filters. Uses aria-pressed, so no tabs semantics are needed. */
export function ToggleChip({
  pressed,
  onPressedChange,
  children,
}: {
  pressed: boolean
  onPressedChange: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onPressedChange}
      className={cn(
        'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors',
        pressed ? 'border-accent bg-accent text-on-accent' : 'border-fg/20 text-fg hover:border-accent hover:text-accent-text',
      )}
    >
      {children}
    </button>
  )
}
