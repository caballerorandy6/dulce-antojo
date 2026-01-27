'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { services, categories, serviceImages } from '@/lib/constants'
import type { Service } from '@/types'

const categoryLabels = {
  dulce: { title: 'Sweet Treats' },
  salado: { title: 'Savory Snacks' },
  paquete: { title: 'Packages' },
}

export function ServicesFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category === selectedCategory)

  // Group services by category for organized display
  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, Service[]>)

  const categoryOrder = ['dulce', 'salado', 'paquete']

  return (
    <div>
      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px] border-pink-medium/50 bg-white" aria-label="Filter services by category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.icon} {category.nameEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Services by Categories */}
      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const items = groupedServices[category]
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
              <div className="flex flex-wrap justify-center gap-6">
                {items.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No services found for this category.
          </p>
        </div>
      )}
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const categoryLabel =
    service.category === 'dulce'
      ? 'Sweet'
      : service.category === 'salado'
        ? 'Savory'
        : 'Package'

  return (
    <Card className="animateProjectCard group relative w-full h-80 overflow-hidden border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      {/* Background Image */}
      {serviceImages[service.id] ? (
        <Image
          src={serviceImages[service.id]}
          alt={service.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-pink-soft" />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Content */}
      <CardContent className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="mb-2 flex items-center gap-2">
          <Badge className="bg-white/90 text-pink-text hover:bg-white">
            {categoryLabel}
          </Badge>
          {service.featured && (
            <Badge className="bg-gold-accent text-white">Popular</Badge>
          )}
        </div>
        <h3 className="mb-1 text-xl font-semibold text-white drop-shadow-md">
          {service.name}
        </h3>
        <p className="mb-4 text-sm text-white/90 drop-shadow-sm">
          {service.shortDescription}
        </p>
        <Button
          asChild
          className="w-full bg-pink-accent/90 text-white backdrop-blur-sm hover:bg-pink-accent hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Link href={`/services/${service.slug}`} className="flex items-center justify-center gap-2">
            View Details
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
