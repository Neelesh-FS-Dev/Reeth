import { siteConfig } from '../data/site.config'

/** JSON-LD for the Restaurant entity. Address and phone are placeholders until confirmed. */
export function restaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    servesCuisine: siteConfig.servesCuisine,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.area,
      addressRegion: siteConfig.address.region,
      addressCountry: 'IN',
    },
    sameAs: [siteConfig.social.instagram],
  }
}
