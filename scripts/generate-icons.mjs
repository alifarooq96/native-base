#!/usr/bin/env node
/**
 * Generates favicon.ico and PNG icons from app/icon.svg for SEO and PWA.
 * Run: node scripts/generate-icons.mjs
 * Requires: npm install sharp to-ico (devDependencies)
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const svgPath = join(root, 'app', 'icon.svg');

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const icoSizes = [16, 32];

async function main() {
  let sharp, toIco;
  try {
    sharp = (await import('sharp')).default;
    toIco = (await import('to-ico')).default;
  } catch (e) {
    console.error('Missing dependencies. Run: npm install sharp to-ico --save-dev');
    process.exit(1);
  }

  if (!existsSync(svgPath)) {
    console.error('app/icon.svg not found');
    process.exit(1);
  }

  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

  const svg = readFileSync(svgPath);

  console.log('Generating PNGs and ICO from app/icon.svg...');

  const pngBuffers = {};
  for (const size of sizes) {
    const buf = await sharp(svg).resize(size, size).png().toBuffer();
    pngBuffers[size] = buf;
    const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
    writeFileSync(join(publicDir, name), buf);
    console.log('  wrote', name);
  }

  const icoBuffers = icoSizes.map((s) => pngBuffers[s]);
  const ico = await toIco(icoBuffers);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);
  console.log('  wrote favicon.ico');

  console.log('Done. Icons are in public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
