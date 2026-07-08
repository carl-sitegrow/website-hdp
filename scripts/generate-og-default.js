/**
 * Génère public/images/og-default.png (1200×630) — image de partage social par défaut.
 * SVG → PNG via Sharp. Aucune dépendance externe (police système).
 *
 * Usage: node scripts/generate-og-default.js
 * Recommandé : remplacer ce placeholder par une vraie image de marque avant publication.
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';
import { siteConfig } from '../src/config/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const outputDir = join(projectRoot, 'public', 'images');
const outputFile = join(outputDir, 'og-default.png');

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const siteName = siteConfig.siteName || 'Site';
const city = siteConfig.city || '';

// 1200×630, fond violet brand (#8A5CF6), texte blanc centré.
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8A5CF6"/>
      <stop offset="100%" stop-color="#7C4FE0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="84" font-weight="700"
        fill="white" text-anchor="middle" dominant-baseline="middle">${escapeXml(siteName)}</text>
  ${
    city
      ? `<text x="600" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="500"
        fill="rgba(255,255,255,0.85)" text-anchor="middle" dominant-baseline="middle">${escapeXml(city)}</text>`
      : ''
  }
  <text x="600" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500"
        fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="middle">Sitegrow Skeleton</text>
</svg>`;

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

await sharp(Buffer.from(svg)).png().toFile(outputFile);
console.log(`✓ OG default image generated: public/images/og-default.png (1200×630)`);
