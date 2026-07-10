import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Skanska-style projects section:
 * - One big project card (large image + title/description overlay) 
 * - 3 smaller cards below
 * - Auto-rotate or manual navigation
 * - 90% width layout
 */
export default function SkanskaProjects({ projects, onSelectProject }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = projects.items;

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const featured = items[activeIndex];
  // Get 3 items after the featured one (looping)
  const smallCards = [];
  for (let i = 1; i <= 3; i++) {
    smallCards.push(items[(activeIndex + i) % items.length]);
  }

  const goTo = (delta) => {
    setActiveIndex((prev) => {
      let next = prev + delta;
      if (next < 0) next = items.length - 1;
      if (next >= items.length) next = 0;
      return next;
    });
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-brand-light">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16">
          <div>
            <span className="eyebrow">{projects.eyebrow}</span>
            <h2 className="heading-2 font-display text-brand-navy max-w-2xl">
              {projects.title}
            </h2>
          </div>
          <div className="flex items-center gap-6 mt-6 lg:mt-0">
            <p className="body-main text-brand-muted max-w-md hidden lg:block">
              {projects.subtitle}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(-1)}
                className="w-10 h-10 flex items-center justify-center border border-brand-navy/20 hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(1)}
                className="w-10 h-10 flex items-center justify-center border border-brand-navy/20 hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured large card */}
        <motion.div
          key={featured.title + '-big'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <button
            onClick={() => onSelectProject(featured)}
            className="group relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden card-sharp text-left"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.02]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-20">
              <span className="text-brand-cyan font-display text-xs font-bold tracking-[0.2em] uppercase mb-3">
                {featured.type}
              </span>
              <h3 className="heading-3 md:heading-2 font-display text-white mb-3 max-w-2xl">
                {featured.title}
              </h3>
              <p className="body-large text-white/80 max-w-xl line-clamp-2">
                {featured.description}
              </p>
            </div>
          </button>
        </motion.div>

        {/* 3 small cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {smallCards.map((project, i) => (
            <motion.button
              key={project.title + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => onSelectProject(project)}
              className="group flex flex-col text-left"
            >
              <div className="relative aspect-[16/9] overflow-hidden card-sharp">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-300" />
              </div>
              <div className="pt-5 pb-3">
                <span className="text-brand-muted text-xs font-bold tracking-[0.15em] uppercase">
                  {project.type}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-brand-navy mt-1 group-hover:text-brand-navy transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-brand-muted mt-1 line-clamp-2">
                  {project.location}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center lg:text-left">
          <a href="#contact" className="link-circle group">
            <span className="text-brand-dark group-hover:text-brand-navy">{projects.viewDetails}</span>
            <div className="link-circle-icon bg-brand-orange group-hover:bg-brand-navy">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-brand-orange w-6'
                  : 'bg-brand-muted/30 hover:bg-brand-muted/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
