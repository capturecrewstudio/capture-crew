export type Category = {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  location: string;
  year: string;
  client: string;
  services: string[];
  image: string;
  gallery: string[];
  summary: string;
  narrative: string;
  featured: boolean;
};

const media = {
  architecture: '/assets/media/architecture-hero.jpeg',
  interiors: '/assets/media/interiors-hero.jpeg',
  fashion: '/assets/media/fashion-hero.jpeg',
  commercial: '/assets/media/commercial-hero.jpeg',
  product: '/assets/media/product-hero.jpeg',
  food: '/assets/media/food-hero.jpeg',
  wedding: '/assets/media/wedding-hero.jpeg',
  detail: '/assets/media/gallery-detail.jpeg'
};

export const categories: Category[] = [
  {
    name: 'Architecture',
    slug: 'architecture',
    description: 'Built environments framed through proportion, light, material honesty, and cinematic restraint.',
    heroImage: media.architecture
  },
  {
    name: 'Luxury Interiors',
    slug: 'luxury-interiors',
    description: 'Editorial interior stories for residences, hotels, galleries, and private hospitality concepts.',
    heroImage: media.interiors
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Campaign imagery, lookbooks, motion edits, and sculptural portraits with brand-level polish.',
    heroImage: media.fashion
  },
  {
    name: 'Commercial',
    slug: 'commercial',
    description: 'Launch films and image libraries for premium businesses, hospitality brands, and founders.',
    heroImage: media.commercial
  },
  {
    name: 'Product',
    slug: 'product',
    description: 'Still-life systems for objects, textures, packaging, campaigns, and ecommerce hero assets.',
    heroImage: media.product
  },
  {
    name: 'Food',
    slug: 'food',
    description: 'Atmospheric food, beverage, restaurant, and menu stories that feel intimate and premium.',
    heroImage: media.food
  },
  {
    name: 'Weddings',
    slug: 'weddings',
    description: 'Cinematic wedding storytelling with quiet luxury, movement, intimacy, and editorial texture.',
    heroImage: media.wedding
  }
];

export const projects: Project[] = [
  {
    title: 'Maison Aster',
    slug: 'maison-aster',
    category: 'Architecture',
    categorySlug: 'architecture',
    location: 'Bengaluru',
    year: '2026',
    client: 'AM Studio',
    services: ['Architecture photography', 'Launch film', 'Website image library'],
    image: media.architecture,
    gallery: [
      media.interiors,
      media.commercial,
      media.detail
    ],
    summary: 'A restrained residential story told through stone, shadow, glass, and late-afternoon light.',
    narrative:
      'The brief was to make a private residence feel architectural without becoming cold. We built the shoot around threshold moments, warm interior spill, and exterior lines that give the project a quiet cinematic gravity.',
    featured: true
  },
  {
    title: 'The Gilded Room',
    slug: 'the-gilded-room',
    category: 'Luxury Interiors',
    categorySlug: 'luxury-interiors',
    location: 'Mumbai',
    year: '2025',
    client: 'Solenne Hospitality',
    services: ['Interior photography', 'Brand imagery', 'Social cutdowns'],
    image: media.interiors,
    gallery: [
      media.architecture,
      media.commercial,
      media.product
    ],
    summary: 'Editorial interiors crafted for a private hospitality concept and its launch campaign.',
    narrative:
      'A layered shoot balancing texture, service rituals, and intimate corners. The final library supported the launch website, press features, booking campaigns, and investor material.',
    featured: true
  },
  {
    title: 'Noir Atelier',
    slug: 'noir-atelier',
    category: 'Fashion',
    categorySlug: 'fashion',
    location: 'Paris',
    year: '2025',
    client: 'Noir Atelier',
    services: ['Campaign photography', 'Motion portraits', 'Lookbook'],
    image: media.fashion,
    gallery: [
      media.detail,
      media.product,
      media.commercial
    ],
    summary: 'A campaign system balancing cinematic portraiture, movement, and sculptural negative space.',
    narrative:
      'The wardrobe had a strong graphic silhouette, so the image language leaned into controlled motion, architectural backgrounds, and skin-toned warmth against black styling.',
    featured: true
  },
  {
    title: 'Atlas Table',
    slug: 'atlas-table',
    category: 'Food',
    categorySlug: 'food',
    location: 'Goa',
    year: '2025',
    client: 'Atlas Table',
    services: ['Restaurant photography', 'Menu films', 'Founder portraits'],
    image: media.food,
    gallery: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85'
    ],
    summary: 'A coastal dining story built around flame, ceramic texture, produce, and a slower evening rhythm.',
    narrative:
      'The project needed to feel sensory without looking crowded. We designed the image set around negative space, tableside gestures, and amber highlights that gave the restaurant a signature mood.',
    featured: false
  },
  {
    title: 'Object 07',
    slug: 'object-07',
    category: 'Product',
    categorySlug: 'product',
    location: 'Delhi',
    year: '2026',
    client: 'Kanso Objects',
    services: ['Product photography', 'Packaging imagery', 'Web assets'],
    image: media.product,
    gallery: [
      'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85'
    ],
    summary: 'A tactile product system for objects that needed to feel collectible, minimal, and rare.',
    narrative:
      'We created a modular product language that can scale across hero banners, thumbnails, product detail pages, and campaign placements without losing the luxury character.',
    featured: false
  },
  {
    title: 'Veda Union',
    slug: 'veda-union',
    category: 'Weddings',
    categorySlug: 'weddings',
    location: 'Udaipur',
    year: '2025',
    client: 'Private Client',
    services: ['Wedding film', 'Editorial photography', 'Family archive'],
    image: media.wedding,
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85'
    ],
    summary: 'An intimate destination wedding photographed like a private editorial commission.',
    narrative:
      'The coverage balanced family presence with cinematic scale: architecture, rituals, wardrobe, emotion, and the soft transitions between formal moments.',
    featured: false
  }
];

