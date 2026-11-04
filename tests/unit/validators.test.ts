import { describe, expect, it } from 'vitest'
import { careerSchema, cateringSchema, phoneSchema, reservationSchema } from '../../src/lib/validators'
import { toISODate } from '../../src/lib/formatters'

const future = () => {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return toISODate(d)
}

describe('phoneSchema', () => {
  it.each(['9876543210', '+919876543210', '+91 98765 43210', '98765-43210'])('accepts %s', (v) => {
    expect(phoneSchema.safeParse(v).success).toBe(true)
  })
  it.each(['12345', '5876543210', '+1 9876543210', 'abcdefghij'])('rejects %s', (v) => {
    expect(phoneSchema.safeParse(v).success).toBe(false)
  })
})

describe('reservationSchema', () => {
  const base = {
    date: future(),
    time: '19:30' as const,
    partySize: 4,
    name: 'Asha Rao',
    phone: '9876543210',
    email: 'asha@example.com',
    occasion: 'birthday' as const,
  }

  it('accepts a valid booking', () => {
    expect(reservationSchema.safeParse(base).success).toBe(true)
  })

  it('rejects past dates', () => {
    const r = reservationSchema.safeParse({ ...base, date: '2020-01-01' })
    expect(r.success).toBe(false)
  })

  it('caps party size at 12 with the call-us message', () => {
    const r = reservationSchema.safeParse({ ...base, partySize: 13 })
    expect(r.success).toBe(false)
    if (!r.success) expect(r.error.issues[0].message).toMatch(/call us/i)
  })

  it('rejects an unknown time slot', () => {
    expect(reservationSchema.safeParse({ ...base, time: '03:00' }).success).toBe(false)
  })
})

describe('cateringSchema', () => {
  const base = {
    name: 'Ravi Menon',
    email: 'ravi@example.com',
    phone: '9123456789',
    eventDate: future(),
    guestCount: 40,
    packageId: 'celebration' as const,
    message: 'A family celebration with vegetarian options.',
  }
  it('accepts a valid enquiry', () => {
    expect(cateringSchema.safeParse(base).success).toBe(true)
  })
  it('requires at least 10 guests', () => {
    expect(cateringSchema.safeParse({ ...base, guestCount: 5 }).success).toBe(false)
  })
})

describe('careerSchema CV rules', () => {
  const base = {
    name: 'Meera Joshi',
    phone: '9000000001',
    email: 'meera@example.com',
    roleId: 'host' as const,
    experience: '1-3' as const,
  }
  it('accepts a PDF under 5MB', () => {
    const cv = new File(['%PDF-1.4'], 'cv.pdf', { type: 'application/pdf' })
    expect(careerSchema.safeParse({ ...base, cv }).success).toBe(true)
  })
  it('rejects non-PDF files', () => {
    const cv = new File(['x'], 'cv.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    expect(careerSchema.safeParse({ ...base, cv }).success).toBe(false)
  })
  it('rejects PDFs over 5MB', () => {
    const big = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'cv.pdf', { type: 'application/pdf' })
    expect(careerSchema.safeParse({ ...base, cv: big }).success).toBe(false)
  })
})
