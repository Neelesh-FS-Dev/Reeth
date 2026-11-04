import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { Field, fieldAria } from '../forms/Field'
import { ErrorPanel, SuccessPanel } from '../forms/FormStatus'
import { Input, NativeSelect, Textarea } from '../ui/input'
import { Button } from '../ui/button'
import { cateringSchema, type CateringValues } from '../../lib/validators'
import { submitEnquiry } from '../../lib/api'
import { packages } from '../../data/packages'
import { toISODate } from '../../lib/formatters'
import { useToast } from '../ui/toast'

type Status = 'idle' | 'success' | 'error'

export function EnquiryForm() {
  const [params] = useSearchParams()
  const preselected = packages.some((p) => p.id === params.get('package')) ? params.get('package') : ''
  const toast = useToast()
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')
  const [lastValues, setLastValues] = useState<CateringValues | null>(null)

  const { register, handleSubmit, formState, reset } = useForm<CateringValues>({
    resolver: zodResolver(cateringSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: 20,
      packageId: (preselected as CateringValues['packageId']) || ('intimate' as const),
      dietaryNotes: '',
      message: '',
    },
  })
  const { errors, isSubmitting } = formState

  const onSubmit = async (values: CateringValues) => {
    setLastValues(values)
    setStatus('idle')
    try {
      const result = await submitEnquiry('catering', values)
      setReference(result.reference)
      setStatus('success')
      toast({ title: 'Enquiry sent', description: 'We will reply within two working days.', tone: 'success' })
    } catch {
      setStatus('error')
      toast({ title: 'Enquiry not sent', description: 'Please try again.', tone: 'error' })
    }
  }

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Thanks, we have your enquiry"
        body="Our catering lead will get back to you within two working days."
        reference={reference}
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5" aria-labelledby="enquiry-title" id="enquiry">
      <h2 id="enquiry-title" className="text-3xl">
        Enquire about catering
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cat-name" label="Name" error={errors.name?.message}>
          <Input id="cat-name" autoComplete="name" {...register('name')} {...fieldAria('cat-name', { error: errors.name?.message })} />
        </Field>
        <Field id="cat-email" label="Email" error={errors.email?.message}>
          <Input id="cat-email" type="email" autoComplete="email" {...register('email')} {...fieldAria('cat-email', { error: errors.email?.message })} />
        </Field>
        <Field id="cat-phone" label="Phone" error={errors.phone?.message}>
          <Input id="cat-phone" type="tel" inputMode="tel" autoComplete="tel" {...register('phone')} {...fieldAria('cat-phone', { error: errors.phone?.message })} />
        </Field>
        <Field id="cat-date" label="Event date" error={errors.eventDate?.message}>
          <Input id="cat-date" type="date" min={toISODate(new Date())} {...register('eventDate')} {...fieldAria('cat-date', { error: errors.eventDate?.message })} />
        </Field>
        <Field id="cat-guests" label="Guest count" error={errors.guestCount?.message} hint="10 to 500 guests">
          <Input id="cat-guests" type="number" inputMode="numeric" min={10} max={500} {...register('guestCount', { valueAsNumber: true })} {...fieldAria('cat-guests', { error: errors.guestCount?.message, hint: 'x' })} />
        </Field>
        <Field id="cat-package" label="Package" error={errors.packageId?.message}>
          <NativeSelect id="cat-package" {...register('packageId')} {...fieldAria('cat-package', { error: errors.packageId?.message })}>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.guests})
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <Field id="cat-dietary" label="Dietary notes" error={errors.dietaryNotes?.message} hint="Vegetarian, Jain, allergies, anything else">
        <Input id="cat-dietary" {...register('dietaryNotes')} {...fieldAria('cat-dietary', { error: errors.dietaryNotes?.message, hint: 'x' })} />
      </Field>
      <Field id="cat-message" label="Tell us about the event" error={errors.message?.message}>
        <Textarea id="cat-message" rows={4} {...register('message')} {...fieldAria('cat-message', { error: errors.message?.message })} />
      </Field>

      {status === 'error' && lastValues ? <ErrorPanel onRetry={() => onSubmit(lastValues)} /> : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="sm:justify-self-start">
        {isSubmitting ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}
