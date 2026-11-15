import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { useStore } from '../store.jsx';
import { fmt } from '../data.js';

export default function Confirmation() {
  const { lastOrder: o } = useStore();
  if (!o) return <Navigate to="/" replace />;
  return (
    <div className="container py-4">
      <div className="steps">
        <span className="done"><span className="n"><i className="fa-solid fa-check" style={{ fontSize: 9 }} /></span>Cart</span>
        <span className="bar" />
        <span className="done"><span className="n"><i className="fa-solid fa-check" style={{ fontSize: 9 }} /></span>Address & Payment</span>
        <span className="bar" />
        <span className="cur"><span className="n">3</span>Confirmation</span>
      </div>

      <div className="box mx-auto text-center" style={{ maxWidth: 620, padding: '36px 24px' }}>
        <div className="ok-ring"><i className="fa-solid fa-check" /></div>
        <h1 className="h2">Thank you for your order!</h1>
        <p className="text-muted small">
          Your order <b className="text-dark">#{o.id}</b> has been placed. A confirmation has been sent to {o.email}
        </p>

        <div className="row g-2 text-start my-4">
          <div className="col-12 col-sm-4"><div className="info-tile"><small>Amount {o.method === 'Cash on Delivery' ? 'due' : 'paid'}</small><b>{fmt(o.total)}</b></div></div>
          <div className="col-6 col-sm-4"><div className="info-tile"><small>Payment</small><b>{o.method}</b></div></div>
          <div className="col-6 col-sm-4"><div className="info-tile"><small>Est. delivery</small><b>{o.eta}</b></div></div>
        </div>

        <div className="text-start border-top pt-2">
          {o.items.map((i) => (
            <div className="sum-item" key={i.id}>
              <div className="cthumb"><Art cat={i.cat} src={i.image} alt={i.name} /></div>
              <div className="flex-grow-1 small">{i.name} × {i.qty}</div>
              <b className="small">{fmt(i.price * i.qty)}</b>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
          <button className="btn-aur" onClick={() => window.alert(`Order ${o.id} is confirmed and being prepared.`)}>Track order</button>
          <Link to="/" className="btn-aur-o">Continue shopping</Link>
        </div>
      </div>
    </div>
  );
}
