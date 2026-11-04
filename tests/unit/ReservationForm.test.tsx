import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ReservationForm } from '../../src/components/contact/ReservationForm'
import { ToastProvider } from '../../src/components/ui/toast'

function renderForm(path = '/contact') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ToastProvider>
        <ReservationForm />
      </ToastProvider>
    </MemoryRouter>,
  )
}

describe('ReservationForm', () => {
  it('shows field errors and links them with aria-describedby on empty submit', async () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: /request reservation/i }))
    const name = await screen.findByLabelText(/name/i)
    await waitFor(() => expect(name).toHaveAttribute('aria-invalid', 'true'))
    expect(name).toHaveAttribute('aria-describedby', 'res-name-error')
    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument()
  })

  it('pre-fills the occasion when arriving from an event', () => {
    renderForm('/contact?event=diwali-party')
    expect(screen.getByText(/booking for/i)).toHaveTextContent('Diwali Party')
    expect((screen.getByLabelText('Occasion') as HTMLSelectElement).value).toBe('event')
  })
})
