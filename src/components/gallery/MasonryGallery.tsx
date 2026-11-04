import { Picture } from '../brand/Picture'
import type { LightboxItem } from './Lightbox'

export interface MasonryItem extends LightboxItem {
  id: string
  ratio: number
}

/** CSS-columns masonry. Each tile is a button that opens the lightbox at its index. */
export function MasonryGallery({ items, onOpen }: { items: MasonryItem[]; onOpen: (index: number) => void }) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
      {items.map((item, i) => (
        <li key={item.id} className="mb-4 break-inside-avoid">
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="group block w-full overflow-hidden rounded-2xl text-left focus-visible:rounded-2xl"
            aria-label={`Open photo: ${item.caption}`}
          >
            <Picture
              name={item.image}
              alt={item.alt}
              aspect={item.ratio}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
