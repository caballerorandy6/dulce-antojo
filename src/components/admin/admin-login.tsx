'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock, PlusCircle, History, LogOut, Settings, UserPlus } from 'lucide-react'
import { PaymentForm } from './payment-form'
import { PaymentHistoryDb } from './payment-history-db'
import { ChangePassword } from './change-password'
import { AdminFormSkeleton } from './admin-skeleton'
import { loginAdmin, registerFirstAdmin, hasAdminUser } from '@/app/actions/auth'

type Tab = 'create' | 'history' | 'settings'

interface AdminUser {
  id: number
  email: string
  name: string
}

export function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [needsSetup, setNeedsSetup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('create')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  // Check if setup is needed
  useEffect(() => {
    async function checkSetup() {
      const hasAdmin = await hasAdminUser()
      setNeedsSetup(!hasAdmin)
      setIsLoading(false)
    }
    checkSetup()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setError('')

    const result = await loginAdmin({ email, password })

    if (result.success && result.admin) {
      setAdmin(result.admin)
      setIsAuthenticated(true)
    } else {
      setError(result.error || 'Login failed')
    }

    setFormLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setError('')

    const result = await registerFirstAdmin({ email, password, name })

    if (result.success) {
      // Auto-login after registration
      const loginResult = await loginAdmin({ email, password })
      if (loginResult.success && loginResult.admin) {
        setAdmin(loginResult.admin)
        setIsAuthenticated(true)
        setNeedsSetup(false)
      }
    } else {
      setError(result.error || 'Registration failed')
    }

    setFormLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAdmin(null)
    setEmail('')
    setPassword('')
    setActiveTab('create')
  }

  if (isLoading) {
    return <AdminFormSkeleton />
  }

  // Setup screen - First admin registration
  if (needsSetup) {
    return (
      <div className="min-h-screen bg-pink-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-pink-primary/20 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-pink-dark" />
            </div>
            <CardTitle className="text-2xl font-display text-teal-dark">Create Admin Account</CardTitle>
            <CardDescription>Set up your admin account to manage payments</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  minLength={6}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
              )}
              <Button
                type="submit"
                disabled={formLoading}
                className="w-full bg-pink-dark hover:bg-pink-dark/90"
              >
                {formLoading ? 'Creating...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pink-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-pink-primary/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-pink-dark" />
            </div>
            <CardTitle className="text-2xl font-display text-teal-dark">Admin Panel</CardTitle>
            <CardDescription>Sign in to manage payments</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
              )}
              <Button
                type="submit"
                disabled={formLoading}
                className="w-full bg-pink-dark hover:bg-pink-dark/90"
              >
                {formLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-pink-bg p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display text-teal-dark">Payment Panel</h1>
            <p className="text-text-muted mt-1">
              Welcome, {admin?.name || 'Admin'}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm flex-wrap">
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            className={activeTab === 'create' ? 'bg-pink-dark hover:bg-pink-dark/90' : ''}
            onClick={() => setActiveTab('create')}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Link
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            className={activeTab === 'history' ? 'bg-pink-dark hover:bg-pink-dark/90' : ''}
            onClick={() => setActiveTab('history')}
          >
            <History className="w-4 h-4 mr-2" />
            Payments
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className={activeTab === 'settings' ? 'bg-pink-dark hover:bg-pink-dark/90' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'create' && admin && (
          <PaymentForm adminEmail={admin.email} />
        )}
        {activeTab === 'history' && (
          <PaymentHistoryDb />
        )}
        {activeTab === 'settings' && admin && (
          <ChangePassword email={admin.email} />
        )}
      </div>
    </div>
  )
}
