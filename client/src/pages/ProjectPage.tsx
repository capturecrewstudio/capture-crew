import { ArrowLeft, Check, ChevronLeft, ChevronRight, Image, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { RouteName } from '../App';
import { apiGetProjects, type ApiProject } from '../lib/adminApi';

type Props = {
  slug: string;
  onNavigate: (route: RouteName) => void;
};

// ── Lightbox ──────────────────────────────────────────────────────────────────

type LightboxProps = {
  images: ApiProject['images'];
  startIndex: number;
  title: string;
  onClose: () => void;
};

function Lightbox({ images, startIndex, title, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Swipe support
  let touchStartX = 0;
  function onTouchStart(e: React.TouchEvent) { touchStartX = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
  }

  const img = images[current];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.98)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {title}&nbsp;/&nbsp;{current + 1} of {images.length}
        </span>
        <button onClick={onClose} aria-label="Close"
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
          <X size={16} />
        </button>
      </div>

      {/* Main image — full width/height, no zoom */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        {/* Prev */}
        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 sm:left-5 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
          <ChevronLeft size={22} />
        </button>

        <img
          key={img.id}
          src={img.imageUrl ?? img.webpUrl ?? ''}
          alt={img.altText ?? `${title} frame ${current + 1}`}
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            animation: 'lbFadeIn 0.2s ease-out',
          }}
        />

        {/* Next */}
        <button onClick={next} aria-label="Next"
          className="absolute right-3 sm:right-5 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Swipe or use ← → to navigate
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 flex items-center gap-2 px-5 py-3 overflow-x-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {images.map((im, i) => (
          <button key={im.id} onClick={() => setCurrent(i)} aria-label={`Frame ${i + 1}`}
            className="shrink-0 rounded-md overflow-hidden transition-all duration-200"
            style={{ width: 56, height: 40, border: i === current ? '2px solid var(--accent)' : '2px solid transparent', opacity: i === current ? 1 : 0.45 }}>
            <img src={im.webpUrl ?? im.imageUrl} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Preload adjacent */}
      {images[(current + 1) % images.length] && (
        <img src={images[(current + 1) % images.length].imageUrl ?? images[(current + 1) % images.length].webpUrl ?? ''} alt="" className="hidden" aria-hidden />
      )}
      {images[(current - 1 + images.length) % images.length] && (
        <img src={images[(current - 1 + images.length) % images.length].imageUrl ?? images[(current - 1 + images.length) % images.length].webpUrl ?? ''} alt="" className="hidden" aria-hidden />
      )}

      <style>{`@keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

// ── Project Page ──────────────────────────────────────────────────────────────

export function ProjectPage({ slug, onNavigate }: Props) {
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          startIndex={lightboxIndex}
          title={project.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <main className="project-detail">
        <section className="project-hero-block">
          {project.coverImage && (
            <img
              className="project-hero"
              src={project.coverImage}
              alt={project.title}
              style={{ imageRendering: 'auto', objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
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
              <figure key={image.id} className="cursor-pointer group" onClick={() => setLightboxIndex(index)}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={image.webpUrl ?? image.imageUrl}
                    alt={image.altText ?? `${project.title} frame ${index + 1}`}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest"
                      style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                      <Image size={13} /> Preview
                    </div>
                  </div>
                </div>
                <figcaption>
                  <Image size={14} />
                  {project.title} / Frame {index + 1}
                </figcaption>
              </figure>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
