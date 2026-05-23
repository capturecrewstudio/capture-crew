import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav Mehta',
    designation: 'Principal Architect, AM Studio',
    message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human.',
    image: '/assets/media/architecture-detail-1.jpeg'
  },
  {
    name: 'Ira Kapoor',
    designation: 'Brand Director, Solenne',
    message: 'The team turned our campaign into a visual world. We used the assets across web, print, press, and investor presentations.',
    image: '/assets/media/fashion-detail-1.jpeg'
  },
  {
    name: 'Rohan Sethi',
    designation: 'Founder, Atlas Table',
    message: 'The launch film gave our restaurant an identity before guests had even stepped through the door.',
    image: '/assets/media/food-detail-1.jpeg'
  },
  {
    name: 'Riya J.',
    designation: 'Founder, Boutique Fashion Brand',
    message: 'Capture Crew took our brand visuals to the next level. Their turnaround, edit quality, and production direction are unmatched.',
    image: '/assets/media/fashion-hero.jpeg'
  },
  {
    name: 'Kunal P.',
    designation: 'Director, Luxury Realty Group',
    message: 'We saw a 3x boost in organic customer engagement after switching our campaign assets and social management to the Crew.',
    image: '/assets/media/interiors-hero.jpeg'
  }
];

export function TestimonialCarousel() {
  const N = testimonials.length;
  // Looped array: last, all, first, second
  const loopedItems = [testimonials[N - 1], ...testimonials, testimonials[0], testimonials[1]];
  
  // Real activeIndex refers to index in original testimonials array (0 to N-1)
  // Track state represents index in loopedItems (which starts at 1, corresponding to original index 0)
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  const handleNext = () => {
    if (!isTransitioning) return;
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isTransitioning) return;
    setTrackIndex((prev) => prev - 1);
  };

  // Handle jumpback when hitting cloned boundaries
  useEffect(() => {
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

  // Autoplay
  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      handleNext();
    };

    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [isTransitioning, reducedMotion]);

  const activeOriginalIndex = (trackIndex - 1 + N) % N;

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
          Client Feedback
        </span>
        <h2
          className="text-white mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* Left/Right Fade Masking (lg+ only) */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#131313] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#131313] to-transparent z-10 pointer-events-none" />

        {/* Carousel Window */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-6 transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${trackIndex * 100}% - ${trackIndex * 24}px + 50vw - 12px - 50%))`,
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {loopedItems.map((item, idx) => {
              const originalIndex = (idx - 1 + N) % N;
              const isActive = originalIndex === activeOriginalIndex;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className={`w-[290px] sm:w-[380px] md:w-[450px] shrink-0 rounded-2xl bg-[#161616] p-6 sm:p-8 flex flex-col justify-between border transition-all duration-500 relative ${
                    isActive
                      ? 'border-[#5433FF]/50 bg-[#1a1a1a] scale-100 shadow-[0_6px_20px_-10px_rgba(88,164,255,0.35)]'
                      : 'border-white/5 opacity-40 scale-95'
                  }`}
                >
                  {/* Glow effect on active item */}
                  {isActive && (
                    <div
                      className="absolute -inset-px rounded-2xl pointer-events-none opacity-40 -z-10"
                      style={{ background: 'var(--blue-glow)' }}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white leading-none">{item.name}</h4>
                          <span className="text-xs text-white/50">{item.designation}</span>
                        </div>
                      </div>
                      <Sparkles size={16} className="text-[#58A4FF]" />
                    </div>
                    <p className="text-sm sm:text-base text-white/80 italic leading-relaxed">
                      “{item.message}”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-[#58A4FF] hover:scale-105 active:scale-95 transition-all duration-300"
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
                    active ? 'w-6 bg-[#20BDFF]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-[#58A4FF] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
