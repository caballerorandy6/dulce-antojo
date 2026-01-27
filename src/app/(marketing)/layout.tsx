import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StickyPhoneButton } from '@/components/shared/sticky-phone-button'
import { ScrollToTop } from '@/components/shared/scroll-to-top'
import { JsonLdLocalBusiness } from '@/components/seo/json-ld-local-business'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLdLocalBusiness />
      <Header />
      {children}
      <Footer />
      <StickyPhoneButton />
      <ScrollToTop />
    </>
  )
}
