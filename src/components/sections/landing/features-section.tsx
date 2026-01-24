import { Clock, Users, Sparkles, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { FloatingStickers } from '@/components/shared/floating-stickers'

const features = [
  {
    icon: Clock,
    title: '1-2 Hours Service',
    description: 'Professional service for the duration of your event',
  },
  {
    icon: Users,
    title: 'Professional Attendant',
    description: 'Our trained staff ensures a smooth experience',
  },
  {
    icon: Sparkles,
    title: 'Customizable Setup',
    description: 'Match the cart to your event theme and colors',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Fresh ingredients and treats prepared on-site',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-pink-soft px-4 py-16 md:py-24"
    >
      {/* Pattern: 2 left, 1 right */}
      <FloatingStickers stickerIndices={[1, 4, 7]} positionIndices={[0, 1, 2]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Why Choose Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every service includes these amazing benefits
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-pink-medium/30 text-center transition-colors hover:border-gold"
              >
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-bg">
                    <Icon className="h-7 w-7 text-pink-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-pink-text">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
