# Hachlaf Website — Local Developer Notes

> Project-specific conventions and setup for the Hachlaf Akhawayne marketing site.

## Stack
- **Framework:** Vite 5 + React 18
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config in `src/index.css`)
- **Animation:** Framer Motion + GSAP (ScrollTrigger for scroll-driven parallax)
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
    SuffolkNav.jsx         # premium floating glassmorphism header
    HeroBackground.jsx     # fixed full-screen crossfade background (z-0)
    Hero.jsx               # scrollable hero content layer (headline + CTAs)
    DomainesSection.jsx    # 3 stacked parallax sector cards (GSAP + sticky)
    OffresSection.jsx      # 5 service/offering cards
    SkanskaProjects.jsx    # compact editorial project showcase: 1 featured + 3 supporting
    StatsSnapshot.jsx      # animated count-up counters
    PartnersCarousel.jsx   # client logo showcase (grid, not carousel)
    CTASection.jsx         # bottom call-to-action + contact form
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
     subtitle, CTAs, trust stats and scroll indicator.
- `HeroBackground` is rendered **outside** `<main>` so it sits behind everything.
- `Hero` is rendered **before** `<main>` in normal page flow; it scrolls away naturally.
- `<main class="relative z-10 bg-white">` starts right after the hero and slides up like
  a curtain, covering both the hero content and the fixed navy background.
- No `h-screen` spacer is needed because the hero content itself occupies the initial viewport.
- Content is **left-aligned** in a 650px max-width column so the construction image remains
  visible on the right; the layout is vertically centered with generous spacing.
- Headline is two lines: a fixed first line (`We Deliver` / `Nous livrons`) and a second
  line that rotates one word every 4 seconds using Framer Motion `AnimatePresence`
  with fade + `translateY` + `blur`.
- `HeroBackground` uses a slow Ken Burns zoom (`scale(1)` → `scale(1.06)` over ~22s)
  plus layered cinematic overlays: a dark black left-to-right gradient (~55–65%), a subtle
  blue/gray tint, a soft vignette and a very light film-grain noise.
- Trust stats are displayed horizontally beneath the CTAs with thin vertical separators.

## Navbar
- `SuffolkNav` is a premium floating glassmorphism bar:
  - `background: rgba(20, 20, 20, 0.35)` on the hero, increasing to `0.55` once scrolled
    or on the subcontractor page.
  - `backdrop-filter: blur(18px)`.
  - Thin white border at 8% opacity and a rounded-2xl frame.
- Text and logo remain white in all states; the mobile menu uses the same dark glass style.

## Domaines section
- `DomainesSection` renders **3 stacked parallax sector cards** as a single
  pinned composition on desktop.
- The section is built around a `.domains-pin` container that is pinned by one
  GSAP ScrollTrigger (`start: 'top top'`, `end: '+=260%'`, `pinSpacing: true`).
  Inside the pinned area:
  - A `.domains-header` stays fixed at the top with the eyebrow (`.domains-eyebrow`)
    and large navy title (`.domains-title`, `clamp(64px, 6.2vw, 108px)`, weight
    800, `font-family: var(--font-display)`, `letter-spacing: -0.045em`)
    visible throughout the entire stacking sequence. The title uses the same
    display font as the rest of the site and is set to `white-space: nowrap`
    on viewports ≥1200px.
  - A `.domains-stage` holds three absolutely positioned cards (`.domain-card-1`,
    `.domain-card-2`, `.domain-card-3`) that stack on top of each other as the
    user scrolls.
- All three cards are always mounted in the DOM. Card 1 starts visible, Cards 2
  and 3 start below the stage (`yPercent: 105` and `110`) and slide up into the
  shared stage during the timeline. Card content is always visible (`opacity: 1`,
  `visibility: visible`) and moves with the card.
- Stacking timeline (scroll-linked, scrubbed, total 10 units):
  - 0%–15%: title + Card 1 visible, Cards 2 and 3 wait below the stage.
  - 15%–42%: Card 2 slides up and stacks over Card 1; Card 1 scales to 0.975 and
    shifts up `-4%` to reveal a subtle 4px stacked edge.
  - 42%–48%: hold Card 2.
  - 48%–75%: Card 3 slides up and stacks over Card 2; previous cards shift to
    final offsets of approximately `-8px` for Card 1 and `-4px` for Card 2.
  - 75%–90%: complete three-card stack is held on screen.
  - 90%–100%: pin releases and the next section begins.
- Card design is unchanged: 90vw width, sharp corners, very subtle shadow
  (`0 8px 28px rgba(8,25,54,0.05)`), thin navy-tinted border, left-to-right
  cinematic gradient overlay, and bottom gradient for text stability.
- Only the background image inside each card has a subtle internal parallax
  (`scale 1.05→1`, `yPercent -2→2`). The card containers themselves move only
  for the intentional stacking animation.
- The pinned composition fits below the navbar using `--navbar-height: 72px`;
  `.domains-pin` height is `calc(100vh - var(--navbar-height))` with a
  `margin-top` of the same value. Header occupies ~19% of the available height;
  the card stage occupies the rest.
- `.domains-stage` and `.domain-card` have `background: transparent` and the card
  image container uses a `-2px` overscan (`-inset-[2px]`) to prevent any gray or
  white strip from appearing at the top edge of the cards during transforms.
- Mobile (`< 768px`) and `prefers-reduced-motion` disable pinning and render
  cards in normal document flow with a light fade-in per card.
- Data model (`content.domaines.items`): `number`, `category`, `title`,
  `description`, `tags`, `detail`, `cta`, `image`.

## Projects section
- `SkanskaProjects` is a compact, editorial showcase designed to fit in a single desktop viewport.
- **Header** is a two-column layout: large title + eyebrow on the left (≈55–60%);
  description, portfolio CTA, and discreet prev/next controls on the right (≈30–35%).
- **Featured project** sits in a `2.1fr + 0.9fr` row: a moderately sized image
  (`h-[320–420px]`) on the left and project information bottom-aligned on the right.
- **Three supporting project cards** are shown directly underneath in a single `1fr × 3` row.
- The default featured project is the **Casablanca desalination station** (`featured: true`).
- The three static supporting cards are **NOOR solar**, **Boujdour wind**, and **Safi thermal**
  (`supporting: true`).
- Optional prev/next controls rotate only the featured project through the non-supporting pool;
  the supporting cards always remain visible.
- Hover interactions are subtle: image scale `1 → 1.025`, overlay darkens slightly, arrow shifts right.
- Clicking any project opens the existing `ProjectModal`.
- `content.js` adds `featured`, `supporting`, `status`, and `expertise` fields to project items.

## CTA / Contact section
- `CTASection` renders the bottom navy call-to-action and the contact form in a single section (`id="contact"`).
- It displays the headline, subtitle, primary CTA button, optional subcontractor button, and a white form card below the buttons.
- The form collects **name**, **company name**, and **message/request**.
- Two send options:
  - **WhatsApp** — opens `https://wa.me/<number>?text=<message>` in a new tab.
  - **Email** — opens a `mailto:` link with a pre-filled subject and body.
- The contact phone (`05 35 36 03 41`) is stored as `content.contact.whatsappNumber`
  in international format (`212535360341`) for WhatsApp.
- The contact email (`h.hamza@stehachlaf.com`) is stored as `content.contact.emailAddress`.
- The footer no longer carries `id="contact"`; the CTA/contact section owns the anchor.

## Git Conventions
- Work on feature branches; do not commit directly to `main`.
- Lockfile changes (`package-lock.json`) must be committed in the same commit as `package.json` changes.
- Run `npm run lint` and `npm run build` before pushing.
