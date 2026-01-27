import Image from 'next/image'

const stickers = [
  '/images/stickers/sticker-1.avif',
  '/images/stickers/sticker-2.avif',
  '/images/stickers/sticker-3.avif',
  '/images/stickers/sticker-4.avif',
  '/images/stickers/sticker-5.avif',
  '/images/stickers/sticker-6.avif',
  '/images/stickers/sticker-7.avif',
  '/images/stickers/sticker-8.avif',
  '/images/stickers/sticker-9.avif',
  '/images/stickers/sticker-10.avif',
  '/images/stickers/sticker-11.avif',
  '/images/stickers/sticker-12.avif',
  '/images/stickers/sticker-13.avif',
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
  // 6: Top left (for carousel sections)
  { top: '3%', left: '6%', rotate: -8, size: 45, opacity: 0.8, animIndex: 0 },
  // 7: Top right (for carousel sections)
  { top: '2%', right: '8%', rotate: 12, size: 42, opacity: 0.8, animIndex: 1 },
  // 8: Bottom left (for carousel sections)
  { bottom: '4%', left: '5%', rotate: 10, size: 44, opacity: 0.8, animIndex: 2 },
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
    <div className={`pointer-events-none absolute inset-0 overflow-hidden hide-mobile-landscape ${className}`}>
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
              className="select-none"
              style={{ width: 'auto', height: 'auto' }}
              aria-hidden="true"
            />
          </div>
        )
      })}
    </div>
  )
}
