import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE } from '../photos';
import { BRAND, waLink } from '../data';

export function About() {
  return (
    <section className="w hgrid">
      <div>
        <h1>Our story</h1>
        {/* Replace this copy with OVO's real story. */}
        <p className="lead">OVO Fragrance House began with a simple idea: great perfume should be easy to find and easy to order.</p>
        <p className="mu">We choose every fragrance by hand, test it, and deliver it to your door. Tell us what you like and we will help you find a scent that feels like you.</p>
        <Link className="btn" to="/shop">Shop the collection</Link>
      </div>
      <img className="aboutimg" src={BASE + 'images/brand/ovo-logo.png'} alt="OVO Fragrance House" />
    </section>
  );
}

export function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <section className="w narrow">
      <h1>Contact us</h1>
      <p className="sub">The fastest way to reach us is WhatsApp.</p>
      <p><b>Phone:</b> {BRAND.phone}<br /><b>Email:</b> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a><br /><b>Instagram:</b> <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">@ovo_fh971</a></p>
      <div className="form">
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="How can we help?" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} />
        <a className="btn" target="_blank" rel="noopener noreferrer" href={waLink(`Hello, I’m ${name || 'a customer'}. ${msg}`)}>Send on WhatsApp</a>
      </div>
    </section>
  );
}
