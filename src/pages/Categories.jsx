import { useState } from 'react';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Categories() {
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? categories : [active];

  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <span className="lead-word">Shop By </span>
          <span className="tag">Category</span>
        </div>

        <div className="text-center mb-4">
          <button className={`category-pill ${active === 'All' ? 'active' : ''}`} onClick={() => setActive('All')}>
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`category-pill ${active === c ? 'active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {shown.map((cat) => (
          <div key={cat}>
            <h4 className="category-heading">{cat}</h4>
            <div className="row g-4 mb-3">
              {products
                .filter((p) => p.category === cat)
                .map((p) => (
                  <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                    <ProductCard product={p} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
