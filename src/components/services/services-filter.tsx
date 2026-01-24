'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import { services, categories } from '@/lib/constants'
import type { Service } from '@/types'

export function ServicesFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((service) => service.category === selectedCategory)

  return (
    <div>
      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px] border-pink-medium/50 bg-white">
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

      {/* Services Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
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
    <Card className="animateProjectCard w-full overflow-hidden border-pink-medium/30 transition-shadow hover:shadow-brand md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      <div className="h-48 bg-pink-soft" />
      <CardContent className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-pink-accent/20 text-pink-text"
          >
            {categoryLabel}
          </Badge>
          {service.featured && (
            <Badge className="bg-gold-accent text-white">Popular</Badge>
          )}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-pink-text">
          {service.name}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {service.shortDescription}
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full border-pink-medium text-pink-text hover:bg-pink-soft"
        >
          <Link href={`/services/${service.slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
