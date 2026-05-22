import { Aperture, Menu } from 'lucide-react';
import type { RouteName } from '../App';

const navItems: Array<{ label: string; route: RouteName }> = [
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'About', route: 'about' },
  { label: 'Services', route: 'services' },
  { label: 'Contact', route: 'contact' },
  { label: 'Admin', route: 'admin' }
];

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
};

export function SiteHeader({ activeRoute, onNavigate }: Props) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate('home')} type="button">
        <Aperture size={20} aria-hidden="true" />
        <span>Capture Crew</span>
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            className={activeRoute === item.route ? 'nav-link is-active' : 'nav-link'}
            key={item.route}
            onClick={() => onNavigate(item.route)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="icon-button mobile-only" type="button" aria-label="Open navigation">
        <Menu size={18} />
      </button>
    </header>
  );
}
