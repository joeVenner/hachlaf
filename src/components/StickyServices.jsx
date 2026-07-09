import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Sticky text-on-image reveal section for the 5 service domains.
 *
 * As the user scrolls through a tall container, a pinned sticky panel
 * crossfades between full-bleed service images and their descriptions.
 */
export default function StickyServices({ services, ctaLabel, ctaHref = '#projects' }) {
  const containerRef = useRef(null);
  const count = services.items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Position moves from 0 to count - 1 as the user scrolls the container.
  const position = useTransform(scrollYProgress, [0, 1], [0, count - 1]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-brand-light"
      style={{ height: `${count * 110}vh` }}
    >
      {/* Pinned sticky panel */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden">
        {/* Background images with crossfade */}
        {services.items.map((item, index) => (
          <StickyImage
            key={item.id}
            src={item.image}
            alt={item.title}
            index={index}
            position={position}
          />
        ))}

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/65 to-transparent z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="relative max-w-3xl min-h-[420px] md:min-h-[360px]">
            <span className="eyebrow text-brand-cyan">{services.eyebrow}</span>

            {services.items.map((item, index) => (
              <StickyText key={item.id} item={item} index={index} position={position} />
            ))}

            <div className="absolute bottom-0 left-0">
              <a href={ctaHref} className="btn-primary">
                {ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-20 w-32 h-1 bg-white/20">
          <ProgressBar position={position} count={count} />
        </div>
      </div>
    </section>
  );
}

function StickyImage({ src, alt, index, position }) {
  // opacity = 1 when position == index, falls to 0 over distance of 0.6
  const opacity = useTransform(
    position,
    (v) => Math.max(0, 1 - Math.abs(v - index) / 0.6)
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 w-full h-full"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-105"
      />
    </motion.div>
  );
}

function StickyText({ item, index, position }) {
  const opacity = useTransform(
    position,
    (v) => Math.max(0, 1 - Math.abs(v - index) / 0.5)
  );
  const y = useTransform(
    position,
    (v) => {
      const dist = v - index;
      const fade = 1 - Math.min(1, Math.abs(dist) / 0.5);
      return dist > 0 ? 30 * fade : -30 * fade;
    }
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-14 md:top-16 left-0 right-0 max-w-3xl pr-6 pointer-events-none"
    >
      <h2 className="heading-2 font-display text-white mb-6">
        {item.title}
      </h2>
      <p className="body-large text-white/90 leading-relaxed max-w-2xl">
        {item.fullDesc}
      </p>
    </motion.div>
  );
}

function ProgressBar({ position, count }) {
  const width = useTransform(position, [0, count - 1], ['0%', '100%']);
  return (
    <motion.div
      style={{ width }}
      className="h-full bg-brand-orange"
    />
  );
}
