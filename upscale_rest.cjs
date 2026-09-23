const sharp = require('sharp');
const fs = require('fs');

const imagesToProcess = [
  'public/raftaar-arcade.png',
  'public/raftaar-cafe.png',
  'public/raftaar-lounge.png',
  'public/raftaar-neon.png',
  'public/raftaar-red.png',
  'public/raftaar-shelves.png',
  'public/raftaar-aerial.jpg',
  'public/raftaar-exterior.jpg',
  'public/suratwala-hallway.jpg',
  'public/suratwala-workspace-wide.jpg',
  'public/suratwala-workspace.jpg',
  'public/suratwala-cabin-wide.jpg',
  'public/suratwala-cabin-close.jpg',
  'public/suratwala-straight-desk.jpg',
  'public/suratwala-kitchen.jpg'
];

async function processAll() {
  for (const imagePath of imagesToProcess) {
    if (!fs.existsSync(imagePath)) {
      console.log(`Skipping ${imagePath}`);
      continue;
    }
    const fileName = imagePath.split('/').pop();
    fs.copyFileSync(imagePath, `scratch/image_backups/${fileName}`);
    const metadata = await sharp(imagePath).metadata();
    
    if (metadata.width < 1200) {
      const outputFormat = imagePath.endsWith('.jpg') ? 'jpeg' : 'png';
      let pipeline = sharp(`scratch/image_backups/${fileName}`)
        .resize(Math.round(metadata.width * 2), Math.round(metadata.height * 2), {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain'
        })
        .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8, x1: 2, y2: 10, y3: 20 });
        
      if (outputFormat === 'jpeg') {
        pipeline = pipeline.jpeg({ quality: 90 });
      } else {
        pipeline = pipeline.png({ quality: 100 });
      }
      
      await pipeline.toFile(imagePath);
      console.log(`Upscaled: ${imagePath} to ${Math.round(metadata.width * 2)}px`);
    }
  }
}
processAll();
