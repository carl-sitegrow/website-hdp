/**
 * Génère les images placeholder (logo + team) pour que le template soit
 * build-complet sans assets externes. SVG → AVIF + WebP via Sharp.
 *
 * Usage: node scripts/generate-placeholders.js
 * Recommandé : remplacer ces placeholders par de vrais visuels avant publication.
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

async function generateImage({ svg, outDir, slug, width, height }) {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const avif = join(outDir, `${slug}.avif`);
  const webp = join(outDir, `${slug}.webp`);
  await sharp(Buffer.from(svg)).resize(width, height).avif({ quality: 60 }).toFile(avif);
  await sharp(Buffer.from(svg)).resize(width, height).webp({ quality: 75 }).toFile(webp);
  console.log(`✓ ${slug}.avif + ${slug}.webp (${width}×${height})`);
}

const logoSvg = `<svg width="240" height="48" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="48" fill="#8A5CF6"/>
  <text x="120" y="30" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">SITEGROW</text>
</svg>`;

const memberSvg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#E5E7EB"/>
  <circle cx="200" cy="160" r="60" fill="#9CA3AF"/>
  <path d="M 90 360 Q 200 240 310 360 Z" fill="#9CA3AF"/>
</svg>`;

const serviceSvg = (label) => `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#F3F4F6"/>
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="#D1D5DB" stroke-width="2" stroke-dasharray="8 8"/>
  <text x="400" y="300" font-family="system-ui,-apple-system,sans-serif" font-size="36" font-weight="600" fill="#6B7280" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`;

await generateImage({
  svg: logoSvg,
  outDir: join(projectRoot, 'public', 'images', 'logo'),
  slug: 'logo',
  width: 240,
  height: 48,
});

await generateImage({
  svg: memberSvg,
  outDir: join(projectRoot, 'public', 'images', 'team'),
  slug: 'member-1',
  width: 400,
  height: 400,
});

for (const n of [1, 2, 3]) {
  await generateImage({
    svg: serviceSvg(`Service ${n}`),
    outDir: join(projectRoot, 'public', 'images', 'services'),
    slug: `service-${n}`,
    width: 800,
    height: 600,
  });
}

console.log('\nPlaceholders générés. Remplacez-les par vos visuels avant publication.');
