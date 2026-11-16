import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Art from '../components/Art.jsx';
import { useStore } from '../store.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DEMO = { email: 'demo@aurelia.com', password: 'Aurelia@123' };

export default function Login() {
  const { user, setUser, toast } = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState('login');
  const [mode, setMode] = useState('password'); // password | otp
  const [f, setF] = useState({ email: '', password: '', name: '', phone: '', otp: '' });
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(''); };
  const done = (u) => { setUser(u, remember); toast(`Welcome, ${u.name || u.email}`); nav('/', { replace: true }); };

  if (user) {
    return (
      <div className="container py-5">
        <div className="box mx-auto text-center" style={{ maxWidth: 420 }}>
          <div className="ok-ring"><i className="fa-solid fa-user" /></div>
          <h2 className="h4">You’re signed in</h2>
          <p className="text-muted small">{user.email}</p>
          <div className="d-flex gap-2 justify-content-center">
            <Link to="/" className="btn-aur">Continue shopping</Link>
            <button className="btn-aur-o" onClick={() => { setUser(null); toast('Signed out'); }}>Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  const login = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(f.email)) return setErr('Enter a valid email address.');
    if (f.password.length < 6) return setErr('Password must be at least 6 characters.');
    if (f.email.toLowerCase() === DEMO.email && f.password === DEMO.password) return done({ email: DEMO.email, name: 'Demo' });
    const saved = (() => { try { return JSON.parse(localStorage.getItem('aur_accounts')) || []; } catch { return []; } })();
    const acc = saved.find((a) => a.email === f.email.toLowerCase() && a.password === f.password);
    if (acc) return done({ email: acc.email, name: acc.name });
    setErr('Incorrect email or password. Please try again.');
  };

  const register = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr('Enter your name.');
    if (!EMAIL_RE.test(f.email)) return setErr('Enter a valid email address.');
    if (f.password.length < 8) return setErr('Password must be at least 8 characters.');
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem('aur_accounts')) || []; } catch { /* */ }
    if (saved.some((a) => a.email === f.email.toLowerCase())) return setErr('An account with this email already exists.');
    saved.push({ name: f.name.trim(), email: f.email.toLowerCase(), password: f.password });
    try { localStorage.setItem('aur_accounts', JSON.stringify(saved)); } catch { /* */ }
    done({ email: f.email.toLowerCase(), name: f.name.trim() });
  };

  const otp = (e) => {
    e.preventDefault();
    const ph = f.phone.replace(/\D/g, '');
    if (!otpSent) {
      if (!/^[6-9]\d{9}$/.test(ph)) return setErr('Enter a valid 10-digit mobile number.');
      setOtpSent(true); setErr(''); toast('OTP sent (demo code: 123456)');
      return;
    }
    if (f.otp !== '123456') return setErr('Incorrect OTP. Demo code is 123456.');
    done({ email: `+91 ${ph}`, name: `+91 ${ph}` });
  };

  const field = (label, k, type = 'text', props = {}) => (
    <div className="mb-3">
      <label className="f-label">{label}</label>
      <input type={type} className="form-control f-control" value={f[k]} onChange={set(k)} {...props} />
    </div>
  );

  return (
    <div className="container py-4">
      <div className="auth">
        <div className="auth-l">
          <div className="brand brand-light">AURELIA<span>.</span></div>
          <Art cat="earrings" />
          <div>
            <h2 className="h1 mb-2">Welcome back</h2>
            <p className="small mb-0" style={{ color: '#d9d1c3', maxWidth: 240 }}>Sign in to track orders, save your wishlist and check out faster.</p>
          </div>
        </div>

        <div className="auth-r">
          <div className="tabs-lite">
            <button className={tab === 'login' ? 'on' : ''} onClick={() => { setTab('login'); setErr(''); }}>Login</button>
            <button className={tab === 'register' ? 'on' : ''} onClick={() => { setTab('register'); setErr(''); }}>Register</button>
          </div>

          {tab === 'login' && mode === 'password' && (
            <form onSubmit={login} noValidate>
              {field('Email Address *', 'email', 'email', { autoComplete: 'email' })}
              <div className="mb-2">
                <label className="f-label">Password *</label>
                <div className="pw-wrap">
                  <input type={show ? 'text' : 'password'} className="form-control f-control" value={f.password} onChange={set('password')} autoComplete="current-password" />
                  <button type="button" className="show" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              {err && <div className="err-msg" role="alert">{err}</div>}
              <div className="d-flex justify-content-between align-items-center my-3 small">
                <label className="d-flex gap-2 align-items-center mb-0"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>
                <a href="#!" className="text-gold" onClick={(e) => { e.preventDefault(); toast('Password reset link sent if the email exists'); }}>Forgot password?</a>
              </div>
              <button className="btn-aur w-100" type="submit">Login</button>
              <div className="small text-muted mt-2">Demo: test@aurelia.com / test1234</div>
              <div className="or">OR</div>
              <button type="button" className="btn-aur-o w-100" onClick={() => { setMode('otp'); setErr(''); }}>Continue with OTP</button>
            </form>
          )}

          {tab === 'login' && mode === 'otp' && (
            <form onSubmit={otp} noValidate>
              {field('Mobile Number *', 'phone', 'tel', { inputMode: 'numeric', maxLength: 12, placeholder: '10-digit mobile', disabled: otpSent })}
              {otpSent && field('Enter OTP *', 'otp', 'text', { inputMode: 'numeric', maxLength: 6, placeholder: '6-digit code' })}
              {err && <div className="err-msg mb-2" role="alert">{err}</div>}
              <button className="btn-aur w-100" type="submit">{otpSent ? 'Verify & Login' : 'Send OTP'}</button>
              <div className="or">OR</div>
              <button type="button" className="btn-aur-o w-100" onClick={() => { setMode('password'); setOtpSent(false); setErr(''); }}>Use password instead</button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={register} noValidate>
              {field('Full Name *', 'name', 'text', { autoComplete: 'name' })}
              {field('Email Address *', 'email', 'email', { autoComplete: 'email' })}
              {field('Password * (min 8 characters)', 'password', 'password', { autoComplete: 'new-password' })}
              {err && <div className="err-msg mb-2" role="alert">{err}</div>}
              <button className="btn-aur w-100" type="submit">Create account</button>
            </form>
          )}

          <p className="text-center small text-muted mt-4 mb-0">
            {tab === 'login' ? <>New to Aurelia? <a href="#!" className="fw-semibold text-dark" onClick={(e) => { e.preventDefault(); setTab('register'); setErr(''); }}>Create an account</a></>
              : <>Already registered? <a href="#!" className="fw-semibold text-dark" onClick={(e) => { e.preventDefault(); setTab('login'); setErr(''); }}>Login</a></>}
          </p>
        </div>
      </div>
    </div>
  );
}
