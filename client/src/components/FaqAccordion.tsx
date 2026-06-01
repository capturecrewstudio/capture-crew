import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from '../lib/siteData';

function AccordionItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`rounded-xl bg-surface border transition-all duration-300 overflow-hidden relative ${
        isOpen ? 'border-accent shadow-lg' : 'border-line'
      }`}
    >
      {isOpen && (
        <div
          className="absolute top-0 left-0 right-0 h-[4px]"
          style={{ background: 'var(--brand-gradient)' }}
        />
      )}

      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-bold text-ivory pr-4">
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-stone/70 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
        />
      </button>

      {/* Height animates from 0 to natural scrollHeight */}
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 500}px` : '0px',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        <div ref={bodyRef} className="p-6 pt-0 border-t border-line">
          <p className="text-xs sm:text-sm text-stone leading-relaxed pt-4">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { content } = useSiteData();

  return (
    <section className="my-20 xl:my-28 relative z-10 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
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
        {content.faq.map((faq, idx) => (
          <AccordionItem
            key={idx}
            faq={faq}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(prev => prev === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}
