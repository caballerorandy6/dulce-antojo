import type { Metadata } from 'next'
import Image from 'next/image'
import { FAQFilter } from '@/components/faq/faq-filter'
import { SocialCTA } from '@/components/shared/social-cta'
import { JsonLdFaq } from '@/components/seo/json-ld-faq'
import { faqs } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Dulce Antojo dessert cart services in Houston, TX. Booking, pricing, and service information.',
}

export default function FAQPage() {
  return (
    <div className="bg-pink-bg">
      <JsonLdFaq faqs={faqs} />
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/faq-3.avif"
          alt="Frequently asked questions about Dulce Antojo"
          fill
          className="object-cover blur-[0.5px] brightness-90"
          priority
        />
        {/* Overlay: dark base + subtle pink tint */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            Frequently Asked Questions
          </h1>
          <p className="animateText mx-auto max-w-2xl text-lg text-white/95 drop-shadow-sm">
            Find answers to common questions about our services, booking
            process, and event details.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative px-4 py-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <FAQFilter />
        </div>
        {/* Gradient fade to CTA section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-soft pointer-events-none" />
      </section>

      <SocialCTA
        quoteTitle="Still Have Questions?"
        quoteDescription="Contact us directly and we'll be happy to help."
      />
    </div>
  )
}
