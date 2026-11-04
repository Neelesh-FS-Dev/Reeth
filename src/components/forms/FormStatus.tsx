import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '../ui/button'

export function SuccessPanel({ title, body, reference, onReset }: { title: string; body: string; reference: string; onReset: () => void }) {
  return (
    <div role="status" className="rounded-[2rem] border border-rule/50 bg-surface p-8">
      <CheckCircle2 aria-hidden="true" className="size-10 text-emerald-800" />
      <h3 className="mt-4 text-2xl">{title}</h3>
      <p className="mt-2 text-fg-muted">{body}</p>
      <p className="mt-4 text-sm text-fg-muted">
        Reference: <span className="font-medium text-fg">{reference}</span>
      </p>
      <Button variant="ghost" className="mt-6" onClick={onReset}>
        Send another
      </Button>
    </div>
  )
}

export function ErrorPanel({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-brand-ember/40 bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2 text-fg">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-ember" />
        Something went wrong sending your request. Please try again, or call us directly.
      </p>
      <Button variant="ghost" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
