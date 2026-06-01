import { ArrowLeft, Check, Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { RouteName } from '../App';
import { apiGetProjects, type ApiProject } from '../lib/adminApi';

type Props = {
  slug: string;
  onNavigate: (route: RouteName) => void;
};

export function ProjectPage({ slug, onNavigate }: Props) {
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetProjects()
      .then(projects => {
        const found = projects.find(p => p.slug === slug) ?? projects[0] ?? null;
        setProject(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading || !project) {
    return (
      <main className="project-detail">
        <section className="project-hero-block">
          <div className="hero-scrim" />
          <div className="project-hero-copy">
            <button className="text-link" type="button" onClick={() => onNavigate('portfolio')}>
              <ArrowLeft size={16} /> Portfolio
            </button>
            <h1>{loading ? 'Loading…' : 'Project not found'}</h1>
          </div>
        </section>
      </main>
    );
  }

  const services = Array.isArray(project.services) ? project.services : [];

  return (
    <main className="project-detail">
      <section className="project-hero-block">
        {project.coverImage && <img className="project-hero" src={project.coverImage} alt={project.title} />}
        <div className="hero-scrim" />
        <div className="project-hero-copy">
          <button className="text-link" type="button" onClick={() => onNavigate('portfolio')}>
            <ArrowLeft size={16} /> Portfolio
          </button>
          <p className="eyebrow">{project.category.name}{project.location ? ` / ${project.location}` : ''}</p>
          <h1>{project.title}</h1>
        </div>
      </section>

      <section className="project-copy">
        <div>
          <p className="eyebrow">Project story</p>
          <h2>{project.summary ?? project.description}</h2>
          {project.narrative && <p>{project.narrative}</p>}
        </div>
        <aside className="project-meta">
          {project.client && (<><span>Client</span><strong>{project.client}</strong></>)}
          {project.year && (<><span>Year</span><strong>{project.year}</strong></>)}
          {services.length > 0 && (
            <><span>Services</span>
            <ul>
              {services.map(service => (
                <li key={service}><Check size={14} />{service}</li>
              ))}
            </ul></>
          )}
        </aside>
      </section>

      {project.images.length > 0 && (
        <section className="project-gallery">
          {project.images.map((image, index) => (
            <figure key={image.id}>
              <img src={image.imageUrl} alt={image.altText ?? `${project.title} frame ${index + 1}`} loading="lazy" />
              <figcaption>
                <Image size={14} />
                {project.title} / Frame {index + 1}
              </figcaption>
            </figure>
          ))}
        </section>
      )}
    </main>
  );
}
