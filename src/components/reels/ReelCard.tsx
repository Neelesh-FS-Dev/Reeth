import { Play } from 'lucide-react'
import { formatEventDate } from '../../lib/formatters'
import type { ReelItem } from '../../types'

/** 9:16 reel thumbnail button. Opens the ReelModal at its index. */
export function ReelCard({ reel, onOpen, className }: { reel: ReelItem; onOpen: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-surface text-left ${className ?? ''}`}
      aria-label={`Play reel: ${reel.title}`}
    >
      <img
        src={reel.poster}
        alt=""
        width={1080}
        height={1920}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/85 via-brand-navy-deep/10 to-transparent" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-cream/90 text-brand-navy-deep shadow-lg transition-transform group-hover:scale-110">
        <Play aria-hidden="true" className="size-6 translate-x-0.5" fill="currentColor" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-brand-cream">
        <span className="block font-display text-xl leading-tight">{reel.title}</span>
        <span className="text-xs text-brand-cream/75">{formatEventDate(reel.date).long}</span>
      </span>
    </button>
  )
}
