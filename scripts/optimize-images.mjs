/**
 * Dulce Antojo - Image Optimization Script
 *
 * Resizes images to appropriate dimensions for their display context (2x for retina).
 * Converts PNG to AVIF. Preserves originals in a backup folder.
 *
 * Usage: node scripts/optimize-images.mjs
 * Options:
 *   --dry-run    Preview changes without modifying files
 *   --no-backup  Skip creating backups (use with caution)
 */

import sharp from 'sharp'
import { readdir, stat, mkdir, copyFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const IMAGES_DIR = 'public/images'
const BACKUP_DIR = 'public/images-backup'
const DRY_RUN = process.argv.includes('--dry-run')
const NO_BACKUP = process.argv.includes('--no-backup')

// Max dimensions per category (2x retina)
// Format: { maxWidth, maxHeight, quality }
const CATEGORIES = {
  'brand/logo.avif': { maxWidth: 576, maxHeight: 576, quality: 75 },
  'brand/logo-1.avif': { maxWidth: 200, maxHeight: 200, quality: 75 },

  'hero/cart-18.avif': { maxWidth: 1500, maxHeight: 1500, quality: 70 },

  // Section header images (displayed at max h-32 = 128px, 2x = 256px)
  'pages/our-services.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },
  'pages/why-choose-us.PNG': { maxWidth: 600, maxHeight: 300, quality: 75, convertToAvif: true },
  'pages/what-our-clients-say.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },
  'pages/faq-2.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },
  'pages/get-a-quote.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },
  'pages/contact-2.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },
  'pages/services.avif': { maxWidth: 600, maxHeight: 300, quality: 75 },

  // Larger page images
  'pages/our-gallery-1.avif': { maxWidth: 1200, maxHeight: 800, quality: 70 },
  'pages/faq-3.avif': { maxWidth: 800, maxHeight: 600, quality: 70 },
}

// Default max dimensions for service images (displayed at max ~475px, 2x = 950px)
const SERVICE_DEFAULTS = { maxWidth: 1024, maxHeight: 1024, quality: 70 }

// Skip these directories (already tiny or not images)
const SKIP_DIRS = ['stickers', 'videos']

const SUPPORTED_EXTENSIONS = ['.avif', '.jpg', '.jpeg', '.png', '.webp']

async function getImageFiles(dir) {
  const files = []

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)
      if (entry.isDirectory()) {
        const dirName = entry.name
        if (!SKIP_DIRS.includes(dirName)) {
          await walk(fullPath)
        }
      } else {
        const ext = extname(entry.name).toLowerCase()
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          files.push(fullPath)
        }
      }
    }
  }

  await walk(dir)
  return files
}

function getConfig(filePath) {
  // Get relative path from images dir
  const relative = filePath.replace(IMAGES_DIR + '/', '')

  // Check specific config first
  if (CATEGORIES[relative]) {
    return CATEGORIES[relative]
  }

  // Default for services directory
  if (relative.startsWith('services/')) {
    return SERVICE_DEFAULTS
  }

  // Default for any other image
  return { maxWidth: 1024, maxHeight: 1024, quality: 70 }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kib = bytes / 1024
  if (kib < 1024) return `${kib.toFixed(1)} KiB`
  return `${(kib / 1024).toFixed(2)} MiB`
}

async function processImage(filePath) {
  const config = getConfig(filePath)
  const relative = filePath.replace(IMAGES_DIR + '/', '')

  try {
    const metadata = await sharp(filePath).metadata()
    const { width, height } = metadata

    // Check if resize is needed
    const needsResize = width > config.maxWidth || height > config.maxHeight
    const needsConvert = config.convertToAvif

    if (!needsResize && !needsConvert) {
      return { file: relative, status: 'skipped', reason: `${width}x${height} already within limits` }
    }

    const originalStats = await stat(filePath)
    const originalSize = originalStats.size

    if (DRY_RUN) {
      return {
        file: relative,
        status: 'would-resize',
        from: `${width}x${height}`,
        to: `max ${config.maxWidth}x${config.maxHeight}`,
        originalSize: formatSize(originalSize),
      }
    }

    // Backup original
    if (!NO_BACKUP) {
      const backupPath = join(BACKUP_DIR, relative)
      const backupDir = backupPath.substring(0, backupPath.lastIndexOf('/'))
      await mkdir(backupDir, { recursive: true })
      await copyFile(filePath, backupPath)
    }

    // Determine output path (may change extension if converting)
    let outputPath = filePath
    if (needsConvert) {
      outputPath = filePath.replace(/\.[^.]+$/, '.avif')
    }

    // Process image
    let pipeline = sharp(filePath)

    if (needsResize) {
      pipeline = pipeline.resize({
        width: config.maxWidth,
        height: config.maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    // Output as AVIF
    pipeline = pipeline.avif({ quality: config.quality, effort: 6 })

    const outputBuffer = await pipeline.toBuffer()
    const { writeFile, unlink } = await import('node:fs/promises')
    await writeFile(outputPath, outputBuffer)

    // If converted from different format, remove original
    if (needsConvert && outputPath !== filePath) {
      await unlink(filePath)
    }

    const newSize = outputBuffer.length
    const savings = originalSize - newSize
    const pct = ((savings / originalSize) * 100).toFixed(1)

    // Get new dimensions
    const newMeta = await sharp(outputBuffer).metadata()

    return {
      file: relative,
      status: 'optimized',
      from: `${width}x${height}`,
      to: `${newMeta.width}x${newMeta.height}`,
      originalSize: formatSize(originalSize),
      newSize: formatSize(newSize),
      saved: `${formatSize(savings)} (${pct}%)`,
    }
  } catch (err) {
    return { file: relative, status: 'error', error: err.message }
  }
}

async function main() {
  console.log('🖼️  Dulce Antojo - Image Optimizer')
  console.log('='.repeat(50))

  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - no files will be modified\n')
  }

  const files = await getImageFiles(IMAGES_DIR)
  console.log(`Found ${files.length} images to process\n`)

  let totalSaved = 0
  let optimized = 0
  let skipped = 0
  let errors = 0

  for (const file of files) {
    const result = await processImage(file)

    if (result.status === 'optimized') {
      console.log(`✅ ${result.file}`)
      console.log(`   ${result.from} → ${result.to} | ${result.originalSize} → ${result.newSize} | Saved: ${result.saved}`)
      // Parse saved bytes for total
      const savedMatch = result.saved.match(/([\d.]+)\s*(KiB|MiB|B)/)
      if (savedMatch) {
        const val = parseFloat(savedMatch[1])
        const unit = savedMatch[2]
        if (unit === 'KiB') totalSaved += val * 1024
        else if (unit === 'MiB') totalSaved += val * 1024 * 1024
        else totalSaved += val
      }
      optimized++
    } else if (result.status === 'would-resize') {
      console.log(`🔄 ${result.file}`)
      console.log(`   ${result.from} → ${result.to} | Current: ${result.originalSize}`)
      optimized++
    } else if (result.status === 'skipped') {
      console.log(`⏭️  ${result.file} - ${result.reason}`)
      skipped++
    } else if (result.status === 'error') {
      console.log(`❌ ${result.file} - ${result.error}`)
      errors++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 Summary:')
  console.log(`   Optimized: ${optimized}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Errors: ${errors}`)
  if (!DRY_RUN && totalSaved > 0) {
    console.log(`   Total saved: ${formatSize(totalSaved)}`)
  }
  if (!DRY_RUN && !NO_BACKUP) {
    console.log(`\n💾 Backups saved to: ${BACKUP_DIR}/`)
  }
}

main().catch(console.error)
