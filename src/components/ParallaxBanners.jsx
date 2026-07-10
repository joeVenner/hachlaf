import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Three separate 90%-wide parallax banner cards.
 *
 * Each banner is its own card inside the global site-container. They stack
 * vertically with generous spacing, and each image parallax-scrolls independently
 * while the card itself stays at 90% of the browser width.
 */
export default function ParallaxBanners({ banners }) {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="site-container flex flex-col gap-6 md:gap-8">
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
      className="relative card-sharp h-[45vh] md:h-[55vh] w-full overflow-hidden"
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
        className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-8"
      >
        <div className="w-full px-5 md:px-8">
          <span className="eyebrow text-brand-cyan mb-2">{banner.title}</span>
          <h2 className="heading-3 md:heading-2 font-display text-white max-w-3xl">
            {banner.subtitle}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
