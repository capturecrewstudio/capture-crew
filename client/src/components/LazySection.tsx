import { useEffect, useRef, useState } from 'react';

type LazyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string;
};

// Dispatched by scrollToSection so all lazy sections reveal before scroll
export const REVEAL_ALL_EVENT = 'cc:reveal-all-sections';

export function LazySection({ children, fallback, height = '300px' }: LazyProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reveal when scrolled near
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { rootMargin: '400px' }
    );
    if (ref.current) observer.observe(ref.current);

    // Reveal immediately when nav triggers a scroll-to-section
    const onRevealAll = () => setVisible(true);
    window.addEventListener(REVEAL_ALL_EVENT, onRevealAll);

    return () => { observer.disconnect(); window.removeEventListener(REVEAL_ALL_EVENT, onRevealAll); };
  }, []);

  const defaultFallback = <div style={{ height }} className="w-full bg-transparent" />;

  return (
    <div ref={ref} className="w-full">
      {visible ? children : (fallback || defaultFallback)}
    </div>
  );
}
