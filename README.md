# AURELIA – React E-Commerce Website

AURELIA is a responsive jewellery e-commerce website built using React and Vite. It includes user authentication screens, product browsing, wishlist, shopping cart, checkout, and order confirmation.

## How to Run
1. Download or clone this repository.
2. Make sure Node.js is installed.
3. Open the project folder in VS Code.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the application in your browser:

   `http://localhost:5173`

### Production Build

To create a production build, run:

```bash
npm run build
```

## Features

### Frontend
- Built using React and Vite.
- Responsive design for desktop and mobile devices.
- Bootstrap navbar and grid system.
- Font Awesome icons through CDN.
- Collapsible hamburger menu for mobile screens.

### Authentication
- Login and registration.
- OTP verification.
- Remember Me functionality.
- Sign out.
- Login-first navigation: users must log in before accessing other pages.

### Pages
- Home
- Rings
- Necklaces
- Earrings
- Bracelets
- Collections (3 sub-pages)
- Product Details
- Search
- Wishlist
- Shopping Cart
- Checkout
- Order Confirmation

### Shopping Features
- Add and remove products from cart.
- Add and remove products from wishlist.
- Apply coupon codes:
  - `FIRST10`
  - `FESTIVE5`
- Shipping and 3% GST calculations.
- Address validation during checkout.
- Cash on Delivery order placement.

### Data Storage
The application uses browser `localStorage` to save:
- User accounts
- Logged-in user details
- Cart items
- Wishlist items
- Applied coupons
- Order history

## Current Limitations / Pending Work

**Backend and API integration is not implemented yet.**

- Products and categories are loaded from the static file `src/data.js`.
- Login and OTP are demo implementations.
- Passwords are currently stored as plain text.
- Cart, wishlist, and orders are stored only in the browser.
- Coupons, stock, and prices are not verified by a server.
- Order emails, order tracking, My Orders, product reviews, and newsletter functionality are not connected.

## Product Images – Pending

There are 12 sample products that currently need product photos.

| Category | Sample Products | Main Photos Needed |
|---|---:|---:|
| Rings | 4 | 4 |
| Necklaces | 3 | 3 |
| Earrings | 3 | 3 |
| Bracelets | 2 | 2 |
| **Total** | **12** | **12** |

Additional images needed:
- Hero banner
- Festive Gold banner
- Login page panel

The four category images are already displayed on the home page. Products without photos use line-drawing fallbacks.

## Payment Options

| Payment Method | Status |
|---|---|
| Cash on Delivery | Working |
| UPI | Displayed, not available |
| Credit / Debit Card | Displayed, not available |
| Net Banking | Displayed, not available |

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Vite
- Font Awesome
- Browser localStorage

---

