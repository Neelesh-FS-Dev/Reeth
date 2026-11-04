import { Link } from 'react-router-dom'
import { CalendarClock, MapPin } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { formatEventDate, formatTime } from '../../lib/formatters'
import type { EventItem, EventStatus } from '../../types'
import { cn } from '../../lib/utils'

const statusBadge: Record<EventStatus, { label: string; tone: 'success' | 'warning' | 'danger' } | null> = {
  open: null,
  'few-seats': { label: 'Few seats left', tone: 'warning' },
  'sold-out': { label: 'Sold out', tone: 'danger' },
}

export function EventCard({ event, className }: { event: EventItem; className?: string }) {
  const d = formatEventDate(event.date)
  const badge = statusBadge[event.status]
  const soldOut = event.status === 'sold-out'

  return (
    <article className={cn('flex h-full flex-col rounded-[2rem] border border-rule/35 bg-surface p-6 md:p-7', className)}>
      <div className="flex items-start gap-5">
        <div className="flex min-w-[4.5rem] flex-col items-center rounded-2xl bg-accent px-3 py-3 text-center text-on-accent" aria-hidden="true">
          <span className="font-display text-3xl leading-none">{d.day}</span>
          <span className="mt-1 text-xs uppercase tracking-[0.14em]">{d.month}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
          </div>
          <h3 className="mt-2 text-2xl">{event.title}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-fg-muted">
            <CalendarClock aria-hidden="true" className="size-4" />
            <span>
              {d.long}, {formatTime(event.time)}
            </span>
          </p>
        </div>
      </div>
      <p className="mt-5 flex-1 text-fg-muted">{event.description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-fg-muted">
          <MapPin aria-hidden="true" className="size-4" /> Reeth, Baner
        </p>
        {soldOut ? (
          <Button variant="ghost" disabled aria-disabled="true">
            Sold out
          </Button>
        ) : (
          <Button asChild>
            <Link to={`/contact?event=${event.slug}#reservation`} aria-label={`Reserve for ${event.title}`}>
              Reserve
            </Link>
          </Button>
        )}
      </div>
    </article>
  )
}
