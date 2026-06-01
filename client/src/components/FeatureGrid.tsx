import { Zap, Flame, Sparkles } from 'lucide-react';
import { GradientButton } from './GradientButton';

const packages = [
  {
    icon: Zap,
    title: 'Meta Package',
    price: '₹35,000',
    period: '/ per shoot',
    tag: 'Starter',
    summary: 'Stop scrolling. Start stopping thumbs. One shoot that fills your feed with content worth watching.',
    features: [
      '20 × 4K images — shot to stop the scroll',
      '4 Reels (30–60 sec) — showcase, BTS & product story',
      'Drone aerials that frame your space with scale and precision',
      'Styled sets — props, backgrounds, full creative direction',
      'Cinematic edits with motion titles, music & logo animation',
      'Cut and exported for Instagram, YouTube & web',
      'On-location within Tricity — we come fully equipped',
    ],
    cta: 'Book Meta Package',
    highlight: false,
  },
  {
    icon: Flame,
    title: 'Premium Package',
    price: '₹50,000',
    period: '/ per shoot',
    tag: 'Most Popular',
    summary: 'Your brand, fully visualised. Hero images, a campaign film, and a strategy to make every asset work for months.',
    features: [
      '35 × 4K hero shots — website, campaign, press-ready',
      '3 Reels — brand promo, process walk & client testimonial',
      '1 YouTube film (up to 5 mins) — cinematic brand story',
      'Full creative direction — concept, styling, shot list',
      'Pro post — thumbnails, captions, logo animations included',
      'Usage calendar so every asset earns its keep',
      'Multi-location shoot — we plan and move with you',
    ],
    cta: 'Book Premium Package',
    highlight: true,
  },
  {
    icon: Sparkles,
    title: 'Social Media Management',
    price: '₹30,000',
    period: '/ per month',
    tag: 'Monthly Retainer',
    summary: 'Your brand shows up every day — without you lifting a finger. We handle everything, end to end.',
    features: [
      '15–18 feed posts monthly — photos, carousels & graphics',
      '12+ Stories — promos, polls & engagement drops',
      '2 Reels every month, fully shot and edited',
      'Branded highlight covers and profile templates',
      'Monthly content calendar — planned, approved, scheduled',
      'Growth strategy sessions and audience analytics',
      'Full posting and community engagement management',
    ],
    cta: 'Start Management',
    highlight: false,
  },
];

type Props = {
  onSelectPackage?: (title: string) => void;
};

export function FeatureGrid({ onSelectPackage }: Props) {
  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          Transparent Pricing
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Pick Your Package
        </h2>
        <p className="text-stone mt-4 leading-relaxed">
          Three focused packages — or tell us your brief and we'll build one around you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ alignItems: 'stretch' }}>
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <div
              key={pkg.title}
              className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                pkg.highlight
                  ? 'border-accent/60 bg-surface-2 shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_40%,transparent)]'
                  : 'border-line bg-surface/60 hover:border-linemid'
              }`}
            >
              {/* Highlight glow backdrop */}
              {pkg.highlight && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)' }} />
              )}

              {/* Tag — fixed height so cards without tag still reserve space */}
              <div className="flex justify-center mb-5 h-7">
                {pkg.tag && (
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.22em] font-mono px-3 py-1 rounded-full border text-accent self-center"
                    style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)', background: 'var(--accent-dim)' }}
                  >
                    {pkg.tag}
                  </span>
                )}
              </div>

              {/* Icon — same height for all */}
              <div className="flex justify-center mb-4">
                <span
                  className="p-3 rounded-xl border border-line text-ivory"
                  style={{ background: 'var(--brand-gradient)' }}
                >
                  <Icon size={22} />
                </span>
              </div>

              {/* Title — aligned across row */}
              <h3
                className="text-xl sm:text-2xl font-bold text-ivory text-center"
                style={{ fontFamily: "'Cormorant Garant', serif" }}
              >
                {pkg.title}
              </h3>

              {/* Price — aligned across row */}
              <div className="mt-2 flex items-baseline gap-1.5 justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>
                  {pkg.price}
                </span>
                <span className="text-xs text-stone font-mono">{pkg.period}</span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-stone mt-3 leading-relaxed text-center mb-6">
                {pkg.summary}
              </p>

              {/* Divider */}
              <div className="h-px w-full mb-5" style={{ background: 'var(--line)' }} />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {pkg.features.map((feat) => (
                  <li key={feat} className="text-xs text-ivory/70 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
