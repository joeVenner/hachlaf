# Hachlaf Website — Local Developer Notes

> Project-specific conventions and setup for the Hachlaf Akhawayne marketing site.

## Stack
- **Framework:** Vite 5 + React 18
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config in `src/index.css`)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Carousel:** Swiper.js (legacy component still in tree)
- **Routing:** react-router-dom
- **Linting:** ESLint 8 with React, Hooks, and Refresh plugins

## Getting Started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
npm run lint     # ESLint check
npm run preview  # preview production build locally
```

## Project Structure

```
src/
  App.jsx                  # react-router wiring and language state
  main.jsx                 # React root entry
  index.css                # Tailwind v4 theme, typography, utilities
  data/
    content.js             # bilingual content + image asset mapping
  pages/
    HomePage.jsx           # marketing homepage
    SubcontractorPage.jsx  # embedded Typeform application page
  components/
    SuffolkNav.jsx         # fixed Suffolk-style header (active)
    Hero.jsx               # fixed full-screen background slideshow hero
    DomainesSection.jsx    # 5 domain cards
    ParallaxBanners.jsx    # full-width parallax image banners
    OffresSection.jsx      # 5 service/offering cards
    SkanskaProjects.jsx    # featured + 3 small project cards
    StatsSnapshot.jsx      # animated count-up counters
    AboutSection.jsx       # about + value cards
    PartnersCarousel.jsx   # client logo showcase (grid, not carousel)
    CTASection.jsx         # bottom call-to-action
    Footer.jsx             # 3-column footer
    # Legacy files still present but unused by current homepage:
    # GlassmorphismNav.jsx, StickyServices.jsx, SwiperProjectCarousel.jsx,
    # ServiceCards.jsx, PartnersSection.jsx, ProjectModal.jsx
```

## Design System

### Brand Colors
| Role | Hex |
|------|-----|
| Navy | `#143275` |
| Navy Deep | `#0d244f` |
| Cyan | `#00a3e0` |
| Orange CTA | `#d4a373` |
| Orange Dark | `#b88655` |
| Text | `#1a1a1a` |
| Muted | `#858585` |
| Light BG | `#f5f5f5` |

### Typography
- **Headings:** `Outfit`, weight 800 only (bold-only system).
- **Body:** `Inter`, weights 300–700.
- All heading sizes use `clamp()` for fluid scaling. Use the `.heading-1` … `.heading-5` utility classes in `src/index.css`.

### Cards
- All content cards use sharp corners (`border-radius: 0`) via the `.card-sharp` utility.
- Buttons and icon bubbles remain rounded/pill-shaped as CTAs.

### Layout width
- All page content uses a global 90/5/5 container: `max-w-[90rem] mx-auto px-[5%]`.
- Use the `.site-container` utility in `src/index.css` to enforce the rule.
- Full-width backgrounds are allowed, but inner content must align to the 90% column.

### Images
- All images are served from `/images/` (copied from `public/images/` at build time).
- Use the full-size downloaded filenames from `src/data/content.js`; avoid WordPress thumbnail suffixes (`-300x200`, `-150x150`, etc.).
- AI-generated project/service images live in `public/images/generated/`.

## Content
- The site is bilingual (FR/EN). All copy and asset paths live in `src/data/content.js`.
- Stats are configured as integers with an optional suffix; `StatsSnapshot` animates them on scroll.
- Project data feeds both the carousel and the modal.

## Routing
- The app uses `react-router-dom` with two routes:
  - `/` → marketing homepage
  - `/sous-traitant` → embedded Typeform subcontractor application
- In-page anchors on the homepage still work via `#section-id`.
- `SuffolkNav` and `Footer` handle both anchor links and `Link` routes.

## Hero behavior
- The hero is a fixed-position full-viewport background layer (`z-0`).
- It crossfades between 3 high-quality background images on a timer.
- The rest of the page sits in a `relative z-10 bg-white` container that slides up over the hero.
- `HomePage` adds a `h-screen` spacer so the hero occupies the initial viewport.

## Git Conventions
- Work on feature branches; do not commit directly to `main`.
- Lockfile changes (`package-lock.json`) must be committed in the same commit as `package.json` changes.
- Run `npm run lint` and `npm run build` before pushing.
