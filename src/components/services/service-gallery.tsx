'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ServiceGalleryProps {
  images: string[]
  serviceName: string
}

export function ServiceGallery({ images, serviceName }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Remove duplicate images
  const uniqueImages = [...new Set(images)]

  // Determine grid columns based on number of unique images
  const gridCols = uniqueImages.length === 1
    ? 'grid-cols-1 max-w-[150px]'
    : uniqueImages.length === 2
      ? 'grid-cols-2 max-w-[320px]'
      : 'grid-cols-3'

  return (
    <>
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          More photos
        </p>
        <div className={`grid gap-3 ${gridCols}`}>
          {uniqueImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              aria-label={`View ${serviceName} photo ${index + 1}`}
              className="animateProjectCard relative aspect-square overflow-hidden rounded-xl bg-pink-soft cursor-pointer group border border-pink-medium/30 transition-all duration-300 hover:border-gold hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
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
        <DialogContent className="max-w-3xl overflow-hidden border-0 bg-transparent p-0 shadow-2xl" showCloseButton={false}>
          <VisuallyHidden>
            <DialogTitle>{serviceName} photo</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              {/* Background Image */}
              <Image
                src={selectedImage}
                alt={serviceName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Custom Close Button */}
              <DialogClose className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-pink-accent hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>

              {/* Service Name */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
                  {serviceName}
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Dulce Antojo Houston
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  📸 Gallery
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
