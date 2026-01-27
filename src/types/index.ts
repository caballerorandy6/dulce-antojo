// ============================================
// DULCE ANTOJO - Type Definitions
// ============================================

export interface BusinessInfo {
  name: string
  tagline: string
  description: string
  location: {
    city: string
    state: string
    country: string
    serviceRadius: string
  }
  contact: {
    instagram: string
    instagramUrl: string
    facebook?: string
    facebookUrl?: string
    email?: string
    phone?: string
  }
  allServicesInclude: string[]
}

export interface ServiceIncludes {
  main?: string
  note?: string
  drizzles?: {
    quantity?: number
    options?: string[]
  }
  toppings?: {
    quantity?: number
    options?: string[]
    note?: string
    name?: string
    breakdown?: string[]
  }
  flavors?: {
    quantity: number | string
    options?: string[]
    note?: string
  }
  fruits?: {
    quantity: number
    note?: string
  }
  extras?: string[]
  service?: string
  setup?: string[]
  customization?: string
  styles?: string[]
  dulceOptions?: string[]
  saladoOptions?: string[]
  iceCream?: string
  options?: string[]
  serving?: {
    plate?: string
    stick?: string
  }
  base?: string[]
  drizzle?: {
    note?: string
  }
  chips?: {
    quantity: number
    options?: string[]
    note?: string
  }
  sauces?: string[]
  garnish?: string[]
}

export interface ServiceExtra {
  name: string
  note?: string
}

export interface Service {
  id: string
  name: string
  slug: string
  category: 'dulce' | 'salado' | 'paquete'
  featured: boolean
  shortDescription: string
  description: string
  includes: ServiceIncludes
  extras?: ServiceExtra[]
  image: string
}

export interface Category {
  id: 'dulce' | 'salado' | 'paquete'
  name: string
  nameEn: string
  description: string
  icon: string
}

export interface EventType {
  id: string
  name: string
  nameEn: string
  icon: string
}

export interface FAQ {
  question: string
  answer: string
  category: 'booking' | 'service' | 'coverage'
}

export interface Testimonial {
  id: string
  name: string
  event: string
  rating: number
  text: string
  date: string
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: string
  services: string[]
  message: string
}

export interface ToppingOptions {
  sweetDrizzles: string[]
  sweetToppings: string[]
  cornToppings: string[]
  chipOptions: string[]
  paletaFlavors: string[]
  mexicanSauces: string[]
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// SEO types
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    images: string[]
  }
}
