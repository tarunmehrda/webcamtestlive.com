import { SITE } from '../data/site';
import type { PageDates } from './dates';

/** Stable node ids, shared by every JSON-LD block on a page. */
export const ORG_ID = `${SITE.url}/#org`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const OG_IMAGE = `${SITE.url}/og-default.png`;

/** Reference to the Organization node that BaseHead emits on every page. */
const ORG_REF = { '@type': 'Organization', '@id': ORG_ID, name: SITE.name };

/**
 * BreadcrumbList structured data. Google uses it to render the site hierarchy
 * in place of a bare URL in the result snippet.
 */
export function breadcrumbs(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Webcam Test', href: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, SITE.url).href,
    })),
  };
}

/**
 * WebApplication node for a tool page. It is what tells a search engine or an
 * assistant that this URL is something a person can use, not only read, and
 * `featureList` is the plain-language summary of what it does.
 */
export function webApplication(app: {
  name: string;
  url: string;
  description: string;
  featureList: readonly string[];
  inLanguage?: string;
  browserRequirements?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${app.url}#app`,
    name: app.name,
    url: app.url,
    description: app.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements:
      app.browserRequirements ??
      'Requires a modern browser with camera access (Chrome, Edge, Firefox, Safari).',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [...app.featureList],
    inLanguage: app.inLanguage ?? 'en',
    publisher: ORG_REF,
  };
}

/**
 * TechArticle node for a long-form guide. Carries the dates and the author,
 * which are the freshness and "who wrote this" signals a guide is judged on.
 */
export function techArticle(article: {
  headline: string;
  description: string;
  url: string;
  dates: PageDates;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${article.url}#article`,
    headline: article.headline,
    description: article.description,
    url: article.url,
    mainEntityOfPage: article.url,
    image: OG_IMAGE,
    inLanguage: 'en',
    datePublished: article.dates.published,
    dateModified: article.dates.modified,
    author: ORG_REF,
    publisher: ORG_REF,
  };
}
