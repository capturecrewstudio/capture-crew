import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Architecture',     slug: 'architecture',  description: 'Built environments framed through proportion, light, and cinematic restraint.' },
  { name: 'Luxury Interiors', slug: 'interiors',     description: 'Editorial interior stories for residences, hotels, galleries, and private concepts.' },
  { name: 'Fashion',          slug: 'fashion',       description: 'Campaign imagery, lookbooks, motion edits, and sculptural portraits.' },
  { name: 'Commercial',       slug: 'commercial',    description: 'Launch films and image libraries for premium businesses and hospitality brands.' },
  { name: 'Product',          slug: 'product',       description: 'Still-life systems for objects, textures, packaging, and ecommerce hero assets.' },
  { name: 'Real Estate',      slug: 'real-estate',   description: 'Drone aerials, luxury site films, and property walkthroughs that sell the space.' },
  { name: 'Food',             slug: 'food',          description: 'Editorial food photography and brand films for restaurants and hospitality.' },
  { name: 'Weddings',         slug: 'weddings',      description: 'Cinematic wedding films and editorial portraits for luxury ceremonies.' },
];

// Base URL for local public assets (served from Vite in dev, or as static files)
const BASE = '';

const PORTFOLIO_PROJECTS = [
  {
    title: 'Maison Aster',
    slug: 'maison-aster',
    categorySlug: 'architecture',
    location: 'Bengaluru',
    year: '2026',
    client: 'AM Studio',
    services: ['Architecture photography', 'Launch film', 'Website image library'],
    coverImage: `${BASE}/assets/media/architecture-hero.jpeg`,
    summary: 'A restrained residential story told through stone, shadow, glass, and late-afternoon light.',
    narrative: 'The brief was to make a private residence feel architectural without becoming cold. We built the shoot around threshold moments, warm interior spill, and exterior lines that give the project a quiet cinematic gravity.',
    featured: true,
    gallery: [
      '/assets/media/architecture-hero.jpeg',
      '/assets/media/architecture-detail-1.jpeg',
      '/assets/media/architecture-detail-2.jpeg',
      '/assets/media/interiors-hero.jpeg',
      '/assets/media/commercial-hero.jpeg',
    ],
  },
  {
    title: 'The Gilded Room',
    slug: 'the-gilded-room',
    categorySlug: 'interiors',
    location: 'Mumbai',
    year: '2025',
    client: 'Solenne Hospitality',
    services: ['Interior photography', 'Brand imagery', 'Social cutdowns'],
    coverImage: `${BASE}/assets/media/interiors-hero.jpeg`,
    summary: 'Editorial interiors crafted for a private hospitality concept and its launch campaign.',
    narrative: 'A layered shoot balancing texture, service rituals, and intimate corners. The final library supported the launch website, press features, booking campaigns, and investor material.',
    featured: true,
    gallery: [
      '/assets/media/interiors-hero.jpeg',
      '/assets/media/interiors-detail-1.jpeg',
      '/assets/media/interiors-detail-2.jpeg',
      '/assets/media/architecture-hero.jpeg',
      '/assets/media/product-hero.jpeg',
    ],
  },
  {
    title: 'Noir Atelier',
    slug: 'noir-atelier',
    categorySlug: 'fashion',
    location: 'Paris',
    year: '2025',
    client: 'Noir Atelier',
    services: ['Campaign photography', 'Motion portraits', 'Lookbook'],
    coverImage: `${BASE}/assets/media/fashion-hero.jpeg`,
    summary: 'A campaign system balancing cinematic portraiture, movement, and sculptural negative space.',
    narrative: 'The wardrobe had a strong graphic silhouette, so the image language leaned into controlled motion, architectural backgrounds, and skin-toned warmth against black styling.',
    featured: true,
    gallery: [
      '/assets/media/fashion-hero.jpeg',
      '/assets/media/fashion-detail-1.jpeg',
      '/assets/media/fashion-detail-2.jpeg',
      '/assets/media/gallery-detail.jpeg',
      '/assets/media/product-hero.jpeg',
    ],
  },
  {
    title: 'Object 07',
    slug: 'object-07',
    categorySlug: 'product',
    location: 'Delhi',
    year: '2026',
    client: 'Kanso Objects',
    services: ['Product photography', 'Packaging imagery', 'Web assets'],
    coverImage: `${BASE}/assets/media/product-hero.jpeg`,
    summary: 'A tactile product system for objects that needed to feel collectible, minimal, and rare.',
    narrative: 'We created a modular product language that can scale across hero banners, thumbnails, product detail pages, and campaign placements without losing the luxury character.',
    featured: false,
    gallery: [
      '/assets/media/product-hero.jpeg',
      '/assets/media/product-detail-1.jpeg',
      '/assets/media/product-detail-2.jpeg',
      '/assets/media/food-hero.jpeg',
      '/assets/media/gallery-detail.jpeg',
    ],
  },
];

