'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { faqs } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const displayedFaqs = faqs.slice(0, 5)

  return (
    <section
      id="faq"
      className="relative px-4 py-16 md:py-24"
    >
      {/* Pattern: 2 left, 1 right */}
      <FloatingStickers stickerIndices={[3, 6, 12]} positionIndices={[0, 1, 3]} />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick answers to common questions
          </p>
        </div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-pink-medium/30 bg-white transition-colors hover:border-gold"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-pink-text">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-pink-accent transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="border-t border-pink-medium/30 p-4"
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            asChild
            variant="outline"
            className="border-pink-medium text-pink-text hover:bg-pink-soft hover:text-gold transition-colors"
          >
            <Link href="/faq">
              View All FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
