import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '../ui/sheet'
import { navLinks } from './nav'
import { cn } from '../../lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-rule/30 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link to="/" className="inline-flex items-center gap-3 rounded-full text-fg" aria-label="Reeth, home">
          <Logo size={44} />
          <span className="hidden font-display text-xl sm:inline">Reeth</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-fg-muted transition-colors hover:text-fg',
                  isActive && 'text-fg underline decoration-rule decoration-2 underline-offset-8',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link to="/contact" data-magnetic>
              Reserve a table
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen} key={location.pathname}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden="true" className="size-6" />
            </Button>
            <SheetContent side="right" aria-describedby="mobile-nav-desc" className="flex flex-col">
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              <SheetDescription id="mobile-nav-desc" className="sr-only">
                Site navigation
              </SheetDescription>
              <nav aria-label="Mobile" className="mt-8 flex flex-col">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="sheet-link min-h-14 border-b border-rule/30 py-3 font-display text-[2rem] leading-tight text-fg hover:text-accent-text"
                    style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button asChild size="lg" className="mt-auto w-full" onClick={() => setOpen(false)}>
                <Link to="/contact">Reserve a table</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
