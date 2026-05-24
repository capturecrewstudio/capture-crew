import React, { useSyncExternalStore } from 'react';
import { getSiteContent, subscribeAdminStore } from '../lib/adminStore';


type SocialLink = {
  id: string;
  label: string;
  href: string;
  color: string;
  Icon: () => React.ReactElement;
};

const LINK_DEFS: Omit<SocialLink, 'href'>[] = [
  {
    id: 'phone', label: 'Call Us', color: '#888',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp', label: 'WhatsApp', color: '#25D366',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.856L.057 23.499a.5.5 0 00.611.611l5.638-1.479A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.03-1.366l-.36-.214-3.733.979.997-3.645-.235-.374A9.861 9.861 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
      </svg>
    ),
  },
  {
    id: 'instagram', label: 'Instagram', color: '#E1306C',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    id: 'youtube', label: 'YouTube', color: '#FF0000',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin', label: 'LinkedIn', color: '#0A66C2',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'flickr', label: 'Flickr', color: '#0063DC',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M0 12c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6zm12 0c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6-6 2.686-6 6z"/>
      </svg>
    ),
  },
  {
    id: 'threads', label: 'Threads', color: '#888',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 011.57.044c-.051-.277-.094-.546-.13-.806-.138-.959-.171-1.888.146-2.675.322-.8 1.002-1.387 2.014-1.745 1.966-.695 3.443.414 4.072 1.197l-1.584 1.26c-.186-.234-.808-.853-1.737-.531-.425.15-.695.41-.803.774-.155.523-.1 1.26.055 2.274.053.345.117.703.19 1.067.337.046.67.103.995.172 2.748.581 4.726 1.98 5.573 3.934.983 2.27.672 5.239-1.733 7.59-1.874 1.832-4.226 2.729-7.204 2.749zm-3.052-8.36c.059 1.071.92 1.714 2.435 1.633.988-.054 1.764-.422 2.308-1.094.572-.708.92-1.746 1.037-3.09a12.697 12.697 0 00-1.33-.09c-1.108.063-1.974.37-2.517.888-.511.488-.77 1.136-.733 1.754h-.2z"/>
      </svg>
    ),
  },
  {
    id: 'facebook', label: 'Facebook', color: '#1877F2',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    id: 'mail', label: 'Email', color: '#888',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
];

export function SocialDock() {
  const content = useSyncExternalStore(subscribeAdminStore, getSiteContent);
  const dock = content.socialDock;

  const LINKS: SocialLink[] = LINK_DEFS.map(def => ({
    ...def,
    href: def.id === 'phone'     ? dock.phone
        : def.id === 'whatsapp'  ? dock.whatsapp
        : def.id === 'instagram' ? dock.instagram
        : def.id === 'youtube'   ? dock.youtube
        : def.id === 'linkedin'  ? 'https://www.linkedin.com/in/capturecrew-studio-6b568b411'
        : def.id === 'flickr'    ? 'https://www.flickr.com/photos/203143028@N07'
        : def.id === 'threads'   ? dock.threads
        : def.id === 'facebook'  ? 'https://www.facebook.com/officialcapturecrew'
        : dock.email,
  }));

  return (
    <>
      {/* Always-visible slim sidebar strip — right edge */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-end gap-1 py-3"
        style={{ pointerEvents: 'none' }}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group flex items-center"
            style={{
              pointerEvents: 'auto',
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {/* Label — slides in from right on hover */}
            <span
              className="text-[0.6rem] uppercase tracking-[0.18em] font-mono whitespace-nowrap px-2.5 py-1 rounded-l-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out"
              style={{
                background: 'rgba(8,8,8,0.88)',
                border: `1px solid ${link.color}28`,
                borderRight: 'none',
                backdropFilter: 'blur(12px)',
                color: `${link.color}bb`,
              }}
            >
              {link.label}
            </span>

            {/* Icon pill */}
            <span
              className="flex items-center justify-center w-9 h-9 transition-all duration-300 ease-out group-hover:w-10 group-hover:h-10"
              style={{
                background: 'rgba(12,12,12,0.65)',
                borderTop: `1px solid ${link.color}22`,
                borderBottom: `1px solid ${link.color}22`,
                borderLeft: `1px solid ${link.color}22`,
                borderRight: `2px solid ${link.color}60`,
                backdropFilter: 'blur(12px)',
                color: `${link.color}99`,
                borderRadius: '6px 0 0 6px',
              }}
            >
              <link.Icon />
            </span>

            {/* Accent line on the far right edge */}
            <span
              className="w-0.5 h-9 group-hover:h-10 transition-all duration-300"
              style={{ background: link.color, opacity: 0.25 }}
            />
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .social-dock-strip { display: none; }
        }
      `}</style>
    </>
  );
}
