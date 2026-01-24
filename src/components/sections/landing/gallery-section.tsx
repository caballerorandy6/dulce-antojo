'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { cn } from '@/lib/utils'

const galleryItems = [
  { id: 1, alt: 'Mini pancakes setup at wedding' },
  { id: 2, alt: 'Paletas cart at quinceañera' },
  { id: 3, alt: 'Churro sundaes at birthday party' },
  { id: 4, alt: 'Elote cups at corporate event' },
  { id: 5, alt: 'Dessert cart decorated for baby shower' },
  { id: 6, alt: 'Snack cup station at graduation' },
]

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerView = 3
  const maxIndex = Math.max(0, galleryItems.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section
      id="gallery"
      className="relative bg-pink-soft px-4 py-16 md:py-24"
    >
      {/* Pattern: 1 left, 2 right */}
      <FloatingStickers stickerIndices={[9, 10, 11]} positionIndices={[1, 2, 3]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Our Gallery
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See our dessert carts bringing joy to events across Houston
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 border-pink-medium bg-white/90 hover:bg-pink-soft disabled:opacity-50"
            aria-label="Previous images"
          >
            <ChevronLeft className="h-5 w-5 text-pink-text" aria-hidden="true" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 border-pink-medium bg-white/90 hover:bg-pink-soft disabled:opacity-50"
            aria-label="Next images"
          >
            <ChevronRight className="h-5 w-5 text-pink-text" aria-hidden="true" />
          </Button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-2">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 md:w-1/3"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-pink-medium/30">
                    {/* Placeholder - will be replaced with actual images */}
                    <div className="flex h-full w-full items-center justify-center text-pink-text/50">
                      <span className="text-4xl">📸</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Gallery navigation">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  currentIndex === i ? 'bg-pink-accent' : 'bg-pink-medium/50'
                )}
                role="tab"
                aria-selected={currentIndex === i}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
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
      </div>
    </section>
  )
}
