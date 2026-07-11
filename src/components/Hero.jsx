import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WORD_INTERVAL = 4000;
const ROTATION_DELAY = 600;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Premium left-aligned hero content layer.
 *
 * The construction image stays visible on the right while the content sits on
 * the left in a tight 650px column. Elements reveal in a staggered sequence,
 * the second headline word rotates every 4 seconds, and trust stats sit
 * beneath the CTAs with thin separators.
 */
export default function Hero({ hero }) {
  const eyebrowParts = hero.eyebrowSub.split('•').map((part) => part.trim());

  return (
    <section
      id="top"
      className="relative z-[1] hero-viewport w-full flex items-center overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="site-container w-full h-full flex flex-col justify-center py-24"
      >
        <div className="max-w-[650px]">
          {/* Top label */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10">
            <span className="block text-[11px] md:text-xs font-display font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">
              {hero.eyebrow}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] md:text-xs font-display font-medium uppercase tracking-[0.18em] text-white/50">
              {eyebrowParts.map((part, index) => (
                <span key={part} className="inline-flex items-center gap-x-2">
                  {index > 0 && (
                    <span className="hidden sm:inline text-white/35" aria-hidden="true">
                      •
                    </span>
                  )}
                  <span>{part}</span>
                </span>
              ))}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10">
            <h1 className="hero-headline text-white">
              <span className="block">{hero.preTitle}</span>
              <span className="block text-brand-orange">
                <RotatingWord words={hero.rotatingWords} />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl xl:text-[1.375rem] leading-[1.5] text-white/80 max-w-[560px] mb-10 md:mb-12"
          >
            {hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-4 mb-12 md:mb-14"
          >
            <a href="#projects" className="btn-gold group w-full sm:w-auto">
              {hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-glass w-full sm:w-auto">
              {hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap items-center">
              {hero.heroStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center">
                  <div className="px-5 sm:px-7 md:px-8 py-2 text-left">
                    <div className="text-3xl sm:text-4xl md:text-[2.75rem] font-display font-bold text-white tracking-tight leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-[11px] sm:text-xs font-display font-semibold uppercase tracking-[0.16em] text-white/55">
                      {stat.label}
                    </div>
                  </div>
                  {index < hero.heroStats.length - 1 && (
                    <div className="hidden sm:block h-8 md:h-10 w-px bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#domaines"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll to domains"
      >
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-current"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.a>
    </section>
  );
}

/**
 * Rotating word with luxury fade + slide + blur transition.
 */
function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), ROTATION_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, WORD_INTERVAL);
    return () => clearInterval(interval);
  }, [ready, words.length]);

  return (
    <span className="hero-headline-rotator relative align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
