import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FloatingStickers } from '@/components/shared/floating-stickers'
import { Lordicon } from '@/components/shared/lordicon'
import { businessInfo } from '@/lib/constants'

interface SocialCTAProps {
  quoteTitle?: string
  quoteDescription?: string
}

export function SocialCTA({
  quoteTitle = "Want Us at Your Event?",
  quoteDescription = "Let's create beautiful memories together.",
}: SocialCTAProps) {
  return (
    <section className="relative overflow-hidden bg-pink-soft px-4 py-16 pt-8">
      <FloatingStickers
        stickerIndices={[0, 3, 6, 9]}
        positionIndices={[0, 2, 4, 5]}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Social Media Card */}
          <div className="social-card rounded-2xl bg-white p-8 text-center shadow-lg border border-pink-medium/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <Lordicon
                src="/icons/love-heart.json"
                trigger="hover"
                target=".social-card"
                size={64}
              />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-pink-text">
              Follow Our Journey
            </h2>
            <p className="mb-6 text-muted-foreground">
              Behind-the-scenes content, latest events, and sweet moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white transition-colors"
              >
                <a
                  href={businessInfo.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Lordicon
                    src="/icons/instagram.json"
                    trigger="hover"
                    size={24}
                  />
                  Instagram
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white transition-colors"
              >
                <a
                  href={businessInfo.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Lordicon
                    src="/icons/facebook.json"
                    trigger="hover"
                    size={24}
                  />
                  Facebook
                </a>
              </Button>
            </div>
          </div>

          {/* Quote Card */}
          <div className="quote-card rounded-2xl bg-pink-accent p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <Lordicon
                src="/icons/confetti-new.json"
                trigger="hover"
                target=".quote-card"
                size={64}
              />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              {quoteTitle}
            </h2>
            <p className="mb-6 text-white/90">
              {quoteDescription}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-pink-accent hover:bg-pink-soft transition-colors"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
