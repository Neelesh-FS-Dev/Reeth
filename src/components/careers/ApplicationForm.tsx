import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { Field, fieldAria } from '../forms/Field'
import { ErrorPanel, SuccessPanel } from '../forms/FormStatus'
import { Input, NativeSelect, Textarea } from '../ui/input'
import { Button } from '../ui/button'
import { careerSchema, MAX_CV_BYTES, type CareerValues } from '../../lib/validators'
import { submitEnquiry } from '../../lib/api'
import { roles } from '../../data/roles'
import { useToast } from '../ui/toast'

type Status = 'idle' | 'success' | 'error'

const experience = [
  { value: '0-1', label: 'Under 1 year' },
  { value: '1-3', label: '1 to 3 years' },
  { value: '3-5', label: '3 to 5 years' },
  { value: '5+', label: '5+ years' },
] as const

export function ApplicationForm() {
  const [params] = useSearchParams()
  const pre = roles.some((r) => r.id === params.get('role')) ? params.get('role') : ''
  const toast = useToast()
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')
  const [lastValues, setLastValues] = useState<CareerValues | null>(null)

  const { register, handleSubmit, formState, reset, setError } = useForm<CareerValues>({
    resolver: zodResolver(careerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', phone: '', email: '', roleId: (pre as CareerValues['roleId']) || undefined, experience: '1-3', message: '' },
  })
  const { errors, isSubmitting } = formState

  const onSubmit = async (values: CareerValues) => {
    setLastValues(values)
    setStatus('idle')
    try {
      // The CV is validated client side only. Upload handling belongs to the backend.
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        roleId: values.roleId,
        experience: values.experience,
        message: values.message,
        cvName: values.cv?.name ?? null,
      }
      const result = await submitEnquiry('career', payload)
      setReference(result.reference)
      setStatus('success')
      toast({ title: 'Application received', description: `Reference ${result.reference}`, tone: 'success' })
    } catch {
      setStatus('error')
      toast({ title: 'Application not sent', description: 'Please try again.', tone: 'error' })
    }
  }

  if (status === 'success') {
    return (
      <SuccessPanel
        title="Application received"
        body="Thank you for applying. We review every application and reply within two weeks."
        reference={reference}
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5" aria-labelledby="apply-title" id="apply">
      <h2 id="apply-title" className="text-3xl">
        Apply
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="job-name" label="Name" error={errors.name?.message}>
          <Input id="job-name" autoComplete="name" {...register('name')} {...fieldAria('job-name', { error: errors.name?.message })} />
        </Field>
        <Field id="job-phone" label="Phone" error={errors.phone?.message}>
          <Input id="job-phone" type="tel" inputMode="tel" autoComplete="tel" {...register('phone')} {...fieldAria('job-phone', { error: errors.phone?.message })} />
        </Field>
        <Field id="job-email" label="Email" error={errors.email?.message}>
          <Input id="job-email" type="email" autoComplete="email" {...register('email')} {...fieldAria('job-email', { error: errors.email?.message })} />
        </Field>
        <Field id="job-role" label="Role" error={errors.roleId?.message}>
          <NativeSelect id="job-role" defaultValue={pre || ''} {...register('roleId')} {...fieldAria('job-role', { error: errors.roleId?.message })}>
            <option value="" disabled>
              Choose a role
            </option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.department})
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field id="job-exp" label="Experience" error={errors.experience?.message}>
          <NativeSelect id="job-exp" {...register('experience')} {...fieldAria('job-exp', { error: errors.experience?.message })}>
            {experience.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field id="job-cv" label="CV (PDF, up to 5MB)" error={errors.cv?.message as string | undefined} hint="PDF only, 5MB maximum">
          <input
            id="job-cv"
            type="file"
            accept="application/pdf,.pdf"
            className="min-h-11 w-full rounded-2xl border border-fg/20 bg-surface px-4 py-2 text-base file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-on-accent"
            {...register('cv', {
              setValueAs: (v: FileList | undefined) => (v && v.length ? v[0] : undefined),
              onChange: (e) => {
                const f = (e.target as HTMLInputElement).files?.[0]
                if (f && f.size > MAX_CV_BYTES) setError('cv', { message: 'CV must be 5MB or smaller.' })
              },
            })}
            {...fieldAria('job-cv', { error: errors.cv?.message as string | undefined, hint: 'x' })}
          />
        </Field>
      </div>
      <Field id="job-message" label="A few words about you" error={errors.message?.message}>
        <Textarea id="job-message" rows={4} {...register('message')} {...fieldAria('job-message', { error: errors.message?.message })} />
      </Field>

      {status === 'error' && lastValues ? <ErrorPanel onRetry={() => onSubmit(lastValues)} /> : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="sm:justify-self-start">
        {isSubmitting ? 'Sending…' : 'Submit application'}
      </Button>
    </form>
  )
}
