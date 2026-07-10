import { motion } from 'framer-motion';

/**
 * Domaines d'activité — normal scrolling section.
 *
 * Three macro-sector cards in a responsive grid inside the global 90/5/5
 * container. The previous sticky-stacked behaviour has moved to
 * ParallaxBanners so the section order remains readable on short viewports.
 */
export default function DomainesSection({ domaines }) {
  const { eyebrow, title, items } = domaines;

  return (
    <section id="domaines" className="relative py-24 md:py-32 bg-white">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="eyebrow text-brand-cyan mb-4">{eyebrow}</span>
          <h2 className="heading-2 font-display text-brand-navy">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((card, index) => (
            <DomaineCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DomaineCard({ card, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card-sharp bg-brand-light"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 md:p-8">
        <h3 className="heading-4 font-display text-brand-navy mb-3">
          {card.title}
        </h3>

        <p className="body-main text-brand-muted mb-5">
          {card.desc}
        </p>

        {card.sectors && card.sectors.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {card.sectors.map((sector) => (
              <span
                key={sector}
                className="px-3 py-1.5 bg-brand-navy/10 text-brand-navy text-[11px] font-display font-bold uppercase tracking-wider"
              >
                {sector}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
