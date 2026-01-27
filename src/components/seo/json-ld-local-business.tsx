import { businessInfo } from '@/lib/constants'

const baseUrl = 'https://dulceantojosnackcarts.com'

export function JsonLdLocalBusiness() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${baseUrl}/#organization`,
    name: businessInfo.name,
    description: businessInfo.description,
    url: baseUrl,
    telephone: businessInfo.contact.phone,
    image: `${baseUrl}/images/brand/logo.avif`,
    logo: `${baseUrl}/images/brand/logo.avif`,
    priceRange: '$$',
    servesCuisine: ['Mexican', 'Desserts', 'Snacks'],
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
      geoRadius: '80467', // 50 miles in meters
    },
    sameAs: [
      businessInfo.contact.instagramUrl,
      businessInfo.contact.facebookUrl,
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
