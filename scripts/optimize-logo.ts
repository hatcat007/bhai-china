const sharp = require('/home/z/my-project/node_modules/sharp');
const fs = require('fs');

const sourcePath = '/home/z/my-project/public/logos/zai-logo-04-steering-wheel.png';
const outputDir = '/home/z/my-project/public';

(async () => {
  // 1. Brand mark for navbar — 40x40 transparent PNG (extract just the wheel, no padding)
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })  // extract center 624x624 (skip padding)
    .resize(40, 40, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/bhai-mark-40.png');
  console.log('✓ bhai-mark-40.png (navbar logo)');

  // 2. Larger brand mark for footer/about — 80x80
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })
    .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/bhai-mark-80.png');
  console.log('✓ bhai-mark-80.png (footer/about logo)');

  // 3. Favicon 32x32 (standard)
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/favicon-32.png');
  console.log('✓ favicon-32.png');

  // 4. Favicon 16x16 (legacy)
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/home/z/my-project/public/favicon-16.png');
  console.log('✓ favicon-16.png');

  // 5. Apple touch icon 180x180 (with black background, not transparent)
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .resize(180, 180, { fit: 'cover', position: 'center' })
    .png()
    .toFile('/home/z/my-project/public/apple-touch-icon.png');
  console.log('✓ apple-touch-icon.png (180x180)');

  // 6. Open Graph image 1200x630 (logo centered on black background)
  await sharp(sourcePath)
    .extract({ left: 200, top: 200, width: 624, height: 624 })
    .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85 })
    .toFile('/home/z/my-project/public/og-image.jpg');
  console.log('✓ og-image.jpg (1200x630 social share)');

  // 7. Full logo with brand mark + text — 400x120 (for navbar replacement)
  // Black background + mark on left + "BETTER HUMAN AI" text on right
  await sharp({
    create: {
      width: 400,
      height: 120,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(sourcePath)
          .extract({ left: 200, top: 200, width: 624, height: 624 })
          .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer(),
        top: 20,
        left: 20
      }
    ])
    .png()
    .toFile('/home/z/my-project/public/bhai-logo-full-400x120.png');
  console.log('✓ bhai-logo-full-400x120.png (full logo with space for text)');

  // Print file sizes
  console.log('\n=== File sizes ===');
  ['bhai-mark-40.png', 'bhai-mark-80.png', 'favicon-32.png', 'favicon-16.png', 'apple-touch-icon.png', 'og-image.jpg', 'bhai-logo-full-400x120.png'].forEach(f => {
    const stat = fs.statSync('/home/z/my-project/public/' + f);
    console.log(`  ${f}: ${(stat.size / 1024).toFixed(1)} KB`);
  });
})();
