# Dark Cinematic Luxury Restyle — Design Spec

## Decision Summary

| Decision | Choice |
|----------|--------|
| Theme direction | Dark Cinematic Luxury |
| Heading font | Cormorant Garant (Light 300 + Light Italic) |
| Body font | DM Sans (Light 300, Regular 400, Medium 500) |
| Label / mono font | DM Mono (Light 300, Regular 400) |
| Accent colour | Warm Gold `#C8A96B` |
| Background | `#0A0A0A` |
| Surface | `#141414` |
| Surface 2 | `#1C1C1C` |
| Primary text | `#F5F1E8` ivory |
| Muted text | `#7A7468` stone |
| Hairline / border | `rgba(245,241,232,0.07)` |

---

## Typography System

### Fonts (Google Fonts — free, no install)

```
Cormorant Garant: 300, 300i, 400, 400i, 500, 500i
DM Sans: 200, 300, 400, 500
DM Mono: 300, 400
```

### Usage Rules

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|---------|
| Hero H1 | Cormorant Garant | 300 | clamp(3.8rem, 9vw, 8.5rem) | -0.01em |
| Section H2 | Cormorant Garant | 300 | clamp(2.4rem, 5vw, 5rem) | 0 |
| Card H3 | Cormorant Garant | 400 | clamp(1.6rem, 2.5vw, 2.2rem) | 0 |
| Italic accent | Cormorant Garant | 300i | inherit | — |
| Eyebrow / label | DM Mono | 300 | 0.65–0.7rem | 0.24–0.28em |
| Nav links | DM Sans | 300 | 0.68rem | 0.14em |
| Body copy | DM Sans | 300 | 0.88–1rem | 0.01em |
| CTA button | DM Sans | 500 | 0.72rem | 0.14em |
| Ghost button | DM Mono | 300 | 0.65rem | 0.16em |
| Metrics value | Cormorant Garant | 300 | 1.6rem | — |
| Metrics label | DM Mono | 300 | 0.6rem | 0.2em |

### Italic Gold Rule
Key emotional words in headings use `<em>` styled as Cormorant italic in `#C8A96B`. Examples:
- "Where Light *Meets* Legacy."
- "We *elevate* your vision."
- "Let's *Capture* Your Vision."

---

## Colour Tokens (CSS Variables)

Replace existing `:root` variables in `global.css`:

```css
:root {
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
}
```

---

## Component-by-Component Changes

### 1. Global CSS (`client/src/styles/global.css`)

- Replace all font-family declarations: `Playfair Display` → `Cormorant Garant`, `Satoshi` → `DM Sans`
- Add Google Fonts `@import` for Cormorant Garant, DM Sans, DM Mono
- Update all `:root` colour tokens as above
- Update `h1, h2, h3` rule: `font-family: 'Cormorant Garant', Georgia, serif; font-weight: 300;`
- Remove `--brand-gradient` gradient references from heading styles (no more blue/purple gradients on public-facing pages)
- Update `.eyebrow` rule: `font-family: 'DM Mono', monospace; font-weight: 300;`
- Update `.primary-button`: remove rounded pill shape → square/minimal: `border-radius: 0; background: var(--gold); color: var(--ink); font-family: 'DM Sans'; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;`
- Update `.ghost-button`: `border-radius: 0; border: 1px solid var(--line-mid); font-family: 'DM Mono'; font-weight: 300;`
- Update `.nav-link`: `font-family: 'DM Sans'; font-weight: 300;`
- Update `.brand`: `font-family: 'Cormorant Garant'; font-weight: 400; letter-spacing: 0.22em;`
- Update `.bg` on `html` and `:root` to `#0A0A0A`

### 2. SiteHeader (`client/src/components/SiteHeader.tsx`)

- Brand wordmark: switch to Cormorant Garant via inline style or Tailwind `font-[Cormorant_Garant]`
- Nav links: DM Sans light, stone colour, uppercase spaced
- Mobile nav CTA: gold outlined, DM Mono label
- Header border: `border-bottom: 1px solid var(--line)`

### 3. HomePage (`client/src/pages/HomePage.tsx`)

**Hero section:**
- Remove emoji from heading and badge
- H1: Cormorant Garant, `font-weight: 300`, `line-height: 0.94`. Italic gold word via `<em className="italic text-[#C8A96B] not-italic font-[Cormorant_Garant]">`
- Eyebrow pill badge: replace with a plain `DM Mono` eyebrow line with a leading gold rule (`::before` or `<span>`)
- Remove `font-extrabold uppercase tracking-tight` — replace with `font-light tracking-[-0.01em]`
- Remove blue gradient on hero headline; italic gold accent only
- CTA primary button: gold filled, no rounded pill → sharp corners or very slight `rounded-sm`
- CTA ghost button: DM Mono, animated underline/line extension on hover, no border pill
- Metrics bar: Cormorant value + DM Mono label

