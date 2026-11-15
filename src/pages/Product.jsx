import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { Stars } from '../components/ProductCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../store.jsx';
import { fmt, getProduct, offPct, PRODUCTS, REVIEWS } from '../data.js';

export default function Product() {
  const { id } = useParams();
  const p = getProduct(id);
  const nav = useNavigate();
  const { addToCart, wish, toggleWish, toast } = useStore();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  const [shake, setShake] = useState(false);
  const [thumb, setThumb] = useState(0);

  if (!p) return <div className="container empty"><p>Product not found.</p><Link to="/" className="btn-aur">Go home</Link></div>;

  const out = p.stock <= 0;
  const off = offPct(p);
  const on = wish.includes(p.id);
  const needsSize = !!p.sizes;

  const guard = () => {
    if (out) { toast('This item is out of stock', 'err'); return false; }
    if (needsSize && !size) {
      toast('Please select a ring size', 'err');
      setShake(true); setTimeout(() => setShake(false), 450);
      return false;
    }
    return true;
  };
  const add = () => guard() && addToCart(p.id, qty, size);
  const buy = () => { if (guard() && addToCart(p.id, qty, size)) nav('/checkout'); };
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <div className="container pb-4">
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to={`/category/${p.cat}`} style={{ textTransform: 'capitalize' }}>{p.cat}</Link> / <b>{p.name}</b>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column-reverse flex-md-row">
            <div className="thumbs">
              {[0, 1, 2].map((n) => (
                <button key={n} className={`thumb ${thumb === n ? 'on' : ''}`} onClick={() => setThumb(n)} aria-label={`View ${n + 1}`}>
                  <Art cat={p.cat} src={p.gallery[n]} alt={`${p.name} view ${n + 1}`} />
                </button>
              ))}
            </div>
            <div className="pdp-main flex-grow-1">
              <div className="tag-stack">
                {out && <span className="tag oos">Out of stock</span>}
                {p.tags.includes('new') && <span className="tag">New</span>}
              </div>
              <button className={`wbtn ${on ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist">
                <i className={`${on ? 'fa-solid' : 'fa-regular'} fa-heart`} />
              </button>
              <Art cat={p.cat} src={p.gallery[thumb]} alt={p.name} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="d-flex gap-2">
            {p.tags.includes('new') && <span className="tag" style={{ position: 'static' }}>New</span>}
            {p.tags.includes('bestseller') && <span className="tag bestseller" style={{ position: 'static' }}>Bestseller</span>}
          </div>
          <h1 className="pdp-title">{p.name}</h1>
          <Stars rating={p.rating} reviews={p.reviews} />

          <div className="mt-3">
            <span className="pdp-price">{fmt(p.price)}</span>
            {off > 0 && <><span className="mrp fs-6">{fmt(p.mrp)}</span><span className="off">{off}% off</span></>}
          </div>
          <div className="small text-muted pb-3 border-bottom">Inclusive of all taxes · Free insured shipping</div>

          {needsSize && (
            <div className={`mt-3 ${shake ? 'shake' : ''}`}>
              <div className="d-flex justify-content-between">
                <span className="label-s">Select size</span>
                <a href="#!" className="small text-gold text-decoration-underline" onClick={(e) => { e.preventDefault(); toast('Size guide coming soon'); }}>Size guide</a>
              </div>
              <div className="mt-2">
                {p.sizes.map((s) => (
                  <button key={s} className={`size-btn ${size === s ? 'on' : ''}`} disabled={p.disabledSizes.includes(s)} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3">
            <div className="label-s mb-2">Quantity</div>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><i className="fa-solid fa-minus" /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(p.stock || 1, q + 1))} aria-label="Increase"><i className="fa-solid fa-plus" /></button>
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button className="btn-aur flex-grow-1" onClick={add} disabled={out}><i className="fa-solid fa-bag-shopping" /> {out ? 'Out of stock' : 'Add to cart'}</button>
            <button className="btn-aur-o" onClick={() => toggleWish(p.id)} aria-label="Wishlist"><i className={`${on ? 'fa-solid' : 'fa-regular'} fa-heart`} /></button>
          </div>
          <button className="btn-gold w-100 mt-2" onClick={buy} disabled={out}>Buy now</button>

          <div className="spec mt-4">
            {[
              ['Metal', p.metal], ['Purity', p.purity], ['Gross Weight', p.weight], ['Stone', p.stone],
              ['Availability', out ? 'Out of stock' : p.stock <= 10 ? `In stock · only ${p.stock} left` : 'In stock'],
            ].map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ul className="nav nav-tabs">
          {[['desc', 'Description'], ['rev', `Reviews (${p.reviews})`], ['ship', 'Shipping & Returns']].map(([k, l]) => (
            <li className="nav-item" key={k}><button className={`nav-link ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button></li>
          ))}
        </ul>
        <div className="pt-4">
          {tab === 'desc' && <p style={{ maxWidth: 640 }}>{p.desc}</p>}
          {tab === 'rev' && REVIEWS.map((r) => (
            <div className="review" key={r.name}>
              <div className="d-flex justify-content-between"><b>{r.name}</b><small className="text-muted">{r.date}</small></div>
              <div className="stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <div>{r.text}</div>
            </div>
          ))}
          {tab === 'ship' && <p style={{ maxWidth: 640 }}>Free insured shipping on orders above ₹25,000 (₹750 otherwise). Delivery in 3–5 business days. 15-day no-questions-asked returns and lifetime exchange on gold and diamond jewellery.</p>}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-5">
          <h2 className="sec-title">You may also like</h2>
          <div className="row g-3 g-lg-4">
            {related.map((r) => <div className="col-6 col-md-3" key={r.id}><ProductCard p={r} /></div>)}
          </div>
        </div>
      )}
    </div>
  );
}
