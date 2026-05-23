import { useEffect, useState } from 'react';
import { Camera, Clapperboard, TrendingUp } from 'lucide-react';

const panels = [
  {
    title: 'Photography',
    icon: Camera,
    subtitle: 'High-end brand assets',
    description: 'We shoot scroll-stopping stills that speak your brand language: Architectural projects, luxury residential interiors, fashion campaigns, premium products, and culinary menu stories.',
    image: '/assets/media/architecture-hero.jpeg',
    tags: ['Architecture', 'Fashion', 'E-commerce', 'Food']
  },
  {
    title: 'Videography',
    icon: Clapperboard,
    subtitle: 'Cinematic brand films',
    description: 'Motion that excites, engages, and converts. From multi-million dollar real estate launch films to high-conversion Reels/Shorts, brand commercials, and drone capture.',
    image: '/assets/media/commercial-hero.jpeg',
    tags: ['Brand Films', 'Social Reels', 'Demos', 'Aerials']
  },
  {
    title: 'Digital Marketing',
    icon: TrendingUp,
    subtitle: 'Strategic brand amplification',
    description: 'We don’t just capture visuals — we make sure they perform. End-to-end Social Media Management (SMM), hyper-targeted Google/Meta Ads campaigns, SEO, and monthly ROI reports.',
    image: '/assets/media/interiors-hero.jpeg',
    tags: ['SMM Strategy', 'Ad Campaigns', 'SEO', 'Influencers']
  }
];

export function AutoScanPanels() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Check if prefers-reduced-motion is enabled
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return; // Skip auto-rotation
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % panels.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden bg-black flex items-center justify-start rounded-2xl border border-white/10 my-10 relative z-10">
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

      {/* Left side content - absolute panels */}
      <div className="relative z-[3] w-full max-w-2xl px-6 sm:px-12 md:px-20 py-10 flex flex-col justify-center h-full gap-6">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50">
          Core Capabilities
        </span>

        {/* Stacked cards with fade effect */}
        <div className="relative h-[300px] sm:h-[260px] w-full">
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
                    className="p-3 rounded-xl border border-white/10 flex items-center justify-center text-white"
                    style={{ background: 'var(--brand-gradient)' }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-accent text-white">{panel.title}</h3>
                    <p className="text-xs text-white/60 font-medium tracking-wide">{panel.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed my-4">
                  {panel.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {panel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80 font-medium font-mono"
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
            >
              <div
                className={`h-[2px] transition-all duration-300 ${
                  index === idx ? 'w-16 bg-[#20BDFF]' : 'w-8 bg-white/20 group-hover:bg-white/40'
                }`}
              />
              <span
                className={`text-xs uppercase font-mono tracking-wider transition-colors ${
                  index === idx ? 'text-white' : 'text-white/40 group-hover:text-white/70'
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
