import { z } from 'zod'
import { siteConfig } from '../data/site.config'
import { toISODate } from './formatters'

export const MAX_CV_BYTES = 5 * 1024 * 1024

/** Indian mobile: 10 digits starting 6 to 9, optional +91 prefix, spaces and dashes ignored. */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ''))
  .refine((v) => /^(\+91)?[6-9]\d{9}$/.test(v), {
    message: 'Enter a 10-digit Indian mobile number, optionally with +91.',
  })

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Enter your name (at least 2 characters).')
  .max(80, 'Keep it under 80 characters.')

const emailSchema = z.email('Enter a valid email address, like name@example.com.')

const isoDateSchema = z
  .string()
  .min(1, 'Choose a date.')
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), 'Choose a valid date.')

export const reservationSchema = z
  .object({
    date: isoDateSchema,
    time: z.enum(siteConfig.slots, { message: 'Choose a time slot.' }),
    partySize: z.number({ message: 'Choose a party size.' })
      .int()
      .min(1, 'Party size starts at 1.')
      .max(12, 'For more than 12, please call us.'),
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    occasion: z.enum(['none', 'birthday', 'anniversary', 'date', 'business', 'celebration', 'event']),
    eventTitle: z.string().max(120).optional(),
    specialRequests: z.string().max(500, 'Keep requests under 500 characters.').optional(),
  })
  .superRefine((data, ctx) => {
    if (data.date < toISODate(new Date())) {
      ctx.addIssue({ code: 'custom', path: ['date'], message: 'Pick today or a future date.' })
    }
  })
export type ReservationValues = z.infer<typeof reservationSchema>

export const cateringSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  eventDate: isoDateSchema,
  guestCount: z.number({ message: 'Enter the number of guests.' })
    .int()
    .min(10, 'Catering starts at 10 guests.')
    .max(500, 'For more than 500 guests, please email us.'),
  packageId: z.enum(['intimate', 'celebration', 'grand'], { message: 'Choose a package.' }),
  dietaryNotes: z.string().max(300).optional(),
  message: z.string().trim().min(10, 'Tell us a little more (10 characters or more).').max(1000),
})
export type CateringValues = z.infer<typeof cateringSchema>

export const careerSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  roleId: z.enum(['line-cook', 'sous-chef', 'host', 'server', 'bartender', 'bar-lead'], {
    message: 'Choose a role.',
  }),
  experience: z.enum(['0-1', '1-3', '3-5', '5+'], { message: 'Choose your experience.' }),
  cv: z
    .custom<File | undefined>((v) => v === undefined || v instanceof File)
    .optional()
    .refine((f) => !f || f.type === 'application/pdf', 'CV must be a PDF.')
    .refine((f) => !f || f.size <= MAX_CV_BYTES, 'CV must be 5MB or smaller.'),
  message: z.string().trim().max(1000).optional(),
})
export type CareerValues = z.infer<typeof careerSchema>
