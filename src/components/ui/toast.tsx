import * as ToastPrimitive from '@radix-ui/react-toast'
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ToastMessage {
  id: number
  title: string
  description?: string
  tone: 'success' | 'error'
}

type ToastFn = (message: Omit<ToastMessage, 'id'>) => void

const ToastContext = createContext<ToastFn>(() => {})

/** Call toast({ title, description, tone }) from anywhere under ToastProvider. */
export function useToast(): ToastFn {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const toast = useCallback<ToastFn>((message) => {
    setMessages((prev) => [...prev, { ...message, id: Date.now() + Math.random() }])
  }, [])

  const value = useMemo(() => toast, [toast])

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
        {children}
        {messages.map((m) => (
          <ToastPrimitive.Root
            key={m.id}
            onOpenChange={(open) => {
              if (!open) setMessages((prev) => prev.filter((x) => x.id !== m.id))
            }}
            className={cn(
              'grid gap-1 rounded-2xl border border-rule/40 bg-surface p-4 text-fg shadow-xl',
              m.tone === 'error' && 'border-brand-ember/50',
            )}
          >
            <ToastPrimitive.Title className="font-medium">{m.title}</ToastPrimitive.Title>
            {m.description ? (
              <ToastPrimitive.Description className="text-sm text-fg-muted">{m.description}</ToastPrimitive.Description>
            ) : null}
            <ToastPrimitive.Close className="sr-only">Dismiss</ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 left-1/2 z-[70] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}
