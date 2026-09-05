import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GoogleIcon, AppleIcon } from '../components/OAuthIcons';

export default function Signup() {
  const { signup, loginWithProvider } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const cameFromWishlist = location.state?.from === 'wishlist';
  const cameFromCheckout = location.state?.from === 'checkout';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = signup({ name: form.name, email: form.email, password: form.password });
    if (!result.ok) {
      setError(result.message);
      return;
    }

    showToast('Account created', 'Please log in to continue.', 'success');
    navigate('/login', { state: location.state });
  }

  function handleProvider(provider) {
    loginWithProvider(provider);
    showToast('Welcome!', `Signed up with ${provider === 'google' ? 'Google' : 'Apple'}.`, 'success');
    if (cameFromCheckout) navigate(location.state.redirectTo || '/checkout');
    else if (cameFromWishlist) navigate('/categories');
    else navigate('/');
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3>Create Account</h3>
        <p className="sub">
          {cameFromWishlist && 'Sign up to save items to your wishlist.'}
          {cameFromCheckout && 'Sign up to continue to checkout.'}
          {!cameFromWishlist && !cameFromCheckout && 'Join GroCo for fresh groceries, delivered fast.'}
        </p>

        <div className="oauth-col">
          <button type="button" className="btn-oauth btn-oauth-google" onClick={() => handleProvider('google')}>
            <GoogleIcon size={18} /> Continue with Google
          </button>
          <button type="button" className="btn-oauth btn-oauth-apple" onClick={() => handleProvider('apple')}>
            <AppleIcon size={18} /> Continue with Apple
          </button>
        </div>
        <div className="divider-text">or sign up with email</div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="password-field">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                className="form-control"
                required
                value={form.confirm}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password visibility">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-groco-solid w-100">Sign Up</button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login" state={location.state}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
