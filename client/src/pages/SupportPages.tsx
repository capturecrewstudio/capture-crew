import { Calendar, ShieldCheck, Star } from 'lucide-react';
import { posts, testimonials } from '../data/portfolio';

export function TestimonialsPage() {
  return (
    <main className="standard-page">
      <p className="eyebrow">Testimonials</p>
      <h1>Premium clients need clarity, calm, and a visual partner who understands stakes.</h1>
      <section className="testimonial-wall">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name}>
            <img src={testimonial.image} alt={testimonial.name} />
            <Star size={18} />
            <p>"{testimonial.message}"</p>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.designation}</span>
          </article>
        ))}
      </section>
    </main>
  );
}

export function BlogPage() {
  return (
    <main className="standard-page">
      <p className="eyebrow">Journal</p>
      <h1>Notes on visual strategy, production, architecture, launches, and cinematic brand systems.</h1>
      <section className="blog-grid">
        {posts.map((post) => (
          <article key={post.title}>
            <img src={post.image} alt={post.title} />
            <div>
              <span>
                <Calendar size={14} />
                {post.date}
              </span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

type LegalProps = {
  kind: 'privacy' | 'terms';
};

export function LegalPage({ kind }: LegalProps) {
  const isPrivacy = kind === 'privacy';

  return (
    <main className="standard-page legal-page">
      <p className="eyebrow">{isPrivacy ? 'Privacy Policy' : 'Terms'}</p>
      <h1>{isPrivacy ? 'How Capture Crew handles enquiries, media, and client information.' : 'Working terms for creative enquiries and project commissions.'}</h1>
      <section className="legal-list">
        {(isPrivacy
          ? [
              ['Lead data', 'Contact form details are used only to respond to enquiries and qualify project fit.'],
              ['Media storage', 'Uploaded studio assets are stored in Amazon S3 with cache-ready public derivatives where appropriate.'],
              ['Analytics', 'SEO and performance data may be used to improve discoverability and site quality.']
            ]
          : [
              ['Project scope', 'Final deliverables, dates, and usage rights are confirmed in a written production estimate.'],
              ['Media usage', 'Client usage is governed by the agreed license, territory, campaign, and duration.'],
              ['Admin access', 'CMS access is restricted to authorized Capture Crew team members.']
            ]).map(([title, copy]) => (
          <article key={title}>
            <ShieldCheck size={18} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
