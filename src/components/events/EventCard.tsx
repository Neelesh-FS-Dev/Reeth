import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { formatEventDate, formatTime } from '../../lib/formatters'
import type { EventItem, EventStatus } from '../../types'
import { cn } from '../../lib/utils'

const statusBadge: Record<EventStatus, { label: string; tone: 'warning' | 'danger' } | null> = {
  open: null,
  'few-seats': { label: 'Few seats left', tone: 'warning' },
  'sold-out': { label: 'Sold out', tone: 'danger' },
}

/**
 * One event.
 * - `card` (default): vertical tile for grids. Date and status on top, title and details in the
 *   middle, reserve action pinned to the bottom. Works at any column width.
 * - `row`: horizontal agenda line for the events list, stacking on phones.
 */
export function EventCard({
  event,
  layout = 'card',
  className,
}: {
  event: EventItem
  layout?: 'card' | 'row'
  className?: string
}) {
  const d = formatEventDate(event.date)
  const badge = statusBadge[event.status]
  const soldOut = event.status === 'sold-out'

  const action = soldOut ? (
    <Button variant="ghost" disabled aria-disabled="true" className={layout === 'card' ? 'w-full' : undefined}>
      Sold out
    </Button>
  ) : (
    <Button asChild className={layout === 'card' ? 'w-full' : undefined}>
      <Link to={`/contact?event=${event.slug}#reservation`} aria-label={`Reserve for ${event.title}`}>
        Reserve
      </Link>
    </Button>
  )

  const details = (
    <div className="mt-3 flex flex-col gap-1.5 text-sm text-fg-muted">
      <span className="inline-flex items-center gap-2">
        <Clock aria-hidden="true" className="size-4 shrink-0" />
        {d.weekday} {d.day} {d.month}, {formatTime(event.time)}
      </span>
      <span className="inline-flex items-center gap-2">
        <MapPin aria-hidden="true" className="size-4 shrink-0" />
        Reeth, Baner
      </span>
    </div>
  )

  if (layout === 'row') {
    return (
      <article
        className={cn(
          'grid gap-5 rounded-[1.75rem] border border-rule/30 bg-surface p-5 transition-colors hover:border-rule/70 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6',
          className,
        )}
      >
        <DateBlock d={d} />
        <div className="min-w-0">
          {badge ? (
            <Badge tone={badge.tone} className="mb-2">
              {badge.label}
            </Badge>
          ) : null}
          <h3 className="text-2xl">{event.title}</h3>
          {details}
          <p className="mt-3 text-fg-muted">{event.description}</p>
        </div>
        <div className="md:justify-self-end">{action}</div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-[1.75rem] border border-rule/30 bg-surface p-6 transition-colors hover:border-rule/70',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <DateBlock d={d} compact />
        {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
      </div>
      <h3 className="mt-5 text-2xl leading-tight">{event.title}</h3>
      {details}
      <p className="mt-4 line-clamp-3 flex-1 text-fg-muted">{event.description}</p>
      <div className="mt-6">{action}</div>
    </article>
  )
}

type Parts = ReturnType<typeof formatEventDate>

/** Date block: weekday, day and month on the accent. Compact is a single horizontal line. */
function DateBlock({ d, compact = false }: { d: Parts; compact?: boolean }) {
  if (compact) {
    return (
      <div className="inline-flex items-baseline gap-2 rounded-2xl bg-accent px-4 py-2 text-on-accent" aria-hidden="true">
        <span className="font-display text-3xl leading-none">{d.day}</span>
        <span className="text-xs uppercase tracking-[0.14em]">
          {d.month} · {d.weekday}
        </span>
      </div>
    )
  }
  return (
    <div className="flex w-20 flex-col items-center justify-center rounded-2xl bg-accent py-3 text-center text-on-accent" aria-hidden="true">
      <span className="text-xs uppercase tracking-[0.14em]">{d.weekday}</span>
      <span className="font-display text-4xl leading-none">{d.day}</span>
      <span className="mt-1 text-xs uppercase tracking-[0.14em]">{d.month}</span>
    </div>
  )
}
