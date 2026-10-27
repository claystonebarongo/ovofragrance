// npm run photos     -> downloads OVO's Instagram photos from dataset.json into public/images/ig/ (skips ones you have, retries failures)
// npm run stock      -> downloads 12 random perfume photos (loremflickr.com) as stock-01.jpg ... into the same folder
// npm run manifest   -> only rebuilds public/images/manifest.json (use after adding your own photos)
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'node:fs';

const dir = 'public/images/ig';
mkdirSync(dir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const arg = (a) => process.argv.includes(a);

async function grab(url) {
  for (let t = 1; t <= 3; t++) {
    try {
      const c = new AbortController();
      const timer = setTimeout(() => c.abort(), 30000);
      const res = await fetch(url, { signal: c.signal, headers: { 'User-Agent': UA }, redirect: 'follow' });
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 3000) throw new Error('file too small');
      return buf;
    } catch (e) {
      if (t === 3) throw e;
      await sleep(1500 * t);
    }
  }
}

async function save(name, url) {
  if (existsSync(`${dir}/${name}`)) { console.log('have ', name); return; }
  try { writeFileSync(`${dir}/${name}`, await grab(url)); console.log('saved', name); }
  catch (e) { console.log('FAILED', name, e.cause?.code || e.message); }
  await sleep(400);
}

if (arg('--stock')) {
  for (let i = 1; i <= 12; i++) await save(`stock-${String(i).padStart(2, '0')}.jpg`, `https://loremflickr.com/800/1000/perfume?lock=${i}`);
} else if (!arg('--manifest-only')) {
  const file = process.argv.find((a) => a.endsWith('.json')) || 'dataset.json';
  const items = JSON.parse(readFileSync(file, 'utf8'));
  let n = 0;
  for (const it of items) { n++; await save(`ig-${String(n).padStart(2, '0')}.jpg`, it.thumbnail_url); }
}

const files = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && statSync(`${dir}/${f}`).size > 3000).sort();
writeFileSync('public/images/manifest.json', JSON.stringify(files, null, 2));
console.log(`\n${files.length} photos listed in public/images/manifest.json`);
console.log('Photos that still fail to load on the website are replaced automatically by random perfume photos or a drawn bottle.');
