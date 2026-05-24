import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { RouteName } from '../App';
import { GlassFilter } from './GlassFilter';
import { ThemeToggle } from './ThemeToggle';

const navItems: Array<{ label: string; route: RouteName }> = [
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'About', route: 'about' },
  { label: 'Services', route: 'services' },
  // { label: 'Testimonials', route: 'testimonials' },
  { label: 'Blog', route: 'blog' },
  { label: 'Contact', route: 'contact' }
];

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  isDark: boolean;
  onToggleTheme: () => void;
};

export function SiteHeader({ activeRoute, onNavigate, isDark, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [useGlass, setUseGlass] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Width range — recomputed on resize
  const [fullWidth, setFullWidth] = useState(1320);
  const [contentWidth, setContentWidth] = useState(720);

  const pillRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);
  const progressRef = useRef(0);

  // Smoky/translucent when scrolled AND not hovered
  const isCompact = useGlass && !isHovered;

  // Track viewport-derived full width
  useEffect(() => {
    const update = () => {
      setFullWidth(Math.min(window.innerWidth - 32, 1320));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Measure the natural content width of the *real* pill.
  // We temporarily set width:max-content, read scrollWidth, then restore.
  useLayoutEffect(() => {
    const measure = () => {
      const node = pillRef.current;
      if (!node) return;
      const prev = node.style.width;
      node.style.transition = 'none';
      node.style.width = 'max-content';
      // scrollWidth includes children's full natural width (no clipping)
      const w = Math.ceil(node.scrollWidth);
      node.style.width = prev;
      // Force reflow then restore transition next frame so we don't animate the snap-back
      requestAnimationFrame(() => {
        if (pillRef.current) pillRef.current.style.transition = '';
      });
      // +32 safety pad
      setContentWidth(w + 32);
    };

    // Initial measure
    measure();

    // After web fonts swap, glyph widths change — re-measure
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(measure).catch(() => {});
    }

    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Apply width based on scroll progress (and hover override)
  const applyWidth = () => {
    if (!pillRef.current) return;
    const p = progressRef.current;
    const naturalCompact = Math.max(contentWidth, 410);
    const compactWidth = Math.round(fullWidth - p * (fullWidth - naturalCompact));
    const target = hoveredRef.current ? fullWidth : compactWidth;
    pillRef.current.style.width = `${target}px`;
  };

  // Re-apply width when measurements / hover change
  useEffect(() => {
    applyWidth();
  }, [fullWidth, contentWidth, isHovered]);

  // Scroll listener
  useEffect(() => {
    let raf = 0;
    let lastTop = -1;
    let glassState = false;

    const onScroll = () => {
      const top = window.scrollY;
      if (top === lastTop) return;
      lastTop = top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const progress = Math.min(top / 400, 1);
        progressRef.current = progress;
        applyWidth();

        if (!glassState && progress > 0.3) {
          glassState = true;
          setUseGlass(true);
        } else if (glassState && progress < 0.15) {
          glassState = false;
          setUseGlass(false);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [fullWidth, contentWidth]);

  function navigate(route: RouteName) {
    onNavigate(route);
    setMenuOpen(false);
  }

  const headerContent = (
    <>
      {/* Brand logo — anchored left */}
      <button
        className="relative bg-transparent border-0 cursor-pointer focus:outline-none shrink-0"
        onClick={() => navigate('home')}
        type="button"
      >
        <img
          src={isDark ? '/assets/logo/capture-crew-logo-gold.png' : '/assets/logo/capture-crew-logo-light.png'}
          alt="Capture Crew"
          className="object-contain"
          style={{ height: '64px', width: 'auto', minWidth: '240px' }}
        />
      </button>

      {/* Desktop nav — centred by auto margins */}
      <nav
        className="hidden md:flex gap-6 lg:gap-8 items-center mx-auto"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <button
            className="text-xs uppercase tracking-widest font-light transition-colors duration-300 whitespace-nowrap"
            style={{
              color: activeRoute === item.route ? 'var(--accent)' : 'var(--stone)',
            }}
            onMouseEnter={e => { if (activeRoute !== item.route) (e.currentTarget as HTMLElement).style.color = 'var(--ivory)'; }}
            onMouseLeave={e => { if (activeRoute !== item.route) (e.currentTarget as HTMLElement).style.color = 'var(--stone)'; }}
            key={item.route}
            onClick={() => navigate(item.route)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Theme toggle — anchored right */}
      <div className="shrink-0">
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex items-center justify-center p-2 focus:outline-none shrink-0"
        style={{ color: 'var(--stone)' }}
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  );

  const containerClass = `relative flex items-center justify-between gap-6 lg:gap-8 h-[72px] px-5 lg:px-7 rounded-full border box-border transition-[opacity,background-color,border-color,box-shadow] duration-500 ease-out`;
  const containerStyle = isCompact
    ? {
        background: 'rgba(12,10,8,0.55)',
        borderColor: 'rgba(200,169,107,0.25)',
        backdropFilter: 'blur(24px) brightness(0.85) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) brightness(0.85) saturate(1.6)',
        boxShadow: [
          '0 8px 32px -4px rgba(0,0,0,0.7)',
          '0 2px 8px rgba(0,0,0,0.5)',
          'inset 0 1px 0 rgba(200,169,107,0.14)',
          '0 0 40px -8px rgba(200,169,107,0.1)',
        ].join(', '),
        opacity: 0.88,
      }
    : {
        background: 'rgba(12,10,8,0.48)',
        borderColor: 'rgba(200,169,107,0.35)',
        backdropFilter: 'blur(28px) brightness(0.82) saturate(1.8)',
        WebkitBackdropFilter: 'blur(28px) brightness(0.82) saturate(1.8)',
        boxShadow: [
          '0 12px 48px -8px rgba(0,0,0,0.8)',
          '0 4px 16px rgba(0,0,0,0.6)',
          '0 0 0 1px rgba(200,169,107,0.10)',
          'inset 0 1px 0 rgba(200,169,107,0.22)',
          '0 0 60px -12px rgba(200,169,107,0.18)',
        ].join(', '),
      };

  return (
    <>
      <header
        className="fixed left-1/2 -translate-x-1/2 top-5 z-40 pointer-events-none"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        <div
          ref={pillRef}
          className="pointer-events-auto transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${fullWidth}px`, willChange: 'width' }}
          onMouseEnter={() => {
            hoveredRef.current = true;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            hoveredRef.current = false;
            setIsHovered(false);
          }}
        >
          <GlassFilter className={containerClass} style={containerStyle} borderRadius="999px" distortionScale={5} blur={28}>
            {headerContent}
          </GlassFilter>

          {/* Mobile drawer (sibling of pill so overflow-hidden on pill doesn't clip it) */}
          {menuOpen && (
            <nav
              className="absolute left-0 right-0 top-[72px] flex flex-col gap-2 p-6 rounded-2xl shadow-2xl md:hidden z-50"
              style={{ background: 'var(--surface)', border: '1px solid var(--line-mid)' }}
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <button
                  className="w-full py-3 text-left px-4 rounded-xl text-sm font-light transition-colors"
                  style={{
                    color: activeRoute === item.route ? 'var(--accent)' : 'var(--stone)',
                    background: activeRoute === item.route ? 'var(--accent-dim)' : 'transparent',
                  }}
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
