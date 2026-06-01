import { ArrowLeft, Check, ChevronLeft, ChevronRight, Image, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

function Lightbox({ images, startIndex, title, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Touch tracking
  const touchStartX  = useRef<number | null>(null);
  const touchStartY  = useRef<number | null>(null);
  const lastPan      = useRef({ x: 0, y: 0 });
  const pinchStart   = useRef<number | null>(null);
  const pinchZoomStart = useRef(1);
  const isDragging   = useRef(false);

  const isZoomed = zoom > 1;

  function resetZoom() { setZoom(1); setPan({ x: 0, y: 0 }); }

  function goTo(idx: number) { setCurrent(idx); resetZoom(); }
  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft'  && !isZoomed) prev();
      if (e.key === 'ArrowRight' && !isZoomed) next();
      if (e.key === 'Escape') { if (isZoomed) resetZoom(); else onClose(); }
      if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + ZOOM_STEP, MAX_ZOOM));
      if (e.key === '-') setZoom(z => { const n = Math.max(z - ZOOM_STEP, MIN_ZOOM); if (n === 1) setPan({ x: 0, y: 0 }); return n; });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isZoomed, current]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Scroll-wheel zoom on desktop
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom(z => {
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }

  // Click to toggle zoom 1× ↔ 2×
  function onImgClick(e: React.MouseEvent) {
    if (isDragging.current) { isDragging.current = false; return; }
    if (zoom > 1) { resetZoom(); return; }
    // Zoom into the click point
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setZoom(2);
    setPan({ x: -cx, y: -cy });
  }

  // Mouse drag when zoomed
  const mouseDown = useRef<{ x: number; y: number } | null>(null);
  function onMouseDown(e: React.MouseEvent) {
    if (!isZoomed) return;
    mouseDown.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    isDragging.current = false;
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!mouseDown.current) return;
    isDragging.current = true;
    setPan({ x: e.clientX - mouseDown.current.x, y: e.clientY - mouseDown.current.y });
  }
  function onMouseUp() { mouseDown.current = null; }

  // Touch: swipe (not zoomed) or pinch-zoom + drag (zoomed)
  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = Math.hypot(dx, dy);
      pinchZoomStart.current = zoom;
    } else {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      lastPan.current = pan;
    }
  }
  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStart.current !== null) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pinchZoomStart.current * (dist / pinchStart.current)));
      setZoom(newZoom);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && isZoomed && touchStartX.current !== null) {
      const dx = e.touches[0].clientX - touchStartX.current!;
      const dy = e.touches[0].clientY - touchStartY.current!;
      setPan({ x: lastPan.current.x + dx, y: lastPan.current.y + dy });
    }
  }
  function onTouchEnd(e: React.TouchEvent) {
    pinchStart.current = null;
    if (!isZoomed && touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  const img = images[current];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          {title} &nbsp;/&nbsp; {current + 1} of {images.length}
        </span>
        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => { const n = Math.max(MIN_ZOOM, z - ZOOM_STEP); if (n === 1) setPan({ x: 0, y: 0 }); return n; })}
            disabled={zoom <= MIN_ZOOM} aria-label="Zoom out"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
            <ZoomOut size={15} />
          </button>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', minWidth: 32, textAlign: 'center' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={() => setZoom(z => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
            disabled={zoom >= MAX_ZOOM} aria-label="Zoom in"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
            <ZoomIn size={15} />
          </button>
          {isZoomed && (
            <button onClick={resetZoom} aria-label="Reset zoom"
              className="flex items-center justify-center px-2 h-8 rounded-full text-xs transition-colors"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em' }}>
              RESET
            </button>
          )}
          <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <button onClick={onClose} aria-label="Close"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div
        className="relative flex-1 flex items-center justify-center min-h-0 overflow-hidden"
        style={{ cursor: isZoomed ? (mouseDown.current ? 'grabbing' : 'grab') : 'zoom-in' }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev — hide when zoomed */}
        {!isZoomed && (
          <button onClick={prev} aria-label="Previous"
            className="absolute left-3 sm:left-5 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Image with zoom + pan transform */}
        <img
          key={img.id}
          src={img.imageUrl}
          alt={img.altText ?? `${title} frame ${current + 1}`}
          onClick={onImgClick}
          draggable={false}
          className="max-w-full max-h-full object-contain rounded-lg select-none"
          style={{
            animation: zoom === 1 ? 'fadeIn 0.22s ease-out' : undefined,
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: mouseDown.current ? 'none' : 'transform 0.2s ease-out',
          }}
        />

        {/* Next — hide when zoomed */}
        {!isZoomed && (
          <button onClick={next} aria-label="Next"
            className="absolute right-3 sm:right-5 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
            <ChevronRight size={22} />
          </button>
        )}

        {/* Zoom hint */}
        {!isZoomed && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            Click or scroll to zoom · Swipe to navigate
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 flex items-center gap-2 px-5 py-3 overflow-x-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {images.map((im, i) => (
          <button
            key={im.id}
            onClick={() => setCurrent(i)}
            aria-label={`Go to frame ${i + 1}`}
            className="shrink-0 rounded-md overflow-hidden transition-all duration-200"
            style={{
              width: 56, height: 40,
              border: i === current ? '2px solid var(--accent)' : '2px solid transparent',
              opacity: i === current ? 1 : 0.45,
            }}
          >
            <img src={im.imageUrl} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
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
              <figure
                key={image.id}
                className="cursor-pointer group"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={image.imageUrl}
                    alt={image.altText ?? `${project.title} frame ${index + 1}`}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest"
                      style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                    >
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
