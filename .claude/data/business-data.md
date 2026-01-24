# 📊 Datos del Negocio - Dulce Antojo

## Información General

```typescript
export const businessInfo = {
  name: 'Dulce Antojo',
  tagline: 'Mini Pancakes & More',
  description: 'Carritos de postres y snacks mexicanos para eventos en Houston TX',
  
  location: {
    city: 'Houston',
    state: 'TX',
    country: 'USA',
    serviceRadius: '50 millas',
  },
  
  contact: {
    instagram: '@dulceantojo.houstontx',
    instagramUrl: 'https://instagram.com/dulceantojo.houstontx',
  },
  
  // Incluido en TODOS los servicios
  allServicesInclude: [
    '1-2 horas de servicio',
    'Attendant profesional',
    'Add-ons personalizados',
  ],
}
```

---

## Catálogo Completo de Servicios

```typescript
export const services = [
  // ═══════════════════════════════════════════════════════════════
  // DULCES
  // ═══════════════════════════════════════════════════════════════
  
  {
    id: 'mini-pancakes',
    name: 'Mini Pancakes',
    slug: 'mini-pancakes',
    category: 'dulce',
    featured: true,
    shortDescription: '10 mini pancakes con drizzles y toppings personalizados',
    description: 'Deliciosos mini pancakes recién hechos, servidos con una variedad de drizzles dulces y toppings para que cada invitado personalice su plato.',
    includes: {
      main: '10 mini pancakes por persona',
      drizzles: {
        quantity: 4,
        options: ['Cajeta', 'Lechera', 'Nutella', 'Syrup'],
      },
      toppings: {
        quantity: 6,
        options: ['Fresas', 'Bananas', 'Sprinkles', 'Chocolate chips', 'Oreo crumbs', 'Pecans'],
      },
    },
    extras: [
      { name: 'Helado de vainilla', note: 'cargo extra' },
    ],
    image: '/images/services/mini-pancakes.jpg',
  },

  {
    id: 'paletas-locas',
    name: 'Paletas Locas',
    slug: 'paletas-locas',
    category: 'dulce',
    featured: true,
    shortDescription: '+10 sabores con toppings, frutas frescas y drizzles',
    description: 'Paletas mexicanas estilo "loca" con una explosión de sabores, toppings y el toque perfecto de chamoy y tajín.',
    includes: {
      main: 'Paleta base de leche o agua',
      flavors: {
        quantity: '+10',
        note: 'sabores disponibles',
      },
      toppings: {
        quantity: 7,
      },
      fruits: {
        quantity: 2,
        note: 'frutas frescas cortadas',
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
    shortDescription: 'Carrito de paletas self-serve personalizado para tu evento',
    description: 'Renta completa de nuestro carrito de paletas. Perfecto para eventos grandes donde los invitados pueden servirse ellos mismos.',
    includes: {
      main: 'Desde 50 paletas',
      flavors: {
        quantity: '+10',
        options: ['Leche o agua'],
      },
      service: 'Self-serve',
      setup: ['Carrito', 'Sombrilla', 'Guirnalda de globos'],
      customization: 'Personalizado para tu evento',
    },
    image: '/images/services/paleta-cart.jpg',
  },

  {
    id: 'sorbet',
    name: 'Sorbet',
    slug: 'sorbet',
    category: 'dulce',
    featured: false,
    shortDescription: '6 sabores con toppings dulces o salados',
    description: 'Refrescante sorbet con variedad de sabores frutales y la opción de personalizarlo dulce o salado estilo mexicano.',
    includes: {
      flavors: {
        quantity: 6,
        options: ['Mango', 'Fresa', 'Sandía', 'Lima', 'Nuez', 'Cookies & Cream'],
      },
      toppings: {
        quantity: 6,
      },
      styles: ['Dulce', 'Salado'],
      dulceOptions: ['Leche condensada', 'Crema batida'],
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
    shortDescription: 'Helado con drizzles y 6 toppings a elegir',
    description: 'Clásico sundae americano con helado cremoso, drizzles y toppings para crear la combinación perfecta.',
    includes: {
      main: '1-2 sabores de helado',
      note: 'dependiendo del tamaño del evento',
      drizzles: {
        options: ['Nutella', 'Lechera', 'Cajeta', 'Fresa'],
      },
      toppings: {
        quantity: 6,
        note: 'a elección',
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
    shortDescription: 'Churros con helado, drizzles y toppings',
    description: 'La combinación perfecta: churros crujientes con helado cremoso, drizzles y toppings. ¡Un favorito de todos!',
    includes: {
      main: '(2) churros de 5 pulgadas',
      iceCream: '1-2 sabores de helado',
      drizzles: true,
      toppings: {
        quantity: 6,
        note: 'a elección',
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
    shortDescription: 'Churros de 10" o (2) 5" con drizzles y toppings',
    description: 'Churros recién hechos, crujientes por fuera y suaves por dentro. Servidos con drizzles y toppings.',
    includes: {
      options: [
        '1 churro de 10 pulgadas',
        '(2) churros de 5 pulgadas',
      ],
      drizzles: true,
      toppings: {
        quantity: 6,
        note: 'a elección',
      },
      serving: {
        plate: 'Si se decide servir en plato',
        stick: 'Churro de 10" servido en palito con opciones de drizzles',
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
    shortDescription: 'Fresas frescas con crema o chocolate y toppings',
    description: 'Deliciosas fresas frescas bañadas en crema o chocolate con toppings especiales.',
    includes: {
      main: '8oz de fresas frescas',
      base: ['Crema', 'Chocolate'],
      toppings: {
        options: ['Cheesecake bites', 'Brownie bites', 'Vanilla bites'],
      },
      drizzle: {
        note: 'opcional',
      },
    },
    image: '/images/services/fresa-cups.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // SALADOS / ANTOJITOS
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'corn-in-a-cup',
    name: 'Corn in a Cup',
    slug: 'corn-in-a-cup',
    category: 'salado',
    featured: true,
    shortDescription: 'Elote en vaso de 8oz con toppings y chips',
    description: 'Clásico elote en vaso estilo mexicano con todos los toppings tradicionales y tu elección de chips.',
    includes: {
      main: '8oz cup',
      toppings: {
        name: 'Corn toppings',
        options: ['Mayo', 'Mantequilla', 'Queso cotija', 'Lima', 'Valentina'],
      },
      chips: {
        quantity: 3,
        note: 'a elección',
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
    shortDescription: 'Elote con Tostitos Flamin Hot y toppings',
    description: 'Nuestra versión especial del elote servido con Tostitos para ese crunch extra y sabor picante.',
    includes: {
      main: 'Tostitos Flamin Hot',
      toppings: {
        name: 'Corn toppings',
        options: ['Mayo', 'Mantequilla', 'Queso cotija', 'Queso nacho', 'Queso en polvo', 'Lima', 'Valentina'],
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
    shortDescription: 'Vaso de 8oz con frutas, dulces, chips y chamoy',
    description: 'El snack mexicano perfecto: una mezcla de frutas frescas, dulces y chips con chamoy, lima, tajín y Valentina.',
    includes: {
      main: '8oz cup',
      toppings: {
        quantity: 9,
        breakdown: ['3 frutas', '3 dulces', '3 chips'],
      },
      sauces: ['Chamoy', 'Lima', 'Tajín', 'Valentina'],
    },
    image: '/images/services/snack-cup.jpg',
  },

  {
    id: 'ramen-maruchan',
    name: 'Ramen / Maruchan',
    slug: 'ramen-maruchan',
    category: 'salado',
    featured: false,
    shortDescription: 'Maruchan con toppings mexicanos y chips',
    description: 'El clásico Maruchan Instant Lunch elevado con toppings mexicanos, salsas y chips crujientes.',
    includes: {
      main: 'Maruchan Instant Lunch',
      toppings: {
        options: ['Limón', 'Valentina', 'Otras salsas'],
      },
      chips: {
        quantity: 4,
        note: 'opciones',
      },
      garnish: ['Cilantro', 'Cebolla'],
    },
    image: '/images/services/ramen.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // PAQUETES ESPECIALES
  // ═══════════════════════════════════════════════════════════════

  {
    id: 'mix-and-match',
    name: 'Mix & Match',
    slug: 'mix-and-match',
    category: 'paquete',
    featured: true,
    shortDescription: 'Paquete personalizado con 2 servicios',
    description: '¿No puedes decidir? Con nuestro paquete Mix & Match puedes combinar dos servicios diferentes para tu evento.',
    includes: {
      main: 'Tamaño del evento dividido en 2 mitades',
      customization: 'Precio de paquete personalizado',
      note: 'Combina cualquiera de nuestros servicios',
    },
    image: '/images/services/mix-match.jpg',
  },
]
```

