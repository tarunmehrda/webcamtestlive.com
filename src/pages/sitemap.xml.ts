import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

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

const routes = Object.keys(import.meta.glob('./**/*.astro'))
  .map((file) => file.slice('./'.length).replace(/\.astro$/, ''))
  .filter((route) => !EXCLUDE.has(route))
  .map((route) => (route === 'index' ? '/' : `/${route.replace(/\/index$/, '')}`))
  .sort();

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = new URL(route === '/' ? '/' : `${route}/`, SITE.url).href;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <priority>${(PRIORITY[route] ?? 0.5).toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
