import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import { formatINR } from '../../lib/formatters'
import type { CateringPackage } from '../../types'

export function PackageCard({ pkg, featured = false }: { pkg: CateringPackage; featured?: boolean }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] border p-8 ${featured ? 'border-accent bg-surface shadow-xl' : 'border-rule/35 bg-surface'}`}
    >
      <p className="text-sm uppercase tracking-[0.16em] text-fg-muted">{pkg.guests}</p>
      <h3 className="mt-2 text-3xl">{pkg.name}</h3>
      <p className="mt-2 text-fg-muted">{pkg.blurb}</p>
      <p className="mt-6 font-display text-4xl text-accent-text">
        {formatINR(pkg.perHead)}
        <span className="ml-2 font-body text-base text-fg-muted">per guest, indicative</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.included.map((item) => (
          <li key={item} className="flex gap-3 text-fg">
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent-text" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button asChild className="mt-8 w-full">
        <Link to={`/catering?package=${pkg.id}#enquiry`}>Request this package</Link>
      </Button>
    </article>
  )
}
