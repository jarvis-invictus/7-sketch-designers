const sharp = require('sharp');

async function processImage() {
  const metadata = await sharp('public/pall-hero.png').metadata();
  await sharp('public/pall-hero.png')
    .resize(Math.round(metadata.width * 2.5), Math.round(metadata.height * 2.5), {
      kernel: sharp.kernel.lanczos3,
      fit: 'contain'
    })
    .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8, x1: 2, y2: 10, y3: 20 }) // Unsharp mask
    .png({ quality: 100 })
    .toFile('public/pall-hero-upscaled.png');
  console.log('Done');
}

processImage();
