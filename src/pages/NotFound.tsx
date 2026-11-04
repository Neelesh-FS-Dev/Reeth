import { Link } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/button'

export default function NotFoundPage() {
  return (
    <>
      <Seo path="/404" />
      <meta name="robots" content="noindex" />
      <Section theme="night" className="grain flex min-h-[70dvh] items-center">
        <Container className="max-w-2xl">
          <p className="script text-4xl text-accent-text">Not found</p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)]">This table is not set.</h1>
          <p className="mt-6 text-lg text-fg-muted">The page you are looking for has moved or never existed. Let us find you a seat elsewhere.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/">Back home</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/menu">See the menu</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
