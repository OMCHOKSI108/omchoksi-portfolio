/**
 * copy_default_image.js
 * Copies the default image from the repo `docs/image.png` into the Next `public/docs` folder
 * so it can be served at `/docs/image.png` by Next.js. Run from the `backend` folder:
 *
 *   node .\copy_default_image.js
 */

const fs = require('fs');
const path = require('path');

const repoDocs = path.join(__dirname, '..', 'docs', 'image.png');
const publicDir = path.join(__dirname, 'public', 'docs');
const dest = path.join(publicDir, 'image.png');

try {
  if (!fs.existsSync(repoDocs)) {
    console.error('Source image not found at', repoDocs);
    process.exit(1);
  }

  fs.mkdirSync(publicDir, { recursive: true });
  fs.copyFileSync(repoDocs, dest);
  console.log('Copied', repoDocs, '->', dest);
} catch (err) {
  console.error('Failed to copy image:', err.message || err);
  process.exit(1);
}
