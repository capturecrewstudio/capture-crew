import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.siteContent.findFirst();
  if (!existing) { console.log('No content row found'); return; }

  await prisma.siteContent.update({
    where: { id: existing.id },
    data: {
      partners: ['Raymond','Mini So','Prada','Bluestone','ORRA','Malabar Gold and Diamonds','National Geographic','Zara','Gillette','Nike'],
      stats: {
        shoots:     { value: 500, suffix: '+',     label: 'Shoots Delivered' },
        architects: { value: 160, suffix: '+',     label: 'Architects Trusted' },
        brands:     { value: 68,  suffix: '+',     label: 'Premium Brands' },
        years:      { value: 8,   suffix: '+ yrs', label: 'Studio Heritage' },
      },
      faq: [
        { q: 'What types of projects do you shoot?', a: 'We cover architecture, luxury interiors, fashion, commercial, product, food, and weddings — with a cinematic editorial approach across all categories.' },
        { q: 'How far in advance should I book?', a: 'For projects in India, 2–4 weeks is ideal. For international projects or large campaigns, 6–8 weeks gives us time to plan properly.' },
        { q: 'Do you travel for shoots?', a: "We're based across Chandigarh, Mumbai, Pune, and Bengaluru, and we travel internationally for the right projects." },
        { q: 'What is your turnaround time?', a: 'Edited galleries are typically delivered within 7–14 business days. Rush timelines are available on request.' },
        { q: 'Do you offer video alongside photography?', a: 'Yes — most packages include both. We deliver campaign stills, launch films, reels, and multi-format social assets in one shoot.' },
        { q: 'How does the booking process work?', a: "Fill out our enquiry form, we'll schedule a brief call, share a tailored proposal, and confirm with a 40% advance." },
      ],
      socialDock: {
        whatsapp:  'https://wa.me/918898400022',
        phone:     'tel:+918898400022',
        instagram: 'https://www.instagram.com/capcrewst',
        youtube:   'https://www.youtube.com/@officialcapturecrew',
        linkedin:  'https://www.flickr.com/photos/203143028@N07',
        threads:   'https://www.threads.com/@capcrewst',
        email:     'mailto:capcrewst@gmail.com',
      },
    },
  });
  console.log('✓ Content updated');
}

main().catch(console.error).finally(() => prisma.$disconnect());
