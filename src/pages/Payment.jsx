import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode } from 'lucide-react';
import Stepper from '../components/Stepper';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// Formats raw digits as "1234 5678 9012 3456" while typing.
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

// Formats raw digits as "MM/YY" while typing.
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function luhnCheck(digits) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function validateCardField(field, value) {
  const v = value.trim();
  switch (field) {
    case 'number': {
      const digits = v.replace(/\s/g, '');
      if (!digits) return 'Card number is required.';
      if (!/^\d{16}$/.test(digits)) return 'Enter a valid 16-digit card number.';
      if (!luhnCheck(digits)) return 'This card number looks invalid — please check it.';
      return '';
    }
    case 'name':
      if (!v) return 'Name on card is required.';
      if (!/^[A-Za-z\s.'-]{2,50}$/.test(v)) return 'Enter a valid name (letters only).';
      return '';
    case 'expiry': {
      if (!v) return 'Expiry date is required.';
      const match = /^(\d{2})\/(\d{2})$/.exec(v);
      if (!match) return 'Enter expiry as MM/YY.';
      const month = parseInt(match[1], 10);
      const year = 2000 + parseInt(match[2], 10);
      if (month < 1 || month > 12) return 'Enter a valid month (01-12).';
      const now = new Date();
      const expiryDate = new Date(year, month); // first day of the month AFTER expiry
      if (expiryDate <= new Date(now.getFullYear(), now.getMonth())) return 'This card has expired.';
      return '';
    }
    case 'cvv':
      if (!v) return 'CVV is required.';
      if (!/^\d{3}$/.test(v)) return 'Enter a valid 3-digit CVV.';
      return '';
    default:
      return '';
  }
}

function validateUpi(value) {
  const v = value.trim();
  if (!v) return 'UPI ID is required.';
  if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z]{1,64}$/.test(v)) return 'Enter a valid UPI ID (e.g. yourname@upi).';
  return '';
}

function validateBank(value) {
  if (!value) return 'Please select your bank.';
  return '';
}

