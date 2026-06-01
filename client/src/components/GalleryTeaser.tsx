import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { apiGetProjects, apiGetCategories, type ApiCategory, type ApiProject } from '../lib/adminApi';

const CYCLE_MS = 3200;
const FADE_MS = 900;

type Tile = {
  label: string;
  slug: string;
  images: string[];
};

function GalleryTile({ tile, onSelectCategory, staggerMs }: {
  tile: Tile;
  onSelectCategory?: (slug: string) => void;
  staggerMs: number;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingIdx, setFadingIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (tile.images.length < 2) return;
    const start = () => {
      timerRef.current = setTimeout(() => {
        setActiveIdx(prev => {
          const next = (prev + 1) % tile.images.length;
          setFadingIdx(next);
          setTimeout(() => setFadingIdx(null), FADE_MS);
          return next;
        });
        start();
      }, CYCLE_MS);
    };
    const init = setTimeout(start, staggerMs);
    return () => { clearTimeout(init); clearTimeout(timerRef.current); };
  }, [tile.images.length, staggerMs]);

  return (
    <figure
      className={`relative group overflow-hidden rounded-2xl border border-line aspect-square ${onSelectCategory ? 'cursor-pointer' : ''}`}
      onClick={() => onSelectCategory?.(tile.slug)}
      role={onSelectCategory ? 'button' : undefined}
      aria-label={onSelectCategory ? `View ${tile.label} portfolio` : undefined}
    >
      {tile.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={tile.label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ease-in-out group-hover:scale-105 transition-transform duration-[1200ms]"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            zIndex: i === activeIdx ? 2 : fadingIdx === i ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500" style={{ background: 'var(--accent)' }} />

      {tile.images.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex gap-1">
          {tile.images.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ background: i === activeIdx ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      )}

      <figcaption className="absolute left-4 bottom-4 right-4 z-20 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-ivory drop-shadow-sm">
          {tile.label}
        </span>
        <span className="w-7 h-7 rounded-full bg-accent/80 backdrop-blur-md border border-accent flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={12} />
        </span>
      </figcaption>
    </figure>
  );
}

type Props = {
  onSeeAll?: () => void;
  onSelectCategory?: (slug: string) => void;
};

export function GalleryTeaser({ onSeeAll, onSelectCategory }: Props) {
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    Promise.all([apiGetCategories(), apiGetProjects()])
      .then(([cats, projects]) => {
        // Build tiles from categories — use project images for each category
        const built: Tile[] = cats.map((cat: ApiCategory) => {
          const catProjects = projects.filter((p: ApiProject) => p.category.slug === cat.slug);
          // Collect up to 2 images: cover images from projects in this category
          const images = catProjects
            .filter(p => p.coverImage)
            .map(p => p.coverImage as string)
            .slice(0, 2);
          return { label: cat.name, slug: cat.slug, images };
        }).filter((t: Tile) => t.images.length > 0); // only show categories that have images
        setTiles(built);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center gap-5 mb-12">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          Recent Frames
        </span>
        <h2 className="text-ivory" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}>
          A peek inside the archive.
        </h2>
        <button
          onClick={onSeeAll}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-ivory/70 hover:text-ivory border border-linemid hover:border-accent/40 rounded-full px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
        >
          See full portfolio <ArrowUpRight size={14} />
        </button>
      </div>

      {tiles.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {tiles.map((tile, i) => (
            <GalleryTile key={tile.slug} tile={tile} onSelectCategory={onSelectCategory} staggerMs={i * 800} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 opacity-40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-2xl border border-line bg-surface animate-pulse" />
          ))}
        </div>
      )}
    </section>
  );
}
