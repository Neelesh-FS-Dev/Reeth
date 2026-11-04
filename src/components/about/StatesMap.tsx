import { useState } from 'react'
import { regions } from '../../data/regions'
import { cn } from '../../lib/utils'

/**
 * States of India as keyboard-accessible tiles (stylised, not geographic). Selecting a tile reveals
 * the dish it inspired. Tiles are a grid on every screen size, so no map projection is needed.
 */
export function StatesMap() {
  const [activeId, setActiveId] = useState(regions[0].id)
  const active = regions.find((r) => r.id === activeId) ?? regions[0]

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {regions.map((r) => {
          const pressed = r.id === activeId
          return (
            <li key={r.id}>
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => setActiveId(r.id)}
                className={cn(
                  'relative flex min-h-24 w-full flex-col items-start justify-between overflow-hidden rounded-2xl border p-4 text-left transition-colors',
                  pressed ? 'border-accent bg-surface shadow-lg' : 'border-fg/15 bg-surface/60 hover:border-accent',
                )}
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: r.tone }} aria-hidden="true" />
                <span className="mt-2 text-sm font-medium text-fg">{r.state}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <div aria-live="polite" className="tab-enter rounded-[2rem] border border-rule/40 bg-surface p-8" key={active.id}>
        <p className="text-sm uppercase tracking-[0.16em] text-fg-muted">{active.state}</p>
        <h3 className="mt-3 text-3xl">{active.dish}</h3>
        <p className="mt-4 text-lg text-fg-muted">{active.note}</p>
      </div>
    </div>
  )
}
