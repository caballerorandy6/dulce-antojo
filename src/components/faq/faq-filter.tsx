'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/constants'
import type { FAQ } from '@/types'

const categoryLabels = {
  booking: { title: 'Booking & Reservations' },
  service: { title: 'Service Details' },
  coverage: { title: 'Coverage & Location' },
}

export function FAQFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory)

  // Group FAQs by category for organized display
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  const categoryOrder = ['booking', 'service', 'coverage']

  return (
    <div>
      {/* Filter */}
      <div className="mb-8 flex justify-center">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px] border-pink-medium/50 bg-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Questions</SelectItem>
            <SelectItem value="booking">Booking & Reservations</SelectItem>
            <SelectItem value="service">Service Details</SelectItem>
            <SelectItem value="coverage">Coverage & Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* FAQs by Categories */}
      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const items = groupedFaqs[category]
          if (!items || items.length === 0) return null

          const { title } = categoryLabels[category as keyof typeof categoryLabels]

          return (
            <section key={category}>
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-2xl font-bold text-pink-text">{title}</h2>
                <div className="h-px flex-1 bg-pink-medium/30" />
              </div>

              {/* Category Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {items.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
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
            </section>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredFaqs.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No questions found for this category.
          </p>
        </div>
      )}
    </div>
  )
}
