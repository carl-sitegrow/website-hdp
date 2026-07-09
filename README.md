# Ellea — Blog santé et bien-être féminin

Site Astro basé sur [Sitegrow Skeleton](https://github.com/Sitegrow-dev/website-skeleton), design Figma intégré pour **Ellea**.

## Stack

- Astro v7 + Tailwind v4 + Vercel
- Contenu : `src/config/site.ts` + `src/data/*`
- Images Figma optimisées dans `public/images/` (avif/webp)

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev   # http://localhost:4325
```

## Variables d'environnement

- `SITE_URL` — ex. `https://ellea.fr`
- `PUBLIC_FORMSPREE_ID` — formulaire contact
- `PUBLIC_NEWSLETTER_FORMSPREE_ID` — inscription newsletter

## Assets Figma

Pour régénérer les images depuis Figma :

```bash
node scripts/download-figma-assets.js
```

## Pages

- `/` — Accueil blog
- `/blog/` — Listing avec filtres et pagination
- `/blog/[slug]/` — Article
- `/contact/` — Contact
- `/politique-de-confidentialite/` — Mentions légales
