import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { ReelItem } from '../../types'
import { cn } from '../../lib/utils'

/**
 * Vertical reel shown beside the hero copy. Loops muted while it is on screen and not paused.
 * Pauses off screen. Reduced motion starts paused on the poster frame; the play button still works.
 * The sound button turns sound on for the viewer's own choice.
 */
export function HeroVideo({ reel, className, arch }: { reel: ReelItem; className?: string; arch?: boolean }) {
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const visible = useInView(frame)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = muted
    if (visible && playing && !reduced) {
      v.play().catch(() => setPlaying(false))
    } else {
      v.pause()
    }
  }, [visible, playing, muted, reduced])

  return (
    <figure ref={frame} className={cn('relative mx-auto w-full max-w-[340px]', className)}>
      <div className={cn('relative aspect-[9/16] overflow-hidden border border-rule/40 bg-surface shadow-2xl', arch ? 'rounded-[var(--radius-arch)]' : 'rounded-[2rem]')}>
        {/* Reels carry no spoken dialogue, so there are no caption tracks to attach. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={video}
          className="h-full w-full object-cover"
          loop
          muted={muted}
          playsInline
          preload="metadata"
          poster={reel.poster}
          aria-label={`Reeth reel: ${reel.title}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={reel.src} type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-brand-navy-deep/90 to-transparent p-4 pt-14">
          <figcaption className="min-w-0 truncate font-display text-lg text-brand-cream">{reel.title}</figcaption>
          <div className="flex shrink-0 gap-2">
            <ControlButton label={playing ? 'Pause video' : 'Play video'} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            </ControlButton>
            <ControlButton label={muted ? 'Turn sound on' : 'Turn sound off'} onClick={() => setMuted((m) => !m)} active={!muted}>
              {muted ? <VolumeX aria-hidden="true" className="size-4" /> : <Volume2 aria-hidden="true" className="size-4" />}
            </ControlButton>
          </div>
        </div>
      </div>
    </figure>
  )
}

function ControlButton({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full border border-brand-cream/40 text-brand-cream backdrop-blur-sm transition-colors hover:border-brand-saffron hover:text-brand-saffron',
        active && 'bg-brand-saffron text-brand-navy-deep',
      )}
    >
      {children}
    </button>
  )
}
