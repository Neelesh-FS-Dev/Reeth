import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { Field, fieldAria } from '../forms/Field'
import { ErrorPanel, SuccessPanel } from '../forms/FormStatus'
import { Input, NativeSelect, Textarea } from '../ui/input'
import { Button } from '../ui/button'
import { reservationSchema, type ReservationValues } from '../../lib/validators'
import { submitEnquiry } from '../../lib/api'
import { siteConfig } from '../../data/site.config'
import { events } from '../../data/events'
import { findEvent } from '../../lib/events'
import { toISODate } from '../../lib/formatters'
import { useToast } from '../ui/toast'

const occasions: { value: ReservationValues['occasion']; label: string }[] = [
  { value: 'none', label: 'No occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date', label: 'A date' },
  { value: 'business', label: 'Business dinner' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'event', label: 'Event booking' },
]

type Status = 'idle' | 'success' | 'error'

/** Reservation form. Reads ?event= to pre-fill the occasion for an event booking. */
export function ReservationForm() {
  const [params] = useSearchParams()
  const event = findEvent(events, params.get('event'))
  const toast = useToast()
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')
  const [lastValues, setLastValues] = useState<ReservationValues | null>(null)

  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    mode: 'onTouched',
    defaultValues: {
      date: '',
      time: '19:30',
      partySize: 2,
      name: '',
      phone: '',
      email: '',
      occasion: event ? 'event' : 'none',
      eventTitle: event?.title ?? '',
      specialRequests: '',
    },
  })
  const { register, handleSubmit, formState, reset } = form
  const { errors, isSubmitting } = formState

  const onSubmit = async (values: ReservationValues) => {
    setLastValues(values)
    setStatus('idle')
    try {
      const result = await submitEnquiry('reservation', values)
      setReference(result.reference)
      setStatus('success')
      toast({ title: 'Reservation request received', description: `Reference ${result.reference}`, tone: 'success' })
    } catch {
      setStatus('error')
      toast({ title: 'We could not send that', description: 'Please try again or call us.', tone: 'error' })
    }
  }

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Your table is requested"
        body="We will confirm by phone or email within the hour during service hours."
        reference={reference}
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5" aria-labelledby="reservation-title" id="reservation">
      <h2 id="reservation-title" className="text-3xl">
        Reserve a table
      </h2>
      {event ? (
        <p className="rounded-2xl bg-brand-saffron/20 px-4 py-3 text-brand-ink">
          Booking for <span className="font-medium">{event.title}</span>.{' '}
          <button type="button" className="underline underline-offset-4" onClick={() => form.setValue('eventTitle', '')}>
            Clear
          </button>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="res-date" label="Date" error={errors.date?.message}>
          <Input id="res-date" type="date" min={toISODate(new Date())} {...register('date')} {...fieldAria('res-date', { error: errors.date?.message })} />
        </Field>
        <Field id="res-time" label="Time" error={errors.time?.message}>
          <NativeSelect id="res-time" {...register('time')} {...fieldAria('res-time', { error: errors.time?.message })}>
            {siteConfig.slots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field id="res-party" label="Party size" error={errors.partySize?.message} hint="More than 12? Call us and we will arrange it.">
          <NativeSelect id="res-party" {...register('partySize', { valueAsNumber: true })} {...fieldAria('res-party', { error: errors.partySize?.message, hint: 'res-party' })}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field id="res-occasion" label="Occasion" error={errors.occasion?.message}>
          <NativeSelect id="res-occasion" {...register('occasion')} {...fieldAria('res-occasion', { error: errors.occasion?.message })}>
            {occasions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="res-name" label="Name" error={errors.name?.message}>
          <Input id="res-name" autoComplete="name" {...register('name')} {...fieldAria('res-name', { error: errors.name?.message })} />
        </Field>
        <Field id="res-phone" label="Phone" error={errors.phone?.message} hint="10-digit mobile, +91 optional">
          <Input id="res-phone" type="tel" inputMode="tel" autoComplete="tel" {...register('phone')} {...fieldAria('res-phone', { error: errors.phone?.message, hint: 'x' })} />
        </Field>
      </div>
      <Field id="res-email" label="Email" error={errors.email?.message}>
        <Input id="res-email" type="email" autoComplete="email" {...register('email')} {...fieldAria('res-email', { error: errors.email?.message })} />
      </Field>
      <Field id="res-requests" label="Special requests" error={errors.specialRequests?.message}>
        <Textarea id="res-requests" rows={3} {...register('specialRequests')} {...fieldAria('res-requests', { error: errors.specialRequests?.message })} />
      </Field>

      {status === 'error' && lastValues ? <ErrorPanel onRetry={() => onSubmit(lastValues)} /> : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:justify-self-start">
        {isSubmitting ? 'Sending…' : 'Request reservation'}
      </Button>
      <p className="text-sm text-fg-muted">We confirm every request personally. Submission is a demo in this sample.</p>
    </form>
  )
}
