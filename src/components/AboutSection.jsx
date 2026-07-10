import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * About section — sharp layout, 90% width (10% from both sides).
 * Image + text side by side, then value cards below.
 */
export default function AboutSection({ about }) {
  return (
    <section id="about" className="py-24 md:py-32 bg-brand-light">
      <div className="max-w-[90rem] mx-auto px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden card-sharp"
          >
            <img
              src={about.image}
              alt={about.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <div>
            <span className="eyebrow">{about.eyebrow}</span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="heading-2 font-display text-brand-navy mb-8"
            >
              {about.title}
            </motion.h2>

            <div className="space-y-5">
              {about.body.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="body-main text-brand-muted leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {about.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 bg-white card-sharp group hover:bg-brand-navy transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-brand-navy/10 group-hover:bg-brand-orange mb-5 transition-colors duration-300">
                <Check className="w-5 h-5 text-brand-navy group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="heading-5 font-display text-brand-navy group-hover:text-white mb-3 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="body-small text-brand-muted group-hover:text-white/80 transition-colors duration-300">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
