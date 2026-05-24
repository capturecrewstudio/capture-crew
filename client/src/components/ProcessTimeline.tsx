import { ClipboardList, Lightbulb, Clapperboard, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    label: 'Brief',
    title: 'Discovery Call',
    desc: 'We understand your actual requirements — project type, goals, and vision. A customised package is decided, reference videos are collected, and we lock the creative direction before anything moves forward.',
    accent: 'var(--accent)'
  },
  {
    icon: Lightbulb,
    label: 'Pre-Prod',
    title: 'Storyboard & Script',
    desc: 'We write the script and build the storyboard together. The actual theme, narrative, and shot flow are discussed and approved by you before a single camera is set up.',
    accent: 'var(--accent)'
  },
  {
    icon: Clapperboard,
    label: 'Shoot',
    title: 'Set Day',
    desc: 'Full crew on location — gimbals, drones, and live preview. For architecture shoots, we require the architect\'s presence to ensure every design intent is captured with precision.',
    accent: 'var(--accent)'
  },
  {
    icon: Sparkles,
    label: 'Delivery',
    title: 'Retouch & Deliver',
    desc: 'Color graded, retouched, and delivery-ready. Everything is shared within 10 working days. You get 15 days to request any revisions — nothing ships until you\'re satisfied.',
    accent: 'var(--accent)'
  }
];

export function ProcessTimeline() {
  return (
    <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          The Workflow
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 4.5rem)', lineHeight: 1.05, whiteSpace: 'nowrap' }}
        >
          From Brief to Bangers
        </h2>
        <p className="text-stone mt-4 leading-relaxed text-sm">
          Four steps. Tightly produced. Zero ambiguity.
        </p>
      </div>

      <div className="relative">
        {/* Connector line (desktop only) */}
        <div
          className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="relative group rounded-2xl border border-line bg-surface/60 backdrop-blur-sm p-6 transition-all duration-500 hover:border-linemid hover:-translate-y-1"
              >
                {/* Step index */}
                <span
                  className="absolute top-4 right-5 text-xs font-mono font-bold tracking-[0.2em] text-stone/50"
                >
                  0{idx + 1}
                </span>

                {/* Icon disc */}
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div
                    className="absolute inset-0 rounded-full opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-500"
                    style={{ background: step.accent }}
                  />
                  <div
                    className="relative w-full h-full rounded-full flex items-center justify-center border border-linemid"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${step.accent}55, var(--bg) 70%)`
                    }}
                  >
                    <Icon size={22} style={{ color: step.accent }} />
                  </div>
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone text-center">
                  {step.label}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-ivory text-center mt-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone text-center leading-relaxed mt-3">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
