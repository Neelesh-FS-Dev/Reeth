import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReelModal } from '../../src/components/reels/ReelModal'
import type { ReelItem } from '../../src/types'

const reels: ReelItem[] = [
  { id: 'a', title: 'First reel', date: '2026-10-01', src: '/a.mp4', webm: '/a.webm', poster: '/a.jpg' },
  { id: 'b', title: 'Second reel', date: '2026-10-02', src: '/b.mp4', webm: '/b.webm', poster: '/b.jpg' },
  { id: 'c', title: 'Third reel', date: '2026-10-03', src: '/c.mp4', webm: '/c.webm', poster: '/c.jpg' },
]

describe('ReelModal keyboard handling', () => {
  it('renders nothing while closed', () => {
    render(<ReelModal reels={reels} index={null} onIndexChange={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the reel at the given index with a muted, controlled video', () => {
    render(<ReelModal reels={reels} index={1} onIndexChange={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Second reel', { selector: 'span.block' })).toBeInTheDocument()
    const video = document.querySelector('video')!
    expect(video.muted).toBe(true)
    expect(video.controls).toBe(true)
  })

  it('moves to the next reel on ArrowDown and wraps from last to first', () => {
    const onChange = vi.fn()
    render(<ReelModal reels={reels} index={2} onIndexChange={onChange} />)
    fireEvent.keyDown(window, { key: 'ArrowDown' })
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  it('moves to the previous reel on ArrowUp', () => {
    const onChange = vi.fn()
    render(<ReelModal reels={reels} index={1} onIndexChange={onChange} />)
    fireEvent.keyDown(window, { key: 'ArrowUp' })
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  it('closes on Escape', () => {
    const onChange = vi.fn()
    render(<ReelModal reels={reels} index={0} onIndexChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onChange).toHaveBeenCalledWith(null)
  })
})
