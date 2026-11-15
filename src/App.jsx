import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, Link } from 'react-router-dom';
import { useStore } from './store.jsx';
import { Footer, Navbar, Toasts } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Collections from './pages/Collections.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import Login from './pages/Login.jsx';
import Search from './pages/Search.jsx';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}


function Protected({ children }) {
  const { user, toast } = useStore();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!user && pathname !== '/') toast('Please log in to continue', 'err');
  }, [user, pathname]); // eslint-disable-line
  return user ? children : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="container empty">
      <i className="fa-regular fa-face-frown d-block" />
      <h2>Page not found</h2>
      <Link to="/" className="btn-aur mt-3">Go home</Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Protected><Home /></Protected>} />
          <Route path="/category/:slug" element={<Protected><Category /></Protected>} />
          <Route path="/collections" element={<Protected><Collections /></Protected>} />
          <Route path="/collections/:slug" element={<Protected><Collections /></Protected>} />
          <Route path="/product/:id" element={<Protected><Product /></Protected>} />
          <Route path="/search" element={<Protected><Search /></Protected>} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
          <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/confirmation" element={<Protected><Confirmation /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toasts />
    </>
  );
}
