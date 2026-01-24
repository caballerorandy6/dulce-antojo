import { Card, CardContent } from '@/components/ui/card'
import type { FAQ } from '@/types'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  return (
    <section className="bg-pink-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {title && (
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
              {title}
            </h2>
          </div>
        )}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="animateProjectCard border-pink-medium/30">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-pink-text">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
