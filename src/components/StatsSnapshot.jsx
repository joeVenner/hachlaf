import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Dark stats snapshot with animated count-up counters.
 *
 * Skanska spec:
 * - dark full-bleed background
 * - 4 stats in a grid
 * - large bold numbers
 * - labels below
 *
 * Hachlaf enhancement: counters animate on scroll into view.
 */
export default function StatsSnapshot({ stats }) {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-brand-navy overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <span className="eyebrow text-brand-cyan">{stats.eyebrow}</span>
        <h2 className="heading-2 font-display text-white mb-16 md:mb-20">
          {stats.title}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.items.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = stat.value;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (endValue - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="heading-1 font-display text-white mb-3">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="font-display text-sm md:text-base font-medium uppercase tracking-[0.15em] text-white/70">
        {stat.label}
      </div>
    </motion.div>
  );
}
