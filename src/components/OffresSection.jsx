import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Nos Offres section — card style, Skanska-sharp.
 * 5 cards in a row with image + title + description + CTA arrow.
 */
export default function OffresSection({ offres }) {
  return (
    <section id="offres" className="py-24 md:py-32 bg-white">
      <div className="max-w-[90rem] mx-auto px-[5%]">
        <span className="eyebrow">{offres.eyebrow}</span>
        <h2 className="heading-2 font-display text-brand-navy mb-12 md:mb-16">
          {offres.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {offres.items.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group card-sharp bg-brand-light hover:bg-brand-navy transition-colors duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 md:p-6 flex flex-col">
                <h3 className="font-display text-base font-bold text-brand-navy group-hover:text-white transition-colors duration-300 mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="body-small text-brand-muted group-hover:text-white/80 transition-colors duration-300 mb-4 line-clamp-3">
                  {item.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-brand-orange group-hover:text-white transition-colors duration-300">
                  <span className="font-display text-xs font-bold uppercase tracking-wider">{offres.ctaLabel || "En savoir plus"}</span>
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-orange text-white group-hover:bg-white group-hover:text-brand-navy transition-all duration-300 group-hover:rotate-45">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
