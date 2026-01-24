'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function useContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      services: [],
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitStatus('success')
      form.reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  const resetStatus = () => setSubmitStatus('idle')

  return {
    form,
    submitStatus,
    isLoading: submitStatus === 'loading',
    isSuccess: submitStatus === 'success',
    isError: submitStatus === 'error',
    onSubmit: form.handleSubmit(onSubmit),
    resetStatus,
  }
}
