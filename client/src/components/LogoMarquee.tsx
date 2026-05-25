import { useEffect, useRef, useState } from 'react';

const luxuryBrands = [
  'Raymond', 'Prada', 'Bluestone', 'ORRA', 'Malabar Gold and Diamonds',
  'National Geographic', 'Zara', 'Gillette', 'Nike', 'Mini So'
];

const architectureStudios = [
  'Green Lotus', 'Genesis Heights', 'STJ Groups', 'Atulyam The Bliss',
  'AR. Rahul Bamba', 'Co.lab Designs Studio', 'Studio 261',
  'AR Amit Khanna', 'Inner Value Architects', 'Nomatic Luxe'
];

function MarqueeRow({ items, reverse = false, speed = 30 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);
  const [offsetMeasured, setOffsetMeasured] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (track1Ref.current && track2Ref.current && containerRef.current) {
        const diff = Math.ceil(track2Ref.current.getBoundingClientRect().left - track1Ref.current.getBoundingClientRect().left);
        if (diff > 0) {
          containerRef.current.style.setProperty('--marquee-offset', `-${diff}px`);
          setOffsetMeasured(true);
        }
      }
    };
    const timer = setTimeout(measure, 150);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: offsetMeasured ? `marquee ${speed}s linear infinite` : 'none',
          animationDirection: reverse ? 'reverse' : 'normal',
          willChange: 'transform'
        }}
      >
        <div ref={track1Ref} className="flex gap-12 sm:gap-20 md:gap-28 px-8 sm:px-12 items-center shrink-0">
          {items.map((item, i) => (
            <span
              key={`t1-${i}`}
              className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-stone/40 hover:text-accent transition-colors duration-300 select-none font-mono"
            >
              {item}
            </span>
          ))}
        </div>
        <div ref={track2Ref} className="flex gap-12 sm:gap-20 md:gap-28 px-8 sm:px-12 items-center shrink-0">
          {items.map((item, i) => (
            <span
              key={`t2-${i}`}
              className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-stone/40 hover:text-accent transition-colors duration-300 select-none font-mono"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="w-full border-y border-line bg-bg/40 relative z-10 py-6 sm:py-10 flex flex-col gap-6">
      <div className="flex items-center gap-4 px-8">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone/40 font-mono shrink-0">Luxury Brands</span>
        <span className="h-px flex-1 bg-line/40" />
      </div>
      <MarqueeRow items={luxuryBrands} speed={32} />

      <div className="flex items-center gap-4 px-8 mt-2">
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone/40 font-mono shrink-0">Architecture Studios</span>
        <span className="h-px flex-1 bg-line/40" />
      </div>
      <MarqueeRow items={architectureStudios} reverse speed={28} />
    </div>
  );
}
