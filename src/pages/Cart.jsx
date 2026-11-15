import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { useStore } from '../store.jsx';
import { fmt } from '../data.js';
import { COUPONS, lines, totals } from '../pricing.js';

export function Summary({ cart, coupon, children }) {
  const t = totals(cart, coupon);
  return (
    <>
      <div className="srow"><span>Subtotal</span><span>{fmt(t.subtotal)}</span></div>
      {t.discount > 0 && <div className="srow"><span className="g">Discount ({t.coupon.label})</span><span className="g">− {fmt(t.discount)}</span></div>}
      <div className="srow"><span>Shipping</span><span className={t.shipping ? '' : 'g'}>{t.shipping ? fmt(t.shipping) : 'FREE'}</span></div>
      <div className="srow"><span>GST (3%)</span><span>{fmt(t.gst)}</span></div>
      <div className="srow total"><span>Total</span><span>{fmt(t.total)}</span></div>
      {children}
    </>
  );
}

export default function Cart() {
  const { cart, setQty, removeFromCart, coupon, setCoupon, toast } = useStore();
  const [code, setCode] = useState(coupon);
  const nav = useNavigate();
  const ls = lines(cart);

  const apply = (e) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    if (COUPONS[c]) { setCoupon(c); toast(`Coupon ${c} applied`); }
    else toast('Invalid coupon code', 'err');
  };

  if (!ls.length) {
    return (
      <div className="container empty">
        <i className="fa-solid fa-bag-shopping d-block" />
        <h2>Your cart is empty</h2>
        <p>Find something you love.</p>
        <Link to="/" className="btn-aur">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <div className="page-head"><h1>Shopping Cart</h1></div>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="box">
            {ls.map(({ p, qty, size }) => (
              <div className="citem" key={`${p.id}-${size}`}>
                <Link to={`/product/${p.id}`} className="cthumb"><Art cat={p.cat} src={p.image} alt={p.name} /></Link>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between gap-2">
                    <div>
                      <Link to={`/product/${p.id}`} className="serif">{p.name}</Link>
                      <div className="small text-muted">{p.metal}{size ? ` · Size ${size}` : ''}</div>
                    </div>
                    <button className="icon-btn" onClick={() => removeFromCart(p.id, size)} aria-label="Remove"><i className="fa-regular fa-trash-can" /></button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="qty">
                      <button onClick={() => setQty(p.id, size, qty - 1)} aria-label="Decrease"><i className="fa-solid fa-minus" /></button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(p.id, size, qty + 1)} aria-label="Increase"><i className="fa-solid fa-plus" /></button>
                    </div>
                    <b>{fmt(p.price * qty)}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="box">
            <h3 className="h5 mb-3">Order Summary</h3>
            <form className="d-flex gap-2 mb-3" onSubmit={apply}>
              <input className="form-control f-control" placeholder="Coupon (try FIRST10)" value={code} onChange={(e) => setCode(e.target.value)} />
              <button className="btn-aur-o" type="submit" style={{ padding: '0 16px' }}>Apply</button>
            </form>
            <Summary cart={cart} coupon={coupon}>
              <button className="btn-aur w-100 mt-3" onClick={() => nav('/checkout')}>Proceed to checkout</button>
              <Link to="/" className="d-block text-center small mt-3 text-muted">Continue shopping</Link>
            </Summary>
          </div>
        </div>
      </div>
    </div>
  );
}
