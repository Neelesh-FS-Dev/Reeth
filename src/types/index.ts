// Shared content types. Business content lives in src/data/ and conforms to these shapes.

export type MenuCategoryId = 'chaknas' | 'mains' | 'cocktails' | 'bar-bites' | 'desserts'

export type DietFilter = 'all' | 'veg' | 'non-veg' | 'gluten-free'

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  blurb: string
}

export interface MenuItem {
  id: string
  category: MenuCategoryId
  name: string
  description: string
  /** Indicative price in INR. PLACEHOLDER until the owner confirms. */
  price: number
  veg: boolean
  glutenFree?: boolean
  chefsPick?: boolean
  mustTry?: boolean
  /** Key into the image manifest (see src/lib/images.ts). */
  image: string
}

export type EventKind =
  | 'live-music'
  | 'popup'
  | 'themed-night'
  | 'workshop'
  | 'chef-collab'
  | 'festival'
  | 'regional-menu'

export type EventStatus = 'open' | 'few-seats' | 'sold-out'

export interface EventItem {
  slug: string
  title: string
  kind: EventKind
  /** ISO date, YYYY-MM-DD. */
  date: string
  time: string
  description: string
  status: EventStatus
  image: string
}

export interface ReelItem {
  id: string
  title: string
  date: string
  /** Video files live in public/video/. */
  src: string
  poster: string
}

export type GalleryCategory = 'Food' | 'Drinks' | 'Ambience' | 'Events' | 'Team'

export interface GalleryPhoto {
  id: string
  category: GalleryCategory
  image: string
  alt: string
  caption: string
  /** Used by the lightbox and the masonry layout. */
  ratio: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export interface CareerRole {
  id: string
  department: 'Kitchen' | 'Front of House' | 'Bar'
  title: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export interface CateringPackage {
  id: string
  name: string
  /** Per-head price in INR. PLACEHOLDER. */
  perHead: number
  guests: string
  included: string[]
  blurb: string
}

export interface Highlight {
  id: string
  name: string
  description: string
  tag: string
  image: string
}

export interface Region {
  id: string
  state: string
  dish: string
  note: string
  /** Hex used for the tile's accent band. */
  tone: string
  /** Key into the image manifest. */
  image: string
}

export interface Value {
  id: string
  title: string
  body: string
}

export interface StoryChapter {
  id: string
  heading: string
  body: string
}
