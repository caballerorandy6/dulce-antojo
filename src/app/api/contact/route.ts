import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

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

    // TODO: Implement email sending with Resend
    // const { name, email, phone, eventType, eventDate, guestCount, services, message } = result.data
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@dulceantojo.com',
    //   to: 'info@dulceantojo.com',
    //   subject: `New Quote Request from ${name}`,
    //   html: `...`
    // })

    return NextResponse.json(
      { success: true, message: 'Quote request received successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
