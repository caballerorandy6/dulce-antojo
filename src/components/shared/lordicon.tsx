'use client'

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import lottie from 'lottie-web'
import { defineElement } from '@lordicon/element'

// Define the custom element once
let elementDefined = false

interface LordiconProps {
  src: string
  trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'boomerang' | 'sequence'
  target?: string
  colors?: { primary?: string; secondary?: string }
  size?: number
  className?: string
}

export interface LordiconHandle {
  play: () => void
}

export const Lordicon = forwardRef<LordiconHandle, LordiconProps>(function Lordicon({
  src,
  trigger = 'hover',
  target,
  colors,
  size = 64,
  className = '',
}, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !elementDefined) {
      // @ts-expect-error - Lordicon types don't match lottie-web
      defineElement(lottie.loadAnimation)
      elementDefined = true
    }
  }, [])

  useEffect(() => {
    if (containerRef.current && !iconRef.current) {
      const icon = document.createElement('lord-icon')
      icon.setAttribute('src', src)
      icon.setAttribute('trigger', trigger)
      if (colors) {
        icon.setAttribute('colors', `primary:${colors.primary},secondary:${colors.secondary}`)
      }
      if (target) {
        icon.setAttribute('target', target)
      }
      icon.style.width = `${size}px`
      icon.style.height = `${size}px`
      containerRef.current.appendChild(icon)
      iconRef.current = icon
    }

    return () => {
      if (iconRef.current && containerRef.current) {
        containerRef.current.removeChild(iconRef.current)
        iconRef.current = null
      }
    }
  }, [src, trigger, target, colors, size])

  useImperativeHandle(ref, () => ({
    play: () => {
      if (iconRef.current) {
        // @ts-expect-error - Lordicon element has custom methods
        iconRef.current.playerInstance?.play()
      }
    }
  }))

  return <div ref={containerRef} className={className} />
})
