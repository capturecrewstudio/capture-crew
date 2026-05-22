import { Menu } from 'lucide-react';
import { useState } from 'react';
import type { RouteName } from '../App';

const navItems: Array<{ label: string; route: RouteName }> = [
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'About', route: 'about' },
  { label: 'Services', route: 'services' },
  { label: 'Testimonials', route: 'testimonials' },
  { label: 'Blog', route: 'blog' },
  { label: 'Contact', route: 'contact' },
  { label: 'Admin', route: 'admin' }
];

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
};

export function SiteHeader({ activeRoute, onNavigate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigate(route: RouteName) {
    onNavigate(route);
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate('home')} type="button">
        <img className="brand-logo" src="/assets/logo/capture-crew-logo-wide.jpeg" alt="Capture Crew" />
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            className={activeRoute === item.route ? 'nav-link is-active' : 'nav-link'}
            key={item.route}
            onClick={() => navigate(item.route)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="icon-button mobile-only" type="button" aria-label="Open navigation" onClick={() => setMenuOpen((open) => !open)}>
        <Menu size={18} />
      </button>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              className={activeRoute === item.route ? 'nav-link is-active' : 'nav-link'}
              key={item.route}
              onClick={() => navigate(item.route)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
