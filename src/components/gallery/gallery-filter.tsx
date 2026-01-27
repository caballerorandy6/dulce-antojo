'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface GalleryItem {
  id: string
  src: string
  alt: string
  serviceId: string
  serviceName: string
  category: 'dulce' | 'salado' | 'paquete' | 'cart'
}

const galleryImages: GalleryItem[] = [
  // ===== SWEET / DULCE =====
  // Mini Pancakes
  { id: 'mini-pancakes-1', src: '/images/services/mini-pancakes.avif', alt: 'Mini pancakes with toppings and drizzles', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  { id: 'mini-pancakes-2', src: '/images/services/mini-pankakes-1.avif', alt: 'Mini pancakes with strawberries and chocolate', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  { id: 'mini-pancakes-3', src: '/images/services/mini-pankakes-2.avif', alt: 'Mini pancakes station at Houston event', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  // Paletas Locas
  { id: 'paletas-locas-1', src: '/images/services/paletas-locas.avif', alt: 'Paletas locas with colorful toppings', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  { id: 'paletas-locas-2', src: '/images/services/paleta-1.avif', alt: 'Mexican paleta with chamoy', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  { id: 'paletas-locas-3', src: '/images/services/paleta-2.avif', alt: 'Paletas locas with candy toppings', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  // Churro Sundaes
  { id: 'churro-sundaes-1', src: '/images/services/churro-sundae-3.avif', alt: 'Churro sundae with ice cream', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  { id: 'churro-sundaes-2', src: '/images/services/churro-sundae-4.avif', alt: 'Churro sundae with strawberries', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  { id: 'churro-sundaes-3', src: '/images/services/churro-sundae-5.avif', alt: 'Churros with ice cream dessert', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  // Sundaes
  { id: 'sundaes-1', src: '/images/services/sundae.avif', alt: 'Ice cream sundae with drizzles', serviceId: 'sundaes', serviceName: 'Sundaes', category: 'dulce' },
  { id: 'sundaes-2', src: '/images/services/sundaes-1.avif', alt: 'Sundae with toppings', serviceId: 'sundaes', serviceName: 'Sundaes', category: 'dulce' },
  // Paleta Cart Rental
  { id: 'paleta-cart-rental-1', src: '/images/services/paletas-cart-1.avif', alt: 'Paleta cart setup for events', serviceId: 'paleta-cart-rental', serviceName: 'Paleta Cart Rental', category: 'dulce' },
  { id: 'paleta-cart-rental-2', src: '/images/services/paletas-cart-2.avif', alt: 'Paleta cart at party', serviceId: 'paleta-cart-rental', serviceName: 'Paleta Cart Rental', category: 'dulce' },
  { id: 'paleta-cart-rental-3', src: '/images/services/cart-4.avif', alt: 'Paleta cart rental for Houston events', serviceId: 'paleta-cart-rental', serviceName: 'Paleta Cart Rental', category: 'dulce' },
  // Sorbet
  { id: 'sorbet-1', src: '/images/services/sorbet-1.avif', alt: 'Mango loco sorbet with chamoy', serviceId: 'sorbet', serviceName: 'Sorbet', category: 'dulce' },
  { id: 'sorbet-2', src: '/images/services/sorbet-2.avif', alt: 'Sorbet with toppings', serviceId: 'sorbet', serviceName: 'Sorbet', category: 'dulce' },
  { id: 'sorbet-3', src: '/images/services/sorbet-3.avif', alt: 'Fresh fruit sorbet', serviceId: 'sorbet', serviceName: 'Sorbet', category: 'dulce' },
  // Churros
  { id: 'churros-1', src: '/images/services/churros-1.avif', alt: 'Fresh churros with drizzles', serviceId: 'churros', serviceName: 'Churros', category: 'dulce' },
  { id: 'churros-2', src: '/images/services/churros-2.avif', alt: 'Churros with chocolate', serviceId: 'churros', serviceName: 'Churros', category: 'dulce' },
  { id: 'churros-3', src: '/images/services/churros-3.avif', alt: 'Churros dessert station', serviceId: 'churros', serviceName: 'Churros', category: 'dulce' },
  // Fresa Cups
  { id: 'fresa-cups-1', src: '/images/services/fresa-cup-4.avif', alt: 'Fresa cup with cream', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  { id: 'fresa-cups-2', src: '/images/services/fresa-cup-5.avif', alt: 'Strawberry cup with chocolate', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  { id: 'fresa-cups-3', src: '/images/services/fresa-cup-6.avif', alt: 'Fresh strawberry cup dessert', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  // Toppings Stations
  { id: 'toppings-1', src: '/images/services/toppings-station-1.avif', alt: 'Toppings station with candy and fruits', serviceId: 'toppings', serviceName: 'Toppings Station', category: 'dulce' },
  { id: 'toppings-2', src: '/images/services/toppings-station-2.avif', alt: 'Toppings bar setup for events', serviceId: 'toppings', serviceName: 'Toppings Station', category: 'dulce' },

  // ===== SAVORY / SALADO =====
  // Corn in a Cup
  { id: 'corn-in-a-cup-1', src: '/images/services/corn-in-a-cup-1.avif', alt: 'Elote corn in a cup', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  { id: 'corn-in-a-cup-2', src: '/images/services/elote-cup-1.avif', alt: 'Mexican elote cup with cheese', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  { id: 'corn-in-a-cup-3', src: '/images/services/elote-cup-2.avif', alt: 'Corn cup with toppings', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  // Tosti-Elote
  { id: 'tosti-elote-1', src: '/images/services/tosti-elote-2.avif', alt: 'Tosti-Elote with chips and corn', serviceId: 'tosti-elote', serviceName: 'Tosti-Elote', category: 'salado' },
  { id: 'tosti-elote-2', src: '/images/services/tosti-elote.avif', alt: 'Tosti-Elote with toppings', serviceId: 'tosti-elote', serviceName: 'Tosti-Elote', category: 'salado' },
  // Ramen/Maruchan
  { id: 'ramen-maruchan-1', src: '/images/services/ramen-2.avif', alt: 'Maruchan ramen with hot cheetos', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  { id: 'ramen-maruchan-2', src: '/images/services/ramen-1.avif', alt: 'Mexican style instant ramen', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  { id: 'ramen-maruchan-3', src: '/images/services/ramen-3.avif', alt: 'Ramen with toppings at event', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  // Snack Cup
  { id: 'snack-cup-1', src: '/images/services/snack-cup-1.avif', alt: 'Snack cup with takis and candy', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },
  { id: 'snack-cup-2', src: '/images/services/snack-cup-2.avif', alt: 'Mexican snack cup', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },
  { id: 'snack-cup-3', src: '/images/services/snack-cup-3.avif', alt: 'Snack cup with chamoy', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },

  // ===== PACKAGES / PAQUETES =====
  // Mix and Match
  { id: 'mix-and-match-1', src: '/images/services/mix-and-match-1.avif', alt: 'Mix and match cart setup', serviceId: 'mix-and-match', serviceName: 'Mix & Match', category: 'paquete' },
  { id: 'mix-and-match-2', src: '/images/services/mix-and-match-2.avif', alt: 'Dessert cart at event', serviceId: 'mix-and-match', serviceName: 'Mix & Match', category: 'paquete' },
  { id: 'mix-and-match-3', src: '/images/services/mix-and-match-3.avif', alt: 'Mix and match dessert options', serviceId: 'mix-and-match', serviceName: 'Mix & Match', category: 'paquete' },

  // ===== OUR CARTS =====
  { id: 'cart-1', src: '/images/services/cart-4.avif', alt: 'Dulce Antojo dessert cart', serviceId: 'cart', serviceName: 'Our Carts', category: 'cart' },
  { id: 'cart-2', src: '/images/services/paletas-cart-1.avif', alt: 'Paleta cart for events', serviceId: 'cart', serviceName: 'Our Carts', category: 'cart' },
  { id: 'cart-3', src: '/images/hero/cart-18.avif', alt: 'Dulce Antojo cart at Houston event', serviceId: 'cart', serviceName: 'Our Carts', category: 'cart' },
]

const categoryLabels = {
  dulce: { title: 'Sweet Treats' },
  salado: { title: 'Savory Snacks' },
  paquete: { title: 'Packages' },
  cart: { title: 'Our Carts' },
}

export function GalleryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredByCategory =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((item) => item.category === selectedCategory)

  // Group images by category for organized display
  const groupedImages = filteredByCategory.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, GalleryItem[]>)

  const categoryOrder = ['dulce', 'salado', 'paquete', 'cart']

  return (
    <div>
      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px] border-pink-medium/50 bg-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="dulce">🍬 Sweet Treats</SelectItem>
            <SelectItem value="salado">🌽 Savory Snacks</SelectItem>
            <SelectItem value="paquete">📦 Packages</SelectItem>
            <SelectItem value="cart">🛒 Our Carts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gallery by Categories */}
      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const items = groupedImages[category]
          if (!items || items.length === 0) return null

          const { title } = categoryLabels[category as keyof typeof categoryLabels]

          return (
            <section key={category}>
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-2xl font-bold text-pink-text">{title}</h2>
                <div className="h-px flex-1 bg-pink-medium/30" />
              </div>

              {/* Category Grid */}
              <div className="flex flex-wrap justify-center gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="animateProjectCard group relative w-full aspect-square overflow-hidden rounded-2xl bg-pink-soft md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] cursor-pointer border border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="p-4 font-semibold text-white">
                        {item.serviceName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredByCategory.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No images found for this category.
          </p>
        </div>
      )}

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-0 bg-transparent p-0 shadow-2xl" showCloseButton={false}>
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.serviceName} photo</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              {/* Background Image */}
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Custom Close Button */}
              <DialogClose className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-pink-accent hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>

              {/* Service Name */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
                  {selectedImage.serviceName}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Dulce Antojo Houston
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  {categoryLabels[selectedImage.category as keyof typeof categoryLabels]?.title}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
