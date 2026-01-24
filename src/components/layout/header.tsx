'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { businessInfo, navLinks } from '@/lib/constants'
import { Lordicon } from '@/components/shared/lordicon'
import { cn } from '@/lib/utils'

const landingNavLinks = [
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#features', label: 'Features', id: 'features' },
  { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('gallery')
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer to track active section (only for landing page)
  useEffect(() => {
    if (!isLandingPage) return

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
  }, [isLandingPage])

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
          ? 'bg-pink-bg/95 backdrop-blur-sm shadow-md border-b border-pink-medium/30'
          : isLandingPage
            ? 'bg-transparent'
            : 'bg-pink-bg/95 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Text */}
          {isLandingPage ? (
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className={cn(
                "font-[--font-cormorant] text-3xl font-semibold tracking-[0.02em] transition-colors",
                isScrolled ? "text-pink-text" : "text-white"
              )}
            >
              {businessInfo.name}
            </a>
          ) : (
            <Link
              href="/"
              className="font-[--font-cormorant] text-3xl font-semibold tracking-[0.02em] text-pink-text transition-colors hover:text-[#E6A817]"
            >
              {businessInfo.name}
            </Link>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {isLandingPage ? (
              // Landing page - anchor links
              <>
                {landingNavLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      activeSection === link.id
                        ? 'text-[#E6A817]'
                        : isScrolled
                          ? 'text-pink-text hover:text-[#E6A817]'
                          : 'text-white/90 hover:text-[#E6A817]'
                    )}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </>
            ) : (
              // Other pages - regular links
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'text-[#E6A817]'
                        : 'text-pink-text hover:text-[#E6A817]'
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
            <div className="flex items-center gap-1">
              <a
                href={businessInfo.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Lordicon
                  src="/icons/instagram.json"
                  trigger="hover"
                  size={40}
                />
              </a>
              {businessInfo.contact.facebookUrl && (
                <a
                  href={businessInfo.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <Lordicon
                    src="/icons/facebook.json"
                    trigger="hover"
                    size={40}
                  />
                </a>
              )}
            </div>
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
                <Menu
                  className={cn(
                    "h-6 w-6",
                    isLandingPage && !isScrolled ? "text-white" : "text-pink-text"
                  )}
                  aria-hidden="true"
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-pink-bg">
              <nav className="flex flex-col gap-6 pt-8" aria-label="Mobile navigation">
                {isLandingPage ? (
                  // Landing page - anchor links
                  <>
                    {landingNavLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={cn(
                          'text-lg font-medium transition-colors',
                          activeSection === link.id
                            ? 'text-[#E6A817]'
                            : 'text-pink-text hover:text-[#E6A817]'
                        )}
                        aria-current={activeSection === link.id ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </>
                ) : (
                  // Other pages - regular links
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'text-lg font-medium transition-colors',
                          pathname === link.href
                            ? 'text-[#E6A817]'
                            : 'text-pink-text hover:text-[#E6A817]'
                        )}
                        aria-current={pathname === link.href ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </>
                )}
                <div className="flex items-center gap-2">
                  <a
                    href={businessInfo.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                  >
                    <Lordicon
                      src="/icons/instagram.json"
                      trigger="hover"
                      size={44}
                    />
                  </a>
                  {businessInfo.contact.facebookUrl && (
                    <a
                      href={businessInfo.contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow us on Facebook"
                    >
                      <Lordicon
                        src="/icons/facebook.json"
                        trigger="hover"
                        size={44}
                      />
                    </a>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
