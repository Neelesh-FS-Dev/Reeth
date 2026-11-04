import { useMediaQuery } from './useMediaQuery'

/** True for devices whose primary pointer is fine (mouse or trackpad). */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
