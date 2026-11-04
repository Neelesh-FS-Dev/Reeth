import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../animations/gsap'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { Picture } from '../brand/Picture'
import { introCopy } from '../../data/copy'
import { useParallax } from '../../animations/useParallax'

export function Intro() {
  const ref = useRef<HTMLElement>(null)
  useParallax(ref)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Line-by-line mask reveal, triggered once the quote enters the viewport.
      gsap.from('[data-lines] .line-mask > span', {
        yPercent: 110,
        stagger: 0.12,
        duration: 1.1,
        scrollTrigger: { trigger: '[data-lines]', start: 'top 78%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} aria-labelledby="intro-title">
      <Container className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="script text-3xl text-accent-text md:text-4xl">Our house</p>
          <h2 id="intro-title" className="sr-only">
            About Reeth
          </h2>
          <blockquote data-lines className="mt-4 font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.08] text-fg">
            {introCopy.quoteLines.map((line) => (
              <span key={line} className="line-mask">
                <span>{line}</span>
              </span>
            ))}
          </blockquote>
        </div>
        <div className="grid gap-6 md:col-span-5">
          <p data-reveal className="text-lg text-fg-muted">
            {introCopy.body}
          </p>
          <div className="arch relative aspect-[4/5] overflow-hidden">
            <div data-parallax className="h-[116%] -mt-[8%]">
              <Picture
                name="intro"
                alt="Hands plating a small chakna on a steel tray"
                aspect={4 / 5}
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
