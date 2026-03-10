'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  History,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { getPaymentHistory, getPaymentStats, type PaymentRecord } from '@/app/actions/payments'

interface PaymentHistoryProps {
  password: string
}

export function PaymentHistory({ password }: PaymentHistoryProps) {
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [stats, setStats] = useState<{
    totalRevenue: number
    totalPayments: number
    thisMonthRevenue: number
    thisMonthPayments: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    setError('')

    const [historyResult, statsResult] = await Promise.all([
      getPaymentHistory(password),
      getPaymentStats(password),
    ])

    if (historyResult.success && historyResult.payments) {
      setPayments(historyResult.payments)
    } else {
      setError(historyResult.error || 'Failed to load payments')
    }

    if (statsResult.success && statsResult.stats) {
      setStats(statsResult.stats)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [password])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Total Revenue</p>
                  <p className="text-xl font-bold text-teal-dark">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-pink-dark" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">This Month</p>
                  <p className="text-xl font-bold text-teal-dark">
                    {formatCurrency(stats.thisMonthRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Total Payments</p>
                  <p className="text-xl font-bold text-teal-dark">
                    {stats.totalPayments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">This Month</p>
                  <p className="text-xl font-bold text-teal-dark">
                    {stats.thisMonthPayments} payments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-pink-dark" />
              Payment History
            </CardTitle>
            <CardDescription>
              Recent payments from your customers
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-100 rounded-lg" />
                </div>
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-text-muted">No payments yet</p>
              <p className="text-sm text-gray-400">
                Payments will appear here once customers pay
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-teal-dark">
                        {payment.customerName}
                      </p>
                      <p className="text-sm text-text-muted">
                        {payment.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(payment.amount)}
                    </p>
                    <a
                      href={`https://dashboard.stripe.com/payments/${payment.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-dark hover:underline inline-flex items-center gap-1"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
