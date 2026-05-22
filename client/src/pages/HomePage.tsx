import { ArrowRight, Camera, Check, Clapperboard, Diamond, Images, Sparkles } from 'lucide-react';
import type { RouteName } from '../App';
import { LeadForm } from '../components/LeadForm';
import { SectionHeading } from '../components/SectionHeading';
import { categories, projects, services, testimonials } from '../data/portfolio';

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onSelectCategory: (slug: string) => void;
  onSelectProject: (slug: string) => void;
};

export function HomePage({ activeRoute, onNavigate, onSelectCategory, onSelectProject }: Props) {
  if (activeRoute === 'about') {
    return (
      <main className="standard-page about-page">
        <section className="split-hero">
          <div>
            <p className="eyebrow">About the studio</p>
            <h1>We build cinematic visual systems for premium brands and designed spaces.</h1>
            <p>
              Capture Crew combines photography, film, art direction, and brand storytelling for architecture,
              interiors, fashion, weddings, products, food, and commercial launches.
            </p>
          </div>
          <img
            src="/assets/media/commercial-hero.jpeg"
            alt="Creative studio production space"
          />
        </section>
        <section className="process-grid">
          {[
            ['01', 'Discover', 'Brand goals, audience, channels, project constraints, and visual references.'],
            ['02', 'Direct', 'Shot lists, production plans, location rhythm, art direction, and motion treatment.'],
            ['03', 'Capture', 'Photography, film, drone, detail studies, portraits, social-first cuts, and BTS.'],
            ['04', 'Deliver', 'Retouched assets, AVIF/WebP-ready images, films, thumbnails, and campaign folders.']
          ].map(([step, title, copy]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </section>
      </main>
    );
  }

  if (activeRoute === 'services') {
    return (
      <main className="standard-page">
        <p className="eyebrow">Services</p>
        <h1>Photography, videography, campaigns, reels, launch films, and brand image libraries.</h1>
        <section className="service-grid detailed">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <Diamond size={18} />
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={14} />
                    {item}
                  </li>
                ))}
              </ul>
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
          <div className="contact-points">
            <span>Architecture and interiors</span>
            <span>Commercial brand campaigns</span>
            <span>Weddings and private events</span>
            <span>Product, food, and editorial systems</span>
          </div>
        </section>
        <LeadForm />
      </main>
    );
  }

  return (
    <main>
      <section className="hero">
        <img
          className="hero-media"
          src="/assets/media/architecture-hero.jpeg"
          alt="Capture Crew luxury interior hero"
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
        <div className="hero-metrics" aria-label="Studio metrics">
          <span>95+ Lighthouse target</span>
          <span>AVIF and WebP delivery</span>
          <span>Admin-managed CMS</span>
        </div>
      </section>

      <section className="category-band" aria-label="Portfolio categories">
        {categories.map((category) => (
          <button type="button" key={category.slug} onClick={() => onSelectCategory(category.slug)}>
            <span>{category.name}</span>
            <small>{category.description}</small>
          </button>
        ))}
      </section>

      <section className="feature-section">
        <SectionHeading eyebrow="Selected work" title="Editorial imagery with architectural restraint and cinematic depth.">
          <p>
            Each project is planned as a usable brand library: hero images, detail studies, social crops,
            video cuts, metadata, and responsive media-ready exports.
          </p>
        </SectionHeading>
        <div className="project-grid">
          {projects.filter((project) => project.featured).map((project) => (
            <button className="project-card" key={project.slug} type="button" onClick={() => onSelectProject(project.slug)}>
              <img src={project.image} alt={project.title} />
              <div>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.location} / {project.year}</span>
              </div>
            </button>
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

      <section className="editorial-band">
        <img
          src="/assets/media/interiors-hero.jpeg"
          alt="Modern luxury interior"
        />
        <div>
          <p className="eyebrow">Experience goal</p>
          <h2>Trusted by luxury brands before the first meeting.</h2>
          <p>
            The site is designed to signal polish immediately: immersive media, restrained typography,
            fast-loading responsive images, structured SEO, and a CMS workflow for the studio team.
          </p>
          <button className="ghost-button" type="button" onClick={() => onNavigate('services')}>
            Explore Services
          </button>
        </div>
      </section>

      <section className="testimonials">
        {testimonials.slice(0, 2).map((testimonial) => (
          <blockquote key={testimonial.name}>
            <Sparkles size={18} />
            <p>“{testimonial.message}”</p>
            <cite>{testimonial.name}, {testimonial.designation}</cite>
          </blockquote>
        ))}
      </section>
    </main>
  );
}
