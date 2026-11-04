import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { PackageCard } from '../components/catering/PackageCard'
import { EnquiryForm } from '../components/catering/EnquiryForm'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { packages, sampleMenus } from '../data/packages'
import { pageIntros } from '../data/copy'

export default function CateringPage() {
  return (
    <>
      <Seo path="/catering" />
      <PageHeader
        eyebrow="Catering"
        title="Reeth, at your table"
        intro={pageIntros.catering}
        image={{ name: 'catering-hero', alt: 'A long table set for a celebration with brass platters and warm light' }}
      />

      <Section className="!pt-4">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <li key={p.id} data-reveal>
                <PackageCard pkg={p} featured={p.id === 'celebration'} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-fg-muted">Per-guest prices are indicative. Taxes, service and travel are confirmed in your quote.</p>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <p className="script text-3xl text-accent-text">Sample menus</p>
            <h2 className="mt-2 text-4xl">A starting point</h2>
            <p className="mt-4 text-fg-muted">Every menu is tailored to your guests and the season. These are examples of what we cook.</p>
            <Accordion type="single" collapsible className="mt-8">
              {sampleMenus.map((m) => (
                <AccordionItem key={m.id} value={m.id}>
                  <AccordionTrigger>{m.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-1 pl-5">
                      {m.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="rounded-[2rem] border border-rule/30 bg-bg p-6 md:p-10">
            <EnquiryForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
