import type { ReactNode } from 'react'
import { Section } from './Section'
import { Container } from './Container'
import { Picture } from '../brand/Picture'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  intro: string
  theme?: 'light' | 'night'
  image?: { name: string; alt: string }
}

/** Shared page header: script eyebrow, the page's single H1, intro, optional arch image. */
export function PageHeader({ eyebrow, title, intro, theme = 'light', image }: PageHeaderProps) {
  return (
    <Section theme={theme} className="!pb-12 !pt-16 md:!pt-24" aria-labelledby="page-title">
      <Container className={image ? 'grid items-center gap-12 md:grid-cols-12' : 'max-w-3xl'}>
        <div className={image ? 'md:col-span-7' : undefined}>
          <p className="script text-3xl text-accent-text md:text-4xl">{eyebrow}</p>
          <h1 id="page-title" className="mt-3 text-[clamp(2.5rem,6vw,5.5rem)]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-muted md:text-xl">{intro}</p>
        </div>
        {image ? (
          <div className="md:col-span-5">
            <Picture name={image.name} alt={image.alt} aspect={4 / 5} sizes="(min-width: 768px) 40vw, 100vw" className="arch" priority />
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
