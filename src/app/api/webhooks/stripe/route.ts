import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { Resend } from 'resend'
import { PaymentConfirmationEmail } from '@/emails/payment-confirmation-email'
import { savePayment } from '@/app/actions/db-payments'
import Stripe from 'stripe'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const error = err as Error
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleSuccessfulPayment(session)
      break
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment succeeded:', paymentIntent.id)
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', paymentIntent.id)
      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const customerName = session.metadata?.customerName || session.customer_details?.name || 'Customer'
  const description = session.metadata?.description || 'Payment'
  const amount = session.amount_total ? session.amount_total / 100 : 0
  const customerEmail = session.customer_details?.email

  console.log('Payment successful:', {
    customerName,
    description,
    amount,
    customerEmail,
  })

  // Save payment to database
  try {
    await savePayment({
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      customerName,
      customerEmail: customerEmail || undefined,
      amount,
      description,
    })
    console.log('Payment saved to database')
  } catch (error) {
    console.error('Failed to save payment to database:', error)
  }

  // Send confirmation email to business owner
  try {
    await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'no-reply@dulcesantojosnackcarts.com',
      to: process.env.CONTACT_EMAIL_TO || 'aracelymeza1128@gmail.com',
      subject: `Payment Received - $${amount} from ${customerName}`,
      react: PaymentConfirmationEmail({
        customerName,
        customerEmail: customerEmail || 'Not provided',
        amount,
        description,
        paymentId: session.payment_intent as string,
        paymentDate: new Date().toISOString(),
      }),
    })
    console.log('Confirmation email sent to business owner')
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
  }

  // Send receipt email to customer if email available
  if (customerEmail) {
    try {
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || 'no-reply@dulcesantojosnackcarts.com',
        to: customerEmail,
        subject: `Payment Confirmation - Dulce Antojo`,
        react: PaymentConfirmationEmail({
          customerName,
          customerEmail,
          amount,
          description,
          paymentId: session.payment_intent as string,
          paymentDate: new Date().toISOString(),
          isCustomerCopy: true,
        }),
      })
      console.log('Receipt email sent to customer:', customerEmail)
    } catch (error) {
      console.error('Failed to send customer receipt:', error)
    }
  }
}
