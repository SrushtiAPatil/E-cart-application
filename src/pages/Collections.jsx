import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Listing } from './Category.jsx';
import { COLLECTIONS, PRODUCTS } from '../data.js';

export default function Collections() {
  const { slug } = useParams();
  const col = COLLECTIONS.find((c) => c.slug === slug);

  if (slug && !col) return <div className="container empty"><p>Collection not found.</p><Link to="/collections" className="btn-aur">All collections</Link></div>;

  if (col) {
    const items = PRODUCTS.filter((p) => p.collection === slug);
    return (
      <>
        <div className="container"><div className="crumbs"><Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {col.name}</div></div>
        <Listing key={slug} title={col.name} eyebrow="Collection" items={items}
          extra={<p className="text-center text-muted mb-4">{col.blurb}</p>} />
      </>
    );
  }

  return (
    <div className="container pb-5">
      <div className="page-head">
        <div className="eyebrow">Curated for you</div>
        <h1>Collections</h1>
      </div>
      <div className="row g-3 g-lg-4">
        {COLLECTIONS.map((c) => (
          <div className="col-12 col-md-4" key={c.slug}>
            <Link to={`/collections/${c.slug}`} className="box d-block h-100 text-center">
              <div className="eyebrow">{PRODUCTS.filter((p) => p.collection === c.slug).length} designs</div>
              <h3 className="my-2">{c.name}</h3>
              <p className="text-muted small mb-3">{c.blurb}</p>
              <span className="btn-aur-o">Explore <i className="fa-solid fa-arrow-right" /></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
