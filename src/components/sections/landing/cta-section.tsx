import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { businessInfo } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/images/videos/video-5.webm" type="video/webm" />
        </video>
        {/* Gradient overlay - smooth transition from contact section */}
        <div className="absolute inset-0 bg-linear-to-b from-pink-bg via-pink-accent/50 to-pink-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Ready to Sweeten Your Event?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Let&apos;s create something delicious together. Contact us today!
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-accent hover:bg-pink-soft"
          >
            <a href="#contact">Get a Quote</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-white text-pink-accent hover:bg-pink-soft hover:text-gold transition-all"
          >
            <a
              href={businessInfo.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
