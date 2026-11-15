import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { Summary } from './Cart.jsx';
import { useStore } from '../store.jsx';
import { fmt } from '../data.js';
import { lines, totals } from '../pricing.js';

const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

// Only Cash on Delivery is active. The others are shown as options but can't be selected.
const METHODS = [
  { k: 'upi', icon: 'fa-mobile-screen-button', t: 'UPI', s: 'Google Pay, PhonePe, Paytm', soon: true },
  { k: 'card', icon: 'fa-credit-card', t: 'Credit / Debit Card', s: 'Visa, Mastercard, RuPay', soon: true },
  { k: 'netbanking', icon: 'fa-building-columns', t: 'Net Banking', s: 'All major banks', soon: true },
  { k: 'cod', icon: 'fa-money-bill-wave', t: 'Cash on Delivery', s: 'Pay in cash when your order arrives' },
];

const validateAddress = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your full name';
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, ''))) e.phone = 'Enter a valid 10-digit mobile number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address';
  if (f.addr1.trim().length < 5) e.addr1 = 'Enter your address';
  if (f.city.trim().length < 2) e.city = 'Enter your city';
  if (!f.state) e.state = 'Select a state';
  if (!/^[1-9]\d{5}$/.test(f.pin)) e.pin = 'Pincode must be 6 digits';
  return e;
};

