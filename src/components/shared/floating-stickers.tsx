import Image from 'next/image'

const stickers = [
  '/images/landing/sticker-1.avif',
  '/images/landing/sticker-2.avif',
  '/images/landing/sticker-3.avif',
  '/images/landing/sticker-4.avif',
  '/images/landing/sticker-5.avif',
  '/images/landing/sticker-6.avif',
  '/images/landing/sticker-7.avif',
  '/images/landing/sticker-8.avif',
  '/images/landing/sticker-9.avif',
  '/images/landing/sticker-10.avif',
  '/images/landing/sticker-11.avif',
  '/images/landing/sticker-12.avif',
  '/images/landing/sticker-13.avif',
]

// Animation classes for variety
const animationClasses = [
  'animate-float',
  'animate-float-alt',
  'animate-float-slow',
]

// Predefined positions for stickers
const stickerConfigs = [
  // 0: Left top
  { top: '12%', left: '5%', rotate: -12, size: 58, opacity: 0.85, animIndex: 0 },
  // 1: Left middle-low
  { top: '55%', left: '4%', rotate: 15, size: 52, opacity: 0.8, animIndex: 1 },
  // 2: Right top
  { top: '8%', right: '5%', rotate: 10, size: 56, opacity: 0.85, animIndex: 2 },
  // 3: Right middle-high
  { top: '38%', right: '4%', rotate: -14, size: 54, opacity: 0.8, animIndex: 0 },
  // 4: Bottom left corner
  { bottom: '8%', left: '8%', rotate: 8, size: 50, opacity: 0.85, animIndex: 1 },
  // 5: Bottom right corner
  { bottom: '12%', right: '10%', rotate: -10, size: 48, opacity: 0.8, animIndex: 2 },
]

interface FloatingStickersProps {
  /** Which stickers to show (by index, 0-12) */
  stickerIndices?: number[]
  /** Which positions to use (0-7) */
  positionIndices?: number[]
  /** Additional className for the container */
  className?: string
}

export function FloatingStickers({
  stickerIndices = [0, 1],
  positionIndices = [0, 4],
  className = '',
}: FloatingStickersProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stickerIndices.map((stickerIdx, i) => {
        const posIdx = positionIndices[i] ?? i % stickerConfigs.length
        const config = stickerConfigs[posIdx]
        const sticker = stickers[stickerIdx % stickers.length]

        const animationClass = animationClasses[config.animIndex]

        return (
          <div
            key={`sticker-${stickerIdx}-${posIdx}`}
            className={`absolute hidden md:block ${animationClass}`}
            style={{
              top: config.top,
              bottom: config.bottom,
              left: config.left,
              right: config.right,
              opacity: config.opacity,
              '--rotate': `${config.rotate}deg`,
            } as React.CSSProperties}
          >
            <Image
              src={sticker}
              alt=""
              width={config.size}
              height={config.size}
              className="select-none w-10 h-10 md:w-12 md:h-12 lg:w-auto lg:h-auto"
              aria-hidden="true"
            />
          </div>
        )
      })}
    </div>
  )
}
