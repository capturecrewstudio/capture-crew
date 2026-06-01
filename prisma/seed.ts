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

const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    designation: 'Principal Architect, AM Studio',
    message: 'Capture Crew understood the silence of the building. Every image felt deliberate, premium, and deeply human.',
    image: '',
    featured: true,
  },
  {
    name: 'Ira Kapoor',
    designation: 'Brand Director, Solenne',
    message: 'The team turned our campaign into a visual world. We used the assets across web, print, press, and investor presentations.',
    image: '',
    featured: true,
  },
  {
    name: 'Rohan Sethi',
    designation: 'Founder, Atlas Table',
    message: 'The launch film gave our restaurant an identity before guests had even stepped through the door.',
    image: '',
    featured: true,
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
