import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Home, Instagram, Receipt } from 'lucide-react'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'

export const metadata = {
  title: 'Payment Successful | Dulce Antojo',
  description: 'Thank you for your payment!',
}

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      amount: session.amount_total ? session.amount_total / 100 : 0,
      customerName: session.metadata?.customerName || session.customer_details?.name || 'Customer',
      description: session.metadata?.description || 'Payment',
      email: session.customer_details?.email,
    }
  } catch {
    return null
  }
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const { session_id } = await searchParams
  const details = session_id ? await getSessionDetails(session_id) : null

  return (
    <div className="min-h-screen bg-pink-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-display text-teal-dark">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {details && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Receipt className="w-4 h-4" />
                <span className="font-medium">Payment Receipt</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ${details.amount.toFixed(2)} USD
              </p>
              <p className="text-sm text-green-700">{details.description}</p>
              {details.email && (
                <p className="text-xs text-green-600">
                  Confirmation sent to {details.email}
                </p>
              )}
            </div>
          )}

          <p className="text-text-muted">
            Thank you for your payment! We&apos;ve received your payment and will be in touch soon to confirm the details of your event.
          </p>

          <div className="bg-pink-light/50 rounded-lg p-4">
            <p className="text-sm text-teal-dark font-medium">
              Questions? Contact us on Instagram
            </p>
            <a
              href="https://instagram.com/dulceantojo.houstontx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-dark hover:text-pink-dark/80 mt-2"
            >
              <Instagram className="w-4 h-4" />
              @dulceantojo.houstontx
            </a>
          </div>

          <Button asChild className="w-full bg-pink-dark hover:bg-pink-dark/90">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
