'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ServiceGalleryProps {
  images: string[]
  serviceName: string
}

export function ServiceGallery({ images, serviceName }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          More photos
        </p>
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className="animateProjectCard relative aspect-square overflow-hidden rounded-xl bg-pink-soft cursor-pointer group border border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-lg hover:-translate-y-1"
            >
              <Image
                src={img}
                alt={`${serviceName} photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 30vw, 150px"
              />
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          ))}
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl border-pink-medium/30 bg-pink-bg p-2">
          <VisuallyHidden>
            <DialogTitle>{serviceName} photo</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={selectedImage}
                alt={serviceName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
