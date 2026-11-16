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
const out = join(root, 'docs');
const BASE = process.env.BASE || '/healthtinity-revamp/';

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

// English at the site root, Simplified Chinese under /zh/
let count = 0;
for (const [lang, prefix] of [['en', ''], ['zh', 'zh']]) {
  setLang(lang);
  for (const page of allPages()) {
    let html = layout(page);
    if (page.file === '404.html') html = html.replace('<head>', `<head>\n  <base href="${BASE}">`);
    const file = join(out, prefix, page.file || join(page.path, 'index.html'));
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    count++;
  }
}
setLang('en');
await writeFile(join(out, '.nojekyll'), '');
console.log(`Built ${count} pages → docs/`);
