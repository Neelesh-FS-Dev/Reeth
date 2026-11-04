import { Picture } from '../brand/Picture'
import { DietaryBadge } from './DietaryBadge'
import { formatINR } from '../../lib/formatters'
import type { MenuItem } from '../../types'

/** One dish or drink: name, description, price and the veg / non-veg mark. */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-rule/30 bg-surface">
      <Picture name={item.image} alt="" aspect={16 / 10} sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw" className="rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <DietaryBadge veg={item.veg} />
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl">{item.name}</h2>
          <p className="shrink-0 font-display text-xl text-accent-text" aria-label={`Price ${formatINR(item.price)}`}>
            {formatINR(item.price)}
          </p>
        </div>
        <p className="text-fg-muted">{item.description}</p>
      </div>
    </article>
  )
}