---

## Información de Toppings y Opciones

```typescript
export const toppingOptions = {
  // Drizzles dulces
  sweetDrizzles: ['Cajeta', 'Lechera', 'Nutella', 'Syrup', 'Fresa', 'Chocolate'],
  
  // Toppings dulces
  sweetToppings: [
    'Fresas', 'Bananas', 'Sprinkles', 'Chocolate chips', 
    'Oreo crumbs', 'Pecans', 'Cheesecake bites', 'Brownie bites',
    'Vanilla bites', 'Gomitas', 'Pulparindo'
  ],
  
  // Toppings de elote/corn
  cornToppings: [
    'Mayo', 'Mantequilla', 'Queso cotija', 'Queso nacho',
    'Queso en polvo', 'Lima', 'Valentina'
  ],
  
  // Opciones de chips
  chipOptions: [
    'Purple Tostitos', 'Green Tostitos', 'Hot Cheetos', 
    'Nacho chips', 'Tostitos Flamin Hot'
  ],
  
  // Sabores de paletas
  paletaFlavors: [
    'Mango', 'Fresa', 'Sandía', 'Lima', 'Nuez', 'Cookies & Cream',
    // Y más según disponibilidad
  ],
  
  // Salsas mexicanas
  mexicanSauces: ['Chamoy', 'Tajín', 'Valentina', 'Lima'],
}
```

