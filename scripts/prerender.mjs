// Pre-renders the single-page app to static HTML so crawlers see the full
// page content in dist/index.html. Run after the client and SSR builds.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const template = fs.readFileSync(templatePath, 'utf-8');
if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder');
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
fs.writeFileSync(templatePath, template.replace('<!--app-html-->', appHtml));
console.log(`[prerender] Wrote ${path.relative(root, templatePath)} (${appHtml.length} chars of markup)`);
