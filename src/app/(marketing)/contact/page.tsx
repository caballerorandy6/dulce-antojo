import type { Metadata } from 'next'
import Image from 'next/image'
import { Instagram, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/contact-form'
import { businessInfo } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get a free quote for your event. Contact Dulce Antojo for dessert and snack cart services in Houston, TX.',
}

export default function ContactPage() {
  return (
    <div className="bg-pink-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        {/* Background Image */}
        <Image
          src="/images/contact/contact-1.avif"
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
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="animateProjectCard border-pink-medium/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-soft">
                    <MapPin className="h-6 w-6 text-pink-accent" />
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

              <Card className="animateProjectCard border-pink-medium/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-soft">
                    <Clock className="h-6 w-6 text-pink-accent" />
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

              <Card className="animateProjectCard border-pink-medium/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-soft">
                    <Instagram className="h-6 w-6 text-pink-accent" />
                  </div>
                  <h3 className="mb-2 font-semibold text-pink-text">
                    Follow Us
                  </h3>
                  <a
                    href={businessInfo.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-accent hover:text-pink-dark"
                  >
                    {businessInfo.contact.instagram}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    DM us for quick questions
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
