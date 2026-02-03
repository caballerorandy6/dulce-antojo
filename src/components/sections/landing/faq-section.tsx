import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { faqs } from '@/lib/constants'

export function FAQSection() {
  const displayedFaqs = faqs.slice(0, 5)

  return (
    <section
      id="faq"
      className="relative bg-pink-soft px-4 py-16 md:py-24 pb-24 md:pb-32"
    >
      {/* Pattern: 2 left, 1 right */}
      <FloatingStickers stickerIndices={[3, 6, 12]} positionIndices={[0, 1, 3]} />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center animateHeading">
            <Image
              src="/images/pages/faq-2.avif"
              alt="Frequently Asked Questions"
              width={500}
              height={140}
              className="h-20 w-auto md:h-28 lg:h-32"
            />
          </div>
          <p className="text-lg text-muted-foreground animateText">
            Quick answers to common questions
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border border-pink-medium/30 bg-white px-4 transition-colors hover:border-gold data-[state=open]:border-gold"
            >
              <AccordionTrigger className="text-pink-text hover:no-underline [&>svg]:text-pink-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="bg-white border-pink-medium text-pink-text hover:bg-pink-soft hover:text-gold transition-colors"
          >
            <Link href="/faq">
              View All FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-pink-bg pointer-events-none" />
    </section>
  )
}