const CAPABILITIES = [
  {
    title: 'Architecture',
    subtitle: 'Your work is extraordinary. Show it that way.',
    description: "Great spaces go unnoticed when the content doesn't match the craft. We document your projects with the precision they deserve — cinematic walkthroughs, editorial stills, and reels that stop the scroll. You design. We make the world see it.",
    image: '/assets/media/dsc-ccs-7.jpeg',
    tags: ['Site Shoots', 'Cinematic Reels', 'Walkthroughs', 'Social Content'],
    sortOrder: 0,
  },
  {
    title: 'Real Estate',
    subtitle: 'Buyers decide online. Make it count.',
    description: 'Premium properties deserve visuals that sell before a single site visit. Drone aerials, luxury walkthroughs, construction stories, and launch films — we craft content that makes buyers feel the space before they step inside. Presentation sells faster than price.',
    image: '/assets/media/real-estate-hero.jpeg',
    tags: ['Drone Shoots', 'Luxury Films', 'Progress Videos', 'Photography'],
    sortOrder: 1,
  },
  {
    title: 'Luxury Brands',
    subtitle: 'World-class brands deserve world-class visuals.',
    description: 'Behind every frame is a full team obsessed with making your brand impossible to ignore. Directing, color grading, storytelling — all engineered to position you at the top. Trusted by 160+ architects and 65+ premium brands across India.',
    image: '/assets/media/commercial-hero.jpeg',
    tags: ['Brand Visuals', 'Color Grading', 'Storytelling', 'Directing'],
    sortOrder: 2,
  },
  {
    title: 'Fashion',
    subtitle: 'Style that speaks before a word is said.',
    description: 'From editorial lookbooks to campaign films, we bring the full force of cinematic production to fashion. Every frame is styled, lit, and directed with intent — built to stop the feed, land the campaign, and make the label unforgettable.',
    image: '/assets/media/fashion-editorials-hero.jpeg',
    tags: ['Lookbooks', 'Campaign Films', 'Editorial Shoots', 'Brand Reels'],
    sortOrder: 3,
  },
];

const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    designation: 'Principal Architect, AM Studio — Bengaluru',
    message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human. We have used their work in every client pitch since.',
    image: 'https://ui-avatars.com/api/?name=Aarav+Mehta&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Ira Kapoor',
    designation: 'Brand Director, Solenne — New Delhi',
    message: 'The team turned our campaign into a visual world. Every asset — web, print, press, investor decks — all came from one single shoot. The ROI was unlike anything we had seen before.',
    image: 'https://ui-avatars.com/api/?name=Ira+Kapoor&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Rohan Sethi',
    designation: 'Founder, Atlas Table — Chandigarh',
    message: 'The launch film gave our restaurant an identity before guests had even stepped through the door. Bookings doubled in the first week of going live with the content.',
    image: 'https://ui-avatars.com/api/?name=Rohan+Sethi&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Priya Nair',
    designation: 'Creative Head, Velvette Couture — Mumbai',
    message: 'Our lookbook was shot in a single day and it looked like a week-long Paris editorial. Capture Crew brought styling, direction, and post-production under one roof. Truly effortless.',
    image: 'https://ui-avatars.com/api/?name=Priya+Nair&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Vikram Anand',
    designation: 'Director, Anand Realty Group — Mohali',
    message: 'We needed content that could sell luxury flats before the towers were even complete. The drone aerials and walkthrough films did exactly that — our pre-launch sold out in 3 weeks.',
    image: 'https://ui-avatars.com/api/?name=Vikram+Anand&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Deepika Rajan',
    designation: 'Co-Founder, Maison DR Jewels — Surat',
    message: 'We had tried three studios before Capture Crew. None of them made our jewellery look the way it deserved. The product stills they delivered are now our website hero, our campaign, and our packaging — all from a single session.',
    image: 'https://ui-avatars.com/api/?name=Deepika+Rajan&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Arjun Bhardwaj',
    designation: 'Principal, Studio Bhardwaj Architects — Chandigarh',
    message: 'Working with Capture Crew felt like a true creative collaboration. They read the project brief, visited the site at dusk, and came back with a shot list we would never have thought of ourselves. The final images won us a national architecture award.',
    image: 'https://ui-avatars.com/api/?name=Arjun+Bhardwaj&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Meera Iyer',
    designation: 'Director of Marketing, Kalpa Hotels — Pune',
    message: 'Our property needed a complete visual overhaul for the relaunch. Capture Crew handled everything — interiors, food, rooftop aerials, and a 4-minute brand film. The booking rate from our new website is up 60% compared to the same period last year.',
    image: 'https://ui-avatars.com/api/?name=Meera+Iyer&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: true,
  },
  {
    name: 'Sahil Chadha',
    designation: 'Founder, Chadha Menswear — Ludhiana',
    message: 'I was sceptical about investing this much in a shoot. After seeing the reels go live, our DMs did not stop for three days. Capture Crew does not just take pictures — they build hype.',
    image: 'https://ui-avatars.com/api/?name=Sahil+Chadha&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: false,
  },
  {
    name: 'Nisha Tomar',
    designation: 'Creative Director, Bloom Weddings — Delhi NCR',
    message: 'Every wedding planner needs a visual partner they can trust. Capture Crew is ours. The films they produce make every couple feel like they are in a feature film. Our inquiry rate from Instagram has tripled since we started sharing their work.',
    image: 'https://ui-avatars.com/api/?name=Nisha+Tomar&size=200&background=2C2C2C&color=C8A96B&bold=true&font-size=0.45',
    featured: false,
  },
];

