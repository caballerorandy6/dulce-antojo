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

// Predefined positions for stickers
const stickerConfigs = [
  // 0: Left top
  { top: '15%', left: '2%', rotate: -12, size: 60, opacity: 0.85 },
  // 1: Left middle
  { top: '45%', left: '3%', rotate: 15, size: 55, opacity: 0.8 },
  // 2: Right top
  { top: '10%', right: '2%', rotate: 10, size: 58, opacity: 0.85 },
  // 3: Right middle
  { top: '50%', right: '3%', rotate: -14, size: 55, opacity: 0.8 },
  // 4: Bottom center-left
  { bottom: '5%', left: '25%', rotate: 8, size: 52, opacity: 0.85 },
  // 5: Bottom center-right
  { bottom: '8%', right: '25%', rotate: -10, size: 50, opacity: 0.8 },
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

        return (
          <div
            key={`sticker-${stickerIdx}-${posIdx}`}
            className="absolute hidden md:block"
            style={{
              top: config.top,
              bottom: config.bottom,
              left: config.left,
              right: config.right,
              transform: `rotate(${config.rotate}deg)`,
              opacity: config.opacity,
            }}
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
