import type { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { Lordicon } from '@/components/shared/lordicon'
import { SocialCTA } from '@/components/shared/social-cta'
import { businessInfo } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Get a Quote - Book Your Event Cart',
  description:
    'Get a free quote for your event in Houston, TX. Contact Dulce Antojo for mini pancakes, churros, paletas, and snack cart catering.',
}

export default function ContactPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/pages/contact-2.avif"
          alt="Contact Dulce Antojo for your event"
          fill
          className="object-cover blur-[0.5px] brightness-90"
          priority
        />
        {/* Overlay: dark base + subtle pink tint */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-pink-dark/20" />

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="animateHeading mb-4 text-4xl font-bold text-white md:text-5xl drop-shadow-md">
            Get a Quote
          </h1>
          <p className="animateText mx-auto max-w-2xl text-lg text-white/95 drop-shadow-sm">
            Fill out the form below and we&apos;ll get back to you within 24
            hours with a custom quote for your event.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative px-4 py-16 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="info-card-location animateProjectCard border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center">
                    <Lordicon
                      src="/icons/cart.json"
                      trigger="hover"
                      target=".info-card-location"
                      size={48}
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-pink-text">
                    Service Area
                  </h3>
                  <p className="text-muted-foreground">
                    {businessInfo.location.city}, {businessInfo.location.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {businessInfo.location.serviceRadius} radius
                  </p>
                </CardContent>
              </Card>

              <Card className="info-card-time animateProjectCard border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center">
                    <Lordicon
                      src="/icons/clock-time.json"
                      trigger="hover"
                      target=".info-card-time"
                      size={48}
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-pink-text">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground">
                    We respond within 24 hours
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Book 2-3 weeks in advance
                  </p>
                </CardContent>
              </Card>

              <Card className="info-card-social animateProjectCard border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-pink-text">
                    Get in Touch
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`tel:${businessInfo.contact.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-pink-accent transition-colors"
                    >
                      <Lordicon
                        src="/icons/phone.json"
                        trigger="hover"
                        colors={{ primary: '#FF6B95', secondary: '#FF6B95' }}
                        size={32}
                      />
                      <span>{businessInfo.contact.phone}</span>
                    </a>
                    <a
                      href={businessInfo.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-pink-accent transition-colors"
                    >
                      <Lordicon
                        src="/icons/instagram.json"
                        trigger="hover"
                        size={32}
                      />
                      <span>{businessInfo.contact.instagram}</span>
                    </a>
                    <a
                      href={businessInfo.contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-pink-accent transition-colors"
                    >
                      <Lordicon
                        src="/icons/facebook.json"
                        trigger="hover"
                        size={32}
                      />
                      <span>{businessInfo.contact.facebook}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
        {/* Gradient fade to CTA section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-soft pointer-events-none" />
      </section>

      <SocialCTA
        quoteTitle="Prefer Social Media?"
        quoteDescription="Follow us for updates and DM us anytime!"
      />
    </div>
  )
}
