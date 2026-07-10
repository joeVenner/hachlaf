# Hachlaf Website — Technical Discoveries

## [2026-07-09] Design System Migration to Skanska-Inspired Spec
- **What changed:** Rebuilt the single-page Vite + React + Tailwind v4 site around the Skanska design system spec. Replaced the floating pill nav with a full-width glassmorphism header, added a sticky text-on-image services reveal, Swiper.js project carousel with progress bar, animated stats counters, and sharp-corner cards.
- **Why:** The previous site used placeholder image paths and a custom carousel that did not match the requested behavior. The new components map directly to the downloaded assets and the Skanska interaction patterns requested by stakeholders.
- **Impact:** `src/App.jsx`, all components in `src/components/`, `src/data/content.js`, `src/index.css`, `index.html`.
- **Reference:** Branch `feature/skanska-design-system-rebuild`.

## [2026-07-09] Image Asset Mapping
- **What changed:** Mapped all 10 projects, 5 services, 12 partner logos, the company logo, and the hero image to the real downloaded filenames in `public/images/` (full-size versions, no WordPress thumbnail suffixes).
- **Why:** The previous `App.jsx` referenced placeholder filenames such as `/images/hero_new.jpg` that did not exist in `public/images/`, causing broken images in development.
- **Impact:** `src/data/content.js` is now the single source of truth for all text and image paths; both French and English locales use the same asset filenames.
- **Reference:** `stehachlaf_extracted_content.md` and `public/images/download_report.csv`.

## [2026-07-09] Swiper.js Autoplay Progress Bar
- **What changed:** Implemented the project carousel with `swiper` using `Autoplay`, `Navigation`, and `FreeMode` modules. A custom progress bar tracks the `onAutoplayTimeLeft` event and fills from 0% to 100% over each 5-second interval.
- **Why:** Skanska uses a progress bar as the auto-play indicator rather than dot pagination. Resetting the bar on `onSlideChange` keeps the visual timer in sync with manual navigation.
- **Impact:** `src/components/SwiperProjectCarousel.jsx`.
- **Edge case:** `onAutoplayTimeLeft` fires with `progressValue` counting down from 1 to 0, so the bar width is `1 - progressValue`.

## [2026-07-09] Sticky Text-on-Image Reveal
- **What changed:** Built a tall scroll container (`height = items * 110vh`) with a sticky inner panel. As the user scrolls, a `position` motion value moves from `0` to `items.length - 1`; each service image and text block fades in/out based on distance from the current position.
- **Why:** This reproduces the Skanska "Expertise / Sustainability / USA Projects" sticky-reveal pattern for Hachlaf's 5 service domains.
- **Impact:** `src/components/StickyServices.jsx`.
- **Edge case:** The text container is `position: relative` with a fixed `min-height` so that the absolute crossfading text blocks do not collapse the CTA button below them.

## [2026-07-09] Tailwind v4 Configuration
- **What changed:** Fixed the pre-existing `tailwind.config.js` which contained an escaped `\n` string in the JSDoc header and was unreadable by ESLint. Added brand colors and fonts inside `src/index.css` using the `@theme` block, which is the Tailwind v4 CSS-first configuration style.
- **Why:** Tailwind v4 prefers theme tokens in CSS rather than the v3 JavaScript config. Keeping the config file with a valid `content` array preserves compatibility with the Vite setup.
- **Impact:** `tailwind.config.js`, `src/index.css`.

## [2026-07-09] Subcontractor Application Page
- **What changed:** Added a new `/sous-traitant` route with an embedded Typeform application form (`https://xmwrsj3pauh.typeform.com/to/ZmdBeKUQ`). Installed `react-router-dom` and refactored the single-page app into a router with `HomePage` and `SubcontractorPage`. Added a "Devenir sous-traitant" nav link, footer link, and a secondary CTA in the bottom call-to-action section.
- **Why:** The company wants subcontractors to apply directly through the site. Embedding the form keeps users on the Hachlaf domain while Typeform handles the form logic.
- **Impact:** `src/App.jsx`, `src/pages/*`, `src/components/GlassmorphismNav.jsx`, `src/components/Footer.jsx`, `src/components/CTASection.jsx`, `src/data/content.js`, `package.json`.
- **Reference:** `feature/skanska-design-system-rebuild`.

