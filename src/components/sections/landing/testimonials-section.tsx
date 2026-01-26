import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { testimonials } from '@/lib/constants'

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative bg-pink-soft/70 px-4 py-16 md:py-24"
    >
      {/* Pattern: 1 left, 1 right, 1 bottom */}
      <FloatingStickers stickerIndices={[2, 5, 8]} positionIndices={[0, 2, 4]} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center animateHeading">
            <Image
              src="/images/pages/what-our-clients-say.avif"
              alt="What Our Clients Say"
              width={500}
              height={140}
              className="h-20 w-auto md:h-28 lg:h-32"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animateText">
            Real experiences from happy customers
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="w-full border-pink-medium/30 transition-colors hover:border-gold md:w-[calc(33.333%-16px)] animateProjectCard"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-gold-accent text-gold-accent"
                    />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-pink-text">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.event}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
