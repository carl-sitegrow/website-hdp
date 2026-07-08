# Sitegrow Skeleton

**Sitegrow Skeleton** est un gabarit Astro bilingue (FR / EN) réutilisable, conçu
pour démarrer rapidement un site marketing multi-pages. Propulsé par **Astro v7 +
Tailwind v4 + Vercel**.

Tout le contenu vit dans `src/config/site.ts` et `src/data/*.ts` — aucune donnée
n’est hardcodée dans les composants `.astro`.

- Racine (`/`) : français
- `/en/` : miroir anglais (actuellement `noindex` en attendant la traduction du contenu)

## Stack

- **Astro v7** (`output: 'static'`, adaptateur Vercel, Sätteri + remark/rehype)
- **Tailwind v4** via `@tailwindcss/vite` (syntaxe CSS `@theme`)
- **Sharp** pour l’optimisation d’images (pipeline `.avif` + `.webp`)
- **TypeScript** + **Zod** pour valider `siteConfig` au build
- Node ≥ 20, dev sur port 4325

## Démarrage rapide

```bash
npm install
cp .env.example .env      # puis éditer SITE_URL, CONTACT_EMAIL…
npm run setup             # optionnel : aide à configurer une autre machine
npm run dev               # http://localhost:4325
```

## Formulaire de contact (Formspree)

Le formulaire sur `/contact/` est branché sur [Formspree](https://formspree.io) et
fonctionne sans backend à maintenir.

### Configuration

1. Créez un formulaire gratuit sur <https://formspree.io/forms> (le plan gratuit
   autorise 50 soumissions/mois).
2. Copiez l’ID du formulaire — le dernier segment de l’URL d’endpoint, par
   exemple `xxxxx` dans `https://formspree.io/f/xxxxx`.
3. Définissez `PUBLIC_FORMSPREE_ID=xxxxx` dans votre fichier `.env`
   (ou dans les variables d’environnement Vercel en production).

C’est tout — le formulaire fonctionne automatiquement en dev et en prod.

### Comportement

- **Soumission asynchrone** (`fetch` + JSON) — l’utilisateur reste sur la page.
- **État visuel** : bouton « Envoi… » désactivé pendant la requête, puis message
  de succès avec option « Envoyer un autre message ». Les erreurs réseau et de
  validation (champ par champ) sont affichées en clair.
- **Anti-spam** : le filtre Formspree est activé par défaut. Le champ caché
  `_captcha=false` désactive le captcha visible côté utilisateur.
- **Sujet d’email** : `_subject` est pré-rempli avec
  `Nouveau message : <siteName>` — modifiable dans `ContactSection.astro`.
- **Sujet du message** : le menu déroulant « Sujet » mappe vers un champ `topic`
  libre — adaptez les options dans `src/data/contact.ts`.
- **ID manquant** : si `PUBLIC_FORMSPREE_ID` est vide, le formulaire est remplacé
  par un avertissement de configuration + un lien `mailto:` vers
  `siteConfig.contactEmail`.

### Personnalisation avancée

- **Rediriger vers une page de remerciement dédiée** : ajoutez un champ caché
  `<input type="hidden" name="_next" value="/merci/" />` et créez la page.
- **Recevoir les soumissions en JSON via webhook** : voir la doc
  <https://help.formspree.io/>.

## Personnalisation

### 1. Contenu maître — `src/config/site.ts`

C’est le point d’entrée : `siteName`, `city`, `region`, `domain`, `url`,
`defaultDescription`, `contactEmail`, `phone`, `logo`, `twitterHandle`,
`address` (structuré),
`businessType` (`'Organization'` par défaut, `'LocalBusiness'` pour activer le SEO local),
`openingHours`, `geo`, `social`, `nav`, `navCta`, `footer`. Ces valeurs alimentent
le header, le footer, le SEO et les JSON-LD — ne pas les recopier dans les `.astro`.

> **`logo`** : chemin du logo (ex. `/images/logo/logo.png`) utilisé comme
> `publisher.logo` dans les JSON-LD. Vide = repli sur l’image OG par défaut.
> **`twitterHandle`** : handle X/Twitter avec `@` pour les Twitter Cards.
> **`defaultDescription`** est validée au build : entre 50 et 160 caractères.
> **`enIndexable`** (défaut `false`) : tant qu’il est `false`, le miroir `/en/*`
> est `noindex` et exclu du hreflang + du sitemap (évite d’indexer du contenu FR
> sous des URLs EN). Passer à `true` une fois `src/data/*` traduit.
> **`allowAiCrawlers`** (défaut `true`) : politique des crawlers IA dans `robots.txt`.

> Par défaut, `siteName` vaut `'Sitegrow Skeleton'` (placeholder du gabarit).
> Remplacez-le par la marque du client avant publication.

