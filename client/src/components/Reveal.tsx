import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'left' | 'right' | 'zoom';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
};

const offsetFor = (dir: Direction) => {
  if (dir === 'up') return 'translate3d(0, 32px, 0)';
  if (dir === 'left') return 'translate3d(-32px, 0, 0)';
  if (dir === 'right') return 'translate3d(32px, 0, 0)';
  return 'scale(0.96)';
};

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translate3d(0,0,0) scale(1)' : offsetFor(direction),
        transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: shown ? 'auto' : 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
