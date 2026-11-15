import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from './data.js';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const load = (k, d) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };
const sload = (k, d) => { try { const v = JSON.parse(sessionStorage.getItem(k)); return v ?? d; } catch { return d; } };
const ssave = (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('aur_cart', []));        // [{id,size,qty}]
  const [wish, setWish] = useState(() => load('aur_wish', []));        // [id]
  const [user, setUserState] = useState(() => load('aur_user', null) || sload('aur_user', null));
  const [orders, setOrders] = useState(() => load('aur_orders', []));
  const [lastOrder, setLastOrder] = useState(() => load('aur_order', null));
  const [coupon, setCoupon] = useState(() => load('aur_coupon', ''));
  const [toasts, setToasts] = useState([]);

  useEffect(() => { save('aur_coupon', coupon); }, [coupon]);
  useEffect(() => { save('aur_cart', cart); }, [cart]);
  useEffect(() => { save('aur_wish', wish); }, [wish]);
  useEffect(() => { save('aur_orders', orders); }, [orders]);
  useEffect(() => { save('aur_order', lastOrder); }, [lastOrder]);

  // remember=true -> localStorage (stays logged in); false -> sessionStorage (until the tab closes)
  const setUser = (u, remember = true) => {
    try { localStorage.removeItem('aur_user'); sessionStorage.removeItem('aur_user'); } catch { /* ignore */ }
    if (u) (remember ? save : ssave)('aur_user', u);
    setUserState(u);
  };
  const placeOrder = (o) => { setLastOrder(o); setOrders((x) => [o, ...x]); };

  const toast = useCallback((msg, type = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const addToCart = (id, qty = 1, size = null) => {
    const p = getProduct(id);
    if (!p || p.stock <= 0) { toast('This item is out of stock', 'err'); return false; }
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id && x.size === size);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: Math.min(n[i].qty + qty, p.stock) };
        return n;
      }
      return [...c, { id, size, qty: Math.min(qty, p.stock) }];
    });
    toast('Added to cart');
    return true;
  };
  const setQty = (id, size, qty) => {
    const p = getProduct(id);
    setCart((c) => c.map((x) => (x.id === id && x.size === size ? { ...x, qty: Math.max(1, Math.min(qty, p.stock)) } : x)));
  };
  const removeFromCart = (id, size) => setCart((c) => c.filter((x) => !(x.id === id && x.size === size)));
  const clearCart = () => setCart([]);

  const toggleWish = (id) => {
    setWish((w) => {
      const has = w.includes(id);
      toast(has ? 'Removed from wishlist' : 'Saved to wishlist');
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  };

  const value = useMemo(
    () => ({
      cart, wish, user, setUser, orders, placeOrder, lastOrder, setLastOrder, toasts, toast, coupon, setCoupon,
      addToCart, setQty, removeFromCart, clearCart, toggleWish,
      cartCount: cart.reduce((s, x) => s + x.qty, 0),
    }),
    // eslint-disable-next-line
    [cart, wish, user, orders, lastOrder, toasts, coupon]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
