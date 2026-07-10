import { motion } from 'framer-motion';

/**
 * Partner / reference logos grid.
 *
 * 12 partner logos in a responsive grid, grayscale by default,
 * color on hover.
 */
export default function PartnersSection({ partners }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="site-container text-center">
        <span className="eyebrow">{partners.eyebrow}</span>
        <h2 className="heading-2 font-display text-brand-navy mb-16 md:mb-20">
          {partners.title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center">
          {partners.logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center justify-center p-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
