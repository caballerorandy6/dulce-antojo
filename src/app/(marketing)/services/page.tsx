import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/section-header'
import { services, categories } from '@/lib/constants'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our dessert and snack cart services for events in Houston, TX. Mini pancakes, paletas, churros, elote, and more.',
}

export default function ServicesPage() {
  const servicesByCategory = categories.map((category) => ({
    ...category,
    services: services.filter((s) => s.category === category.id),
  }))

  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="bg-gradient-brand px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-pink-text md:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From sweet mini pancakes to savory Mexican snacks, we have the
            perfect cart for your event.
          </p>
        </div>
      </section>

      {/* Services by Category */}
      {servicesByCategory.map((category) => (
        <section key={category.id} className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              title={`${category.icon} ${category.nameEn}`}
              description={category.description}
            />
            <div className="flex flex-wrap justify-center gap-6">
              {category.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-pink-accent px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Can&apos;t Decide?
          </h2>
          <p className="mb-8 text-white/90">
            Contact us and we&apos;ll help you choose the perfect service for
            your event.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
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
    <Card className="w-full overflow-hidden border-pink-medium/30 transition-shadow hover:shadow-brand md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
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
