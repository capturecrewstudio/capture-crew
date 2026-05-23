import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Who is the founder of Capture Crew and what is their background?',
    answer: 'Capture Crew was founded by Kartik Kanda, a National Geographic award-winning visual artist. Kartik brings over 8 years of distinguished experience working with National Geographic in the UK. Since 2018, he has expanded the studio nationwide across India and globally.'
  },
  {
    question: 'How large is your client and architect network?',
    answer: 'We have built a prestigious global network that partners with over 160 architects and 68 luxury brands nationwide and internationally. Our client roster includes renowned names such as Raymond, Mini Soo, Prada, Bluestone, and Ori.'
  },
  {
    question: 'Which cities do you operate in?',
    answer: 'Our main production hubs are located in Chandigarh, Mumbai, Pune, and Bengaluru. We also maintain a branch in London, UK, bridging the gap between global luxury and Indian elegance for architectural and commercial campaigns worldwide.'
  },
  {
    question: 'What is included in the digital marketing and SMM packages?',
    answer: 'Our digital packages are full-suite. Depending on the tier, they include customized Social Media Management (SMM) across platforms, custom graphics design, HD Reels production, targeted Google & Meta paid ad campaigns, influencer outreach, and detailed monthly performance analytics.'
  },
  {
    question: 'What is your turnaround time for photography and film?',
    answer: 'We deliver highly optimized, campaign-ready assets fast. Standard photography shoots are fully retouched and exported within 7–10 days. cinematic films, explainer videos, and Reels packages are finalized within 14 days in WebP/AVIF formats.'
  },
  {
    question: 'Do you create custom pricing structures and packages?',
    answer: 'Absolutely. While our Starter, Growth, and Premium bundles suit many creators and product startups, we regularly design bespoke retainers for commercial developers, luxury designers, and hospitality launches.'
  },
  {
    question: 'How do we book a shoot and collaborate?',
    answer: "You can submit your details via our consultation form below or contact Kartik directly at +91-8898400022. We'll schedule a discovery call, align on mood boards, organize shot lists, and execute the production planning."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#E8192C]">
          Got Questions?
        </span>
        <h2
          className="text-ivory mt-3"
          style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl bg-surface border transition-all duration-300 overflow-hidden relative ${
                isOpen ? 'border-[#E8192C] shadow-lg' : 'border-line'
              }`}
            >
              {/* Active Item: 4px top gradient accent bar */}
              {isOpen && (
                <div
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ background: 'var(--brand-gradient)' }}
                />
              )}

              {/* Accordion Header Trigger */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-ivory pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone/70 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#E8192C]' : ''
                  }`}
                />
              </button>

              {/* Accordion Content wrapper */}
              <div
                className="transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div className="p-6 pt-0 border-t border-line">
                  <p className="text-xs sm:text-sm text-stone leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
