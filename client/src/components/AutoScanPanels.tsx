import { useEffect, useRef, useState } from 'react';
import { Building2, Home, Gem, Shirt, Layers } from 'lucide-react';
import { apiGetCapabilities, type ApiCapability } from '../lib/adminApi';

const ICON_MAP: Record<string, React.ElementType> = {
  Architecture:   Building2,
  'Real Estate':  Home,
  'Luxury Brands': Gem,
  Fashion:        Shirt,
};

const FALLBACK: ApiCapability[] = [
  {
    id: '1', sortOrder: 0, createdAt: '', updatedAt: '',
    title: 'Architecture',
    subtitle: 'Your work is extraordinary. Show it that way.',
    description: "Great spaces go unnoticed when the content doesn't match the craft. We document your projects with the precision they deserve — cinematic walkthroughs, editorial stills, and reels that stop the scroll. You design. We make the world see it.",
    image: '/assets/media/dsc-ccs-7.jpeg',
    tags: ['Site Shoots', 'Cinematic Reels', 'Walkthroughs', 'Social Content'],
  },
  {
    id: '2', sortOrder: 1, createdAt: '', updatedAt: '',
    title: 'Real Estate',
    subtitle: 'Buyers decide online. Make it count.',
    description: 'Premium properties deserve visuals that sell before a single site visit. Drone aerials, luxury walkthroughs, construction stories, and launch films — we craft content that makes buyers feel the space before they step inside.',
    image: '/assets/media/real-estate-hero.jpeg',
    tags: ['Drone Shoots', 'Luxury Films', 'Progress Videos', 'Photography'],
  },
  {
    id: '3', sortOrder: 2, createdAt: '', updatedAt: '',
    title: 'Luxury Brands',
    subtitle: 'World-class brands deserve world-class visuals.',
    description: 'Behind every frame is a full team obsessed with making your brand impossible to ignore. Directing, color grading, storytelling — all engineered to position you at the top.',
    image: '/assets/media/commercial-hero.jpeg',
    tags: ['Brand Visuals', 'Color Grading', 'Storytelling', 'Directing'],
  },
  {
    id: '4', sortOrder: 3, createdAt: '', updatedAt: '',
    title: 'Fashion',
    subtitle: 'Style that speaks before a word is said.',
    description: 'From editorial lookbooks to campaign films, we bring the full force of cinematic production to fashion. Every frame is styled, lit, and directed with intent — built to stop the feed, land the campaign, and make the label unforgettable.',
    image: '/assets/media/fashion-editorials-hero.jpeg',
    tags: ['Lookbooks', 'Campaign Films', 'Editorial Shoots', 'Brand Reels'],
  },
];

export function AutoScanPanels() {
  const [panels, setPanels] = useState<ApiCapability[]>(FALLBACK);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    apiGetCapabilities()
      .then((data) => { if (data.length > 0) setPanels(data); })
      .catch(() => { /* keep fallback */ });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((prev) => (prev + 1) % panels.length);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [panels.length]);

  return (
    <section
      className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden bg-bg flex items-center justify-start rounded-2xl border border-line my-10 relative z-10"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Background Images Cross-Fade */}
      {panels.map((panel, idx) => (
        <div
          key={`bg-${panel.id}`}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: panel.image ? `url(${panel.image})` : undefined,
            opacity: index === idx ? 0.45 : 0,
            zIndex: 1
          }}
        />
      ))}

      {/* Vignette — uses bg colour so it works on both dark and light themes */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 55%, transparent 100%)' }}
      />

      {/* Left side content */}
      <div className="relative z-[3] w-full max-w-2xl px-6 sm:px-12 md:px-20 py-10 flex flex-col justify-center h-full gap-6">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone">
          Core Capabilities
        </span>

        {/* Stacked cards with fade effect */}
        <div className="relative h-[300px] sm:h-[280px] w-full">
          {panels.map((panel, idx) => {
            const Icon = ICON_MAP[panel.title] ?? Layers;
            const active = index === idx;
            return (
              <div
                key={`card-${panel.id}`}
                className={`absolute inset-0 flex flex-col justify-start transition-all duration-700 ease-in-out ${
                  active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="p-3 rounded-xl border border-line flex items-center justify-center text-ivory"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-accent text-ivory">{panel.title}</h3>
                    <p className="text-xs text-stone font-medium tracking-wide">{panel.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed my-4" style={{ color: 'var(--ivory)', opacity: 0.75 }}>
                  {panel.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {(panel.tags as string[]).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full font-medium font-mono"
                      style={{
                        border: '1px solid var(--line-mid)',
                        background: 'var(--surface)',
                        color: 'var(--ivory)',
                        opacity: 0.85,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots / Tabs */}
        <div className="flex items-center gap-4 mt-4">
          {panels.map((panel, idx) => (
            <button
              key={`dot-${panel.id}`}
              onClick={() => setIndex(idx)}
              className="group flex flex-col items-start gap-1 text-left focus:outline-none"
              aria-label={`View ${panel.title}`}
            >
              <div
                className="h-[2px] transition-all duration-300"
                style={{
                  width: index === idx ? 64 : 32,
                  background: index === idx ? 'var(--accent)' : 'var(--line-mid)',
                }}
              />
              <span
                className="text-xs uppercase font-mono tracking-wider transition-colors"
                style={{ color: index === idx ? 'var(--ivory)' : 'var(--stone)' }}
              >
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