export default function Payment() {
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();
  const method = sessionStorage.getItem('groco_payment_method') || 'card';
  const [processing, setProcessing] = useState(false);

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upi, setUpi] = useState('');
  const [upiMode, setUpiMode] = useState('id'); // 'id' | 'qr' — enter a UPI ID, or scan a QR code
  const [bank, setBank] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleCardChange(field, rawValue) {
    const value = field === 'number' ? formatCardNumber(rawValue) : field === 'expiry' ? formatExpiry(rawValue) : field === 'cvv' ? rawValue.replace(/\D/g, '').slice(0, 3) : rawValue;
    const updated = { ...card, [field]: value };
    setCard(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateCardField(field, value) }));
    }
  }

  function handleCardBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateCardField(field, card[field]) }));
  }

  function handleUpiChange(value) {
    setUpi(value);
    if (touched.upi) setErrors((prev) => ({ ...prev, upi: validateUpi(value) }));
  }

  function handleUpiBlur() {
    setTouched((prev) => ({ ...prev, upi: true }));
    setErrors((prev) => ({ ...prev, upi: validateUpi(upi) }));
  }

  function handleBankChange(value) {
    setBank(value);
    setErrors((prev) => ({ ...prev, bank: validateBank(value) }));
  }

  function validateBeforePay() {
    if (method === 'card') {
      const nextErrors = {
        number: validateCardField('number', card.number),
        name: validateCardField('name', card.name),
        expiry: validateCardField('expiry', card.expiry),
        cvv: validateCardField('cvv', card.cvv),
      };
      setErrors(nextErrors);
      setTouched({ number: true, name: true, expiry: true, cvv: true });
      return Object.values(nextErrors).every((msg) => !msg);
    }
    if (method === 'upi') {
      // Scanning a QR code doesn't need a typed UPI ID — the person has
      // already confirmed the payment on their own UPI app.
      if (upiMode === 'qr') return true;
      const msg = validateUpi(upi);
      setErrors({ upi: msg });
      setTouched({ upi: true });
      return !msg;
    }
    if (method === 'netbanking') {
      const msg = validateBank(bank);
      setErrors({ bank: msg });
      return !msg;
    }
    return true;
  }

  function handlePay(e) {
    e.preventDefault();
    if (!validateBeforePay()) return;

    setProcessing(true);
    // Simulated payment gateway — swap for a real one (Razorpay/Stripe) later.
    setTimeout(() => {
      setProcessing(false);
      // Snapshot the order before the cart is cleared, so the confirmation
      // page can still show what was purchased.
      sessionStorage.setItem(
        'groco_last_order',
        JSON.stringify({ items, subtotal, shipping, total, method })
      );
      clearCart();
      showToast('Payment successful', `₹${total} paid successfully.`, 'success');
      navigate('/order-confirmation');
    }, 1000);
  }

  return (
    <section className="section">
      <div className="container">
        <Stepper current={2} />
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <form className="summary-card" onSubmit={handlePay} noValidate>
              <h5 style={{ color: 'var(--green)', fontWeight: 800 }}>
                {method === 'card' && 'Card Details'}
                {method === 'upi' && 'UPI Payment'}
                {method === 'netbanking' && 'Netbanking'}
              </h5>

              {method === 'card' && (
                <div className="row g-3 mt-1">
                  <div className="col-12">
                    <label className="form-label">Card Number</label>
                    <input
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                      value={card.number}
                      onChange={(e) => handleCardChange('number', e.target.value)}
                      onBlur={() => handleCardBlur('number')}
                    />
                    {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Name on Card</label>
                    <input
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={card.name}
                      onChange={(e) => handleCardChange('name', e.target.value)}
                      onBlur={() => handleCardBlur('name')}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="col-6">
                    <label className="form-label">Expiry</label>
                    <input
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="MM/YY"
                      className={`form-control ${errors.expiry ? 'is-invalid' : ''}`}
                      value={card.expiry}
                      onChange={(e) => handleCardChange('expiry', e.target.value)}
                      onBlur={() => handleCardBlur('expiry')}
                    />
                    {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                  </div>
                  <div className="col-6">
                    <label className="form-label">CVV</label>
                    <input
                      inputMode="numeric"
                      maxLength={3}
                      type="password"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      value={card.cvv}
                      onChange={(e) => handleCardChange('cvv', e.target.value)}
                      onBlur={() => handleCardBlur('cvv')}
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>
              )}

              {method === 'upi' && (
                <div className="mt-2">
                  <div className="upi-mode-toggle mb-3">
                    <button
                      type="button"
                      className={`upi-mode-btn ${upiMode === 'id' ? 'selected' : ''}`}
                      onClick={() => setUpiMode('id')}
                    >
                      <CreditCard size={16} /> Enter UPI ID
                    </button>
                    <button
                      type="button"
                      className={`upi-mode-btn ${upiMode === 'qr' ? 'selected' : ''}`}
                      onClick={() => setUpiMode('qr')}
                    >
                      <QrCode size={16} /> Scan QR Code
                    </button>
                  </div>

                  {upiMode === 'id' ? (
                    <div>
                      <label className="form-label">UPI ID</label>
                      <input
                        placeholder="yourname@upi"
                        className={`form-control ${errors.upi ? 'is-invalid' : ''}`}
                        value={upi}
                        onChange={(e) => handleUpiChange(e.target.value)}
                        onBlur={handleUpiBlur}
                      />
                      {errors.upi && <div className="invalid-feedback">{errors.upi}</div>}
                    </div>
                  ) : (
                    <div className="upi-qr-box text-center">
                      <img
                        className="upi-qr-image"
                        width={180}
                        height={180}
                        alt="Scan this QR code with any UPI app to pay"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                          `upi://pay?pa=groco@upi&pn=GroCo&am=${total}&cu=INR&tn=GroCo Order Payment`
                        )}`}
                      />
                      <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                        Scan with Google Pay, PhonePe, Paytm or any UPI app, then complete the payment there.
                      </p>
                      <p className="fw-bold mt-1" style={{ color: 'var(--green-dark)' }}>Amount: ₹{total}</p>
                    </div>
                  )}
                </div>
              )}

              {method === 'netbanking' && (
                <div className="mt-2">
                  <label className="form-label">Select Bank</label>
                  <select
                    className={`form-select ${errors.bank ? 'is-invalid' : ''}`}
                    value={bank}
                    onChange={(e) => handleBankChange(e.target.value)}
                  >
                    <option value="">Choose your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                  {errors.bank && <div className="invalid-feedback">{errors.bank}</div>}
                </div>
              )}

              <button type="submit" className="btn btn-groco-solid w-100 mt-4" disabled={processing}>
                {processing
                  ? 'Processing...'
                  : method === 'upi' && upiMode === 'qr'
                  ? `I've Paid via QR — Confirm ₹${total}`
                  : `Pay Now — ₹${total}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
