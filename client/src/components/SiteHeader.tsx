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
  accent: 'red' | 'gold' | 'blue';
  onAccentChange: (a: 'red' | 'gold' | 'blue') => void;
};

export function SiteHeader({ activeRoute, onNavigate, isDark, onToggleTheme, accent, onAccentChange }: Props) {
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
      {/* Brand logo */}
      <button
        className={`relative h-8 bg-transparent border-0 cursor-pointer focus:outline-none shrink-0 transition-opacity duration-500 ${
          isCompact ? 'opacity-60' : 'opacity-100'
        }`}
        onClick={() => navigate('home')}
        type="button"
      >
        <img
          className="h-8 w-auto object-contain"
          src="/assets/logo/capture-crew-logo-wide.jpeg"
          alt="Capture Crew"
        />
      </button>

      {/* Desktop nav — fades when compact but always remains in layout */}
      <nav
        className={`hidden md:flex gap-6 lg:gap-8 items-center shrink-0 transition-opacity duration-500 ease-out ${
          isCompact ? 'opacity-40' : 'opacity-100'
        }`}
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

      {/* Theme toggle */}
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} accent={accent} onAccentChange={onAccentChange} />

      {/* Mobile toggle */}
      <button
        className="md:hidden flex items-center justify-center p-2 focus:outline-none"
        style={{ color: 'var(--stone)' }}
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  );

  const containerClass = `relative flex items-center justify-between gap-6 lg:gap-8 h-[60px] px-5 lg:px-7 rounded-full border backdrop-blur-xl box-border transition-[opacity,background-color,border-color,box-shadow] duration-500 ease-out ${
    useGlass && isCompact ? 'opacity-55' : 'opacity-100'
  }`;
  const containerStyle = useGlass
    ? isCompact
      ? { background: 'var(--surface-2)', borderColor: 'var(--line)', boxShadow: '0 2px 10px -6px rgba(0,0,0,0.2)' }
      : { background: 'color-mix(in srgb, var(--surface) 80%, transparent)', borderColor: 'var(--line-mid)', boxShadow: 'var(--shadow)' }
    : { background: 'color-mix(in srgb, var(--bg) 95%, transparent)', borderColor: 'var(--line)', boxShadow: '0 2px 10px -6px rgba(0,0,0,0.3)' };

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
          {useGlass ? (
            <GlassFilter className={containerClass} style={containerStyle} borderRadius="999px" distortionScale={4} blur={16}>
              {headerContent}
            </GlassFilter>
          ) : (
            <div className={containerClass} style={containerStyle}>
              {headerContent}
            </div>
          )}

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
