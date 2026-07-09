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

## [2026-07-09] ESLint Configuration
- **What changed:** Added `.eslintrc.cjs` because the project had `eslint` plugins in `package.json` but no config file, causing `npm run lint` to fail.
- **Why:** The lint script is part of the pre-commit quality gate, so a working ESLint config is required for CI and local verification.
- **Impact:** `.eslintrc.cjs`.
