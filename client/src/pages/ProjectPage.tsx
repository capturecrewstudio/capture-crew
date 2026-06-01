import { ArrowLeft, Check, ChevronLeft, ChevronRight, Image, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
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

// Zoom buttons live inside TransformWrapper so they can access useControls()
function ZoomControls({ onClose }: { onClose: () => void }) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => zoomOut()} aria-label="Zoom out"
        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
        <ZoomOut size={15} />
      </button>
      <button onClick={() => zoomIn()} aria-label="Zoom in"
        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
        <ZoomIn size={15} />
      </button>
      <button onClick={() => resetTransform()} aria-label="Reset zoom"
        className="flex items-center justify-center px-2 h-8 rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em' }}>
        1:1
      </button>
      <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
      <button onClick={onClose} aria-label="Close"
        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
        <X size={16} />
      </button>
    </div>
  );
}

function Lightbox({ images, startIndex, title, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  // Keep a ref to call resetTransform when navigating
  const resetRef = useRef<(() => void) | null>(null);

  function goTo(idx: number) {
    setCurrent(idx);
    resetRef.current?.();
  }
  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

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

  const img = images[current];
  if (!img) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col" style={{ background: 'rgba(0,0,0,0.97)' }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={8}
        centerOnInit
        doubleClick={{ mode: 'toggle' }}
        onInit={ref => { resetRef.current = () => ref.resetTransform(); }}
        wheel={{ step: 0.1 }}
        pinch={{ step: 5 }}
      >
        {/* Top bar — inside TransformWrapper to access useControls() */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            {title}&nbsp;/&nbsp;{current + 1} of {images.length}
          </span>
          <ZoomControls onClose={onClose} />
        </div>

        {/* Image area */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          {/* Prev */}
          <button onClick={prev} aria-label="Previous"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
            <ChevronLeft size={22} />
          </button>

          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              key={img.id}
              src={img.imageUrl}
              alt={img.altText ?? `${title} frame ${current + 1}`}
              draggable={false}
              style={{
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: 8,
                userSelect: 'none',
                animation: 'lbFadeIn 0.2s ease-out',
              }}
            />
          </TransformComponent>

          {/* Next */}
          <button onClick={next} aria-label="Next"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
            Scroll / pinch to zoom · Double-click to reset · ← → navigate
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="shrink-0 flex items-center gap-2 px-5 py-3 overflow-x-auto"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {images.map((im, i) => (
            <button key={im.id} onClick={() => goTo(i)} aria-label={`Frame ${i + 1}`}
              className="shrink-0 rounded-md overflow-hidden transition-all duration-200"
              style={{ width: 56, height: 40, border: i === current ? '2px solid var(--accent)' : '2px solid transparent', opacity: i === current ? 1 : 0.45 }}>
              <img src={im.imageUrl} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </TransformWrapper>

      {/* Preload adjacent images */}
      {images[(current + 1) % images.length]?.imageUrl && (
        <img src={images[(current + 1) % images.length].imageUrl} alt="" className="hidden" aria-hidden />
      )}
      {images[(current - 1 + images.length) % images.length]?.imageUrl && (
        <img src={images[(current - 1 + images.length) % images.length].imageUrl} alt="" className="hidden" aria-hidden />
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
              <figure key={image.id} className="cursor-pointer group" onClick={() => setLightboxIndex(index)}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={image.imageUrl}
                    alt={image.altText ?? `${project.title} frame ${index + 1}`}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
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
