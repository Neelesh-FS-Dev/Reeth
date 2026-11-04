import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'
import { EventCard } from '../events/EventCard'
import { events } from '../../data/events'
import { upcomingEvents } from '../../lib/events'
import { toISODate } from '../../lib/formatters'
import { useReveal } from '../../animations/useReveal'

export function EventsTeaser() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const next = upcomingEvents(events, toISODate(new Date())).slice(0, 3)

  return (
    <Section ref={ref} theme="night" aria-labelledby="events-teaser-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="script text-3xl text-accent-text">After dark</p>
            <h2 id="events-teaser-title" className="mt-2">
              Upcoming events
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/events">
              All events <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {next.map((e) => (
            <li key={e.slug} data-reveal>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
