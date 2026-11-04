// Single source for business facts. Anything marked PLACEHOLDER must be confirmed by the owner.
// Swapping these values (and files in public/) is the only change needed to go live.

export const siteConfig = {
  name: 'Reeth',
  legalName: 'Reeth Restaurant & Bar', // PLACEHOLDER
  tagline: 'Spice & Spirit',
  description:
    'Modern Indian dining and bar in Baner, Pune. Regional recipes from across India, paired with signature cocktails and chaknas for sharing.',
  url: 'https://reeth.example', // PLACEHOLDER
  locale: 'en_IN',
  /** Concept-sample ribbon. Flip to false before the pitch is sent. */
  showDemoBanner: true,
  demoBannerText: 'Concept sample by [agency]', // PLACEHOLDER
  phone: '+91 XXXXX XXXXX', // PLACEHOLDER
  phoneHref: 'tel:+91XXXXXXXXXX', // PLACEHOLDER
  email: 'hello@reeth.example', // PLACEHOLDER
  address: {
    line1: 'Street address to follow', // PLACEHOLDER
    area: 'Baner',
    city: 'Pune',
    region: 'Maharashtra',
    country: 'India',
    postalCode: '', // PLACEHOLDER
  },
  /** Indicative hours. PLACEHOLDER. */
  hours: [
    { days: 'Monday to Sunday', open: '12:00', close: '00:00' },
  ],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baner+Pune', // PLACEHOLDER
  reservationUrl: '#', // PLACEHOLDER: swap for the booking provider link
  orderUrl: '#', // PLACEHOLDER
  social: {
    instagram: 'https://www.instagram.com/reeth.india', // handle @reeth.india
    handle: '@reeth.india',
    facebook: '#', // PLACEHOLDER
    youtube: '#', // PLACEHOLDER
  },
  priceRange: '₹₹₹', // PLACEHOLDER
  servesCuisine: 'Indian',
  slots: ['12:00', '13:00', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
} as const

export type SiteConfig = typeof siteConfig
