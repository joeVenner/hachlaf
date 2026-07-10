import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Full-width parallax scrolling banners — like Skanska.
 * Each banner is a full-width image with text overlay that parallax-scrolls.
 */
export default function ParallaxBanners({ banners }) {
  return (
    <section className="relative">
      {banners.map((banner, i) => (
        <ParallaxBanner key={i} banner={banner} />
      ))}
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
      className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden"
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
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/30 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-[5%]"
      >
        <div className="max-w-[90rem] mx-auto w-full">
          <span className="eyebrow text-brand-cyan mb-3">{banner.title}</span>
          <h2 className="heading-3 md:heading-2 font-display text-white max-w-3xl">
            {banner.subtitle}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
