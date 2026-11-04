import { Link, useLocation } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'

/** Floating reserve button on phones and tablets. Hidden on the contact page itself. */
export function MobileReserveFab() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null
  return (
    <Link
      to="/contact"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent shadow-xl lg:hidden"
    >
      <CalendarDays aria-hidden="true" className="size-4" />
      Reserve a table
    </Link>
  )
}
