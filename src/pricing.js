import { getProduct } from './data.js';

export const COUPONS = { FIRST10: { pct: 10, label: 'FIRST10' }, FESTIVE5: { pct: 5, label: 'FESTIVE5' } };
export const FREE_SHIP_ABOVE = 25000;
export const SHIPPING_FEE = 750;
export const GST = 0.03;
export const COD_LIMIT = 50000;

export function lines(cart) {
  return cart
    .map((x) => ({ ...x, p: getProduct(x.id) }))
    .filter((x) => x.p);
}

export function totals(cart, couponCode) {
  const ls = lines(cart);
  const subtotal = ls.reduce((s, x) => s + x.p.price * x.qty, 0);
  const c = COUPONS[couponCode];
  const discount = c ? Math.round((subtotal * c.pct) / 100) : 0;
  const taxable = subtotal - discount;
  const shipping = subtotal === 0 || taxable >= FREE_SHIP_ABOVE ? 0 : SHIPPING_FEE;
  const gst = Math.round(taxable * GST);
  const total = taxable + shipping + gst;
  return { subtotal, discount, shipping, gst, total, coupon: c };
}
