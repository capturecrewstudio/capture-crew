
import { ArrowRight, Award, Users, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { getSiteContent, subscribeAdminStore } from '../lib/adminStore';
import type { RouteName } from '../App';
import { LeadForm } from '../components/LeadForm';
import { GradientButton } from '../components/GradientButton';
import { SocialProof } from '../components/SocialProof';
import { AutoScanPanels } from '../components/AutoScanPanels';
import { FeatureTimeline } from '../components/FeatureTimeline';
import { FeatureGrid } from '../components/FeatureGrid';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { FaqAccordion } from '../components/FaqAccordion';
import { ComparisonTable } from '../components/ComparisonTable';
import { LazySection } from '../components/LazySection';
import { Reveal } from '../components/Reveal';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { GalleryTeaser } from '../components/GalleryTeaser';
import { scrollToSection } from '../App';
import { BlurImage } from '../components/BlurImage';

const REEL_SLIDES = [
  '/assets/media/commercial-hero.jpeg',
  '/assets/media/fashion-hero.jpeg',
  '/assets/media/architecture-hero.jpeg',
  '/assets/media/interiors-hero.jpeg',
  '/assets/media/food-hero.jpeg',
];

function IPhoneMockup() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % REEL_SLIDES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative w-[280px] h-[560px] rounded-[45px] border-[10px] border-surface-2 bg-surface shadow-[0_12px_36px_-14px_rgba(0,0,0,0.7)] overflow-hidden shrink-0">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-bg z-30" />

        {/* Crossfading slide images */}
        {REEL_SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ backgroundImage: `url('${src}')`, opacity: i === slide ? 1 : 0, zIndex: 1 }}
          />
        ))}

        {/* Overlay UI layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Profile row */}
          <div className="relative z-20 mt-6 flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full border border-linemid bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/media/fashion-detail-1.jpeg')` }}
              />
              <div>
                <h4 className="text-[10px] font-medium text-ivory leading-none">@capturecrew</h4>
                <span className="text-[8px] text-stone">Cinematic Stories</span>
              </div>
            </div>
            <button
              type="button"
              className="text-[9px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'var(--accent)', color: 'var(--ink)' }}
            >
              Follow
            </button>
          </div>

          {/* Slide dots */}
          <div className="relative z-20 flex justify-center gap-1.5 mb-2">
            {REEL_SLIDES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slide ? 16 : 5,
                  height: 5,
                  background: i === slide ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>

          {/* Analytics card */}
          <div className="relative z-20 bg-bg/60 border border-line rounded-xl p-3 backdrop-blur-md shadow-lg mb-6 w-full flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-wider font-mono text-stone">Reels Performance</span>
              <span className="text-[9px] font-bold text-green-400 font-mono">+308%</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-12 pt-2">
              {[15, 30, 20, 45, 60, 85, 100, 75].map((val, i) => (
                <div
                  key={i}
                  className="w-full rounded-t-sm"
                  style={{ height: `${val}%`, background: 'var(--brand-gradient)' }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] text-stone/70 font-mono mt-1">
              <span>Week 1</span>
              <span>Week 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onSelectCategory: (slug: string) => void;
  onSelectProject: (slug: string) => void;
};

export function HomePage({ onNavigate, onSelectCategory }: Props) {
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();
  const content = useSyncExternalStore(subscribeAdminStore, getSiteContent);

  return (
    <main
      id="main-parent"
      className="relative overflow-x-hidden scroll-smooth bg-bg"
    >
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden"
      >
        {/* Background Image with blur-up */}
        <div className="absolute inset-0 z-0">
          <BlurImage
            src="/assets/media/architecture-hero.jpeg"
            alt="Capture Crew luxury architecture shoot"
            fetchPriority="high"
            wrapperClassName="absolute inset-0"
            className="opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-bg/80 to-bg" />
        </div>

        {/* Blue Radial Glow behind heading (floats) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] aspect-square rounded-full pointer-events-none -z-10 opacity-30 blur-[80px]"
          style={{ background: 'var(--accent-glow)', animation: 'float 8s ease-in-out infinite' }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-24 md:pt-32">
          {/* Brand name badge */}
          <Reveal direction="up">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="block w-10 h-px opacity-60" style={{ background: 'var(--accent)' }} />
              <span
                style={{
                  fontFamily: "'Cormorant Garant', Georgia, serif",
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}
              >
                Capture Crew
              </span>
              <span className="block w-10 h-px opacity-60" style={{ background: 'var(--accent)' }} />
            </div>
          </Reveal>

          {/* 3-line heading */}
          <Reveal direction="up" delay={120}>
            <h1
              className="mb-6 text-ivory"
              style={{
                fontFamily: "'Cormorant Garant', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 6vw, 6rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                whiteSpace: 'pre-line',
              }}
            >
              {content.heroHeadline}
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal direction="up" delay={220}>
            <p
              className="max-w-xl mb-10 text-stone leading-[1.75]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(0.82rem, 1.4vw, 1rem)' }}
            >
              {content.heroSubheadline}
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal direction="up" delay={320}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <GradientButton
                label={content.heroCta1}
                size="md"
                onClick={() => scrollToSection('contact-us')}
              />
              <button
                onClick={() => onNavigate('portfolio')}
                className="h-[40px] md:h-[48px] px-6 border border-linemid bg-transparent text-stone hover:text-ivory hover:border-linemid active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: '6px' }}
              >
                {content.heroCta2}
                <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>

      </section>

      {/* 2+3. Social proof — moving brand strip + animated stat cards */}
      <LazySection height="480px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <SocialProof />
        </div>
      </LazySection>

      {/* 4. Auto-Scan capabilities (Photography, Videography, SMM) */}
      <LazySection height="750px">
        <div id="services-section" className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <AutoScanPanels />
          </Reveal>
        </div>
      </LazySection>

      {/* 5. Brand Strategy / Headline Section */}
      <LazySection height="350px">
        <section className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-5xl mx-auto text-center">
          <Reveal>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
              Strategic Storytelling
            </span>
            <h2
              className="text-ivory mt-4 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
            >
              We don't just shoot.<br />
              We <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>elevate</em> your vision.
            </h2>
            <p className="text-sm sm:text-base text-stone max-w-2xl mx-auto mt-6 leading-relaxed">
              At <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Capture Crew</span>, we combine our distinguished UK National Geographic background with local elegance. Our visual systems are engineered to build immediate trust. We deliver retouched, AVIF/WebP ready libraries and cinematic films optimized for conversions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { Icon: Award, color: 'var(--accent)', title: 'Nat Geo Standard', body: 'Working with elite photographers who bring National Geographic experience from the UK.' },
              { Icon: Users, color: 'var(--accent)', title: 'Massive Network', body: 'Connecting 160+ architects and 68+ premium brands globally, building long-term assets.' },
              { Icon: ShieldCheck, color: 'var(--accent)', title: 'Luxury Heritage', body: 'Partnering with names like Prada, Raymond, Bluestone, Ori, and luxury realty groups.' }
            ].map(({ Icon, color, title, body }, idx) => (
              <Reveal key={title} delay={idx * 120}>
                <div className="p-6 rounded-2xl border border-line bg-surface/50 hover:border-linemid hover:-translate-y-1 transition-all duration-500 h-full">
                  <Icon size={28} className="mx-auto mb-4" style={{ color }} />
                  <h4 className="text-base text-ivory mt-3" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 400, letterSpacing: '0.04em' }}>{title}</h4>
                  <p className="text-xs text-stone mt-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </LazySection>

      {/* 6. Feature Timeline (Centerpiece showcase of 7 domains) */}
      <LazySection height="600px">
        <div id="portfolio-section" className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
                Visual Catalogues
              </span>
              <h2
                className="text-ivory mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
              >
                Explore Our <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Albums</em>
              </h2>
              <p className="text-stone mt-4 leading-relaxed text-sm">
                We shoot and package files across key niches. Click any domain below to preview.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FeatureTimeline />
          </Reveal>
        </div>
      </LazySection>

      {/* 7. Process Timeline (NEW — Brief → Delivery) */}
      <LazySection height="540px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <ProcessTimeline />
          </Reveal>
        </div>
      </LazySection>

      {/* 8. Tracker App / Reels Showcase (iPhone Mockup) */}
      <LazySection height="650px">
        <section className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Left (grid span 7) */}
          <Reveal direction="left" className="lg:col-span-7">
            <div className="flex flex-col items-start gap-4">
              <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
                Social Media Management (SMM)
              </div>
              <h2
                className="text-ivory leading-[1.05] mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
              >
                Social Reels and Shorts That <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Dominate Feeds</em>
              </h2>
              <p className="text-sm sm:text-base text-stone leading-relaxed mt-2">
                We specialize in scroll-stopping, high-retention vertical films. We script, produce, direct, color-grade, and publish reels designed for modern attention spans, driving immediate customer conversions.
              </p>
              <ul className="space-y-3 mt-4 w-full">
                {[
                  ['3x Boost', 'Engagement increase verified across our SMM brand campaigns.'],
                  ['Hook-First', 'We write high-retention hooks that capture users in the first 2 seconds.'],
                  ['End-to-End', 'From conceptual scripts and color grading to publication and paid ad runs.']
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-4 items-start border-l-2 border-accent pl-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-ivory" style={{ fontFamily: "'Cormorant Garant', serif" }}>{title}</h4>
                      <p className="text-xs text-stone mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <GradientButton
                  label="Explore Packages"
                  size="md"
                  onClick={() => scrollToSection('packages-section')}
                />
              </div>
            </div>
          </Reveal>

          {/* iPhone Mockup Right (grid span 5) */}
          <Reveal direction="right" delay={120} className="lg:col-span-5">
            <IPhoneMockup />
          </Reveal>
        </section>
      </LazySection>

      {/* 9. Feature Grid (4-card pricing packages) */}
      <LazySection height="600px">
        <div id="packages-section" className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <FeatureGrid onSelectPackage={(title) => {
              setSelectedPackage(title);
            }} />
          </Reveal>
        </div>
      </LazySection>

      {/* 10. Comparison Table Matrix */}
      <LazySection height="650px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </div>
      </LazySection>

      {/* 11. Gallery Teaser (NEW — masonry preview) */}
      <LazySection height="640px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <GalleryTeaser
              onSeeAll={() => onNavigate('portfolio')}
              onSelectCategory={(slug) => {
                onSelectCategory(slug);
                onNavigate('category');
              }}
            />
          </Reveal>
        </div>
      </LazySection>

      {/* Repeated CTA Banner 2 */}
      <LazySection height="200px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <div
              className="w-full py-12 px-8 sm:px-16 rounded-2xl border border-line flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                background: 'linear-gradient(135deg, var(--accent-dim) 0%, transparent 100%)',
                border: '1px solid color-mix(in srgb, var(--accent) 12%, transparent)'
              }}
            >
              <div>
                <h3 className="text-ivory" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Ready to capture your story?</h3>
                <p className="text-xs sm:text-sm text-stone mt-2">Partner with over 160 architects and 68 brands globally. Book <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Capture Crew</span> today.</p>
              </div>
              <GradientButton
                label="Request Call"
                size="sm"
                onClick={() => scrollToSection('contact-us')}
              />
            </div>
          </Reveal>
        </div>
      </LazySection>

      {/* 12. Testimonial Carousel (Looping reviews) */}
      <LazySection height="480px">
        <div id="testimonials-section" className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <TestimonialCarousel />
          </Reveal>
        </div>
      </LazySection>

      {/* 13. FAQ Accordion (7 items) */}
      <LazySection height="650px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <FaqAccordion />
          </Reveal>
        </div>
      </LazySection>

      {/* 14. About Us + Contact Form + Footer */}
      <LazySection height="750px">
        <section
          id="about-section"
          className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] border-t border-line bg-bg/40 py-16 sm:py-24 px-4 sm:px-6 relative z-10"
        >
          <div id="contact-us" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left side details */}
            <Reveal direction="left">
              <div className="flex flex-col gap-6">
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-accent">
                    Get In Touch
                  </span>
                  <h2
                    className="text-ivory mt-3"
                    style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
                  >
                    {content.contactHeadline}
                  </h2>
                  <p className="text-stone text-sm sm:text-base mt-4 leading-relaxed">
                    {content.contactSubheadline}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-accent">
                      <Phone size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Founder Hotline</h4>
                      <a href={`tel:${content.footerPhone.replace(/\s/g, '')}`} className="text-sm sm:text-base font-bold">{content.footerPhone}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-accent">
                      <Mail size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Email Studio</h4>
                      <a href={`mailto:${content.footerEmail}`} className="text-sm sm:text-base font-bold">{content.footerEmail}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-accent">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Locations</h4>
                      <span className="text-sm sm:text-base font-bold">{content.footerCities}</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Link Icons */}
                <div className="flex gap-4 mt-8 items-center">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone/60">Follow Us:</span>
                  <a
                    href="https://instagram.com/officialcapturecrewstudios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent transition-all duration-300"
                    aria-label="Instagram Profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent transition-all duration-300"
                    aria-label="YouTube Channel"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-accent transition-all duration-300"
                    aria-label="LinkedIn Page"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right side contact form */}
            <Reveal direction="right" delay={120}>
              <div className="bg-surface border border-line p-6 sm:p-10 rounded-3xl shadow-2xl relative">
                <div
                  className="absolute -inset-px rounded-3xl pointer-events-none opacity-20 -z-10"
                  style={{ background: 'var(--accent-glow)' }}
                />
                <h3 className="text-ivory mb-6" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Commission a Visual Campaign</h3>
                <LeadForm selectedPackage={selectedPackage} />
              </div>
            </Reveal>

          </div>
        </section>
      </LazySection>
    </main>
  );
}
