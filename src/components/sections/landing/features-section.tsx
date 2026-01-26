import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { Lordicon } from '@/components/shared/lordicon'

const features = [
  {
    icon: '/icons/clock-time.json',
    title: 'Full Event Coverage',
    description: '1-2 hours of non-stop sweetness! We stay until every guest is happy.',
  },
  {
    icon: '/icons/confetti-new.json',
    title: 'Party Experts',
    description: 'Our friendly team brings the fun and creates magic at your event.',
  },
  {
    icon: '/icons/magic-wand.json',
    title: 'Your Theme, Your Style',
    description: 'Custom decorations to match your party colors and vibe perfectly.',
  },
  {
    icon: '/icons/love-heart.json',
    title: 'Made Fresh with Love',
    description: 'Every treat is prepared on-site with the freshest ingredients.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-pink-medium/20 px-4 py-16 md:py-24 pb-24 md:pb-32"
    >
      {/* Pattern: 2 left, 1 right */}
      <FloatingStickers stickerIndices={[1, 4, 7]} positionIndices={[0, 1, 2]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center animateHeading">
            <Image
              src="/images/pages/why-choose-us.PNG"
              alt="Why Choose Us"
              width={500}
              height={140}
              className="h-20 w-auto md:h-28 lg:h-32"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animateText">
            Every booking comes with these sweet perks
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="feature-card group w-full border-pink-medium/30 text-center transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-2 md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] animateProjectCard"
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-pink-bg">
                  <Lordicon
                    src={feature.icon}
                    trigger="hover"
                    target=".feature-card"
                    size={56}
                  />
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

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-cream-bg pointer-events-none" />
    </section>
  )
}
