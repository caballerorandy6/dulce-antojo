import { Card, CardContent } from '@/components/ui/card'
import { FloatingStickers } from '@/components/shared/floating-stickers'

const features = [
  {
    emoji: '⏰',
    title: 'Full Event Coverage',
    description: '1-2 hours of non-stop sweetness! We stay until every guest is happy.',
  },
  {
    emoji: '👨‍🍳',
    title: 'Expert Sweet Makers',
    description: 'Our friendly attendants create magic right before your eyes.',
  },
  {
    emoji: '🎨',
    title: 'Your Theme, Your Style',
    description: 'Custom decorations to match your party colors and vibe perfectly.',
  },
  {
    emoji: '💖',
    title: 'Made Fresh with Love',
    description: 'Every treat is prepared on-site with the freshest ingredients.',
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
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl animateHeading">
            Why Choose Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animateText">
            Every booking comes with these sweet perks
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group w-full border-pink-medium/30 text-center transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] animateProjectCard"
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-bg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <span className="text-4xl">{feature.emoji}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-pink-text">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
