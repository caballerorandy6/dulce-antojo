'use server'

import { db, initializeDatabase } from '@/lib/db'
import { getSession } from '@/lib/session'

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

// Get all payments (requires an authenticated admin session)
export async function getPayments(): Promise<{
  success: boolean
  payments?: DbPayment[]
  error?: string
}> {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

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

// Get payment stats (requires an authenticated admin session)
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
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  await ensureDb()

  try {
    // Total stats
    const totalResult = await db.execute(
      'SELECT COUNT(*) as count, SUM(amount) as total FROM payments WHERE status = ?',
      ['paid']
    )

    // This month stats. created_at is stored as SQLite CURRENT_TIMESTAMP
    // ("YYYY-MM-DD HH:MM:SS"), so compare with date() to avoid the format
    // mismatch that dropped day-1 payments before.
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    const startOfMonthDate = startOfMonth.toISOString().slice(0, 10)

    const monthResult = await db.execute({
      sql: 'SELECT COUNT(*) as count, SUM(amount) as total FROM payments WHERE status = ? AND date(created_at) >= date(?)',
      args: ['paid', startOfMonthDate],
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

// Update payment notes (requires an authenticated admin session)
export async function updatePaymentNotes(paymentId: number, notes: string) {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

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

// Mark as contacted (requires an authenticated admin session)
export async function markAsContacted(paymentId: number, contacted: boolean) {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

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

// Update event date (requires an authenticated admin session)
export async function updateEventDate(paymentId: number, eventDate: string) {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

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
