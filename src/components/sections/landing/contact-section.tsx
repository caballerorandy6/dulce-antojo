import { Instagram, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { businessInfo } from '@/lib/constants'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-pink-soft px-4 py-16 md:py-24"
    >
      {/* Pattern: 1 left, 1 right, 1 bottom */}
      <FloatingStickers stickerIndices={[4, 7, 10]} positionIndices={[1, 3, 5]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Get a Quote
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Tell us about your event and we&apos;ll get back to you with a custom quote
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-xl bg-white p-6 border border-pink-medium/30">
              <h3 className="mb-4 text-lg font-semibold text-pink-text">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-pink-accent" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-pink-text">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {businessInfo.location.city}, {businessInfo.location.state}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Service area: {businessInfo.location.serviceRadius}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="mt-1 h-5 w-5 text-pink-accent" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-pink-text">Instagram</p>
                    <a
                      href={businessInfo.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-pink-accent hover:text-pink-dark"
                    >
                      {businessInfo.contact.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-pink-accent p-6 text-white">
              <h3 className="mb-2 text-lg font-semibold">
                Quick Response
              </h3>
              <p className="text-sm text-white/90">
                We typically respond within 24 hours. For faster service,
                DM us on Instagram!
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
