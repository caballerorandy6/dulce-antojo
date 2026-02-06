import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations'
import { ContactFormEmail } from '@/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate with Zod
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, eventType, eventDate, guestCount, services, message } = result.data

    // Send email with Resend
    const fromEmail = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev'
    const toEmail = process.env.CONTACT_EMAIL_TO || 'aracelymeza1128@gmail.com'

    console.log('Sending email...')
    console.log('From:', fromEmail)
    console.log('To:', toEmail)
    console.log('API Key exists:', !!process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Quote Request from ${name} - ${eventType}`,
      react: ContactFormEmail({
        name,
        email,
        phone,
        eventType,
        eventDate,
        guestCount,
        services,
        message,
      }),
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
