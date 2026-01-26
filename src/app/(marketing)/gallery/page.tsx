import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GalleryFilter } from '@/components/gallery/gallery-filter'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { Lordicon } from '@/components/shared/lordicon'
import { businessInfo } from '@/lib/constants'

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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <GalleryFilter />
        </div>
      </section>

      {/* Combined CTA Section */}
      <section className="relative overflow-hidden bg-pink-soft px-4 py-16">
        <FloatingStickers
          stickerIndices={[0, 3, 6, 9]}
          positionIndices={[0, 2, 4, 5]}
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Instagram Card */}
            <div className="instagram-card rounded-2xl bg-white p-8 text-center shadow-lg border border-pink-medium/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Lordicon
                  src="/icons/instagram.json"
                  trigger="hover"
                  target=".instagram-card"
                  size={64}
                />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-pink-text">
                Follow Our Journey
              </h2>
              <p className="mb-6 text-muted-foreground">
                Behind-the-scenes content, latest events, and sweet moments.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white transition-colors"
              >
                <a
                  href={businessInfo.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {businessInfo.contact.instagram}
                </a>
              </Button>
            </div>

            {/* Quote Card */}
            <div className="quote-card rounded-2xl bg-pink-accent p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Lordicon
                  src="/icons/confetti-new.json"
                  trigger="hover"
                  target=".quote-card"
                  size={64}
                />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">
                Want Us at Your Event?
              </h2>
              <p className="mb-6 text-white/90">
                Let&apos;s create beautiful memories together.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-pink-accent hover:bg-pink-soft transition-colors"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
