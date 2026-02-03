import Image from 'next/image'
import { Instagram, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { businessInfo } from '@/lib/constants'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-pink-bg px-4 py-16 md:py-24"
    >
      {/* Pattern: 1 left, 1 right, 1 bottom */}
      <FloatingStickers stickerIndices={[4, 7, 10]} positionIndices={[1, 3, 5]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center animateHeading">
            <Image
              src="/images/pages/get-a-quote.avif"
              alt="Get a Quote"
              width={500}
              height={140}
              className="h-20 w-auto md:h-28 lg:h-32"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animateText">
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
                      className="text-sm text-pink-dark hover:text-pink-dark/80"
                    >
                      {businessInfo.contact.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-pink-dark p-6 text-white">
              <h3 className="mb-2 text-lg font-semibold">
                Quick Response
              </h3>
              <p className="text-sm text-white">
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
