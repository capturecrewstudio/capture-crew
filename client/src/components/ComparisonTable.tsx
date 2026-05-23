import { Check, Minus } from 'lucide-react';

const features = [
  { name: 'Monthly Cost', starter: '₹19,999', growth: '₹39,999', premium: '₹79,999' },
  { name: 'High-Res Edited Photos', starter: '10 Photos', growth: '25 Photos', premium: '50 Photos' },
  { name: 'HD Video Reels / Shorts', starter: '2 (30-45s)', growth: '5 HD Reels', premium: '8 Reels' },
  { name: 'Brand Film / Commercials', starter: null, growth: null, premium: '1 Brand Film' },
  { name: 'Social Media Graphics', starter: '8 Posts', growth: '12 Graphics', premium: 'Unlimited / Custom' },
  { name: 'SMM Channels Managed', starter: '1 Platform', growth: '2 Platforms', premium: 'All Platforms' },
  { name: 'Paid Google & Meta Ads', starter: null, growth: '2 Campaigns', premium: 'Full Suite' },
  { name: 'Shoot Production Duration', starter: 'Studio Only', growth: 'Half-Day Shoot', premium: 'Full-Day Shoot' },
  { name: 'Monthly Analytics & Reports', starter: 'Basic Report', growth: 'Standard Report', premium: 'Consultation + Report' },
  { name: 'Dedicated Brand Manager', starter: null, starterIcon: false, growth: null, growthIcon: false, premium: true, premiumIcon: true }
];

export function ComparisonTable() {
  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6 overflow-x-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
          Compare Plans
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3">
          Detailed Matrix Comparison
        </h2>
      </div>

      <div className="max-w-4xl mx-auto bg-[#161616] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-black/40">
              <th className="p-4 sm:p-6 text-sm font-bold uppercase tracking-wider text-white">Features</th>
              <th className="p-4 sm:p-6 text-sm font-bold uppercase tracking-wider text-[#20BDFF]">Starter</th>
              <th className="p-4 sm:p-6 text-sm font-bold uppercase tracking-wider text-[#5433FF]">Growth</th>
              <th className="p-4 sm:p-6 text-sm font-bold uppercase tracking-wider text-[#CA6672]">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {features.map((feature, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 sm:p-6 text-xs sm:text-sm font-medium text-white/80">{feature.name}</td>
                
                {/* Starter cell */}
                <td className="p-4 sm:p-6 text-xs sm:text-sm text-white/60">
                  {feature.starter === null ? (
                    <Minus size={14} className="text-white/20" />
                  ) : (
                    feature.starter
                  )}
                </td>

                {/* Growth cell */}
                <td className="p-4 sm:p-6 text-xs sm:text-sm text-white/60">
                  {feature.growth === null ? (
                    <Minus size={14} className="text-white/20" />
                  ) : (
                    feature.growth
                  )}
                </td>

                {/* Premium cell */}
                <td className="p-4 sm:p-6 text-xs sm:text-sm text-white/60">
                  {feature.premium === null ? (
                    <Minus size={14} className="text-white/20" />
                  ) : feature.premium === true ? (
                    <Check size={16} className="text-[#CA6672]" />
                  ) : (
                    feature.premium
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
