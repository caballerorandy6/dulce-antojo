import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ServiceGallery } from '@/components/services/service-gallery'
import { Lordicon } from '@/components/shared/lordicon'
import { JsonLdService } from '@/components/seo/json-ld-service'
import { services } from '@/lib/constants'

const serviceImages: Record<string, string> = {
  'mini-pancakes': '/images/services/mini-pancakes.avif',
  'paletas-locas': '/images/services/paleta.avif',
  'churro-sundaes': '/images/services/churro-sundaes.avif',
  'sundaes': '/images/services/sundae.avif',
  'corn-in-a-cup': '/images/services/corn-in-a-cup-1.avif',
  'tosti-elote': '/images/services/tosti-elote-2.avif',
  'mix-and-match': '/images/services/mix-and-match-3.avif',
  'ramen-maruchan': '/images/services/ramen-2.avif',
  'paleta-cart-rental': '/images/services/paletas-cart-1.avif',
  'sorbet': '/images/services/mango-loco-1.avif',
  'churros': '/images/services/churros.avif',
  'fresa-cups': '/images/services/fresa-cup-1.avif',
  'snack-cup': '/images/services/snack-cup-1.avif',
}

// Gallery images for each service (max 3 per service)
const serviceGalleryImages: Record<string, string[]> = {
  'mini-pancakes': [
    '/images/services/mini-pancakes.avif',
    '/images/services/mini-pankakes-1.avif',
    '/images/services/mini-pankakes-2.avif',
  ],
  'paletas-locas': [
    '/images/services/paletas-locas.avif',
    '/images/services/paleta-1.avif',
    '/images/services/paleta-2.avif',
  ],
  'churro-sundaes': [
    '/images/services/churro-sundae-3.avif',
    '/images/services/churro-sundae-4.avif',
    '/images/services/churro-sundae-5.avif',
  ],
  'sundaes': [
    '/images/services/sundae.avif',
    '/images/services/sundaes-1.avif',
    '/images/services/sundaes-1.avif', // TODO: Add more sundae images
  ],
  'corn-in-a-cup': [
    '/images/services/corn-in-a-cup-1.avif',
    '/images/services/elote-cup-1.avif',
    '/images/services/elote-cup-2.avif',
  ],
  'tosti-elote': [
    '/images/services/tosti-elote-2.avif',
    '/images/services/tosti-elote.avif',
    '/images/services/tosti-elote.avif',
  ],
  'mix-and-match': [
    '/images/services/mix-and-match-1.avif',
    '/images/services/mix-and-match-2.avif',
    '/images/services/mix-and-match-3.avif',
  ],
  'ramen-maruchan': [
    '/images/services/ramen-2.avif',
    '/images/services/ramen-1.avif',
    '/images/services/ramen-3.avif',
  ],
  'paleta-cart-rental': [
    '/images/services/paletas-cart-1.avif',
    '/images/services/paletas-cart-2.avif',
    '/images/services/cart-4.avif',
  ],
  'sorbet': [
    '/images/services/sorbet-1.avif',
    '/images/services/sorbet-2.avif',
    '/images/services/sorbet-3.avif',
  ],
  'churros': [
    '/images/services/churros-1.avif',
    '/images/services/churros-2.avif',
    '/images/services/churros-3.avif',
  ],
  'fresa-cups': [
    '/images/services/fresa-cup-4.avif',
    '/images/services/fresa-cup-5.avif',
    '/images/services/fresa-cup-6.avif',
  ],
  'snack-cup': [
    '/images/services/snack-cup-1.avif',
    '/images/services/snack-cup-2.avif',
    '/images/services/snack-cup-3.avif',
  ],
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: service.name,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const categoryLabel =
    service.category === 'dulce'
      ? 'Sweet'
      : service.category === 'salado'
        ? 'Savory'
        : 'Package'

  return (
    <div className="bg-pink-bg">
      <JsonLdService service={service} />
      {/* Back Link */}
      <div className="mx-auto max-w-6xl px-4 pt-24">
        <Link
          href="/services"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-pink-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>

      {/* Hero */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="animateProjectCard group relative h-64 overflow-hidden rounded-2xl bg-pink-soft lg:h-96 border border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl">
              {serviceImages[service.id] ? (
                <Image
                  src={serviceImages[service.id]}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-pink-soft" />
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>

            {/* Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
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

              <h1 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
                {service.name}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground">
                {service.description}
              </p>

              <Button
                asChild
                size="lg"
                className="w-full bg-pink-accent hover:bg-pink-dark sm:w-auto"
              >
                <Link href="/contact">Request Quote</Link>
              </Button>

              {/* Mini Gallery */}
              {serviceGalleryImages[service.id] && (
                <ServiceGallery
                  images={serviceGalleryImages[service.id]}
                  serviceName={service.name}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-pink-soft px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="animateHeading mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-pink-accent">
              Everything you get
            </span>
            <h2 className="text-2xl font-bold text-pink-text md:text-3xl">
              What&apos;s Included
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Main Card - Featured/Larger */}
            {service.includes.main && (
              <IncludeCard
                title="Main"
                content={service.includes.main}
                icon="main"
                featured
              />
            )}

            {service.includes.drizzles && (
              <IncludeCard
                title="Drizzles"
                content={
                  service.includes.drizzles.quantity
                    ? `Choose ${service.includes.drizzles.quantity}`
                    : 'Multiple options'
                }
                options={service.includes.drizzles.options}
                icon="drizzles"
              />
            )}

            {service.includes.toppings && (
              <IncludeCard
                title="Toppings"
                content={
                  service.includes.toppings.quantity
                    ? `Pick ${service.includes.toppings.quantity}`
                    : 'Various toppings'
                }
                options={service.includes.toppings.options}
                icon="toppings"
              />
            )}

            {service.includes.flavors && (
              <IncludeCard
                title="Flavors"
                content={`${service.includes.flavors.quantity} available`}
                options={service.includes.flavors.options}
                icon="flavors"
              />
            )}

            {service.includes.chips && (
              <IncludeCard
                title="Chips"
                content={`${service.includes.chips.quantity} options`}
                options={service.includes.chips.options}
                icon="chips"
              />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-accent px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Book {service.name}?
          </h2>
          <p className="mb-8 text-white/90">
            Contact us today to reserve this service for your event.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-pink-accent hover:bg-pink-soft"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/services">View Other Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const iconMap = {
  main: '/icons/main-plate.json',
  drizzles: '/icons/drizzle-honey.json',
  toppings: '/icons/toppings-cherry.json',
  flavors: '/icons/flavors-icecream.json',
  chips: '/icons/chips-cookie.json',
}

const gradientMap = {
  main: 'from-pink-accent/20 via-pink-soft to-white',
  drizzles: 'from-purple/10 via-pink-soft/50 to-white',
  toppings: 'from-coral/10 via-pink-soft/50 to-white',
  flavors: 'from-gold-accent/10 via-pink-soft/50 to-white',
  chips: 'from-pink-medium/20 via-pink-soft/50 to-white',
}

function IncludeCard({
  title,
  content,
  options,
  icon = 'main',
  featured = false,
}: {
  title: string
  content: string
  options?: string[]
  icon?: keyof typeof iconMap
  featured?: boolean
}) {
  const iconSrc = iconMap[icon]
  const gradient = gradientMap[icon]

  return (
    <Card
      className={`animateProjectCard group relative overflow-hidden border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] ${
        featured ? 'bg-linear-to-br ' + gradient : 'bg-white'
      }`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Decorative corner accent */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink-accent/10 transition-transform duration-500 group-hover:scale-150" />

      <CardContent className={`relative ${featured ? 'p-8' : 'p-6'}`}>
        {/* Lordicon animated icon */}
        <div className={`mb-4 inline-flex items-center justify-center rounded-2xl bg-linear-to-br from-pink-accent to-pink-dark shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${featured ? 'p-3' : 'p-2'}`}>
          <Lordicon
            src={iconSrc}
            trigger="hover"
            size={featured ? 48 : 36}
          />
        </div>

        <h3 className={`mb-2 font-bold text-pink-text ${featured ? 'text-2xl' : 'text-lg'}`}>
          {title}
        </h3>
        <p className={`text-muted-foreground ${featured ? 'text-lg mb-6' : 'mb-4'}`}>
          {content}
        </p>

        {/* Options as badges */}
        {options && options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {options.slice(0, featured ? 6 : 4).map((option) => (
              <span
                key={option}
                className="inline-flex items-center gap-1 rounded-full bg-pink-bg px-3 py-1 text-sm font-medium text-pink-text transition-colors duration-200 hover:bg-pink-accent hover:text-white cursor-default"
              >
                <Check className="h-3 w-3" />
                {option}
              </span>
            ))}
            {options.length > (featured ? 6 : 4) && (
              <span className="inline-flex items-center rounded-full bg-pink-accent/10 px-3 py-1 text-sm font-medium text-pink-accent">
                +{options.length - (featured ? 6 : 4)} more
              </span>
            )}
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-accent px-3 py-1 text-xs font-semibold text-white shadow-md">
              <Sparkles className="h-3 w-3" />
              Included
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
