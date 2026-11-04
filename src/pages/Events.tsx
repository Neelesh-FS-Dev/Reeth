import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { EventCard } from '../components/events/EventCard'
import { CalendarStrip } from '../components/events/CalendarStrip'
import { MasonryGallery } from '../components/gallery/MasonryGallery'
import { Lightbox } from '../components/gallery/Lightbox'
import { Button } from '../components/ui/button'
import { events, pastEvents } from '../data/events'
import { pageIntros } from '../data/copy'
import { upcomingEvents } from '../lib/events'
import { toISODate, formatEventDate } from '../lib/formatters'
import { useReveal } from '../animations/useReveal'

export default function EventsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, [selected])

  const upcoming = useMemo(() => upcomingEvents(events, toISODate(new Date())), [])
  const visible = selected ? upcoming.filter((e) => e.date === selected) : upcoming

  const pastItems = pastEvents.map((e) => ({
    id: e.slug,
    image: e.image,
    alt: `${e.title}, a moment from the night`,
    caption: `${e.title}, ${formatEventDate(e.date).long}`,
    ratio: 1.1,
  }))

  return (
    <>
      <Seo path="/events" />
      <PageHeader eyebrow="What's on" title="Nights worth the trip" intro={pageIntros.events} theme="night" />

      <Section theme="night" className="!pt-4">
        <Container ref={ref} className="grid grid-cols-[minmax(0,1fr)] gap-10">
          <div className="min-w-0">
            <h2 className="mb-4 text-2xl">Pick a date</h2>
            <CalendarStrip events={upcoming} selected={selected} onSelect={setSelected} />
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-rule/50 p-10 text-center">
              <p className="font-display text-2xl">No events on that day.</p>
              <p className="mt-2 text-fg-muted">Pick another date, or see every upcoming night.</p>
              <Button variant="ghost" className="mt-6" onClick={() => setSelected(null)}>
                Show all events
              </Button>
            </div>
          ) : (
            <ul className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
              {visible.map((e) => (
                <li key={e.slug} data-reveal>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <Section theme="night" className="!pt-0">
        <Container className="grid gap-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="script text-3xl text-accent-text">Looking back</p>
              <h2 className="mt-2 text-4xl">Past events</h2>
            </div>
            <p className="text-fg-muted">
              Want the next one? <Link className="underline decoration-rule underline-offset-4 hover:text-accent-text" to="/contact">Join the guest list</Link>.
            </p>
          </div>
          <MasonryGallery items={pastItems} onOpen={setLightbox} />
        </Container>
      </Section>

      <Lightbox items={pastItems} index={lightbox} onIndexChange={setLightbox} />
    </>
  )
}
