import type { Metadata } from 'next'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <section className="bg-gradient-brand px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-pink-text md:text-5xl">
            Our Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See our dessert carts bringing joy to events across Houston.
          </p>
        </div>
      </section>

      {/* Gallery Grid Placeholder */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-pink-soft"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-pink-soft px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text">
            See More on Instagram
          </h2>
          <p className="mb-8 text-muted-foreground">
            Follow us for the latest photos, videos, and behind-the-scenes
            content from our events.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-pink-accent hover:bg-pink-dark"
          >
            <a
              href={businessInfo.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow {businessInfo.contact.instagram}
            </a>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-accent px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Want Us at Your Event?
          </h2>
          <p className="mb-8 text-white/90">
            Let&apos;s create beautiful memories together.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
