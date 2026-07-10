import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Domaines d'activité — premium stacked parallax section.
 *
 * Three wide, sharp-cornered sector cards stack lightly as the user scrolls.
 * Background images parallax with scroll progress; text is visible immediately
 * (first card) or revealed once on enter (subsequent cards), and never fades
 * out again while the card remains in view.
 */
export default function DomainesSection({ domaines }) {
  const { eyebrow, title, items } = domaines;
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Reduced motion: keep content readable, no parallax / pinning effects.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card.querySelectorAll('[data-animate]'), {
          opacity: 1,
          y: 0,
        });
      });
      return () => {};
    });

    // All other clients: image parallax only; content reveals once on enter.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Track overall section progress for the 01/02/03 indicator.
        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top center',
          end: 'bottom center',
          onUpdate: (self) => setProgress(self.progress),
        });

        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const image = card.querySelector('.card-image');
          const contentItems = card.querySelectorAll('[data-animate]');

          // Cinematic image parallax + scale-out (scrubbed, image only).
          gsap.fromTo(
            image,
            { scale: 1.06, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );

          // Content: subtle one-time fade-in when the card enters the viewport.
          // The first card has no [data-animate] elements — it is already visible.
          if (contentItems.length > 0) {
            gsap.fromTo(
              contentItems,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          // Update the progress indicator to the card currently in centre view.
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onUpdate: (self) => {
              if (self.progress > 0.5) {
                setActiveIndex(i);
              }
            },
          });
        });
      }, wrapper);
      return () => ctx.revert();
    });

    return () => {
      mm.revert();
    };
  }, [items.length]);

  // Only cards after the first get the scroll-enter reveal attribute.
  const animateAttr = (i) => (i === 0 ? {} : { 'data-animate': true });

  return (
    <section id="domaines" className="relative bg-white">
      {/* Section header ----------------------------------------------------- */}
      <div className="site-container pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow text-brand-cyan mb-3 md:mb-4">{eyebrow}</span>
          <h2 className="domaines-title font-display text-brand-navy">{title}</h2>
        </motion.div>
      </div>

      {/* Stacked parallax cards --------------------------------------------- */}
      <div ref={wrapperRef} className="relative md:h-[260vh]">
        {/* Minimal vertical progress indicator ----------------------------- */}
        <div className="absolute right-[3%] top-0 bottom-0 z-[60] pointer-events-none hidden md:flex">
          <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
            <div className="w-px h-20 bg-white/20 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-white"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
            {items.map((card, i) => (
              <span
                key={card.number}
                className={`font-display text-xs tracking-[0.2em] transition-colors duration-300 ${
                  i === activeIndex ? 'text-white' : 'text-white/40'
                }`}
              >
                {card.number}
              </span>
            ))}
          </div>
        </div>

        {items.map((card, i) => (
          <div
            key={card.number}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`md:sticky md:top-24 relative w-full flex justify-center ${
              i !== items.length - 1 ? 'pb-7 md:pb-10 lg:pb-14' : ''
            }`}
            style={{ zIndex: i + 1 }}
          >
            <article className="relative w-[94vw] md:w-[92vw] lg:w-[90vw] max-w-[1800px] h-[74vh] md:h-[66vh] lg:h-[66vh] min-h-[560px] md:min-h-[520px] max-h-[720px] overflow-hidden shadow-[0_10px_30px_rgba(9,24,50,0.06)] border border-[rgba(12,39,82,0.06)]">
              {/* Full-bleed background image with parallax transform ---------- */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image absolute inset-0 w-full h-full object-cover will-change-transform"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{
                    objectPosition:
                      i === 0 ? '70% 50%' : i === 2 ? '60% 50%' : '50% 50%',
                  }}
                />
              </div>

              {/* Cinematic left-to-right gradient overlay --------------------- */}
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

              {/* Soft vignette ------------------------------------------------ */}
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

              {/* Inner border ------------------------------------------------- */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
              />

              {/* Card content ------------------------------------------------- */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16 xl:p-20">
                <div className="max-w-[560px]">
                  <span
                    {...animateAttr(i)}
                    className="block font-display text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none text-white/10 mb-0 md:-mb-2"
                  >
                    {card.number}
                  </span>

                  <span
                    {...animateAttr(i)}
                    className="block text-[11px] md:text-xs font-display font-bold uppercase tracking-[0.22em] text-white/70 mb-3 md:mb-4"
                  >
                    {card.category}
                  </span>

                  <h3
                    {...animateAttr(i)}
                    className="font-display text-white text-[2rem] md:text-[3rem] lg:text-[clamp(2.75rem,4.2vw,5.25rem)] leading-[1] tracking-[-0.02em] font-extrabold mb-4 md:mb-5 lg:mb-6"
                  >
                    {card.title}
                  </h3>

                  <p
                    {...animateAttr(i)}
                    className="text-white/80 text-base md:text-lg lg:text-[1.25rem] leading-[1.55] max-w-[540px] mb-5 md:mb-6 line-clamp-4"
                  >
                    {card.description}
                  </p>

                  <div
                    {...animateAttr(i)}
                    className="flex flex-wrap gap-2 md:gap-2.5 mb-5 md:mb-6"
                  >
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-[11px] font-display font-bold uppercase tracking-wider text-white/90 bg-white/[0.08] border border-white/[0.14] backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div {...animateAttr(i)} className="flex items-center gap-4 md:gap-6">
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-2 text-white font-display font-bold text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    >
                      <span className="relative">
                        {card.cta}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-white/70 transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </a>

                    {card.detail && (
                      <span className="hidden md:inline-block text-white/50 text-xs lg:text-sm font-body">
                        {card.detail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
