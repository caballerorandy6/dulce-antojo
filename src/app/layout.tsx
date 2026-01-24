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
  metadataBase: new URL('https://dulceantojo.com'),
  title: {
    default: 'Dulce Antojo | Mini Pancakes & More - Houston TX',
    template: '%s | Dulce Antojo',
  },
  description:
    'Mexican dessert and snack carts for events in Houston, TX. Mini pancakes, paletas locas, churros, and more. Professional catering for weddings, quinceañeras, and parties.',
  keywords: [
    'snack cart Houston TX',
    'mini pancakes catering Houston',
    'event desserts Houston',
    'Mexican desserts Houston',
    'churros for events',
    'paletas locas Houston',
    'wedding dessert cart',
    'quinceañera catering',
  ],
  authors: [{ name: 'Dulce Antojo' }],
  creator: 'Dulce Antojo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dulceantojo.com',
    siteName: 'Dulce Antojo',
    title: 'Dulce Antojo | Mini Pancakes & More - Houston TX',
    description:
      'Mexican dessert and snack carts for events in Houston, TX. Professional catering for weddings, quinceañeras, and parties.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dulce Antojo - Mini Pancakes & More',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dulce Antojo | Mini Pancakes & More - Houston TX',
    description:
      'Mexican dessert and snack carts for events in Houston, TX.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
