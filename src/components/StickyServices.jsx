import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Sticky text-on-image reveal section for the 5 service domains.
 *
 * Modified to act like a premium floating card instead of full-bleed screen.
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
      className="relative bg-white py-12 md:py-24 px-6 md:px-12"
      style={{ height: `${count * 100}vh` }}
    >
      {/* Pinned sticky panel */}
      <div className="sticky top-24 md:top-32 h-[75vh] min-h-[600px] max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(20,50,117,0.15)] group">
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/50 to-transparent z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 lg:p-20 pb-20 md:pb-24">
          <div className="relative max-w-3xl min-h-[220px]">
            <span className="eyebrow text-brand-cyan mb-4">{services.eyebrow}</span>

            {services.items.map((item, index) => (
              <StickyText key={item.id} item={item} index={index} position={position} />
            ))}
          </div>
          
          <div className="mt-8">
            <a href={ctaHref} className="btn-primary">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-white/20">
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
      className="absolute top-12 left-0 right-0 max-w-3xl pr-6 pointer-events-none"
    >
      <h2 className="heading-2 font-display text-white mb-4">
        {item.title}
      </h2>
      <p className="body-main text-white/90 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
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
      className="h-full bg-brand-cyan"
    />
  );
}
