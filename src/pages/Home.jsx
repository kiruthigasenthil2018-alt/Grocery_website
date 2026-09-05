import { Link } from 'react-router-dom';
import { products, features, reviews, blogs } from '../data/products';
import ProductCard from '../components/ProductCard';
// Real, high-resolution hero photo (Soham Rathod, "A pile of vegetables
// sitting next to each other", free to use under the Unsplash License).
// Note: the reference screenshot for this banner has a visible "FREEPIK"
// watermark repeating across it — that's paid stock content, so this uses
// a different, freely-licensed photo with a similar full-bleed colourful
// veg look instead.
const heroImage = 'https://images.unsplash.com/photo-1710685936317-d6272d2c5864?w=1600&h=1000&fit=crop&auto=format&q=80';

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="hero-banner">
        <img className="hero-banner-img" src={heroImage} alt="Fresh vegetables" />
        <div className="hero-banner-fade" />
        <div className="container">
          <div className="hero-banner-content">
            <h1 className="hero-title">
              Fresh And <span className="accent">Organic</span> Products For You
            </h1>
            <p className="hero-copy">
              Hand-picked, farm-fresh groceries delivered to your door — vegetables, fruits, dairy
              and pantry staples, all in one place.
            </p>
            <Link to="/categories" className="btn btn-groco">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="lead-word">Our </span>
            <span className="tag">Features</span>
          </div>
          <div className="row g-4">
            {features.map((f) => (
              <div className="col-12 col-md-4" key={f.id}>
                <div className="info-card">
                  <div className="icon-circle">
                    {f.image ? <img src={f.image} alt={f.title} /> : f.icon}
                  </div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="section" style={{ background: 'var(--peach-light)' }}>
        <div className="container">
          <div className="section-title">
            <span className="lead-word">Popular </span>
            <span className="tag">Products</span>
          </div>
          <div className="row g-4">
            {featured.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/categories" className="btn btn-groco-solid">View All Categories</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="lead-word">Customer's </span>
            <span className="tag">Review</span>
          </div>
          <div className="row g-4">
            {reviews.map((r) => (
              <div className="col-12 col-md-4" key={r.id}>
                <div className="review-card">
                  <div className="review-avatar">
                    <img src={r.photo} alt={r.name} />
                  </div>
                  <p>{r.text}</p>
                  <div className="review-name">{r.name}</div>
                  <div className="stars">★★★★½</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section" style={{ background: 'var(--peach-light)' }}>
        <div className="container">
          <div className="section-title">
            <span className="lead-word">Our </span>
            <span className="tag">Blog</span>
          </div>
          <div className="row g-4">
            {blogs.map((b) => (
              <div className="col-12 col-md-4" key={b.id}>
                <div className="blog-card">
                  <div className="blog-media" style={{ background: b.bg }}>
                    {b.image ? <img src={b.image} alt={b.title} /> : b.icon}
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>👤 By {b.author}</span>
                      <span>📅 {b.date}</span>
                    </div>
                    <h5>{b.title}</h5>
                    <Link to={`/blog/${b.id}`} className="btn btn-outline-groco">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
