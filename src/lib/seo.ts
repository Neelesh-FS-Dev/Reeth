import { siteConfig } from '../data/site.config'

export interface RouteMeta {
  title: string
  description: string
}

// Keep in sync with the route list in src/app/routes.tsx and scripts/generate-seo.mjs.
export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Reeth | Modern Indian Dining and Bar in Baner, Pune',
    description: siteConfig.description,
  },
  '/menu': {
    title: 'Menu | Reeth',
    description: 'Chaknas, mains, signature cocktails, bar bites and desserts. Regional Indian cooking in Baner, Pune.',
  },
  '/events': {
    title: 'Events | Reeth',
    description: 'Live music, pop-ups, chef dinners and cocktail workshops at Reeth, Baner, Pune.',
  },
  '/reels': {
    title: 'Reels and Gallery | Reeth',
    description: 'Watch the room, the bar and the kitchen. Photos and reels from Reeth, Baner, Pune.',
  },
  '/about': {
    title: 'About | Reeth',
    description: 'The story behind Reeth: regional Indian recipes, craft cocktails and a warm room in Baner, Pune.',
  },
  '/catering': {
    title: 'Catering | Reeth',
    description: 'Intimate, celebration and grand catering packages with regional menus and cocktail counters.',
  },
  '/careers': {
    title: 'Careers | Reeth',
    description: 'Open roles in the kitchen, front of house and bar at Reeth, Baner, Pune.',
  },
  '/contact': {
    title: 'Reserve a Table | Reeth',
    description: 'Book a table at Reeth in Baner, Pune, or send an enquiry. Hours, address and contact details.',
  },
}
