## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deploy

`npm run deploy` builds, uploads to the `webcamtestlive` Cloudflare Worker (wrangler is already logged in), then pings IndexNow with every sitemap URL.

- `worker/index.js` runs in front of the static assets for everything except `/_astro/*`: it 301s `www.` and plain `http://` to `https://webcamtestlive.com`, and marks the `*.workers.dev` preview `noindex`.
- `public/_headers` sets the security headers and the immutable cache policy for the hashed bundles.
- Page dates in the sitemap and the JSON-LD come from git (`src/lib/dates.ts`), so commit before building a release.
- `public/llms.txt` and `public/robots.txt` are maintained by hand; update them when a page is added.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
