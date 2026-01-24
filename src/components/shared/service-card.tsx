import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryLabel =
    service.category === 'dulce'
      ? 'Sweet'
      : service.category === 'salado'
        ? 'Savory'
        : 'Package'

  return (
    <Card className="overflow-hidden border-pink-primary/20 transition-shadow hover:shadow-brand">
      <div className="h-48 bg-pink-light" />
      <CardContent className="p-6">
        <Badge
          variant="secondary"
          className="mb-2 bg-pink-primary/20 text-teal-dark"
        >
          {categoryLabel}
        </Badge>
        <h3 className="mb-2 text-xl font-semibold text-teal-dark">
          {service.name}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {service.shortDescription}
        </p>
        <Button
          asChild
          variant="outline"
          className="w-full border-pink-primary hover:bg-pink-light"
        >
          <Link href={`/services/${service.slug}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
