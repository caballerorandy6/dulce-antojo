'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { eventTypes, services } from '@/lib/constants'

const triggerConfetti = async () => {
  const confetti = (await import('canvas-confetti')).default
  const colors = ['#FF6B95', '#FFD6E0', '#C9A86C', '#FF9EBA', '#D4B87A']

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors,
  })

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
  }, 150)

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })
  }, 300)
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      services: [],
    },
  })

  const selectedServices = watch('services') || []

  const toggleService = (serviceId: string) => {
    const current = selectedServices
    const updated = current.includes(serviceId)
      ? current.filter((id) => id !== serviceId)
      : [...current, serviceId]
    setValue('services', updated, { shouldValidate: true })
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')
      triggerConfetti()
      reset()
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-pink-medium/30 transition-colors hover:border-gold">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name & Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your name…"
                autoComplete="name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? true : undefined}
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? true : undefined}
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone & Event Type */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                autoComplete="tel"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={errors.phone ? true : undefined}
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType" id="eventType-label">Event Type *</Label>
              <Select onValueChange={(value) => setValue('eventType', value, { shouldValidate: true })}>
                <SelectTrigger
                  id="eventType"
                  aria-labelledby="eventType-label"
                  aria-describedby={errors.eventType ? 'eventType-error' : undefined}
                  aria-invalid={errors.eventType ? true : undefined}
                  className={errors.eventType ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.eventType && (
                <p id="eventType-error" role="alert" className="text-sm text-destructive">{errors.eventType.message}</p>
              )}
            </div>
          </div>

          {/* Date & Guest Count */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
                aria-invalid={errors.eventDate ? true : undefined}
                {...register('eventDate')}
                className={errors.eventDate ? 'border-destructive' : ''}
              />
              {errors.eventDate && (
                <p id="eventDate-error" role="alert" className="text-sm text-destructive">{errors.eventDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="guestCount">Number of Guests *</Label>
              <Input
                id="guestCount"
                type="number"
                placeholder="50…"
                aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
                aria-invalid={errors.guestCount ? true : undefined}
                {...register('guestCount')}
                className={errors.guestCount ? 'border-destructive' : ''}
              />
              {errors.guestCount && (
                <p id="guestCount-error" role="alert" className="text-sm text-destructive">{errors.guestCount.message}</p>
              )}
            </div>
          </div>

          {/* Services Selection */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Services of Interest *</legend>
            <div className="grid gap-2 md:grid-cols-2" role="group" aria-describedby={errors.services ? 'services-error' : undefined}>
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${
                    selectedServices.includes(service.id)
                      ? 'border-pink-accent bg-pink-accent/10'
                      : 'border-pink-medium/30 hover:border-pink-medium'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    className="sr-only"
                    aria-checked={selectedServices.includes(service.id)}
                  />
                  <span className="text-sm">{service.name}</span>
                </label>
              ))}
            </div>
            {errors.services && (
              <p id="services-error" role="alert" className="text-sm text-destructive">{errors.services.message}</p>
            )}
          </fieldset>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your event…"
              rows={4}
              {...register('message')}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-dark hover:bg-pink-dark/90"
          >
            {isSubmitting ? 'Sending...' : 'Send Quote Request'}
          </Button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p role="status" aria-live="polite" className="text-center text-sm text-green-600">
              Thank you! We&apos;ll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p role="alert" aria-live="assertive" className="text-center text-sm text-destructive">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
