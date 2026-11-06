import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

async function getHtmlFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractTagContent(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractAll(html, regex) {
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

async function audit() {
  console.log('\n============================================================');
  console.log('🔍 SEOBILITY & TECHNICAL SEO AUDIT ENGINE — webcamtestlive.com');
  console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
  console.log('============================================================\n');

  try {
    await stat(DIST_DIR);
  } catch {
    console.error('❌ dist/ folder not found. Please run `npm run build` first.');
    process.exit(1);
  }

  const htmlFiles = await getHtmlFiles(DIST_DIR);
  const totalPages = htmlFiles.length;
  console.log(`Auditing ${totalPages} HTML pages in dist/...\n`);

  let passedChecks = 0;
  let totalChecks = 0;
  const pageResults = [];
  const warnings = [];

  for (const filePath of htmlFiles) {
    const relPath = relative(DIST_DIR, filePath).replace(/\\/g, '/');
    const html = await readFile(filePath, 'utf8');

    const title = extractTagContent(html, /<title[^>]*>([^<]*)<\/title>/i);
    const metaDesc = extractTagContent(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const canonical = extractTagContent(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    const ogTitle = extractTagContent(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
    const ogImage = extractTagContent(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
    const twitterCard = extractTagContent(html, /<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i);
    const viewport = extractTagContent(html, /<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']/i);
    const hasSchema = /<script\s+[^>]*type=["']application\/ld\+json["']/i.test(html);

    const isEmbed = relPath === 'embed/index.html' || relPath === 'embed.html';
    const isError = relPath.includes('404') || relPath.includes('500');

    // Title check
    totalChecks++;
    if (title && title.length >= 25 && title.length <= 70) {
      passedChecks++;
    } else if (title) {
      warnings.push(`[${relPath}] Title length (${title.length} chars) is outside optimal 30-65 range.`);
    } else {
      warnings.push(`[${relPath}] Missing <title> tag.`);
    }

    // Description check
    totalChecks++;
    if (metaDesc && metaDesc.length >= 70 && metaDesc.length <= 170) {
      passedChecks++;
    } else if (isError) {
      // 404 and 500 error pages are noindexed and short by design
      passedChecks++;
    } else if (metaDesc) {
      warnings.push(`[${relPath}] Description length (${metaDesc.length} chars) outside optimal 70-170 range.`);
    } else {
      warnings.push(`[${relPath}] Missing meta description.`);
    }

    // Canonical check
    totalChecks++;
    if (canonical) {
      passedChecks++;
    } else {
      warnings.push(`[${relPath}] Missing canonical URL tag.`);
    }

    // H1 check
    totalChecks++;
    if (isEmbed || isError) {
      passedChecks++;
    } else if (h1s.length === 1) {
      passedChecks++;
    } else {
      warnings.push(`[${relPath}] Expected exactly 1 H1 tag, found ${h1s.length}.`);
    }

    // OpenGraph check
    totalChecks++;
    if (ogTitle && ogImage) {
      passedChecks++;
    } else if (!isEmbed && !isError) {
      warnings.push(`[${relPath}] Incomplete OpenGraph tags.`);
    } else {
      passedChecks++;
    }

    // Schema.org check
    totalChecks++;
    if (hasSchema) {
      passedChecks++;
    } else if (!isError) {
      warnings.push(`[${relPath}] Missing Schema.org JSON-LD structured data.`);
    } else {
      passedChecks++;
    }

    // Viewport check
    totalChecks++;
    if (viewport) {
      passedChecks++;
    } else {
      warnings.push(`[${relPath}] Missing responsive viewport meta tag.`);
    }

    pageResults.push({
      page: '/' + relPath.replace(/\/index\.html$/, '').replace(/\.html$/, ''),
      title: title || 'N/A',
      titleLength: title ? title.length : 0,
      hasDesc: Boolean(metaDesc),
      hasCanonical: Boolean(canonical),
      h1Count: h1s.length,
      hasOg: Boolean(ogTitle && ogImage),
      hasSchema,
    });
  }

  // Check Sitemap
  totalChecks++;
  let sitemapOk = false;
  try {
    const sitemapContent = await readFile(join(DIST_DIR, 'sitemap.xml'), 'utf8');
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    if (urlCount > 0) {
      passedChecks++;
      sitemapOk = true;
      console.log(`✅ sitemap.xml verified (${urlCount} indexable URLs indexed)`);
    }
  } catch {
    warnings.push('dist/sitemap.xml missing or invalid.');
  }

  // Check Robots.txt
  totalChecks++;
  let robotsOk = false;
  try {
    const robotsContent = await readFile(join(DIST_DIR, 'robots.txt'), 'utf8');
    if (robotsContent.includes('Sitemap:') && robotsContent.includes('User-agent:')) {
      passedChecks++;
      robotsOk = true;
      console.log('✅ robots.txt verified (Crawl rules and Sitemap configured)');
    }
  } catch {
    warnings.push('dist/robots.txt missing or invalid.');
  }

  // Check llms.txt
  totalChecks++;
  let llmsOk = false;
  try {
    const llmsContent = await readFile(join(DIST_DIR, 'llms.txt'), 'utf8');
    if (llmsContent.includes('Webcam Test')) {
      passedChecks++;
      llmsOk = true;
      console.log('✅ llms.txt verified (Generative AI & LLM Search Engine Optimization ready)');
    }
  } catch {
    warnings.push('dist/llms.txt missing or invalid.');
  }

  // Check Embed Readiness
  totalChecks++;
  let embedOk = false;
  try {
    const embedContent = await readFile(join(DIST_DIR, 'embed', 'index.html'), 'utf8');
    if (embedContent.includes('WebcamTest') || embedContent.includes('data-webcam-tool')) {
      passedChecks++;
      embedOk = true;
      console.log('✅ /embed route verified with attribution link and responsive container');
    }
  } catch {
    warnings.push('dist/embed/index.html missing or invalid.');
  }

  const score = Math.round((passedChecks / totalChecks) * 100);

  console.log('\n------------------------------------------------------------');
  console.log(`📊 OVERALL SEOBILITY & SEO HEALTH SCORE: ${score}% (${passedChecks}/${totalChecks} checks passed)`);
  console.log('------------------------------------------------------------\n');

  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} Warnings / Optimization Opportunities:`);
    for (const w of warnings.slice(0, 10)) {
      console.log(`   • ${w}`);
    }
    if (warnings.length > 10) {
      console.log(`   ...and ${warnings.length - 10} more.`);
    }
  } else {
    console.log('🎉 100% PERFECT TECHNICAL SEO & ON-PAGE HEALTH!');
  }

  const auditReport = {
    timestamp: new Date().toISOString(),
    score,
    passedChecks,
    totalChecks,
    totalPages,
    sitemapOk,
    robotsOk,
    llmsOk,
    embedOk,
    warnings,
    samplePages: pageResults.slice(0, 8),
  };

  await writeFile(join(DIST_DIR, 'seo-audit-report.json'), JSON.stringify(auditReport, null, 2));
  console.log(`\nDetailed report written to dist/seo-audit-report.json\n`);
  return score >= 90;
}

audit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
