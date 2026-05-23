import { useEffect, useState } from 'react';
import { Sparkles, Zap, Shield, Flame } from 'lucide-react';
import { GradientButton } from './GradientButton';

const packages = [
  {
    title: 'Starter Bundle',
    icon: Zap,
    price: '₹19,999',
    period: '/month',
    shortDesc: 'Perfect for early-stage brands looking for visual consistency.',
    longDesc: 'Establish your brand presence with consistent high-quality assets. Perfect for social feeds and basic online engagement.',
    features: ['10 Product Photos', '2 Reels (30-45s)', '8 Social Graphics', 'Basic SMM (1 Platform)'],
    tags: { topLeft: '10 Photos', topRight: '2 Reels', bottomLeft: '8 Posts', bottomRight: '1 Platform' },
    color: '#20BDFF'
  },
  {
    title: 'Growth Package',
    icon: Flame,
    price: '₹39,999',
    period: '/month',
    shortDesc: 'Accelerate your online visibility and drive active engagement.',
    longDesc: 'Boost your customer acquisitions with professional-grade content and direct advertising. High-definition media that converts.',
    features: ['25 Edited Photos', '5 HD Reels', '12 Custom Graphics', 'SMM (2 Platforms)', '2 Paid Campaigns'],
    tags: { topLeft: '25 Photos', topRight: '5 Reels', bottomLeft: '12 Graphics', bottomRight: '2 Paid Ads' },
    color: '#5433FF'
  },
  {
    title: 'Premium Brand',
    icon: Sparkles,
    price: '₹79,999',
    period: '/month',
    shortDesc: 'Comprehensive content creation and full digital management.',
    longDesc: 'A complete creative and strategic takeover. We handle everything from full-day shoots to paid meta/google ad campaigns and SMM.',
    features: ['Full-Day Shoot', '50 Edited Photos', '8 Reels + 1 Film', 'All-Platform SMM', 'Google/Meta Ads', 'Monthly Reports'],
    tags: { topLeft: 'Full Day', topRight: '50 Photos', bottomLeft: '8 Reels', bottomRight: 'Brand Film' },
    color: '#CA6672'
  },
  {
    title: 'Custom Retainer',
    icon: Shield,
    price: 'Custom',
    period: ' /quote',
    shortDesc: 'Tailored productions designed for luxury architects and global brands.',
    longDesc: 'Fully custom solutions: architectural campaigns, global location shoots, multi-city activations, and priority retainer delivery.',
    features: ['Architect-first focus', 'Global locations', 'Custom deliverables', 'Dedicated team', 'Priority retouching'],
    tags: { topLeft: 'Tailored', topRight: 'Unlimited', bottomLeft: 'Global Reach', bottomRight: 'Flexible' },
    color: '#ffffff'
  }
];

export function FeatureGrid() {
  const [isXl, setIsXl] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1280);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsXl(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
          Flexible Pricing
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3">
          Our Creative Packages
        </h2>
        <p className="text-white/60 mt-4 leading-relaxed">
          Choose a curated service bundle or request a bespoke quote tailored to your brand’s commercial goals.
        </p>
      </div>

      {/* Grid container with relative bounds. xl:h-[480px] reserves height for absolute elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:h-[480px]">
        {packages.map((pkg, idx) => {
          const Icon = pkg.icon;
          const isHovered = hoveredIndex === idx;
          const enableHover = isXl && isHovered;

          return (
            <div
              key={pkg.title}
              className="relative w-full h-[400px] sm:h-[450px] xl:h-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Outer Wrapper: In XL+, this is absolute centered, allowing card to expand without layout shifts */}
              <div
                className={`w-full bg-[#161616] border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${
                  isXl 
                    ? 'absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10' 
                    : ''
                } ${
                  enableHover
                    ? 'border-[#5433FF]/60 shadow-[0_8px_24px_-12px_rgba(84,51,255,0.35)] bg-[#181818] z-20 py-10 scale-[1.02]'
                    : 'border-white/10 shadow-[0_4px_18px_-8px_rgba(0,0,0,0.5)]'
                }`}
                style={isXl ? { minHeight: enableHover ? '380px' : '340px' } : undefined}
              >
                {/* 4 Floating Tag Pills (XL Hover Only) */}
                {isXl && (
                  <>
                    <div
                      className={`absolute -top-3 -left-3 px-3 py-1 rounded-full border border-white/20 bg-black text-xs font-mono text-white pointer-events-none transition-all duration-500 ${
                        enableHover ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      {pkg.tags.topLeft}
                    </div>
                    <div
                      className={`absolute -top-3 -right-3 px-3 py-1 rounded-full border border-white/20 bg-black text-xs font-mono text-white pointer-events-none transition-all duration-500 ${
                        enableHover ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      {pkg.tags.topRight}
                    </div>
                    <div
                      className={`absolute -bottom-3 -left-3 px-3 py-1 rounded-full border border-white/20 bg-black text-xs font-mono text-white pointer-events-none transition-all duration-500 ${
                        enableHover ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      {pkg.tags.bottomLeft}
                    </div>
                    <div
                      className={`absolute -bottom-3 -right-3 px-3 py-1 rounded-full border border-white/20 bg-black text-xs font-mono text-white pointer-events-none transition-all duration-500 ${
                        enableHover ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                    >
                      {pkg.tags.bottomRight}
                    </div>
                  </>
                )}

                {/* Card Content */}
                <div>
                  <div className="flex justify-between items-start">
                    <span
                      className="p-2.5 rounded-xl border border-white/10 text-white"
                      style={{ background: 'var(--brand-gradient)' }}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">{pkg.price}</span>
                      <span className="text-xs text-white/50">{pkg.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-4">{pkg.title}</h3>
                  
                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
                    {pkg.shortDesc}
                  </p>

                  {/* Expanded Description (XL hover only) */}
                  <div
                    className="grid transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      gridTemplateRows: enableHover ? '1fr' : '0fr',
                      opacity: enableHover ? 1 : 0
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs text-white/50 mt-2 border-t border-white/5 pt-2 leading-relaxed">
                        {pkg.longDesc}
                      </p>
                    </div>
                  </div>

                  {/* List of Features */}
                  <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                    {pkg.features.slice(0, enableHover ? 6 : 4).map((feat) => (
                      <li key={feat} className="text-xs text-white/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#58A4FF] shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 sm:mt-8">
                  <GradientButton
                    label={pkg.price === 'Custom' ? 'Enquire Now' : 'Choose Package'}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const contactSection = document.getElementById('contact-us');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
