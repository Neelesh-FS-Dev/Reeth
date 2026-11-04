import { useRef } from 'react'
import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Picture } from '../components/brand/Picture'
import { StatesMap } from '../components/about/StatesMap'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { useReveal } from '../animations/useReveal'
import { useCounter } from '../animations/useCounter'
import { storyChapters, values } from '../data/about'
import { team } from '../data/team'
import { pageIntros } from '../data/copy'

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  useCounter(ref)

  return (
    <div ref={ref}>
      <Seo path="/about" />
      <PageHeader
        eyebrow="Our story"
        title="Regional India, poured and plated"
        intro={pageIntros.about}
        image={{ name: 'about-hero', alt: 'Brass pots and warm light in a kitchen at the end of service' }}
      />

      <Section>
        <Container className="grid gap-16">
          {storyChapters.map((c, i) => (
            <div key={c.id} data-reveal className="grid items-start gap-6 md:grid-cols-12">
              <p className="font-display text-7xl leading-none text-accent-text/40 md:col-span-2">0{i + 1}</p>
              <div className="md:col-span-8">
                <h2 className="text-4xl">{c.heading}</h2>
                <p className="mt-4 max-w-2xl text-lg text-fg-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section theme="night">
        <Container className="grid gap-10">
          <div>
            <p className="script text-3xl text-accent-text">The states of India</p>
            <h2 className="mt-2 text-4xl">Pick a state, taste the story</h2>
            <p className="mt-3 max-w-2xl text-fg-muted">
              A stylised view, not a geographic map. Each tile is a state that shapes a dish on our menu.
            </p>
          </div>
          <StatesMap />
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="script text-3xl text-accent-text">The people</p>
          <h2 className="mt-2 text-4xl">Team</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <li key={m.id} data-reveal className="rounded-[2rem] border border-rule/30 bg-surface p-5">
                <Picture name={m.image} alt={`Portrait placeholder for ${m.role}`} aspect={4 / 5} className="rounded-[1.5rem]" />
                <h3 className="mt-5 text-2xl">{m.name}</h3>
                <p className="text-sm uppercase tracking-[0.14em] text-accent-text">{m.role}</p>
                <p className="mt-3 text-fg-muted">{m.bio}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <h2 className="text-4xl">What we stand for</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.id} data-reveal className="rounded-[1.75rem] border border-rule/30 bg-bg p-7">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-3 text-fg-muted">{v.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-3xl">Come and see the room for yourself.</p>
            <Button asChild size="lg">
              <Link to="/contact">Reserve a table</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
