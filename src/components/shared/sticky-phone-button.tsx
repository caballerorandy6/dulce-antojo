import { Phone } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { businessInfo } from '@/lib/constants'

export function StickyPhoneButton() {
  const phoneNumber = businessInfo.contact.phone

  if (!phoneNumber) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`tel:${phoneNumber}`}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-accent shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-dark hover:shadow-xl md:h-16 md:w-16 animate-pulse-subtle"
            aria-label="Call us"
          >
            {/* Pulse ring animation */}
            <span className="absolute inset-0 rounded-full bg-pink-accent animate-ping opacity-40" />
            <Phone className="relative h-6 w-6 text-white md:h-7 md:w-7" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          Call us now!
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
