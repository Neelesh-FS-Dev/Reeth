import type { GalleryPhoto } from '../types'

// Gallery photos are placeholder artwork. Ratio is width / height.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 'g1', category: 'Food', image: 'gallery-1', alt: 'Charred paneer tikka on a steel platter', caption: 'Pahadi paneer tikka', ratio: 0.75 },
  { id: 'g2', category: 'Drinks', image: 'gallery-2', alt: 'A coupe glass with a saffron-gold cocktail and a rim of chilli salt', caption: 'Saffron Sour', ratio: 1 },
  { id: 'g3', category: 'Ambience', image: 'gallery-3', alt: 'Warm pendant lights over dark wooden tables', caption: 'The main room', ratio: 1.5 },
  { id: 'g4', category: 'Events', image: 'gallery-4', alt: 'A long table set for a dinner with brass lamps', caption: 'Chef collaboration dinner', ratio: 0.8 },
  { id: 'g5', category: 'Food', image: 'gallery-5', alt: 'A thali with small bowls of curry and rice', caption: 'Saraswat thali', ratio: 1.2 },
  { id: 'g6', category: 'Team', image: 'gallery-6', alt: 'Kitchen team plating dishes under a warm lamp', caption: 'Line before service', ratio: 0.7 },
  { id: 'g7', category: 'Drinks', image: 'gallery-7', alt: 'Copper mugs on a bar top beside a row of bottles', caption: 'Jaggery mule', ratio: 0.9 },
  { id: 'g8', category: 'Ambience', image: 'gallery-8', alt: 'Arched doorway glowing amber at dusk', caption: 'The arch at the entrance', ratio: 0.8 },
  { id: 'g9', category: 'Events', image: 'gallery-9', alt: 'A live jazz trio on a small stage', caption: 'Jazz & Jaipur Nights', ratio: 1.4 },
  { id: 'g10', category: 'Food', image: 'gallery-10', alt: 'A bowl of dal with a swirl of cream', caption: 'Dal Bukhara', ratio: 1 },
  { id: 'g11', category: 'Team', image: 'gallery-11', alt: 'Two bartenders smiling over the back bar', caption: 'Behind the bar', ratio: 0.75 },
  { id: 'g12', category: 'Drinks', image: 'gallery-12', alt: 'A lime wedge and an ice sphere on a dark glass', caption: 'Kokum Collins', ratio: 1.1 },
]

export const pastGalleryPhotos: GalleryPhoto[] = galleryPhotos.filter((p) =>
  ['g4', 'g9', 'g2', 'g8', 'g5', 'g12'].includes(p.id),
)

