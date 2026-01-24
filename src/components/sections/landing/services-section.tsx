import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { services } from '@/lib/constants'

const categoryIcons: Record<string, string> = {
  dulce: '🍰',
  salado: '🌽',
  paquete: '🎁',
}

const categoryLabels: Record<string, string> = {
  dulce: 'Sweet',
  salado: 'Savory',
  paquete: 'Package',
}

export function ServicesSection() {
  const featuredServices = services.filter((s) => s.featured)

  return (
    <section
      id="services"
      className="relative px-4 py-16 md:py-24"
    >
      {/* Pattern: 1 left, 2 right */}
      <FloatingStickers stickerIndices={[0, 3, 6]} positionIndices={[0, 2, 3]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl animateHeading">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animateText">
            Delicious treats for every occasion. From sweet mini pancakes to savory elote cups.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {featuredServices.map((service) => (
            <Card
              key={service.id}
              className="group w-full overflow-hidden border-pink-medium/30 transition-all hover:border-gold hover:shadow-lg md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] animateProjectCard"
            >
              <div className="aspect-video bg-pink-soft" />
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-pink-soft text-pink-text">
                    {categoryIcons[service.category]} {categoryLabels[service.category]}
                  </Badge>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-pink-text">
                  {service.name}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-medium text-pink-accent hover:text-gold transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-pink-medium text-pink-text hover:bg-pink-soft hover:text-gold transition-colors"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
