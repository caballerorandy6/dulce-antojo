'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Copy, Check, DollarSign, User, FileText } from 'lucide-react'
import { createPaymentLinkDb } from '@/app/actions/payments'

interface PaymentFormProps {
  adminEmail: string
}

export function PaymentForm({ adminEmail }: PaymentFormProps) {
  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [paymentLink, setPaymentLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPaymentLink('')

    const result = await createPaymentLinkDb({
      customerName,
      amount: parseFloat(amount),
      description,
      adminEmail,
    })

    if (result.success && result.paymentLink) {
      setPaymentLink(result.paymentLink)
      setCustomerName('')
      setAmount('')
      setDescription('')
    } else {
      setError(result.error || 'Something went wrong')
    }

    setIsLoading(false)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Create Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-pink-dark" />
            Create Payment Link
          </CardTitle>
          <CardDescription>
            Fill in the details and generate a payment link to send to your customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., Maria Garcia"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount (USD)
              </Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 350"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Mini Pancakes - Birthday Party"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-dark hover:bg-pink-dark/90"
            >
              {isLoading ? 'Creating...' : 'Create Payment Link'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Payment Link Result */}
      {paymentLink && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              <Check className="w-5 h-5" />
              Payment Link Created!
            </CardTitle>
            <CardDescription className="text-green-600">
              Copy the link below and send it to your customer via WhatsApp or email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={paymentLink}
                readOnly
                className="bg-white"
              />
              <Button
                type="button"
                onClick={copyToClipboard}
                variant="outline"
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-sm text-green-600 mt-3">
              {copied ? '✓ Copied to clipboard!' : 'Click the button to copy the link'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
