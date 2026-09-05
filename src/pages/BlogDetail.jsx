import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '../data/products';

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <section className="section">
        <div className="container text-center">
          <h4>Blog post not found.</h4>
          <Link to="/" className="btn btn-groco-solid mt-3">Back to Home</Link>
        </div>
      </section>
    );
  }

  const more = blogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="pd-breadcrumb mb-4">
          <Link to="/">Home</Link> <ChevronRight size={14} /> <span>{blog.title}</span>
        </div>

        <div className="blog-detail-media mb-4">
          <img src={blog.image} alt={blog.title} />
        </div>

        <div className="blog-meta mb-2">
          <span>👤 By {blog.author}</span>
          <span>📅 {blog.date}</span>
        </div>

        <h1 className="blog-detail-title mb-4">{blog.title}</h1>

        <div className="blog-detail-body">
          {blog.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-5">
          <Link to="/" className="btn btn-outline-groco">
            <ChevronLeft size={16} className="me-1" style={{ marginTop: -2 }} /> Back to all blogs
          </Link>
        </div>

        {more.length > 0 && (
          <div className="mt-5 pt-4">
            <div className="section-title">
              <span className="lead-word">More From The </span>
              <span className="tag">Blog</span>
            </div>
            <div className="row g-4">
              {more.map((b) => (
                <div className="col-12 col-md-6" key={b.id}>
                  <Link to={`/blog/${b.id}`} className="blog-card blog-card-link">
                    <div className="blog-media" style={{ background: b.bg }}>
                      {b.image ? <img src={b.image} alt={b.title} /> : b.icon}
                    </div>
                    <div className="blog-body">
                      <div className="blog-meta">
                        <span>👤 By {b.author}</span>
                        <span>📅 {b.date}</span>
                      </div>
                      <h5>{b.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
