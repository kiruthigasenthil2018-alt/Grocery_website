import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const { isLoggedIn } = useAuth();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <section className="section">
        <div className="container text-center">
          <h4>Product not found.</h4>
          <Link to="/categories" className="btn btn-groco-solid mt-3">Back to Categories</Link>
        </div>
      </section>
    );
  }

  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const active = isWishlisted(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function prevImage() {
    setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
  }
  function nextImage() {
    setActiveImage((i) => (i + 1) % gallery.length);
  }

  function handleWishlistClick() {
    if (!isLoggedIn) {
      navigate('/signup', { state: { from: 'wishlist', productId: product.id } });
      return;
    }
    toggleWishlist(product.id);
    showToast(active ? 'Removed from wishlist' : 'Added to wishlist', product.name, 'success');
  }

  function handleAddToCart() {
    addToCart(product, 1);
    showToast('Added to cart', product.name, 'success');
  }

  function handleBuyNow() {
    navigate(`/buy-now/${product.id}`);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="pd-breadcrumb mb-4">
          <Link to="/">Home</Link> <ChevronRight size={14} /> <Link to="/categories">Categories</Link>{' '}
          <ChevronRight size={14} /> <span>{product.name}</span>
        </div>

        <div className="row g-5">
          {/* Gallery */}
          <div className="col-12 col-lg-6">
            <div className="pd-gallery-main" style={{ background: product.bg }}>
              <button
                className={`wishlist-btn ${active ? 'active' : ''}`}
                onClick={handleWishlistClick}
                aria-label="Toggle wishlist"
              >
                <Heart size={16} fill={active ? '#e0692f' : 'none'} />
              </button>
              <img src={gallery[activeImage]} alt={product.name} />
            </div>
            <div className="pd-gallery-nav">
              <button onClick={prevImage} aria-label="Previous image"><ChevronLeft size={18} /></button>
              <div className="pd-thumbs">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${i === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    style={{ background: product.bg }}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
              <button onClick={nextImage} aria-label="Next image"><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* Info */}
          <div className="col-12 col-lg-6">
            <div className="pd-category">{product.category}</div>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-unit">{product.unit}</p>

            <div className="pd-price">
              ₹{product.price}
              <span className="old">₹{product.oldPrice}</span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>{product.rating} out of 5</span>
            </div>

            <p className="pd-description">{product.description}</p>

            <div className="d-flex gap-3 mb-4">
              <button className="btn btn-outline-groco flex-fill" onClick={handleAddToCart}>
                <ShoppingCart size={18} className="me-2" style={{ marginTop: -3 }} />
                Add to Cart
              </button>
              <button className="btn btn-groco-solid flex-fill" onClick={handleBuyNow}>Buy Now</button>
            </div>

            <div className="pd-details-card">
              <h5>Product Details</h5>
              <ul>
                {product.details.map((d, i) => (
                  <li key={i}><CheckCircle2 size={16} /> {d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-5 pt-4">
            <div className="section-title">
              <span className="lead-word">You May Also </span>
              <span className="tag">Like</span>
            </div>
            <div className="row g-4">
              {related.map((p) => (
                <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
