// Tells Bing, Yandex, Naver, Seznam and Yep (every IndexNow participant) which
// URLs changed, straight after a deploy. Google does not use IndexNow; it
// picks the same changes up from the sitemap's <lastmod>. The key is proven by
// the matching public/<key>.txt file, so keep the two in sync.
import { readFile } from 'node:fs/promises';

const HOST = 'webcamtestlive.com';
const KEY = 'a4c1e8f27b3d4e9f8c6b5a2d1e0f9c7b';

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  throw new Error('No <loc> entries in dist/sitemap.xml; run `astro build` first.');
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted. A failure here is worth seeing in the deploy
// log but is not a reason to fail the deploy, which has already happened.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
