import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'
import { ReelCard } from '../reels/ReelCard'
import { ReelModal } from '../reels/ReelModal'
import { reels } from '../../data/reels'
import { useReveal } from '../../animations/useReveal'

export function ReelsStrip() {
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState<number | null>(null)
  useReveal(ref)

  return (
    <Section ref={ref} aria-labelledby="reels-strip-title">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="script text-3xl text-accent-text">In motion</p>
            <h2 id="reels-strip-title" className="mt-2">
              Reels
            </h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/reels">
              Gallery <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
      <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reels.map((r, i) => (
          <li key={r.id} data-reveal className="w-[62vw] shrink-0 snap-start sm:w-56 lg:w-64">
            <ReelCard reel={r} onOpen={() => setIndex(i)} />
          </li>
        ))}
      </ul>
      <ReelModal reels={reels} index={index} onIndexChange={setIndex} />
    </Section>
  )
}
