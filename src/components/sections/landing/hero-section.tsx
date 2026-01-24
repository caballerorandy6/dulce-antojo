'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { businessInfo } from '@/lib/constants'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4
    }
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/cart-18.avif"
          className="h-full w-full object-cover"
        >
          <source src="/images/hero/hero-video.webm" type="video/webm" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-pink-text/85 via-pink-text/65 to-pink-bg/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-24 md:py-32">
        {/* Top spacer */}
        <div className="shrink-0" />

        {/* Main Content - Center */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-6 md:mb-8 animate-on-load animate-scale-in">
            <Image
              src="/images/nav/logo.avif"
              alt={`${businessInfo.name} - Mini Pancakes & More`}
              width={600}
              height={240}
              className="h-48 w-auto md:h-64 lg:h-80"
              priority
            />
          </div>

          {/* Location Badge */}
          <div className="mb-5 md:mb-6 animate-on-load animate-fade-in-up animation-delay-200">
            <Badge className="bg-gold/80 text-white hover:bg-gold backdrop-blur-sm border-gold px-4 py-1.5 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              {businessInfo.location.city}, {businessInfo.location.state}
            </Badge>
          </div>

          {/* Tagline */}
          <div className="mb-6 md:mb-8 animate-on-load animate-fade-in-up animation-delay-300">
            <span className="text-xl text-gold-light md:text-2xl lg:text-3xl font-semibold tracking-wide px-5 py-2 bg-black/30 backdrop-blur-sm rounded-full">
              {businessInfo.tagline}
            </span>
          </div>

          {/* Description */}
          <p className="mx-auto mb-4 max-w-xl text-base text-white md:text-lg lg:max-w-2xl drop-shadow-md animate-on-load animate-fade-in-up animation-delay-400">
            {businessInfo.description}. Perfect for weddings, quinceañeras,
            birthdays, and corporate events.
          </p>

          {/* Social Proof */}
          <div className="mb-6 md:mb-8 flex items-center justify-center gap-2 text-white/90 animate-on-load animate-fade-in animation-delay-500">
            <span className="text-gold text-sm md:text-base">★★★★★</span>
            <span className="text-xs md:text-sm">100+ Happy Events in Houston</span>
          </div>
        </div>

        {/* CTAs - Bottom */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-on-load animate-fade-in-up animation-delay-600">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-gold hover:bg-gold-dark text-white min-w-[160px] animate-pulse-subtle"
          >
            Get a Quote
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToServices}
            className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-pink-text backdrop-blur-sm transition-all min-w-[160px]"
          >
            View Services
          </Button>
        </div>
      </div>
    </section>
  )
}
