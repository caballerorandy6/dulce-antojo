import Link from 'next/link'
import Image from 'next/image'
import { businessInfo, navLinks } from '@/lib/constants'
import { Lordicon } from '@/components/shared/lordicon'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-pink-dark px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/brand/logo.avif"
              alt={`${businessInfo.name} - Mini Pancakes & More`}
              width={400}
              height={160}
              className="mb-4 h-40"
              style={{ width: 'auto' }}
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
            <div className="mt-4 flex items-center gap-3">
              <a
                href={businessInfo.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Lordicon
                  src="/icons/instagram.json"
                  trigger="hover"
                  size={32}
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
                    size={32}
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; {currentYear} {businessInfo.name}. All rights reserved.</p>
          <p className="mt-2">
            Built by{' '}
            <a
              href="https://rcweb.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light hover:text-white transition-colors"
            >
              RC Web Solutions LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
