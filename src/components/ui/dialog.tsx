import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export function DialogPortal({ children }: { children: ReactNode }) {
  return <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
}

export function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-brand-navy-deep/70 backdrop-blur-[2px]', className)}
      {...props}
    />
  )
}

const contentVariants = cva(
  'fixed z-50 bg-bg text-fg shadow-2xl outline-none focus-visible:outline-none',
  {
    variants: {
      side: {
        center:
          'left-1/2 top-1/2 max-h-[90dvh] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl p-6 md:p-8',
        full: 'inset-0 h-dvh w-full overflow-hidden',
        right: 'inset-y-0 right-0 h-dvh w-[min(88vw,400px)] overflow-y-auto p-6',
      },
    },
    defaultVariants: { side: 'center' },
  },
)

export function DialogContent({
  className,
  children,
  side,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & VariantProps<typeof contentVariants>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content className={cn(contentVariants({ side }), className)} {...props}>
        {children}
        <DialogPrimitive.Close
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full text-fg hover:text-accent-text"
          aria-label="Close"
        >
          <X aria-hidden="true" className="size-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
