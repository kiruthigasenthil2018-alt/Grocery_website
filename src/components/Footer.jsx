import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--green-dark)', color: '#dfe9df', padding: '40px 0 20px', marginTop: 'auto' }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="footer-title" style={{ color: '#fff', fontWeight: 800, marginBottom: 14, fontFamily: 'var(--font-head)' }}>🧺 GroCo</div>
            <p>Fresh and organic groceries delivered to your doorstep, every day.</p>
          </div>
          <div className="col-6 col-md-4">
            <div className="footer-title" style={{ color: '#fff', fontWeight: 800, marginBottom: 14, fontFamily: 'var(--font-head)' }}>Quick Links</div>
            <div className="d-flex flex-column gap-2">
              <Link to="/" style={{ color: '#cfe3cf' }}>Home</Link>
              <Link to="/about" style={{ color: '#cfe3cf' }}>About Us</Link>
              <Link to="/categories" style={{ color: '#cfe3cf' }}>Categories</Link>
              <Link to="/contact" style={{ color: '#cfe3cf' }}>Contact</Link>
              <Link to="/order-tracking" style={{ color: '#cfe3cf' }}>Track Order</Link>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="footer-title" style={{ color: '#fff', fontWeight: 800, marginBottom: 14, fontFamily: 'var(--font-head)' }}>Contact</div>
            <p className="mb-1">📍 Chennai, Tamil Nadu, India</p>
            <p className="mb-1">📞 +91 98765 43210</p>
            <p>✉ support@groco.com</p>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <p className="text-center mb-0" style={{ fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} GroCo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
