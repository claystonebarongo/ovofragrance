// EDIT THIS FILE to change products, prices and contact details.
// "images" are photo numbers: 1 = first photo in public/images/ig, 2 = second, and so on (wraps around).
export type For = 'her' | 'him' | 'unisex';
export type Family = 'amber' | 'oud' | 'floral' | 'fresh';
export type Moment = 'day' | 'night' | 'event' | 'gift';
export interface Product {
  id: string; name: string; for: For; family: Family; moments: Moment[]; price: number; size: string;
  notes: [string, string, string]; // top, heart, base
  blurb: string; images: number[]; best?: boolean;
}

export const BRAND = {
  name: 'OVO Fragrance House',
  email: 'ovofragrancehouse@gmail.com',
  phone: '0791 679 578',
  wa: '254791679578',
  instagram: 'https://www.instagram.com/ovo_fh971/',
};

export const money = (n: number) => 'KES ' + n.toLocaleString('en-US');
export const waLink = (text: string) => `https://wa.me/${BRAND.wa}?text=${encodeURIComponent(text)}`;
export const AREAS = ['Nairobi (same day)', 'Elsewhere in Kenya (24 to 48 hours)'];

export const FAMILIES: Record<Family, { label: string; line: string }> = {
  amber: { label: 'Amber and warm', line: 'Vanilla, spice and resin.' },
  oud: { label: 'Oud and woods', line: 'Smoky, deep and confident.' },
  floral: { label: 'Floral and sweet', line: 'Rose, jasmine and soft musk.' },
  fresh: { label: 'Fresh and clean', line: 'Citrus and light musk.' },
};

// Shopping by moment is OVO's own way in: people choose when they will wear it.
export const MOMENTS: Record<Moment, { label: string; line: string; photo: number }> = {
  day: { label: 'Everyday', line: 'Light and clean for the office and errands.', photo: 5 },
  night: { label: 'Evening', line: 'Deep and warm for dinners and nights out.', photo: 1 },
  event: { label: 'Weddings and events', line: 'Rich, noticed and long lasting.', photo: 3 },
  gift: { label: 'Gifts', line: 'Easy to love, even when you do not know their taste.', photo: 7 },
};

// Placeholder names and prices: replace with the real catalogue.
export const products: Product[] = [
  { id: 'oud-noir', name: 'Oud Noir', for: 'him', family: 'oud', moments: ['night', 'event'], price: 3200, size: '100 ml', notes: ['Saffron, bergamot', 'Oud, leather', 'Amber, musk'], blurb: 'Smoky agarwood wrapped in leather and a thread of saffron.', images: [1, 2], best: true },
  { id: 'amber-nights', name: 'Amber Nights', for: 'unisex', family: 'amber', moments: ['night'], price: 2900, size: '100 ml', notes: ['Cinnamon, cardamom', 'Amber, rose', 'Tonka, vanilla'], blurb: 'Honeyed amber with a spiced start. Warm, round and long lasting.', images: [3, 4], best: true },
  { id: 'rose-majlis', name: 'Rose Majlis', for: 'her', family: 'floral', moments: ['event', 'gift'], price: 2800, size: '100 ml', notes: ['Pink pepper, lychee', 'Rose, jasmine', 'Musk, cedar'], blurb: 'A rose garden at dusk, soft at first and then unforgettable.', images: [5, 6], best: true },
  { id: 'saffron-dawn', name: 'Saffron Dawn', for: 'unisex', family: 'amber', moments: ['event', 'gift'], price: 3000, size: '100 ml', notes: ['Saffron, orange', 'Honey, iris', 'Vanilla, woods'], blurb: 'Golden saffron softened with honey and vanilla.', images: [7, 8], best: true },
  { id: 'musk-sahara', name: 'Musk Sahara', for: 'unisex', family: 'fresh', moments: ['day'], price: 2400, size: '100 ml', notes: ['Sea salt, pear', 'White musk', 'Cedar, ambergris'], blurb: 'Clean musk with a warm, sandy finish.', images: [9, 10] },
  { id: 'vanilla-dunes', name: 'Vanilla Dunes', for: 'her', family: 'amber', moments: ['gift', 'night'], price: 2600, size: '100 ml', notes: ['Pear, coconut', 'Caramel, orchid', 'Vanilla, praline'], blurb: 'Creamy vanilla and caramel that lingers on skin and scarves.', images: [11, 12] },
  { id: 'sandal-royale', name: 'Sandal Royale', for: 'him', family: 'oud', moments: ['event', 'gift'], price: 3500, size: '100 ml', notes: ['Cardamom, lemon', 'Sandalwood, oud', 'Vetiver, patchouli'], blurb: 'Creamy sandalwood on a dark oud base. Calm and polished.', images: [13, 14] },
  { id: 'citrus-oasis', name: 'Citrus Oasis', for: 'him', family: 'fresh', moments: ['day'], price: 2200, size: '100 ml', notes: ['Bergamot, mint', 'Lavender, geranium', 'Amberwood'], blurb: 'Bright citrus and mint, light enough for the office.', images: [15, 16] },
];

export const FAQ = [
  ['Do you deliver across Kenya?', 'Yes. Same day within Nairobi and 24 to 48 hours anywhere in Kenya.'],
  ['How do I pay?', 'Send your order on WhatsApp, then pay with M-Pesa or cash when your parcel arrives.'],
  ['How do I make my perfume last?', 'Keep it somewhere cool and dry, away from sunlight. Spray on pulse points after a shower.'],
  ['What if something is wrong with my order?', 'Message us within 48 hours of delivery and we will replace it.'],
];
