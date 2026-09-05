import { Check } from 'lucide-react';

const STEPS = ['Shipping', 'Payment', 'Confirmation'];

export default function Stepper({ current }) {
  return (
    <div className="checkout-stepper">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const state = stepNum < current ? 'done' : stepNum === current ? 'active' : '';
        return (
          <div className="d-flex align-items-center" key={label}>
            <div className={`checkout-step ${state}`}>
              <span className="step-circle">{stepNum < current ? <Check size={16} /> : stepNum}</span>
              <span className="step-label">{label}</span>
            </div>
            {stepNum !== STEPS.length && <span className="step-line mx-2" />}
          </div>
        );
      })}
    </div>
  );
}
