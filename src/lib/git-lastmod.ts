import { execSync } from 'node:child_process';

/**
 * Date de dernière modification RÉELLE d'un ensemble de fichiers, dérivée de
 * l'historique git (date du dernier commit qui les a touchés).
 *
 * Pourquoi git et pas le mtime : sur un CI (Vercel), un `git clone` réinitialise
 * le mtime de tous les fichiers à l'instant du build → « tout modifié aujourd'hui »
 * (faux signal). La date de commit git, elle, est stable et véridique.
 *
 * Dégradation propre : si git est indisponible (ex. copie hors dépôt), renvoie
 * `undefined` → l'appelant omet simplement <lastmod> (pas de faux signal).
 *
 * @returns la date ISO (YYYY-MM-DD) la plus récente parmi les fichiers, ou undefined.
 */
export function gitLastmod(files: string[]): string | undefined {
  let latest: string | undefined;

  for (const file of files) {
    try {
      const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();

      if (!iso) continue;
      const date = iso.split('T')[0];
      if (!latest || date > latest) latest = date;
    } catch {
      // git absent ou fichier hors dépôt → on ignore ce fichier.
    }
  }

  return latest;
}
