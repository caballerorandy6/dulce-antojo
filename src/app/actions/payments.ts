'use server'

import { stripe } from '@/lib/stripe'
import { createPaymentSchema } from '@/lib/validations'
import { db } from '@/lib/db'

export interface PaymentRecord {
  id: string
  amount: number
  currency: string
  status: string
  customerName: string
  description: string
  createdAt: string
  paymentLinkId?: string
}

// Get payment history from Stripe
export async function getPaymentHistory(adminPassword: string): Promise<{
  success: boolean
  payments?: PaymentRecord[]
  error?: string
}> {
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Get checkout sessions (from payment links)
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ['data.payment_intent'],
    })

    const payments: PaymentRecord[] = sessions.data
      .filter((session) => session.payment_status === 'paid')
      .map((session) => ({
        id: session.id,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency?.toUpperCase() || 'USD',
        status: session.payment_status,
        customerName: session.metadata?.customerName || session.customer_details?.name || 'Unknown',
        description: session.metadata?.description || 'Payment',
        createdAt: new Date(session.created * 1000).toISOString(),
        paymentLinkId: session.payment_link as string | undefined,
      }))

    return { success: true, payments }
  } catch (error) {
    console.error('Failed to fetch payment history:', error)
    return { success: false, error: 'Failed to fetch payments' }
  }
}

// Get payment stats
export async function getPaymentStats(adminPassword: string): Promise<{
  success: boolean
  stats?: {
    totalRevenue: number
    totalPayments: number
    thisMonthRevenue: number
    thisMonthPayments: number
  }
  error?: string
}> {
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.payment_intent'],
    })

    const paidSessions = sessions.data.filter(
      (session) => session.payment_status === 'paid'
    )

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const thisMonthSessions = paidSessions.filter(
      (session) => new Date(session.created * 1000) >= startOfMonth
    )

    const totalRevenue = paidSessions.reduce(
      (sum, session) => sum + (session.amount_total || 0) / 100,
      0
    )

    const thisMonthRevenue = thisMonthSessions.reduce(
      (sum, session) => sum + (session.amount_total || 0) / 100,
      0
    )

    return {
      success: true,
      stats: {
        totalRevenue,
        totalPayments: paidSessions.length,
        thisMonthRevenue,
        thisMonthPayments: thisMonthSessions.length,
      },
    }
  } catch (error) {
    console.error('Failed to fetch payment stats:', error)
    return { success: false, error: 'Failed to fetch stats' }
  }
}

export async function createPaymentLink(data: {
  customerName: string
  amount: number
  description: string
  adminPassword: string
}) {
  // Validate input
  const result = createPaymentSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: result.error.flatten().fieldErrors,
    }
  }

  const { customerName, amount, description, adminPassword } = result.data

  // Simple password protection
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return {
      success: false,
      error: 'Unauthorized',
    }
  }

  try {
    // Create Stripe Payment Link
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
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dulcesantojosnackcarts.com'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
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

// New: Create payment link with database auth
export async function createPaymentLinkDb(data: {
  customerName: string
  amount: number
  description: string
  adminEmail: string
}) {
  const { customerName, amount, description, adminEmail } = data

  // Validate admin exists in database
  try {
    const admin = await db.execute({
      sql: 'SELECT id FROM admin_users WHERE email = ?',
      args: [adminEmail.toLowerCase()],
    })

    if (admin.rows.length === 0) {
      return { success: false, error: 'Unauthorized' }
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    return { success: false, error: 'Authorization failed' }
  }

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
    // Create Stripe Payment Link
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
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://dulcesantojosnackcarts.com'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
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