### 2. Données éditoriales — `src/data/*.ts`

| Fichier           | Rôle                                                |
| ----------------- | --------------------------------------------------- |
| `home.ts`         | Hero + section « features » de l’accueil            |
| `about.ts`        | Page À propos (intro, valeurs, équipe, CTA)         |
| `contact.ts`      | Page Contact (blocs, sujets, libellés du formulaire) |
| `services.ts`     | Liste de services + étapes du processus             |
| `posts.ts`        | Articles de blog (vide par défaut)                  |
| `privacy.ts`      | Politique de confidentialité (gabarit Loi 25)       |

Pour ajouter un article : ouvrez `posts.ts` et ajoutez une entrée dans `posts[]`
(voir le type `Post`). Le sitemap, le flux RSS et la page `/blog/` se mettent à
jour automatiquement.

### 3. Images — `public/images/`

Dossiers prêts : `blog/`, `logo/`, `services/`, `team/`, `home/`, `contact/`,
`carousel/`, `testimonials/`, `about/`.

Workflow obligatoire (voir `.cursor/rules/images-workflow.mdc`) :

```bash
node scripts/optimize-image.js "<source>" "public/images/<sous-dossier>" "<slug-seo>"
# Produit des images RESPONSIVES : slug.avif/.webp (pleine taille) + slug-400,
# slug-800, slug-1200, slug-1600 selon la largeur source.
```

Pour afficher une image responsive, utiliser le composant `ResponsiveImage`
(assemble automatiquement `<picture>` + `srcset`/`sizes`, détecte les variantes
générées, anti-CLS via `width`/`height`) :

```astro
<ResponsiveImage src="/images/services/service-1" alt="…" width={800} height={600}
  sizes="(min-width: 1024px) 640px, 100vw" class="w-full h-auto aspect-[4/3] object-cover" />
```

Pour le logo :

```bash
npm run optimize-logo -- ./logo-source.png
# → public/images/logo/logo.avif et .webp
```

### 4. Variables d’environnement — `.env`

Voir `.env.example`. Minimum : `SITE_URL`, `SITE_DOMAIN`, `CONTACT_EMAIL`.

## Scripts NPM

| Script             | Rôle                                                          |
| ------------------ | ------------------------------------------------------------- |
| `dev`              | Serveur dev (port 4325)                                       |
| `build`            | Valide `siteConfig` (Zod) → build Astro → fix runtime Vercel |
| `check`            | `astro check` (types TS)                                      |
| `check:all`        | `astro check` + Prettier + ESLint                             |
| `lint`             | ESLint (flat config)                                          |
| `lint:fix`         | ESLint avec `--fix`                                           |
| `format`           | Prettier `--write .`                                          |
| `format:check`     | Prettier `--check .`                                          |
| `check:links`      | `linkinator dist/` (après `npm run build`) — vérifie les liens morts |
| `validate`         | Valide uniquement `siteConfig`                                |
| `optimize-logo`    | Logo → AVIF + WebP                                            |
| `new-post`         | Crée un squelette d’article (`src/content/blog/`)             |
| `add-post`         | Ajoute un article depuis un `.md` (image Unsplash incluse)    |
| `setup`            | Aide à configurer le projet sur une nouvelle machine          |

## Structure

```
src/
├── components/      # Composants Astro (home/, post/, services/, + génériques)
├── config/          # site.ts + siteConfigZod.ts (validation Zod)
├── data/            # home, about, contact, services, posts, privacy
├── layouts/         # PageLayout (principal), PostLayout, BlogPostAmpLayout
├── lib/             # breadcrumb.ts, schema.ts (JSON-LD), rss.ts (feed builder)
├── pages/           # FR à la racine, EN sous /en/
├── styles/          # global.css
└── middleware.ts    # trailing slash, sitemap/robots/rss, 404 localisée EN
```

## SEO inclus

- `sitemap.xml`, `robots.txt`, `rss.xml` (FR) + `/en/rss.xml` (EN, vide tant que pas de posts EN)
- JSON-LD en `@graph` relié par `@id` (voir `src/lib/schema.ts`) :
  - Accueil : `Organization`/`LocalBusiness` (avec `logo`) + `WebSite` + `WebPage`
  - Posts : `Article` (avec `datePublished` / `dateModified`) + `WebPage`, rattachés au publisher
  - Services : un nœud `Service` par prestation + `FAQPage` optionnel (`servicesContent.faq`)
  - `BreadcrumbList` sur toutes les pages à fil d’Ariane (émis par `Breadcrumb.astro`)
  - Helpers réutilisables : `buildFaqSchema`, `buildServicesGraph`, `buildArticleGraph`
