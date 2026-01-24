import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { businessInfo } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="bg-pink-accent px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Ready to Make Your Event Unforgettable?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Contact us today to book your dessert cart for your next event.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            <a
              href={businessInfo.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