**All section headings (`h2`):**
- Remove `font-extrabold`, `font-bold`, `gradient-text-anim` class
- Apply Cormorant Garant 300, with `<em>` for one italic gold word per heading
- Eyebrow spans: switch from `text-[#58A4FF]` blue to `text-[#C8A96B]` gold, DM Mono font

**CTA banners:**
- Replace purple/blue gradient backgrounds with `background: var(--gold-dim)` + gold border
- Heading: Cormorant Garant

**Cards (brand strategy section):**
- Replace blue/purple icon colours with gold `#C8A96B`
- Remove `font-bold uppercase tracking-wider` titles → Cormorant Garant regular

### 4. GradientButton (`client/src/components/GradientButton.tsx`)

- Replace blue/purple gradient with solid gold fill: `background: #C8A96B; color: #0A0A0A`
- Font: DM Sans 500, uppercase, `letter-spacing: 0.14em`
- Shape: `border-radius: 0` (or `2px` max)
- Hover: lighten gold slightly `#D4B87A`

### 5. SectionHeading (`client/src/components/SectionHeading.tsx`)

- Eyebrow: DM Mono, gold colour, spaced caps
- H2: Cormorant Garant 300
- Body: DM Sans 300, stone colour

### 6. SiteFooter (`client/src/components/SiteFooter.tsx`)

- Footer H2: Cormorant Garant 300
- Links: DM Sans 300 stone
- Border: `var(--line)`

### 7. LeadForm (`client/src/components/LeadForm.tsx`)

- Input borders: `var(--line-mid)`
- Submit button: gold filled, DM Sans 500
- Input background: `var(--surface)`

### 8. TestimonialCarousel, FaqAccordion, ComparisonTable, ProcessTimeline

- All headings: Cormorant Garant 300
- All eyebrows: DM Mono gold
- All body: DM Sans 300
- Remove any blue gradient text or pill shapes

---

## What Does NOT Change

- Layout structure (grid, spacing, sections) — unchanged
- **All animations — strictly preserved:**
  - `Reveal` scroll-in animations (direction, delay, opacity fade) — untouched
  - `LazySection` intersection observer — untouched
  - `FluidCursor` WebGL fluid effect — untouched
  - `LogoMarquee` scroll animation — untouched
  - `StatsCounter` count-up animation — untouched
  - `gradientShift`, `float`, `shimmer`, `marquee`, `progressFlow` keyframes in `global.css` — untouched
  - `.gradient-text-anim` class — kept in CSS (still used on italic gold em elements if needed)
  - `AutoScanPanels` scan animation — untouched
  - `FeatureTimeline` interactive animation — untouched
  - `TestimonialCarousel` loop — untouched
  - Hover `translateY(-2px)` transitions on cards — untouched
- All component logic and data — unchanged
- Admin panel styles — unchanged (separate concern)
- Mobile breakpoints — unchanged
- R2/backend work — separate from this

---

## Files to Touch

| File | Type |
|------|------|
| `client/src/styles/global.css` | Modify — fonts, tokens, base element styles |
| `client/src/pages/HomePage.tsx` | Modify — hero, headings, eyebrows, CTAs |
| `client/src/components/GradientButton.tsx` | Modify — gold fill, no gradient |
| `client/src/components/SiteHeader.tsx` | Modify — brand font, nav styles |
| `client/src/components/SiteFooter.tsx` | Modify — heading font |
| `client/src/components/SectionHeading.tsx` | Modify — eyebrow + heading font |
| `client/src/components/LeadForm.tsx` | Modify — submit button |
| `client/src/components/TestimonialCarousel.tsx` | Modify — headings, eyebrows |
| `client/src/components/FaqAccordion.tsx` | Modify — headings |
| `client/src/components/ProcessTimeline.tsx` | Modify — headings, eyebrows |
| `client/src/components/ComparisonTable.tsx` | Modify — headings |
| `client/src/components/FeatureGrid.tsx` | Modify — headings, eyebrows |
| `client/src/components/FeatureTimeline.tsx` | Modify — headings |
| `client/src/components/AutoScanPanels.tsx` | Modify — headings |
| `client/src/components/GalleryTeaser.tsx` | Modify — headings |
| `client/src/components/StatsCounter.tsx` | Modify — headings, values |
| `client/src/pages/PortfolioPage.tsx` | Modify — headings, filter buttons |
| `client/src/pages/ProjectPage.tsx` | Modify — headings |
