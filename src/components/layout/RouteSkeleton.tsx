import { Skeleton } from '../ui/skeleton'
import { Container } from './Container'

/** Branded loading state shown while a route chunk loads. */
export function RouteSkeleton() {
  return (
    <div className="section-space" role="status" aria-live="polite">
      <Container className="grid gap-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-3/4 md:h-24" />
        <Skeleton className="h-6 w-1/2" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Skeleton className="aspect-[4/5]" />
          <Skeleton className="aspect-[4/5]" />
          <Skeleton className="aspect-[4/5]" />
        </div>
        <span className="sr-only">Loading</span>
      </Container>
    </div>
  )
}
