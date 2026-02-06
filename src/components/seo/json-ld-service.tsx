import type { Service } from '@/types'

const baseUrl = 'https://dulcesantojosnackcarts.com'

interface JsonLdServiceProps {
  service: Service
}

export function JsonLdService({ service }: JsonLdServiceProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/services/${service.slug}`,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dulce Antojo',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    serviceType: 'Event Catering',
    category: service.category === 'dulce' ? 'Dessert Catering' : service.category === 'salado' ? 'Snack Catering' : 'Catering Package',
    image: `${baseUrl}${service.image}`,
    url: `${baseUrl}/services/${service.slug}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