- Canonical, Open Graph complet (`og:image:width/height/alt/type`, `og:locale:alternate`),
  Twitter Card (`twitter:site`/`creator` via `twitterHandle`), `hreflang`
  (fr-CA / en-CA / x-default) via `SeoHead.astro`
- Directive `robots` par défaut `index, follow, max-image-preview:large, …`
  (aperçus riches) — surcharger avec la prop `robots` pour désindexer une page
- Helpers SEO centralisés dans `src/lib/seo.ts` (`formatTitle`, `absoluteUrl`,
  `OG_IMAGE`, `DEFAULT_ROBOTS`)

### Performance (Core Web Vitals)

- **Images responsives** : `<ResponsiveImage>` + `optimize-image.js` multi-largeurs
  (`srcset`/`sizes`, AVIF+WebP, `width`/`height` anti-CLS)
- **Police auto-hébergée** : Inter Variable (`public/fonts/`, sous-ensembles latin +
  latin-ext) avec `<link rel="preload">` du sous-ensemble latin → LCP texte plus rapide
- **`lastmod` du sitemap dérivé de git** (`src/lib/git-lastmod.ts`) : date de commit
  réelle, jamais la date de build (évite le faux signal de fraîcheur). Omis proprement
  hors dépôt git.
- Liens externes : `target="_blank"` + `rel="nofollow noopener"` automatiques
  (rehype + integration `astro-external-links.js`)
- `trailingSlash: 'always'` (301 vers la version avec slash)
- AMP sur les posts FR (`/blog/<slug>/amp/`) — layout dédié respectant la spec AMP

## GEO / optimisation pour les LLM

Le gabarit est pensé pour être **compris et cité par les moteurs génératifs**
(ChatGPT, Claude, Perplexity, Gemini) :

- **`/llms.txt`** — index Markdown lisible par les LLM (spec [llmstxt.org](https://llmstxt.org)) :
  résumé du site + liens curés vers les pages et articles clés. Généré depuis
  `src/config` + `src/data` (`src/pages/llms.txt.ts`).
- **`/llms-full.txt`** — tout le contenu du site (pages clés + articles complets)
  en un seul Markdown, pour ingestion directe (`src/pages/llms-full.txt.ts`).
- **`robots.txt`** — politique **explicite** pour les crawlers IA (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended…). Le flag
  `siteConfig.allowAiCrawlers` (défaut `true`) bascule entre `Allow: /` (visibilité
  GEO maximale) et `Disallow: /`. Liste des robots dans `src/lib/ai-crawlers.ts`.
- **JSON-LD `@graph`** relié par `@id` + **FAQPage** : donne aux LLM une structure
  d'entités claire (marque, pages, auteurs, dates).

> Pour bloquer l'IA sur un projet (ex. contenu sensible), passer
> `allowAiCrawlers: false` dans `src/config/site.ts`.

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub
2. Importer dans Vercel — le `vercel.json` et l’adaptateur `@astrojs/vercel`
   sont déjà configurés
3. Définir les variables d’environnement (`SITE_URL`, `CONTACT_EMAIL`, etc.)
4. Le build Vercel lance automatiquement `npm run build`

## Avant de mettre en production

- [ ] Remplacer `siteName: 'Sitegrow Skeleton'` par la marque du client
- [ ] Remplir `src/config/site.ts` (ville, courriel, réseaux, `businessType`, etc.)
- [ ] Définir `logo` (publisher JSON-LD) et `twitterHandle` dans `src/config/site.ts`
- [ ] Générer une vraie image OG 1200×630 (`public/images/og-default.png`)
- [ ] Traduire `src/data/*` en anglais puis passer `enIndexable: true` dans
      `src/config/site.ts` (par défaut `/en/*` est `noindex` + hors hreflang/sitemap)
- [ ] Vérifier `/llms.txt` et `/llms-full.txt` après avoir rempli le contenu
- [ ] Choisir la politique IA : `allowAiCrawlers` dans `src/config/site.ts` (défaut : autorisé)
- [ ] Remplir `src/data/*.ts` avec le vrai contenu
- [ ] Ajouter un logo via `npm run optimize-logo`
- [ ] Régénérer les favicons (`favicon.svg`, `favicon.ico`, `android-chrome-*`, etc.)
- [ ] Configurer `PUBLIC_FORMSPREE_ID` dans `.env` (voir section « Formulaire de contact »)
- [ ] Faire valider `privacy.ts` par un conseiller juridique
- [ ] Définir `SITE_URL` et `SITE_DOMAIN` dans `.env` (le build échoue en prod si `SITE_URL` est absent)
- [ ] Lancer `npm run check:all` (types + lint + format) — doit passer à 0 erreur
- [ ] Lancer `npm run build && npm run check:links` pour vérifier les liens morts

---

Maintenu par **Sitegrow**.
