#!/usr/bin/env node
// Static site builder: no dependencies. Renders src/pages.mjs into docs/.
// Usage: node scripts/build.mjs   (BASE=/ node scripts/build.mjs for a root-domain deploy)
import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allPages } from '../src/pages.mjs';
import { layout } from '../src/layout.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs');
const BASE = process.env.BASE || '/healthtinity-revamp/';

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

let count = 0;
for (const page of allPages()) {
  let html = layout(page);
  if (page.file === '404.html') html = html.replace('<head>', `<head>\n  <base href="${BASE}">`);
  const file = join(out, page.file || join(page.path, 'index.html'));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  count++;
}
await writeFile(join(out, '.nojekyll'), '');
console.log(`Built ${count} pages → docs/`);
