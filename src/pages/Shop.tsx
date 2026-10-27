import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ui';
import { FAMILIES, MOMENTS, products } from '../data';

type Opt = [string, string];
const FOR: Opt[] = [['', 'All'], ['her', 'Her'], ['him', 'Him'], ['unisex', 'Unisex']];

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const f = sp.get('for') || '', fam = sp.get('family') || '', mo = sp.get('moment') || '';
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n); };
  const list = products.filter((p) => (!f || p.for === f) && (!fam || p.family === fam) && (!mo || p.moments.includes(mo as never)));
  const groups: [string, string, string, Opt[]][] = [
    ['for', 'Who it is for', f, FOR],
    ['moment', 'Moment', mo, [['', 'Any'], ...Object.entries(MOMENTS).map(([k, v]): Opt => [k, v.label])]],
    ['family', 'Scent', fam, [['', 'Any'], ...Object.entries(FAMILIES).map(([k, v]): Opt => [k, v.label])]],
  ];
  return (
    <section className="w">
      <h1>The collection</h1>
      <div className="shop">
        <div className="side">
          {groups.map(([k, title, cur, opts]) => (
            <div key={k} className="grp"><h3>{title}</h3>
              {opts.map(([v, l]) => <button key={v} className={`opt${cur === v ? ' on' : ''}`} onClick={() => set(k, v)}>{l}</button>)}
            </div>
          ))}
        </div>
        <div>
          <p className="mu">{list.length} of {products.length} perfumes</p>
          {list.length ? <div className="pgrid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="mu">No perfumes match those filters. Try choosing “Any” for one of them.</p>}
        </div>
      </div>
    </section>
  );
}
