#!/usr/bin/env node
/**
 * Configuration rapide du projet sur une autre machine (après clone).
 * - npm install
 * - Crée .env à partir de .env.example si absent, et demande les variables critiques
 *
 * Usage: npm run setup
 */

import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const rl = createInterface({ input: process.stdin, output: process.stdout });
function ask(question, defaultValue = '') {
  return new Promise((resolve) => {
    const suffix = defaultValue ? ` [${defaultValue}]` : '';
    rl.question(`${question}${suffix}: `, (answer) => {
      resolve((answer.trim() || defaultValue).trim());
    });
  });
}

function setEnvVar(content, key, value) {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(content)) {
    return content.replace(regex, `${key}=${value}`);
  }
  return content.trimEnd() + `\n${key}=${value}\n`;
}

async function main() {
  console.log('\n🔧 Setup Sitegrow Skeleton (autre machine)\n');

  // 1. npm install
  console.log('1. Installation des dépendances...');
  execSync('npm install', { cwd: projectRoot, stdio: 'inherit' });
  console.log('   OK.\n');

  // 2. .env
  const envPath = join(projectRoot, '.env');
  const examplePath = join(projectRoot, '.env.example');
  let envContent;
  if (!existsSync(envPath)) {
    if (existsSync(examplePath)) {
      copyFileSync(examplePath, envPath);
      envContent = readFileSync(envPath, 'utf-8');
      console.log('2. Fichier .env créé à partir de .env.example.');
    } else {
      envContent = '';
      writeFileSync(envPath, '', 'utf-8');
      console.log('2. Fichier .env créé (vide).');
    }
  } else {
    envContent = readFileSync(envPath, 'utf-8');
    console.log('2. .env existe déjà — va être mis à jour avec vos réponses.');
  }

  console.log('\nVariables de configuration (Entrée = garder la valeur actuelle):\n');

  const currentSiteUrl = (envContent.match(/^SITE_URL=(.*)$/m) || [])[1] || '';
  const currentDomain = (envContent.match(/^SITE_DOMAIN=(.*)$/m) || [])[1] || '';
  const currentEmail = (envContent.match(/^CONTACT_EMAIL=(.*)$/m) || [])[1] || '';
  const currentFormspree = (envContent.match(/^PUBLIC_FORMSPREE_ID=(.*)$/m) || [])[1] || '';

  const siteUrl = await ask('Site URL canonique (ex. https://exemple.com)', currentSiteUrl || 'https://exemple.com');
  const domain = await ask(
    'Domaine (sans protocole, ex. exemple.com)',
    currentDomain || siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  );
  const email = await ask('Courriel de contact', currentEmail || 'info@exemple.com');
  const formspree = await ask(
    'Formspree ID (vide pour désactiver le formulaire — voir README)',
    currentFormspree,
  );

  let updated = envContent;
  updated = setEnvVar(updated, 'SITE_URL', siteUrl);
  updated = setEnvVar(updated, 'SITE_DOMAIN', domain);
  updated = setEnvVar(updated, 'CONTACT_EMAIL', email);
  updated = setEnvVar(updated, 'PUBLIC_FORMSPREE_ID', formspree);
  writeFileSync(envPath, updated, 'utf-8');
  console.log('\n✓ .env mis à jour.\n');

  console.log('✅ Setup terminé.');
  console.log('\nProchaines étapes :');
  console.log('  npm run dev        # lancer le serveur de dev');
  console.log('  npm run check:all  # valider types + lint + format');
  console.log('  npm run build      # build de production\n');
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
