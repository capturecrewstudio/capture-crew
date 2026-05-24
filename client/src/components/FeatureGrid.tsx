import { useEffect, useState, useSyncExternalStore } from 'react';
import { Sparkles, Zap, Shield, Flame } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { getSiteContent, subscribeAdminStore } from '../lib/adminStore';

const ICONS = [Zap, Flame, Sparkles, Shield];
const ICON_TAGS = [
  { topLeft: '10 Photos', topRight: '2 Reels', bottomLeft: '8 Posts', bottomRight: '1 Platform' },
  { topLeft: '25 Photos', topRight: '5 Reels', bottomLeft: '12 Graphics', bottomRight: '2 Paid Ads' },
  { topLeft: 'Full Day', topRight: '50 Photos', bottomLeft: '8 Reels', bottomRight: 'Brand Film' },
  { topLeft: 'Tailored', topRight: 'Unlimited', bottomLeft: 'Global Reach', bottomRight: 'Flexible' },
];

type Props = {
  onSelectPackage?: (title: string) => void;
};

export function FeatureGrid({ onSelectPackage }: Props) {
  const [isXl, setIsXl] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1280);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const content = useSyncExternalStore(subscribeAdminStore, getSiteContent);

  const packages = content.packages.map((pkg, i) => ({
    title: pkg.title,
    icon: ICONS[i % ICONS.length],
    price: pkg.price,
    period: pkg.priceNote ? ` / ${pkg.priceNote}` : '',
    shortDesc: pkg.summary,
    longDesc: pkg.summary,
    features: pkg.features,
    tags: ICON_TAGS[i % ICON_TAGS.length],
    highlight: pkg.highlight,
    cta: pkg.cta,
    tag: pkg.tag,
  }));

  useEffect(() => {
    const handleResize = () => setIsXl(window.innerWidth >= 1280);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          Flexible Pricing
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Our Creative Packages
        </h2>
        <p className="text-stone mt-4 leading-relaxed">
          Choose a curated service bundle or request a bespoke quote tailored to your brand's commercial goals.
        </p>
      </div>

      {/* Grid container with relative bounds. xl:h-[480px] reserves height for absolute elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:h-[480px]">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          const isHovered = hoveredIndex === idx;
          const isExpanded = !isXl && expandedIndex === idx;
          const enableHover = isXl && isHovered;
          const showDetails = enableHover || isExpanded;

          return (
            <div
              key={pkg.title}
              className={`relative w-full ${isXl ? 'h-[400px] sm:h-[450px] xl:h-full' : ''}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Outer Wrapper: In XL+, this is absolute centered, allowing card to expand without layout shifts */}
              <div
                className={`w-full bg-surface border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
                  isXl
                    ? 'absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10'
                    : ''
                } ${
                  showDetails
                    ? 'border-accent/60 shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--accent)_35%,transparent)] bg-surface-2 z-20 py-10 scale-[1.02]'
                    : 'border-line shadow-[0_4px_18px_-8px_rgba(0,0,0,0.5)]'
                }`}
                style={isXl ? { minHeight: showDetails ? '380px' : '340px' } : undefined}
              >
                {/* 4 Floating Tag Pills (XL hover only) */}
                {isXl && (
                  <>
                    {[
                      { pos: '-top-3 -left-3', val: pkg.tags.topLeft },
                      { pos: '-top-3 -right-3', val: pkg.tags.topRight },
                      { pos: '-bottom-3 -left-3', val: pkg.tags.bottomLeft },
                      { pos: '-bottom-3 -right-3', val: pkg.tags.bottomRight },
                    ].map(({ pos, val }) => (
                      <div
                        key={val}
                        className={`absolute ${pos} px-3 py-1 rounded-full border border-linemid bg-bg text-xs font-mono text-ivory pointer-events-none transition-all duration-500 ${
                          showDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                      >
                        {val}
                      </div>
                    ))}
                  </>
                )}

                {/* Card Content */}
                <div>
                  <div className="flex justify-between items-start">
                    <span
                      className="p-2.5 rounded-xl border border-line text-ivory"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-ivory">{pkg.price}</span>
                      <span className="text-xs text-stone">{pkg.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-ivory mt-4">{pkg.title}</h3>
                  
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone mt-2 leading-relaxed">
                    {pkg.shortDesc}
                  </p>

                  {/* Expanded Description */}
                  <div
                    className="grid transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      gridTemplateRows: showDetails ? '1fr' : '0fr',
                      opacity: showDetails ? 1 : 0
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs text-stone mt-2 border-t border-line pt-2 leading-relaxed">
                        {pkg.longDesc}
                      </p>
                    </div>
                  </div>

                  {/* List of Features */}
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {pkg.features.slice(0, showDetails ? 6 : 4).map((feat) => (
                      <li key={feat} className="text-xs text-ivory/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col gap-2">
                  <GradientButton
                    label={pkg.cta}
                    size="md"
                    className="w-full"
                    onClick={() => {
                      onSelectPackage?.(pkg.title);
                      const el = document.getElementById('contact-us');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  {/* Mobile only: tap to expand/collapse details */}
                  {!isXl && (
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(prev => prev === idx ? null : idx)}
                      className="text-[0.6rem] uppercase tracking-widest font-mono text-stone/60 hover:text-accent transition-colors duration-200 text-center py-1"
                    >
                      {isExpanded ? 'Show less ↑' : 'See details ↓'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
