import { Seo } from '../components/layout/Seo'
import { Hero } from '../components/home/Hero'
import { Intro } from '../components/home/Intro'
import { Highlights } from '../components/home/Highlights'
import { RegionalJourney } from '../components/home/RegionalJourney'
import { EventsTeaser } from '../components/home/EventsTeaser'
import { ReelsStrip } from '../components/home/ReelsStrip'
import { AboutTeaser } from '../components/home/AboutTeaser'
import { ReserveCTA } from '../components/home/ReserveCTA'
import { Marquee } from '../components/layout/Marquee'
import { restaurantJsonLd } from '../lib/schema'

export default function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={restaurantJsonLd()} />
      <Hero />
      <Intro />
      <Highlights />
      <Marquee items={['Chaknas', 'Regional mains', 'Signature cocktails', 'Pop-ups', 'Live nights']} />
      <RegionalJourney />
      <EventsTeaser />
      <ReelsStrip />
      <AboutTeaser />
      <ReserveCTA />
    </>
  )
}
