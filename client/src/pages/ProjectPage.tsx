import { ArrowLeft, Check, Image } from 'lucide-react';
import type { RouteName } from '../App';
import { projects } from '../data/portfolio';

type Props = {
  slug: string;
  onNavigate: (route: RouteName) => void;
};

export function ProjectPage({ slug, onNavigate }: Props) {
  const project = projects.find((item) => item.slug === slug) ?? projects[0];

  return (
    <main className="project-detail">
      <section className="project-hero-block">
        <img className="project-hero" src={project.image} alt={project.title} />
        <div className="hero-scrim" />
        <div className="project-hero-copy">
          <button className="text-link" type="button" onClick={() => onNavigate('portfolio')}>
            <ArrowLeft size={16} />
            Portfolio
          </button>
          <p className="eyebrow">{project.category} / {project.location}</p>
          <h1>{project.title}</h1>
        </div>
      </section>
      <section className="project-copy">
        <div>
          <p className="eyebrow">Project story</p>
          <h2>{project.summary}</h2>
          <p>{project.narrative}</p>
        </div>
        <aside className="project-meta">
          <span>Client</span>
          <strong>{project.client}</strong>
          <span>Year</span>
          <strong>{project.year}</strong>
          <span>Services</span>
          <ul>
            {project.services.map((service) => (
              <li key={service}>
                <Check size={14} />
                {service}
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <section className="project-gallery">
        {project.gallery.map((image, index) => (
          <figure key={image}>
            <img src={image} alt={`${project.title} gallery ${index + 1}`} loading="lazy" />
            <figcaption>
              <Image size={14} />
              {project.title} / Frame {index + 1}
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
