import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const galleryItems = [
  { id: 1, src: '/images/services/mini-pankakes-1.avif', alt: 'Mini pancakes with strawberries and chocolate drizzle' },
  { id: 2, src: '/images/services/mini-pankakes-2.avif', alt: 'Mini pancakes station setup at Houston event' },
  { id: 3, src: '/images/services/paleta-1.avif', alt: 'Mexican paleta with colorful toppings' },
  { id: 4, src: '/images/services/paleta-2.avif', alt: 'Paletas locas with chamoy and candy' },
  { id: 5, src: '/images/services/paletas-cart-1.avif', alt: 'Paletas cart setup for events in Houston' },
  { id: 6, src: '/images/services/paletas-cart-2.avif', alt: 'Dulce Antojo paletas cart at party' },
  { id: 7, src: '/images/services/churro-sundae-1.avif', alt: 'Churro sundae with vanilla ice cream and strawberries' },
  { id: 8, src: '/images/services/churro-sundae-2.avif', alt: 'Churros with ice cream dessert' },
  { id: 9, src: '/images/services/elote-cup-1.avif', alt: 'Elote cup with cheese and chile' },
  { id: 10, src: '/images/services/elote-cup-2.avif', alt: 'Mexican corn cup with toppings' },
  { id: 11, src: '/images/services/fresa-cup-1.avif', alt: 'Fresa cup with cream and cake' },
  { id: 12, src: '/images/services/mango-loco-1.avif', alt: 'Mango loco cup with chamoy and tajin' },
  { id: 13, src: '/images/services/snack-cup-1.avif', alt: 'Snack cup with takis and candy' },
  { id: 14, src: '/images/services/ramen-1.avif', alt: 'Maruchan ramen with hot cheetos at wedding' },
  { id: 15, src: '/images/services/ramen-2.avif', alt: 'Mexican style instant ramen' },
  { id: 16, src: '/images/services/toppings-station-1.avif', alt: 'Toppings station with candy and fruits' },
  { id: 17, src: '/images/services/toppings-station-2.avif', alt: 'Mini pancakes toppings bar setup' },
  { id: 18, src: '/images/services/sundaes-1.avif', alt: 'Ice cream sundae with drizzles and toppings' },
  { id: 19, src: '/images/services/tosti-elote-2.avif', alt: 'Tosti-Elote with corn toppings and chips' },
]

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative bg-pink-soft py-10 md:py-16 pb-20 md:pb-24"
    >
      {/* Infinite Marquee Carousel */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-marquee w-fit">
          {/* First set */}
          {galleryItems.map((item) => (
            <div
              key={`first-${item.id}`}
              className="group shrink-0 px-2"
            >
              <div className="relative h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-2xl bg-pink-medium/30 border-2 border-pink-medium/40 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-gold group-hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 288px, 384px"
                />
                {/* Pink overlay that fades on hover */}
                <div className="absolute inset-0 bg-pink-accent/15 transition-opacity duration-300 group-hover:opacity-0" />
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] rounded-2xl" />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {galleryItems.map((item) => (
            <div
              key={`second-${item.id}`}
              className="group shrink-0 px-2"
            >
              <div className="relative h-64 w-72 md:h-80 md:w-96 overflow-hidden rounded-2xl bg-pink-medium/30 border-2 border-pink-medium/40 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-gold group-hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 288px, 384px"
                />
                {/* Pink overlay that fades on hover */}
                <div className="absolute inset-0 bg-pink-accent/15 transition-opacity duration-300 group-hover:opacity-0" />
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] rounded-2xl" />
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
            Discover Our Sweet Moments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-bg/90 pointer-events-none" />
    </section>
  )
}
