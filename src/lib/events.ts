import type { EventItem } from '../types'

/** Events on or after the given local date, soonest first. */
export function upcomingEvents(events: EventItem[], todayISO: string): EventItem[] {
  return events.filter((e) => e.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date))
}

/** Lookup for ?event= prefill on the reservation form. */
export function findEvent(events: EventItem[], slug: string | null): EventItem | undefined {
  return slug ? events.find((e) => e.slug === slug) : undefined
}
