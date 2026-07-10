import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Premium dark card snapshot with animated count-up counters.
 * 90% width, sharp style.
 */
export default function StatsSnapshot({ stats }) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[90rem] mx-auto px-[5%]">
        <div className="relative rounded-none overflow-hidden shadow-[0_20px_50px_rgba(20,50,117,0.15)] group">
          {/* Animated Background Layers */}
          <div className="absolute inset-0 z-0 bg-[#1e4496] overflow-hidden">
            <div className="absolute top-[-50%] right-[-10%] bottom-[-50%] left-[40%] bg-brand-navy transform -skew-x-[25deg] transition-transform duration-[3s] ease-out group-hover:translate-x-4" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black/20 animate-[pulse_8s_ease-in-out_infinite_alternate] mix-blend-overlay" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 p-12 md:p-20 xl:p-24 items-start">
            {/* Left Text */}
            <div className="lg:pr-10">
              <span className="eyebrow text-brand-cyan mb-3">{stats.eyebrow}</span>
              <h2 className="heading-2 font-display text-white">
                {stats.title}
              </h2>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {stats.items.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
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
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="text-left"
    >
      <div className="heading-1 font-display text-white mb-3">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="body-main text-white/90">
        {stat.label}
      </div>
    </motion.div>
  );
}
