import { Link } from 'react-router-dom'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'
import { reserveBand } from '../../data/copy'

export function ReserveCTA() {
  return (
    <Section theme="night" aria-labelledby="reserve-cta-title" className="grain overflow-hidden !py-20 md:!py-28">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="reserve-cta-title">{reserveBand.headline}</h2>
          <p className="mt-4 text-lg text-fg-muted">{reserveBand.body}</p>
        </div>
        <Button asChild size="lg">
          <Link to="/contact">Reserve a table</Link>
        </Button>
      </Container>
    </Section>
  )
}
