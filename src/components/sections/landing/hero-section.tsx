'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
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
      className="relative min-h-[75vh] overflow-hidden"
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
          <source src="/images/videos/hero-video.webm" type="video/webm" />
        </video>
        {/* Overlay for better text readability + gradient transition to carousel */}
        <div className="absolute inset-0 bg-linear-to-b from-pink-text/85 via-pink-text/65 to-pink-soft" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[75vh] flex-col items-center justify-between px-4 py-20 md:py-24">
        {/* Top spacer */}
        <div className="shrink-0" />

        {/* Main Content - Center */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-4 md:mb-6 animate-on-load animate-scale-in">
            <Image
              src="/images/brand/logo.avif"
              alt={`${businessInfo.name} - Mini Pancakes & More`}
              width={500}
              height={200}
              className="h-48 md:h-60 lg:h-72"
              style={{ width: 'auto' }}
              priority
            />
          </div>

          {/* Tagline */}
          <p className="mb-4 text-lg text-white md:text-xl drop-shadow-md animate-on-load animate-fade-in-up animation-delay-200">
            The sweetest part of your event
          </p>

          {/* Social Proof */}
          <div className="mb-4 flex items-center justify-center gap-2 text-white/90 animate-on-load animate-fade-in animation-delay-300">
            <span className="text-[#FFD700] text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">★★★★★</span>
            <span className="text-xs md:text-sm">100+ Happy Events</span>
          </div>
        </div>

        {/* CTAs - Bottom */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-on-load animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-pink-accent hover:bg-pink-dark text-white font-semibold min-w-[180px] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Get a Quote
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToServices}
            className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-pink-dark backdrop-blur-sm min-w-[180px] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            View Services
          </Button>
        </div>
      </div>
    </section>
  )
}
