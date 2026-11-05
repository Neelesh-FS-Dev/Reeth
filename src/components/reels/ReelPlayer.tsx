import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import type { ReelItem } from '../../types'
import { cn } from '../../lib/utils'

/**
 * Inline reel. Plays only while the card is focused or hovered and on screen; pauses otherwise.
 * Starts muted (browsers block unmuted autoplay). The sound button turns sound on, and that choice
 * sticks for later plays. The play button pauses until the card is focused again.
 */
export function ReelPlayer({ reel, children }: { reel: ReelItem; children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const visible = useInView(wrap, { rootMargin: '0px' })
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [manualPause, setManualPause] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const active = (focused || hovered) && visible

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.muted = muted
    if (active && !manualPause) {
      v.play().catch(() => setPlaying(false))
    } else {
      v.pause()
    }
  }, [active, manualPause, muted])

  const toggle = () => setManualPause((p) => !p)

  return (
    <div
      ref={wrap}
      // The card is focusable on purpose: focusing it starts the reel.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      role="group"
      aria-label={`Reel: ${reel.title}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-surface outline-none focus-visible:ring-2 focus-visible:ring-rule focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      onFocus={() => {
        setFocused(true)
        setManualPause(false)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
      onPointerEnter={() => {
        setHovered(true)
        setManualPause(false)
      }}
      onPointerLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- reels carry no spoken dialogue */}
      <video
        ref={video}
        className="h-full w-full object-cover"
        muted={muted}
        playsInline
        loop
        preload="none"
        poster={reel.poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={reel.title}
      >
        <source src={reel.src} type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-brand-navy-deep/85 to-transparent p-3 pt-10">
        <span className="min-w-0 truncate font-display text-lg text-brand-cream">{reel.title}</span>
        <div className="flex shrink-0 gap-1">
          <IconButton label={playing && !manualPause ? 'Pause reel' : 'Play reel'} onClick={toggle}>
            {playing && !manualPause ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </IconButton>
          <IconButton
            label={muted ? 'Turn sound on' : 'Turn sound off'}
            onClick={() => setMuted((m) => !m)}
            active={!muted}
          >
            {muted ? <VolumeX aria-hidden="true" className="size-4" /> : <Volume2 aria-hidden="true" className="size-4" />}
          </IconButton>
        </div>
      </div>
      {children}
    </div>
  )
}

function IconButton({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string
  onClick: () => void
  active?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full border border-brand-cream/40 text-brand-cream backdrop-blur-sm transition-colors hover:border-brand-saffron hover:text-brand-saffron',
        active && 'bg-brand-saffron text-brand-navy-deep',
      )}
    >
      {children}
    </button>
  )
}
