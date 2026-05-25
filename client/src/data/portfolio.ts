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
  detail: '/assets/media/gallery-detail.jpeg',
  architectureDetail1: '/assets/media/architecture-detail-1.jpeg',
  architectureDetail2: '/assets/media/architecture-detail-2.jpeg',
  interiorsDetail1: '/assets/media/interiors-detail-1.jpeg',
  interiorsDetail2: '/assets/media/interiors-detail-2.jpeg',
  fashionDetail1: '/assets/media/fashion-detail-1.jpeg',
  fashionDetail2: '/assets/media/fashion-detail-2.jpeg',
  foodDetail1: '/assets/media/food-detail-1.jpeg',
  productDetail1: '/assets/media/product-detail-1.jpeg',
  productDetail2: '/assets/media/product-detail-2.jpeg',
  weddingDetail1: '/assets/media/wedding-detail-1.jpeg',
  weddingDetail2: '/assets/media/wedding-detail-2.jpeg',
  blogHero: '/assets/media/blog-hero.jpeg'
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
      media.architectureDetail1,
      media.architectureDetail2,
      media.interiors,
      media.commercial
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
      media.interiorsDetail1,
      media.interiorsDetail2,
      media.architecture,
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
      media.fashionDetail1,
      media.fashionDetail2,
      media.detail,
      media.product
    ],
    summary: 'A campaign system balancing cinematic portraiture, movement, and sculptural negative space.',
    narrative:
      'The wardrobe had a strong graphic silhouette, so the image language leaned into controlled motion, architectural backgrounds, and skin-toned warmth against black styling.',
    featured: true
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
      media.productDetail1,
      media.productDetail2,
      media.food,
      media.detail
    ],
    summary: 'A tactile product system for objects that needed to feel collectible, minimal, and rare.',
    narrative:
      'We created a modular product language that can scale across hero banners, thumbnails, product detail pages, and campaign placements without losing the luxury character.',
    featured: false
  }
];

export const testimonials = [
  {
    name: 'Aarav Mehta',
    designation: 'Principal Architect, AM Studio',
    message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human.',
    image: media.architectureDetail1
  },
  {
    name: 'Ira Kapoor',
    designation: 'Brand Director, Solenne',
    message: 'The team turned our campaign into a visual world. We used the assets across web, print, press, and investor presentations.',
    image: media.fashionDetail1
  },
  {
    name: 'Rohan Sethi',
    designation: 'Founder, Atlas Table',
    message: 'The launch film gave our restaurant an identity before guests had even stepped through the door.',
    image: media.foodDetail1
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
    image: media.architecture
  },
  {
    title: 'Why Image Libraries Matter More Than One Hero Film',
    date: 'April 28, 2026',
    excerpt: 'Premium brands need a visual system: hero assets, detail imagery, portraits, social crops, and story-led motion.',
    image: media.commercial
  },
  {
    title: 'The Editorial Difference in Wedding Films',
    date: 'April 08, 2026',
    excerpt: 'The difference between documenting an event and shaping a cinematic family archive.',
    image: media.wedding
  }
];
