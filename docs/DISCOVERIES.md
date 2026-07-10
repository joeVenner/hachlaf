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

