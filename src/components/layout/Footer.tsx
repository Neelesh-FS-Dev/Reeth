import { Link } from 'react-router-dom'
import { InstagramIcon as Instagram, FacebookIcon as Facebook, YouTubeIcon as Youtube } from '../brand/SocialIcons'
import { Logo } from '../brand/Logo'
import { Section } from './Section'
import { Container } from './Container'
import { siteConfig } from '../../data/site.config'
import { navLinks } from './nav'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <Section theme="night" as="footer" className="!py-16 md:!py-20" aria-label="Site footer">
      <Container className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo variant="dark" size={72} />
          <p className="script mt-6 text-3xl text-accent-text">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-xs text-fg-muted">{siteConfig.description}</p>
        </div>

        <div>
          <h2 className="font-display text-xl text-fg">Visit</h2>
          <address className="mt-4 not-italic text-fg-muted">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.area}, {siteConfig.address.city}
            <br />
            {siteConfig.address.region}, {siteConfig.address.country}
          </address>
          <p className="mt-4 text-fg-muted">
            <a className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:text-accent-text" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
            <br />
            <a className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:text-accent-text" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            {siteConfig.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.open} to {h.close}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl text-fg">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link className="inline-flex min-h-11 items-center text-fg-muted hover:text-accent-text" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="inline-flex min-h-11 items-center text-fg-muted hover:text-accent-text" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <a
              href={siteConfig.social.instagram}
              aria-label={`Instagram, ${siteConfig.social.handle}`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-rule/50 text-fg hover:text-accent-text"
              rel="noopener"
            >
              <Instagram aria-hidden="true" className="size-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook (link to follow)"
              className="inline-flex size-11 items-center justify-center rounded-full border border-rule/50 text-fg hover:text-accent-text"
            >
              <Facebook aria-hidden="true" className="size-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              aria-label="YouTube (link to follow)"
              className="inline-flex size-11 items-center justify-center rounded-full border border-rule/50 text-fg hover:text-accent-text"
            >
              <Youtube aria-hidden="true" className="size-5" />
            </a>
          </div>
        </div>
      </Container>
      <Container className="mt-14 flex flex-col gap-2 border-t border-rule/25 pt-6 text-sm text-fg-muted md:flex-row md:justify-between">
        <p>
          © {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <p>Sample prices and details are indicative.</p>
      </Container>
    </Section>
  )
}
