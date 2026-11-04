import { imageUrl, srcSet } from '../../lib/images'
import { cn } from '../../lib/utils'

export interface PictureProps {
  /** Base name of the image in the manifest, e.g. "hero" or "menu-main-1". */
  name: string
  alt: string
  /** Width / height. The wrapper reserves this space to prevent layout shift. */
  aspect?: number
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
}

/** Responsive AVIF, WebP and JPEG picture with reserved aspect ratio (CLS guard). */
export function Picture({
  name,
  alt,
  aspect = 4 / 3,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  className,
  imgClassName,
}: PictureProps) {
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)} style={{ aspectRatio: aspect }}>
      <picture className="block h-full w-full">
        <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet(name, 'webp')} sizes={sizes} />
        <img
          src={imageUrl(name, 1200, 'jpg')}
          srcSet={srcSet(name, 'jpg')}
          sizes={sizes}
          width={1200}
          height={Math.round(1200 / aspect)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </picture>
    </div>
  )
}
