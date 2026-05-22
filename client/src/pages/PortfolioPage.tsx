import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { categories, projects } from '../data/portfolio';

type Props = {
  selectedCategory?: string;
  onSelectCategory: (slug: string) => void;
  onSelectProject: (slug: string) => void;
};

export function PortfolioPage({ selectedCategory, onSelectCategory, onSelectProject }: Props) {
  const activeCategory = categories.find((category) => category.slug === selectedCategory);
  const visibleProjects = selectedCategory
    ? projects.filter((project) => project.categorySlug === selectedCategory)
    : projects;

  return (
    <main className="portfolio-page">
      <section className="portfolio-intro">
        <p className="eyebrow">{activeCategory ? activeCategory.name : 'Portfolio'}</p>
        <h1>{activeCategory ? activeCategory.description : 'Images built to make premium brands feel inevitable.'}</h1>
        <div className="filter-row">
          <button className={!selectedCategory ? 'is-active' : ''} type="button" onClick={() => onSelectCategory('')}>
            All
          </button>
          {categories.map((category) => (
            <button
              className={selectedCategory === category.slug ? 'is-active' : ''}
              key={category.slug}
              type="button"
              onClick={() => onSelectCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>
      <section className="masonry-grid">
        {visibleProjects.map((project, index) => (
          <button
            className="portfolio-tile"
            key={project.slug}
            type="button"
            onClick={() => onSelectProject(project.slug)}
            style={{ '--tile-span': index % 3 === 1 ? '560px' : '420px' } as CSSProperties}
          >
            <img src={project.image} alt={project.title} />
            <span>
              <strong>{project.title}</strong>
              <small>{project.category} / {project.location}</small>
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
