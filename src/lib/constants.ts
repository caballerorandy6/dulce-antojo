// ============================================
// DULCE ANTOJO - Business Data & Constants
// ============================================

import type {
  BusinessInfo,
  Service,
  Category,
  EventType,
  FAQ,
  Testimonial,
  ToppingOptions,
} from '@/types'

export const businessInfo: BusinessInfo = {
  name: 'Dulce Antojo',
  tagline: 'Mini Pancakes & More',
  description: 'Mexican dessert and snack carts for events in Houston TX',

  location: {
    city: 'Houston',
    state: 'TX',
    country: 'USA',
    serviceRadius: '50 miles',
  },

  contact: {
    instagram: '@dulceantojo.houstontx',
    instagramUrl: 'https://instagram.com/dulceantojo.houstontx',
  },

  allServicesInclude: [
    '1-2 hours of service',
    'Professional attendant',
    'Customizable add-ons',
  ],
}

export const services: Service[] = [
  // ═══════════════════════════════════════════════════════════════
  // SWEET
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'mini-pancakes',
    name: 'Mini Pancakes',
    slug: 'mini-pancakes',
    category: 'dulce',
    featured: true,
    shortDescription: '10 mini pancakes with customizable drizzles and toppings',
    description: 'Delicious freshly made mini pancakes, served with a variety of sweet drizzles and toppings so each guest can personalize their plate.',
    includes: {
      main: '10 mini pancakes per person',
      drizzles: {
        quantity: 4,
        options: ['Cajeta', 'Lechera', 'Nutella', 'Syrup'],
      },
      toppings: {
        quantity: 6,
        options: ['Strawberries', 'Bananas', 'Sprinkles', 'Chocolate chips', 'Oreo crumbs', 'Pecans'],
      },
    },
    extras: [
      { name: 'Vanilla ice cream', note: 'extra charge' },
    ],
    image: '/images/services/mini-pancakes.jpg',
  },

  {
    id: 'paletas-locas',
    name: 'Paletas Locas',
    slug: 'paletas-locas',
    category: 'dulce',
    featured: true,
    shortDescription: '10+ flavors with toppings, fresh fruits and drizzles',
    description: 'Mexican-style "loca" popsicles with an explosion of flavors, toppings and the perfect touch of chamoy and tajín.',
    includes: {
      main: 'Milk or water-based popsicle',
      flavors: {
        quantity: '+10',
        note: 'flavors available',
      },
      toppings: {
        quantity: 7,
      },
      fruits: {
        quantity: 2,
        note: 'fresh cut fruits',
      },
      drizzles: {
        quantity: 3,
      },
      extras: ['Chamoy', 'Tajín'],
    },
    image: '/images/services/paletas-locas.jpg',
  },

  {
    id: 'paleta-cart-rental',
    name: 'Paleta Cart Rental',
    slug: 'paleta-cart-rental',
    category: 'dulce',
    featured: false,
    shortDescription: 'Self-serve popsicle cart customized for your event',
    description: 'Full rental of our popsicle cart. Perfect for large events where guests can serve themselves.',
    includes: {
      main: 'Starting at 50 popsicles',
      flavors: {
        quantity: '+10',
        options: ['Milk or water-based'],
      },
      service: 'Self-serve',
      setup: ['Cart', 'Umbrella', 'Balloon garland'],
      customization: 'Customized for your event',
    },
    image: '/images/services/paleta-cart.jpg',
  },

  {
    id: 'sorbet',
    name: 'Sorbet',
    slug: 'sorbet',
    category: 'dulce',
    featured: false,
    shortDescription: '6 flavors with sweet or savory toppings',
    description: 'Refreshing sorbet with a variety of fruity flavors and the option to customize it sweet or savory Mexican-style.',
    includes: {
      flavors: {
        quantity: 6,
        options: ['Mango', 'Strawberry', 'Watermelon', 'Lime', 'Pecan', 'Cookies & Cream'],
      },
      toppings: {
        quantity: 6,
      },
      styles: ['Sweet', 'Savory'],
      dulceOptions: ['Condensed milk', 'Whipped cream'],
      saladoOptions: ['Chamoy', 'Tajín'],
    },
    image: '/images/services/sorbet.jpg',
  },

  {
    id: 'sundaes',
    name: 'Sundaes',
    slug: 'sundaes',
    category: 'dulce',
    featured: true,
    shortDescription: 'Ice cream with drizzles and 6 toppings of your choice',
    description: 'Classic American sundae with creamy ice cream, drizzles and toppings to create the perfect combination.',
    includes: {
      main: '1-2 ice cream flavors',
      note: 'depending on event size',
      drizzles: {
        options: ['Nutella', 'Lechera', 'Cajeta', 'Strawberry'],
      },
      toppings: {
        quantity: 6,
        note: 'your choice',
      },
    },
    image: '/images/services/sundaes.jpg',
  },

  {
    id: 'churro-sundaes',
    name: 'Churro Sundaes',
    slug: 'churro-sundaes',
    category: 'dulce',
    featured: true,
    shortDescription: 'Churros with ice cream, drizzles and toppings',
    description: 'The perfect combination: crispy churros with creamy ice cream, drizzles and toppings. A crowd favorite!',
    includes: {
      main: '(2) 5-inch churros',
      iceCream: '1-2 ice cream flavors',
      toppings: {
        quantity: 6,
        note: 'your choice',
      },
    },
    image: '/images/services/churro-sundaes.jpg',
  },

  {
    id: 'churros',
    name: 'Churros',
    slug: 'churros',
    category: 'dulce',
    featured: false,
    shortDescription: '10" churros or (2) 5" with drizzles and toppings',
    description: 'Freshly made churros, crispy on the outside and soft on the inside. Served with drizzles and toppings.',
    includes: {
      options: [
        '1 ten-inch churro',
        '(2) five-inch churros',
      ],
      toppings: {
        quantity: 6,
        note: 'your choice',
      },
      serving: {
        plate: 'If served on a plate',
        stick: '10" churro served on a stick with drizzle options',
      },
    },
    image: '/images/services/churros.jpg',
  },

  {
    id: 'fresa-cups',
    name: 'Fresa Cups',
    slug: 'fresa-cups',
    category: 'dulce',
    featured: false,
    shortDescription: 'Fresh strawberries with cream or chocolate and toppings',
    description: 'Delicious fresh strawberries drizzled with cream or chocolate with special toppings.',
    includes: {
      main: '8oz of fresh strawberries',
      base: ['Cream', 'Chocolate'],
      toppings: {
        options: ['Cheesecake bites', 'Brownie bites', 'Vanilla bites'],
      },
      drizzle: {
        note: 'optional',
      },
    },
    image: '/images/services/fresa-cups.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // SAVORY / ANTOJITOS
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'corn-in-a-cup',
    name: 'Corn in a Cup',
    slug: 'corn-in-a-cup',
    category: 'salado',
    featured: true,
    shortDescription: '8oz cup of corn with toppings and chips',
    description: 'Classic Mexican-style corn in a cup with all the traditional toppings and your choice of chips.',
    includes: {
      main: '8oz cup',
      toppings: {
        name: 'Corn toppings',
        options: ['Mayo', 'Butter', 'Cotija cheese', 'Lime', 'Valentina'],
      },
      chips: {
        quantity: 3,
        note: 'your choice',
      },
    },
    image: '/images/services/corn-cup.jpg',
  },

  {
    id: 'tosti-elote',
    name: 'Tosti-Elote',
    slug: 'tosti-elote',
    category: 'salado',
    featured: true,
    shortDescription: 'Corn with Flamin Hot Tostitos and toppings',
    description: 'Our special version of corn served with Tostitos for that extra crunch and spicy flavor.',
    includes: {
      main: 'Tostitos Flamin Hot',
      toppings: {
        name: 'Corn toppings',
        options: ['Mayo', 'Butter', 'Cotija cheese', 'Nacho cheese', 'Cheese powder', 'Lime', 'Valentina'],
      },
      chips: {
        quantity: 4,
        options: ['Purple Tostitos', 'Green Tostitos', 'Hot Cheetos', 'Nacho chips'],
      },
    },
    image: '/images/services/tosti-elote.jpg',
  },

  {
    id: 'snack-cup',
    name: 'Snack Cup',
    slug: 'snack-cup',
    category: 'salado',
    featured: false,
    shortDescription: '8oz cup with fruits, candy, chips and chamoy',
    description: 'The perfect Mexican snack: a mix of fresh fruits, candy and chips with chamoy, lime, tajín and Valentina.',
    includes: {
      main: '8oz cup',
      toppings: {
        quantity: 9,
        breakdown: ['3 fruits', '3 candies', '3 chips'],
      },
      sauces: ['Chamoy', 'Lime', 'Tajín', 'Valentina'],
    },
    image: '/images/services/snack-cup.jpg',
  },

  {
    id: 'ramen-maruchan',
    name: 'Ramen / Maruchan',
    slug: 'ramen-maruchan',
    category: 'salado',
    featured: false,
    shortDescription: 'Maruchan with Mexican toppings and chips',
    description: 'The classic Maruchan Instant Lunch elevated with Mexican toppings, sauces and crunchy chips.',
    includes: {
      main: 'Maruchan Instant Lunch',
      toppings: {
        options: ['Lime', 'Valentina', 'Other sauces'],
      },
      chips: {
        quantity: 4,
        note: 'options',
      },
      garnish: ['Cilantro', 'Onion'],
    },
    image: '/images/services/ramen.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // SPECIAL PACKAGES
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'mix-and-match',
    name: 'Mix & Match',
    slug: 'mix-and-match',
    category: 'paquete',
    featured: true,
    shortDescription: 'Custom package with 2 services',
    description: "Can't decide? With our Mix & Match package you can combine two different services for your event.",
    includes: {
      main: 'Event size divided in 2 halves',
      customization: 'Custom package pricing',
      note: 'Combine any of our services',
    },
    image: '/images/services/mix-match.jpg',
  },
]

