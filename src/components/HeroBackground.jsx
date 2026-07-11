import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SLIDE_INTERVAL = 6000;
const CROSSFADE_DURATION = 1.5;

/**
 * Fixed full-screen cinematic background slideshow.
 *
 * This layer stays pinned to the viewport at z-0 while the page content
 * scrolls over it. It adds a slow Ken Burns zoom, a readable multi-layer
 * gradient, a subtle blue/gray tint, a soft vignette and a light film-grain
 * noise so the construction image feels alive but never competes with text.
 */
export default function HeroBackground({ heroImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section
      aria-hidden="true"
      className="fixed inset-0 hero-viewport w-full overflow-hidden z-0 bg-brand-navy"
    >
      {/* Crossfade background slideshow with Ken Burns zoom */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover animate-kenburns will-change-transform"
            />
          </motion.div>
        ))}
      </div>

      {/* Multi-layer cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/[0.55] via-black/[0.30] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
      <div className="absolute inset-0 bg-brand-navy/15 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,80,120,0.10),transparent_55%)]" />
      <div className="vignette-overlay" />
      <div className="grain-overlay" />
    </section>
  );
}
