'use server'

import { db, initializeDatabase } from '@/lib/db'

export interface DbPayment {
  id: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  customer_name: string
  customer_email: string | null
  amount: number
  currency: string
  description: string | null
  status: string
  notes: string | null
  event_date: string | null
  contacted: boolean
  created_at: string
  updated_at: string
}

// Ensure DB is initialized
let dbInitialized = false
async function ensureDb() {
  if (!dbInitialized) {
    await initializeDatabase()
    dbInitialized = true
  }
}

// Save payment from Stripe webhook
export async function savePayment(data: {
  stripeSessionId: string
  stripePaymentIntentId?: string
  customerName: string
  customerEmail?: string
  amount: number
  description?: string
}) {
  await ensureDb()

  try {
    // Check if payment already exists
    const existing = await db.execute({
      sql: 'SELECT id FROM payments WHERE stripe_session_id = ?',
      args: [data.stripeSessionId],
    })

    if (existing.rows.length > 0) {
      return { success: true, message: 'Payment already recorded' }
    }

    await db.execute({
      sql: `INSERT INTO payments
        (stripe_session_id, stripe_payment_intent_id, customer_name, customer_email, amount, description)
        VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        data.stripeSessionId,
        data.stripePaymentIntentId || null,
        data.customerName,
        data.customerEmail || null,
        data.amount,
        data.description || null,
      ],
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to save payment:', error)
    return { success: false, error: 'Failed to save payment' }
  }
}

// Get all payments
export async function getPayments(): Promise<{
  success: boolean
  payments?: DbPayment[]
  error?: string
}> {
  await ensureDb()

  try {
    const result = await db.execute(
      'SELECT * FROM payments ORDER BY created_at DESC LIMIT 100'
    )

    const payments: DbPayment[] = result.rows.map((row) => ({
      id: row.id as number,
      stripe_session_id: row.stripe_session_id as string | null,
      stripe_payment_intent_id: row.stripe_payment_intent_id as string | null,
      customer_name: row.customer_name as string,
      customer_email: row.customer_email as string | null,
      amount: row.amount as number,
      currency: (row.currency as string) || 'USD',
      description: row.description as string | null,
      status: (row.status as string) || 'paid',
      notes: row.notes as string | null,
      event_date: row.event_date as string | null,
      contacted: Boolean(row.contacted),
      created_at: row.created_at as string,
      updated_at: row.updated_at as string,
    }))

    return { success: true, payments }
  } catch (error) {
    console.error('Failed to get payments:', error)
    return { success: false, error: 'Failed to load payments' }
  }
}

// Get payment stats
export async function getPaymentStats(): Promise<{
  success: boolean
  stats?: {
    totalRevenue: number
    totalPayments: number
    thisMonthRevenue: number
    thisMonthPayments: number
    pendingContact: number
  }
  error?: string
}> {
  await ensureDb()

  try {
    // Total stats
    const totalResult = await db.execute(
      'SELECT COUNT(*) as count, SUM(amount) as total FROM payments WHERE status = ?',
      ['paid']
    )

    // This month stats
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const monthResult = await db.execute({
      sql: 'SELECT COUNT(*) as count, SUM(amount) as total FROM payments WHERE status = ? AND created_at >= ?',
      args: ['paid', startOfMonth.toISOString()],
    })

    // Pending contact
    const pendingResult = await db.execute(
      'SELECT COUNT(*) as count FROM payments WHERE contacted = 0'
    )

    return {
      success: true,
      stats: {
        totalRevenue: (totalResult.rows[0].total as number) || 0,
        totalPayments: (totalResult.rows[0].count as number) || 0,
        thisMonthRevenue: (monthResult.rows[0].total as number) || 0,
        thisMonthPayments: (monthResult.rows[0].count as number) || 0,
        pendingContact: (pendingResult.rows[0].count as number) || 0,
      },
    }
  } catch (error) {
    console.error('Failed to get stats:', error)
    return { success: false, error: 'Failed to load stats' }
  }
}

// Update payment notes
export async function updatePaymentNotes(paymentId: number, notes: string) {
  await ensureDb()

  try {
    await db.execute({
      sql: 'UPDATE payments SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [notes, paymentId],
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to update notes:', error)
    return { success: false, error: 'Failed to update notes' }
  }
}

// Mark as contacted
export async function markAsContacted(paymentId: number, contacted: boolean) {
  await ensureDb()

  try {
    await db.execute({
      sql: 'UPDATE payments SET contacted = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [contacted ? 1 : 0, paymentId],
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to update contacted:', error)
    return { success: false, error: 'Failed to update' }
  }
}

// Update event date
export async function updateEventDate(paymentId: number, eventDate: string) {
  await ensureDb()

  try {
    await db.execute({
      sql: 'UPDATE payments SET event_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [eventDate, paymentId],
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to update event date:', error)
    return { success: false, error: 'Failed to update event date' }
  }
}
