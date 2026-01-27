import type { Metadata } from 'next'
import Image from 'next/image'
import { ServicesFilter } from '@/components/services/services-filter'
import { SocialCTA } from '@/components/shared/social-cta'

export const metadata: Metadata = {
  title: 'Dessert & Snack Cart Services for Events',
  description:
    'Explore our dessert and snack cart services for events in Houston, TX. Mini pancakes, paletas, churros, elote, and more. Book your event today!',
}

export default function ServicesPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/services.avif"
          alt="Dulce Antojo dessert cart services"
          fill
          className="object-cover object-bottom blur-[0.5px] brightness-90"
          priority
        />
        {/* Overlay: dark base + subtle pink tint */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            Our Services
          </h1>
          <p className="animateText mx-auto max-w-2xl text-lg text-white/95 drop-shadow-sm">
            From sweet mini pancakes to savory Mexican snacks, we have the
            perfect cart for your event.
          </p>
        </div>
      </section>

      {/* Services with Filter */}
      <section className="relative px-4 py-16 pb-24">
        <div className="mx-auto max-w-6xl">
          <ServicesFilter />
        </div>
        {/* Gradient fade to CTA section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-soft pointer-events-none" />
      </section>

      <SocialCTA
        quoteTitle="Can't Decide?"
        quoteDescription="Contact us and we'll help you choose the perfect service."
      />
    </div>
  )
}
