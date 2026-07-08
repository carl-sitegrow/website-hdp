import type { APIContext, MiddlewareHandler, MiddlewareNext } from 'astro';

/**
 * Vercel sert le fallback 404.html pour les URLs inconnues.
 * Pour les chemins /en/*, on réécrit la réponse avec la page /404/ (même URL canonique qu’en FR)
 * tout en conservant le statut 404. La langue EN est signalée via locals.notFoundLang.
 */
async function withLocalized404(context: APIContext, next: MiddlewareNext) {
  const response = await next();
  if (response.status !== 404) return response;

  const pathname = context.url.pathname;
  if (!pathname.startsWith('/en/')) return response;

  context.locals.notFoundLang = 'en';
  const rewritten = await context.rewrite('/404/');
  const headers = new Headers(rewritten.headers);
  headers.delete('content-length');

  return new Response(rewritten.body, {
    status: 404,
    statusText: 'Not Found',
    headers,
  });
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = context.url;
  const pathname = url.pathname;

  // /fr/* → /* (l'ancien préfixe de locale n'existe plus depuis prefixDefaultLocale: false)
  if (pathname === '/fr' || pathname === '/fr/') {
    return context.redirect('/', 301);
  }
  if (pathname.startsWith('/fr/')) {
    const target = pathname.replace(/^\/fr/, '') || '/';
    const targetWithSlash = target.endsWith('/') || target.includes('.') ? target : `${target}/`;
    const redirectUrl = new URL(targetWithSlash, url.origin);
    // Préserve la query string
    redirectUrl.search = url.search;
    return context.redirect(redirectUrl.toString(), 301);
  }

  // /sitemap → sitemap.xml (indexation), redirections permanentes en 301
  if (pathname === '/sitemap' || pathname === '/sitemap/') {
    return context.redirect('/sitemap.xml', 301);
  }

  if (pathname === '/sitemap.html' || pathname === '/sitemap.html/') {
    return context.redirect('/plan-du-site/', 301);
  }
  if (pathname === '/en/sitemap' || pathname === '/en/sitemap/') {
    return context.redirect('/en/plan-du-site/', 301);
  }
  if (pathname === '/en/404' || pathname === '/en/404/') {
    return context.redirect('/404/', 301);
  }

  // Endpoints *.xml / *.txt : la route Astro correspond au nom de fichier
  // (sans slash final). On laisse le routeur Astro les servir directement.
  // Pas de réécriture middleware pour éviter les boucles / incompatibilités v7.

  if (pathname.startsWith('/api/') || pathname.startsWith('/_')) {
    return next();
  }

  if (pathname === '/' || pathname.endsWith('/') || pathname.includes('.')) {
    return withLocalized404(context, next);
  }

  // Ajoute un slash final (trailingSlash: 'always') pour les routes HTML.
  const redirectUrl = new URL(url);
  redirectUrl.pathname = `${pathname}/`;

  return new Response(null, {
    status: 301,
    headers: {
      Location: redirectUrl.toString(),
    },
  });
};
