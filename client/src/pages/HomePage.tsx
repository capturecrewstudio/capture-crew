
import { ArrowRight, Award, Users, ShieldCheck, Phone, Mail, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';
import type { RouteName } from '../App';
import { LeadForm } from '../components/LeadForm';
import { GradientButton } from '../components/GradientButton';
import { LogoMarquee } from '../components/LogoMarquee';
import { AutoScanPanels } from '../components/AutoScanPanels';
import { FeatureTimeline } from '../components/FeatureTimeline';
import { FeatureGrid } from '../components/FeatureGrid';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { FaqAccordion } from '../components/FaqAccordion';
import { ComparisonTable } from '../components/ComparisonTable';
import { LazySection } from '../components/LazySection';
import { Reveal } from '../components/Reveal';
import { StatsCounter } from '../components/StatsCounter';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { GalleryTeaser } from '../components/GalleryTeaser';
import { scrollToSection } from '../App';

type Props = {
  activeRoute: RouteName;
  onNavigate: (route: RouteName) => void;
  onSelectCategory: (slug: string) => void;
  onSelectProject: (slug: string) => void;
};

export function HomePage({ onNavigate }: Props) {
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
        {/* Background Image with eager loading & high fetchpriority */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/media/architecture-hero.jpeg"
            alt="Capture Crew luxury architecture shoot"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-bg/80 to-bg" />
        </div>

        {/* Blue Radial Glow behind heading (floats) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] aspect-square rounded-full pointer-events-none -z-10 opacity-30 blur-[80px]"
          style={{ background: 'var(--gold-glow)', animation: 'float 8s ease-in-out infinite' }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-24 md:pt-32">
          {/* Pill Badge */}
          <Reveal direction="up">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-[#C8A96B] opacity-70" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[0.65rem] font-light tracking-[0.26em] uppercase text-[#C8A96B]">
                Nat Geo Award · Mumbai · London
              </span>
            </div>
          </Reveal>

          {/* 3-line heading */}
          <Reveal direction="up" delay={120}>
            <h1
              className="mb-6 text-ivory leading-[0.94]"
              style={{
                fontFamily: "'Cormorant Garant', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(3.8rem, 9vw, 8.5rem)',
                letterSpacing: '-0.01em'
              }}
            >
              Where Light
              <br />
              <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Meets</em> Legacy.
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal direction="up" delay={220}>
            <p
              className="max-w-xl mb-10 text-stone leading-[1.75]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(0.82rem, 1.4vw, 1rem)' }}
            >
              Cinematic photography and videography for luxury architecture, hospitality, and premium brands. Engineered for trust. Built for conversion.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal direction="up" delay={320}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
              <GradientButton
                label="Book Consultation"
                size="md"
                onClick={() => scrollToSection('contact-us')}
              />
              <button
                onClick={() => onNavigate('portfolio')}
                className="h-[40px] md:h-[48px] px-6 border border-linemid bg-transparent text-stone hover:text-ivory hover:border-linemid active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: '6px' }}
              >
                View Portfolio
                <ArrowRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-line bg-bg/60 backdrop-blur-sm py-4 grid grid-cols-3 text-center z-10">
          <div className="border-r border-line px-2">
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-stone">Experience</p>
            <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-ivory mt-0.5">8+ Years</p>
          </div>
          <div className="border-r border-line px-2">
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-stone">Architects</p>
            <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-ivory mt-0.5">160+ Network</p>
          </div>
          <div className="px-2">
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-stone">Brands Partnered</p>
            <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-ivory mt-0.5">68+ Globally</p>
          </div>
        </div>
      </section>

      {/* 2. Logo Marquee (Partner logos) */}
      <LazySection height="120px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <LogoMarquee />
          </Reveal>
        </div>
      </LazySection>

      {/* 3. Stats Counter (NEW — animated count-up) */}
      <LazySection height="320px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px]">
          <Reveal>
            <StatsCounter />
          </Reveal>
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

      {/* Repeated CTA Banner 1 */}
      <LazySection height="200px">
        <div className="mt-[60px] sm:mt-[80px] md:mt-[100px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <div
              className="w-full py-12 px-8 sm:px-16 rounded-2xl border border-line flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                background: 'linear-gradient(135deg, rgba(200,169,107,0.08) 0%, rgba(200,169,107,0.03) 100%)',
                border: '1px solid rgba(200,169,107,0.15)'
              }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl text-ivory" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>Let's shoot something unforgettable.</h3>
                <p className="text-xs sm:text-sm text-stone mt-2">Bring your spaces, products, and brand story to life with world-class production.</p>
              </div>
              <GradientButton
                label="Commission a Shoot"
                size="sm"
                onClick={() => scrollToSection('contact-us')}
              />
            </div>
          </Reveal>
        </div>
      </LazySection>

      {/* 5. Brand Strategy / Headline Section */}
      <LazySection height="350px">
        <section className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-5xl mx-auto text-center">
          <Reveal>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
              Strategic Storytelling
            </span>
            <h2
              className="text-ivory mt-4 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
            >
              We don't just shoot.<br />
              We <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>elevate</em> your vision.
            </h2>
            <p className="text-sm sm:text-base text-stone max-w-2xl mx-auto mt-6 leading-relaxed">
              At Capture Crew, we combine our distinguished UK National Geographic background with local elegance. Our visual systems are engineered to build immediate trust. We deliver retouched, AVIF/WebP ready libraries and cinematic films optimized for conversions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { Icon: Award, color: '#C8A96B', title: 'Nat Geo Standard', body: 'Working with elite photographers who bring National Geographic experience from the UK.' },
              { Icon: Users, color: '#C8A96B', title: 'Massive Network', body: 'Connecting 160+ architects and 68+ premium brands globally, building long-term assets.' },
              { Icon: ShieldCheck, color: '#C8A96B', title: 'Luxury Heritage', body: 'Partnering with names like Prada, Raymond, Bluestone, Ori, and luxury realty groups.' }
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
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                Visual Catalogues
              </span>
              <h2
                className="text-ivory mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
              >
                Explore Our <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Albums</em>
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
              <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                Social Media Management (SMM)
              </div>
              <h2
                className="text-ivory leading-[1.05] mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
              >
                Social Reels and Shorts That <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Dominate Feeds</em>
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
                  <li key={title} className="flex gap-4 items-start border-l-2 border-[#C8A96B] pl-4">
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
            <div className="flex justify-center">
              {/* Phone container */}
              <div className="relative w-[280px] h-[560px] rounded-[45px] border-[10px] border-surface2 bg-surface shadow-[0_12px_36px_-14px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col justify-between shrink-0">

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-bg z-30" />

                {/* Inner screen simulated video */}
                <div className="absolute inset-0 z-10 bg-cover bg-center flex flex-col justify-between p-4" style={{ backgroundImage: `url('/assets/media/commercial-hero.jpeg')` }}>
                  {/* Simulated glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-[11]" />

                  {/* Profile row */}
                  <div className="relative z-20 mt-6 flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-linemid bg-cover bg-center" style={{ backgroundImage: `url('/assets/media/fashion-detail-1.jpeg')` }} />
                      <div>
                        <h4 className="text-[10px] font-medium text-ivory leading-none">@capturecrew</h4>
                        <span className="text-[8px] text-stone">Cinematic Stories</span>
                      </div>
                    </div>
                    <button className="text-[9px] font-bold bg-[#C8A96B] text-black px-2.5 py-1 rounded-full">Follow</button>
                  </div>

                  {/* Simulated Analytics Overlay inside the card */}
                  <div className="relative z-20 bg-bg/60 border border-line rounded-xl p-3 backdrop-blur-md shadow-lg mb-6 w-full flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-stone">Reels Performance</span>
                      <span className="text-[9px] font-bold text-green-400 font-mono">+308%</span>
                    </div>
                    <div className="flex items-end justify-between gap-1.5 h-12 pt-2">
                      {[15, 30, 20, 45, 60, 85, 100, 75].map((val, idx) => (
                        <div
                          key={idx}
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${val}%`,
                            background: 'var(--brand-gradient)'
                          }}
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
          </Reveal>
        </section>
      </LazySection>

      {/* 9. Feature Grid (4-card pricing packages) */}
      <LazySection height="600px">
        <div id="packages-section" className="mt-[60px] sm:mt-[80px] md:mt-[100px] lg:mt-[120px] xl:mt-[150px] px-4 max-w-7xl mx-auto">
          <Reveal>
            <FeatureGrid />
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
            <GalleryTeaser onSeeAll={() => onNavigate('portfolio')} />
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
                background: 'linear-gradient(135deg, rgba(200,169,107,0.06) 0%, rgba(200,169,107,0.02) 100%)',
                border: '1px solid rgba(200,169,107,0.12)'
              }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl text-ivory" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>Ready to capture your story?</h3>
                <p className="text-xs sm:text-sm text-stone mt-2">Partner with over 160 architects and 68 brands globally. Book Kartik Kanda and the crew today.</p>
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
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                    Get In Touch
                  </span>
                  <h2
                    className="text-ivory mt-3"
                    style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
                  >
                    Let's <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Capture</em> Your Vision.
                  </h2>
                  <p className="text-stone text-sm sm:text-base mt-4 leading-relaxed">
                    We bridge the gap between architectural elegance, commercial brilliance, and business growth. Contact founder Kartik Kanda to plan your campaign shoots.
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-[#C8A96B]">
                      <Phone size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Founder Hotline</h4>
                      <a href="tel:+918898400022" className="text-sm sm:text-base font-bold">+91-8898400022</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-[#C8A96B]">
                      <Mail size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Email Studio</h4>
                      <a href="mailto:capturecrewstudio@gmail.com" className="text-sm sm:text-base font-bold">capturecrewstudio@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-ivory/70 hover:text-ivory transition-colors duration-300">
                    <span className="p-3 bg-ivory/5 border border-line rounded-full text-[#C8A96B]">
                      <MapPin size={18} />
                    </span>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-stone/70">Locations</h4>
                      <span className="text-sm sm:text-base font-bold">Chandigarh | Mumbai | Pune | Bengaluru | London</span>
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
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-[#C8A96B] transition-all duration-300"
                    aria-label="Instagram Profile"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-[#C8A96B] transition-all duration-300"
                    aria-label="YouTube Channel"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-line bg-ivory/5 text-stone hover:text-ivory hover:border-[#C8A96B] transition-all duration-300"
                    aria-label="LinkedIn Page"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right side contact form */}
            <Reveal direction="right" delay={120}>
              <div className="bg-surface border border-line p-6 sm:p-10 rounded-3xl shadow-2xl relative">
                <div
                  className="absolute -inset-px rounded-3xl pointer-events-none opacity-20 -z-10"
                  style={{ background: 'var(--gold-glow)' }}
                />
                <h3 className="text-xl sm:text-2xl text-ivory mb-6" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>Commission a Visual Campaign</h3>
                <LeadForm />
              </div>
            </Reveal>

          </div>
        </section>
      </LazySection>
    </main>
  );
}
