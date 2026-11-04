import { describe, expect, it } from 'vitest'
import { formatEventDate, formatINR, formatTime } from '../../src/lib/formatters'
import { upcomingEvents, findEvent } from '../../src/lib/events'
import { events } from '../../src/data/events'

describe('formatters', () => {
  it('formats rupees with Indian grouping and no decimals', () => {
    expect(formatINR(1200)).toBe('₹1,200')
    expect(formatINR(125000)).toBe('₹1,25,000')
  })

  it('formats 24h times as 12h with am/pm', () => {
    expect(formatTime('19:30')).toBe('7:30 pm')
    expect(formatTime('12:00')).toBe('12 pm')
    expect(formatTime('00:15')).toBe('12:15 am')
  })

  it('extracts day and month for an event date', () => {
    const d = formatEventDate('2026-11-08')
    expect(d.day).toBe('8')
    expect(d.month).toBe('Nov')
  })
})

describe('events helpers', () => {
  it('keeps only today or later, soonest first', () => {
    const up = upcomingEvents(events, '2026-11-10')
    expect(up.every((e) => e.date >= '2026-11-10')).toBe(true)
    expect(up.map((e) => e.date)).toEqual([...up.map((e) => e.date)].sort())
  })

  it('finds an event by slug and returns undefined for unknown slugs', () => {
    expect(findEvent(events, 'diwali-party')?.title).toBe('Diwali Party')
    expect(findEvent(events, 'nope')).toBeUndefined()
    expect(findEvent(events, null)).toBeUndefined()
  })
})

