import { ArrowUpRight } from 'lucide-react';

const tiles = [
  { src: '/assets/media/architecture-hero.jpeg', label: 'Architecture', span: 'sm:row-span-2 sm:col-span-2 aspect-[4/5]' },
  { src: '/assets/media/fashion-hero.jpeg', label: 'Fashion', span: 'aspect-square' },
  { src: '/assets/media/interiors-hero.jpeg', label: 'Interiors', span: 'aspect-square' },
  { src: '/assets/media/commercial-hero.jpeg', label: 'Commercial', span: 'sm:col-span-2 aspect-[16/9]' },
  { src: '/assets/media/food-hero.jpeg', label: 'Food', span: 'aspect-square' },
  { src: '/assets/media/product-hero.jpeg', label: 'Product', span: 'aspect-square' }
];

type Props = {
  onSeeAll?: () => void;
};

export function GalleryTeaser({ onSeeAll }: Props) {
  return (
    <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
            Recent Frames
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3 leading-tight">
            A peek inside the archive.
          </h2>
        </div>
        <button
          onClick={onSeeAll}
          className="self-start sm:self-end inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-5 py-3 transition-all duration-300 hover:-translate-y-0.5"
        >
          See full portfolio
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile) => (
          <figure
            key={tile.label}
            className={`relative group overflow-hidden rounded-xl border border-white/10 ${tile.span}`}
          >
            <img
              src={tile.src}
              alt={tile.label}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <figcaption className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white">
                {tile.label}
              </span>
              <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight size={12} />
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
