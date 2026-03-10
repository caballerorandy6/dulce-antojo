'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Lock, Check } from 'lucide-react'
import { changePassword } from '@/app/actions/auth'

interface ChangePasswordProps {
  email: string
}

export function ChangePassword({ email }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    const result = await changePassword({
      email,
      currentPassword,
      newPassword,
    })

    if (result.success) {
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setError(result.error || 'Failed to change password')
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-pink-dark" />
          Change Password
        </CardTitle>
        <CardDescription>
          Update your admin password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              minLength={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4" />
              Password changed successfully
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-pink-dark hover:bg-pink-dark/90"
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
