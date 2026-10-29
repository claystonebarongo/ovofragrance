import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './cart';
import { AREAS, BRAND, VISIT, money, products, title, waLink } from './data';
import { BASE } from './photos';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import { About, Contact } from './pages/Info';
import Policy, { DOCS } from './pages/Policies';

const LOGO_DARK = BASE + 'images/brand/wordmark-dark.png';  // for white backgrounds
const LOGO_LIGHT = BASE + 'images/brand/wordmark-light.png'; // for dark backgrounds

function CartDrawer() {
  const { items, add, dec, open, setOpen, total } = useCart();
  const [name, setName] = useState('');
  const [area, setArea] = useState(AREAS[0]);
  const [gift, setGift] = useState(false);
  const [note, setNote] = useState('');
  const lines = Object.entries(items)
    .map(([id, q]) => ({ p: products.find((x) => x.id === id)!, q }))
    .filter((l) => l.p);
  const msg = `Hello ${BRAND.name}, I’d like to order:\n${lines.map((l) => `- ${l.q} x ${title(l.p)} (${money(l.q * l.p.price)})`).join('\n')}\nTotal: ${money(total)}\nDelivery: ${area}\nName: ${name}${gift ? `\nGift wrapping: yes${note ? `\nGift note: ${note}` : ''}` : ''}`;
  return (
    <>
      {open && <div className="ov" onClick={() => setOpen(false)} />}
      <aside className={`cart${open ? ' on' : ''}`} aria-label="Your bag" aria-hidden={!open}>
        <div className="row"><h2>Your bag</h2><button className="ghost" onClick={() => setOpen(false)}>Close</button></div>
        <div className="items">
          {lines.length === 0 && <p className="mu">Your bag is empty. Pick a scent to start your order.</p>}
          {lines.map(({ p, q }) => (
            <div className="it" key={p.id}>
              <div><b>{title(p)}</b><br /><span className="mu">{money(p.price)}</span></div>
              <div className="qty"><button className="ghost" onClick={() => dec(p.id)} aria-label="Remove one">−</button>{q}<button className="ghost" onClick={() => add(p.id)} aria-label="Add one">+</button></div>
            </div>
          ))}
        </div>
        <div className="row tot"><span>Total</span><b>{money(total)}</b></div>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={area} onChange={(e) => setArea(e.target.value)}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
        <label className="chk"><input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} /> This is a gift</label>
        {gift && <input placeholder="Gift note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />}
        <a className="btn gold wide" href={lines.length ? waLink(msg) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!lines.length}>Send order on WhatsApp</a>
        <p className="mu small">You pay with M-Pesa or cash on delivery.</p>
      </aside>
    </>
  );
}

function Header() {
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();
  const go = useNavigate();
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState('');
  useEffect(() => { setMenu(false); }, [pathname]);
  return (
    <header className="head"><div className="w hrow">
      <button className="burger ghost" onClick={() => setMenu(!menu)} aria-expanded={menu}>Menu</button>
      <Link to="/" className="brand"><img src={LOGO_DARK} alt="OVO Fragrance House" height="46" /></Link>
      <nav className={menu ? 'open' : ''}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <div className="dd">
          <Link to="/shop" className="ddl">Perfume collections</Link>
          <div className="ddm"><Link to="/shop?for=her">Women</Link><Link to="/shop?for=him">Men</Link><Link to="/shop?for=unisex">Unisex</Link></div>
        </div>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <form className="hs" onSubmit={(e) => { e.preventDefault(); go(`/shop?q=${encodeURIComponent(q)}`); setQ(''); }}>
        <input type="search" placeholder="Search perfumes" aria-label="Search perfumes" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>
      <button onClick={() => setOpen(true)}>Bag ({count})</button>
    </div></header>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <p className="bar">{BRAND.announce}</p>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies/:slug" element={<Policy />} />
          <Route path="*" element={<section className="w"><h1>Page not found</h1><p><Link to="/shop">Browse the shop</Link></p></section>} />
        </Routes>
      </main>
      <footer className="foot"><div className="w fgrid">
        <div>
          <img src={LOGO_LIGHT} alt="OVO Fragrance House" height="64" />
          <p>Perfumes for her, for him and for everyone, chosen with care and delivered to your door.</p>
          <p><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Instagram: @ovo_fh971</a></p>
        </div>
        <div><h3>Quick links</h3>
          <Link to="/shop?for=her">Women collection</Link><Link to="/shop?for=him">Men collection</Link><Link to="/shop?for=unisex">Unisex collection</Link>
          {Object.entries(DOCS).map(([k, v]) => <Link key={k} to={`/policies/${k}`}>{v[0]}</Link>)}
        </div>
        <div><h3>Contact</h3>
          <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          {VISIT.address && <span>{VISIT.address}</span>}
          {VISIT.hours && <span>{VISIT.hours}</span>}
        </div>
      </div>
      <p className="copy">© 2026 OVO Fragrance House. Prices in Kenya Shillings.</p></footer>
      <CartDrawer />
    </>
  );
}