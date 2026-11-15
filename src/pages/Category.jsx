import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductCard.jsx';
import { CATEGORIES, PRODUCTS } from '../data.js';

export function Listing({ title, eyebrow, items, extra }) {
  const [sort, setSort] = useState('featured');
  const [metal, setMetal] = useState('all');
  const metals = useMemo(() => [...new Set(items.map((p) => p.metal))], [items]);

  const shown = useMemo(() => {
    let l = items.filter((p) => metal === 'all' || p.metal === metal);
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price);
    if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [items, sort, metal]);

  return (
    <div className="container pb-4">
      <div className="page-head">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <div className="text-muted small">{shown.length} designs</div>
      </div>
      {extra}
      <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
        <div>
          <button className={`pill ${metal === 'all' ? 'on' : ''}`} onClick={() => setMetal('all')}>All</button>
          {metals.map((m) => (
            <button key={m} className={`pill ${metal === m ? 'on' : ''}`} onClick={() => setMetal(m)}>{m}</button>
          ))}
        </div>
        <select className="form-select aur" style={{ maxWidth: 220 }} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <ProductGrid items={shown} />
    </div>
  );
}

export default function Category() {
  const { slug } = useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const items = PRODUCTS.filter((p) => p.cat === slug);
  if (!cat) return <div className="container empty"><p>Category not found.</p><Link to="/" className="btn-aur">Go home</Link></div>;
  return (
    <>
      <div className="container"><div className="crumbs"><Link to="/">Home</Link> / {cat.name}</div></div>
      <Listing key={slug} title={cat.name} eyebrow="Shop" items={items} />
    </>
  );
}
