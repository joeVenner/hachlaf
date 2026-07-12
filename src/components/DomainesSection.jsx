import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Domaines d'activité — pinned three-card stacking composition.
 *
 * A single pinned composition contains the section header (label + title) and a
 * shared card stage. All three cards are always mounted in the DOM. During the
 * pinned scroll sequence the title remains fixed and visible while Card 2 and
 * Card 3 slide up from below the stage and stack over the previous cards.
 *
 * Mobile and reduced-motion clients render the cards in normal document flow.
 */
export default function DomainesSection({ domaines }) {
  const { title, items } = domaines;
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardRefs = useRef([]);
  const mobileCardRefs = useRef([]);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);

  const goToMobileCard = (nextIndex, direction = 1) => {
    if (items.length === 0) return;
    setMobileDirection(direction);
    setMobileIndex((nextIndex + items.length) % items.length);
  };

  const stepMobileCard = (direction) => {
    goToMobileCard(mobileIndex + direction, direction);
  };

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setMobileDirection(1);
      setMobileIndex((current) => (current + 1) % items.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop/Tablet: one pinned composition with a shared stacking stage.
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const [card1, card2, card3] = cardRefs.current;
        const cards = [card1, card2, card3].filter(Boolean);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initial states: all cards mounted and visible, only Card 1 in view.
        gsap.set(cards, {
          opacity: 1,
          visibility: 'visible',
          scale: 1,
          yPercent: 0,
        });
        if (card2) gsap.set(card2, { yPercent: 100 });
        if (card3) gsap.set(card3, { yPercent: 100 });

        if (reduceMotion || !card1 || !card2 || !card3) return;

        // Subtle internal image parallax (image only, not the card container).
        cards.forEach((card) => {
          const image = card.querySelector('.domain-card-image');
          if (!image) return;
          gsap.fromTo(
            image,
            { scale: 1.06, yPercent: -1.5 },
            {
              scale: 1.03,
              yPercent: 1.5,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          );
        });

        // Main stacking timeline.
        // Total duration = 10 units mapped to end: '+=260%'.
        // 0–1.5  : hold title + Card 1
        // 1.5–4.2: Card 2 slides up and stacks over Card 1
        // 4.2–4.8: hold Card 2
        // 4.8–7.5: Card 3 slides up and stacks over Card 2
        // 7.5–9.0: hold complete three-card stack
        // 9.0–10.0: release padding (pin ends at timeline end)
        const stackTl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
            pin: pin,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              // Reset card positions when scrolling back to the top.
              gsap.set(card1, { yPercent: 0, scale: 1 });
              gsap.set(card2, { yPercent: 100, scale: 1 });
              gsap.set(card3, { yPercent: 100, scale: 1 });
            },
          },
        });

        // Card 2 enters (1.5 → 4.2).
        stackTl.fromTo(
          card1,
          { yPercent: 0, scale: 1 },
          { yPercent: 0, scale: 1, duration: 2.7, ease: 'none' },
          1.5
        );
        stackTl.fromTo(
          card2,
          { yPercent: 100, scale: 1 },
          { yPercent: 0, scale: 1, duration: 2.7, ease: 'power1.inOut' },
          1.5
        );

        // Card 3 enters (4.8 → 7.5).
        stackTl.fromTo(
          card1,
          { yPercent: 0, scale: 1 },
          { yPercent: 0, scale: 1, duration: 2.7, ease: 'none' },
          4.8
        );
        stackTl.fromTo(
          card2,
          { yPercent: 0, scale: 1 },
          { yPercent: 0, scale: 1, duration: 2.7, ease: 'none' },
          4.8
        );
        stackTl.fromTo(
          card3,
          { yPercent: 100, scale: 1 },
          { yPercent: 0, scale: 1, duration: 2.7, ease: 'power1.inOut' },
          4.8
        );

        // Hold the completed stack before release.
        stackTl.to({}, { duration: 1.0 });

        // Refresh ScrollTrigger once all images have loaded so measurements are
        // based on rendered dimensions.
        const images = section.querySelectorAll('.domains-stage img');
        let loadedCount = 0;
        const onImageLoad = () => {
          loadedCount += 1;
          if (loadedCount >= images.length) {
            ScrollTrigger.refresh();
          }
        };
        images.forEach((img) => {
          if (img.complete) {
            onImageLoad();
          } else {
            img.addEventListener('load', onImageLoad);
            img.addEventListener('error', onImageLoad);
          }
        });
      }, section);

      return () => ctx.revert();
    });

    return () => {
      mm.revert();
    };
  }, [items.length]);

  const renderCardContent = (card, isMobile) => {
    const padding = isMobile ? 'p-5' : 'p-6 md:p-10 lg:p-16 xl:p-20';
    const numberSize = isMobile
      ? 'text-[2.5rem]'
      : 'text-[3.5rem] md:text-[5rem] lg:text-[6.5rem]';
    const categorySize = isMobile
      ? 'text-[11px]'
      : 'text-[11px] md:text-xs';
    const titleSize = isMobile
      ? 'text-[1.55rem]'
      : 'text-[2rem] md:text-[3rem] lg:text-[clamp(2.75rem,4.2vw,5.25rem)]';
    const bodySize = isMobile
      ? 'text-sm'
      : 'text-base md:text-lg lg:text-[1.25rem]';
    const tagSize = isMobile
      ? 'text-[10px] px-2.5 py-1.5 inline-flex items-center'
      : 'text-[11px] sm:text-xs px-3 py-2 md:px-4 min-h-[44px] inline-flex items-center';
    const ctaSize = isMobile ? 'text-sm' : 'text-sm md:text-base';
    const detailDisplay = isMobile ? 'hidden' : 'hidden md:inline-block';

    return (
      <div className={`absolute inset-0 flex flex-col justify-end ${padding}`}>
        <div className="max-w-[560px]">
          <span className={`block font-display ${numberSize} leading-none text-white/10 mb-0 md:-mb-2`}>
            {card.number}
          </span>

          <span className={`block ${categorySize} font-display font-bold uppercase tracking-[0.22em] text-white/70 mb-3 md:mb-4`}>
            {card.category}
          </span>

          <h3 className={`font-display text-white ${titleSize} leading-[1] tracking-[-0.02em] font-extrabold mb-4 md:mb-5 lg:mb-6`}>
            {card.title}
          </h3>

          <p className={`text-white/80 ${bodySize} leading-[1.55] max-w-[540px] mb-5 md:mb-6 line-clamp-4`}>
            {card.description}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-2.5 mb-5 md:mb-6">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`${tagSize} rounded-full font-display font-bold uppercase tracking-wider text-white/90 bg-white/[0.08] border border-white/[0.14] backdrop-blur-md`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#contact"
              className={`group inline-flex min-h-[44px] items-center gap-2 text-white font-display font-bold ${ctaSize} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm`}
            >
              <span className="relative">
                {card.cta}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-white/70 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </a>

            {card.detail && (
              <span className={`${detailDisplay} text-white/50 text-xs lg:text-sm font-body`}>
                {card.detail}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="domaines" ref={sectionRef} className="domains-section bg-white">
      <div ref={pinRef} className="domains-pin">
        {/* Fixed header inside the pinned composition ------------------------ */}
        <header className="domains-header">
          <motion.div
            className="w-full h-full flex flex-col justify-end"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="domains-title">{title}</h2>
          </motion.div>
        </header>

        {/* Shared stage that contains the three stacked cards ---------------- */}
        <div className="domains-stage">
          {items.map((card, i) => (
            <article
              key={card.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`domain-card domain-card-${i + 1}`}
            >
              {/* Full-bleed background image -------------------------------- */}
              <img
                src={card.image}
                alt={card.title}
                className="domain-card-image will-change-transform"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  objectPosition:
                    i === 0 ? '70% 50%' : i === 2 ? '60% 50%' : '50% 50%',
                }}
              />

              {/* Cinematic left-to-right gradient overlay ------------------- */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(5,15,32,0.82) 0%, rgba(5,15,32,0.56) 38%, rgba(5,15,32,0.14) 72%, rgba(5,15,32,0.05) 100%)',
                }}
              />

              {/* Subtle bottom gradient for text stability ------------------ */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(5,15,32,0.35) 0%, rgba(5,15,32,0) 45%)',
                }}
              />

              {/* Soft vignette -------------------------------------------- */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 35% 75%, transparent 0%, rgba(5,15,32,0.24) 100%)',
                }}
              />

              {/* Subtle film-grain texture ---------------------------------- */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Inner border --------------------------------------------- */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
              />

              {/* Card content — always visible ------------------------------ */}
              {renderCardContent(card, false)}
            </article>
          ))}
        </div>
      </div>

      {/* Mobile normal-flow fallback --------------------------------------- */}
      <div className="md:hidden domaines-mobile-flow">
        <div className="domains-mobile-header">
          <h2 className="domains-title">{title}</h2>
        </div>

        <div className="domaines-mobile-carousel" aria-roledescription="carousel">
          <div className="domaines-mobile-track">
            <AnimatePresence initial={false} custom={mobileDirection} mode="wait">
              {items[mobileIndex] && (
                <motion.article
                  key={`mobile-${items[mobileIndex].number}`}
                  ref={(el) => { mobileCardRefs.current[mobileIndex] = el; }}
                  className="domain-card-mobile domain-card-mobile-motion"
                  custom={mobileDirection}
                  initial={{ opacity: 0, x: mobileDirection * 44, scale: 0.985 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: mobileDirection * -44, scale: 0.985 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -48) stepMobileCard(1);
                    if (info.offset.x > 48) stepMobileCard(-1);
                  }}
                  aria-label={`${mobileIndex + 1} / ${items.length}`}
                >
                  <motion.img
                    src={items[mobileIndex].image}
                    alt={items[mobileIndex].title}
                    className="domain-card-image domain-card-image-mobile"
                    loading={mobileIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    initial={{ scale: 1.08, y: -12 }}
                    animate={{ scale: 1.02, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      objectPosition:
                        mobileIndex === 0 ? '70% 50%' : mobileIndex === 2 ? '60% 50%' : '50% 50%',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(5,15,32,0.82) 0%, rgba(5,15,32,0.56) 38%, rgba(5,15,32,0.14) 72%, rgba(5,15,32,0.05) 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(5,15,32,0.35) 0%, rgba(5,15,32,0) 45%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 75%, transparent 0%, rgba(5,15,32,0.24) 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                  />
                  {renderCardContent(items[mobileIndex], true)}
                </motion.article>
              )}
            </AnimatePresence>
          </div>

          <div className="domaines-mobile-controls" aria-label="Navigation domaines">
            <button type="button" onClick={() => stepMobileCard(-1)} aria-label="Domaine précédent">
              ‹
            </button>
            <div className="domaines-mobile-dots">
              {items.map((card, index) => (
                <button
                  key={card.number}
                  type="button"
                  className={index === mobileIndex ? 'is-active' : undefined}
                  onClick={() => goToMobileCard(index, index > mobileIndex ? 1 : -1)}
                  aria-label={`Afficher ${card.title}`}
                  aria-current={index === mobileIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" onClick={() => stepMobileCard(1)} aria-label="Domaine suivant">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
