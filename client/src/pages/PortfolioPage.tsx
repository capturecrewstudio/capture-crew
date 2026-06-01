import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { apiGetProjects, apiGetCategories, type ApiProject, type ApiCategory } from '../lib/adminApi';

type Props = {
  selectedCategory?: string;
  onSelectCategory: (slug: string) => void;
  onSelectProject: (slug: string) => void;
};

export function PortfolioPage({ selectedCategory, onSelectCategory, onSelectProject }: Props) {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGetProjects(), apiGetCategories()])
      .then(([p, c]) => { setProjects(p); setCategories(c); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeCategory = categories.find(c => c.slug === selectedCategory);
  const visibleProjects = selectedCategory
    ? projects.filter(p => p.category.slug === selectedCategory)
    : projects;

  if (loading) {
    return (
      <main className="portfolio-page">
        <section className="portfolio-intro">
          <p className="eyebrow">Portfolio</p>
          <h1>Loading…</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="portfolio-page">
      <section className="portfolio-intro">
        <p className="eyebrow">{activeCategory ? activeCategory.name : 'Portfolio'}</p>
        <h1>{activeCategory ? (activeCategory as ApiCategory & { description?: string }).description ?? activeCategory.name : 'Images built to make premium brands feel inevitable.'}</h1>
        <div className="filter-row">
          <button className={!selectedCategory ? 'is-active' : ''} type="button" onClick={() => onSelectCategory('')}>
            All
          </button>
          {categories.map(category => (
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
            {project.coverImage && <img src={project.coverImage} alt={project.title} />}
            <span>
              <strong>{project.title}</strong>
              <small>{project.category.name}{project.location ? ` / ${project.location}` : ''}</small>
              <ArrowUpRight size={15} />
            </span>
          </button>
        ))}
      </section>
      {visibleProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--stone)' }}>
          No projects in this category yet.
        </div>
      )}
    </main>
  );
}
