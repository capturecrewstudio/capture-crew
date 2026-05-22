import { ArrowRight, Camera, Clapperboard, Diamond, Images, Send } from 'lucide-react';
import type { RouteName } from '../App';
import { categories, projects, testimonials } from '../data/portfolio';

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
};

export function HomePage({ activeRoute, onNavigate }: Props) {
  if (activeRoute === 'about') {
    return (
      <main className="standard-page">
        <p className="eyebrow">About the studio</p>
        <h1>We build cinematic visual systems for premium brands and designed spaces.</h1>
        <p>
          Capture Crew combines photography, film, art direction, and brand storytelling for architecture,
          interiors, fashion, weddings, products, food, and commercial launches.
        </p>
      </main>
    );
  }

  if (activeRoute === 'services') {
    return (
      <main className="standard-page">
        <p className="eyebrow">Services</p>
        <h1>Photography, videography, campaigns, reels, launch films, and brand image libraries.</h1>
        <section className="service-grid">
          {['Architectural photography', 'Commercial films', 'Brand campaigns', 'Wedding storytelling'].map((item) => (
            <article className="service-card" key={item}>
              <Diamond size={18} />
              <h3>{item}</h3>
            </article>
          ))}
        </section>
      </main>
    );
  }

  if (activeRoute === 'contact') {
    return (
      <main className="standard-page contact-layout">
        <section>
          <p className="eyebrow">New commission</p>
          <h1>Tell us what should feel unforgettable.</h1>
          <p>Share your project, timeline, and the kind of visual world you want to create.</p>
        </section>
        <form className="lead-form">
          <input name="name" placeholder="Name" />
          <input name="email" placeholder="Email" type="email" />
          <input name="phone" placeholder="Phone" />
          <select name="service" defaultValue="">
            <option value="" disabled>
              Service
            </option>
            <option>Architecture</option>
            <option>Fashion</option>
            <option>Commercial</option>
            <option>Weddings</option>
          </select>
          <textarea name="message" placeholder="Message" rows={5} />
          <button className="primary-button" type="button">
            <Send size={16} />
            Send Enquiry
          </button>
        </form>
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <img
          className="hero-media"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
          alt="Luxury modern home photographed at dusk"
        />
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow">Premium photo, film, and brand imagery</p>
          <h1>
            Architecture.
            <br />
            Luxury.
            <br />
            Visual Storytelling.
          </h1>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onNavigate('portfolio')}>
              View Portfolio
              <ArrowRight size={16} />
            </button>
            <button className="ghost-button" type="button" onClick={() => onNavigate('contact')}>
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="category-band" aria-label="Portfolio categories">
        {categories.map((category) => (
          <button type="button" key={category} onClick={() => onNavigate('portfolio')}>
            {category}
          </button>
        ))}
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Editorial imagery with architectural restraint and cinematic depth.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img src={project.image} alt={project.title} />
              <div>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.location} / {project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities">
        <article>
          <Camera size={20} />
          <h3>Photography</h3>
          <p>Campaign-ready stills, architectural portfolios, product imagery, and editorial portraiture.</p>
        </article>
        <article>
          <Clapperboard size={20} />
          <h3>Film</h3>
          <p>Launch films, social edits, interviews, reels, and location-led cinematic narratives.</p>
        </article>
        <article>
          <Images size={20} />
          <h3>Brand Libraries</h3>
          <p>Complete image systems for websites, PR kits, hospitality launches, and investor decks.</p>
        </article>
      </section>

      <section className="testimonials">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.name}>
            <p>“{testimonial.message}”</p>
            <cite>{testimonial.name}, {testimonial.designation}</cite>
          </blockquote>
        ))}
      </section>
    </main>
  );
}
