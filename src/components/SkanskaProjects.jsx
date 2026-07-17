import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Compact editorial projects showcase.
 *
 * - Single-screen section (≈90–100vh desktop, max-h ~950px) with normal flow.
 * - Two-column header: large title + description/CTA.
 * - Featured project spans the first two columns, matching the width of the
 *   first two supporting cards below.
 * - All four visible project slots rotate together as a window.
 */
export default function SkanskaProjects({ projects, onSelectProject, onShowAll }) {
  const items = projects.items;

  const defaultStartIndex = useMemo(() => {
    const flagged = items.findIndex((p) => p.featured);
    return flagged >= 0 ? flagged : 0;
  }, [items]);

  const [activeStart, setActiveStart] = useState(defaultStartIndex);
  const visibleProjects = useMemo(() => {
    if (items.length === 0) return [];
    return Array.from({ length: Math.min(4, items.length) }, (_, offset) => (
      items[(activeStart + offset) % items.length]
    ));
  }, [activeStart, items]);
  const featured = visibleProjects[0] || items[0];
  const supportingItems = visibleProjects.slice(1, 4);

  useEffect(() => {
    setActiveStart(defaultStartIndex);
  }, [defaultStartIndex]);

  useEffect(() => {
    const count = items.length;
    if (count <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveStart((prev) => (prev + 1) % count);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const goTo = (delta) => {
    setActiveStart((prev) => {
      const count = items.length;
      if (count <= 1) return prev;
      let next = prev + delta;
      if (next < 0) next = count - 1;
      if (next >= count) next = 0;
      return next;
    });
  };

  const hasControls = items.length > 1;

  return (
    <section
      id="projects"
      className="projects-section bg-white py-16 pb-12 md:py-20 md:pb-16 lg:pt-24 lg:pb-20"
      aria-labelledby="projects-heading"
    >
      <div className="site-container">
        <div className="max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="projects-header grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)] gap-8 lg:gap-14 items-end mb-8 md:mb-10 lg:mb-12">
            {/* Left: label + title */}
            <div>
              <span className="eyebrow">{projects.eyebrow}</span>
              <h2
                id="projects-heading"
                className="font-display font-extrabold text-brand-navy leading-[0.98] tracking-tight max-w-[720px]"
                style={{ fontSize: 'clamp(2.25rem, 4.2vw + 0.5rem, 4.25rem)' }}
              >
                {projects.title}
              </h2>
            </div>

            {/* Right: controls */}
            <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end lg:pb-1">
              <button
                onClick={onShowAll}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-brand-navy/15 px-5 font-display text-sm font-bold text-brand-navy transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
              >
                {projects.cta}
              </button>

              {hasControls && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goTo(-1)}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                    aria-label="Projet précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                    aria-label="Projet suivant"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Featured project */}
          <div className="project-featured-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
            <AnimatePresence mode="wait">
              <motion.article
                key={featured.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="contents"
              >
                {/* Featured image */}
                <button
                  onClick={() => onSelectProject(featured)}
                  className="project-featured-image group relative w-full lg:col-span-2 overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                  aria-label={`Voir le projet ${featured.title}`}
                >
                  <img
                    src={featured.image}
                    alt={`${featured.type} — ${featured.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                </button>

                {/* Featured info — aligned toward the bottom of the image */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="project-featured-info flex flex-col justify-end h-full pt-2 lg:pt-0"
                >
                  <span className="text-brand-cyan font-display text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    {featured.type}
                  </span>

                  <h3
                    className="font-display font-bold text-brand-navy mb-3"
                    style={{ fontSize: 'clamp(1.75rem, 2.8vw + 0.5rem, 2.75rem)' }}
                  >
                    {featured.title}
                  </h3>

                  <p className="body-large text-brand-dark/85 mb-1">
                    {featured.location}
                  </p>

                  <p className="body-main text-brand-muted leading-relaxed mb-5 line-clamp-3">
                    {featured.description}
                  </p>

                  {(featured.status || featured.expertise) && (
                    <p className="text-xs text-brand-muted font-medium tracking-wide mb-6">
                      {featured.status}
                      {featured.status && featured.expertise && ' · '}
                      {featured.expertise}
                    </p>
                  )}

                  <button
                    onClick={() => onSelectProject(featured)}
                    className="group/cta inline-flex min-h-[44px] items-center gap-3 self-start font-display font-bold text-sm text-brand-navy hover:text-brand-orange transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span>{projects.viewDetails}</span>
                    <span className="w-11 h-11 flex items-center justify-center rounded-full bg-brand-orange text-white transition-all duration-500 group-hover/cta:bg-brand-navy group-hover/cta:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </motion.div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Supporting projects */}
          <div className="project-supporting-grid grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {supportingItems.map((project) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="project-supporting-card"
              >
                <button
                  onClick={() => onSelectProject(project)}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-md"
                  aria-label={`Voir le projet ${project.title}`}
                >
                  <div className="project-supporting-image relative w-full overflow-hidden rounded-md mb-4">
                    <img
                      src={project.image}
                      alt={`${project.type} — ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-brand-cyan font-display text-xs font-bold tracking-[0.18em] uppercase">
                        {project.type}
                      </span>
                      <h4
                        className="font-display font-bold text-brand-navy mt-1 group-hover:text-brand-orange transition-colors duration-300"
                        style={{ fontSize: 'clamp(1.125rem, 1.4vw + 0.5rem, 1.5rem)' }}
                      >
                        {project.title}
                      </h4>
                      <p className="body-small text-brand-muted mt-1">
                        {project.location}
                      </p>
                    </div>

                    <span className="mt-1 w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
