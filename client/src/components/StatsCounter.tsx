import { useEffect, useRef, useState } from 'react';
import { Camera, Building2, Award, Users } from 'lucide-react';

const stats = [
  { icon: Camera,    value: 500, suffix: '+',      label: 'Shoots Delivered',   color: '#E8192C' },
  { icon: Building2, value: 160, suffix: '+',      label: 'Architects Trusted', color: '#E8192C' },
  { icon: Award,     value: 68,  suffix: '+',      label: 'Premium Brands',     color: '#E8192C' },
  { icon: Users,     value: 8,   suffix: '+ yrs',  label: 'Studio Heritage',    color: '#E8192C' }
];

function useCountUp(target: number, start: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);
  return value;
}

function StatTile({ stat, start, index }: { stat: typeof stats[number]; start: boolean; index: number }) {
  const Icon = stat.icon;
  const value = useCountUp(stat.value, start, 1200 + index * 200);
  return (
    <div
      className="relative group rounded-2xl border border-line bg-surface/70 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-linemid hover:-translate-y-1"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Corner accent */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: stat.color }}
      />
      <div className="relative">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-line text-ivory"
          style={{ background: `linear-gradient(135deg, ${stat.color}33, transparent)` }}
        >
          <Icon size={18} style={{ color: stat.color }} />
        </span>
        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-ivory font-accent tabular-nums">
            {value}
          </span>
          <span className="text-sm sm:text-base font-bold" style={{ color: stat.color }}>
            {stat.suffix}
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone font-mono mt-2">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#E8192C]">
          By the Numbers
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Receipts, not promises.
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <StatTile key={stat.label} stat={stat} start={inView} index={idx} />
        ))}
      </div>
    </section>
  );
}
