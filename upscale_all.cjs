const sharp = require('sharp');
const fs = require('fs');

const imagesToProcess = [
  'public/pall-hero.png',
  'public/pall-workstation-wide.png',
  'public/pall-workstation-close.png',
  'public/pall-lounge.png',
  'public/pall-cafe.png',
  'public/tata-desk-hero.png',
  'public/tata-lounge-chair.png',
  'public/tata-executive-desk.png'
];

// Create backup directory
if (!fs.existsSync('scratch/image_backups')) {
  fs.mkdirSync('scratch/image_backups', { recursive: true });
}

async function processAll() {
  for (const imagePath of imagesToProcess) {
    if (!fs.existsSync(imagePath)) {
      console.log(`Skipping ${imagePath}, does not exist.`);
      continue;
    }
    
    // Backup
    const fileName = imagePath.split('/').pop();
    fs.copyFileSync(imagePath, `scratch/image_backups/${fileName}`);
    
    // Upscale
    const metadata = await sharp(imagePath).metadata();
    
    // Only upscale if width is less than 1200 to prevent double-upscaling
    if (metadata.width < 1200) {
      await sharp(`scratch/image_backups/${fileName}`)
        .resize(Math.round(metadata.width * 2.5), Math.round(metadata.height * 2.5), {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain'
        })
        .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8, x1: 2, y2: 10, y3: 20 })
        .png({ quality: 100 })
        .toFile(imagePath);
      console.log(`Upscaled: ${imagePath} from ${metadata.width}px to ${Math.round(metadata.width * 2.5)}px`);
    } else {
      console.log(`Skipped: ${imagePath} is already large (${metadata.width}px)`);
    }
  }
}

processAll();
