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
    const headers = new Headers(response.headers);

    // Allow iframe embedding from any external domain for /embed
    if (url.pathname === '/embed' || url.pathname.startsWith('/embed/')) {
      headers.delete('X-Frame-Options');
      headers.set('Content-Security-Policy', 'frame-ancestors *');
      headers.set('Permissions-Policy', 'camera=*, microphone=*');
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    // The workers.dev preview stays reachable for smoke tests, but it must
    // never be indexed in place of the real domain.
    if (url.hostname.endsWith('.workers.dev')) {
      headers.set('X-Robots-Tag', 'noindex');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },

  /**
   * Cloudflare Cron Trigger handler.
   * Runs twice daily (9 a.m. and 6 p.m. IST) on Cloudflare's global edge network,
   * completely independent of whether any laptop is turned on or off.
   */
  async scheduled(controller, env, ctx) {
    const origin = `https://${HOST}`;
    console.log(`[SEO Cron] Starting twice-daily automated SEO & availability audit at ${new Date().toISOString()}`);

    const endpoints = [
      '/',
      '/video-recorder',
      '/webcam-recorder',
      '/keyboard-test',
      '/screen-test',
      '/dead-pixel-test',
      '/mic-test',
      '/speaker-test',
      '/mirror',
      '/take-photo',
      '/embed',
      '/mac',
      '/windows',
      '/chromebook',
      '/zoom',
      '/google-meet',
      '/teams',
      '/sitemap.xml',
      '/robots.txt',
      '/llms.txt',
    ];

    const checks = await Promise.allSettled(
      endpoints.map(async (path) => {
        const start = Date.now();
        const res = await fetch(`${origin}${path}`, {
          headers: { 'User-Agent': 'WebcamTestLive-Edge-Health/1.0' },
        });
        const duration = Date.now() - start;
        return {
          path,
          status: res.status,
          ok: res.ok,
          durationMs: duration,
        };
      })
    );

    let passed = 0;
    for (const check of checks) {
      if (check.status === 'fulfilled') {
        const { path, status, ok, durationMs } = check.value;
        if (ok) passed++;
        console.log(`[SEO Check] ${path} -> ${status} (${durationMs}ms) ${ok ? 'OK' : 'FAIL'}`);
      } else {
        console.error(`[SEO Check Error]`, check.reason);
      }
    }

    console.log(`[SEO Cron] Completed: ${passed}/${endpoints.length} endpoints healthy.`);
  },
};
