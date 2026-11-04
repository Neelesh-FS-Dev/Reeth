const IST = 'Asia/Kolkata'

/** Indian rupee formatting with lakh grouping, e.g. ₹1,200. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** "2026-11-08" -> { day: "8", month: "Nov", weekday: "Sun", long: "Sunday 8 November 2026" } in IST. */
export function formatEventDate(iso: string) {
  const date = new Date(`${iso}T00:00:00+05:30`)
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-IN', { timeZone: IST, ...opts }).format(date)
  return {
    day: part({ day: 'numeric' }),
    month: part({ month: 'short' }),
    weekday: part({ weekday: 'short' }),
    long: part({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

/** "19:30" -> "7:30 pm". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

/** Local calendar date as YYYY-MM-DD, for comparing with form inputs. */
export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
