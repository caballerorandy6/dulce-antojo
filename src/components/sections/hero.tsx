import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { businessInfo } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative bg-gradient-brand px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <Badge className="mb-4 bg-pink-accent/20 text-pink-text hover:bg-pink-accent/30">
          {businessInfo.location.city}, {businessInfo.location.state}
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-pink-text md:text-6xl">
          {businessInfo.name}
        </h1>
        <p className="mb-2 text-xl text-pink-dark md:text-2xl">
          {businessInfo.tagline}
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          {businessInfo.description}. Perfect for weddings, quinceañeras,
          birthdays, and corporate events.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-pink-accent hover:bg-pink-dark shadow-brand"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white border-pink-medium text-pink-text hover:bg-pink-soft"
          >
            <Link href="/services">View Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
