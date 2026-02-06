import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/landing/hero-section'
import { ServicesSection } from '@/components/sections/landing/services-section'
import { FeaturesSection } from '@/components/sections/landing/features-section'
import { GallerySection } from '@/components/sections/landing/gallery-section'
import { TestimonialsSection } from '@/components/sections/landing/testimonials-section'
import { FAQSection } from '@/components/sections/landing/faq-section'
import { ContactSection } from '@/components/sections/landing/contact-section'
import { CTASection } from '@/components/sections/landing/cta-section'
import { businessInfo } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dulce Antojo | Mini Pancakes & Snack Carts for Events - Houston TX',
  description:
    'Premium Mexican dessert and snack carts for weddings, quinceañeras, birthdays, and corporate events in Houston, TX. Mini pancakes, paletas locas, churros, elote, and more.',
  keywords: [
    'snack cart Houston TX',
    'mini pancakes catering Houston',
    'event desserts Houston',
    'Mexican dessert cart Houston',
    'wedding dessert cart',
    'quinceañera catering Houston',
    'churros for events',
    'paletas locas Houston',
    'elote cart Houston',
  ],
  openGraph: {
    title: 'Dulce Antojo | Mini Pancakes & Snack Carts - Houston TX',
    description:
      'Premium Mexican dessert and snack carts for events in Houston, TX. Book your event today!',
    url: 'https://dulcesantojosnackcarts.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dulce Antojo - Mini Pancakes & More for Events',
      },
    ],
  },
}

// JSON-LD Schema for Local Business SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  '@id': 'https://dulcesantojosnackcarts.com/#business',
  name: businessInfo.name,
  alternateName: 'Dulce Antojo Mini Pancakes & More',
  description: businessInfo.description,
  url: 'https://dulcesantojosnackcarts.com',
  image: 'https://dulcesantojosnackcarts.com/images/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: businessInfo.location.city,
    addressRegion: businessInfo.location.state,
    addressCountry: businessInfo.location.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.7604,
    longitude: -95.3698,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 29.7604,
      longitude: -95.3698,
    },
    geoRadius: '80467',
  },
  priceRange: '$$',
  servesCuisine: ['Mexican', 'Desserts', 'Snacks'],
  sameAs: [businessInfo.contact.instagramUrl],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dulce Antojo Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mini Pancakes Cart',
          description: '10 mini pancakes with drizzles and toppings per person',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Paletas Locas',
          description: 'Mexican-style popsicles with toppings and chamoy',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Churro Sundaes',
          description: 'Fresh churros with ice cream and toppings',
        },
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-pink-bg">
        <HeroSection />
        <GallerySection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
    </>
  )
}
