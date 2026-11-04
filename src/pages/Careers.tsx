import { Seo } from '../components/layout/Seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Container } from '../components/layout/Container'
import { Accordion } from '../components/ui/accordion'
import { RoleAccordionItem } from '../components/careers/RoleCard'
import { ApplicationForm } from '../components/careers/ApplicationForm'
import { roles } from '../data/roles'
import { pageIntros } from '../data/copy'

const departments = ['Kitchen', 'Front of House', 'Bar'] as const

export default function CareersPage() {
  return (
    <>
      <Seo path="/careers" />
      <PageHeader
        eyebrow="Work with us"
        title="Cook, host and pour with us"
        intro={pageIntros.careers}
        image={{ name: 'careers-hero', alt: 'The Reeth team gathered in the kitchen before service' }}
      />

      <Section className="!pt-4">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-4xl">Open roles</h2>
            <p className="mt-3 text-fg-muted">Open a role to see what the job involves and what we are looking for.</p>
            {departments.map((dept) => {
              const list = roles.filter((r) => r.department === dept)
              return (
                <div key={dept} className="mt-10">
                  <h3 className="script text-3xl text-accent-text">{dept}</h3>
                  <Accordion type="single" collapsible className="mt-3">
                    {list.map((r) => (
                      <RoleAccordionItem key={r.id} role={r} />
                    ))}
                  </Accordion>
                </div>
              )
            })}
          </div>
          <div className="rounded-[2rem] border border-rule/30 bg-surface p-6 md:p-10">
            <ApplicationForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
