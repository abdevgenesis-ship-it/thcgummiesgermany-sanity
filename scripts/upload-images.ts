import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '1ebrlrsf',
  dataset: 'production',
  apiVersion: '2025-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// All image paths are relative to the web repo's public folder
const WEB_PUBLIC = path.resolve('..', 'thcgummiesgermany', 'public')

async function uploadImage(relPath: string, label: string) {
  const fullPath = path.join(WEB_PUBLIC, relPath)
  if (!fs.existsSync(fullPath)) {
    console.error(`  ❌ File not found: ${fullPath}`)
    return null
  }
  const stream = fs.createReadStream(fullPath)
  const ext = path.extname(relPath).slice(1) as 'png' | 'jpg' | 'jpeg' | 'webp'
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(relPath),
    contentType: `image/${ext}`,
  })
  console.log(`  ✅ Uploaded ${label} → ${asset._id}`)
  return asset._id
}

function imageRef(assetId: string) {
  return {_type: 'image' as const, asset: {_type: 'reference' as const, _ref: assetId}}
}

async function main() {
  console.log('🖼️  Uploading images to Sanity project 1ebrlrsf…\n')

  // ── Category images ──────────────────────────────────────────────────────
  const thcGummiesId = await uploadImage(
    'images/categories/bulk-510-carts.png',
    'THC Gummies category',
  )
  const weedGummiesId = await uploadImage(
    'images/categories/bulk-thc-vapes.png',
    'Weed Gummies category',
  )
  const cannabisGummiesId = await uploadImage(
    'images/authority_retail_thc.png',
    'Cannabis Gummies category',
  )

  // ── About page story image ───────────────────────────────────────────────
  const storyImageId = await uploadImage(
    'images/about/story-fallback.png',
    'About page story',
  )

  console.log('\n📝 Patching Sanity documents…\n')

  // ── Patch categories ─────────────────────────────────────────────────────
  if (thcGummiesId) {
    await client.patch('category-thc-gummies').set({image: imageRef(thcGummiesId)}).commit()
    console.log('  ✅ category-thc-gummies.image patched')
  }

  if (weedGummiesId) {
    await client.patch('category-weed-gummies').set({image: imageRef(weedGummiesId)}).commit()
    console.log('  ✅ category-weed-gummies.image patched')
  }

  if (cannabisGummiesId) {
    await client.patch('category-cannabis-gummies').set({image: imageRef(cannabisGummiesId)}).commit()
    console.log('  ✅ category-cannabis-gummies.image patched')
  }

  // ── Patch about page ─────────────────────────────────────────────────────
  if (storyImageId) {
    await client.patch('aboutPage').set({storyImage: imageRef(storyImageId)}).commit()
    console.log('  ✅ aboutPage.storyImage patched')
  }

  console.log('\n✨ Done! All images uploaded and documents patched.\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
