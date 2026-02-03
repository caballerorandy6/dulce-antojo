import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dulceantojosnackcarts.com'),
  title: {
    default: 'Dulce Antojo | Mini Pancakes & Snack Carts - Houston TX',
    template: '%s | Dulce Antojo Houston',
  },
  description:
    'Mexican dessert and snack carts for events in Houston, TX. Mini pancakes, paletas locas, churros, elotes, and more. Professional catering for weddings, quinceañeras, birthdays, and corporate events.',
  keywords: [
    'snack cart Houston TX',
    'mini pancakes catering Houston',
    'event desserts Houston',
    'Mexican desserts Houston',
    'churros for events Houston',
    'paletas locas Houston',
    'elote cart Houston',
    'wedding dessert cart Houston',
    'quinceañera catering Houston',
    'corporate event catering Houston',
    'dessert cart rental Houston',
  ],
  authors: [{ name: 'Dulce Antojo' }],
  creator: 'Dulce Antojo',
  publisher: 'Dulce Antojo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dulceantojosnackcarts.com',
    siteName: 'Dulce Antojo',
    title: 'Dulce Antojo | Mini Pancakes & Snack Carts - Houston TX',
    description:
      'Mexican dessert and snack carts for events in Houston, TX. Professional catering for weddings, quinceañeras, and parties.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dulce Antojo - Mini Pancakes & Snack Carts Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dulce Antojo | Mini Pancakes & Snack Carts - Houston TX',
    description:
      'Mexican dessert and snack carts for events in Houston, TX.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero/cart-18.avif"
          type="image/avif"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
