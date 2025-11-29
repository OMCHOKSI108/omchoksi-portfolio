/**
 * copy_default_image.js
 *
 * Copies the repository `docs/image.png` into `backend/public/docs/image.png`
 * so that Next.js can serve the image at `/docs/image.png` during development.
 *
 * Usage (PowerShell):
 *   node .\copy_default_image.js
 */

const fs = require('fs');
const path = require('path');

const repoImage = path.resolve(__dirname, '..', '..', 'docs', 'image.png');
const targetDir = path.resolve(__dirname, '..', 'public', 'docs');
const targetImage = path.join(targetDir, 'image.png');

async function main() {
  if (!fs.existsSync(repoImage)) {
    console.error('Source image not found at', repoImage);
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(repoImage, targetImage);
  console.log('Copied', repoImage, '->', targetImage);
}

main();
