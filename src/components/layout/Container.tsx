import type { HTMLAttributes, Ref } from 'react'
import { cn } from '../../lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** React 19 passes ref as a prop; forwarded to the div. */
  ref?: Ref<HTMLDivElement>
}

export function Container({ className, ref, ...props }: ContainerProps) {
  return <div ref={ref} className={cn('container-x relative', className)} {...props} />
}
