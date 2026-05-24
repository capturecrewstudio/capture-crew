import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Camera, Building2, Award, Users } from 'lucide-react';
import { getSiteContent, subscribeAdminStore } from '../lib/adminStore';

const architectureStudiosBase = [
  'Green Lotus', 'Genesis Heights', 'STJ Groups', 'Atulyam The Bliss',
  'AR. Rahul Bamba', 'Co.lab Designs Studio', 'Studio 261',
  'AR Amit Khanna', 'Inner Value Architects', 'Nomatic Luxe'
];
const architectureStudios = [...architectureStudiosBase, ...architectureStudiosBase];

const ICONS = [Camera, Building2, Award, Users];

function useCountUp(target: number, start: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return; }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationMs, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);
  return value;
}

type StatDef = { icon: typeof Camera; value: number; suffix: string; label: string };

function StatTile({ stat, start, index }: { stat: StatDef; start: boolean; index: number }) {
  const Icon = stat.icon;
  const value = useCountUp(stat.value, start, 1200 + index * 180);
  return (
    <div
      className="relative group flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-accent/30"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" style={{ background: 'var(--accent)' }} />
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-line shrink-0" style={{ background: 'linear-gradient(135deg, var(--accent-dim), transparent)' }}>
        <Icon size={18} style={{ color: 'var(--accent)' }} />
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-extrabold text-ivory tabular-nums" style={{ fontFamily: "'Cormorant Garant', serif", fontSize: 'clamp(2.6rem, 4.5vw, 4rem)', lineHeight: 1 }}>
          {value}
        </span>
        <span className="font-bold text-sm" style={{ color: 'var(--accent)', fontFamily: "'DM Mono', monospace" }}>
          {stat.suffix}
        </span>
      </div>
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-stone" style={{ fontFamily: "'DM Mono', monospace" }}>
        {stat.label}
      </p>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: 'var(--accent)' }} />
    </div>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const content = useSyncExternalStore(subscribeAdminStore, getSiteContent);

  const stats: StatDef[] = [
    { icon: ICONS[0], value: content.statShoots,     suffix: content.statShoots_suffix,     label: content.statShoots_label     },
    { icon: ICONS[1], value: content.statArchitects,  suffix: content.statArchitects_suffix,  label: content.statArchitects_label  },
    { icon: ICONS[2], value: content.statBrands,      suffix: content.statBrands_suffix,      label: content.statBrands_label      },
    { icon: ICONS[3], value: content.statYears,       suffix: content.statYears_suffix,       label: content.statYears_label       },
  ];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // One full track of items — duplicated in JSX so CSS -50% translate loops perfectly
  const track = content.partners.map((name, i) => (
    <span key={i} className="flex items-center shrink-0">
      <span
        className="inline-block w-1 h-1 rounded-full mx-8 sm:mx-12 md:mx-16 opacity-35 shrink-0"
        style={{ background: 'var(--accent)' }}
      />
      <span
        className="text-sm sm:text-lg md:text-xl uppercase tracking-[0.3em] text-stone/40 hover:text-ivory transition-colors duration-500 cursor-default select-none"
        style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
      >
        {name}
      </span>
    </span>
  ));

  return (
    <section ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

      {/* Header */}
      <div className="text-center mb-10">
        <span
          className="text-[0.65rem] uppercase tracking-[0.26em] text-accent"
          style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
        >
          {content.socialProofEyebrow}
        </span>
        <h2
          className="text-ivory mt-3"
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            lineHeight: 1.05,
          }}
        >
          {content.socialProofHeadline}
        </h2>
      </div>

      {/* Architecture Studios */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 px-1">
          <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone/40 font-mono shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>Architecture Studios</span>
          <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
        </div>
        <div className="relative border-y border-line py-5 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
          <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '80s' }}>
            <div className="flex shrink-0">
              {architectureStudios.map((name, i) => (
                <span key={i} className="flex items-center shrink-0">
                  <span className="inline-block w-1 h-1 rounded-full mx-8 sm:mx-12 md:mx-16 opacity-35 shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm sm:text-lg md:text-xl uppercase tracking-[0.3em] text-stone/40 hover:text-ivory transition-colors duration-500 cursor-default select-none" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>{name}</span>
                </span>
              ))}
            </div>
            <div className="flex shrink-0" aria-hidden>
              {architectureStudios.map((name, i) => (
                <span key={i} className="flex items-center shrink-0">
                  <span className="inline-block w-1 h-1 rounded-full mx-8 sm:mx-12 md:mx-16 opacity-35 shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="text-sm sm:text-lg md:text-xl uppercase tracking-[0.3em] text-stone/40 hover:text-ivory transition-colors duration-500 cursor-default select-none" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, idx) => (
          <StatTile key={stat.label} stat={stat} start={inView} index={idx} />
        ))}
      </div>

      {/* Luxury Brands */}
      <div>
        <div className="flex items-center gap-4 mb-4 px-1">
          <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-stone/40 font-mono shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>Luxury Brands</span>
          <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
        </div>
        <div className="relative border-y border-line py-5 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
          <div className="marquee-track" style={{ animationDuration: '80s' }}>
            <div className="flex shrink-0">{track}</div>
            <div className="flex shrink-0" aria-hidden>{track}</div>
          </div>
        </div>
      </div>

    </section>
  );
}
