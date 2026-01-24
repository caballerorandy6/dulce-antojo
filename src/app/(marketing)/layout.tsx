'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { LandingHeader } from '@/components/layout/landing-header'
import { Footer } from '@/components/layout/footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <>
      {isLandingPage ? <LandingHeader /> : <Header />}
      {children}
      <Footer />
    </>
  )
}
