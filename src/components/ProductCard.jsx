import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductTile from './ProductTile';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const active = isWishlisted(product.id);

  function handleWishlistClick() {
    if (!isLoggedIn) {
      // Not signed in -> send to create an account first, then log in.
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
    <div className="product-card">
      <button
        className={`wishlist-btn ${active ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label="Toggle wishlist"
      >
        <Heart size={16} fill={active ? '#e0692f' : 'none'} />
      </button>
      <Link to={`/product/${product.id}`} className="product-media" style={{ background: product.bg }}>
        <ProductTile product={product} />
      </Link>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <h6>{product.name}</h6>
      </Link>
      <div className="product-unit">{product.unit}</div>
      <div className="product-price mb-1">
        ₹{product.price}
        <span className="old">₹{product.oldPrice}</span>
      </div>
      <div className="mb-2"><StarRating rating={product.rating} /></div>
      <button className="btn btn-outline-groco w-100 mb-2" onClick={handleAddToCart}>Add to Cart</button>
      <button className="btn btn-groco-solid w-100" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
