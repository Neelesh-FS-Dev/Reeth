import { siteConfig } from '../../data/site.config'

/** Concept-sample ribbon. Set showDemoBanner to false in site.config.ts to remove it. */
export function DemoBanner() {
  if (!siteConfig.showDemoBanner) return null
  return (
    <div className="bg-brand-navy-deep px-4 py-2 text-center text-xs tracking-[0.14em] text-brand-saffron uppercase">
      {siteConfig.demoBannerText}
    </div>
  )
}
