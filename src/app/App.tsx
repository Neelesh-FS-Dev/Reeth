import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SmoothScroll } from '../animations/SmoothScroll'
import { ToastProvider } from '../components/ui/toast'
import { TooltipProvider } from '../components/ui/tooltip'
import { AppShell } from './AppShell'
import { RouteSkeleton } from '../components/layout/RouteSkeleton'

// Route-level code splitting. Each page loads on demand.
const Home = lazy(() => import('../pages/Home'))
const Menu = lazy(() => import('../pages/Menu'))
const Events = lazy(() => import('../pages/Events'))
const Reels = lazy(() => import('../pages/Reels'))
const About = lazy(() => import('../pages/About'))
const Catering = lazy(() => import('../pages/Catering'))
const Careers = lazy(() => import('../pages/Careers'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function App() {
  return (
    <HelmetProvider>
      <SmoothScroll>
        <ToastProvider>
          <TooltipProvider delayDuration={200}>
            <Routes>
              <Route element={<AppShell />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<RouteSkeleton />}>
                      <Home />
                    </Suspense>
                  }
                />
                {[
                  ['menu', Menu],
                  ['events', Events],
                  ['reels', Reels],
                  ['about', About],
                  ['catering', Catering],
                  ['careers', Careers],
                  ['contact', Contact],
                ].map(([path, Page]) => {
                  const Component = Page as React.ComponentType
                  return (
                    <Route
                      key={path as string}
                      path={path as string}
                      element={
                        <Suspense fallback={<RouteSkeleton />}>
                          <Component />
                        </Suspense>
                      }
                    />
                  )
                })}
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<RouteSkeleton />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </TooltipProvider>
        </ToastProvider>
      </SmoothScroll>
    </HelmetProvider>
  )
}
