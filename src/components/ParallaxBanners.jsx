import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Stacked parallax banners inside a single sharp-cornered card.
 * Three image rows share one card height, each with its own parallax + text overlay.
 */
export default function ParallaxBanners({ banners }) {
  return (
    <section className="w-full bg-brand-light py-12 md:py-16">
      <div className="site-container card-sharp h-[70vh] md:h-[55vh] flex flex-col gap-2 overflow-hidden">
        {banners.map((banner, i) => (
          <ParallaxBanner key={i} banner={banner} />
        ))}
      </div>
    </section>
  );
}

function ParallaxBanner({ banner }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <div
      ref={ref}
      className="relative flex-1 min-h-0 w-full overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/35 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-4 md:pb-6"
      >
        <div className="w-full px-4 md:px-6">
          <span className="eyebrow text-brand-cyan mb-2">{banner.title}</span>
          <h2 className="heading-4 md:heading-3 font-display text-white max-w-3xl">
            {banner.subtitle}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
