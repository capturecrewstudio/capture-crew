# Dark Cinematic Luxury Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Capture Crew public-facing site to a Dark Cinematic Luxury aesthetic — Cormorant Garant headings, DM Sans body, DM Mono labels, warm gold `#C8A96B` accent on `#0A0A0A` background — while keeping all existing animations and logic 100% intact.

**Architecture:** Pure CSS/JSX style changes only — no logic, routing, data, or animation code is modified. All changes are contained to className strings, inline styles, and the global CSS file. The admin panel is not touched.

**Tech Stack:** React 19, Tailwind CSS v4, plain CSS custom properties in `global.css`, Google Fonts (Cormorant Garant, DM Sans, DM Mono).

---

## File Map

| File | What changes |
|------|-------------|
| `client/src/styles/global.css` | Font imports, CSS tokens, base element rules, button/nav/eyebrow styles |
| `client/src/components/GradientButton.tsx` | Gold fill replaces blue/purple gradient; keep mouse-magnetic animation |
| `client/src/components/SiteHeader.tsx` | Brand font, nav link colours, active state gold instead of blue |
| `client/src/components/SiteFooter.tsx` | H2 font via `.site-footer h2` already in global.css — verify renders |
| `client/src/pages/HomePage.tsx` | Hero h1, eyebrow, CTA styles, section headings, CTA banners, brand cards |
| `client/src/components/ProcessTimeline.tsx` | Eyebrow colour + heading font class |
| `client/src/components/FaqAccordion.tsx` | Eyebrow colour + heading font |
| `client/src/components/FeatureGrid.tsx` | Eyebrow colour + heading font + card accent colours |
| `client/src/components/AutoScanPanels.tsx` | Eyebrow colour + heading font |
| `client/src/components/GalleryTeaser.tsx` | Eyebrow colour + heading font |
| `client/src/components/StatsCounter.tsx` | Icon accent colour → gold |
| `client/src/components/TestimonialCarousel.tsx` | Eyebrow colour + heading font |
| `client/src/components/LeadForm.tsx` | Submit button → gold fill |

---

## Task 1: Global CSS — Fonts, Tokens, Base Elements

**Files:**
- Modify: `client/src/styles/global.css`

