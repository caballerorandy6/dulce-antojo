'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseSectionObserverProps {
  sectionId: string
  onInView: (sectionId: string) => void
}

export function useSectionObserver({ sectionId, onInView }: UseSectionObserverProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: '-20% 0px -20% 0px',
  })

  useEffect(() => {
    if (inView) {
      onInView(sectionId)
    }
  }, [inView, sectionId, onInView])

  return ref
}
