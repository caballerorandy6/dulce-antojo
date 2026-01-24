import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ServicesFilter } from '@/components/services/services-filter'
import { FloatingStickers } from '@/components/shared/floating-stickers'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our dessert and snack cart services for events in Houston, TX. Mini pancakes, paletas, churros, elote, and more.',
}

export default function ServicesPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/services/cart-our-services.avif"
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <ServicesFilter />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-pink-accent px-4 py-16">
        <FloatingStickers
          stickerIndices={[2, 5, 8, 11]}
          positionIndices={[0, 2, 4, 5]}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="animateHeading mb-4 text-3xl font-bold text-white">
            Can&apos;t Decide?
          </h2>
          <p className="animateText mb-8 text-white/90">
            Contact us and we&apos;ll help you choose the perfect service for
            your event.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
