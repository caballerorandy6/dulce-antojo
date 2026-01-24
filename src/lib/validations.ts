// ============================================
// DULCE ANTOJO - Zod Validation Schemas
// ============================================

import { z } from 'zod'

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),

  eventType: z
    .string()
    .min(1, 'Please select an event type'),

  eventDate: z
    .string()
    .min(1, 'Please select a date')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Date must be today or in the future'),

  guestCount: z
    .string()
    .min(1, 'Please enter the number of guests')
    .refine((val) => {
      const num = parseInt(val)
      return !isNaN(num) && num > 0
    }, 'Number of guests must be greater than 0'),

  services: z
    .array(z.string())
    .min(1, 'Please select at least one service'),

  message: z
    .string()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Quote request schema (extended contact form)
export const quoteRequestSchema = contactFormSchema.extend({
  budget: z
    .string()
    .optional(),

  venue: z
    .string()
    .max(200, 'Address cannot exceed 200 characters')
    .optional(),

  additionalServices: z
    .array(z.string())
    .optional(),

  hearAboutUs: z
    .string()
    .optional(),
})

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>

// Service inquiry schema
export const serviceInquirySchema = z.object({
  serviceId: z
    .string()
    .min(1, 'Service ID is required'),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .optional(),

  message: z
    .string()
    .min(10, 'Please provide more details about your event')
    .max(500, 'Message cannot exceed 500 characters'),
})

export type ServiceInquiryData = z.infer<typeof serviceInquirySchema>
