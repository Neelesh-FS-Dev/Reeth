import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const fieldBase =
  'w-full rounded-2xl border border-fg/20 bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 min-h-11 transition-colors focus:border-accent aria-[invalid=true]:border-ember'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldBase, className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, 'min-h-28 resize-y', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

// One chevron, drawn once, placed at a fixed inset so every browser shows it in the same spot.
const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232A1B12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"

export const NativeSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        fieldBase,
        'appearance-none bg-no-repeat pe-11 [background-image:var(--select-chevron)] bg-[position:right_1rem_center] bg-[length:16px_16px] cursor-pointer',
        className,
      )}
      style={{ ['--select-chevron' as string]: chevron }}
      {...props}
    >
      {children}
    </select>
  ),
)
NativeSelect.displayName = 'NativeSelect'
