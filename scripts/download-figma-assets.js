/**
 * Télécharge et optimise toutes les images du manifeste Figma.
 * Usage: node scripts/download-figma-assets.js
 */
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const cacheDir = join(__dirname, '.figma-cache');
const manifest = JSON.parse(readFileSync(join(__dirname, 'figma-assets-manifest.json'), 'utf8'));

const allAssets = [...manifest.heroes, ...manifest.blog, ...manifest.authors, ...manifest.icons];

mkdirSync(cacheDir, { recursive: true });

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  return dest;
}

async function optimizeIcon(inputPath, outputDir, outputName) {
  mkdirSync(outputDir, { recursive: true });
  const outPng = join(outputDir, `${outputName}.png`);
  const outWebp = join(outputDir, `${outputName}.webp`);
  await sharp(inputPath).png().toFile(outPng);
  await sharp(inputPath).webp({ quality: 90 }).toFile(outWebp);
  console.log(`✅ icon ${outputName}.png + .webp`);
}

async function optimizeAuthor(inputPath, outputDir, outputName) {
  mkdirSync(outputDir, { recursive: true });
  const sizes = [48, 96, 200];
  for (const size of sizes) {
    for (const ext of ['webp', 'avif']) {
      const out = join(outputDir, `${outputName}-${size}.${ext}`);
      const pipeline = sharp(inputPath).resize({ width: size, height: size, fit: 'cover' });
      if (ext === 'webp') await pipeline.webp({ quality: 85 }).toFile(out);
      else await pipeline.avif({ quality: 75 }).toFile(out);
    }
  }
  const baseWebp = join(outputDir, `${outputName}.webp`);
  const baseAvif = join(outputDir, `${outputName}.avif`);
  await sharp(inputPath).resize({ width: 200, height: 200, fit: 'cover' }).webp({ quality: 85 }).toFile(baseWebp);
  await sharp(inputPath).resize({ width: 200, height: 200, fit: 'cover' }).avif({ quality: 75 }).toFile(baseAvif);
  console.log(`✅ author ${outputName}`);
}

async function main() {
  console.log(`📦 ${allAssets.length} assets Figma à télécharger\n`);

  for (const asset of allAssets) {
    const cachePath = join(cacheDir, `${asset.id}.bin`);
    const outputDir = join(projectRoot, asset.outputDir);

    try {
      if (!existsSync(cachePath)) {
        console.log(`⬇️  ${asset.id}`);
        await download(asset.url, cachePath);
      } else {
        console.log(`ℹ️  cache: ${asset.id}`);
      }

      if (asset.responsive) {
        execSync(
          `node scripts/optimize-image.js "${cachePath}" "${asset.outputDir}" "${asset.outputName}"`,
          { cwd: projectRoot, stdio: 'inherit' },
        );
      } else if (asset.outputDir.includes('icons')) {
        await optimizeIcon(cachePath, outputDir, asset.outputName);
      } else {
        await optimizeAuthor(cachePath, outputDir, asset.outputName);
      }
    } catch (err) {
      console.error(`❌ ${asset.id}:`, err.message);
      process.exit(1);
    }
  }

  const ogSource = join(cacheDir, 'hero-home.bin');
  if (existsSync(ogSource)) {
    execSync(`node scripts/optimize-image.js "${ogSource}" "public/images" "og-default"`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
  }

  console.log('\n✨ Tous les assets Figma sont prêts.');
}

main();
