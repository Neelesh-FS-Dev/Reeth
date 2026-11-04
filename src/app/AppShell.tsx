import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../animations/gsap'
import { SkipLink } from '../components/layout/SkipLink'
import { DemoBanner } from '../components/layout/DemoBanner'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { MobileReserveFab } from '../components/layout/MobileReserveFab'

/** Shared chrome for every route: skip link, demo ribbon, header, footer, floating reserve button. */
export function AppShell() {
  const { pathname, hash } = useLocation()
  const main = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  // Page feed-in: the new route fades up from transparent. Opacity only, so no transform is
  // left on <main> (a transform would become the containing block for fixed descendants).
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !main.current) return
      gsap.fromTo(main.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power1.out', clearProps: 'opacity' })
    },
    { dependencies: [pathname], scope: main },
  )

  return (
    <>
      <SkipLink />
      <DemoBanner />
      <Header />
      <main ref={main} id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileReserveFab />
    </>
  )
}
