import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <span className="emoji">💚</span>
            <h4 style={{ color: 'var(--green)' }}>Your wishlist is empty</h4>
            <p>Tap the heart on any product to save it here.</p>
            <Link to="/categories" className="btn btn-groco-solid">Browse Products</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">Your </span>
          <span className="tag">Wishlist</span>
        </div>
        <div className="row g-4">
          {items.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
