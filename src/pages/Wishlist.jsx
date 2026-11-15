import React from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/ProductCard.jsx';
import { useStore } from '../store.jsx';
import { PRODUCTS } from '../data.js';

export default function Wishlist() {
  const { wish } = useStore();
  const items = PRODUCTS.filter((p) => wish.includes(p.id));
  return (
    <div className="container pb-5">
      <div className="page-head"><div className="eyebrow">Saved</div><h1>Your Wishlist</h1></div>
      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty">
          <i className="fa-regular fa-heart d-block" />
          <p>Nothing saved yet. Tap the heart on any piece you love.</p>
          <Link to="/" className="btn-aur">Start browsing</Link>
        </div>
      )}
    </div>
  );
}