export const categories: Category[] = [
  {
    id: 'dulce',
    name: 'Sweet',
    nameEn: 'Sweet',
    description: 'Desserts and sweet treats',
    icon: '🍰',
  },
  {
    id: 'salado',
    name: 'Savory',
    nameEn: 'Savory',
    description: 'Mexican savory snacks',
    icon: '🌽',
  },
  {
    id: 'paquete',
    name: 'Packages',
    nameEn: 'Packages',
    description: 'Special combinations',
    icon: '🎁',
  },
]

export const eventTypes: EventType[] = [
  { id: 'wedding', name: 'Weddings', nameEn: 'Weddings', icon: '💒' },
  { id: 'quinceanera', name: 'Quinceañeras', nameEn: 'Quinceañeras', icon: '👑' },
  { id: 'birthday', name: 'Birthdays', nameEn: 'Birthdays', icon: '🎂' },
  { id: 'baby-shower', name: 'Baby Showers', nameEn: 'Baby Showers', icon: '👶' },
  { id: 'corporate', name: 'Corporate Events', nameEn: 'Corporate Events', icon: '🏢' },
  { id: 'graduation', name: 'Graduations', nameEn: 'Graduations', icon: '🎓' },
  { id: 'party', name: 'Parties', nameEn: 'Parties', icon: '🎉' },
  { id: 'other', name: 'Other', nameEn: 'Other', icon: '✨' },
]

