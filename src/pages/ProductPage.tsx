import { Link, useParams } from 'react-router-dom';
import { Arch, ProductCard, pimg } from '../ui';
import { FAMILIES, blurb, money, products, title, waLink } from '../data';
import { useCart } from '../cart';

export default function ProductPage() {
  const { id } = useParams();
  const { add } = useCart();
  const p = products.find((x) => x.id === id);
  if (!p) return <section className="w"><h1>Perfume not found</h1><p><Link to="/shop">Back to the shop</Link></p></section>;
  const more = products.filter((x) => x.family === p.family && x.id !== p.id).slice(0, 4);
  return (
    <>
      <section className="w pgrid2">
        <Arch {...pimg(p)} alt={title(p)} />
        <div>
          <p className="bl">{p.brand}</p>
          <h1>{p.name}</h1>
          <p className="mu">{FAMILIES[p.family].label}, {p.size}, for {p.for === 'unisex' ? 'everyone' : p.for === 'her' ? 'women' : 'men'}</p>
          <p className="lead">{blurb(p)}</p>
          <p className="price">{money(p.price)}</p>
          <button onClick={() => add(p.id)}>Add to bag</button>{' '}
          <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={waLink(`Hello, I’d like to ask about ${title(p)}.`)}>Ask on WhatsApp</a>
        </div>
      </section>
      {more.length > 0 && <section className="w"><h2>You may also like</h2><div className="pgrid">{more.map((x) => <ProductCard key={x.id} p={x} />)}</div></section>}
    </>
  );
}
