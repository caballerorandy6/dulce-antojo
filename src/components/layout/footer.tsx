import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { businessInfo, navLinks } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-pink-dark px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/nav/logo.avif"
              alt={`${businessInfo.name} - Mini Pancakes & More`}
              width={400}
              height={160}
              className="mb-4 h-40 w-auto"
            />
            <p className="text-white/80">{businessInfo.tagline}</p>
            <p className="mt-2 text-sm text-white/60">
              {businessInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <p className="text-white/80">
              {businessInfo.location.city}, {businessInfo.location.state}
            </p>
            <p className="mt-1 text-sm text-white/60">
              Service area: {businessInfo.location.serviceRadius}
            </p>
            <a
              href={businessInfo.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-white/80 transition-colors hover:text-gold-light"
            >
              <Instagram className="mr-2 h-5 w-5" />
              {businessInfo.contact.instagram}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          &copy; {currentYear} {businessInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
