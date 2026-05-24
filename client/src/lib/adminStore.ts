/**
 * adminStore — localStorage-backed reactive data layer.
 * All admin panels write here; all public components read from here.
 * Swap `load`/`save` implementations to hit a real API later.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaItem = {
  id: string;
  url: string;          // object URL (local) or CDN URL (remote)
  filename: string;
  categorySlug: string;
  isCover: boolean;
  sortOrder: number;
  createdAt: string;    // ISO string
};

export type AdminCategory = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;    // URL of hero image
  sortOrder: number;
};

export type AdminTestimonial = {
  id: string;
  name: string;
  designation: string;
  message: string;
  image: string;        // URL or empty
  featured: boolean;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'booked' | 'archived';
  createdAt: string;
};

export type SiteContent = {
  // Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroCta1: string;
  heroCta2: string;
  // Stats
  statShoots: number;
  statShoots_suffix: string;
  statShoots_label: string;
  statArchitects: number;
  statArchitects_suffix: string;
  statArchitects_label: string;
  statBrands: number;
  statBrands_suffix: string;
  statBrands_label: string;
  statYears: number;
  statYears_suffix: string;
  statYears_label: string;
  // Partners marquee
  partners: string[];
  // Social proof header
  socialProofEyebrow: string;
  socialProofHeadline: string;
  // FAQ
  faq: Array<{ q: string; a: string }>;
  // Packages / FeatureGrid
  packages: Array<{
    title: string;
    price: string;
    priceNote: string;
    tag: string;
    summary: string;
    features: string[];
    cta: string;
    highlight: boolean;
  }>;
  // Footer
  footerTagline: string;
  footerPhone: string;
  footerEmail: string;
  footerCities: string;
  // Contact section
  contactHeadline: string;
  contactSubheadline: string;
  // Social Dock links
  socialDock: {
    whatsapp: string;
    phone: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    threads: string;
    email: string;
  };
};

export type AdminStore = {
  categories: AdminCategory[];
  media: MediaItem[];
  testimonials: AdminTestimonial[];
  leads: Lead[];
  siteContent: SiteContent;
  adminPasswordHash: string; // simple bcrypt-free hash
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: 'Where Craft\nMeets Legacy.',
  heroSubheadline: 'Architecture. Luxury. Visual Storytelling.',
  heroCta1: 'View Portfolio',
  heroCta2: 'Book a Shoot',
  statShoots: 500,
  statShoots_suffix: '+',
  statShoots_label: 'Shoots Delivered',
  statArchitects: 160,
  statArchitects_suffix: '+',
  statArchitects_label: 'Architects Trusted',
  statBrands: 68,
  statBrands_suffix: '+',
  statBrands_label: 'Premium Brands',
  statYears: 8,
  statYears_suffix: '+ yrs',
  statYears_label: 'Studio Heritage',
  partners: ['Raymond', 'Mini Soo', 'Prada', 'Bluestone', 'Ori', 'National Geographic', 'Solenne', 'AM Studio'],
  socialProofEyebrow: 'Trusted worldwide',
  socialProofHeadline: 'Receipts, not promises.',
  faq: [
    { q: 'What types of projects do you shoot?', a: 'We cover architecture, luxury interiors, fashion, commercial, product, food, and weddings — with a cinematic editorial approach across all categories.' },
    { q: 'How far in advance should I book?', a: 'For projects in India, 2–4 weeks is ideal. For international projects or large campaigns, 6–8 weeks gives us time to plan properly.' },
    { q: 'Do you travel for shoots?', a: 'Yes. We\'re based across Chandigarh, Mumbai, Pune, and Bengaluru, and we travel internationally for the right projects.' },
    { q: 'What is your turnaround time?', a: 'Edited galleries are typically delivered within 7–14 business days. Rush timelines are available on request.' },
    { q: 'Do you offer video alongside photography?', a: 'Yes — most packages include both. We deliver campaign stills, launch films, reels, and multi-format social assets in one shoot.' },
    { q: 'How does the booking process work?', a: 'Fill out our enquiry form, we\'ll schedule a brief call, share a tailored proposal, and confirm with a 40% advance.' },
  ],
  packages: [
    {
      title: 'Essentials',
      price: '₹45,000',
      priceNote: 'half-day shoot',
      tag: '',
      summary: 'Perfect for product launches, small interiors, or brand portraits.',
      features: ['Half-day shoot (4 hrs)', '30 edited images', 'Digital delivery', '1 round of revisions', 'Commercial usage license'],
      cta: 'Book Essentials',
      highlight: false,
    },
    {
      title: 'Signature',
      price: '₹95,000',
      priceNote: 'full-day shoot',
      tag: 'Most Popular',
      summary: 'Our most booked package for architecture, fashion, and commercial work.',
      features: ['Full-day shoot (8 hrs)', '80 edited images', 'BTS behind-the-scenes', '3 rounds of revisions', 'Commercial + editorial license', 'Priority delivery in 7 days'],
      cta: 'Book Signature',
      highlight: true,
    },
    {
      title: 'Campaign',
      price: 'Custom',
      priceNote: 'multi-day project',
      tag: 'Premium',
      summary: 'For brands that need a full visual system — stills, film, and social assets.',
      features: ['Multi-day production', 'Unlimited edited images', 'Campaign film (60–90s)', 'Social media cutdowns', 'Full IP transfer', 'Dedicated project manager'],
      cta: 'Get a Quote',
      highlight: false,
    },
  ],
  footerTagline: 'Visual storytelling for architecture, luxury, fashion, and the brands that refuse to be ordinary.',
  footerPhone: '+91 98765 43210',
  footerEmail: 'hello@capturecrew.in',
  footerCities: 'Chandigarh · Mumbai · Pune · Bengaluru · London',
  contactHeadline: 'Let\'s make something worth keeping.',
  contactSubheadline: 'Tell us about your project and we\'ll get back to you within 24 hours.',
  socialDock: {
    whatsapp: 'https://wa.me/yournumber',
    phone: 'tel:+yourphone',
    instagram: 'https://instagram.com/officialcapturecrewstudios',
    youtube: 'https://youtube.com/@capturecrew',
    linkedin: 'https://linkedin.com/company/capturecrew',
    threads: 'https://threads.net/@capturecrew',
    email: 'mailto:hello@capturecrew.in',
  },
};

const DEFAULT_CATEGORIES: AdminCategory[] = [
  { slug: 'architecture', name: 'Architecture', description: 'Built environments framed through proportion, light, and cinematic restraint.', heroImage: '/assets/media/architecture-hero.jpeg', sortOrder: 0 },
  { slug: 'interiors', name: 'Luxury Interiors', description: 'Editorial interior stories for residences, hotels, galleries, and private concepts.', heroImage: '/assets/media/interiors-hero.jpeg', sortOrder: 1 },
  { slug: 'fashion', name: 'Fashion', description: 'Campaign imagery, lookbooks, motion edits, and sculptural portraits.', heroImage: '/assets/media/fashion-hero.jpeg', sortOrder: 2 },
  { slug: 'commercial', name: 'Commercial', description: 'Launch films and image libraries for premium businesses and hospitality brands.', heroImage: '/assets/media/commercial-hero.jpeg', sortOrder: 3 },
  { slug: 'product', name: 'Product', description: 'Still-life systems for objects, textures, packaging, and ecommerce hero assets.', heroImage: '/assets/media/product-hero.jpeg', sortOrder: 4 },
  { slug: 'food', name: 'Food', description: 'Atmospheric food, beverage, and restaurant stories that feel intimate and premium.', heroImage: '/assets/media/food-hero.jpeg', sortOrder: 5 },
  { slug: 'weddings', name: 'Weddings', description: 'Cinematic wedding storytelling with quiet luxury, movement, and editorial texture.', heroImage: '/assets/media/wedding-hero.jpeg', sortOrder: 6 },
];

const DEFAULT_TESTIMONIALS: AdminTestimonial[] = [
  { id: 'aarav-mehta', name: 'Aarav Mehta', designation: 'Principal Architect, AM Studio', message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human.', image: '/assets/media/architecture-detail-1.jpeg', featured: true },
  { id: 'ira-kapoor', name: 'Ira Kapoor', designation: 'Brand Director, Solenne', message: 'The team turned our campaign into a visual world. We used the assets across web, print, press, and investor presentations.', image: '/assets/media/fashion-detail-1.jpeg', featured: true },
  { id: 'rohan-sethi', name: 'Rohan Sethi', designation: 'Founder, Atlas Table', message: 'The launch film gave our restaurant an identity before guests had even stepped through the door.', image: '/assets/media/food-detail-1.jpeg', featured: true },
];

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  categories: 'cc-admin-categories',
  media: 'cc-admin-media',
  testimonials: 'cc-admin-testimonials',
  leads: 'cc-admin-leads',
  siteContent: 'cc-admin-content',
  adminPasswordHash: 'cc-admin-pw',
};

// ─── Simple hash (not crypto-secure, just anti-casual-snoop) ──────────────────

function simpleHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h.toString(16);
}

export const DEFAULT_ADMIN_PASSWORD = 'capturecrew2024';

// ─── Load / Save helpers ─────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Subscribers ─────────────────────────────────────────────────────────────

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeAdminStore(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Snapshot caches — reset on every notify() so useSyncExternalStore gets a
// stable reference between renders but a new one after actual writes.
let _contentSnapshot: SiteContent | null = null;
let _testimonialsSnapshot: AdminTestimonial[] | null = null;
let _categoriesSnapshot: AdminCategory[] | null = null;
let _mediaSnapshot: MediaItem[] | null = null;
let _leadsSnapshot: Lead[] | null = null;

function notify() {
  _contentSnapshot = null;
  _testimonialsSnapshot = null;
  _categoriesSnapshot = null;
  _mediaSnapshot = null;
  _leadsSnapshot = null;
  listeners.forEach((fn) => fn());
}

// ─── Public API ───────────────────────────────────────────────────────────────

// --- Auth ---
export function checkAdminPassword(password: string): boolean {
  const stored = localStorage.getItem(KEYS.adminPasswordHash) ?? simpleHash(DEFAULT_ADMIN_PASSWORD);
  return simpleHash(password) === stored;
}

export function setAdminPassword(newPassword: string): void {
  localStorage.setItem(KEYS.adminPasswordHash, simpleHash(newPassword));
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem('cc-admin-session') === '1';
}

export function adminLogin(password: string): boolean {
  if (checkAdminPassword(password)) {
    sessionStorage.setItem('cc-admin-session', '1');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem('cc-admin-session');
}

// --- Site Content ---
export function getSiteContent(): SiteContent {
  if (_contentSnapshot === null) {
    const stored = load(KEYS.siteContent, DEFAULT_CONTENT);
    // Merge with defaults so newly added fields are always present even when
    // localStorage was written before they existed.
    _contentSnapshot = { ...DEFAULT_CONTENT, ...stored };
  }
  return _contentSnapshot;
}

export function setSiteContent(patch: Partial<SiteContent>): void {
  const current = getSiteContent();
  save(KEYS.siteContent, { ...current, ...patch });
  notify();
}

// --- Categories ---
export function getCategories(): AdminCategory[] {
  if (_categoriesSnapshot === null) {
    _categoriesSnapshot = load(KEYS.categories, DEFAULT_CATEGORIES);
  }
  return _categoriesSnapshot;
}

export function setCategories(cats: AdminCategory[]): void {
  save(KEYS.categories, cats);
  notify();
}

export function upsertCategory(cat: AdminCategory): void {
  const cats = getCategories();
  const idx = cats.findIndex((c) => c.slug === cat.slug);
  if (idx >= 0) cats[idx] = cat;
  else cats.push(cat);
  save(KEYS.categories, cats);
  notify();
}

export function deleteCategory(slug: string): void {
  const cats = getCategories().filter((c) => c.slug !== slug);
  save(KEYS.categories, cats);
  notify();
}

// --- Media ---
export function getMedia(): MediaItem[] {
  if (_mediaSnapshot === null) {
    _mediaSnapshot = load<MediaItem[]>(KEYS.media, []);
  }
  return _mediaSnapshot;
}

export function addMedia(items: Omit<MediaItem, 'id' | 'createdAt'>[]): void {
  const media = getMedia();
  const newItems: MediaItem[] = items.map((item) => ({
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }));
  save(KEYS.media, [...media, ...newItems]);
  notify();
}

export function updateMedia(id: string, patch: Partial<MediaItem>): void {
  const media = getMedia().map((m) => (m.id === id ? { ...m, ...patch } : m));
  save(KEYS.media, media);
  notify();
}

export function deleteMedia(id: string): void {
  const media = getMedia().filter((m) => m.id !== id);
  save(KEYS.media, media);
  notify();
}

export function setCoverImage(categorySlug: string, mediaId: string): void {
  const media = getMedia().map((m) => ({
    ...m,
    isCover: m.categorySlug === categorySlug ? m.id === mediaId : m.isCover,
  }));
  save(KEYS.media, media);
  notify();
}

// --- Testimonials ---
export function getTestimonials(): AdminTestimonial[] {
  if (_testimonialsSnapshot === null) {
    _testimonialsSnapshot = load(KEYS.testimonials, DEFAULT_TESTIMONIALS);
  }
  return _testimonialsSnapshot;
}

export function upsertTestimonial(t: AdminTestimonial): void {
  const all = getTestimonials();
  const idx = all.findIndex((x) => x.id === t.id);
  if (idx >= 0) all[idx] = t;
  else all.push({ ...t, id: t.id || crypto.randomUUID() });
  save(KEYS.testimonials, all);
  notify();
}

export function deleteTestimonial(id: string): void {
  save(KEYS.testimonials, getTestimonials().filter((t) => t.id !== id));
  notify();
}

// --- Leads ---
export function getLeads(): Lead[] {
  if (_leadsSnapshot === null) {
    _leadsSnapshot = load<Lead[]>(KEYS.leads, []);
  }
  return _leadsSnapshot;
}

export function addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): void {
  const leads = getLeads();
  leads.unshift({ ...lead, id: crypto.randomUUID(), status: 'new', createdAt: new Date().toISOString() });
  save(KEYS.leads, leads);
  notify();
}

export function updateLeadStatus(id: string, status: Lead['status']): void {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  save(KEYS.leads, leads);
  notify();
}
