import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShoppingCart, Settings, PackageCheck, Home as HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';

function formatLongDate(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Orders keep it simple, same-day/next-day style: anything placed before the
// evening cutoff arrives that same evening; anything placed later arrives by
// midday the next day.
const EVENING_CUTOFF_HOUR = 18; // 6 PM

function getEta(placedDate) {
  const eta = new Date(placedDate);
  if (placedDate.getHours() < EVENING_CUTOFF_HOUR) {
    eta.setHours(21, 0, 0, 0); // same-day evening delivery, by 9 PM
  } else {
    eta.setDate(eta.getDate() + 1);
    eta.setHours(12, 0, 0, 0); // next-day delivery, by 12 PM
  }
  return eta;
}

function formatEta(eta, now) {
  const dayLabel = isSameDay(eta, now) ? 'Today' : 'Tomorrow';
  return `${dayLabel}, ${eta.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} by ${formatTime(eta)}`;
}

// STATUS is one of 'done' | 'active' | 'pending'. Each stage contributes
// its own share toward the overall percentage: a done stage counts fully,
// an active one counts half, a pending one counts nothing.
function buildStages(placedDate) {
  return [
    {
      icon: ShoppingCart,
      label: 'Order Placed',
      status: 'done',
      desc: `We received your order on ${formatLongDate(placedDate)}.`,
    },
    {
      icon: Settings,
      label: 'Processing',
      status: 'active',
      desc: 'Your order is being prepared for shipment.',
      progress: 45,
    },
    {
      icon: Truck,
      label: 'Out for Delivery',
      status: 'pending',
      desc: 'Your order will be handed to our delivery partner.',
    },
    {
      icon: PackageCheck,
      label: 'Delivered',
      status: 'pending',
      desc: 'Enjoy your fresh groceries!',
    },
  ];
}

export default function OrderTracking() {
  const [stageIndex, setStageIndex] = useState(1); // which stage is "active" — lets the arrows walk the order forward for demo purposes

  const order = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('groco_last_order')) || null;
    } catch {
      return null;
    }
  }, []);

  const placedDate = useMemo(() => new Date(), []);
  const etaDate = useMemo(() => getEta(placedDate), [placedDate]);

  const baseStages = useMemo(() => buildStages(placedDate), [placedDate]);
  const lastIndex = baseStages.length - 1;
  const stages = baseStages.map((s, i) => {
    // The final stage ("Delivered") counts as fully done once reached,
    // rather than "active", so the order can actually reach 100% complete.
    let status;
    if (i < stageIndex) status = 'done';
    else if (i === stageIndex) status = i === lastIndex ? 'done' : 'active';
    else status = 'pending';
    return { ...s, status };
  });

  const percent = Math.round(
    stages.reduce((sum, s) => sum + (s.status === 'done' ? 100 : s.status === 'active' ? 50 : 0), 0) / stages.length
  );
  const isDelivered = stageIndex === lastIndex;

  function goPrev() {
    setStageIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setStageIndex((i) => Math.min(stages.length - 1, i + 1));
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">Order </span>
          <span className="tag">Tracking</span>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="eta-banner">
              <div>
                <div className="eta-label">
                  {isDelivered ? 'Your order was delivered' : 'Your order is expected to arrive by'}
                </div>
                <div className="eta-date">{isDelivered ? formatLongDate(placedDate) : formatEta(etaDate, placedDate)}</div>
              </div>
              <div className="eta-truck">
                {isDelivered ? <PackageCheck size={28} /> : <Truck size={28} />}
              </div>
            </div>

            <div className="summary-card mt-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h5 style={{ color: 'var(--green)', fontWeight: 800, margin: 0 }}>Order Status</h5>
                <span className="percent-complete">{percent}% Complete</span>
              </div>

              <div className="progress-track mt-3 mb-4">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>

              {stages.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div className="stage-row" key={i}>
                    <div className={`stage-icon ${s.status}`}>
                      <Icon size={20} />
                    </div>
                    <div className="stage-content">
                      <div className={`stage-label ${s.status}`}>{s.label}</div>
                      <p className="stage-desc">{s.desc}</p>
                      {s.status === 'active' && s.progress != null && (
                        <div className="stage-subtrack">
                          <div className="stage-subfill" style={{ width: `${s.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="d-flex justify-content-center gap-2 mt-3">
                <button className="stage-nav-btn" onClick={goPrev} disabled={stageIndex === 0} aria-label="Previous stage">
                  <ChevronLeft size={18} />
                </button>
                <button className="stage-nav-btn" onClick={goNext} disabled={stageIndex === stages.length - 1} aria-label="Next stage">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {!order?.items?.length && (
              <p className="text-muted text-center mt-3 mb-0">
                Placed a real order? <Link to="/categories">Shop now</Link> to see live tracking here next time.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
