import { Component, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, FAMILIES, money, products, title } from './data';
import { useCart } from './cart';
import { BASE, photo } from './photos';

const TONES = [['#070713', '#3a3f6b'], ['#0b0d22', '#c9a24f'], ['#1b1d3a', '#8a6a2a'], ['#2a2013', '#e3c692'], ['#101230', '#7a7fb0'], ['#14151f', '#d8b66a']];

// Drawn perfume bottle. When it stands in for a product it carries the brand name on its label.
function Bottle({ n, brand }: { n: number; brand?: string }) {
  const [a, b] = TONES[n % TONES.length];
  const id = 'bt' + n;
  const label = brand || 'OVO';
  return (
    <svg viewBox="0 0 100 140" role="img" aria-label="Perfume bottle">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect x="38" y="6" width="24" height="18" rx="3" fill="#c9a24f" /><rect x="44" y="24" width="12" height="8" fill="#8a6a2a" />
      <rect x="18" y="32" width="64" height="98" rx="14" fill={`url(#${id})`} /><rect x="26" y="40" width="7" height="82" rx="3.5" fill="#fff" opacity=".2" />
      <rect x="32" y="70" width="44" height="30" rx="3" fill="#f6f4ee" opacity=".93" />
      <text x="54" y="88" textAnchor="middle" fontSize="7" fontFamily="Georgia,serif" fill="#070713" textLength={Math.min(38, label.length * 4.4)} lengthAdjust="spacingAndGlyphs">{label}</text>
    </svg>
  );
}

// Photo with safety levels. Products: their own file in public/images/products, then a drawn bottle with the brand.
// Other slots (hero, moments, gallery): OVO photos, then a random perfume photo, then a drawn bottle.
function Photo({ n, alt, className, own, brand }: { n: number; alt: string; className?: string; own?: string; brand?: string }) {
  const [stage, setStage] = useState(0);
  const sources = own ? [own] : [photo(n), `https://loremflickr.com/600/800/perfume?lock=${n}`].filter(Boolean);
  if (stage >= sources.length) return <div className={`ph ${className || ''}`} role="img" aria-label={alt}><Bottle n={n} brand={brand} /></div>;
  return <img className={className} src={sources[stage]} alt={alt} loading="lazy" onError={() => setStage((s) => s + 1)} />;
}

export function Arch({ n, alt, own, brand }: { n: number; alt: string; own?: string; brand?: string }) {
  return <div className="arch"><Photo n={n} alt={alt} own={own} brand={brand} /></div>;
}

// Props for showing a product's picture: save the file as public/images/products/<product id>.jpg
export const pimg = (p: Product) => ({ n: products.indexOf(p) + 1, own: `${BASE}images/products/${p.id}.jpg`, brand: p.brand });

export function Slideshow({ ns, alt }: { ns: number[]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % ns.length), 4500);
    return () => clearInterval(t);
  }, [ns.length]);
  return <div className="arch show">{ns.map((n, k) => <Photo key={n} n={n} alt={alt} className={k === i ? 'on' : ''} />)}</div>;
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="pc">
      <Link to={`/shop/${p.id}`}><Arch {...pimg(p)} alt={title(p)} /></Link>
      <p className="bl">{p.brand}</p>
      <h3><Link to={`/shop/${p.id}`}>{p.name}</Link></h3>
      <p className="mu tags">{FAMILIES[p.family].label}, {p.size}</p>
      <div className="row"><b>{money(p.price)}</b><button onClick={() => add(p.id)}>Add to bag</button></div>
    </article>
  );
}

export class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return <div style={{ padding: 24, color: '#0b0d22', fontFamily: 'sans-serif' }}><h2>Something went wrong</h2><pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.err.message)}</pre></div>;
  }
}
