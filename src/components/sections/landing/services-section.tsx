import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { Lordicon } from '@/components/shared/lordicon'
import { services } from '@/lib/constants'

const categoryIcons: Record<string, string> = {
  dulce: '/icons/sweet.json',
  salado: '/icons/savory.json',
  paquete: '/icons/package.json',
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
  'sundaes': '/images/landing/sundaes-1.avif',
  'corn-in-a-cup': '/images/landing/corn-in-a-cup.avif',
  'tosti-elote': '/images/landing/tosti-elote-2.avif',
  'mix-and-match': '/images/landing/mix-and-match-1.avif',
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
              className="service-card group relative w-full h-80 overflow-hidden border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] animateProjectCard"
            >
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
                  <Lordicon
                    src={categoryIcons[service.category]}
                    trigger="hover"
                    target=".service-card"
                    size={36}
                  />
                  <span className="text-sm font-medium text-white/90">
                    {categoryLabels[service.category]}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-white drop-shadow-md">
                  {service.name}
                </h3>
                <p className="mb-4 text-sm text-white/90 drop-shadow-sm">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-center gap-2 w-full text-sm font-medium text-white bg-pink-accent/90 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-pink-accent transition-all cursor-pointer"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
