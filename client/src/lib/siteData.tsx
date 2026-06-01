import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiGetContent, apiGetTestimonials, type ApiContent, type ApiTestimonial } from './adminApi';

// ─── Defaults (shown while loading) ──────────────────────────────────────────

const DEFAULT_CONTENT: ApiContent = {
  id: '',
  heroHeadline: 'Where Craft\nMeets Legacy',
  heroSubheadline: 'Architecture. Luxury. Visual Storytelling.',
  heroCta1: 'View Portfolio',
  heroCta2: 'Book a Shoot',
  stats: {},
  partners: ['Raymond', 'Mini So', 'Prada', 'Bluestone', 'ORRA', 'Malabar Gold and Diamonds', 'National Geographic', 'Zara', 'Gillette', 'Nike'],
  socialProofEyebrow: 'Our Clients',
  socialProofHeadline: 'Brands That Trust Our Lens',
  faq: [
    { q: 'What types of projects do you shoot?', a: 'We cover architecture, luxury interiors, fashion, commercial, product, food, and weddings — with a cinematic editorial approach across all categories.' },
    { q: 'How far in advance should I book?', a: 'For projects in India, 2–4 weeks is ideal. For international projects or large campaigns, 6–8 weeks gives us time to plan properly.' },
    { q: 'Do you travel for shoots?', a: "We're based across Chandigarh, Mumbai, Pune, and Bengaluru, and we travel internationally for the right projects." },
    { q: 'What is your turnaround time?', a: 'Edited galleries are typically delivered within 7–14 business days. Rush timelines are available on request.' },
    { q: 'Do you offer video alongside photography?', a: 'Yes — most packages include both. We deliver campaign stills, launch films, reels, and multi-format social assets in one shoot.' },
    { q: 'How does the booking process work?', a: "Fill out our enquiry form, we'll schedule a brief call, share a tailored proposal, and confirm with a 40% advance." },
  ],
  packages: [],
  footerTagline: 'Visual storytelling for architecture, luxury, fashion, and the brands that refuse to be ordinary.',
  footerPhone: '+91 8898400022',
  footerEmail: 'capcrewst@gmail.com',
  footerCities: 'Chandigarh · Delhi · Surat · Bengaluru · London',
  contactHeadline: "Let's make something worth keeping.",
  contactSubheadline: "Tell us about your project and we'll get back to you within 24 hours.",
  socialDock: {
    whatsapp: 'https://wa.me/918898400022',
    phone: 'tel:+918898400022',
    instagram: 'https://www.instagram.com/capcrewst',
    youtube: 'https://www.youtube.com/@officialcapturecrew',
    linkedin: 'https://www.flickr.com/photos/203143028@N07',
    threads: 'https://www.threads.com/@capcrewst',
    email: 'mailto:capcrewst@gmail.com',
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

type SiteData = {
  content: ApiContent;
  testimonials: ApiTestimonial[];
  loading: boolean;
};

const SiteDataContext = createContext<SiteData>({
  content: DEFAULT_CONTENT,
  testimonials: [],
  loading: true,
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ApiContent>(DEFAULT_CONTENT);
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGetContent(), apiGetTestimonials()])
      .then(([c, t]) => {
        setContent(c);
        setTestimonials(t);
      })
      .catch(() => { /* keep defaults on error */ })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteDataContext.Provider value={{ content, testimonials, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}

// ─── Stats helper (DB stores as nested JSON) ──────────────────────────────────

export type StatShape = { value: number; suffix: string; label: string };

export function extractStats(raw: Record<string, unknown>): {
  shoots: StatShape; architects: StatShape; brands: StatShape; years: StatShape;
} {
  function s(k: string, defVal: number, defSuffix: string, defLabel: string): StatShape {
    const v = raw[k] as Record<string, unknown> | undefined;
    return {
      value:  typeof v?.value  === 'number' ? v.value  : defVal,
      suffix: typeof v?.suffix === 'string' ? v.suffix : defSuffix,
      label:  typeof v?.label  === 'string' ? v.label  : defLabel,
    };
  }
  return {
    shoots:     s('shoots',     500, '+',     'Shoots Delivered'),
    architects: s('architects', 160, '+',     'Architects Trusted'),
    brands:     s('brands',     68,  '+',     'Premium Brands'),
    years:      s('years',      8,   '+ yrs', 'Studio Heritage'),
  };
}
