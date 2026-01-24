import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const galleryItems = [
  { id: 1, src: '/images/carousel/mini-pankakes-1.avif', alt: 'Mini pancakes with strawberries and chocolate drizzle' },
  { id: 2, src: '/images/carousel/mini-pankakes-2.avif', alt: 'Mini pancakes station setup at Houston event' },
  { id: 3, src: '/images/carousel/paleta-1.avif', alt: 'Mexican paleta with colorful toppings' },
  { id: 4, src: '/images/carousel/paleta-2.avif', alt: 'Paletas locas with chamoy and candy' },
  { id: 5, src: '/images/carousel/paletas-cart-1.avif', alt: 'Paletas cart setup for events in Houston' },
  { id: 6, src: '/images/carousel/paletas-cart-2.avif', alt: 'Dulce Antojo paletas cart at party' },
  { id: 7, src: '/images/carousel/churro-sundae-1.avif', alt: 'Churro sundae with vanilla ice cream and strawberries' },
  { id: 8, src: '/images/carousel/churro-sundae-2.avif', alt: 'Churros with ice cream dessert' },
  { id: 9, src: '/images/carousel/elote-cup-1.avif', alt: 'Elote cup with cheese and chile' },
  { id: 10, src: '/images/carousel/elote-cup-2.avif', alt: 'Mexican corn cup with toppings' },
  { id: 11, src: '/images/carousel/fresa-cup-1.avif', alt: 'Fresa cup with cream and cake' },
  { id: 12, src: '/images/carousel/mango-loco-1.avif', alt: 'Mango loco cup with chamoy and tajin' },
  { id: 13, src: '/images/carousel/snack-cup-1.avif', alt: 'Snack cup with takis and candy' },
  { id: 14, src: '/images/carousel/ramen-1.avif', alt: 'Maruchan ramen with hot cheetos at wedding' },
  { id: 15, src: '/images/carousel/ramen-2.avif', alt: 'Mexican style instant ramen' },
  { id: 16, src: '/images/carousel/toppings-station-1.avif', alt: 'Toppings station with candy and fruits' },
  { id: 17, src: '/images/carousel/toppings-station-2.avif', alt: 'Mini pancakes toppings bar setup' },
]

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative bg-pink-soft py-10 md:py-16"
    >
      {/* Infinite Marquee Carousel */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee w-fit">
          {/* First set */}
          {galleryItems.map((item) => (
            <div
              key={`first-${item.id}`}
              className="shrink-0 px-2"
            >
              <div className="relative h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-2xl bg-pink-medium/30 border border-pink-medium/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gold">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {galleryItems.map((item) => (
            <div
              key={`second-${item.id}`}
              className="shrink-0 px-2"
            >
              <div className="relative h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-2xl bg-pink-medium/30 border border-pink-medium/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gold">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
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
