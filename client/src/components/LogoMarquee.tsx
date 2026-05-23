import { useEffect, useRef, useState } from 'react';

const partners = [
  'Raymond',
  'Mini Soo',
  'Prada',
  'Bluestone',
  'Ori',
  'National Geographic',
  'Solenne',
  'AM Studio'
];

export function LogoMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const [offsetMeasured, setOffsetMeasured] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (track1Ref.current && track2Ref.current && containerRef.current) {
        const rect1 = track1Ref.current.getBoundingClientRect();
        const rect2 = track2Ref.current.getBoundingClientRect();
        // Distance between first track and second track is the exact wrap-around width
        const diff = Math.ceil(rect2.left - rect1.left);
        if (diff > 0) {
          containerRef.current.style.setProperty('--marquee-offset', `-${diff}px`);
          setOffsetMeasured(true);
        }
      }
    };

    // Wait for initial render to settle
    const timer = setTimeout(measure, 150);

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-8 sm:py-12 border-y border-line bg-bg/40 relative z-10"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: offsetMeasured ? 'marquee 28s linear infinite' : 'none',
          willChange: 'transform'
        }}
      >
        {/* Track 1 */}
        <div ref={track1Ref} className="flex gap-16 sm:gap-24 md:gap-32 px-8 sm:px-16 items-center shrink-0">
          {partners.map((partner, index) => (
            <span
              key={`track1-${partner}-${index}`}
              className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-stone/40 hover:text-[#C8A96B] transition-colors duration-300 select-none font-mono"
            >
              {partner}
            </span>
          ))}
        </div>
        {/* Track 2 (Cloned) */}
        <div ref={track2Ref} className="flex gap-16 sm:gap-24 md:gap-32 px-8 sm:px-16 items-center shrink-0">
          {partners.map((partner, index) => (
            <span
              key={`track2-${partner}-${index}`}
              className="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-stone/40 hover:text-[#C8A96B] transition-colors duration-300 select-none font-mono"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