---

## Categorías

```typescript
export const categories = [
  {
    id: 'dulce',
    name: 'Dulces',
    nameEn: 'Sweet',
    description: 'Postres y antojitos dulces',
    icon: '🍰',
  },
  {
    id: 'salado',
    name: 'Salados',
    nameEn: 'Savory',
    description: 'Antojitos salados mexicanos',
    icon: '🌽',
  },
  {
    id: 'paquete',
    name: 'Paquetes',
    nameEn: 'Packages',
    description: 'Combinaciones especiales',
    icon: '🎁',
  },
]
```

---

## Tipos de Eventos

```typescript
export const eventTypes = [
  { id: 'boda', name: 'Bodas', nameEn: 'Weddings', icon: '💒' },
  { id: 'quinceanera', name: 'Quinceañeras', nameEn: 'Quinceañeras', icon: '👑' },
  { id: 'cumpleanos', name: 'Cumpleaños', nameEn: 'Birthdays', icon: '🎂' },
  { id: 'baby-shower', name: 'Baby Showers', nameEn: 'Baby Showers', icon: '👶' },
  { id: 'corporativo', name: 'Eventos Corporativos', nameEn: 'Corporate Events', icon: '🏢' },
  { id: 'graduacion', name: 'Graduaciones', nameEn: 'Graduations', icon: '🎓' },
  { id: 'fiesta', name: 'Fiestas', nameEn: 'Parties', icon: '🎉' },
  { id: 'otro', name: 'Otros', nameEn: 'Other', icon: '✨' },
]
```

---

## FAQ Sugerido

```typescript
export const faqs = [
  {
    question: '¿Cuánto tiempo de anticipación necesito para reservar?',
    answer: 'Recomendamos reservar con al menos 2-3 semanas de anticipación para asegurar disponibilidad, especialmente en temporada alta de eventos.',
  },
  {
    question: '¿Cuál es el mínimo de invitados?',
    answer: 'El mínimo varía según el servicio. Contáctanos para conocer los detalles específicos de cada opción.',
  },
  {
    question: '¿Qué incluye el servicio?',
    answer: 'Todos nuestros servicios incluyen 1-2 horas de servicio, un attendant profesional y la opción de add-ons personalizados para tu evento.',
  },
  {
    question: '¿Pueden personalizar el carrito para mi evento?',
    answer: '¡Sí! Ofrecemos personalización para que el carrito combine con la temática de tu evento.',
  },
  {
    question: '¿Qué áreas cubren?',
    answer: 'Servimos Houston, TX y áreas circundantes dentro de aproximadamente 50 millas.',
  },
  {
    question: '¿Cómo puedo hacer una reservación?',
    answer: 'Puedes contactarnos a través de Instagram (@dulceantojo.houstontx) o completar el formulario de cotización en nuestra página.',
  },
  {
    question: '¿Ofrecen opciones para restricciones dietéticas?',
    answer: 'Contáctanos para discutir opciones específicas. Haremos lo posible por acomodar tus necesidades.',
  },
  {
    question: '¿Puedo combinar diferentes servicios?',
    answer: '¡Claro! Nuestro paquete Mix & Match te permite combinar dos servicios diferentes con un precio especial.',
  },
]
```

---

## Testimonios (Ejemplo)

```typescript
export const testimonials = [
  {
    id: '1',
    name: 'María G.',
    event: 'Boda',
    rating: 5,
    text: '¡Todos los invitados quedaron encantados con los mini pancakes! El servicio fue excelente y el carrito se veía hermoso.',
    date: '2024-11',
  },
  {
    id: '2', 
    name: 'Ana L.',
    event: 'Quinceañera',
    rating: 5,
    text: 'Las paletas locas fueron el hit de la fiesta. Muy profesionales y puntuales.',
    date: '2024-10',
  },
  {
    id: '3',
    name: 'Roberto S.',
    event: 'Evento Corporativo',
    rating: 5,
    text: 'Contratamos el servicio de elote para nuestro evento de empresa y fue un éxito total. Muy recomendados.',
    date: '2024-09',
  },
]
```
