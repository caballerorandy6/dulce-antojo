'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  History,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Users,
} from 'lucide-react'
import {
  getPayments,
  getPaymentStats,
  markAsContacted,
  updatePaymentNotes,
  type DbPayment,
} from '@/app/actions/db-payments'
import { PaymentHistorySkeleton } from './admin-skeleton'

export function PaymentHistoryDb() {
  const [payments, setPayments] = useState<DbPayment[]>([])
  const [stats, setStats] = useState<{
    totalRevenue: number
    totalPayments: number
    thisMonthRevenue: number
    thisMonthPayments: number
    pendingContact: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingNotes, setEditingNotes] = useState<number | null>(null)
  const [notesValue, setNotesValue] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    setError('')

    const [paymentsResult, statsResult] = await Promise.all([
      getPayments(),
      getPaymentStats(),
    ])

    if (paymentsResult.success && paymentsResult.payments) {
      setPayments(paymentsResult.payments)
    } else {
      setError(paymentsResult.error || 'Failed to load payments')
    }

    if (statsResult.success && statsResult.stats) {
      setStats(statsResult.stats)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const handleToggleContacted = async (payment: DbPayment) => {
    const result = await markAsContacted(payment.id, !payment.contacted)
    if (result.success) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === payment.id ? { ...p, contacted: !p.contacted } : p
        )
      )
    }
  }

  const handleSaveNotes = async (paymentId: number) => {
    const result = await updatePaymentNotes(paymentId, notesValue)
    if (result.success) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, notes: notesValue } : p
        )
      )
      setEditingNotes(null)
      setNotesValue('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Total Revenue</p>
                  <p className="text-lg font-bold text-teal-dark">
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
                  <p className="text-xs text-text-muted">This Month</p>
                  <p className="text-lg font-bold text-teal-dark">
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
                  <p className="text-xs text-text-muted">Payments</p>
                  <p className="text-lg font-bold text-teal-dark">
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
                  <p className="text-xs text-text-muted">This Month</p>
                  <p className="text-lg font-bold text-teal-dark">
                    {stats.thisMonthPayments}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">To Contact</p>
                  <p className="text-lg font-bold text-teal-dark">
                    {stats.pendingContact}
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
              Manage your payments and track customers
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
                  <div className="h-24 bg-gray-100 rounded-lg" />
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
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    payment.contacted
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-teal-dark">
                          {payment.customer_name}
                        </p>
                        {!payment.contacted && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                            Needs contact
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-muted mb-2">
                        {payment.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(payment.created_at)}
                        </span>
                        {payment.customer_email && (
                          <a
                            href={`mailto:${payment.customer_email}`}
                            className="flex items-center gap-1 text-pink-dark hover:underline"
                          >
                            <Mail className="w-3 h-3" />
                            {payment.customer_email}
                          </a>
                        )}
                      </div>

                      {/* Notes */}
                      {editingNotes === payment.id ? (
                        <div className="mt-3 flex gap-2">
                          <Input
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            placeholder="Add notes..."
                            className="text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveNotes(payment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNotes(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : payment.notes ? (
                        <p
                          className="mt-2 text-sm text-gray-600 bg-white p-2 rounded cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setEditingNotes(payment.id)
                            setNotesValue(payment.notes || '')
                          }}
                        >
                          <MessageSquare className="w-3 h-3 inline mr-1" />
                          {payment.notes}
                        </p>
                      ) : (
                        <button
                          className="mt-2 text-xs text-pink-dark hover:underline flex items-center gap-1"
                          onClick={() => {
                            setEditingNotes(payment.id)
                            setNotesValue('')
                          }}
                        >
                          <MessageSquare className="w-3 h-3" />
                          Add notes
                        </button>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">
                        {formatCurrency(payment.amount)}
                      </p>
                      <Button
                        size="sm"
                        variant={payment.contacted ? 'outline' : 'default'}
                        className={!payment.contacted ? 'bg-pink-dark hover:bg-pink-dark/90 mt-2' : 'mt-2'}
                        onClick={() => handleToggleContacted(payment)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        {payment.contacted ? 'Contacted' : 'Mark Contacted'}
                      </Button>
                    </div>
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
