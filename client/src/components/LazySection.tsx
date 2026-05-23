import { useEffect, useRef, useState } from 'react';

type LazyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string; // e.g. "500px" to prevent layout shift during mount
};

export function LazySection({ children, fallback, height = '300px' }: LazyProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultFallback = <div style={{ height }} className="w-full bg-transparent" />;

  return (
    <div ref={ref} className="w-full">
      {visible ? children : (fallback || defaultFallback)}
    </div>
  );
}
