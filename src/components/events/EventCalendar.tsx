import { DayPicker } from 'react-day-picker'
import type { EventItem } from '../../types'
import { isoToDate, startOfToday } from '../../lib/dates'

interface EventCalendarProps {
  events: EventItem[]
  selected: Date | undefined
  onSelect: (day: Date | undefined) => void
}

/**
 * Month calendar with a dot on every day that has an event. Past days are disabled.
 * Tap a day to filter the agenda beside it; tap it again to clear.
 */
export function EventCalendar({ events, selected, onSelect }: EventCalendarProps) {
  const eventDays = events.map((e) => isoToDate(e.date))

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={{ before: startOfToday() }}
      modifiers={{ hasEvent: eventDays }}
      modifiersClassNames={{ hasEvent: 'event-dot' }}
      showOutsideDays
      weekStartsOn={1}
      classNames={{
        root: 'w-full text-fg',
        months: 'flex flex-col',
        month: 'grid gap-4',
        month_caption: 'flex items-center justify-between',
        caption_label: 'font-display text-2xl text-fg',
        nav: 'flex gap-2',
        button_previous:
          'inline-flex size-11 items-center justify-center rounded-full border border-fg/20 text-fg hover:border-accent hover:text-accent-text',
        button_next:
          'inline-flex size-11 items-center justify-center rounded-full border border-fg/20 text-fg hover:border-accent hover:text-accent-text',
        month_grid: 'w-full border-collapse',
        weekdays: '',
        weekday: 'pb-2 text-center text-xs font-normal uppercase tracking-wider text-fg-muted',
        week: '',
        day: 'p-0.5 text-center',
        day_button:
          'inline-flex size-9 items-center justify-center rounded-full text-sm text-fg transition-colors hover:bg-fg/10 md:size-11',
        selected: 'rdp-sel',
        today: 'font-semibold text-accent-text',
        outside: 'opacity-35',
        disabled: 'opacity-35',
        hidden: 'invisible',
      }}
    />
  )
}
