import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import type { RouteName } from '../App';
import { useSiteData } from '../lib/siteData';

type Props = {
  onNavigate: (route: RouteName) => void;
};

// Inline SVGs — lucide-react brand icons are deprecated
function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function YtIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function FlickrIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="7" cy="12" r="4.5" />
      <circle cx="17" cy="12" r="4.5" />
    </svg>
  );
}
function ThreadsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.735 6.828 2.12 1.688 1.32 2.855 3.295 3.467 5.874l-2.089.489c-.987-4.208-3.578-6.332-8.206-6.362-2.935.02-5.151.913-6.589 2.655-1.348 1.63-2.037 4.048-2.06 7.188.023 3.14.712 5.558 2.06 7.187 1.438 1.742 3.654 2.636 6.589 2.655 2.757-.018 4.725-.755 5.992-2.251.75-.882 1.218-2.044 1.418-3.52a6.99 6.99 0 0 1-2.923.583c-2.9 0-5.038-1.068-6.176-3.009-.747-1.25-.965-2.766-.63-4.39.317-1.513 1.076-2.737 2.196-3.542 1.226-.876 2.826-1.223 4.584-1.001 1.44.183 2.698.74 3.608 1.607.112.105.218.213.32.324.38-1.29.506-2.652.358-3.909l2.086-.265c.227 1.91.04 3.94-.554 5.774.387.812.65 1.716.76 2.7.27 2.404-.357 4.36-1.816 5.695-1.388 1.27-3.5 1.962-6.107 2.014h-.017zm.666-10.99c-1.107 0-2.037.347-2.632.977-.524.553-.782 1.307-.766 2.24.016.933.3 1.671.848 2.196.6.574 1.53.883 2.69.883 1.59 0 2.768-.51 3.498-1.517.514-.71.75-1.622.706-2.71a5.15 5.15 0 0 0-.178-1.126c-.59-.601-1.566-.943-2.736-.943h-.43z"/>
    </svg>
  );
}
function FbIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

const NAV_LINKS: { label: string; route: RouteName }[] = [
  { label: 'Portfolio', route: 'portfolio' },
  { label: 'Services', route: 'services' },
  { label: 'About', route: 'about' },
  { label: 'Contact', route: 'contact' },
];

const LEGAL_LINKS: { label: string; route: RouteName }[] = [
  { label: 'Privacy Policy', route: 'privacy' },
  { label: 'Terms of Use', route: 'terms' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/capcrewst', Icon: IgIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@officialcapturecrew', Icon: YtIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/capturecrew-studio-6b568b411', Icon: LiIcon },
  { label: 'Flickr', href: 'https://www.flickr.com/photos/203143028@N07', Icon: FlickrIcon },
  { label: 'Threads', href: 'https://www.threads.com/@capcrewst', Icon: ThreadsIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/officialcapturecrew', Icon: FbIcon },
];

export function SiteFooter({ onNavigate }: Props) {
  const { content } = useSiteData();

  return (
    <footer
      className="border-t border-line"
      style={{ background: 'var(--bg)' }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo/capture-crew-logo-gold.png"
              alt="Capture Crew"
              className="h-16 w-auto object-contain"
            />
            <span
              className="text-lg tracking-[0.12em] uppercase"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 400, color: 'var(--accent)' }}
            >
              Capture Crew
            </span>
          </div>
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
