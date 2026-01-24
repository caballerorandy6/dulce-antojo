'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { services } from '@/lib/constants'

// Create placeholder items for demo (3 per service)
const expandedGalleryItems = services.flatMap((service) =>
  Array.from({ length: 3 }, (_, i) => ({
    id: `${service.id}-${i + 1}`,
    serviceId: service.id,
    serviceName: service.name,
    category: service.category,
  }))
)

export function GalleryFilter() {
  const [selectedService, setSelectedService] = useState<string>('all')

  const filteredItems =
    selectedService === 'all'
      ? expandedGalleryItems
      : expandedGalleryItems.filter((item) => item.serviceId === selectedService)

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
            className="animateProjectCard group relative w-full aspect-square overflow-hidden rounded-2xl bg-pink-soft md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            {/* Placeholder - will be replaced with Image component */}
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-pink-soft to-pink-medium/30">
              <span className="text-center font-medium text-pink-text/50 px-4">
                {item.serviceName}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-center font-semibold text-white px-4">
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
    </div>
  )
}
