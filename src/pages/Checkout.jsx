import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Smartphone, Landmark, Banknote } from 'lucide-react';
import Stepper from '../components/Stepper';
import { useCart } from '../context/CartContext';

const METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'netbanking', label: 'Netbanking', icon: Landmark },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
];

// Field-level validation for the shipping form. Each validator returns an
// error message string, or '' when the value is valid.
function validateField(field, value, allValues) {
  const v = value.trim();
  switch (field) {
    case 'name':
      if (!v) return 'Full name is required.';
      if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(v)) return 'Enter a valid name (letters only, at least 2 characters).';
      return '';
    case 'address':
      if (!v) return 'Address is required.';
      if (v.length < 8) return 'Enter a complete address (at least 8 characters).';
      return '';
    case 'city':
      if (!v) return 'City is required.';
      if (!/^[A-Za-z\s.'-]{2,40}$/.test(v)) return 'Enter a valid city name (letters only).';
      return '';
    case 'pincode':
      if (!v) return 'Pincode is required.';
      if (!/^[1-9][0-9]{5}$/.test(v)) return 'Enter a valid 6-digit pincode.';
      return '';
    case 'phone':
      if (!v) return 'Phone number is required.';
      if (!/^[6-9][0-9]{9}$/.test(v)) return 'Enter a valid 10-digit mobile number.';
      return '';
    default:
      return '';
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, shipping: shippingFee, total, clearCart } = useCart();
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', pincode: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [method, setMethod] = useState('card');

  if (items.length === 0) {
    navigate('/cart', { replace: true });
    return null;
  }

  function handleFieldChange(field, value) {
    // Keep pincode/phone numeric-only as the person types.
    const cleaned = (field === 'pincode' || field === 'phone') ? value.replace(/\D/g, '') : value;
    const maxLen = field === 'pincode' ? 6 : field === 'phone' ? 10 : undefined;
    const next = maxLen ? cleaned.slice(0, maxLen) : cleaned;
    const updated = { ...shipping, [field]: next };
    setShipping(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next, updated) }));
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, shipping[field], shipping) }));
  }

  function validateAll() {
    const nextErrors = {};
    Object.keys(shipping).forEach((field) => {
      nextErrors[field] = validateField(field, shipping[field], shipping);
    });
    setErrors(nextErrors);
    setTouched({ name: true, address: true, city: true, pincode: true, phone: true });
    return Object.values(nextErrors).every((msg) => !msg);
  }

  function handleContinue(e) {
    e.preventDefault();
    if (!validateAll()) return;

    sessionStorage.setItem('groco_shipping', JSON.stringify(shipping));
    sessionStorage.setItem('groco_payment_method', method);

    if (method === 'cod') {
      sessionStorage.setItem(
        'groco_last_order',
        JSON.stringify({ items, subtotal, shipping: shippingFee, total, method })
      );
      clearCart();
      navigate('/order-confirmation');
    } else {
      navigate('/payment');
    }
  }

  return (
    <section className="section">
      <div className="container">
        <Stepper current={1} />
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <form className="summary-card" onSubmit={handleContinue} noValidate>
              <h5 style={{ color: 'var(--green)', fontWeight: 800 }}>
                <Truck size={18} className="me-2" style={{ marginTop: -3 }} />
                Shipping Details
              </h5>
              <div className="row g-3 mt-1">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={shipping.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <input
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    value={shipping.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label">City</label>
                  <input
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    value={shipping.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label">Pincode</label>
                  <input
                    inputMode="numeric"
                    className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                    value={shipping.pincode}
                    onChange={(e) => handleFieldChange('pincode', e.target.value)}
                    onBlur={() => handleBlur('pincode')}
                  />
                  {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Phone</label>
                  <input
                    inputMode="numeric"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    value={shipping.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>

              <h5 className="mt-4" style={{ color: 'var(--green)', fontWeight: 800 }}>Payment Method</h5>
              <div className="mt-2">
                {METHODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.id}
                      className={`payment-option ${method === m.id ? 'selected' : ''}`}
                      onClick={() => setMethod(m.id)}
                    >
                      <Icon size={18} />
                      {m.label}
                    </div>
                  );
                })}
              </div>

              <button type="submit" className="btn btn-groco-solid w-100 mt-3">
                {method === 'cod' ? `Place Order — ₹${total}` : 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
