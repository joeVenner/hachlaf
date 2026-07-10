import { motion } from 'framer-motion';

/**
 * Domaines d'activité section — sharp cards, 90% width.
 * Cards with image + title + description in a grid.
 */
export default function DomainesSection({ domaines }) {
  return (
    <section id="domaines" className="py-24 md:py-32 bg-white">
      <div className="site-container">
        <span className="eyebrow">{domaines.eyebrow}</span>
        <h2 className="heading-2 font-display text-brand-navy mb-12 md:mb-16">
          {domaines.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {domaines.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group card-sharp bg-brand-light hover:bg-brand-navy transition-colors duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-white transition-colors duration-300 mb-2">
                  {item.title}
                </h3>
                <p className="body-small text-brand-muted group-hover:text-white/80 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
