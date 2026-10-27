import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useCart } from './cart';
import { AREAS, BRAND, money, products, waLink } from './data';
import { BASE } from './photos';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import { About, Contact } from './pages/Info';

function CartDrawer() {
  const { items, add, dec, open, setOpen, total } = useCart();
  const [name, setName] = useState('');
  const [area, setArea] = useState(AREAS[0]);
  const [gift, setGift] = useState(false);
  const [note, setNote] = useState('');
  const lines = Object.entries(items).map(([id, q]) => ({ p: products.find((x) => x.id === id)!, q }));
  const msg = `Hello ${BRAND.name}, I’d like to order:\n${lines.map((l) => `- ${l.q} x ${l.p.name} (${money(l.q * l.p.price)})`).join('\n')}\nTotal: ${money(total)}\nDelivery: ${area}\nName: ${name}${gift ? `\nGift wrapping: yes${note ? `\nGift note: ${note}` : ''}` : ''}`;
  return (
    <>
      {open && <div className="ov" onClick={() => setOpen(false)} />}
      <aside className={`cart${open ? ' on' : ''}`} aria-label="Your bag" aria-hidden={!open}>
        <div className="row"><h2>Your bag</h2><button className="ghost" onClick={() => setOpen(false)}>Close</button></div>
        <div className="items">
          {lines.length === 0 && <p className="mu">Your bag is empty. Pick a scent to start your order.</p>}
          {lines.map(({ p, q }) => (
            <div className="it" key={p.id}>
              <div><b>{p.name}</b><br /><span className="mu">{money(p.price)}</span></div>
              <div className="qty"><button className="ghost" onClick={() => dec(p.id)} aria-label="Remove one">−</button>{q}<button className="ghost" onClick={() => add(p.id)} aria-label="Add one">+</button></div>
            </div>
          ))}
        </div>
        <div className="row tot"><span>Total</span><b>{money(total)}</b></div>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={area} onChange={(e) => setArea(e.target.value)}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
        <label className="chk"><input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} /> This is a gift</label>
        {gift && <input placeholder="Gift note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />}
        <a className="btn wide" href={lines.length ? waLink(msg) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!lines.length}>Send order on WhatsApp</a>
        <p className="mu small">You pay with M-Pesa or cash on delivery.</p>
      </aside>
    </>
  );
}

export default function App() {
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <header className="head"><div className="w hrow">
        <Link to="/" className="brand"><img src={BASE + 'favicon.svg'} width="38" height="38" alt="" /><span className="logo">OVO<span>Fragrance House</span></span></Link>
        <nav>
          <NavLink to="/shop">Shop</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/contact">Contact</NavLink>
        </nav>
        <button onClick={() => setOpen(true)}>Bag ({count})</button>
      </div></header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<section className="w"><h1>Page not found</h1><p><Link to="/shop">Browse the shop</Link></p></section>} />
        </Routes>
      </main>
      <footer className="foot"><div className="w frow">
        <div><Link to="/" className="brand"><img src={BASE + 'favicon.svg'} width="38" height="38" alt="" /><span className="logo">OVO</span></Link><p className="mu">Arabian perfumes, chosen by hand and delivered to you.</p></div>
        <div><b>Contact</b><br /><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a><br />{BRAND.phone}<br /><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">@ovo_fh971 on Instagram</a></div>
        <div className="mu">© 2026 OVO Fragrance House. Prices in Kenya Shillings.</div>
      </div></footer>
      <CartDrawer />
    </>
  );
}
