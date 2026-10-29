// EDIT THIS FILE to change products, prices, contact details and policies.
export type For = 'her' | 'him' | 'unisex';
export type Family = 'amber' | 'oud' | 'floral' | 'fresh';
export type Moment = 'day' | 'night' | 'event' | 'gift';
export type Group = 'best' | 'new' | 'month';
export interface Product {
  id: string; brand: string; name: string; size: string; for: For;
  family: Family; moments: Moment[]; price: number; group: Group;
}

export const BRAND = {
  name: 'OVO Fragrance House',
  email: 'ovofragrancehouse@gmail.com',
  phone: '0791 679 578',
  wa: '254791679578',
  instagram: 'https://www.instagram.com/ovo_fh971/',
  announce: 'Same-day delivery in Nairobi. Pay with M-Pesa on delivery.', // owner: confirm the real offer
};

// Fill these in when the owner has them. Empty = the section stays hidden.
export const VISIT = { address: '', hours: '' };
// Add REAL customer reviews only, with the customer's permission: { name: 'Jane', text: '...' }
export const REVIEWS: { name: string; text: string }[] = [];

export const money = (n: number) => 'KES ' + n.toLocaleString('en-US');
export const waLink = (text: string) => `https://wa.me/${BRAND.wa}?text=${encodeURIComponent(text)}`;
export const AREAS = ['Nairobi (same day)', 'Elsewhere in Kenya (24 to 48 hours)'];
export const title = (p: Product) => `${p.brand} ${p.name}`;

export const FAMILIES: Record<Family, { label: string; line: string }> = {
  amber: { label: 'Amber and warm', line: 'Warm, sweet and spiced.' },
  oud: { label: 'Oud and woods', line: 'Smoky, deep and confident.' },
  floral: { label: 'Floral and sweet', line: 'Rose, jasmine and soft musk.' },
  fresh: { label: 'Fresh and clean', line: 'Citrus and light musk.' },
};
export const blurb = (p: Product) => `${p.size}. ${FAMILIES[p.family].line}`;

export const MOMENTS: Record<Moment, { label: string; line: string; photo: number }> = {
  day: { label: 'Everyday', line: 'Light and clean for the office and errands.', photo: 5 },
  night: { label: 'Evening', line: 'Deep and warm for dinners and nights out.', photo: 1 },
  event: { label: 'Weddings and events', line: 'Rich, noticed and long lasting.', photo: 3 },
  gift: { label: 'Gifts', line: 'Easy to love, even when you do not know their taste.', photo: 7 },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const P = (brand: string, name: string, size: string, f: For, price: number, family: Family, moments: Moment[], group: Group): Product =>
  ({ id: slug(`${brand} ${name} ${size}`), brand, name, size, for: f, price, family, moments, group });

// Product names and starting prices follow the list the owner asked for. Scent families and moments are
// quick guesses for filtering: the owner should check them. Prices are editable here.
export const products: Product[] = [
  P('Gucci', 'Intense Oud EDP', '90 ml', 'unisex', 25700, 'oud', ['night', 'event'], 'best'),
  P('Xerjoff', 'Erba Pura EDP', '50 ml', 'unisex', 27500, 'fresh', ['day'], 'best'),
  P('Elizabeth Arden', 'White Tea EDT', '100 ml', 'her', 7300, 'fresh', ['day'], 'best'),
  P('Versace', 'Crystal Noir EDP', '90 ml', 'her', 19500, 'floral', ['night'], 'best'),
  P('Marc Antoine Barrois', 'Ganymede EDP', '100 ml', 'unisex', 45500, 'amber', ['night'], 'best'),
  P('Valentino', 'Donna Born in Roma Intense EDP', '100 ml', 'her', 28700, 'amber', ['night', 'gift'], 'best'),
  P('Jimmy Choo', 'I Want Choo EDP', '100 ml', 'her', 19200, 'floral', ['event', 'gift'], 'best'),
  P('Parfums de Marly', 'Delina EDP', '75 ml', 'her', 47900, 'floral', ['event', 'gift'], 'best'),
  P('Giardini di Toscana', 'Scintilla', '100 ml', 'unisex', 23500, 'fresh', ['day'], 'new'),
  P('Nishane', 'Thorns Become Roses Extrait de Parfum', '100 ml', 'unisex', 60500, 'floral', ['event'], 'new'),
  P('Amouage', 'Elsewhere Essence de Parfum', '100 ml', 'unisex', 112500, 'amber', ['event'], 'new'),
  P('John Varvatos', 'XX Indigo EDT', '125 ml', 'him', 7900, 'fresh', ['day'], 'new'),
  P('John Varvatos', 'XX Artisan EDT', '125 ml', 'him', 8500, 'fresh', ['day'], 'new'),
  P('Matiere Premiere', 'Parisian Musc EDP', '100 ml', 'unisex', 38900, 'fresh', ['day'], 'new'),
  P('Xerjoff', 'Comandante EDP', '100 ml', 'unisex', 41500, 'oud', ['night'], 'new'),
  P('Juliette Has a Gun', 'Powder Love EDP', '100 ml', 'her', 19200, 'floral', ['gift'], 'new'),
  P('BDK', 'Stellar Silk Absolu de Parfum', '100 ml', 'unisex', 70900, 'amber', ['night', 'event'], 'new'),
  P('Sospiro', 'Vibranna EDP', '100 ml', 'unisex', 42200, 'floral', ['event'], 'new'),
  P('Les Indemodables', 'Vanille Havane EDP', '100 ml', 'unisex', 57200, 'amber', ['night'], 'month'),
  P('Profumo di Firenze', 'Matelda EDP', '100 ml', 'unisex', 17200, 'floral', ['day', 'gift'], 'month'),
  P('Spirit of Kings', 'Mercy Parfum', '100 ml', 'unisex', 49200, 'amber', ['night'], 'month'),
  P('Versace', 'Eros Najim Parfum', '100 ml', 'him', 21700, 'amber', ['night'], 'month'),
  P('Les Eaux Primordiales', 'Rose Supercritique EDP', '100 ml', 'unisex', 30200, 'floral', ['gift', 'event'], 'month'),
];

export const FAQ = [
  ['Do you deliver across Kenya?', 'Yes. Same day within Nairobi and 24 to 48 hours anywhere in Kenya.'],
  ['How do I pay?', 'Send your order on WhatsApp, then pay with M-Pesa or cash when your parcel arrives.'],
  ['Can you help me choose?', 'Yes. Message us on WhatsApp, or use the scent finder on the home page.'],
  ['What if something is wrong with my order?', 'Message us within 48 hours of delivery and we will put it right.'],
];
