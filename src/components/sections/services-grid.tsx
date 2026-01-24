import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Service } from '@/types'

interface ServicesGridProps {
  services: Service[]
  showAllLink?: boolean
}

export function ServicesGrid({ services, showAllLink = false }: ServicesGridProps) {
  return (
    <section className="bg-pink-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Our Most Popular Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            From sweet mini pancakes to savory elote cups, we bring the perfect
            treats to your event.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-pink-accent hover:bg-pink-dark shadow-brand"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
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
    <Card className="overflow-hidden border-pink-medium/30 transition-shadow hover:shadow-brand">
      <div className="h-48 bg-pink-soft" />
      <CardContent className="p-6">
        <Badge
          variant="secondary"
          className="mb-2 bg-pink-accent/20 text-pink-text"
        >
          {categoryLabel}
        </Badge>
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
          <Link href={`/services/${service.slug}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
