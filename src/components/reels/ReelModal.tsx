import { useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import type { ReelItem } from '../../types'
import { formatEventDate } from '../../lib/formatters'

interface ReelModalProps {
  reels: ReelItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

/**
 * Reel player. Full screen on phones, centred 9:16 frame on desktop. The video mounts only
 * when open (lazy) and unmounts on close (pauses). Arrow keys, Escape, buttons and vertical swipes.
 */
export function ReelModal({ reels, index, onIndexChange }: ReelModalProps) {
  const open = index !== null
  const reel = index !== null ? reels[index] : undefined
  const startY = useRef<number | null>(null)

  const step = (delta: number) => {
    if (index === null || reels.length === 0) return
    onIndexChange((index + delta + reels.length) % reels.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // step closes over index and reels; re-bind when they change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, reels.length])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onIndexChange(null)}>
      <DialogContent
        side="full"
        aria-describedby="reel-desc"
        className="flex flex-col items-center justify-center bg-brand-navy-deep text-brand-cream md:inset-auto md:left-1/2 md:top-1/2 md:h-[min(88dvh,760px)] md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl"
        onTouchStart={(e) => (startY.current = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          if (startY.current === null) return
          const dy = e.changedTouches[0].clientY - startY.current
          if (Math.abs(dy) > 60) step(dy < 0 ? 1 : -1)
          startY.current = null
        }}
      >
        <DialogTitle className="sr-only">{reel ? reel.title : 'Reel player'}</DialogTitle>
        {reel ? (
          <>
            <div className="relative flex min-h-0 flex-1 items-center justify-center p-3">
              <video
                key={reel.id}
                className="h-full max-h-full w-auto max-w-full rounded-2xl bg-black object-contain aspect-[9/16]"
                autoPlay
                muted
                controls
                playsInline
                preload="metadata"
                poster={reel.poster}
                aria-label={reel.title}
              >
                <source src={reel.webm} type="video/webm" />
                <source src={reel.src} type="video/mp4" />
              </video>
            </div>
            <div className="flex w-full items-center justify-between gap-3 px-4 pb-4">
              <DialogDescription id="reel-desc" className="min-w-0 text-brand-cream/90">
                <span className="block truncate font-display text-lg">{reel.title}</span>
                <span className="text-sm text-brand-cream/70">{formatEventDate(reel.date).long}</span>
              </DialogDescription>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" aria-label="Previous reel" onClick={() => step(-1)} className="text-brand-cream">
                  <ChevronUp aria-hidden="true" className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next reel" onClick={() => step(1)} className="text-brand-cream">
                  <ChevronDown aria-hidden="true" className="size-5" />
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
