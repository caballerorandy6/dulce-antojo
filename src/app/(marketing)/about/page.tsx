import type { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { SocialCTA } from '@/components/shared/social-cta'
import { businessInfo } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Aracely, founder of Dulce Antojo. Learn about our story and mission to bring sweet experiences to Houston events.',
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            About {businessInfo.name}
          </h1>
          <p className="animateText mx-auto max-w-2xl text-lg text-white/95 drop-shadow-sm">
            Creating sweet memories, one event at a time
          </p>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="relative px-4 py-16 pb-24 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-2xl font-bold text-pink-text">Meet the Founder</h2>
            <div className="h-px flex-1 bg-pink-medium/30" />
          </div>

          {/* Content */}
          <Card className="animateProjectCard border-pink-medium/30 bg-white">
            <CardContent className="p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold text-pink-text md:text-3xl">
                Hi, I&apos;m Aracely
              </h3>

              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m the founder of{' '}
                  <span className="font-semibold text-pink-text">
                    Dulce Antojo – Mini Pancakes & More
                  </span>
                  . What started as a passion for desserts, creativity, and bringing
                  people together has grown into a full-service mobile snack cart
                  business dedicated to creating unforgettable experiences.
                </p>

                <p>
                  At Dulce Antojo, we specialize in beautifully curated snack bars
                  including mini pancakes, elotes, paletas, churros, snack cups,
                  mangonadas, and more—each thoughtfully designed to match your
                  event&apos;s theme, colors, and vision.
                </p>

                <p>
                  From intimate gatherings to large celebrations, every detail is
                  carefully planned to deliver both flavor and presentation.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mt-8 border-l-4 border-gold pl-6">
                <p className="text-lg italic text-pink-text">
                  &ldquo;I believe every event deserves a sweet touch and a memorable
                  experience. My goal is to not only serve amazing treats, but to
                  create moments your guests will talk about long after the event is
                  over.&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-muted-foreground">
                  — Aracely, Founder
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>

        {/* Gradient fade to CTA section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-soft pointer-events-none" />
      </section>

      <SocialCTA
        quoteTitle="Ready to Work Together?"
        quoteDescription="Let's create something sweet for your next event!"
      />
    </div>
  )
}
