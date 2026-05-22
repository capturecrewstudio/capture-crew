import { ArrowUpRight } from 'lucide-react';
import type { RouteName } from '../App';
import { categories, projects } from '../data/portfolio';

type Props = {
  onNavigate: (route: RouteName) => void;
};

export function PortfolioPage({ onNavigate }: Props) {
  return (
    <main className="portfolio-page">
      <section className="portfolio-intro">
        <p className="eyebrow">Portfolio</p>
        <h1>Images built to make premium brands feel inevitable.</h1>
        <div className="filter-row">
          {categories.map((category) => (
            <button key={category} type="button">{category}</button>
          ))}
        </div>
      </section>
      <section className="masonry-grid">
        {[...projects, ...projects].map((project, index) => (
          <button className="portfolio-tile" key={`${project.title}-${index}`} type="button" onClick={() => onNavigate('project')}>
            <img src={project.image} alt={project.title} />
            <span>
              {project.title}
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
