import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { imageUrl, srcSet } from '../../lib/images'

export interface LightboxItem {
  image: string
  alt: string
  caption: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number | null) => void
}

/** Photo lightbox: arrow keys, buttons, swipe, caption. Focus returns to the opener on close. */
export function Lightbox({ items, index, onIndexChange }: LightboxProps) {
  const open = index !== null
  const current = index !== null ? items[index] : undefined
  const touchX = useRef<number | null>(null)

  const go = (delta: number) => {
    if (index === null || items.length === 0) return
    onIndexChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // go is recreated each render from index and items; the effect re-binds with them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, items.length])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onIndexChange(null)}>
      <DialogContent
        side="full"
        aria-describedby="lightbox-caption"
        className="flex flex-col bg-brand-navy-deep text-brand-cream"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <DialogTitle className="sr-only">Photo viewer</DialogTitle>
        {current ? (
          <>
            <div className="relative flex flex-1 items-center justify-center p-4 md:p-12">
              <img
                key={current.image}
                src={imageUrl(current.image, 1800, 'jpg')}
                srcSet={srcSet(current.image, 'jpg')}
                sizes="100vw"
                alt={current.alt}
                className="max-h-[78dvh] w-auto max-w-full rounded-2xl object-contain"
                decoding="async"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 pb-6">
              <Button variant="ghost" size="icon" aria-label="Previous photo" onClick={() => go(-1)} className="text-brand-cream">
                <ChevronLeft aria-hidden="true" className="size-6" />
              </Button>
              <DialogDescription id="lightbox-caption" className="text-center text-brand-cream/90">
                {current.caption}
                <span className="sr-only"> ({(index ?? 0) + 1} of {items.length})</span>
              </DialogDescription>
              <Button variant="ghost" size="icon" aria-label="Next photo" onClick={() => go(1)} className="text-brand-cream">
                <ChevronRight aria-hidden="true" className="size-6" />
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