const SITE_CONTENT = {
  heroHeadline: 'Where Craft\nMeets Legacy',
  heroSubheadline: 'Architecture. Luxury. Visual Storytelling.',
  heroCta1: 'View Portfolio',
  heroCta2: 'Book a Shoot',
  stats: {
    shoots:     { value: 500, suffix: '+',     label: 'Shoots Delivered' },
    architects: { value: 160, suffix: '+',     label: 'Architects Trusted' },
    brands:     { value: 68,  suffix: '+',     label: 'Premium Brands' },
    years:      { value: 8,   suffix: '+ yrs', label: 'Studio Heritage' },
  },
  partners: [
    'Raymond', 'Mini So', 'Prada', 'Bluestone', 'ORRA',
    'Malabar Gold and Diamonds', 'National Geographic', 'Zara', 'Gillette', 'Nike',
  ],
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
  packages: [
    {
      title: 'Instagram Package',
      price: '₹30,000',
      priceNote: 'per shoot',
      tag: '',
      summary: 'Built for brands that want to own their feed — product shoots, drone aerials, and styled reels in one session.',
      features: [
        '20 × 4K high-resolution edited product images',
        '4 Instagram Reels (30–60 sec) — showcase + BTS',
        'Aerial drone shots of exterior',
        'Styled setup with props and backgrounds',
        'Advanced editing — logo animation, music, text overlays',
        'Video/photo formats for Instagram, YouTube & website',
        'On-location or studio shoot (within city limits)',
      ],
      cta: 'Book Instagram Package',
      highlight: false,
    },
    {
      title: 'Premium Package',
      price: '₹45,000',
      priceNote: 'per shoot',
      tag: 'Most Popular',
      summary: 'Our most complete content system — hero shots, brand film, and a strategy guide that makes every asset work harder.',
      features: [
        '35 × 4K high-resolution product images (hero shots)',
        '3 Instagram Reels — promo, process & testimonial/BTS',
        '1 YouTube Video (up to 5 mins) — cinematic storytelling',
        'Styled setups, creative direction, and concept planning',
        'Professional editing — thumbnails, captions, logo animations',
        'Content strategy guide (post-shoot usage calendar)',
        'Shoot at multiple locations (if needed, within city)',
      ],
      cta: 'Book Premium Package',
      highlight: true,
    },
    {
      title: 'Social Media Management',
      price: '₹25,000',
      priceNote: 'per month',
      tag: 'Retainer',
      summary: "We run your Instagram so you don't have to — content, strategy, posting, and growth tracking every month.",
      features: [
        '15–18 Feed Posts (photos, carousels, and graphics)',
        '12+ Instagram Stories — promos, polls, engagement tools',
        '2 Edited Reels (content creation + editing)',
        'Custom highlight covers and branded templates',
        'Full content calendar planning',
        'Strategy sessions and audience growth tracking',
        'Posting, engagement management, and monthly analytics',
      ],
      cta: 'Start Management',
      highlight: false,
    },
  ],
  footerTagline: 'Visual storytelling for architecture, luxury, fashion, and the brands that refuse to be ordinary.',
  footerPhone: '+91 8898400022',
  footerEmail: 'capcrewst@gmail.com',
  footerCities: 'Chandigarh · Delhi · Surat · Bengaluru · London',
  contactHeadline: "Let's make something worth keeping.",
  contactSubheadline: "Tell us about your project and we'll get back to you within 24 hours.",
  socialDock: {
    whatsapp:  'https://wa.me/918898400022',
    phone:     'tel:+918898400022',
    instagram: 'https://www.instagram.com/capcrewst',
    youtube:   'https://www.youtube.com/@officialcapturecrew',
    linkedin:  'https://www.flickr.com/photos/203143028@N07',
    threads:   'https://www.threads.com/@capcrewst',
    email:     'mailto:capcrewst@gmail.com',
  },
};

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding');
  }

  // ── Admin user ──────────────────────────────────────────────────────────────
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { email, passwordHash, role: 'ADMIN' } });
    console.log(`✓ Admin user created: ${email}`);
  } else {
    console.log(`· Admin user already exists: ${email}`);
  }

  // ── Categories ──────────────────────────────────────────────────────────────
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
  }
  console.log(`✓ ${CATEGORIES.length} categories seeded`);

  // ── Portfolio projects ───────────────────────────────────────────────────────
  const existingProjects = await prisma.project.count();
  if (existingProjects === 0) {
    for (const p of PORTFOLIO_PROJECTS) {
      const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
      if (!category) { console.warn(`  ⚠ Category not found: ${p.categorySlug}`); continue; }

      const project = await prisma.project.create({
        data: {
          title: p.title,
          slug: p.slug,
          categoryId: category.id,
          coverImage: p.coverImage,
          summary: p.summary,
          narrative: p.narrative,
          location: p.location,
          year: p.year,
          client: p.client,
          services: p.services,
          featured: p.featured,
        },
      });

      for (let i = 0; i < p.gallery.length; i++) {
        await prisma.projectImage.create({
          data: {
            projectId: project.id,
            imageUrl: p.gallery[i],
            sortOrder: i,
          },
        });
      }
      console.log(`  ✓ Project seeded: ${p.title}`);
    }
    console.log(`✓ ${PORTFOLIO_PROJECTS.length} projects seeded`);
  } else {
    console.log(`· Projects already exist (${existingProjects}), skipping`);
  }

  // ── Capabilities ────────────────────────────────────────────────────────────
  for (const cap of CAPABILITIES) {
    await prisma.capability.upsert({
      where: { title: cap.title } as never,
      update: { subtitle: cap.subtitle, description: cap.description, image: cap.image, tags: cap.tags, sortOrder: cap.sortOrder },
      create: { title: cap.title, subtitle: cap.subtitle, description: cap.description, image: cap.image, tags: cap.tags, sortOrder: cap.sortOrder },
    });
  }
  console.log(`✓ ${CAPABILITIES.length} capabilities seeded`);

  // ── Testimonials ────────────────────────────────────────────────────────────
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({ data: TESTIMONIALS });
    console.log(`✓ ${TESTIMONIALS.length} testimonials seeded`);
  } else {
    console.log(`· Testimonials already exist (${existingTestimonials}), skipping`);
  }

  // ── Site content ────────────────────────────────────────────────────────────
  const existingContent = await prisma.siteContent.count();
  if (existingContent === 0) {
    await prisma.siteContent.create({
      data: {
        heroHeadline:        SITE_CONTENT.heroHeadline,
        heroSubheadline:     SITE_CONTENT.heroSubheadline,
        heroCta1:            SITE_CONTENT.heroCta1,
        heroCta2:            SITE_CONTENT.heroCta2,
        stats:               SITE_CONTENT.stats,
        partners:            SITE_CONTENT.partners,
        socialProofEyebrow:  SITE_CONTENT.socialProofEyebrow,
        socialProofHeadline: SITE_CONTENT.socialProofHeadline,
        faq:                 SITE_CONTENT.faq,
        packages:            SITE_CONTENT.packages,
        footerTagline:       SITE_CONTENT.footerTagline,
        footerPhone:         SITE_CONTENT.footerPhone,
        footerEmail:         SITE_CONTENT.footerEmail,
        footerCities:        SITE_CONTENT.footerCities,
        contactHeadline:     SITE_CONTENT.contactHeadline,
        contactSubheadline:  SITE_CONTENT.contactSubheadline,
        socialDock:          SITE_CONTENT.socialDock,
      },
    });
    console.log('✓ Site content seeded');
  } else {
    console.log('· Site content already exists, skipping');
  }

  console.log('\n✅ Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
