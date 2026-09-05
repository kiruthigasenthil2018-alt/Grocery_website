import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    showToast('Message sent', "We'll get back to you shortly.", 'success');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">Get In </span>
          <span className="tag">Touch</span>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <form className="info-card" onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-groco-solid w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
