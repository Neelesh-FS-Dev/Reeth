import { Link } from 'react-router-dom'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import type { CareerRole } from '../../types'

export function RoleAccordionItem({ role }: { role: CareerRole }) {
  return (
    <AccordionItem value={role.id}>
      <AccordionTrigger>
        <span>
          {role.title}
          <span className="ml-3 align-middle text-sm font-sans text-fg-muted">{role.department}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-lg text-fg">{role.summary}</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-fg">What you will do</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {role.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-fg">What we are looking for</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {role.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
        <Button asChild variant="ghost" className="mt-6">
          <Link to={`/careers?role=${role.id}#apply`}>Apply for {role.title}</Link>
        </Button>
      </AccordionContent>
    </AccordionItem>
  )
}
