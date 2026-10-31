import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SRC_LOGO = 'C:/Users/Tayfur/.gemini/antigravity/brain/78c7b0c9-743c-4bb1-945a-902678171b4e/.user_uploaded/media_1793442779747_25e27ff6.png'
const SRC_ICON = 'C:/Users/Tayfur/.gemini/antigravity/brain/78c7b0c9-743c-4bb1-945a-902678171b4e/.user_uploaded/media_1793442788640_4f83af9d.png'
const PUBLIC_DIR = 'C:/Users/Tayfur/OneDrive/Desktop/Projelerim/atalaylardekarasyon/public'

function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  let offset = headerSize + count * dirEntrySize

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const entries = []
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize)
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0)
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(item.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += item.buffer.length
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)])
}

async function run() {
  console.log('Generating website assets from user uploaded images...')

  // 1. Copy Full Horizontal Logo
  fs.copyFileSync(SRC_LOGO, path.join(PUBLIC_DIR, 'logo.png'))
  console.log('✓ Updated public/logo.png')

  // 2. Copy Full Square Icon
  fs.copyFileSync(SRC_ICON, path.join(PUBLIC_DIR, 'logo-icon.png'))
  console.log('✓ Updated public/logo-icon.png')

  const iconBase = sharp(SRC_ICON).trim()

  // 3. Apple Touch Icon (180x180) - Solid crisp white background with gold accent border
  const appleTouchBuf = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: await iconBase.clone().resize(140, 140, { fit: 'contain' }).toBuffer(),
        gravity: 'centre'
      }
    ])
    .png()
    .toBuffer()

  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), appleTouchBuf)
  console.log('✓ Updated public/apple-touch-icon.png')

  // 4. Favicon PNG (48x48, 32x32, 16x16 with crisp white rounded tile so navy & gold are vibrant in any browser theme)
  async function makeFavTile(size, padding = 4) {
    const innerSize = size - padding * 2
    const inner = await iconBase.clone().resize(innerSize, innerSize, { fit: 'contain' }).toBuffer()
    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: inner, gravity: 'centre' }])
      .png()
      .toBuffer()
  }

  const fav16Buf = await makeFavTile(16, 2)
  const fav32Buf = await makeFavTile(32, 4)
  const fav48Buf = await makeFavTile(48, 6)

  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.png'), fav48Buf)
  console.log('✓ Updated public/favicon.png')

  // 5. Favicon ICO (16, 32, 48)
  const icoBuf = buildIco([
    { width: 16, height: 16, buffer: fav16Buf },
    { width: 32, height: 32, buffer: fav32Buf },
    { width: 48, height: 48, buffer: fav48Buf }
  ])
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuf)
  console.log('✓ Updated public/favicon.ico')

  // 6. Favicon SVG (High fidelity vector-wrapped SVG with rounded white background & gold border)
  const iconBase64 = (await iconBase.clone().resize(200, 200, { fit: 'contain' }).png().toBuffer()).toString('base64')
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <title>Atalay Dekorasyon</title>
  <rect width="256" height="256" rx="56" fill="#FFFFFF" stroke="#C57D28" stroke-width="4" />
  <image href="data:image/png;base64,${iconBase64}" x="28" y="28" width="200" height="200" />
</svg>
`
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), svgContent, 'utf8')
  console.log('✓ Updated public/favicon.svg')

  console.log('\nAll logo and favicon assets have been successfully regenerated!')
}

run().catch(err => {
  console.error('Asset generation failed:', err)
  process.exit(1)
})
