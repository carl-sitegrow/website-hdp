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

// Canonical URL : env SITE_URL prioritaire, sinon siteConfig.url (évite un build
// Vercel cassé quand les variables d’environnement n’ont pas encore été saisies).
const siteUrl = process.env.SITE_URL || siteConfig.url;

if (process.argv[1]?.includes('astro') && process.argv[2] === 'build' && !process.env.SITE_URL) {
  console.warn(
    `[astro.config] SITE_URL non défini — fallback sur siteConfig.url (${siteConfig.url}). Définissez SITE_URL sur Vercel pour forcer le domaine.`
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
    server: {
      // Lets the dev server be previewed through code-server's port-forwarding
      // (which proxies with a codecarl.sitegrow.ca Host header) without Vite's
      // Host-header check rejecting the request.
      allowedHosts: ['.sitegrow.ca'],
    },
  },
});
