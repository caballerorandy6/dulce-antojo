import type { Metadata } from 'next'
import Image from 'next/image'
import { GalleryFilter } from '@/components/gallery/gallery-filter'
import { SocialCTA } from '@/components/shared/social-cta'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'See our dessert carts in action at events in Houston, TX. Photos from weddings, quinceañeras, and parties.',
}

export default function GalleryPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/gallery.avif"
          alt="Dulce Antojo event gallery"
          fill
          className="object-cover blur-[0.5px] brightness-90"
          priority
        />
        {/* Overlay: dark base + subtle pink tint */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            Our Gallery
          </h1>
          <p className="animateText mx-auto max-w-2xl text-lg text-white/95 drop-shadow-sm">
            See our dessert carts bringing joy to events across Houston.
          </p>
        </div>
      </section>

      {/* Gallery with Filter */}
      <section className="relative px-4 py-16 pb-24">
        <div className="mx-auto max-w-6xl">
          <GalleryFilter />
        </div>
        {/* Gradient fade to CTA section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-soft pointer-events-none" />
      </section>

      <SocialCTA />
    </div>
  )
}
