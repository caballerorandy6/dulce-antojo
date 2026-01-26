import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { businessInfo } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Dulce Antojo, your local dessert and snack cart service in Houston, TX. Our story and mission.',
}

export default function AboutPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/about.avif"
          alt="About Dulce Antojo dessert cart service"
          fill
          className="object-cover blur-[0.5px] brightness-90"
          priority
        />
        {/* Overlay: dark base + subtle pink tint */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            About {businessInfo.name}
          </h1>
          <p className="animateText mx-auto max-w-2xl text-xl text-white/95 drop-shadow-sm">
            {businessInfo.tagline}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="animateHeading mb-6 text-3xl font-bold text-pink-text">
              Our Story
            </h2>
            <p className="animateText mb-4 text-lg text-muted-foreground">
              {businessInfo.name} was born from a love of bringing people
              together through delicious treats and memorable experiences.
            </p>
            <p className="animateText text-lg text-muted-foreground">
              Based in Houston, TX, we specialize in Mexican-inspired desserts
              and snacks that add a special touch to any event. From sweet mini
              pancakes to savory elote cups, our carts bring joy to weddings,
              quinceañeras, corporate events, and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-pink-soft px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="animateHeading mb-12 text-center text-3xl font-bold text-pink-text">
            What We Stand For
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="animateProjectCard border-pink-medium/30">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-bg">
                  <Heart className="h-8 w-8 text-mauve" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-pink-text">
                  Made with Love
                </h3>
                <p className="text-muted-foreground">
                  Every treat is prepared with care and passion to make your
                  event special.
                </p>
              </CardContent>
            </Card>

            <Card className="animateProjectCard border-pink-medium/30">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-bg">
                  <Star className="h-8 w-8 text-gold-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-pink-text">
                  Quality First
                </h3>
                <p className="text-muted-foreground">
                  We use fresh ingredients and maintain the highest standards
                  for every service.
                </p>
              </CardContent>
            </Card>

            <Card className="animateProjectCard border-pink-medium/30">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-bg">
                  <Users className="h-8 w-8 text-purple" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-pink-text">
                  Community Focus
                </h3>
                <p className="text-muted-foreground">
                  Proud to serve the Houston community and be part of your
                  celebrations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="animateHeading mb-6 text-3xl font-bold text-pink-text">
            Every Service Includes
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {businessInfo.allServicesInclude.map((item, index) => (
              <div
                key={index}
                className="animateProjectCard rounded-xl bg-pink-soft p-6 border border-pink-medium/30"
              >
                <p className="font-medium text-pink-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-pink-accent px-4 py-16">
        <FloatingStickers
          stickerIndices={[1, 4, 7, 10]}
          positionIndices={[0, 2, 4, 5]}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="animateHeading mb-4 text-3xl font-bold text-white">
            Let&apos;s Work Together
          </h2>
          <p className="animateText mb-8 text-white/90">
            Ready to add something sweet to your next event?
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
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
