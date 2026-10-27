import { Component, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, FAMILIES, MOMENTS, money } from './data';
import { useCart } from './cart';
import { photo } from './photos';

const TONES = [['#2b1a14', '#b9791f'], ['#7a1f2b', '#e07a8a'], ['#1d3b34', '#6fb09a'], ['#8a4b12', '#f0c36a'], ['#2d6a73', '#9fd3cf'], ['#4a2d5c', '#c79be0']];

// Last-resort picture: a drawn perfume bottle, so there is never a broken image or an empty frame.
function Bottle({ n }: { n: number }) {
  const [a, b] = TONES[n % TONES.length];
  const id = 'bt' + n;
  return (
    <svg viewBox="0 0 100 140" role="img" aria-label="Perfume bottle">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect x="38" y="6" width="24" height="18" rx="3" fill="#e0a23b" /><rect x="44" y="24" width="12" height="8" fill="#b9791f" />
      <rect x="18" y="32" width="64" height="98" rx="14" fill={`url(#${id})`} /><rect x="26" y="40" width="7" height="82" rx="3.5" fill="#fff" opacity=".2" />
      <rect x="34" y="70" width="40" height="30" rx="3" fill="#eadfc8" opacity=".93" />
      <text x="54" y="88" textAnchor="middle" fontSize="10" fontFamily="Georgia,serif" fill="#0d2523" letterSpacing="2">OVO</text>
    </svg>
  );
}

// One photo with three levels of safety:
//  1. your own photo from public/images/ig  2. a random perfume photo from loremflickr.com  3. a drawn bottle
function Photo({ n, alt, className }: { n: number; alt: string; className?: string }) {
  const [stage, setStage] = useState(0);
  const sources = [photo(n), `https://loremflickr.com/600/800/perfume?lock=${n}`].filter(Boolean);
  if (stage >= sources.length) return <div className={`ph ${className || ''}`} role="img" aria-label={alt}><Bottle n={n} /></div>;
  return <img className={className} src={sources[stage]} alt={alt} loading="lazy" onError={() => setStage((s) => s + 1)} />;
}

export function Arch({ n, alt }: { n: number; alt: string }) {
  return <div className="arch"><Photo n={n} alt={alt} /></div>;
}

// Hero photo that slowly changes between photos. Stays still if the visitor prefers reduced motion.
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
      <Link to={`/shop/${p.id}`}><Arch n={p.images[0]} alt={p.name} /></Link>
      <h3><Link to={`/shop/${p.id}`}>{p.name}</Link></h3>
      <p className="mu">{FAMILIES[p.family].label}, {p.size}</p>
      <p className="mu tags">{p.moments.map((m) => MOMENTS[m].label).join(', ')}</p>
      <div className="row"><b>{money(p.price)}</b><button onClick={() => add(p.id)}>Add to bag</button></div>
    </article>
  );
}

// Shows the real error on screen instead of a blank page, so problems are easy to report.
export class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return <div style={{ padding: 24, color: '#eadfc8', fontFamily: 'sans-serif' }}><h2>Something went wrong</h2><pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.err.message)}</pre></div>;
  }
}
