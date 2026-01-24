'use client'

import { useRef, useEffect } from 'react'
import { Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { businessInfo } from '@/lib/constants'

export function CTASection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/images/landing/video-5.webm" type="video/webm" />
        </video>
        {/* Overlay - Rosa oscuro que combina con la app */}
        <div className="absolute inset-0 bg-pink-dark/75" />
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
            size="lg"
            onClick={scrollToContact}
            className="bg-white text-pink-accent hover:bg-pink-soft animate-pulse-subtle"
          >
            Get a Quote
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
