import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { LOCALES, DEFAULT_LOCALE, localePath, TRANSLATED_ROUTES } from '../i18n';
import { pageDates, isoDay } from '../lib/dates';

/** Pages excluded from the sitemap: error pages, which are noindex. */
const EXCLUDE = new Set(['404', '500']);

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
  const entries: string[] = [];

  for (const route of routes) {
    const translated = TRANSLATED_ROUTES.includes(route);
    // Every locale that actually has this route gets its own <url> entry, and
    // each entry carries the full reciprocal alternate set: Google wants the
    // annotations on every URL in the group, not just the canonical one.
    const group = translated ? LOCALES.map((l) => l.code) : [DEFAULT_LOCALE];

    // The last commit that changed this route's content, not the build date:
    // Google only trusts <lastmod> when it moves with real changes. There is
    // no <priority> or <changefreq> because Google ignores both.
    const lastmod = isoDay(pageDates(route).modified);

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
