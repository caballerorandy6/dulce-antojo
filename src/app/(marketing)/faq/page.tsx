import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/sections/faq-section'
import { FloatingStickers } from '@/components/shared/floating-stickers'
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
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/faq.avif"
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
      <FAQSection faqs={faqs} title="" />

      {/* CTA */}
      <section className="relative overflow-hidden bg-pink-accent px-4 py-16">
        <FloatingStickers
          stickerIndices={[3, 6, 9, 12]}
          positionIndices={[0, 2, 4, 5]}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="animateHeading mb-4 text-3xl font-bold text-white">
            Still Have Questions?
          </h2>
          <p className="animateText mb-8 text-white/90">
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
