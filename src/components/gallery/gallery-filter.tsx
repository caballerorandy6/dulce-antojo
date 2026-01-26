'use client'

import { useState } from 'react'
import Image from 'next/image'
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
} from '@/components/ui/dialog'
import { services } from '@/lib/constants'

interface GalleryItem {
  id: string
  src: string
  alt: string
  serviceId: string
  serviceName: string
  category: string
}

const galleryImages: GalleryItem[] = [
  // Mini Pancakes
  { id: 'mini-pancakes-1', src: '/images/services/mini-pancakes.avif', alt: 'Mini pancakes with toppings and drizzles', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  { id: 'mini-pancakes-2', src: '/images/services/mini-pankakes-1.avif', alt: 'Mini pancakes with strawberries and chocolate', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  { id: 'mini-pancakes-3', src: '/images/services/mini-pankakes-2.avif', alt: 'Mini pancakes station at Houston event', serviceId: 'mini-pancakes', serviceName: 'Mini Pancakes', category: 'dulce' },
  // Paletas Locas
  { id: 'paletas-locas-1', src: '/images/services/paletas-locas.avif', alt: 'Paletas locas with colorful toppings', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  { id: 'paletas-locas-2', src: '/images/services/paleta-1.avif', alt: 'Mexican paleta with chamoy', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  { id: 'paletas-locas-3', src: '/images/services/paleta-2.avif', alt: 'Paletas locas with candy toppings', serviceId: 'paletas-locas', serviceName: 'Paletas Locas', category: 'dulce' },
  // Churro Sundaes
  { id: 'churro-sundaes-1', src: '/images/services/churro-sundaes.avif', alt: 'Churro sundae with ice cream', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  { id: 'churro-sundaes-2', src: '/images/services/churro-sundae-1.avif', alt: 'Churro sundae with strawberries', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  { id: 'churro-sundaes-3', src: '/images/services/churro-sundae-2.avif', alt: 'Churros with ice cream dessert', serviceId: 'churro-sundaes', serviceName: 'Churro Sundaes', category: 'dulce' },
  // Sundaes
  { id: 'sundaes-1', src: '/images/services/sundaes-1.avif', alt: 'Ice cream sundae with drizzles', serviceId: 'sundaes', serviceName: 'Sundaes', category: 'dulce' },
  // Corn in a Cup
  { id: 'corn-in-a-cup-1', src: '/images/services/corn-in-a-cup.avif', alt: 'Elote corn in a cup', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  { id: 'corn-in-a-cup-2', src: '/images/services/elote-cup-1.avif', alt: 'Mexican elote cup with cheese', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  { id: 'corn-in-a-cup-3', src: '/images/services/elote-cup-2.avif', alt: 'Corn cup with toppings', serviceId: 'corn-in-a-cup', serviceName: 'Corn in a Cup', category: 'salado' },
  // Tosti-Elote
  { id: 'tosti-elote-1', src: '/images/services/tosti-elote-2.avif', alt: 'Tosti-Elote with chips and corn', serviceId: 'tosti-elote', serviceName: 'Tosti-Elote', category: 'salado' },
  { id: 'tosti-elote-2', src: '/images/services/elote-1.avif', alt: 'Tosti-Elote with toppings', serviceId: 'tosti-elote', serviceName: 'Tosti-Elote', category: 'salado' },
  // Mix and Match
  { id: 'mix-and-match-1', src: '/images/services/mix-and-match-1.avif', alt: 'Mix and match cart setup', serviceId: 'mix-and-match', serviceName: 'Mix & Match', category: 'paquete' },
  { id: 'mix-and-match-2', src: '/images/services/cart-4.avif', alt: 'Dessert cart at event', serviceId: 'mix-and-match', serviceName: 'Mix & Match', category: 'paquete' },
  // Ramen/Maruchan
  { id: 'ramen-maruchan-1', src: '/images/services/ramen-1.avif', alt: 'Maruchan ramen with hot cheetos', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  { id: 'ramen-maruchan-2', src: '/images/services/ramen-2.avif', alt: 'Mexican style instant ramen', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  { id: 'ramen-maruchan-3', src: '/images/services/ramen-3.avif', alt: 'Ramen with toppings at event', serviceId: 'ramen-maruchan', serviceName: 'Ramen/Maruchan', category: 'salado' },
  // Paleta Cart Rental
  { id: 'paleta-cart-rental-1', src: '/images/services/paletas-cart-1.avif', alt: 'Paleta cart setup for events', serviceId: 'paleta-cart-rental', serviceName: 'Paleta Cart Rental', category: 'dulce' },
  { id: 'paleta-cart-rental-2', src: '/images/services/paletas-cart-2.avif', alt: 'Paleta cart at party', serviceId: 'paleta-cart-rental', serviceName: 'Paleta Cart Rental', category: 'dulce' },
  // Sorbet
  { id: 'sorbet-1', src: '/images/services/mango-loco-1.avif', alt: 'Mango loco sorbet with chamoy', serviceId: 'sorbet', serviceName: 'Sorbet', category: 'dulce' },
  // Churros
  { id: 'churros-1', src: '/images/services/churros.avif', alt: 'Fresh churros with drizzles', serviceId: 'churros', serviceName: 'Churros', category: 'dulce' },
  // Fresa Cups
  { id: 'fresa-cups-1', src: '/images/services/fresa-cup-1.avif', alt: 'Fresa cup with cream', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  { id: 'fresa-cups-2', src: '/images/services/fresa-cup-2.avif', alt: 'Strawberry cup with chocolate', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  { id: 'fresa-cups-3', src: '/images/services/fresa-cup-3.avif', alt: 'Fresh strawberry cup dessert', serviceId: 'fresa-cups', serviceName: 'Fresa Cups', category: 'dulce' },
  // Snack Cup
  { id: 'snack-cup-1', src: '/images/services/snack-cup-1.avif', alt: 'Snack cup with takis and candy', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },
  { id: 'snack-cup-2', src: '/images/services/snack-cup-2.avif', alt: 'Mexican snack cup', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },
  { id: 'snack-cup-3', src: '/images/services/snack-cup-3.avif', alt: 'Snack cup with chamoy', serviceId: 'snack-cup', serviceName: 'Snack Cup', category: 'salado' },
  // Toppings Stations
  { id: 'toppings-1', src: '/images/services/toppings-station-1.avif', alt: 'Toppings station with candy and fruits', serviceId: 'mini-pancakes', serviceName: 'Toppings Station', category: 'dulce' },
  { id: 'toppings-2', src: '/images/services/toppings-station-2.avif', alt: 'Mini pancakes toppings bar setup', serviceId: 'mini-pancakes', serviceName: 'Toppings Station', category: 'dulce' },
]

export function GalleryFilter() {
  const [selectedService, setSelectedService] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems =
    selectedService === 'all'
      ? galleryImages
      : galleryImages.filter((item) => item.serviceId === selectedService)

  return (
    <div>
      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-[280px] border-pink-medium/50 bg-white">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {filteredItems.map((item) => (
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

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No images found for this service.
          </p>
        </div>
      )}

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-pink-medium/30 bg-white p-2">
          {selectedImage && (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
