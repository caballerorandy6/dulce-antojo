import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/sections/faq-section'
import { faqs } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Dulce Antojo dessert cart services in Houston, TX. Booking, pricing, and service information.',
}

export default function FAQPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="bg-gradient-brand px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-pink-text md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our services, booking
            process, and event details.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQSection faqs={faqs} title="" />

      {/* CTA */}
      <section className="bg-pink-accent px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="mb-8 text-white/90">
            Contact us directly and we&apos;ll be happy to help.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