export const testimonials = [
  {
    name: 'Aarav Mehta',
    designation: 'Principal Architect, AM Studio',
    message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Ira Kapoor',
    designation: 'Brand Director, Solenne',
    message: 'The team turned our campaign into a visual world. We used the assets across web, print, press, and investor presentations.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Rohan Sethi',
    designation: 'Founder, Atlas Table',
    message: 'The launch film gave our restaurant an identity before guests had even stepped through the door.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85'
  }
];

export const services = [
  {
    title: 'Architectural Photography',
    summary: 'Exterior, interior, hospitality, real estate, and design-led image libraries.',
    deliverables: ['Shot planning', 'Golden-hour capture', 'Retouched image set', 'Web-ready derivatives']
  },
  {
    title: 'Commercial Films',
    summary: 'Launch films, brand edits, founder interviews, reels, and campaign motion assets.',
    deliverables: ['Creative treatment', 'Production', 'Color grade', 'Multi-format exports']
  },
  {
    title: 'Brand Campaigns',
    summary: 'Visual direction, photography, video, and social systems for premium brands.',
    deliverables: ['Moodboards', 'Campaign stills', 'Motion cutdowns', 'Usage-ready archive']
  },
  {
    title: 'Wedding Storytelling',
    summary: 'Editorial wedding photography and films for destination celebrations and private events.',
    deliverables: ['Event coverage', 'Teaser film', 'Feature film', 'Curated gallery']
  }
];

export const posts = [
  {
    title: 'How Luxury Architecture Brands Should Plan a Visual Launch',
    date: 'May 12, 2026',
    excerpt: 'A practical field guide for architects and developers preparing a project for press, web, and sales.',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'Why Image Libraries Matter More Than One Hero Film',
    date: 'April 28, 2026',
    excerpt: 'Premium brands need a visual system: hero assets, detail imagery, portraits, social crops, and story-led motion.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85'
  },
  {
    title: 'The Editorial Difference in Wedding Films',
    date: 'April 08, 2026',
    excerpt: 'The difference between documenting an event and shaping a cinematic family archive.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85'
  }
];
