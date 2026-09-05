import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, X, Menu, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProductTile from './ProductTile';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const accountRef = useRef(null);
  const navigate = useNavigate();
  const { wishlist, clearWishlist } = useWishlist();
  const { count } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { showToast } = useToast();

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : [];

  // Fix: search now closes on outside click, Escape, or when a result/route is chosen.
  useEffect(() => {
    function handleClick(e) {
      if (searchOpen && panelRef.current && !panelRef.current.contains(e.target)) {
        closeSearch();
      }
      if (accountOpen && accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [searchOpen, accountOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        closeSearch();
        setAccountOpen(false);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery('');
  }

  function goToCategories() {
    closeSearch();
    setMobileOpen(false);
    navigate('/categories');
  }

  function goToProduct(productId) {
    closeSearch();
    setMobileOpen(false);
    navigate(`/product/${productId}`);
  }

  function goTo(path) {
    setAccountOpen(false);
    setMobileOpen(false);
    navigate(path);
  }

  function handleLogout() {
    setAccountOpen(false);
    logout();
    clearWishlist();
    showToast('Logged out', 'You have been signed out.', 'success');
    navigate('/');
  }

  return (
    <>
      <header className="site-header">
        <div className="container d-flex align-items-center justify-content-between">
          <NavLink to="/" className="brand-logo">
            <span className="logo-badge">🧺</span> GroCo
          </NavLink>

          <nav className="nav-links d-none d-md-flex">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>Categories</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
          </nav>

          <div className="d-flex align-items-center">
            <button className="mobile-nav-toggle me-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Open menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="nav-icons d-flex align-items-center">
              <button className="icon-search" onClick={openSearch} aria-label="Search"><Search size={19} /></button>
              <button className="icon-wishlist" onClick={() => navigate('/wishlist')} aria-label="Wishlist">
                <Heart size={19} fill={wishlist.length > 0 ? 'var(--green)' : 'none'} />
                {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
              </button>
              <button className="icon-cart" onClick={() => navigate('/cart')} aria-label="Cart">
                <ShoppingCart size={19} />
                {count > 0 && <span className="badge-count">{count}</span>}
              </button>
              <div className="account-menu-wrap" ref={accountRef}>
                <button
                  className="icon-account"
                  aria-label="Account"
                  aria-haspopup="true"
                  aria-expanded={accountOpen}
                  title={isLoggedIn ? `Logged in as ${user?.name}` : 'Account'}
                  onClick={() => setAccountOpen((v) => !v)}
                >
                  <User size={19} />
                </button>

                {accountOpen && (
                  <div className="account-dropdown" role="menu">
                    {isLoggedIn ? (
                      <>
                        <div className="account-header">
                          <div className="name">{user?.name}</div>
                          <div className="email">{user?.email}</div>
                        </div>
                        <button onClick={() => goTo('/order-tracking')}>
                          <Package size={16} /> My Orders
                        </button>
                        <button onClick={() => goTo('/wishlist')}>
                          <Heart size={16} /> Wishlist
                        </button>
                        <button className="danger" onClick={handleLogout}>
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => goTo('/login')}>
                          <LogIn size={16} /> Log In
                        </button>
                        <button onClick={() => goTo('/signup')}>
                          <UserPlus size={16} /> Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="container d-md-none mt-3 d-flex flex-column">
            <NavLink onClick={() => setMobileOpen(false)} to="/" end className="py-2">Home</NavLink>
            <NavLink onClick={() => setMobileOpen(false)} to="/about" className="py-2">About Us</NavLink>
            <NavLink onClick={() => setMobileOpen(false)} to="/categories" className="py-2">Categories</NavLink>
            <NavLink onClick={() => setMobileOpen(false)} to="/contact" className="py-2">Contact</NavLink>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="search-backdrop" role="dialog" aria-modal="true">
          <div className="search-panel" ref={panelRef}>
            <div className="search-input-row">
              <Search size={18} color="#6b7280" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for vegetables, fruits, dairy..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="close-btn" onClick={closeSearch} aria-label="Close search">
                <X size={20} />
              </button>
            </div>

            {query.trim() && (
              <div className="search-results">
                {results.length === 0 ? (
                  <p className="text-muted mt-3 mb-1">No products found for "{query}".</p>
                ) : (
                  results.map((p) => (
                    <div key={p.id} className="search-result-item" onClick={() => goToProduct(p.id)}>
                      <div className="search-result-emoji" style={{ background: p.bg }}>
                        <ProductTile product={p} emojiOnly />
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--green)' }}>{p.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{p.category} • ₹{p.price}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
