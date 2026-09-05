export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">About </span>
          <span className="tag">Us</span>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <p className="fs-5" style={{ color: 'var(--text-muted)' }}>
              GroCo started with a simple idea — bring farm-fresh, organic groceries straight to
              your doorstep without markups or middlemen. We work directly with local farmers to
              source the best vegetables, fruits, dairy and pantry staples, and deliver them fresh,
              fast and affordably.
            </p>
          </div>
        </div>
        <div className="row g-4 mt-4">
          <div className="col-12 col-md-4">
            <div className="info-card">
              <div className="icon-circle">🌱</div>
              <h5>Our Mission</h5>
              <p>Make healthy, organic food accessible to every household.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="info-card">
              <div className="icon-circle">🤝</div>
              <h5>Our Farmers</h5>
              <p>Direct partnerships with 200+ local farms across the region.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="info-card">
              <div className="icon-circle">🚀</div>
              <h5>Our Promise</h5>
              <p>Fresh delivery within hours, not days — every single order.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
