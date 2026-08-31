/**
 * Locale registry.
 *
 * `code` is both the Astro locale and the URL segment (English has none).
 * `hreflang` is what goes in <link rel="alternate"> and <html lang>. It is not
 * always the same as the URL segment: the path is lowercase `pt-br` because URLs
 * are case-insensitive and lowercase is conventional, while the hreflang value
 * is the properly cased BCP 47 tag `pt-BR`.
 */
export const LOCALES = [
  {
    code: 'en',
    hreflang: 'en',
    /** Shown in the language switcher, in the language itself. */
    label: 'English',
    dir: 'ltr',
  },
  {
    code: 'vi',
    hreflang: 'vi',
    label: 'Tiếng Việt',
    dir: 'ltr',
  },
  {
    code: 'pt-br',
    hreflang: 'pt-BR',
    label: 'Português (BR)',
    dir: 'ltr',
  },
  {
    code: 'ru',
    hreflang: 'ru',
    label: 'Русский',
    dir: 'ltr',
  },
  {
    code: 'id',
    hreflang: 'id',
    label: 'Bahasa Indonesia',
    dir: 'ltr',
  },
  {
    code: 'hi',
    hreflang: 'hi',
    label: 'हिन्दी',
    dir: 'ltr',
  },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

/** Every locale except the default: these are the ones that get a URL prefix. */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);

export const LOCALE_CODES = LOCALES.map((l) => l.code) as readonly Locale[];

export function localeMeta(code: Locale) {
  const found = LOCALES.find((l) => l.code === code);
  if (!found) throw new Error(`Unknown locale: ${code}`);
  return found;
}

/**
 * Build a path for a locale. The default locale is unprefixed, so
 * ('en', '/fps') -> '/fps' and ('vi', '/fps') -> '/vi/fps'.
 */
export function localePath(code: Locale, path = '/'): string {
  const clean = '/' + path.replace(/^\/+|\/+$/g, '');
  const base = code === DEFAULT_LOCALE ? '' : `/${code}`;
  const joined = `${base}${clean}`;
  // Collapse the root case: '/vi/' -> '/vi', '' -> '/'
  return joined === '' ? '/' : joined.replace(/\/$/, '') || '/';
}

/**
 * Read the locale out of a pathname. Returns the default locale when the first
 * segment is not a known prefixed locale.
 */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  const hit = PREFIXED_LOCALES.find((l) => l.code === seg);
  return hit ? hit.code : DEFAULT_LOCALE;
}

/** Strip the locale prefix, giving the route key shared across locales. */
export function pathWithoutLocale(pathname: string): string {
  const segs = pathname.split('/').filter(Boolean);
  if (segs.length && PREFIXED_LOCALES.some((l) => l.code === segs[0])) segs.shift();
  return '/' + segs.join('/');
}

/**
 * Routes that genuinely have translations in every locale.
 *
 * Astro's `fallback` config makes /vi/troubleshooting resolve by serving the
 * English page under a Vietnamese URL, so nothing 404s while the guides are
 * still being translated. But an English page under hreflang="vi" is a
 * duplicate, not an alternate, so only routes listed here advertise an
 * hreflang set. The rest canonicalise back to their English original, which is
 * the honest signal and consolidates ranking on the page that really exists.
 *
 * Add a route here only once every locale dictionary actually covers it.
 */
export const TRANSLATED_ROUTES: readonly string[] = ['/'];

export function isTranslatedRoute(routeKey: string): boolean {
  return TRANSLATED_ROUTES.includes(routeKey);
}
