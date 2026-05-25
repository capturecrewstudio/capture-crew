import { useEffect, useRef, useState } from 'react';
import { Building2, Home, Gem } from 'lucide-react';

const panels = [
  {
    title: 'Architecture',
    icon: Building2,
    subtitle: 'Your work is extraordinary. Show it that way.',
    description: 'Great spaces go unnoticed when the content doesn\'t match the craft. We document your projects with the precision they deserve — cinematic walkthroughs, editorial stills, and reels that stop the scroll. You design. We make the world see it.',
    image: '/assets/media/dsc-ccs-7.jpeg',
    tags: ['Site Shoots', 'Cinematic Reels', 'Walkthroughs', 'Social Content']
  },
  {
    title: 'Real Estate',
    icon: Home,
    subtitle: 'Buyers decide online. Make it count.',
    description: 'Premium properties deserve visuals that sell before a single site visit. Drone aerials, luxury walkthroughs, construction stories, and launch films — we craft content that makes buyers feel the space before they step inside. Presentation sells faster than price.',
    image: '/assets/media/real-estate-hero.jpeg',
    tags: ['Drone Shoots', 'Luxury Films', 'Progress Videos', 'Photography']
  },
  {
    title: 'Luxury Brands',
    icon: Gem,
    subtitle: 'World-class brands deserve world-class visuals.',
    description: 'Behind every frame is a full team obsessed with making your brand impossible to ignore. Directing, color grading, storytelling — all engineered to position you at the top. Trusted by 160+ architects and 65+ premium brands across India.',
    image: '/assets/media/commercial-hero.jpeg',
    tags: ['Brand Visuals', 'Color Grading', 'Storytelling', 'Directing']
  }
];

export function AutoScanPanels() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((prev) => (prev + 1) % panels.length);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden bg-bg flex items-center justify-start rounded-2xl border border-line my-10 relative z-10"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Background Images Cross-Fade */}
      {panels.map((panel, idx) => (
        <div
          key={`bg-${idx}`}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${panel.image})`,
            opacity: index === idx ? 0.45 : 0,
            zIndex: 1
          }}
        />
      ))}

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-[2]" />

      {/* Left side content */}
      <div className="relative z-[3] w-full max-w-2xl px-6 sm:px-12 md:px-20 py-10 flex flex-col justify-center h-full gap-6">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone">
          Core Capabilities
        </span>

        {/* Stacked cards with fade effect */}
        <div className="relative h-[300px] sm:h-[280px] w-full">
          {panels.map((panel, idx) => {
            const Icon = panel.icon;
            const active = index === idx;
            return (
              <div
                key={`card-${idx}`}
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

                <p className="text-sm sm:text-base text-ivory/70 leading-relaxed my-4">
                  {panel.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {panel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-line bg-ivory/5 text-ivory/80 font-medium font-mono"
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
              key={`dot-${idx}`}
              onClick={() => setIndex(idx)}
              className="group flex flex-col items-start gap-1 text-left focus:outline-none"
              aria-label={`View ${panel.title}`}
            >
              <div
                className={`h-[2px] transition-all duration-300 ${
                  index === idx ? 'w-16 bg-accent' : 'w-8 bg-ivory/20 group-hover:bg-ivory/40'
                }`}
              />
              <span
                className={`text-xs uppercase font-mono tracking-wider transition-colors ${
                  index === idx ? 'text-ivory' : 'text-stone/70 group-hover:text-ivory/70'
                }`}
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
