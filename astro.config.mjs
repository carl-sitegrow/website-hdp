import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

import { unified } from '@astrojs/markdown-remark';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from './rehype-external-links.js';
import externalLinksIntegration from './astro-external-links.js';

import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config/site.ts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// SITE_URL env (Vercel / .env) prioritaire ; sinon siteConfig.url.
// Évite un build raté si la variable n’est pas encore définie sur Vercel.
const siteUrl = process.env.SITE_URL || siteConfig.url;

// Anti-oubli : refuse le build si l’URL reste le placeholder du skeleton.
if (
  process.argv[1]?.includes('astro') &&
  process.argv[2] === 'build' &&
  (!siteUrl || siteUrl.includes('exemple.com'))
) {
  throw new Error(
    '[astro.config] SITE_URL manquant ou placeholder. Définissez SITE_URL (ex. https://ellea.fr) ou mettez à jour siteConfig.url.'
  );
}

export default defineConfig({
  site: siteUrl,
  // Astro v5+ : 'hybrid' a fusionné avec 'static'. Les routes dynamiques
  // (middleware, /rss.xml, etc.) fonctionnent toujours via l'adaptateur.
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  compressHTML: 'jsx',
  build: {
    /** Réduit les feuilles externes bloquantes quand le CSS reste sous le seuil */
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug, rehypeExternalLinks],
    }),
  },
  server: {
    port: parseInt(process.env.PORT || '4325', 10),
    host: true,
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  env: {
    schema: {
      // Variables publiques (exposées au client)
      PUBLIC_FORMSPREE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_NEWSLETTER_FORMSPREE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      // Variables serveur publiques (pas de secret, mais inutiles côté client)
      SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        url: true,
      }),
      SITE_DOMAIN: envField.string({ context: 'server', access: 'public', optional: true }),
      CONTACT_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      // Optionnel : serveur de dev
      PORT: envField.number({ context: 'server', access: 'public', optional: true, default: 4325 }),
      DEV_HTTPS: envField.boolean({ context: 'server', access: 'public', optional: true }),
    },
  },
  integrations: [externalLinksIntegration()],
  vite: {
    plugins: [tailwindcss(), process.env.DEV_HTTPS === 'true' ? basicSsl() : []],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@layouts': resolve(__dirname, './src/layouts'),
      },
    },
  },
});
