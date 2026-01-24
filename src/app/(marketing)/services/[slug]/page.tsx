import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/constants'

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
      {/* Back Link */}
      <div className="mx-auto max-w-6xl px-4 pt-8">
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
            <div className="h-64 rounded-2xl bg-pink-soft lg:h-96" />

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
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-pink-soft px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-pink-text md:text-3xl">
            What&apos;s Included
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.includes.main && (
              <IncludeCard title="Main" content={service.includes.main} />
            )}

            {service.includes.drizzles && (
              <IncludeCard
                title="Drizzles"
                content={
                  service.includes.drizzles.quantity
                    ? `${service.includes.drizzles.quantity} options`
                    : 'Multiple options'
                }
                options={service.includes.drizzles.options}
              />
            )}

            {service.includes.toppings && (
              <IncludeCard
                title="Toppings"
                content={
                  service.includes.toppings.quantity
                    ? `${service.includes.toppings.quantity} toppings`
                    : 'Various toppings'
                }
                options={service.includes.toppings.options}
              />
            )}

            {service.includes.flavors && (
              <IncludeCard
                title="Flavors"
                content={`${service.includes.flavors.quantity} flavors available`}
                options={service.includes.flavors.options}
              />
            )}

            {service.includes.chips && (
              <IncludeCard
                title="Chips"
                content={`${service.includes.chips.quantity} chip options`}
                options={service.includes.chips.options}
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

function IncludeCard({
  title,
  content,
  options,
}: {
  title: string
  content: string
  options?: string[]
}) {
  return (
    <Card className="border-pink-medium/30">
      <CardContent className="p-6">
        <h3 className="mb-2 font-semibold text-pink-text">{title}</h3>
        <p className="mb-3 text-muted-foreground">{content}</p>
        {options && options.length > 0 && (
          <ul className="space-y-1">
            {options.slice(0, 4).map((option) => (
              <li
                key={option}
                className="flex items-center text-sm text-muted-foreground"
              >
                <Check className="mr-2 h-3 w-3 text-pink-accent" />
                {option}
              </li>
            ))}
            {options.length > 4 && (
              <li className="text-sm text-muted-foreground">
                +{options.length - 4} more...
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
