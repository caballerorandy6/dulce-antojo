import { createClient } from '@libsql/client'

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set')
}

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

// Initialize database tables
export async function initializeDatabase() {
  await db.batch([
    // Admin users table
    `CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Payments table
    `CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT UNIQUE,
      stripe_payment_intent_id TEXT,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      description TEXT,
      status TEXT DEFAULT 'paid',
      notes TEXT,
      event_date TEXT,
      contacted INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create index for faster queries
    `CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status)`,
  ])
}
