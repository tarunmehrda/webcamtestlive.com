import { SITE } from '../data/site';

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
