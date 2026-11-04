import { Maximize2 } from 'lucide-react'
import { ReelPlayer } from './ReelPlayer'
import type { ReelItem } from '../../types'
import { formatEventDate } from '../../lib/formatters'

/** Reel tile: inline player (focus or hover plays it) plus an expand button that opens the full player. */
export function ReelCard({ reel, onOpen }: { reel: ReelItem; onOpen: () => void }) {
  return (
    <div className="relative">
      <ReelPlayer reel={reel}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
          aria-label={`Expand reel: ${reel.title}`}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full border border-brand-cream/40 bg-brand-navy-deep/40 text-brand-cream backdrop-blur-sm hover:border-brand-saffron hover:text-brand-saffron"
        >
          <Maximize2 aria-hidden="true" className="size-4" />
        </button>
      </ReelPlayer>
      <p className="sr-only">Posted {formatEventDate(reel.date).long}</p>
    </div>
  )
}