## [2026-07-09] ESLint Configuration
- **What changed:** Added `.eslintrc.cjs` because the project had `eslint` plugins in `package.json` but no config file, causing `npm run lint` to fail.
- **Why:** The lint script is part of the pre-commit quality gate, so a working ESLint config is required for CI and local verification.
- **Impact:** `.eslintrc.cjs`.

## [2026-07-10] Fixed Hero Background with Crossfade Slideshow
- **What changed:** Converted the hero from a scrolling parallax image to a fixed-position full-viewport background layer. It now crossfades between 3 high-quality generated images on a 6-second timer. The page content sits in a `relative z-10 bg-white` container that slides up over the hero, and a `h-screen` spacer reserves the initial viewport.
- **Why:** The requested behavior was "the section below goes up, not the image goes up." A fixed background with content scrolling over it gives that cinematic reveal effect while keeping the images fully visible.
- **Impact:** `src/components/Hero.jsx`, `src/pages/HomePage.jsx`, `src/components/SuffolkNav.jsx` (wordmark-only logo), `src/data/content.js`.
- **Edge case:** The hero text and CTAs still use Framer Motion entrance animations, so the fixed layer must not clip or intercept pointer events.

## [2026-07-10] Global 90/5/5 Content Width
- **What changed:** Standardized every section's inner container to `max-w-[90rem] mx-auto px-[5%]` (wrapped in the `.site-container` utility). Full-bleed backgrounds are still allowed, but text and grids align to the 90% column. Applied to CTA, Footer, ParallaxBanners, SubcontractorPage, and all existing sections.
- **Why:** The design brief asked for consistent side margins across the whole project. A single utility class prevents drift and makes future sections consistent by default.
- **Impact:** `src/index.css`, `src/components/CTASection.jsx`, `src/components/Footer.jsx`, `src/components/ParallaxBanners.jsx`, `src/pages/SubcontractorPage.jsx`, plus pre-existing sections already using the same pattern.

## [2026-07-10] Client Showcase with Correct Partner Assets
- **What changed:** Replaced the mismatched partner logo files in `content.js` with the correct downloaded assets (ONEE, MASEN, OCP, Abdelmoumen, NOOR, Safi, Jorf, Hachlaf). Redesigned `PartnersCarousel` from an infinite marquee into a clean 4-column grid of white `card-sharp` cards with `object-contain` images and centered partner labels.
- **Why:** The old section used unrelated screenshots and thumbnail sizes, which looked unprofessional. Framing them as named client/project cards with consistent padding makes the showcase readable.
- **Impact:** `src/data/content.js`, `src/components/PartnersCarousel.jsx`.

## [2026-07-10] Premium Stacked Parallax Domaines Section
- **What changed:** Replaced the three-column `DomainesSection` grid and the separate `ParallaxBanners` section with a single premium stacked-parallax experience. Three large cinematic cards (≈90vw, 60–70vh desktop, min 560px) stack via CSS sticky positioning and are enhanced by GSAP ScrollTrigger: image scale 1.08→1 + vertical parallax, staggered content reveals, frosted-glass tags, a subtle 01/02/03 progress indicator, and `prefers-reduced-motion` fallbacks. The `domaines` data model was enriched with `number`, `category`, `description`, `tags`, `detail`, and `cta` fields in both locales.
- **Why:** The brief asked for an Apple/Porsche/architecture-studio level of scroll-driven storytelling for the sector presentation. GSAP ScrollTrigger gives precise, performant transform-only animations, while sticky positioning keeps the interaction feeling native and avoids excessive scroll-jacking.
- **Impact:** `src/components/DomainesSection.jsx`, `src/pages/HomePage.jsx`, `src/data/content.js`, `src/components/ParallaxBanners.jsx` (deleted), `package.json`, `package-lock.json`.
- **Edge case:** `gsap.matchMedia()` is used to separate reduced-motion, mobile, and desktop behaviour so animations degrade gracefully without re-renders. All ScrollTriggers and tweens are cleaned up via `gsap.context()` revert on unmount.

