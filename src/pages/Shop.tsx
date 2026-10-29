import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ui';
import { FAMILIES, MOMENTS, products, title } from '../data';

type Opt = [string, string];
const FOR: Opt[] = [['', 'All'], ['her', 'Women'], ['him', 'Men'], ['unisex', 'Unisex']];

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const f = sp.get('for') || '', fam = sp.get('family') || '', mo = sp.get('moment') || '', q = (sp.get('q') || '').toLowerCase(), sort = sp.get('sort') || '';
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };
  let list = products.filter((p) => (!f || p.for === f) && (!fam || p.family === fam) && (!mo || p.moments.includes(mo as never)) && (!q || title(p).toLowerCase().includes(q)));
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  const groups: [string, string, string, Opt[]][] = [
    ['for', 'Category', f, FOR],
    ['moment', 'Moment', mo, [['', 'Any'], ...Object.entries(MOMENTS).map(([k, v]): Opt => [k, v.label])]],
    ['family', 'Scent', fam, [['', 'Any'], ...Object.entries(FAMILIES).map(([k, v]): Opt => [k, v.label])]],
  ];
  return (
    <section className="w">
      <h1>The collection</h1>
      <div className="srch">
        <input type="search" placeholder="Search by brand or perfume" aria-label="Search" value={sp.get('q') || ''} onChange={(e) => set('q', e.target.value)} />
        <select aria-label="Sort" value={sort} onChange={(e) => set('sort', e.target.value)}>
          <option value="">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option>
        </select>
      </div>
      <div className="shop">
        <div className="side">
          {groups.map(([k, ttl, cur, opts]) => (
            <div key={k} className="grp"><h3>{ttl}</h3>
              {opts.map(([v, l]) => <button key={v} className={`opt${cur === v ? ' on' : ''}`} onClick={() => set(k, v)}>{l}</button>)}
            </div>
          ))}
        </div>
        <div>
          <p className="mu">{list.length} of {products.length} perfumes</p>
          {list.length ? <div className="pgrid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="mu">No perfumes match. Try clearing a filter or the search.</p>}
        </div>
      </div>
    </section>
  );
}
