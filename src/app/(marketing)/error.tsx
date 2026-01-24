'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error reporting service (Sentry, etc.)
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-bg px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-pink-accent">Oops!</h1>
        <h2 className="mb-4 text-2xl font-semibold text-pink-text">
          Something went wrong
        </h2>
        <p className="mb-8 text-muted-foreground">
          We apologize for the inconvenience. Please try again.
        </p>
        <Button
          onClick={reset}
          className="bg-pink-accent hover:bg-pink-dark"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
