import { useEffect, useRef, useState, useMemo } from 'react';

const timelineItems = [
  {
    title: 'Architecture',
    description: 'Built environments framed through proportion, light, material honesty, and structural lines.',
    image: '/assets/media/architecture-hero.jpeg',
    location: 'Surat | Bengaluru | Ludhiana'
  },
  {
    title: 'Luxury Interiors',
    description: 'Editorial interior stories for high-end residences, hotels, private galleries, and hospitality brands.',
    image: '/assets/media/interiors-hero.jpeg',
    location: 'Mumbai | London | Pune'
  },
  {
    title: 'Fashion Editorials',
    description: 'Campaign imagery, lookbooks, motion portraits, and studio portfolios with international polish.',
    image: '/assets/media/fashion-hero.jpeg',
    location: 'Chandigarh | Ludhiana | Mumbai'
  },
  {
    title: 'Commercial & Brand Films',
    description: 'Cinematic corporate launch films, product teasers, explainer videos, and brand storytelling.',
    image: '/assets/media/commercial-hero.jpeg',
    location: 'Gurgaon | Surat | London'
  },
  {
    title: 'Product Shoots',
    description: 'Still-life systems for design objects, cosmetics, luxury accessories, packaging, and e-commerce.',
    image: '/assets/media/product-hero.jpeg',
    location: 'Delhi | Bengaluru | Chandigarh'
  },
  {
    title: 'Food & Beverage',
    description: 'Intimate food, beverage, menu designs, and luxury restaurant stories that feel sensory and raw.',
    image: '/assets/media/food-hero.jpeg',
    location: 'Goa | Pune | Bengaluru'
  },
  {
    title: 'Weddings',
    description: 'Editorial wedding archives capturing quiet luxury, raw emotions, intimacy, and cinematic depth.',
    image: '/assets/media/wedding-hero.jpeg',
    location: 'Udaipur | Chandigarh | Global'
  }
];

const ITEM_DURATION = 2500; // 2.5s per item for easier reading
const TOTAL_DURATION = timelineItems.length * ITEM_DURATION;

export function FeatureTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1280);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs for animation loop
  const startTimeRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const pausedAtRef = useRef<number>(0);
  const requestRef = useRef<number>(0);

  // DOM elements refs
  const progressBarContainerRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  // Keep track of desktop media queries
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation Loop
  useEffect(() => {
    if (reducedMotion) {
      // If motion is reduced, do not run rAF loop
      if (progressFillRef.current) {
        progressFillRef.current.style.height = '100%';
      }
      return;
    }

    startTimeRef.current = performance.now() - activeIndex * ITEM_DURATION;

    const animate = (now: number) => {
      if (pausedRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (now - startTimeRef.current) % TOTAL_DURATION;
      const progress = elapsed / TOTAL_DURATION; // 0 to 1
      const currentItem = Math.floor(elapsed / ITEM_DURATION);

      // Write progress directly to DOM to avoid 60fps React state re-renders
      if (progressFillRef.current && progressBarContainerRef.current) {
        const totalHeight = progressBarContainerRef.current.clientHeight;
        progressFillRef.current.style.height = `${progress * totalHeight}px`;
      }

      // Only set React state when the active index actually shifts
      if (currentItem !== activeIndex && currentItem >= 0 && currentItem < timelineItems.length) {
        setActiveIndex(currentItem);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [activeIndex, reducedMotion]);

  // Pause on hover handlers
  const handleMouseEnter = () => {
    if (isDesktop && !reducedMotion) {
      pausedRef.current = true;
      pausedAtRef.current = performance.now();
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop && pausedRef.current && !reducedMotion) {
      const now = performance.now();
      // Shift start time by duration of the pause
      startTimeRef.current += (now - pausedAtRef.current);
      pausedRef.current = false;
    }
  };

  // Click to jump
  const handleItemClick = (idx: number) => {
    const now = performance.now();
    startTimeRef.current = now - idx * ITEM_DURATION;
    setActiveIndex(idx);
  };

  return (
    <section className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-20 xl:my-28 z-10 px-4 sm:px-6">
      
      {/* Left side items & progress bar (grid-span 7) */}
      <div 
        className="lg:col-span-7 flex gap-6 sm:gap-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Progress Bar Container */}
        <div 
          ref={progressBarContainerRef}
          className="relative w-[3px] bg-ivory/10 rounded-full h-[520px] shrink-0"
        >
          {/* Active Gradient progress fill */}
          <div
            ref={progressFillRef}
            className="absolute top-0 left-0 w-full rounded-full transition-all duration-100 ease-out"
            style={{
              background: 'var(--brand-gradient)',
              height: '0px'
            }}
          />
        </div>

        {/* Timeline Items List */}
        <div className="flex-1 flex flex-col justify-between py-1 h-[520px]">
          {timelineItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.title}
                onClick={() => handleItemClick(idx)}
                className="group cursor-pointer select-none relative"
              >
                {/* Glow behind the active item text */}
                <div
                  className="absolute -inset-x-4 -inset-y-2 rounded-xl pointer-events-none transition-opacity duration-1000 -z-10"
                  style={{
                    background: 'var(--gold-glow)',
                    opacity: isActive ? 0.3 : 0
                  }}
                />

                <h3
                  className={`text-lg sm:text-xl font-bold transition-all duration-500 uppercase tracking-wider ${
                    isActive
                      ? 'text-[#C8A96B]'
                      : 'text-stone/70 group-hover:text-ivory/80'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Grid-template-rows expansion container */}
                <div
                  className="grid transition-all duration-700 ease-in-out overflow-hidden"
                  style={{
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    opacity: isActive ? 1 : 0
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-ivory/70 mt-2 max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-block text-xs font-mono text-[#C8A96B] mt-1">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side Stacked images (grid-span 5) */}
      <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-line bg-surface shadow-2xl">
        {timelineItems.map((item, idx) => {
          // Compute clip-path
          let clipPathStr = 'inset(100% 0% 0% 0%)'; // Future items (wiped down)
          if (idx === activeIndex) {
            clipPathStr = 'inset(0% 0% 0% 0%)'; // Active (fully visible)
          } else if (idx < activeIndex) {
            clipPathStr = 'inset(0% 0% 100% 0%)'; // Past items (wiped up)
          }

          return (
            <div
              key={`img-${idx}`}
              className="absolute inset-0 w-full h-full transition-[clip-path] duration-700 ease-out"
              style={{
                clipPath: reducedMotion ? (idx === activeIndex ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)') : clipPathStr,
                zIndex: idx === activeIndex ? 2 : 1
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover scale-[1.01] hover:scale-105 transition-transform duration-[2000ms]"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
