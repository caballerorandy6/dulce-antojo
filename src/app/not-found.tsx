import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-bg px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-pink-accent">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-pink-text">
          Page Not Found
        </h2>
        <p className="mb-8 text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="bg-pink-accent hover:bg-pink-dark">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
