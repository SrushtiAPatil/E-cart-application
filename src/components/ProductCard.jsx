import React from 'react';
import { Link } from 'react-router-dom';
import Art from './Art.jsx';
import { useStore } from '../store.jsx';
import { fmt, offPct } from '../data.js';

export function Stars({ rating, reviews }) {
  const full = Math.round(rating);
  return (
    <div className="stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      <small>{rating}{reviews != null && ` (${reviews})`}</small>
    </div>
  );
}

export default function ProductCard({ p }) {
  const { wish, toggleWish } = useStore();
  const on = wish.includes(p.id);
  const off = offPct(p);
  return (
    <div className="pcard">
      <Link to={`/product/${p.id}`} className="pimg" aria-label={p.name}>
        {p.stock <= 0 ? (
          <span className="tag oos">Out of stock</span>
        ) : p.tags.includes('new') ? (
          <span className="tag">New</span>
        ) : p.tags.includes('bestseller') ? (
          <span className="tag bestseller">Bestseller</span>
        ) : null}
        <Art cat={p.cat} src={p.image} alt={p.name} />
      </Link>
      <button className={`wbtn ${on ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist" aria-pressed={on}>
        <i className={`${on ? 'fa-solid' : 'fa-regular'} fa-heart`} />
      </button>
      <Link to={`/product/${p.id}`} className="pbody d-block">
        <div className="pmeta">{p.cat} · {p.metal}</div>
        <div className="pname">{p.name}</div>
        <Stars rating={p.rating} reviews={p.reviews} />
        <div className="mt-1">
          <span className="price">{fmt(p.price)}</span>
          {off > 0 && <><span className="mrp">{fmt(p.mrp)}</span><span className="off">{off}% off</span></>}
        </div>
      </Link>
    </div>
  );
}

export function ProductGrid({ items }) {
  if (!items.length) {
    return (
      <div className="empty">
        <i className="fa-regular fa-gem d-block" />
        <p>No products found.</p>
        <Link to="/" className="btn-aur mt-2">Back to home</Link>
      </div>
    );
  }
  return (
    <div className="row g-3 g-lg-4">
      {items.map((p) => (
        <div className="col-6 col-md-4 col-lg-3" key={p.id}><ProductCard p={p} /></div>
      ))}
    </div>
  );
}