## [2026-07-10] Compact Editorial Projects Section
- **What changed:** Redesigned `SkanskaProjects` from a tall 2/3+1/3 featured row with auto-rotating carousel into a compact, single-viewport editorial showcase. Added a two-column header (title + description/CTA), a fixed-height featured project row (image + bottom-aligned info), and three static supporting cards underneath. Updated `content.js` with `featured`, `supporting`, `status`, and `expertise` flags; the default featured project is the Casablanca desalination station and the static supporting trio is NOOR solar, Boujdour wind, and Safi thermal.
- **Why:** The previous layout used an oversized featured image that dominated the page and pushed supporting content below the fold. The new layout communicates project scale while keeping the whole section scannable without scrolling on desktop, matching the requested architectural/editorial premium feel.
- **Impact:** `src/components/SkanskaProjects.jsx`, `src/data/content.js`, `CLAUDE.md`.
- **Edge case:** `AnimatePresence` is used only inside a fixed-height featured container so crossfading featured projects does not cause layout shifts. The three supporting cards remain mounted and do not re-render on carousel changes, preserving lazy-loading benefits and avoiding visual churn.

## [2026-07-10] Premium Cinematic Hero Redesign
- **What changed:** Rebuilt the hero section as a left-aligned, premium cinematic experience inspired by Vinci, Bechtel, Skanska and architecture studios. Moved all content to a 650px max-width left column, added a rotating one-word headline (`We Deliver` + fade/slide/blur rotation every 4s), trust stats with thin separators, a subtle animated scroll indicator, and sequential stagger entrance animations. Replaced the old typing effect and centered layout. Reworked `HeroBackground` with a slow Ken Burns zoom (`scale(1)` → `scale(1.06)` over 22s), layered overlays (dark gradient ~55–65%, subtle blue/gray tint, vignette, very light film-grain noise), and kept the existing 6-second crossfade slideshow. Converted `SuffolkNav` to a floating glassmorphism bar (`rgba(20,20,20,0.35)`, `blur(18px)`, 8% white border). Added new CSS utilities in `src/index.css`: `.hero-headline`, `.btn-gold`, `.btn-glass`, `.animate-kenburns`, `.grain-overlay`, `.vignette-overlay`. Updated `content.js` with new `hero.eyebrow`, `hero.preTitle`, `hero.rotatingWords`, `hero.heroStats`, and revised CTAs/description for both locales.
- **Why:** The original hero felt generic: centered text competed with the full-bleed construction image, the typing effect was busy, and the navbar became a heavy white rectangle on scroll. A left-heavy layout keeps the image visible on the right while the overlays keep text crisp. Framer Motion `AnimatePresence` gives the rotating word a smooth, luxurious transition without the mechanical feel of a typewriter. The glassmorphism navbar floats above the hero instead of dominating it.
- **Impact:** `src/components/Hero.jsx`, `src/components/HeroBackground.jsx`, `src/components/SuffolkNav.jsx`, `src/data/content.js`, `src/index.css`, `CLAUDE.md`.
- **Edge case:** The Ken Burns animation is applied to every slideshow image; because each image is only visible for 6s, the visible zoom is extremely subtle (~1.6% per slide), which matches the requested "barely noticeable" effect. The `filter: blur()` transitions on the rotating word are GPU-friendly on a single text element, but `prefers-reduced-motion` will still collapse them via the existing global media query. The left-aligned content is vertically centered, so on very short viewports it may overlap the navbar; the generous `py-24` and `max-w-[650px]` keep it readable on typical desktop/mobile sizes.

