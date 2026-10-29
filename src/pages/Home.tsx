import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arch, ProductCard, pimg } from '../ui';
import { FAMILIES, FAQ, Family, For, Group, Moment, MOMENTS, BRAND, REVIEWS, blurb, money, products, title } from '../data';
import { useCart } from '../cart';
import { BASE } from '../photos';

function Finder() {
  const { add } = useCart();
  const [mood, setMood] = useState<Family | null>(null);
  const [who, setWho] = useState<For | null>(null);
  const pick = mood && who ? products.find((p) => p.family === mood && (p.for === who || p.for === 'unisex')) || products.find((p) => p.family === mood) : null;
  const reset = () => { setMood(null); setWho(null); };
  return (
    <div className="finder">
      <h2>Not sure where to start?</h2>
      {!mood && <>
        <p className="sub">What mood do you want to wear?</p>
        <div className="opts">{(Object.keys(FAMILIES) as Family[]).map((f) => <button key={f} className="ghost" onClick={() => setMood(f)}>{FAMILIES[f].label}</button>)}</div>
      </>}
      {mood && !who && <>
        <p className="sub">Who is it for?</p>
        <div className="opts">{([['her', 'Her'], ['him', 'Him'], ['unisex', 'Anyone']] as [For, string][]).map(([v, l]) => <button key={v} className="ghost" onClick={() => setWho(v)}>{l}</button>)}</div>
      </>}
      {pick && <div className="match">
        <Link to={`/shop/${pick.id}`}><Arch {...pimg(pick)} alt={title(pick)} /></Link>
        <div><p className="bl">{pick.brand}</p><h3>{pick.name}</h3><p className="mu">{blurb(pick)}</p><p><b>{money(pick.price)}</b></p>
          <button onClick={() => add(pick.id)}>Add to bag</button> <button className="ghost" onClick={reset}>Start again</button></div>
      </div>}
    </div>
  );
}

function Row({ g, heading, sub }: { g: Group; heading: string; sub: string }) {
  return (
    <section className="w"><h2>{heading}</h2><p className="sub">{sub}</p>
      <div className="pgrid">{products.filter((p) => p.group === g).slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      <p className="ctr"><Link to="/shop" className="btn ghost">View all perfumes</Link></p>
    </section>
  );
}

const CATS: [For, string, number][] = [['her', 'Women', 2], ['him', 'Men', 4], ['unisex', 'Unisex', 6]];

export default function Home() {
  return (
    <>
      <section className="hero"><div className="w hgrid">
        <div>
          <h1>Fine fragrance, delivered to your door.</h1>
          <p className="lead">Perfumes for her, for him and for everyone. Order online and pay when it arrives.</p>
          <Link className="btn gold" to="/shop">Shop the collection</Link> <a className="btn ghost" href="#finder">Find my scent</a>
        </div>
        <img className="heroimg" src={BASE + 'images/brand/ovo-logo.png'} alt="OVO Fragrance House" />
      </div></section>

      <section className="w"><h2>Shop by category</h2><p className="sub">Find the right scent for her, for him, or for everyone.</p>
        <div className="cats">{CATS.map(([f, label, n]) => (
          <Link key={f} to={`/shop?for=${f}`} className="cat"><Arch n={n} alt={label} /><span className="ml">{label}</span></Link>
        ))}</div>
      </section>

      <Row g="best" heading="Best sellers" sub="The bottles our customers ask for most." />
      <Row g="new" heading="New arrivals" sub="Fresh on the shelf this season." />

      <section className="band2"><div className="w hgrid sig">
        <Arch n={3} alt="OVO Fragrance House" />
        <div>
          <h2>Discover your signature scent</h2>
          <p className="lead">Fragrance is personal, bold and unforgettable. Tell us what you like and we will help you find the one that feels like you, whether it is a daily favourite or a gift.</p>
          <Link className="btn gold" to="/shop">Discover now</Link>
        </div>
      </div></section>

      <Row g="month" heading="OVO picks of the month" sub="Our team’s favourites right now." />

      <section className="w"><h2>Choose your moment</h2>
        <p className="sub">Start with when you will wear it. We will show you the scents that fit.</p>
        <div className="moments">{(Object.keys(MOMENTS) as Moment[]).map((m) => (
          <Link key={m} to={`/shop?moment=${m}`} className="mo">
            <Arch n={MOMENTS[m].photo} alt={MOMENTS[m].label} />
            <span className="ml">{MOMENTS[m].label}</span><span className="mu">{MOMENTS[m].line}</span>
          </Link>
        ))}</div>
      </section>

      <section className="w" id="finder"><Finder /></section>

      {REVIEWS.length > 0 && <section className="w"><h2>Customer reviews</h2>
        <div className="rev">{REVIEWS.map((r) => <blockquote key={r.name}><p>“{r.text}”</p><b>{r.name}</b></blockquote>)}</div>
      </section>}

      <section className="w"><h2>From our Instagram</h2><p className="sub">Behind the scenes at OVO.</p>
        <div className="gal">{[9, 10, 11, 12, 13, 14].map((n) => <Arch key={n} n={n} alt="OVO Instagram photo" />)}</div>
        <p className="ctr"><a className="btn ghost" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Follow @ovo_fh971</a></p>
      </section>

      <section className="band"><ul className="w trust">
        <li><b>Same day in Nairobi</b>24 to 48 hours across Kenya</li>
        <li><b>Pay on delivery</b>M-Pesa or cash</li>
        <li><b>Real advice</b>Ask us anything on WhatsApp</li>
        <li><b>Put right if wrong</b>Within 48 hours</li>
      </ul></section>

      <section className="w narrow"><h2>Questions, answered</h2>
        {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="mu">{a}</p></details>)}
      </section>
    </>
  );
}
