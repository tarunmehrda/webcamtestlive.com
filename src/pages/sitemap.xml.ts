import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { LOCALES, DEFAULT_LOCALE, localePath, TRANSLATED_ROUTES } from '../i18n';

/** Pages excluded from the sitemap: error pages, which are noindex. */
const EXCLUDE = new Set(['404', '500']);

/** Relative importance, highest first. Anything unlisted falls back to 0.5. */
const PRIORITY: Record<string, number> = {
  '/': 1.0,
  '/resolution': 0.8,
  '/fps': 0.8,
  '/mic-test': 0.8,
  '/troubleshooting': 0.7,
  '/faq': 0.7,
  '/about': 0.5,
  '/contact': 0.4,
};

// Only the English page files. The per-locale index files (vi/index.astro …)
// are filtered out here and re-added below with their hreflang annotations, so
// each route is emitted once with its full alternate set rather than twice.
const LOCALE_PREFIXES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE).map((l) => `${l.code}/`);

const routes = Object.keys(import.meta.glob('./**/*.astro'))
  .map((file) => file.slice('./'.length).replace(/\.astro$/, ''))
  .filter((route) => !EXCLUDE.has(route))
  .filter((route) => !LOCALE_PREFIXES.some((p) => route.startsWith(p)))
  .map((route) => (route === 'index' ? '/' : `/${route.replace(/\/index$/, '')}`))
  .sort();

const xml_escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries: string[] = [];

  for (const route of routes) {
    const translated = TRANSLATED_ROUTES.includes(route);
    // Every locale that actually has this route gets its own <url> entry, and
    // each entry carries the full reciprocal alternate set: Google wants the
    // annotations on every URL in the group, not just the canonical one.
    const group = translated ? LOCALES.map((l) => l.code) : [DEFAULT_LOCALE];

    const alternates = translated
      ? LOCALES.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${xml_escape(
              new URL(localePath(l.code, route), SITE.url).href,
            )}"/>`,
        ).concat([
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${xml_escape(
            new URL(localePath(DEFAULT_LOCALE, route), SITE.url).href,
          )}"/>`,
        ])
      : [];

    for (const code of group) {
      // localePath, not a hand-built string: the sitemap <loc> must match the
      // page's own canonical exactly, and that is built the same way.
      const loc = xml_escape(new URL(localePath(code, route), SITE.url).href);
      entries.push(
        [
          '  <url>',
          `    <loc>${loc}</loc>`,
          ...alternates,
          `    <lastmod>${lastmod}</lastmod>`,
          `    <priority>${(PRIORITY[route] ?? 0.5).toFixed(1)}</priority>`,
          '  </url>',
        ].join('\n'),
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
