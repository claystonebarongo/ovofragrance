// The site uses whatever photos are listed in public/images/manifest.json (made by "npm run photos").
// photo(n) picks the n-th photo and wraps around, so the site never has empty gaps.
export const BASE = import.meta.env.BASE_URL;
let pool: string[] = [];
export async function loadPool() {
  try {
    const list: string[] = await (await fetch(BASE + 'images/manifest.json')).json();
    pool = list.map((f) => BASE + 'images/ig/' + f);
  } catch { pool = []; }
}
export const photo = (n: number) => (pool.length ? pool[(n - 1) % pool.length] : '');
export const photoCount = () => pool.length;
