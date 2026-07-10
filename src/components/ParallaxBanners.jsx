import { motion } from 'framer-motion';

/**
 * Sticky stacked parallax banners.
 *
 * Three full-viewport banner cards sit on top of each other in a 300vh tall
 * parent. Each card is position: sticky at top: 0 with an escalating z-index,
 * so card 2 slides over card 1, then card 3 slides over card 2 as the user
 * scrolls.
 */
export default function ParallaxBanners({ banners }) {
  return (
    <section className="relative h-[300vh] bg-white">
      {banners.map((banner, index) => (
        <StackedBanner key={banner.title} banner={banner} index={index} />
      ))}
    </section>
  );
}

function StackedBanner({ banner, index }) {
  return (
    <div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      {/* Background image */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-20% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-full flex flex-col items-start justify-end pb-8 md:pb-12 site-container"
      >
        <span className="eyebrow text-brand-cyan mb-3">{banner.title}</span>
        <h2 className="heading-2 font-display text-white max-w-3xl">
          {banner.subtitle}
        </h2>
      </motion.div>
    </div>
  );
}
