import { Check, Minus } from 'lucide-react';

const features = [
  { name: 'Price',                        meta: '₹30,000 / shoot',   premium: '₹45,000 / shoot',  smm: '₹30,000 / month'   },
  { name: 'High-Res Edited Images',       meta: '20 × 4K Images',    premium: '35 × 4K Images',   smm: 'Graphics & Creatives' },
  { name: 'Instagram Reels',              meta: '4 Reels',            premium: '3 Reels',          smm: '2 Reels / month'    },
  { name: 'YouTube / Long-Form Video',    meta: null,                 premium: '1 Film (up to 5 mins)', smm: null             },
  { name: 'Drone Aerial Shots',           meta: true,                 premium: true,               smm: true                 },
  { name: 'Feed Posts (Monthly)',         meta: null,                 premium: null,               smm: '15–18 Posts'        },
  { name: 'Instagram Stories',           meta: null,                 premium: null,               smm: '12+ Stories/month'  },
  { name: 'Creative Direction & Styling', meta: true,                 premium: true,               smm: true                 },
  { name: 'Content Strategy Guide',      meta: null,                 premium: true,               smm: true                 },
  { name: 'Branded Templates & Covers',  meta: null,                 premium: null,               smm: true                 },
  { name: 'Monthly Analytics Report',    meta: null,                 premium: null,               smm: true                 },
  { name: 'Shoot Locations',             meta: 'Within Tricity',     premium: 'Within Tricity',   smm: 'Within Tricity'     },
];

function Cell({ value }: { value: string | boolean | null }) {
  if (value === null) return <div className="flex justify-center"><Minus size={14} className="text-stone/30" /></div>;
  if (value === true) return <div className="flex justify-center"><Check size={16} className="text-accent" /></div>;
  return <span>{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6 overflow-x-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
          Compare Plans
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Side by Side
        </h2>
        <p className="text-stone mt-4 leading-relaxed text-sm">
          Every package, every deliverable — laid out so you can pick without guessing.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-surface rounded-2xl border border-line overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line bg-bg/60">
              <th className="p-4 sm:p-5 text-[0.65rem] uppercase tracking-[0.2em] font-mono text-stone/50 w-[34%]">What You Get</th>
              <th className="p-4 sm:p-5 text-center">
                <div className="text-[0.6rem] uppercase tracking-[0.2em] font-mono text-stone/50 mb-1">Starter</div>
                <div className="text-sm font-bold text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>Meta Package</div>
              </th>
              <th className="p-4 sm:p-5 text-center" style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent)' }}>
                <div className="text-[0.6rem] uppercase tracking-[0.2em] font-mono text-accent/70 mb-1">Most Popular</div>
                <div className="text-sm font-bold text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>Premium Package</div>
              </th>
              <th className="p-4 sm:p-5 text-center">
                <div className="text-[0.6rem] uppercase tracking-[0.2em] font-mono text-stone/50 mb-1">Retainer</div>
                <div className="text-sm font-bold text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>Social Media Mgmt</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {features.map((feature, idx) => (
              <tr key={idx} className={`hover:bg-ivory/[0.03] transition-colors ${idx === 0 ? 'bg-bg/30' : ''}`}>
                <td className="p-4 sm:p-5 text-xs sm:text-sm font-medium text-ivory/70">{feature.name}</td>
                <td className="p-4 sm:p-5 text-xs sm:text-sm text-stone text-center">
                  <Cell value={feature.meta} />
                </td>
                <td className="p-4 sm:p-5 text-xs sm:text-sm text-stone text-center" style={{ background: 'color-mix(in srgb, var(--accent) 4%, transparent)' }}>
                  <Cell value={feature.premium} />
                </td>
                <td className="p-4 sm:p-5 text-xs sm:text-sm text-stone text-center">
                  <Cell value={feature.smm} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
