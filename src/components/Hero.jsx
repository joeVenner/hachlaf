import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Full-screen hero with parallax background image and bold white heading.
 */
export default function Hero({ hero, heroImage, lang }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-screen min-h-[620px] w-full overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={heroImage}
          alt="Hachlaf construction site"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-black/30" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="heading-1 font-display text-white max-w-5xl drop-shadow-lg"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="body-large text-white/90 max-w-2xl mt-6"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="body-main text-white/80 max-w-2xl mt-4 hidden md:block"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <a href="#projects" className="btn-primary">
            {hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="btn-secondary">
            {hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors"
        >
          <span className="text-[11px] font-display font-bold uppercase tracking-[0.2em]">
            {lang === 'en' ? 'Scroll' : 'Défiler'}
          </span>
          <ChevronDown className="mt-1 w-5 h-5 animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  );
}
