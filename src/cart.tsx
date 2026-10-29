import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { products } from './data';

type Items = Record<string, number>;
interface Ctx {
  items: Items; add: (id: string) => void; dec: (id: string) => void;
  open: boolean; setOpen: (o: boolean) => void; count: number; total: number;
}
const CartCtx = createContext<Ctx>(null!);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>(() => {
    try {
      const saved: Items = JSON.parse(localStorage.getItem('ovo-cart') || '{}');
      // Keep only items that still exist in the catalogue and have a valid quantity.
      return Object.fromEntries(
        Object.entries(saved).filter(([id, q]) => products.some((p) => p.id === id) && Number.isInteger(q) && q > 0)
      );
    } catch { return {}; }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem('ovo-cart', JSON.stringify(items)); } catch {} }, [items]);

  const add = (id: string) => { setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 })); setOpen(true); };
  const dec = (id: string) => setItems((s) => { const n = { ...s }; if (--n[id] < 1) delete n[id]; return n; });
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce((a, [id, q]) => a + q * (products.find((p) => p.id === id)?.price || 0), 0);

  return <CartCtx.Provider value={{ items, add, dec, open, setOpen, count, total }}>{children}</CartCtx.Provider>;
}