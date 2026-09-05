import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// This page implements the "Buy Now" flow described in the README:
// Buy Now -> (if logged out) Signup -> Login -> Checkout, with the item
// already sitting in the cart the whole way through.
export default function BuyNowRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      navigate('/categories', { replace: true });
      return;
    }

    addToCart(product, 1);

    if (!isLoggedIn) {
      navigate('/signup', { state: { from: 'checkout', redirectTo: '/checkout' }, replace: true });
    } else {
      navigate('/checkout', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className="section">
      <div className="container text-center">
        <p className="text-muted">Preparing your order...</p>
      </div>
    </section>
  );
}
