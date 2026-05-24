import { useSyncExternalStore } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import type { RouteName } from '../App';
import { getSiteContent, subscribeAdminStore } from '../lib/adminStore';

type Props = {
  onNavigate: (route: RouteName) => void;
};

// Inline SVGs — lucide-react brand icons are deprecated
function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}
function YtIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}
function LiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const NAV_LINKS: { label: string; route: RouteName }[] = [
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'About', route: 'about' },
  { label: 'Services', route: 'services' },
  { label: 'Blog', route: 'blog' },
  { label: 'Contact', route: 'contact' },
];

const LEGAL_LINKS: { label: string; route: RouteName }[] = [
  { label: 'Privacy Policy', route: 'privacy' },
  { label: 'Terms of Use', route: 'terms' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/officialcapturecrewstudios', Icon: IgIcon },
  { label: 'YouTube', href: 'https://youtube.com/', Icon: YtIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/', Icon: LiIcon },
];

export function SiteFooter({ onNavigate }: Props) {
  const content = useSyncExternalStore(subscribeAdminStore, getSiteContent);

  return (
    <footer
      className="border-t border-line"
      style={{ background: 'var(--bg)' }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <img
            src="/assets/logo/capture-crew-logo-gold.png"
            alt="Capture Crew"
            className="h-12 w-auto object-contain"
            style={{ minWidth: '180px' }}
          />
          <p
            className="text-stone text-sm leading-relaxed max-w-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Luxury visual stories for brands, spaces, and people with presence. National Geographic standard. Engineered for trust.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 mt-1">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-line bg-ivory/5 flex items-center justify-center text-stone hover:text-ivory hover:border-accent transition-all duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation column */}
        <div className="flex flex-col gap-4">
          <h4
            className="text-[0.6rem] uppercase tracking-[0.22em] text-stone/60"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Navigation
          </h4>
          <nav className="flex flex-col gap-2.5">
            {NAV_LINKS.map(({ label, route }) => (
              <button
                key={route}
                type="button"
                onClick={() => onNavigate(route)}
                className="text-left text-sm text-stone hover:text-ivory transition-colors duration-200 w-fit"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-4">
          <h4
            className="text-[0.6rem] uppercase tracking-[0.22em] text-stone/60"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Studio
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${content.footerPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-2.5 text-sm text-stone hover:text-ivory transition-colors duration-200"
            >
              <Phone size={13} className="text-accent shrink-0" />
              {content.footerPhone}
            </a>
            <a
              href={`mailto:${content.footerEmail}`}
              className="flex items-center gap-2.5 text-sm text-stone hover:text-ivory transition-colors duration-200"
            >
              <Mail size={13} className="text-accent shrink-0" />
              {content.footerEmail}
            </a>
            <div className="flex items-start gap-2.5 text-sm text-stone">
              <MapPin size={13} className="text-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed">{content.footerCities}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-line mx-4 sm:mx-6" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-[0.65rem] text-stone/50"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          © {new Date().getFullYear()} <span style={{ color: 'var(--accent)' }}>Capture Crew</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {LEGAL_LINKS.map(({ label, route }) => (
            <button
              key={route}
              type="button"
              onClick={() => onNavigate(route)}
              className="text-[0.65rem] text-stone/50 hover:text-stone transition-colors duration-200"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-accent hover:text-ivory border border-accent/30 hover:border-accent rounded-full px-4 py-1.5 transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Book Consultation
            <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
