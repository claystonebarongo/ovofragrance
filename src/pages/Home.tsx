import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arch, ProductCard, Slideshow } from '../ui';
import { FAMILIES, FAQ, Family, For, Moment, MOMENTS, BRAND, money, products } from '../data';
import { useCart } from '../cart';

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
        <p className="mu">What mood do you want to wear?</p>
        <div className="opts">{(Object.keys(FAMILIES) as Family[]).map((f) => <button key={f} className="ghost" onClick={() => setMood(f)}>{FAMILIES[f].label}</button>)}</div>
      </>}
      {mood && !who && <>
        <p className="mu">Who is it for?</p>
        <div className="opts">{([['her', 'Her'], ['him', 'Him'], ['unisex', 'Anyone']] as [For, string][]).map(([v, l]) => <button key={v} className="ghost" onClick={() => setWho(v)}>{l}</button>)}</div>
      </>}
      {pick && <div className="match">
        <Link to={`/shop/${pick.id}`}><Arch n={pick.images[0]} alt={pick.name} /></Link>
        <div><h3>Try {pick.name}</h3><p className="mu">{pick.blurb}</p><p><b>{money(pick.price)}</b></p>
          <button onClick={() => add(pick.id)}>Add to bag</button> <button className="ghost" onClick={reset}>Start again</button></div>
      </div>}
    </div>
  );
}

export default function Home() {
  const { add } = useCart();
  const sig = products[0];
  return (
    <>
      <section className="hero">
        <span className="ar" aria-hidden="true">عطر</span>
        <div className="w hgrid">
          <div>
            <h1>Perfume with the warmth of Arabia.</h1>
            <p className="lead">Oud, amber and rose, chosen by hand. Delivered the same day in Nairobi, paid for when it arrives.</p>
            <Link className="btn" to="/shop">Shop the collection</Link> <a className="btn ghost" href="#finder">Find my scent</a>
          </div>
          <Slideshow ns={[1, 2, 3, 4]} alt="OVO Fragrance House perfume" />
        </div>
      </section>

      <section className="w"><h2>Choose your moment</h2>
        <p className="sub">Start with when you will wear it. We will show you the scents that fit.</p>
        <div className="moments">{(Object.keys(MOMENTS) as Moment[]).map((m) => (
          <Link key={m} to={`/shop?moment=${m}`} className="mo">
            <Arch n={MOMENTS[m].photo} alt={MOMENTS[m].label} />
            <span className="ml">{MOMENTS[m].label}</span><span className="mu">{MOMENTS[m].line}</span>
          </Link>
        ))}</div>
      </section>

      <section className="w"><h2>Most loved</h2><p className="sub">The bottles our customers come back for.</p>
        <div className="snap">{products.filter((p) => p.best).map((p) => <ProductCard key={p.id} p={p} />)}</div>
        <p><Link to="/shop" className="btn ghost">See all perfumes</Link></p>
      </section>

      <section className="w"><div className="hgrid sig">
        <Arch n={sig.images[1]} alt={sig.name} />
        <div>
          <h2>{sig.name}</h2>
          <p className="lead">{sig.blurb} Deep, calm and noticed across the room.</p>
          <dl className="notes"><dt>Top</dt><dd>{sig.notes[0]}</dd><dt>Heart</dt><dd>{sig.notes[1]}</dd><dt>Base</dt><dd>{sig.notes[2]}</dd></dl>
          <button onClick={() => add(sig.id)}>Add to bag, {money(sig.price)}</button> <Link className="btn ghost" to={`/shop/${sig.id}`}>Read more</Link>
        </div>
      </div></section>

      <section className="w" id="finder"><Finder /></section>

      <section className="w"><h2>From our Instagram</h2><p className="sub">Behind the scenes at OVO.</p>
        <div className="gal">{[9, 10, 11, 12, 13, 14].map((n) => <Arch key={n} n={n} alt="OVO Instagram photo" />)}</div>
        <p><a className="btn ghost" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Follow @ovo_fh971</a></p>
      </section>

      <section className="band"><ul className="w trust">
        <li><b>Same day in Nairobi</b>24 to 48 hours across Kenya</li>
        <li><b>Pay on delivery</b>M-Pesa or cash</li>
        <li><b>Real advice</b>Ask us anything on WhatsApp</li>
        <li><b>Replaced if wrong</b>Within 48 hours</li>
      </ul></section>

      <section className="w narrow"><h2>Questions, answered</h2>
        {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p className="mu">{a}</p></details>)}
      </section>
    </>
  );
}
