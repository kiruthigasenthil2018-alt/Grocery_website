import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProductTile from '../components/ProductTile';

export default function Cart() {
  const { items, updateQty, removeFromCart, applyCoupon, coupon, subtotal, discount, shipping, total, freeShippingThreshold } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  function handleApplyCoupon() {
    const result = applyCoupon(couponInput);
    if (result.ok) showToast('Coupon applied', '10% off your order', 'success');
    else showToast('Invalid coupon', result.message);
  }

  function handleCheckout() {
    if (!isLoggedIn) {
      navigate('/signup', { state: { from: 'checkout', redirectTo: '/checkout' } });
      return;
    }
    navigate('/checkout');
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <span className="emoji">🛒</span>
            <h4 style={{ color: 'var(--green)' }}>Your cart is empty</h4>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/categories" className="btn btn-groco-solid">Start Shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">Your </span>
          <span className="tag">Cart</span>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            {remainingForFreeShipping > 0 && (
              <div className="alert" style={{ background: 'var(--peach-light)', color: 'var(--green-dark)', borderRadius: 12 }}>
                Add ₹{remainingForFreeShipping} more to get <strong>free delivery</strong>!
              </div>
            )}
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="product-media" style={{ background: item.bg }}>
                  <ProductTile product={item} />
                </div>
                <div className="flex-grow-1">
                  <h6 style={{ color: 'var(--green)', fontWeight: 800 }}>{item.name}</h6>
                  <div className="text-muted" style={{ fontSize: '0.85rem' }}>{item.unit} • ₹{item.price}</div>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                </div>
                <div className="fw-bold" style={{ minWidth: 70, textAlign: 'right', color: 'var(--green-dark)' }}>
                  ₹{item.price * item.qty}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  style={{ background: 'none', border: 'none', color: '#c0392b' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-4">
            <div className="summary-card">
              <h5 style={{ color: 'var(--green)', fontWeight: 800 }}>Order Summary</h5>
              <div className="coupon-row my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button className="btn btn-outline-groco" onClick={handleApplyCoupon}>Apply</button>
              </div>
              <div className="coupon-hint mb-3">Try <strong>SAVE10</strong> for 10% off your order.</div>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              {coupon && <div className="summary-row"><span>Discount ({coupon.code})</span><span>-₹{discount}</span></div>}
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
              <button className="btn btn-groco-solid w-100 mt-3" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
