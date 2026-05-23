import { ClipboardList, Lightbulb, Clapperboard, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    label: 'Brief',
    title: 'Discovery call',
    desc: 'We dive into your brand goals, audience, references, and KPIs. You leave with a clear shot list and mood direction.',
    accent: '#E8192C'
  },
  {
    icon: Lightbulb,
    label: 'Pre-Prod',
    title: 'Storyboard & lock',
    desc: 'Locations scouted, talent locked, lighting boards finalised. Every frame planned before the camera rolls.',
    accent: '#E8192C'
  },
  {
    icon: Clapperboard,
    label: 'Shoot',
    title: 'Set day',
    desc: 'On-set crew, gimbals, drones, and live preview. Tightly directed so we capture stills + motion in one go.',
    accent: '#E8192C'
  },
  {
    icon: Sparkles,
    label: 'Delivery',
    title: 'Retouch & ship',
    desc: 'Color graded, retouched, AVIF/WebP optimized. Delivered in 7–14 days with rollout-ready assets.',
    accent: '#E8192C'
  }
];

export function ProcessTimeline() {
  return (
    <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#E8192C]">
          The Workflow
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          From brief to bangers.
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
                      background: `radial-gradient(circle at 30% 30%, ${step.accent}55, #0e0e0e 70%)`
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
