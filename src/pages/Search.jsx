import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductCard.jsx';
import { PRODUCTS } from '../data.js';

export default function Search() {
  const [sp] = useSearchParams();
  const q = (sp.get('q') || '').toLowerCase().trim();
  const items = PRODUCTS.filter((p) => `${p.name} ${p.cat} ${p.metal} ${p.stone}`.toLowerCase().includes(q));
  return (
    <div className="container pb-5">
      <div className="page-head">
        <div className="eyebrow">Search</div>
        <h1>Results for “{sp.get('q')}”</h1>
        <div className="text-muted small">{items.length} found</div>
      </div>
      <ProductGrid items={items} />
    </div>
  );
}
