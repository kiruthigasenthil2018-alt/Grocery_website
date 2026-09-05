import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Stepper from '../components/Stepper';
import ProductTile from '../components/ProductTile';

export default function OrderConfirmation() {
  const orderId = useMemo(() => `GRC${Math.floor(100000 + Math.random() * 900000)}`, []);

  const order = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('groco_last_order')) || null;
    } catch {
      return null;
    }
  }, []);

  const items = order?.items || [];
  const subtotal = order?.subtotal ?? 0;
  const shipping = order?.shipping ?? 0;
  const total = order?.total ?? 0;

  return (
    <section className="section" style={{ background: 'var(--peach-light)' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h2 className="text-center" style={{ color: 'var(--green)', fontWeight: 800 }}>Thank You!</h2>

        <Stepper current={3} />

        <div className="text-center mb-4">
          <CheckCircle2 size={72} color="var(--green)" style={{ background: '#fff', borderRadius: '50%' }} />
          <h3 className="mt-3" style={{ color: 'var(--green-dark)', fontWeight: 800 }}>Payment Confirmed</h3>
          <p className="text-muted">
            Thank you for your purchase! Your order <strong>#{orderId}</strong> has been successfully processed.
          </p>
        </div>

        <div className="summary-card">
          <h5 style={{ color: 'var(--green)', fontWeight: 800 }}>Order Summary</h5>

          {items.length === 0 ? (
            <p className="text-muted mt-3 mb-0">Your order details aren't available in this session anymore.</p>
          ) : (
            <div className="mt-3">
              {items.map((it) => (
                <div className="order-summary-row" key={it.id}>
                  <div className="order-summary-media" style={{ background: it.bg }}>
                    <ProductTile product={it} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold" style={{ color: 'var(--green)' }}>{it.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>Quantity: {it.qty}</div>
                  </div>
                  <div className="fw-bold" style={{ color: 'var(--green-dark)' }}>₹{it.price * it.qty}</div>
                </div>
              ))}

              <div className="summary-row mt-3"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
              <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
            </div>
          )}
        </div>

        <div className="text-center mt-5">
          <h5 style={{ color: 'var(--green)', fontWeight: 800 }}>Next Steps</h5>
          <p className="text-muted mb-1">
            You will receive an email confirmation shortly with your order details and tracking information.
          </p>
          <p className="text-muted">If you have any questions, please contact our support team.</p>

          <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
            <Link to="/categories" className="btn btn-groco-solid">Continue Shopping</Link>
            <Link to="/order-tracking" className="btn btn-outline-groco">View Tracking Details</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