- [ ] **Step 1: Add Google Fonts import at the very top of `global.css`** (before `@import "tailwindcss"`)

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap');
@import "tailwindcss";
```

- [ ] **Step 2: Replace all CSS custom property tokens in `:root`**

Find the existing `:root` block and replace it entirely with:

```css
:root {
  --brand-gradient: linear-gradient(92.51deg, #5433FF 17.31%, #20BDFF 103.26%, #CA6672 115.38%);
  --blue-glow: radial-gradient(ellipse at center, rgba(0,64,255,0.45) 0%, transparent 70%);
  --bg:        #0A0A0A;
  --surface:   #141414;
  --surface-2: #1C1C1C;
  --gold:      #C8A96B;
  --gold-dim:  rgba(200, 169, 107, 0.15);
  --ivory:     #F5F1E8;
  --stone:     #7A7468;
  --ink:       #0A0A0A;
  --line:      rgba(245, 241, 232, 0.07);
  --line-mid:  rgba(245, 241, 232, 0.12);
  --shadow:    0 32px 80px rgba(0, 0, 0, 0.5);
  background: var(--bg);
  color: var(--ivory);
  font-family: 'DM Sans', Inter, ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 3: Update `h1, h2, h3` base rule**

Find:
```css
h1,
h2,
h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 500;
  letter-spacing: 0;
  margin: 0;
}
```

Replace with:
```css
h1,
h2,
h3 {
  font-family: 'Cormorant Garant', Georgia, serif;
  font-weight: 300;
  letter-spacing: 0;
  margin: 0;
}
```

- [ ] **Step 4: Update `.eyebrow` rule**

Find:
```css
.eyebrow {
  color: var(--gold);
  font-family: "Space Grotesk", Inter, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  margin: 0 0 18px;
  text-transform: uppercase;
}
```

Replace with:
```css
.eyebrow {
  color: var(--gold);
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.26em;
  margin: 0 0 18px;
  text-transform: uppercase;
}
```

- [ ] **Step 5: Update `.primary-button` rule to gold fill, no pill**

Find:
```css
.primary-button {
  background: var(--gold);
  border: 1px solid var(--gold);
  color: var(--ink);
}
```

Replace with:
```css
.primary-button {
  background: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 2px;
  color: var(--ink);
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

- [ ] **Step 6: Update `.ghost-button` rule**

Find:
```css
.ghost-button {
  background: rgba(245, 241, 232, 0.04);
  border: 1px solid var(--line);
  color: var(--ivory);
}
```

Replace with:
```css
.ghost-button {
  background: rgba(245, 241, 232, 0.04);
  border: 1px solid var(--line-mid);
  border-radius: 2px;
  color: var(--stone);
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

- [ ] **Step 7: Update `.nav-link` rule**

Find:
```css
.nav-link {
  color: var(--stone);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

Replace with:
```css
.nav-link {
  color: var(--stone);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

- [ ] **Step 8: Update `.brand` rule**

Find:
```css
.brand {
  align-items: center;
  display: flex;
  gap: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}
```

Replace with:
```css
.brand {
  align-items: center;
  display: flex;
  font-family: 'Cormorant Garant', Georgia, serif;
  font-weight: 400;
  gap: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  white-space: nowrap;
}
```

- [ ] **Step 9: Verify the dev server compiles without errors**

```bash
cd /Users/truxo/Documents/caputre-crew && npm run dev
```

Open `http://localhost:5173` — background should be `#0A0A0A`, all headings should render in Cormorant Garant (thin serif), nav links in DM Sans.

- [ ] **Step 10: Commit**

```bash
git add client/src/styles/global.css
git commit -m "style: apply dark cinematic luxury tokens and base typography"
```

---

## Task 2: GradientButton — Gold Fill, Keep Animation

**Files:**
- Modify: `client/src/components/GradientButton.tsx`

The mouse-magnetic `onMove`/`onLeave` animation and the `useEffect` that drives it must remain 100% untouched. Only the visual styling of the `<button>` element changes.

- [ ] **Step 1: Replace the `<button>` className and style**

Find:
```tsx
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-between rounded-full font-semibold tracking-wide text-white transition-transform duration-300 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none group overflow-hidden ${heightClass} ${className}`}
      style={{
        background: 'var(--brand-gradient)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease-in-out infinite',
        willChange: 'transform'
      }}
    >
```

Replace with:
```tsx
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-between font-medium tracking-widest uppercase text-[#0A0A0A] transition-transform duration-300 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none group overflow-hidden ${heightClass} ${className}`}
      style={{
        background: '#C8A96B',
        borderRadius: '2px',
        willChange: 'transform'
      }}
    >
```

- [ ] **Step 2: Remove the inner dark overlay div (no longer needed)**

Find and delete:
```tsx
      {/* Inset darker inner-glow container */}
      <div className="absolute inset-[1.5px] rounded-full bg-[#131313]/90 group-hover:bg-[#131313]/70 transition-colors duration-300 -z-10" />
```

- [ ] **Step 3: Update the arrow circle to ink-on-gold**

Find:
```tsx
      <div
        className={`flex items-center justify-center rounded-full bg-[#58A4FF] border border-white/40 shadow-[0_2px_6px_-2px_rgba(88,164,255,0.55)] transition-transform duration-300 group-hover:translate-x-1 ${arrowCircleSize}`}
      >
        <ArrowRight size={arrowSize} className="text-black stroke-[2.5]" />
      </div>
```

Replace with:
```tsx
      <div
        className={`flex items-center justify-center rounded-sm bg-[#0A0A0A]/15 transition-transform duration-300 group-hover:translate-x-1 ${arrowCircleSize}`}
      >
        <ArrowRight size={arrowSize} className="text-[#0A0A0A] stroke-[2.5]" />
      </div>
```

- [ ] **Step 4: Verify button renders gold with black text, arrow still animates on hover**

Open `http://localhost:5173` — hero CTA "Book Consultation" should be a warm gold rectangle. Mouse hover should still produce the magnetic movement effect.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/GradientButton.tsx
git commit -m "style: replace gradient button with gold cinematic style"
```

---

## Task 3: SiteHeader — Brand Font + Nav Active State

**Files:**
- Modify: `client/src/components/SiteHeader.tsx`

- [ ] **Step 1: Update brand wordmark font in header**

Find in the `headerContent` block:
```tsx
        className={`relative h-8 bg-transparent border-0 cursor-pointer focus:outline-none shrink-0 transition-opacity duration-500 ${
          isCompact ? 'opacity-60' : 'opacity-100'
        }`}
```

This is the logo image button — no font change needed here, logo is an `<img>`. But find the desktop nav active state colour and replace blue with gold.

- [ ] **Step 2: Replace nav active colour from blue to gold**

Find (inside the `navItems.map` in `headerContent`):
```tsx
            className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 whitespace-nowrap ${
              activeRoute === item.route ? 'text-[#20BDFF]' : 'text-white/70 hover:text-white'
            }`}
```

Replace with:
```tsx
            className={`text-xs uppercase tracking-widest font-light transition-colors duration-300 whitespace-nowrap font-[DM_Sans] ${
              activeRoute === item.route ? 'text-[#C8A96B]' : 'text-[#7A7468] hover:text-[#F5F1E8]'
            }`}
```

- [ ] **Step 3: Replace mobile drawer active colour from blue to gold**

Find (inside the mobile nav `navItems.map`):
```tsx
                  className={`w-full py-3 text-left px-4 rounded-xl text-sm font-semibold transition-colors ${
                    activeRoute === item.route
                      ? 'bg-white/5 text-[#20BDFF]'
                      : 'text-white/60 hover:bg-white/[0.02] hover:text-white'
                  }`}
```

Replace with:
```tsx
                  className={`w-full py-3 text-left px-4 rounded-xl text-sm font-light transition-colors ${
                    activeRoute === item.route
                      ? 'bg-[#C8A96B]/10 text-[#C8A96B]'
                      : 'text-[#7A7468] hover:bg-white/[0.02] hover:text-[#F5F1E8]'
                  }`}
```

- [ ] **Step 4: Verify header — active page shows gold, non-active shows stone, hover shows ivory**

Navigate between portfolio and home pages on `http://localhost:5173`.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/SiteHeader.tsx
git commit -m "style: update header nav to gold active state and DM Sans"
```

---

## Task 4: HomePage Hero — Heading, Eyebrow, CTAs

**Files:**
- Modify: `client/src/pages/HomePage.tsx`

The hero section has emoji in the heading and badge, a blue pill badge, `font-extrabold uppercase tracking-tight`, and a blue active nav colour. We replace all of these. Animations (`Reveal`, `LazySection`, glow `float` animation) are not touched.

- [ ] **Step 1: Replace the hero pill badge**

Find:
```tsx
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#20BDFF]/30 bg-black/40 text-xs sm:text-sm font-semibold text-white/90 shadow-lg backdrop-blur-md mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#20BDFF] animate-pulse" />
              <span>🏆 Nat Geo Award-Winning Visual Artists</span>
            </div>
```

Replace with:
```tsx
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-[#C8A96B] opacity-70" />
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-[0.65rem] font-light tracking-[0.26em] uppercase text-[#C8A96B]">
                Nat Geo Award · Mumbai · London
              </span>
            </div>
```

- [ ] **Step 2: Replace the hero H1**

Find:
```tsx
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.1] mb-6">
              🎥 Capture Crew Studio
              <br />
              Where Creativity Meets
              <br />
              <span className="gradient-text-anim">Business Conversion.</span>
            </h1>
```

Replace with:
```tsx
            <h1
              className="mb-6 text-white leading-[0.94]"
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
```

- [ ] **Step 3: Replace hero subtitle**

Find:
```tsx
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed mb-10">
              📸 Lights. Lens. Impact. 💡 Premium photography, cinematic videography, and full-suite digital marketing solutions that amplify your brand and accelerate business growth.
            </p>
```

Replace with:
```tsx
            <p
              className="max-w-xl mb-10 text-[#7A7468] leading-[1.75]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(0.82rem, 1.4vw, 1rem)' }}
            >
              Cinematic photography and videography for luxury architecture, hospitality, and premium brands. Engineered for trust. Built for conversion.
            </p>
```

- [ ] **Step 4: Replace the ghost "View Portfolio" button**

Find:
```tsx
              <button
                onClick={() => onNavigate('portfolio')}
                className="w-[200px] h-[40px] md:h-[48px] rounded-full border border-white/20 bg-white/5 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-[#58A4FF] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Portfolio
                <ArrowRight size={16} />
              </button>
```

Replace with:
```tsx
              <button
                onClick={() => onNavigate('portfolio')}
                className="h-[40px] md:h-[48px] px-6 border border-[rgba(245,241,232,0.12)] bg-transparent text-[#7A7468] hover:text-[#F5F1E8] hover:border-[rgba(245,241,232,0.25)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: '2px' }}
              >
                View Portfolio
                <ArrowRight size={14} />
              </button>
```

- [ ] **Step 5: Replace hero metrics bar labels**

Find the three metric `<p>` elements with className `"text-xs uppercase tracking-wider text-white/40 font-mono"` and update:

```tsx
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-sm py-4 grid grid-cols-3 text-center z-10">
            <div className="border-r border-white/10 px-2">
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-[#4a4640]">Experience</p>
              <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-[#F5F1E8] mt-0.5">8+ Years</p>
            </div>
            <div className="border-r border-white/10 px-2">
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-[#4a4640]">Architects</p>
              <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-[#F5F1E8] mt-0.5">160+ Network</p>
            </div>
            <div className="px-2">
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.6rem] uppercase tracking-[0.2em] text-[#4a4640]">Brands Partnered</p>
              <p style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }} className="text-lg sm:text-xl text-[#F5F1E8] mt-0.5">68+ Globally</p>
            </div>
          </div>
```

- [ ] **Step 6: Replace CTA Banner 1 (blue/purple gradient background)**

Find:
```tsx
              background: 'linear-gradient(135deg, rgba(84,51,255,0.1) 0%, rgba(32,189,255,0.05) 100%)'
```

Replace with:
```tsx
              background: 'linear-gradient(135deg, rgba(200,169,107,0.08) 0%, rgba(200,169,107,0.03) 100%)',
              border: '1px solid rgba(200,169,107,0.15)'
```

Also update the H3 inside Banner 1:
```tsx
                <h3 className="text-xl sm:text-2xl text-white" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>Let's shoot something unforgettable.</h3>
```

- [ ] **Step 7: Replace CTA Banner 2 (pink/purple gradient background)**

Find:
```tsx
              background: 'linear-gradient(135deg, rgba(202,102,114,0.1) 0%, rgba(84,51,255,0.05) 100%)'
```

Replace with:
```tsx
              background: 'linear-gradient(135deg, rgba(200,169,107,0.06) 0%, rgba(200,169,107,0.02) 100%)',
              border: '1px solid rgba(200,169,107,0.12)'
```

Also update H3:
```tsx
                <h3 className="text-xl sm:text-2xl text-white" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300 }}>Ready to capture your story?</h3>
```

- [ ] **Step 8: Update brand strategy section — eyebrow + H2 + icon colours**

Find:
```tsx
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
              Strategic Storytelling
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-accent text-white mt-4 leading-tight">
              We don't just shoot. <br />
              We <span className="gradient-text-anim">elevate</span> your vision.
            </h2>
```

Replace with:
```tsx
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
              Strategic Storytelling
            </span>
            <h2
              className="text-white mt-4 leading-[1.05]"
              style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
            >
              We don't just shoot.<br />
              We <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>elevate</em> your vision.
            </h2>
```

- [ ] **Step 9: Update brand strategy card icon colours to gold**

Find the three `{ Icon, color, title, body }` objects:
```tsx
              { Icon: Award, color: '#20BDFF', title: 'Nat Geo Standard', body: '...' },
              { Icon: Users, color: '#5433FF', title: 'Massive Network', body: '...' },
              { Icon: ShieldCheck, color: '#CA6672', title: 'Luxury Heritage', body: '...' }
```

Replace with:
```tsx
              { Icon: Award, color: '#C8A96B', title: 'Nat Geo Standard', body: 'Working with elite photographers who bring National Geographic experience from the UK.' },
              { Icon: Users, color: '#C8A96B', title: 'Massive Network', body: 'Connecting 160+ architects and 68+ premium brands globally, building long-term assets.' },
              { Icon: ShieldCheck, color: '#C8A96B', title: 'Luxury Heritage', body: 'Partnering with names like Prada, Raymond, Bluestone, Ori, and luxury realty groups.' }
```

Also update card title className:
```tsx
                  <h4 className="text-base text-white mt-3" style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 400, letterSpacing: '0.04em' }}>{title}</h4>
```

- [ ] **Step 10: Update "Explore Albums" section heading eyebrow + H2**

Find:
```tsx
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
                Visual Catalogues
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3">
                Explore Our <span className="gradient-text-anim">Albums</span>
              </h2>
```

Replace with:
```tsx
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                Visual Catalogues
              </span>
              <h2
                className="text-white mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
              >
                Explore Our <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Albums</em>
              </h2>
```

- [ ] **Step 11: Update SMM section eyebrow + H2**

Find:
```tsx
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#20BDFF]/20 bg-white/5 text-[10px] sm:text-xs font-mono text-[#20BDFF]">
                Social Media Management (SMM)
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white leading-tight mt-2">
                Social Reels and Shorts That <span className="gradient-text-anim">Dominate Feeds</span>
              </h2>
```

Replace with:
```tsx
              <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                Social Media Management (SMM)
              </div>
              <h2
                className="text-white leading-[1.05] mt-3"
                style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)' }}
              >
                Social Reels and Shorts That <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Dominate Feeds</em>
              </h2>
```

Also update the SMM list border colour from purple to gold:
```tsx
                  <li key={title} className="flex gap-4 items-start border-l-2 border-[#C8A96B] pl-4">
```

- [ ] **Step 12: Update About/Contact section eyebrow + H2**

Find:
```tsx
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
                    Get In Touch
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3 leading-tight">
                    Let's <span className="gradient-text-anim">Capture</span> Your Vision.
                  </h2>
```

Replace with:
```tsx
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
                    Get In Touch
                  </span>
                  <h2
                    className="text-white mt-3"
                    style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
                  >
                    Let's <em style={{ fontStyle: 'italic', color: '#C8A96B' }}>Capture</em> Your Vision.
                  </h2>
```

Also update contact icon circle colours:
- `text-[#58A4FF]` → `text-[#C8A96B]` (phone icon)
- `text-[#20BDFF]` → `text-[#C8A96B]` (mail icon)
- `text-[#CA6672]` → `text-[#C8A96B]` (map icon)

And social icon hover border: `hover:border-[#58A4FF]` → `hover:border-[#C8A96B]` (all three social links)

- [ ] **Step 13: Verify the full homepage in browser**

Open `http://localhost:5173`. Check:
- Hero: thin serif heading, no emoji, italic gold "Meets", gold eyebrow line
- All section headings: Cormorant Garant thin, gold italic accent
- CTA banners: gold-tinted background, no blue/purple
- Reveal animations still fire on scroll
- FluidCursor still active

- [ ] **Step 14: Commit**

```bash
git add client/src/pages/HomePage.tsx
git commit -m "style: dark cinematic restyle of homepage hero and all sections"
```

---

## Task 5: Supporting Components — Eyebrows + Headings

**Files:**
- Modify: `client/src/components/ProcessTimeline.tsx`
- Modify: `client/src/components/FaqAccordion.tsx`
- Modify: `client/src/components/FeatureGrid.tsx`
- Modify: `client/src/components/AutoScanPanels.tsx`
- Modify: `client/src/components/GalleryTeaser.tsx`
- Modify: `client/src/components/StatsCounter.tsx`
- Modify: `client/src/components/TestimonialCarousel.tsx`

In each component, the pattern is identical: find `text-[#58A4FF]` or `text-[#20BDFF]` eyebrow spans and replace with gold + DM Mono; find bold heading h2s and switch to Cormorant Garant light. All animation logic is preserved.

- [ ] **Step 1: ProcessTimeline — eyebrow + heading + step accent colours**

In `client/src/components/ProcessTimeline.tsx`, find:
```tsx
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
          The Workflow
        </span>
```
Replace with:
```tsx
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
          The Workflow
        </span>
```

Then find the h2 heading in ProcessTimeline and add Cormorant styles. Also change `accent` values in the `steps` array from blue/purple/pink to gold:
```tsx
const steps = [
  { icon: ClipboardList, label: 'Brief',    title: 'Discovery call',     desc: '...', accent: '#C8A96B' },
  { icon: Lightbulb,    label: 'Pre-Prod',  title: 'Storyboard & lock',  desc: '...', accent: '#C8A96B' },
  { icon: Clapperboard, label: 'Shoot',     title: 'Set day',            desc: '...', accent: '#C8A96B' },
  { icon: Sparkles,     label: 'Delivery',  title: 'Retouch & ship',     desc: '...', accent: '#C8A96B' }
];
```

- [ ] **Step 2: FaqAccordion — eyebrow + heading**

In `client/src/components/FaqAccordion.tsx`, find any `text-[#58A4FF]` or `text-[#20BDFF]` eyebrow span and replace with:
```tsx
<span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
  Common Questions
</span>
```

Find the h2 heading and apply:
```tsx
style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
```

- [ ] **Step 3: FeatureGrid — eyebrow + heading + package card accent colours**

In `client/src/components/FeatureGrid.tsx`, update the eyebrow span to gold DM Mono (same pattern as above).

Update the `packages` array `color` values — change each card's colour to gold for consistency:
```tsx
  { title: 'Starter Bundle',  ..., color: '#C8A96B' },
  { title: 'Growth Package',  ..., color: '#C8A96B' },
  { title: 'Premium Brand',   ..., color: '#C8A96B' },
  { title: 'Custom Retainer', ..., color: '#C8A96B' }
```

Update heading h2 with Cormorant styles.

- [ ] **Step 4: AutoScanPanels — eyebrow + heading**

In `client/src/components/AutoScanPanels.tsx`, update the eyebrow span colour from `text-[#58A4FF]` to gold DM Mono pattern, and any section h2 to Cormorant Garant 300. The panel auto-scan animation (`setInterval`) is untouched.

- [ ] **Step 5: GalleryTeaser — eyebrow + heading**

In `client/src/components/GalleryTeaser.tsx`, find:
```tsx
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#58A4FF] font-mono">
            Recent Frames
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-accent text-white mt-3 leading-tight">
            A peek inside the archive.
          </h2>
```

Replace with:
```tsx
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }} className="text-[0.65rem] uppercase tracking-[0.26em] text-[#C8A96B]">
            Recent Frames
          </span>
          <h2
            className="text-white mt-3"
            style={{ fontFamily: "'Cormorant Garant', serif", fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 1.05 }}
          >
            A peek inside the archive.
          </h2>
```

Also update the "See full portfolio" button border hover from `hover:border-white/40` to include gold tint:
```tsx
className="... hover:border-[#C8A96B]/40 ..."
```

- [ ] **Step 6: StatsCounter — icon accent colours to gold**

In `client/src/components/StatsCounter.tsx`, find the `stats` array:
```tsx
const stats = [
  { icon: Camera,    value: 500, suffix: '+',      label: 'Shoots Delivered',   color: '#20BDFF' },
  { icon: Building2, value: 160, suffix: '+',      label: 'Architects Trusted', color: '#5433FF' },
  { icon: Award,     value: 68,  suffix: '+',      label: 'Premium Brands',     color: '#CA6672' },
  { icon: Users,     value: 8,   suffix: '+ yrs',  label: 'Studio Heritage',    color: '#58A4FF' }
];
```

Replace with:
```tsx
const stats = [
  { icon: Camera,    value: 500, suffix: '+',      label: 'Shoots Delivered',   color: '#C8A96B' },
  { icon: Building2, value: 160, suffix: '+',      label: 'Architects Trusted', color: '#C8A96B' },
  { icon: Award,     value: 68,  suffix: '+',      label: 'Premium Brands',     color: '#C8A96B' },
  { icon: Users,     value: 8,   suffix: '+ yrs',  label: 'Studio Heritage',    color: '#C8A96B' }
];
```

The `useCountUp` animation hook is untouched.

- [ ] **Step 7: TestimonialCarousel — eyebrow + heading**

In `client/src/components/TestimonialCarousel.tsx`, update any eyebrow span with `text-[#58A4FF]` to gold DM Mono pattern. Update section h2 to Cormorant Garant 300. The carousel loop animation and `handleNext`/`handlePrev` logic are untouched.

- [ ] **Step 8: Verify all components in browser**

Scroll through `http://localhost:5173`. Check:
- All eyebrows are gold DM Mono
- All section headings are thin Cormorant serif
- Stats counter count-up animation still fires
- Testimonial carousel still loops
- AutoScanPanels still rotates

- [ ] **Step 9: Commit**

```bash
git add client/src/components/ProcessTimeline.tsx client/src/components/FaqAccordion.tsx client/src/components/FeatureGrid.tsx client/src/components/AutoScanPanels.tsx client/src/components/GalleryTeaser.tsx client/src/components/StatsCounter.tsx client/src/components/TestimonialCarousel.tsx
git commit -m "style: gold eyebrows and Cormorant headings across all components"
```

---

## Task 6: LeadForm Submit Button

**Files:**
- Modify: `client/src/components/LeadForm.tsx`

- [ ] **Step 1: Update submit button className**

Find:
```tsx
      <button className="primary-button" type="submit" disabled={status === 'sending'}>
```

The `.primary-button` CSS class is already updated in Task 1 to be gold-filled with DM Sans. No className change needed — verify it looks correct in the contact form.

Open `http://localhost:5173`, scroll to contact form, confirm "Send Enquiry" button is gold with black text.

- [ ] **Step 2: If the button doesn't look gold, add explicit inline override**

Only if needed:
```tsx
      <button
        className="primary-button"
        type="submit"
        disabled={status === 'sending'}
        style={{ background: '#C8A96B', color: '#0A0A0A', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' }}
      >
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/LeadForm.tsx
git commit -m "style: verify lead form submit button gold fill"
```

---

## Task 7: Final Visual QA

- [ ] **Step 1: Run the dev server**

```bash
cd /Users/truxo/Documents/caputre-crew && npm run dev
```

- [ ] **Step 2: Check these specific things on `http://localhost:5173`**

| Check | Expected |
|-------|----------|
| Background | Pure `#0A0A0A`, not `#131313` |
| Hero heading | Cormorant Garant Light, thin strokes, italic gold "Meets" |
| Hero eyebrow | DM Mono, gold, leading dash rule |
| Hero CTA primary | Gold rectangle, black text, arrow still magnetic on hover |
| Hero CTA ghost | DM Mono, stone border, no pill shape |
| Scroll Reveal | Still fires on scroll for each section |
| FluidCursor | Blue fluid effect still active on mouse move |
| LogoMarquee | Still scrolls |
| Stats counter | Still counts up when scrolled into view |
| AutoScanPanels | Still auto-rotates every 3.5s |
| TestimonialCarousel | Still loops |
| All eyebrows | Gold `#C8A96B`, DM Mono, spaced caps |
| All section H2s | Cormorant Garant 300, no bold |
| Nav active state | Gold, not blue |
| Contact icons | Gold |
| CTA banners | Gold-tinted bg, not blue/purple |
| LeadForm submit | Gold fill |

- [ ] **Step 3: Check TypeScript compiles without errors**

```bash
cd /Users/truxo/Documents/caputre-crew && npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "style: complete dark cinematic luxury restyle — Cormorant Garant + DM Sans + gold"
```
