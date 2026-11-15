import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { ProductGrid } from '../components/ProductCard.jsx';
import { CATEGORIES, PRODUCTS, categoryImage } from '../data.js';

const SLIDES = [
  { eyebrow: 'New Bridal Collection 2026', title: ['Timeless', 'Elegance'], text: 'Certified diamonds and hand-finished gold, designed to be worn for a lifetime.', cat: 'rings', cta: '/category/rings', cta2: '/collections/bridal' },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center hero-row">
          <div className="col-12 col-md-7 order-2 order-md-1 text-center text-md-start">
            <div className="eyebrow">{s.eyebrow}</div>
            <h1>{s.title[0]}<br />{s.title[1]}</h1>
            <p className="lead mx-auto mx-md-0">{s.text}</p>
            <div className="d-flex gap-2 gap-sm-3 mt-4 justify-content-center justify-content-md-start flex-wrap">
              <Link to={s.cta} className="btn-aur">Shop Now</Link>
              <Link to="/collections" className="btn-aur-o">View Collections</Link>
            </div>
          </div>
          <div className="col-12 col-md-5 order-1 order-md-2 mb-4 mb-md-0">
            <div className="hero-art"><Art cat={s.cat} /></div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-2 pb-3">
          {SLIDES.map((_, n) => (
            <button key={n} aria-label={`Slide ${n + 1}`} onClick={() => setI(n)}
              style={{ width: 26, height: 3, border: 0, background: 'var(--dark)', opacity: n === i ? 1 : 0.25, padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const best = PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 4);
  const fresh = PRODUCTS.filter((p) => p.tags.includes('new') || p.stock === 0).slice(0, 4);
  return (
    <>
      <Hero />

      <section className="sec">
        <div className="container">
          <div className="text-center eyebrow">Browse</div>
          <h2 className="sec-title">Shop by Category</h2>
          <div className="row g-3 g-lg-4">
            {CATEGORIES.map((c) => (
              <div className="col-6 col-md-3" key={c.slug}>
                <Link to={`/category/${c.slug}`} className="cat-tile">
                  <div className="cat-circle"><Art cat={c.slug} src={categoryImage(c.slug)} alt={c.name} /></div>
                  <h3>{c.name}</h3>
                  <small>{PRODUCTS.filter((p) => p.cat === c.slug).length} designs</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container">
          <div className="text-center eyebrow">Most Loved</div>
          <h2 className="sec-title">Bestsellers</h2>
          <ProductGrid items={best} />
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <div className="promo">
            <div className="l">
              <div className="eyebrow">Festive Gold Edit</div>
              <h3>Flat 20% off on<br />making charges</h3>
              <Link to="/collections/festive" className="btn-gold">Explore</Link>
            </div>
            <div className="r"><Art cat="necklaces" /></div>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container">
          <div className="text-center eyebrow">Just In</div>
          <h2 className="sec-title">New Arrivals</h2>
          <ProductGrid items={fresh} />
        </div>
      </section>

      <section className="container">
        <div className="trust row g-4">
          {[
            ['fa-certificate', 'BIS Hallmarked', 'Certified purity'],
            ['fa-rotate', 'Lifetime Exchange', 'On all gold & diamond'],
            ['fa-truck-fast', 'Free Shipping', 'Insured, above ₹25,000'],
            ['fa-arrow-rotate-left', '15-Day Returns', 'No questions asked'],
          ].map(([ic, t, s]) => (
            <div className="col-6 col-md-3" key={t}>
              <i className={`fa-solid ${ic}`} />
              <b>{t}</b>
              <small>{s}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
