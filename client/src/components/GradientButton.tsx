import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
};

export function GradientButton({
  label,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
  disabled = false
}: ButtonProps) {
  const heightClass = size === 'sm' ? 'h-[34px] px-3 text-xs' : 'h-[40px] md:h-[48px] px-5 text-sm md:text-base';
  const arrowSize = size === 'sm' ? 12 : 15;
  const arrowCircleSize = size === 'sm' ? 'w-5 h-5 ml-2' : 'w-7 h-7 ml-3 md:w-8 md:h-8';

  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (disabled) return;
    const node = btnRef.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px) scale(1.03)`;
    };
    const onLeave = () => {
      node.style.transform = '';
    };
    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [disabled]);

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-between rounded-full font-semibold tracking-wide text-white transition-transform duration-300 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none group overflow-hidden ${heightClass} ${className}`}
      style={{
        background: 'var(--brand-gradient)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease-in-out infinite',
        willChange: 'transform'
      }}
    >
      {/* Inset darker inner-glow container */}
      <div className="absolute inset-[1.5px] rounded-full bg-[#131313]/90 group-hover:bg-[#131313]/70 transition-colors duration-300 -z-10" />

      <span className="relative z-10 pr-2">{label}</span>

      {/* Arrow circle on the right */}
      <div
        className={`flex items-center justify-center rounded-full bg-[#58A4FF] border border-white/40 shadow-[0_2px_6px_-2px_rgba(88,164,255,0.55)] transition-transform duration-300 group-hover:translate-x-1 ${arrowCircleSize}`}
      >
        <ArrowRight size={arrowSize} className="text-black stroke-[2.5]" />
      </div>
    </button>
  );
}
