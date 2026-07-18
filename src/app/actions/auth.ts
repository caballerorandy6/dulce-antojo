'use server'

import { db, initializeDatabase } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { createSession, destroySession, getSession } from '@/lib/session'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name is required'),
  setupToken: z.string().min(1, 'Setup token is required'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

// Initialize database on first use
let dbInitialized = false
async function ensureDb() {
  if (!dbInitialized) {
    await initializeDatabase()
    dbInitialized = true
  }
}

// Login admin
export async function loginAdmin(data: { email: string; password: string }) {
  await ensureDb()

  const result = loginSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: 'Invalid credentials' }
  }

  const { email, password } = result.data

  try {
    const user = await db.execute({
      sql: 'SELECT * FROM admin_users WHERE email = ?',
      args: [email.toLowerCase()],
    })

    if (user.rows.length === 0) {
      return { success: false, error: 'Invalid email or password' }
    }

    const admin = user.rows[0]
    const validPassword = await bcrypt.compare(password, admin.password_hash as string)

    if (!validPassword) {
      return { success: false, error: 'Invalid email or password' }
    }

    const authenticatedAdmin = {
      id: admin.id as number,
      email: admin.email as string,
      name: admin.name as string,
    }

    // Issue a signed session cookie; every admin action verifies this, not a
    // client-supplied email.
    await createSession(authenticatedAdmin)

    return { success: true, admin: authenticatedAdmin }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Login failed' }
  }
}

// Log out: clear the session cookie
export async function logoutAdmin() {
  await destroySession()
  return { success: true }
}

// Return the currently authenticated admin (used to restore state on refresh)
export async function getCurrentAdmin() {
  const session = await getSession()
  if (!session) return { authenticated: false as const }
  return { authenticated: true as const, admin: session }
}

// Register first admin (only works if no admins exist AND the setup token matches)
export async function registerFirstAdmin(data: { email: string; password: string; name: string; setupToken: string }) {
  await ensureDb()

  const result = registerSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: 'Validation failed', details: z.treeifyError(result.error) }
  }

  const { email, password, name, setupToken } = result.data

  // Gate the first-admin registration behind a secret so it can't be claimed
  // by whoever loads /admin first.
  const expectedToken = process.env.ADMIN_SETUP_TOKEN
  if (!expectedToken || setupToken !== expectedToken) {
    return { success: false, error: 'Invalid setup token' }
  }

  try {
    // Check if any admin exists
    const existingAdmins = await db.execute('SELECT COUNT(*) as count FROM admin_users')
    const count = existingAdmins.rows[0].count as number

    if (count > 0) {
      return { success: false, error: 'Admin already exists. Contact support to add more admins.' }
    }

    // Hash password and create admin
    const passwordHash = await bcrypt.hash(password, 12)

    await db.execute({
      sql: 'INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)',
      args: [email.toLowerCase(), passwordHash, name],
    })

    return { success: true, message: 'Admin created successfully' }
  } catch (error) {
    console.error('Register error:', error)
    return { success: false, error: 'Registration failed' }
  }
}

// Change password (operates on the currently authenticated admin)
export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  const session = await getSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  await ensureDb()

  const result = changePasswordSchema.safeParse(data)
  if (!result.success) {
    return { success: false, error: 'Validation failed' }
  }

  const { currentPassword, newPassword } = result.data
  const email = session.email

  try {
    // Verify current password
    const user = await db.execute({
      sql: 'SELECT * FROM admin_users WHERE email = ?',
      args: [email.toLowerCase()],
    })

    if (user.rows.length === 0) {
      return { success: false, error: 'User not found' }
    }

    const admin = user.rows[0]
    const validPassword = await bcrypt.compare(currentPassword, admin.password_hash as string)

    if (!validPassword) {
      return { success: false, error: 'Current password is incorrect' }
    }

    // Update password
    const newPasswordHash = await bcrypt.hash(newPassword, 12)

    await db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
      args: [newPasswordHash, email.toLowerCase()],
    })

    return { success: true, message: 'Password changed successfully' }
  } catch (error) {
    console.error('Change password error:', error)
    return { success: false, error: 'Failed to change password' }
  }
}

// Check if any admin exists
export async function hasAdminUser() {
  await ensureDb()

  try {
    const result = await db.execute('SELECT COUNT(*) as count FROM admin_users')
    const count = result.rows[0].count as number
    return count > 0
  } catch {
    return false
  }
}
