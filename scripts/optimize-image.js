/**
 * Optimise une image en WebP + AVIF, en plusieurs largeurs (images responsives).
 *
 * Usage: node scripts/optimize-image.js [source] [dossier-sortie] [nom-sortie]
 *
 * Exemple:
 *   node scripts/optimize-image.js ./photo.jpg public/images/blog mon-slug
 *
 * Produit, pour chaque largeur < largeur source (voir WIDTHS) :
 *   nom-sortie-400.avif / .webp, nom-sortie-800.avif / .webp, …
 * plus une version pleine taille nom-sortie.avif / .webp (repli).
 * Le composant <ResponsiveImage> assemble automatiquement le srcset/sizes.
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join, basename, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/** Largeurs générées pour le srcset (bornées à la largeur de la source). */
const WIDTHS = [400, 800, 1200, 1600];
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 75;

async function encode(image, outPath, width) {
  const pipeline = width ? image.clone().resize({ width }) : image.clone();
  if (outPath.endsWith('.webp')) {
    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
  } else {
    await pipeline.avif({ quality: AVIF_QUALITY }).toFile(outPath);
  }
}

async function optimizeImage(inputPath, outputDir = null, outputName = null) {
  if (!existsSync(inputPath)) {
    console.error(`❌ Fichier introuvable: ${inputPath}`);
    process.exit(1);
  }

  let finalOutputDir;
  if (outputDir) {
    finalOutputDir = outputDir.startsWith('/') ? outputDir : join(projectRoot, outputDir);
  } else {
    finalOutputDir = dirname(inputPath);
  }
  if (!existsSync(finalOutputDir)) {
    mkdirSync(finalOutputDir, { recursive: true });
  }

  const baseName = outputName || basename(inputPath, extname(inputPath));

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log(`🔄 ${basename(inputPath)} — source ${metadata.width}x${metadata.height}\n`);

    // Largeurs à générer : celles strictement plus petites que la source.
    const targetWidths = WIDTHS.filter((w) => w < metadata.width);

    // Variantes responsives (nom-<w>.ext).
    for (const w of targetWidths) {
      for (const ext of ['avif', 'webp']) {
        const out = join(finalOutputDir, `${baseName}-${w}.${ext}`);
        if (existsSync(out)) {
          console.log(`ℹ️  existe: ${baseName}-${w}.${ext}`);
          continue;
        }
        await encode(image, out, w);
        console.log(`✅ ${baseName}-${w}.${ext}`);
      }
    }

    // Version pleine taille (repli / plus grand descripteur).
    for (const ext of ['avif', 'webp']) {
      const out = join(finalOutputDir, `${baseName}.${ext}`);
      if (existsSync(out)) {
        console.log(`ℹ️  existe: ${baseName}.${ext}`);
        continue;
      }
      await encode(image, out, null);
      console.log(`✅ ${baseName}.${ext}`);
    }

    console.log(`\n✨ Terminé dans: ${finalOutputDir}`);
  } catch (error) {
    console.error("❌ Erreur lors de l'optimisation:", error.message);
    process.exit(1);
  }
}

const inputPath = process.argv[2];
const outputDir = process.argv[3];
const outputName = process.argv[4];

if (!inputPath) {
  console.log("📝 Optimisation d'image responsive (WebP + AVIF, multi-largeurs)\n");
  console.log('Usage: node scripts/optimize-image.js [source] [dossier-sortie] [nom-sortie]');
  console.log('\nExemple:');
  console.log('  node scripts/optimize-image.js ./photo.jpg public/images/blog mon-slug');
  process.exit(0);
}

const fullInputPath = inputPath.startsWith('/') ? inputPath : join(process.cwd(), inputPath);
optimizeImage(fullInputPath, outputDir, outputName);
