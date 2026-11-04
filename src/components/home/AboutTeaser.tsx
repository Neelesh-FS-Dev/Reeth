import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Picture } from '../brand/Picture'
import { Button } from '../ui/button'
import { useReveal } from '../../animations/useReveal'
import { useCounter } from '../../animations/useCounter'
import { regions } from '../../data/regions'
import { menuItems } from '../../data/menu'

const stats = [
  { label: 'States on the menu', value: regions.length },
  { label: 'Dishes and drinks', value: menuItems.length },
  { label: 'Signature cocktails', value: menuItems.filter((m) => m.category === 'cocktails').length },
]

export function AboutTeaser() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  useCounter(ref)

  return (
    <Section ref={ref} aria-labelledby="about-teaser-title" className="bg-surface">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Picture name="about-teaser" alt="The bar at Reeth lit in amber, with bottles along the back wall" aspect={4 / 5} className="arch" />
        <div data-reveal>
          <p className="script text-3xl text-accent-text">Our story</p>
          <h2 id="about-teaser-title" className="mt-2">
            Cooked the way the regions cook.
          </h2>
          <p className="mt-5 text-lg text-fg-muted">
            We started Reeth to cook India as it is, not as a single menu. Every dish has a home state, and every drink is
            built to sit beside it on the table.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-rule/40 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-fg-muted">{s.label}</dt>
                <dd className="font-display text-4xl text-accent-text">
                  <span data-count={s.value}>{s.value}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="ghost" className="mt-10">
            <Link to="/about">
              Read the story <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
