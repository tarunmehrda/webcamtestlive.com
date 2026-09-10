/**
 * Runs in front of the static site for every request except Astro's hashed
 * bundles (see `run_worker_first` in wrangler.jsonc). It has two jobs:
 *
 * 1. Collapse the duplicate hosts a search engine could otherwise index.
 *    http://…, www.… and the *.workers.dev preview all serve the same files,
 *    and without a redirect each competes with https://webcamtestlive.com for
 *    the same rankings.
 * 2. Hand everything else to the asset binding, which applies public/_headers,
 *    html_handling and the 404 page exactly as it did without a Worker.
 */
const HOST = 'webcamtestlive.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isWww = url.hostname === `www.${HOST}`;
    const isPlainHttp = url.hostname === HOST && url.protocol === 'http:';

    if (isWww || isPlainHttp) {
      url.protocol = 'https:';
      url.hostname = HOST;
      url.port = '';
      return Response.redirect(url.href, 301);
    }

    const response = await env.ASSETS.fetch(request);

    // The workers.dev preview stays reachable for smoke tests, but it must
    // never be indexed in place of the real domain.
    if (url.hostname.endsWith('.workers.dev')) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};
