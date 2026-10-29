'use server'

import { stripe } from '@/lib/stripe'
import { getSession } from '@/lib/session'

// Create a Stripe payment link (requires an authenticated admin session)
export async function createPaymentLinkDb(data: {
  customerName: string
  amount: number
  description: string
}) {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  const { customerName, amount, description } = data

  // Validate input
  if (!customerName || customerName.length < 2) {
    return { success: false, error: 'Customer name is required' }
  }
  if (!amount || amount < 1) {
    return { success: false, error: 'Amount must be at least $1' }
  }
  if (!description) {
    return { success: false, error: 'Description is required' }
  }

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description,
              description: `Payment for ${customerName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName,
        description,
        createdAt: new Date().toISOString(),
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dulce-antojo.vercel.app'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        },
      },
    })

    return {
      success: true,
      paymentLink: paymentLink.url,
      id: paymentLink.id,
    }
  } catch (error) {
    console.error('Stripe error:', error)
    return {
      success: false,
      error: 'Failed to create payment link',
    }
  }
}
