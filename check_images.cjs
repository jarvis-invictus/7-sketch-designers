const sharp = require('sharp');
const fs = require('fs');

const imagesToProcess = [
  'public/project-p14-1.jpg',
  'public/project-p14-2.jpg',
  'public/project-p14-3.jpg',
  'public/project-p14-4.jpg',
  'public/project-p14-5.jpg',
  'public/project-p14-6.jpg',
  'public/project-p14-7.jpg',
  'public/project-p14-8.jpg',
  'public/suratwala-hallway.jpg',
  'public/suratwala-workspace-wide.jpg',
  'public/suratwala-workspace.jpg',
  'public/suratwala-cabin-wide.jpg',
  'public/suratwala-cabin-close.jpg',
  'public/suratwala-straight-desk.jpg',
  'public/suratwala-kitchen.jpg'
];

async function check() {
  for (const p of imagesToProcess) {
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      console.log(`${p}: ${meta.width}x${meta.height}`);
    }
  }
}
check();
