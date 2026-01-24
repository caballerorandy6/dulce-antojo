import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="bg-pink-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="border-pink-medium/30 bg-white">
      <CardContent className="p-6">
        <div className="mb-4 flex">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-gold-accent">
              ★
            </span>
          ))}
        </div>
        <p className="mb-4 text-muted-foreground">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div>
          <p className="font-semibold text-pink-text">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.event}</p>
        </div>
      </CardContent>
    </Card>
  )
}
