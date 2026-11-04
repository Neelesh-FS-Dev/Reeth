import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Picture } from '../brand/Picture'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { highlights } from '../../data/highlights'
import { useReveal } from '../../animations/useReveal'

export function Highlights() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <Section ref={ref} aria-labelledby="highlights-title" className="bg-surface">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="script text-3xl text-accent-text">Start here</p>
            <h2 id="highlights-title" className="mt-2">
              Signature highlights
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/menu">
              Full menu <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <li key={h.id} data-reveal className="group">
              <Picture name={h.image} alt={`${h.name}, plated for the menu`} aspect={4 / 5} className="rounded-[2rem]" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="text-2xl">{h.name}</h3>
              </div>
              <Badge tone="accent" className="mt-2">
                {h.tag}
              </Badge>
              <p className="mt-2 text-fg-muted">{h.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
