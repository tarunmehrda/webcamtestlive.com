import { execSync } from 'node:child_process';

/**
 * Per-route content dates, read from git at build time.
 *
 * Google only honours a sitemap <lastmod> (and a WebPage dateModified) when it
 * reflects a real content change, so each route's date is the last commit that
 * touched the files it is rendered from, not the time of the build. A page
 * whose copy has not changed keeps its old date across deploys, which is what
 * makes the signal worth trusting.
 */

/**
 * Files, relative to the repo root, whose history defines each route's dates.
 * The first entry is the page file itself and supplies the published date.
 */
const ROUTE_SOURCES: Record<string, string[]> = {
  '/': [
    'src/pages/index.astro',
    'src/components/pages/HomePage.astro',
    'src/components/content/HomeGuide.astro',
    'src/i18n/locales',
    'src/data/faqs.ts',
  ],
  '/resolution': ['src/pages/resolution.astro', 'src/data/faqs.ts'],
  '/fps': ['src/pages/fps.astro', 'src/data/faqs.ts'],
  '/mic-test': ['src/pages/mic-test.astro', 'src/data/faqs.ts'],
  '/troubleshooting': ['src/pages/troubleshooting.astro', 'src/data/faqs.ts'],
  '/faq': ['src/pages/faq.astro', 'src/data/faq-page.ts'],
  '/about': ['src/pages/about.astro'],
  '/contact': ['src/pages/contact.astro'],
  '/privacy': ['src/pages/privacy.astro'],
  '/terms': ['src/pages/terms.astro'],
};

export interface PageDates {
  /** ISO 8601 with offset, e.g. 2026-08-21T18:59:51+05:30. */
  published: string;
  modified: string;
}

// Fallback when git is unavailable (a checkout without history, a CI runner
// that shallow-clones). Wrong in the safe direction: a fresh date is at worst
// a weak signal, a stale one would hide real changes.
const BUILD_TIME = new Date().toISOString();
const cache = new Map<string, PageDates>();

function git(args: string): string {
  try {
    return execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

export function pageDates(routeKey: string): PageDates {
  const hit = cache.get(routeKey);
  if (hit) return hit;

  const sources = ROUTE_SOURCES[routeKey] ?? ['src'];
  const quoted = sources.map((s) => `"${s}"`).join(' ');
  const modified = git(`log -1 --format=%cI -- ${quoted}`) || BUILD_TIME;
  // The log is newest-first, so the last line is the commit that first added
  // the page file.
  const added = git(`log --diff-filter=A --format=%cI -- "${sources[0]}"`)
    .split('\n')
    .filter(Boolean);
  const published = added[added.length - 1] || modified;

  const dates = { published, modified };
  cache.set(routeKey, dates);
  return dates;
}

/** YYYY-MM-DD, the form the sitemap uses. */
export function isoDay(iso: string): string {
  return iso.slice(0, 10);
}

/** "10 September 2026", for the visible "Last updated" line. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
