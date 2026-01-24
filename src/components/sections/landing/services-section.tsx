import Link from 'next/link'
import Image from 'next/image'
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

const serviceImages: Record<string, string> = {
  'mini-pancakes': '/images/landing/mini-pancakes.avif',
  'paletas-locas': '/images/landing/paletas-locas.avif',
  'churro-sundaes': '/images/landing/churro-sundaes.avif',
  'sundaes': '/images/landing/sundaes.avif',
  'corn-in-a-cup': '/images/landing/corn-in-a-cup.avif',
  'tosti-elote': '/images/landing/tosti-elote-1.avif',
  'mix-and-match': '/images/landing/mix-and-match.avif',
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
              className="group w-full overflow-hidden border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] animateProjectCard"
            >
              <div className="relative aspect-video overflow-hidden bg-pink-soft">
                {serviceImages[service.id] && (
                  <Image
                    src={serviceImages[service.id]}
                    alt={service.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {/* Pink overlay that fades on hover */}
                <div className="absolute inset-0 bg-pink-accent/20 transition-opacity duration-300 group-hover:opacity-0" />
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
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