export const faqs: FAQ[] = [
  {
    question: 'How far in advance do I need to book?',
    answer: 'We recommend booking at least 2-3 weeks in advance to ensure availability, especially during peak event season.',
  },
  {
    question: 'What is the minimum number of guests?',
    answer: 'The minimum varies by service. Contact us to learn the specific details of each option.',
  },
  {
    question: 'What does the service include?',
    answer: 'All our services include 1-2 hours of service, a professional attendant, and customizable add-ons for your event.',
  },
  {
    question: 'Can you customize the cart for my event?',
    answer: 'Yes! We offer customization so the cart matches your event theme.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'We serve Houston, TX and surrounding areas within approximately 50 miles.',
  },
  {
    question: 'How can I make a reservation?',
    answer: 'You can contact us through Instagram (@dulceantojo.houstontx) or fill out the quote form on our website.',
  },
  {
    question: 'Do you offer options for dietary restrictions?',
    answer: 'Contact us to discuss specific options. We will do our best to accommodate your needs.',
  },
  {
    question: 'Can I combine different services?',
    answer: 'Of course! Our Mix & Match package allows you to combine two different services at a special price.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria G.',
    event: 'Wedding',
    rating: 5,
    text: 'All the guests were delighted with the mini pancakes! The service was excellent and the cart looked beautiful.',
    date: '2024-11',
  },
  {
    id: '2',
    name: 'Ana L.',
    event: 'Quinceañera',
    rating: 5,
    text: 'The paletas locas were the hit of the party. Very professional and punctual.',
    date: '2024-10',
  },
  {
    id: '3',
    name: 'Roberto S.',
    event: 'Corporate Event',
    rating: 5,
    text: 'We hired the corn service for our company event and it was a total success. Highly recommended.',
    date: '2024-09',
  },
]

export const toppingOptions: ToppingOptions = {
  sweetDrizzles: ['Cajeta', 'Lechera', 'Nutella', 'Syrup', 'Strawberry', 'Chocolate'],
  sweetToppings: [
    'Strawberries', 'Bananas', 'Sprinkles', 'Chocolate chips',
    'Oreo crumbs', 'Pecans', 'Cheesecake bites', 'Brownie bites',
    'Vanilla bites', 'Gummies', 'Pulparindo'
  ],
  cornToppings: [
    'Mayo', 'Butter', 'Cotija cheese', 'Nacho cheese',
    'Cheese powder', 'Lime', 'Valentina'
  ],
  chipOptions: [
    'Purple Tostitos', 'Green Tostitos', 'Hot Cheetos',
    'Nacho chips', 'Tostitos Flamin Hot'
  ],
  paletaFlavors: [
    'Mango', 'Strawberry', 'Watermelon', 'Lime', 'Pecan', 'Cookies & Cream',
  ],
  mexicanSauces: ['Chamoy', 'Tajín', 'Valentina', 'Lime'],
}

// SEO Keywords for Houston local search
export const seoKeywords = [
  'snack cart Houston TX',
  'mini pancakes catering Houston',
  'event desserts Houston',
  'paletas for events Houston',
  'dessert carts Houston',
  'sweet catering Houston',
  'churros for events Houston',
  'elote catering Houston',
  'Mexican desserts Houston events',
  'wedding dessert cart Houston',
  'quinceañera catering Houston',
]

// Navigation links
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]
