'use client'

import { useState, useEffect } from 'react'
import { Menu, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { businessInfo } from '@/lib/constants'
import { cn } from '@/lib/utils'

const landingNavLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#features', label: 'Features', id: 'features' },
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer to track active section
  useEffect(() => {
    const sectionIds = landingNavLinks.map(link => link.id)
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Text */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className={cn(
              "font-[family-name:var(--font-great-vibes)] text-4xl transition-colors",
              isScrolled ? "text-pink-text" : "text-white"
            )}
          >
            {businessInfo.name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {landingNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  activeSection === link.id
                    ? 'text-gold'
                    : isScrolled
                      ? 'text-pink-text hover:text-gold'
                      : 'text-white/90 hover:text-gold'
                )}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            <a
              href={businessInfo.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors hover:text-gold",
                isScrolled ? "text-pink-text" : "text-white/90"
              )}
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
              >
                <Menu className={cn("h-6 w-6", isScrolled ? "text-pink-text" : "text-white")} aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-pink-bg">
              <nav className="flex flex-col gap-6 pt-8" aria-label="Mobile navigation">
                {landingNavLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'text-lg font-medium transition-colors',
                      activeSection === link.id
                        ? 'text-gold'
                        : 'text-pink-text hover:text-gold'
                    )}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={businessInfo.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-text hover:text-gold transition-colors"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  Follow us
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
