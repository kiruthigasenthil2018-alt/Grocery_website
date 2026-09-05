import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap any route that requires login (checkout, payment) with this.
// Unauthenticated visitors are sent to Signup first, matching the
// "Buy Now -> Signup -> Login -> Checkout" flow described in the README.
export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signup" state={{ from: 'checkout', redirectTo: location.pathname }} replace />;
  }

  return children;
}