## [2026-07-10] Domaines Parallax Rework — Immediate Content, Sharper Cards, Tighter Spacing
- **What changed:** Reworked `DomainesSection` so the section title and first card content are visible together in the initial desktop viewport. Reduced header padding and card height (64–68vh, min 520px, max 720px), widened cards to a true 90/92/94 vw with a 1800px safety limit, removed rounded corners in favor of sharp architectural corners, replaced the heavy shadow with `0 10px 30px rgba(9,24,50,0.06)` plus a thin `rgba(12,39,82,0.06)` border, and reduced the wrapper scroll distance from `300vh` to `260vh`. The first card renders its content with no `[data-animate]` attributes so it is visible before any JS runs; cards 2 and 3 use a one-time `onEnter` reveal (`start: 'top 82%'`) instead of a scrubbed opacity animation. Image parallax is kept (`scale 1.06→1`, `yPercent -3→3`, scrubbed) but is now isolated from content visibility. Added a focused `.domaines-title` utility in `src/index.css` and updated the overlay to a stronger left-to-right gradient plus a subtle bottom gradient for readability.
- **Why:** The previous stacked-parallax design waited too long to show card text, leaving a large empty image when the section first appeared. Separating image parallax from content visibility preserves the cinematic effect while guaranteeing the first card is readable immediately. Sharp corners and a whisper-thin shadow match the premium engineering/architecture aesthetic better than rounded floating panels.
- **Impact:** `src/components/DomainesSection.jsx`, `src/index.css`, `CLAUDE.md`.
- **Edge case:** `prefers-reduced-motion` disables parallax and forces all `[data-animate]` content to `opacity: 1, y: 0` immediately. Because the first card has no `[data-animate]` elements, it remains visible even if GSAP fails to initialise or loads slowly. The sticky offset is set to `top: 96px` to avoid the floating navbar covering the top of the cards.

## [2026-07-10] Domaines Parallax Scroll Choreography — Title Visibility, Sticky Offsets, Wrapper Heights
- **What changed:** Reworked the scroll choreography of `DomainesSection` to keep the title visible briefly at the start of the sticky sequence and eliminate the large blank tail. Replaced the single `md:h-[260vh]` wrapper with per-card wrappers using controlled `min-height` (`118vh` for cards 1 and 2, `82vh` for the last). Cards now stack with CSS `position: sticky` at a generous top offset (`calc(var(--navbar-height, 72px) + 88px)` for card 1, plus a 16px progressive offset per card), so the title remains visible above the first card before scrolling away naturally. Header padding increased to `pt-28 md:pt-36 lg:pt-44` and bottom padding to `pb-8 md:pb-10`. Card height was raised to `68–70vh` desktop with a `780px` max and `600px` min. Removed the full-section progress bar indicator (kept only the numbered 01/02/03 indicators). Added a small clean tail (`h-12 md:h-16 lg:h-20`) before the next section instead of several hundred pixels of whitespace.
- **Why:** The previous sticky offset (`top: 96px`) caused the first card to stick immediately below the navbar and cover the title too early. A single tall wrapper plus full-height sticky cards also left a large blank area after the last card. Giving each card its own controlled wrapper height, a larger sticky top offset, and a progressive stacking offset creates the requested "title visible → card sticks lower → title exits naturally → cards stack smoothly → section ends cleanly" sequence.
- **Impact:** `src/components/DomainesSection.jsx`, `src/index.css`, `CLAUDE.md`.
- **Edge case:** On mobile (`< 768px`) sticky stacking is disabled and cards flow normally, so the offset logic never causes overlap on narrow viewports. `prefers-reduced-motion` continues to disable parallax and reveal all content immediately. The CSS custom property `--navbar-height` is not currently set on `:root`; the fallback `72px` keeps the sticky math working, but a future global nav refactor should set it explicitly.

