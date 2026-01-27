'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 left-6 z-50 transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-dark/90 shadow-lg transition-all duration-300 hover:bg-pink-accent hover:shadow-xl md:h-14 md:w-14"
            aria-label="Back to top"
          >
            <ChevronUp className="h-6 w-6 text-white md:h-7 md:w-7" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Back to top
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
