import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { Pause, Play } from 'lucide-react';
import { useSiteData } from '../lib/siteData';

export function TestimonialCarousel() {
  const { testimonials: allTestimonials } = useSiteData();
  // Only show featured ones; fall back to all if none are featured
  const featured = allTestimonials.filter(t => t.featured);
  const testimonials = featured.length > 0 ? featured : allTestimonials;
  const N = testimonials.length;
  // Looped array: last, all, first, second — only valid when there are at least 2 items
  const loopedItems = N >= 2
    ? [testimonials[N - 1], ...testimonials, testimonials[0], testimonials[1]]
    : testimonials;

  // Real activeIndex refers to index in original testimonials array (0 to N-1)
  // Track state represents index in loopedItems (which starts at 1, corresponding to original index 0)
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  const handleNext = () => {
    if (!isTransitioning || N < 2) return;
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning || N < 2) return;
    setTrackIndex((prev) => prev - 1);
  };

  // Handle jumpback when hitting cloned boundaries (only meaningful when looping with 2+ items)
  useEffect(() => {
    if (N < 2) return;

    if (trackIndex === N + 1) {
      // Reached the clone of 'first'
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTrackIndex(1); // Snap back to original 'first'
      }, 500); // Must match transition duration
      return () => clearTimeout(timer);
    }

    if (trackIndex === 0) {
      // Reached the clone of 'last'
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setTrackIndex(N); // Snap back to original 'last'
      }, 500);
      return () => clearTimeout(timer);
    }

    setIsTransitioning(true);
  }, [trackIndex, N]);

  // Autoplay — pauses on hover or manual pause toggle
  useEffect(() => {
    if (reducedMotion || N < 2) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isTransitioning, reducedMotion]);

  function togglePause() {
    const next = !paused;
    setPaused(next);
    pausedRef.current = next;
  }

  const activeOriginalIndex = N > 0 ? (trackIndex - 1 + N) % N : 0;
  // With fewer than 2 items there's no loop clones — loopedItems is just `testimonials`,
  // so the track must sit at index 0 regardless of trackIndex's looped-array convention.
  const effectiveTrackIndex = N < 2 ? 0 : trackIndex;

  if (N === 0) return null;

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          Client Feedback
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      <div
        className="relative w-full max-w-6xl mx-auto"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { if (!paused) pausedRef.current = false; }}
      >
        {/* Left/Right Fade Masking (lg+ only) */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {/* Carousel Window */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-6 transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${effectiveTrackIndex * 100}% - ${effectiveTrackIndex * 24}px + 50vw - 12px - 50%))`,
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {loopedItems.map((item, idx) => {
              const originalIndex = (idx - 1 + N) % N;
              const isActive = originalIndex === activeOriginalIndex;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className={`w-[290px] sm:w-[380px] md:w-[450px] shrink-0 rounded-2xl bg-surface p-6 sm:p-8 flex flex-col justify-between border transition-all duration-500 relative ${
                    isActive
                      ? 'border-accent/50 bg-surface scale-100 shadow-[0_6px_20px_-10px_color-mix(in_srgb,var(--accent)_35%,transparent)]'
                      : 'border-line opacity-40 scale-95'
                  }`}
                >
                  {/* Glow effect on active item */}
                  {isActive && (
                    <div
                      className="absolute -inset-px rounded-2xl pointer-events-none opacity-40 -z-10"
                      style={{ background: 'var(--accent-glow)' }}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image ?? undefined}
                          alt={item.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-line"
                        />
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-ivory leading-none">{item.name}</h4>
                          <span className="text-xs text-stone">{item.designation}</span>
                        </div>
                      </div>
                      <Sparkles size={16} className="text-accent" />
                    </div>
                    <p className="text-sm sm:text-base text-ivory/80 italic leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons — only meaningful with 2+ testimonials to cycle through */}
        {N >= 2 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => {
                const active = idx === activeOriginalIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTrackIndex(idx + 1);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                      active ? 'w-6 bg-accent' : 'w-2 bg-ivory/20 hover:bg-ivory/40'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Pause / Play toggle */}
            {!reducedMotion && (
              <button
                onClick={togglePause}
                className="p-3 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
