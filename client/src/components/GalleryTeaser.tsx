import { ArrowUpRight } from 'lucide-react';
import { BlurImage } from './BlurImage';

const tiles = [
  { src: '/assets/media/architecture-hero.jpeg', label: 'Architecture', slug: 'architecture', span: 'sm:row-span-2 sm:col-span-2 aspect-[4/5]' },
  { src: '/assets/media/fashion-hero.jpeg',      label: 'Fashion',      slug: 'fashion',      span: 'aspect-square' },
  { src: '/assets/media/interiors-hero.jpeg',    label: 'Interiors',    slug: 'interiors',    span: 'aspect-square' },
  { src: '/assets/media/commercial-hero.jpeg',   label: 'Commercial',   slug: 'commercial',   span: 'sm:col-span-2 aspect-[16/9]' },
  { src: '/assets/media/food-hero.jpeg',         label: 'Food',         slug: 'food',         span: 'aspect-square' },
  { src: '/assets/media/product-hero.jpeg',      label: 'Product',      slug: 'product',      span: 'aspect-square' }
];

type Props = {
  onSeeAll?: () => void;
  onSelectCategory?: (slug: string) => void;
};

export function GalleryTeaser({ onSeeAll, onSelectCategory }: Props) {
  return (
    <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
            Recent Frames
          </span>
          <h2
            className="text-ivory mt-3"
            style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
          >
            A peek inside the archive.
          </h2>
        </div>
        <button
          onClick={onSeeAll}
          className="self-start sm:self-end inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-ivory/70 hover:text-ivory border border-linemid hover:border-accent/40 rounded-full px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
        >
          See full portfolio
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile) => (
          <figure
            key={tile.label}
            className={`relative group overflow-hidden rounded-xl border border-line ${tile.span} ${onSelectCategory ? 'cursor-pointer' : ''}`}
            onClick={() => onSelectCategory?.(tile.slug)}
            role={onSelectCategory ? 'button' : undefined}
            aria-label={onSelectCategory ? `View ${tile.label} portfolio` : undefined}
          >
            <BlurImage
              src={tile.src}
              alt={tile.label}
              loading="lazy"
              decoding="async"
              wrapperClassName="absolute inset-0"
              className="transition-transform duration-[800ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-400" />
            {/* Accent tint on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-400" style={{ background: 'var(--accent)' }} />
            <figcaption className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-ivory">
                {tile.label}
              </span>
              <span className="w-7 h-7 rounded-full bg-accent/80 backdrop-blur-md border border-accent flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                <ArrowUpRight size={12} />
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
