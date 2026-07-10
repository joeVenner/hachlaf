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
    HeroBackground.jsx     # fixed full-screen crossfade background (z-0)
    Hero.jsx               # scrollable hero content layer (headline + CTAs)
    DomainesSection.jsx    # 3 macro-sector cards in a normal grid
    ParallaxBanners.jsx    # 3 full-viewport sticky stacked parallax cards
    OffresSection.jsx      # 5 service/offering cards
    SkanskaProjects.jsx    # 2/3+1/3 featured project + 3 small cards
    StatsSnapshot.jsx      # animated count-up counters
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
- **Headings:** `Outfit`, weight 800 by default (bold-only system).
- **Body:** `Inter`, weights 300–700.
- All heading sizes use `clamp()` for fluid scaling. Use the `.heading-1` … `.heading-5` utility classes in `src/index.css`.

### Cards
- All content cards use sharp corners (`border-radius: 0`) via the `.card-sharp` utility.
- Buttons and icon bubbles remain rounded/pill-shaped as CTAs.

### Layout width
- All page content uses a global 90/5/5 container: `px-[5%]` (90% of the browser width, 5% margins from each edge).
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
- The hero is split into two independent layers:
  1. `HeroBackground` — a fixed-position full-viewport crossfade slideshow at `z-0`.
  2. `Hero` — a scrollable `h-screen` content layer at `z-[1]` containing the headline,
     subtitle, CTAs, and scroll indicator.
- `HeroBackground` is rendered **outside** `<main>` so it sits behind everything.
- `Hero` is rendered **before** `<main>` in normal page flow; it scrolls away naturally.
- `<main class="relative z-10 bg-white">` starts right after the hero and slides up like
  a curtain, covering both the hero content and the fixed navy background.
- No `h-screen` spacer is needed because the hero content itself occupies the initial viewport.

## Domaines section
- `DomainesSection` renders **3 macro-sector cards** in a normal scrolling grid
  inside the global 90/5/5 container.
- The 5 original domains are grouped into:
  1. **Énergie & Environnement** (Energy + Water & Environment)
  2. **Industrie & Infrastructure** (Industry + Infrastructure)
  3. **Éducation & Résidentiel**
- Each card is a `card-sharp` tile with an image, title, description, and optional
  `sectors` chips.

## Parallax banners
- `ParallaxBanners` renders **3 full-viewport cards** inside a 300vh tall parent.
- Each card is `position: sticky; top: 0; height: 100vh` with an escalating
  `z-index`, so the next banner slides over the previous one while scrolling.
- Each card has a full-bleed background image, dark gradient, and a title +
  subtitle block.

## Projects section
- `SkanskaProjects` uses a **2fr + 1fr featured row**: large image on the left,
  text block on the right.
- The featured row aligns visually with a **3-column** grid of smaller project cards below.
- Auto-rotation (5s), manual arrows, dot indicators, and the project modal are preserved.

## Contact section
- `ContactSection` renders a client-side contact form between the CTA and the footer.
- It collects **name**, **company name**, and **message/request**.
- Two send options:
  - **WhatsApp** — opens `https://wa.me/<number>?text=<message>` in a new tab.
  - **Email** — opens a `mailto:` link with a pre-filled subject and body.
- The contact phone (`05 35 36 03 41`) is stored as `content.contact.whatsappNumber`
  in international format (`212535360341`) for WhatsApp.
- The contact email (`h.hamza@stehachlaf.com`) is stored as `content.contact.emailAddress`.
- The footer no longer carries `id="contact"`; the contact section owns the anchor.

## Git Conventions
- Work on feature branches; do not commit directly to `main`.
- Lockfile changes (`package-lock.json`) must be committed in the same commit as `package.json` changes.
- Run `npm run lint` and `npm run build` before pushing.
