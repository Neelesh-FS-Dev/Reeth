/** "2026-11-08" -> local Date at noon, so timezones never shift the calendar day. */
export function isoToDate(iso: string): Date {
  return new Date(`${iso}T12:00:00`)
}

/** Today at local midnight. */
export function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}
