import { Link, useParams } from 'react-router-dom';
import { AREAS } from '../data';

// Draft wording. The owner must check and change these before launch.
export const DOCS: Record<string, [string, string[]]> = {
  shipping: ['Shipping policy', [`Orders are delivered ${AREAS[0].toLowerCase()} when placed before the daily cut-off, and ${AREAS[1].toLowerCase()} elsewhere.`, 'Delivery fees are confirmed on WhatsApp before you pay. You pay with M-Pesa or cash when your parcel arrives.']],
  returns: ['Returns and refunds', ['If your order arrives damaged or is not what you ordered, message us within 48 hours of delivery with a photo and we will arrange a replacement or refund.', 'Opened or used perfumes cannot be returned.']],
  privacy: ['Privacy policy', ['We only use your name, phone number and delivery details to process your order. We do not sell your information.', 'This website saves your bag in your own browser only.']],
  terms: ['Terms of service', ['Prices are in Kenya Shillings and may change. An order is confirmed once we reply on WhatsApp. Stock is limited.']],
};

export default function Policy() {
  const { slug } = useParams();
  const d = DOCS[slug || ''];
  if (!d) return <section className="w"><h1>Page not found</h1><p><Link to="/">Back home</Link></p></section>;
  return (
    <section className="w narrow">
      <h1>{d[0]}</h1>
      <p className="mu small">Draft wording, to be confirmed by OVO Fragrance House.</p>
      {d[1].map((t) => <p key={t}>{t}</p>)}
    </section>
  );
}
