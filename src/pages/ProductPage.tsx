import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Arch, ProductCard } from '../ui';
import { FAMILIES, money, products, waLink } from '../data';
import { useCart } from '../cart';

export default function ProductPage() {
  const { id } = useParams();
  const { add } = useCart();
  const [i, setI] = useState(0);
  const p = products.find((x) => x.id === id);
  if (!p) return <section className="w"><h1>Perfume not found</h1><p><Link to="/shop">Back to the shop</Link></p></section>;
  const more = products.filter((x) => x.family === p.family && x.id !== p.id).slice(0, 4);
  return (
    <>
      <section className="w pgrid2">
        <div>
          <Arch n={p.images[i]} alt={p.name} />
          <div className="thumbs">{p.images.map((s, k) => <button key={s} className={`ghost${k === i ? ' on' : ''}`} onClick={() => setI(k)}>Photo {k + 1}</button>)}</div>
        </div>
        <div>
          <h1>{p.name}</h1>
          <p className="mu">{FAMILIES[p.family].label}, {p.size}, for {p.for === 'unisex' ? 'everyone' : p.for}</p>
          <p className="lead">{p.blurb}</p>
          <dl className="notes">
            <dt>Top</dt><dd>{p.notes[0]}</dd><dt>Heart</dt><dd>{p.notes[1]}</dd><dt>Base</dt><dd>{p.notes[2]}</dd>
          </dl>
          <p className="price">{money(p.price)}</p>
          <button onClick={() => add(p.id)}>Add to bag</button>{' '}
          <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={waLink(`Hello, I’d like to ask about ${p.name}.`)}>Ask on WhatsApp</a>
        </div>
      </section>
      {more.length > 0 && <section className="w"><h2>You may also like</h2><div className="pgrid">{more.map((x) => <ProductCard key={x.id} p={x} />)}</div></section>}
    </>
  );
}
