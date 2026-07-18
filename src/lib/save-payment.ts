import { db, initializeDatabase } from '@/lib/db'

// NOT a server action. This writes a paid Stripe session into the payments
// table and must only be called from the Stripe webhook handler, which is
// already authenticated by Stripe's signature. Do not expose it to the client.

let dbInitialized = false
async function ensureDb() {
  if (!dbInitialized) {
    await initializeDatabase()
    dbInitialized = true
  }
}

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
    // Idempotency: skip if this session was already recorded (Stripe retries).
    const existing = await db.execute({
      sql: 'SELECT id FROM payments WHERE stripe_session_id = ?',
      args: [data.stripeSessionId],
    })

    if (existing.rows.length > 0) {
      return { success: true, alreadyRecorded: true }
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

    return { success: true, alreadyRecorded: false }
  } catch (error) {
    console.error('Failed to save payment:', error)
    return { success: false, error: 'Failed to save payment' }
  }
}
