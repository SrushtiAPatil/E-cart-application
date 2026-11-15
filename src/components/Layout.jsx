import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/category/rings', label: 'Rings' },
  { to: '/category/necklaces', label: 'Necklaces' },
  { to: '/category/earrings', label: 'Earrings' },
  { to: '/category/bracelets', label: 'Bracelets' },
  { to: '/collections', label: 'Collections' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { cartCount, wish, user } = useStore();
  const nav = useNavigate();
  const loc = useLocation();

  // close the mobile menu whenever the route changes
  useEffect(() => { setOpen(false); }, [loc.pathname, loc.search]);

  const submit = (e) => {
    e.preventDefault();
    const t = q.trim();
    if (t) nav('/search?q=' + encodeURIComponent(t));
  };

  return (
    <>
      <div className="topbar text-center">
        Free insured shipping on orders above ₹25,000 <span className="d-none d-sm-inline">· BIS Hallmarked Gold · Lifetime Exchange</span>
      </div>
      <nav className="navbar navbar-expand-lg site-nav sticky-top">
        <div className="container">
          <button
            className="navbar-toggler border-0 px-1 me-2"
            type="button"
            aria-controls="mainNav"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
          </button>

          <Link className="navbar-brand brand" to="/">AURELIA<span>.</span></Link>

          <div className="nav-icons order-lg-3 ms-auto ms-lg-3">
            <Link to="/login" className="nav-icon" aria-label="Account" title={user ? user.email : 'Login'}>
              <i className={user ? 'fa-solid fa-user' : 'fa-regular fa-user'} />
            </Link>
            <Link to="/wishlist" className="nav-icon" aria-label="Wishlist">
              <i className="fa-regular fa-heart" />
              {wish.length > 0 && <span className="count-badge">{wish.length}</span>}
            </Link>
            <Link to="/cart" className="nav-icon" aria-label="Cart">
              <i className="fa-solid fa-bag-shopping" />
              {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
            </Link>
          </div>

          <div className={`collapse navbar-collapse order-lg-2 ${open ? 'show' : ''}`} id="mainNav">
            <ul className="navbar-nav mx-lg-auto mb-3 mb-lg-0 mt-3 mt-lg-0">
              {LINKS.map((l) => (
                <li className="nav-item" key={l.to}>
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to={l.to} end={l.end}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <form className="search-form mb-3 mb-lg-0" onSubmit={submit} role="search">
              <i className="fa-solid fa-magnifying-glass" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search rings, necklaces..." aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  const { toast } = useStore();
  const [email, setEmail] = useState('');
  const join = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email address', 'err');
    toast('Thanks for subscribing!');
    setEmail('');
  };
  const soon = (e) => { e.preventDefault(); toast('This page is coming soon'); };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-4 col-lg-3">
            <Link className="brand brand-light" to="/">AURELIA<span>.</span></Link>
            <p className="mt-3 small foot-text">Handcrafted fine jewellery since 1998. Certified diamonds and BIS hallmarked gold.</p>
            <div className="social mt-3">
              {['instagram', 'facebook-f', 'whatsapp', 'youtube'].map((n) => (
                <a href="#!" key={n} onClick={soon} aria-label={n}><i className={`fa-brands fa-${n}`} /></a>
              ))}
            </div>
          </div>
          <div className="col-6 col-md-2 col-lg-2 offset-lg-1">
            <h6 className="foot-h">Shop</h6>
            <ul className="list-unstyled foot-links">
              {['rings', 'necklaces', 'earrings', 'bracelets'].map((c) => (
                <li key={c}><Link to={`/category/${c}`} style={{ textTransform: 'capitalize' }}>{c}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="foot-h">Help</h6>
            <ul className="list-unstyled foot-links">
              {['Track Order', 'Returns', 'Size Guide', 'FAQs'].map((t) => <li key={t}><a href="#!" onClick={soon}>{t}</a></li>)}
            </ul>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="foot-h">Company</h6>
            <ul className="list-unstyled foot-links">
              {['About Us', 'Stores', 'Careers', 'Contact'].map((t) => <li key={t}><a href="#!" onClick={soon}>{t}</a></li>)}
            </ul>
          </div>
          <div className="col-12 col-lg-2">
            <h6 className="foot-h">Newsletter</h6>
            <p className="small foot-text mb-2">Get early access to new collections.</p>
            <form className="news-form" onSubmit={join} noValidate>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Email" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className="foot-bottom d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>© 2026 Aurelia Jewels. All rights reserved.</span>
          <span>Privacy · Terms · Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
}

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-i ${t.type === 'err' ? 'err' : ''}`}>
          <i className={`fa-solid ${t.type === 'err' ? 'fa-circle-exclamation' : 'fa-circle-check'}`} />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
