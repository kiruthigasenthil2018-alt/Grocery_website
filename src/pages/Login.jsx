import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GoogleIcon, AppleIcon } from '../components/OAuthIcons';

export default function Login() {
  const { login, loginWithProvider } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const cameFromWishlist = location.state?.from === 'wishlist';
  const cameFromCheckout = location.state?.from === 'checkout';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function redirectAfterLogin() {
    if (cameFromCheckout) navigate(location.state.redirectTo || '/checkout');
    else if (cameFromWishlist) navigate('/categories');
    else navigate('/');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const result = login(form);
    if (!result.ok) {
      setError(result.message);
      // The exact scenario requested: login attempted without signing up first.
      showToast('Login failed', result.message, 'error');
      return;
    }

    showToast('Welcome back!', 'You are now logged in.', 'success');
    redirectAfterLogin();
  }

  function handleProvider(provider) {
    loginWithProvider(provider);
    showToast('Welcome back!', `Logged in with ${provider === 'google' ? 'Google' : 'Apple'}.`, 'success');
    redirectAfterLogin();
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3>Welcome Back</h3>
        <p className="sub">Log in to continue shopping on GroCo.</p>

        <div className="oauth-col">
          <button type="button" className="btn-oauth btn-oauth-google" onClick={() => handleProvider('google')}>
            <GoogleIcon size={18} /> Continue with Google
          </button>
          <button type="button" className="btn-oauth btn-oauth-apple" onClick={() => handleProvider('apple')}>
            <AppleIcon size={18} /> Continue with Apple
          </button>
        </div>
        <div className="divider-text">or log in with email</div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control"
                required
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-groco-solid w-100">Log In</button>
        </form>

        <div className="auth-switch">
          New to GroCo? <Link to="/signup" state={location.state}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
