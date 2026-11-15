// Builds the web folder the Android app runs from.
// Source of truth: the website files in the repository root (index.html, logo.png).
// The videos stay on the live website, so their links point there instead of local files.
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(here, '..', '..');
const www = join(here, '..', 'www');
const liveSite = 'https://niksevents.in/';

await mkdir(www, { recursive: true });

let html = await readFile(join(siteRoot, 'index.html'), 'utf8');
html = html
  .replaceAll('src="Videos/', `src="${liveSite}Videos/`)
  .replaceAll('src="Golden_anniversary.mp4"', `src="${liveSite}Golden_anniversary.mp4"`);

await writeFile(join(www, 'index.html'), html, 'utf8');
await copyFile(join(siteRoot, 'logo.png'), join(www, 'logo.png'));

console.log('Built mobile web folder:', www);