function Field({ label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="f-label">{label}</label>
      {children}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default function Checkout() {
  const { cart, coupon, user, placeOrder, clearCart, toast } = useStore();
  const nav = useNavigate();
  const ls = lines(cart);
  const t = totals(cart, coupon);

  const [f, setF] = useState({ name: '', phone: '', email: user?.email || '', addr1: '', addr2: '', city: '', state: '', pin: '', save: true });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const errs = validateAddress(f);
  const show = (k) => (submitted || touched[k]) && errs[k];
  const bad = (k) => (show(k) ? 'is-invalid' : '');
  const setField = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const blur = (k) => () => setTouched((x) => ({ ...x, [k]: true }));

  if (!ls.length) {
    return (
      <div className="container empty">
        <i className="fa-solid fa-bag-shopping d-block" />
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn-aur mt-2">Continue shopping</Link>
      </div>
    );
  }

  const tryMethod = (m) => {
    if (m.soon) toast(`${m.t} is not available yet. Please choose Cash on Delivery.`, 'err');
  };

  const place = async () => {
    setSubmitted(true);
    if (Object.keys(errs).length) {
      toast('Please fix the highlighted fields', 'err');
      requestAnimationFrame(() => document.querySelector('.is-invalid, .invalid-feedback')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));

    const id = 'AUR-2026-' + (10000 + Math.floor(Math.random() * 89999));
    const d = new Date(); d.setDate(d.getDate() + 4);
    const d2 = new Date(); d2.setDate(d2.getDate() + 6);
    const pretty = (x) => x.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    placeOrder({
      id, email: f.email, total: t.total, date: new Date().toISOString(),
      method: 'Cash on Delivery',
      eta: `${pretty(d)} – ${pretty(d2)} ${d2.getFullYear()}`,
      items: ls.map((x) => ({ id: x.p.id, name: x.p.name, cat: x.p.cat, image: x.p.image, qty: x.qty, price: x.p.price })),
    });
    clearCart();
    nav('/confirmation');
  };

  return (
    <div className="container pb-4">
      <div className="steps">
        <span className="done"><span className="n"><i className="fa-solid fa-check" style={{ fontSize: 9 }} /></span>Cart</span>
        <span className="bar" />
        <span className="cur"><span className="n">2</span>Address & Payment</span>
        <span className="bar" />
        <span><span className="n">3</span>Confirmation</span>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {/* ADDRESS */}
          <div className="box mb-4">
            <h2 className="h4 mb-3">Shipping Address</h2>
            <div className="row g-3">
              <Field className="col-12 col-sm-6" label="Full Name *" error={show('name')}>
                <input className={`form-control f-control ${bad('name')}`} value={f.name} onChange={setField('name')} onBlur={blur('name')} autoComplete="name" />
              </Field>
              <Field className="col-12 col-sm-6" label="Phone Number *" error={show('phone')}>
                <input className={`form-control f-control ${bad('phone')}`} inputMode="numeric" maxLength={12} placeholder="10-digit mobile" value={f.phone} onChange={setField('phone')} onBlur={blur('phone')} autoComplete="tel" />
              </Field>
              <Field className="col-12" label="Email *" error={show('email')}>
                <input type="email" className={`form-control f-control ${bad('email')}`} value={f.email} onChange={setField('email')} onBlur={blur('email')} autoComplete="email" />
              </Field>
              <Field className="col-12" label="Address Line 1 *" error={show('addr1')}>
                <input className={`form-control f-control ${bad('addr1')}`} value={f.addr1} onChange={setField('addr1')} onBlur={blur('addr1')} autoComplete="address-line1" />
              </Field>
              <Field className="col-12" label="Address Line 2">
                <input className="form-control f-control" placeholder="e.g. Landmark (optional)" value={f.addr2} onChange={setField('addr2')} />
              </Field>
              <Field className="col-12 col-sm-4" label="City *" error={show('city')}>
                <input className={`form-control f-control ${bad('city')}`} value={f.city} onChange={setField('city')} onBlur={blur('city')} />
              </Field>
              <Field className="col-12 col-sm-4" label="State *" error={show('state')}>
                <select className={`form-select f-control ${bad('state')}`} value={f.state} onChange={setField('state')} onBlur={blur('state')}>
                  <option value="">Select state</option>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field className="col-12 col-sm-4" label="Pincode *" error={show('pin')}>
                <input className={`form-control f-control ${bad('pin')}`} inputMode="numeric" maxLength={6} value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, '') })} onBlur={blur('pin')} autoComplete="postal-code" />
              </Field>
              <div className="col-12">
                <label className="d-flex align-items-center gap-2 small">
                  <input type="checkbox" checked={f.save} onChange={setField('save')} /> Save this address for future orders
                </label>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="box">
            <h2 className="h4 mb-3">Payment Method</h2>
            {METHODS.map((m) => {
              const selected = m.k === 'cod';
              return (
                <div key={m.k} className={`pay-opt ${selected ? 'sel' : ''} ${m.soon ? 'dis' : ''}`}>
                  <label className="pay-head mb-0" style={{ cursor: m.soon ? 'not-allowed' : 'pointer' }} onClick={() => tryMethod(m)}>
                    <input type="radio" name="pay" checked={selected} disabled={m.soon} readOnly />
                    <span className="ico"><i className={`fa-solid ${m.icon}`} /></span>
                    <span className="flex-grow-1"><b>{m.t}</b><small>{m.s}</small></span>
                    {m.soon && <span className="small text-muted fst-italic">Unavailable</span>}
                  </label>
                  {selected && (
                    <div className="pay-panel pt-3 small text-muted">
                      Please keep the exact amount of <b>{fmt(t.total)}</b> ready when your order is delivered.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-12 col-lg-4">
          <div className="box" style={{ position: 'sticky', top: 90 }}>
            <h2 className="h4 mb-3">Your Order</h2>
            {ls.map(({ p, qty }) => (
              <div className="sum-item" key={p.id + '-' + qty}>
                <div className="cthumb"><span className="q">{qty}</span><Art cat={p.cat} src={p.image} alt={p.name} /></div>
                <div className="flex-grow-1 small"><div className="serif">{p.name}</div><span className="text-muted">{p.metal}</span></div>
                <b className="small">{fmt(p.price * qty)}</b>
              </div>
            ))}
            <hr />
            <Summary cart={cart} coupon={coupon}>
              <button className="btn-aur w-100 mt-3" onClick={place} disabled={busy}>
                {busy ? <><span className="spinner-border spinner-border-sm" /> Placing order…</> : 'Place order'}
              </button>
              <div className="hint-err" role="alert">
                {submitted && Object.keys(errs).length ? 'Please fix the highlighted fields to continue' : ''}
              </div>
              <div className="secure"><i className="fa-solid fa-lock" /> Secure, encrypted checkout</div>
            </Summary>
          </div>
        </div>
      </div>
    </div>
  );
}
