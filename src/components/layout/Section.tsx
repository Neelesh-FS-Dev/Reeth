import type { ElementType, HTMLAttributes, Ref } from 'react'
import { cn } from '../../lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** "night" switches the section to the dark navy theme via data-theme. */
  theme?: 'light' | 'night'
  as?: ElementType
  /** React 19 passes ref as a prop, so it is forwarded to the section element here. */
  ref?: Ref<HTMLElement>
}

export function Section({ theme = 'light', as: Tag = 'section', className, children, ref, ...props }: SectionProps) {
  return (
    <Tag
      ref={ref}
      data-theme={theme === 'night' ? 'night' : undefined}
      className={cn('section-space relative bg-bg text-fg', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
