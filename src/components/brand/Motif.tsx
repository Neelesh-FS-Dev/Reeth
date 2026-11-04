import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/** Thin saffron rule, used between headings and body copy. */
export function Rule({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('my-6 h-px w-16 border-0 bg-rule', className)} {...props} />
}

/** Jharokha-inspired arch frame wrapper. Pass children that fill the arch. */
export function ArchFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('arch border border-rule/60 bg-surface', className)}>{children}</div>
}

/** Decorative block-print texture behind a section. Never carries meaning. */
export function BlockPrint({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('block-print pointer-events-none absolute inset-0', className)} />
}
