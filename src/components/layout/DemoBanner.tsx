import { siteConfig } from '../../data/site.config'

/** Concept-sample ribbon with a link to the designer's site. Set showDemoBanner to false in site.config.ts to remove it. */
export function DemoBanner() {
  if (!siteConfig.showDemoBanner) return null
  return (
    <div className="bg-brand-navy-deep px-4 py-2 text-center text-xs tracking-[0.14em] text-brand-saffron uppercase">
      {siteConfig.demoBannerText}{' '}
      <a
        href={siteConfig.demoBannerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-brand-cream"
      >
        {siteConfig.demoBannerLinkText}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  )
}
