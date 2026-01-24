import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'

const galleryItems = [
  { id: 1, src: '/images/gallery/gallery-1.avif', alt: 'Mini pancakes setup at wedding in Houston' },
  { id: 2, src: '/images/gallery/gallery-2.avif', alt: 'Paletas cart at quinceañera' },
  { id: 3, src: '/images/gallery/gallery-3.avif', alt: 'Churro sundaes at birthday party' },
  { id: 4, src: '/images/gallery/gallery-4.avif', alt: 'Elote cups at corporate event' },
  { id: 5, src: '/images/gallery/gallery-5.avif', alt: 'Dessert cart decorated for baby shower' },
  { id: 6, src: '/images/gallery/gallery-6.avif', alt: 'Snack cup station at graduation' },
]

export function GallerySection() {
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...galleryItems, ...galleryItems]

  return (
    <section
      id="gallery"
      className="relative bg-pink-soft py-16 md:py-24"
    >
      {/* Stickers - only top and bottom to avoid carousel */}
      <FloatingStickers stickerIndices={[9, 10, 11]} positionIndices={[6, 7, 8]} />

      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
          Our Gallery
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          See our dessert carts bringing joy to events across Houston
        </p>
      </div>

      {/* Infinite Marquee Carousel */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0 px-2"
            >
              <div className="relative h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-2xl bg-pink-medium/30">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mx-auto max-w-6xl px-4 mt-10 text-center">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-pink-medium text-pink-text hover:bg-white hover:text-gold transition-colors"
        >
          <Link href="/gallery">
            See More Photos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
