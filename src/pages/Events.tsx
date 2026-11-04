import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { EventCard } from '../components/events/EventCard'
import { EventCalendar } from '../components/events/EventCalendar'
import { MasonryGallery } from '../components/gallery/MasonryGallery'
import { Lightbox } from '../components/gallery/Lightbox'
import { Button } from '../components/ui/button'
import { events, pastEvents } from '../data/events'
import { pageIntros } from '../data/copy'
import { upcomingEvents } from '../lib/events'
import { formatEventDate, toISODate } from '../lib/formatters'
import { startOfToday } from '../lib/dates'
import { useReveal } from '../animations/useReveal'

export default function EventsPage() {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const upcoming = useMemo(() => upcomingEvents(events, toISODate(startOfToday())), [])
  const selectedISO = selected ? toISODate(selected) : null
  const agenda = selectedISO ? upcoming.filter((e) => e.date === selectedISO) : upcoming
  useReveal(ref, [selectedISO])

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
        <Container ref={ref} className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start lg:gap-14">
          <aside className="min-w-0 rounded-[2rem] border border-rule/30 bg-surface p-4 md:p-6 lg:sticky lg:top-28">
            <EventCalendar events={upcoming} selected={selected} onSelect={setSelected} />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule/25 pt-5 text-sm text-fg-muted">
              <p className="inline-flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
                Day has an event
              </p>
              {selected ? (
                <Button variant="ghost" size="sm" onClick={() => setSelected(undefined)}>
                  Show all
                </Button>
              ) : null}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-1">
              <p className="script text-3xl text-accent-text">{selected ? 'On this day' : 'Coming up'}</p>
              <h2 className="text-3xl">
                {selected ? formatEventDate(selectedISO!).long : `${agenda.length} upcoming ${agenda.length === 1 ? 'night' : 'nights'}`}
              </h2>
            </div>

            {agenda.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-rule/50 p-10 text-center">
                <p className="font-display text-2xl">Nothing on this day.</p>
                <p className="mt-2 text-fg-muted">Pick another date on the calendar, or see every upcoming night.</p>
                <Button variant="ghost" className="mt-6" onClick={() => setSelected(undefined)}>
                  Show all events
                </Button>
              </div>
            ) : (
              <ul className="grid gap-5">
                {agenda.map((e) => (
                  <li key={e.slug} data-reveal>
                    <EventCard event={e} layout="row" />
                  </li>
                ))}
              </ul>
            )}
          </div>
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
              Want the next one?{' '}
              <Link className="underline decoration-rule underline-offset-4 hover:text-accent-text" to="/contact">
                Join the guest list
              </Link>
              .
            </p>
          </div>
          <MasonryGallery items={pastItems} onOpen={setLightbox} />
        </Container>
      </Section>

      <Lightbox items={pastItems} index={lightbox} onIndexChange={setLightbox} />
    </>
  )
}
