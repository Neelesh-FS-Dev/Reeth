import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'
import type { ComponentProps } from 'react'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn('flex gap-2', className)} {...props} />
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'min-h-11 shrink-0 rounded-full border border-fg/15 px-5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent-text data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-on-accent',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('outline-none', className)} {...props} />
}
