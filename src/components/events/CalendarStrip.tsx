import { toISODate, formatEventDate } from '../../lib/formatters'
import type { EventItem } from '../../types'
import { cn } from '../../lib/utils'

/** Horizontal month strip of the next six weeks. Days with events carry a dot. Tap a day to filter. */
export function CalendarStrip({
  events,
  selected,
  onSelect,
}: {
  events: EventItem[]
  selected: string | null
  onSelect: (iso: string | null) => void
}) {
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date()
    d.setHours(12, 0, 0, 0)
    d.setDate(d.getDate() + i)
    return toISODate(d)
  })
  const eventDays = new Set(events.map((e) => e.date))

  return (
    <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div role="group" aria-label="Filter events by date" className="flex w-max gap-2">
        <button
          type="button"
          aria-pressed={selected === null}
          onClick={() => onSelect(null)}
          className={cn(
            'min-h-16 min-w-16 rounded-2xl border px-4 text-sm font-medium',
            selected === null ? 'border-accent bg-accent text-on-accent' : 'border-fg/20 text-fg',
          )}
        >
          All
        </button>
        {days.map((iso) => {
          const d = formatEventDate(iso)
          const has = eventDays.has(iso)
          const isSel = selected === iso
          return (
            <button
              key={iso}
              type="button"
              aria-pressed={isSel}
              aria-label={`${d.weekday} ${d.day} ${d.month}${has ? ', has events' : ''}`}
              disabled={!has}
              onClick={() => onSelect(isSel ? null : iso)}
              className={cn(
                'relative flex min-h-16 min-w-16 flex-col items-center justify-center rounded-2xl border px-3 transition-colors',
                isSel ? 'border-accent bg-accent text-on-accent' : 'border-fg/15 bg-surface text-fg',
                !has && 'opacity-40',
              )}
            >
              <span className="text-xs uppercase tracking-wider">{d.weekday}</span>
              <span className="font-display text-xl leading-none">{d.day}</span>
              {has && !isSel ? <span className="absolute bottom-1.5 size-1.5 rounded-full bg-accent" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
