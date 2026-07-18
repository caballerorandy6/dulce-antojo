import { cookies } from 'next/headers'
import crypto from 'crypto'

// Signed, httpOnly session cookie for the admin panel.
// The token is `base64url(payload).base64url(hmac)`; the payload carries the
// authenticated admin identity plus an expiry, so the server never has to trust
// anything the client sends to prove who it is.

const COOKIE_NAME = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 8 // 8 hours

export interface SessionAdmin {
  id: number
  email: string
  name: string
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('SESSION_SECRET must be set (min 16 chars) to use the admin panel')
  }
  return secret
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export async function createSession(admin: SessionAdmin): Promise<void> {
  const data = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  }
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
  const token = `${payload}.${sign(payload)}`

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export async function getSession(): Promise<SessionAdmin | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  // Constant-time signature check before trusting the payload.
  const expected = sign(payload)
  const sigBuf = Buffer.from(signature)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (typeof data.exp !== 'number' || data.exp < Date.now()) return null
    return { id: data.id, email: data.email, name: data.name }
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
