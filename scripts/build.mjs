#!/usr/bin/env node
// Static site builder: no dependencies. Renders src/pages.mjs into docs/.
// Usage: node scripts/build.mjs   (BASE=/ node scripts/build.mjs for a root-domain deploy)
import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPages } from '../src/pages.mjs';
import { layout } from '../src/layout.mjs';
import { setLang } from '../src/i18n.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const staging = process.env.STAGING === '1';
const out = join(root, staging ? '.staging-build' : 'docs');
const BASE = process.env.BASE || '/healthtinity-revamp/';
if (staging && (!process.env.SITE_URL || !process.env.BASE)) {
  throw new Error('Staging requires SITE_URL and BASE (both ending in /).');
}
if (staging && (!BASE.startsWith('/') || !BASE.endsWith('/') || !/^https?:\/\/.+\/$/.test(process.env.SITE_URL))) {
  throw new Error('Use an absolute SITE_URL ending in / and a BASE path starting and ending in /.');
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

// English at the site root, Simplified Chinese under /zh/
let count = 0;
for (const [lang, prefix] of [['en', ''], ['zh', 'zh']]) {
  setLang(lang);
  for (const page of allPages()) {
    let html = layout(page);
    if (staging) html = html.replace('<head>', '<head>\n  <meta name="robots" content="noindex, nofollow, noarchive">');
    if (page.file === '404.html') html = html.replace('<head>', `<head>\n  <base href="${BASE}">`);
    const file = join(out, prefix, page.file || join(page.path, 'index.html'));
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    count++;
  }
}
setLang('en');
await writeFile(join(out, '.nojekyll'), '');
if (staging) {
  await writeFile(join(out, '.htaccess'), `Options -Indexes
DirectoryIndex index.html
<IfModule mod_rewrite.c>
RewriteEngine Off
</IfModule>
<IfModule mod_headers.c>
Header always set X-Robots-Tag "noindex, nofollow, noarchive"
Header always set Cache-Control "no-store"
</IfModule>
ErrorDocument 404 ${BASE}404.html
`);
  await writeFile(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
}
console.log(`Built ${count} pages → ${staging ? '.staging-build' : 'docs'}/`);
