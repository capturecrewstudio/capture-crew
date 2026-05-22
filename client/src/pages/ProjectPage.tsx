import { projects } from '../data/portfolio';

export function ProjectPage() {
  const project = projects[0];

  return (
    <main className="project-detail">
      <img className="project-hero" src={project.image} alt={project.title} />
      <section className="project-copy">
        <p className="eyebrow">{project.category} / {project.location}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>
    </main>
  );
}
