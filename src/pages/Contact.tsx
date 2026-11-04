import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { ReservationForm } from '../components/contact/ReservationForm'
import { ContactInfo, MapPlaceholder } from '../components/contact/ContactInfo'
import { pageIntros } from '../data/copy'

export default function ContactPage() {
  return (
    <>
      <Seo path="/contact" />
      <PageHeader eyebrow="Reservations" title="Book your table" intro={pageIntros.contact} />
      <Section className="!pt-4">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="rounded-[2rem] border border-rule/30 bg-surface p-6 md:p-10">
            <ReservationForm />
          </div>
          <div className="grid gap-12">
            <ContactInfo />
            <MapPlaceholder />
          </div>
        </Container>
      </Section>
    </>
  )
}
