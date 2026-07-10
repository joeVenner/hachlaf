import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Compact editorial projects showcase.
 *
 * - Single-screen section (≈90–100vh desktop, max-h ~950px) with normal flow.
 * - Two-column header: large title + description/CTA.
 * - Featured project: fixed image column + bottom-aligned text column.
 * - Three supporting project cards below in a single row.
 * - Optional discreet prev/next controls rotate only the featured project.
 */
export default function SkanskaProjects({ projects, onSelectProject }) {
  const items = projects.items;

  // Three cards that remain visible at all times.
  const supportingItems = useMemo(
    () => items.filter((p) => p.supporting),
    [items]
  );

  // Featured project pool: everything outside the static supporting trio.
  const featuredPool = useMemo(
    () => items.filter((p) => !p.supporting),
    [items]
  );

  const defaultFeaturedIndex = useMemo(() => {
    const flagged = featuredPool.findIndex((p) => p.featured);
    return flagged >= 0 ? flagged : 0;
  }, [featuredPool]);

  const [activeIndex, setActiveIndex] = useState(defaultFeaturedIndex);
  const featured = featuredPool[activeIndex] || featuredPool[0];

  const goTo = (delta) => {
    setActiveIndex((prev) => {
      const count = featuredPool.length;
      if (count <= 1) return prev;
      let next = prev + delta;
      if (next < 0) next = count - 1;
      if (next >= count) next = 0;
      return next;
    });
  };

  const hasControls = featuredPool.length > 1;

  return (
    <section
      id="projects"
      className="bg-white py-16 pb-12 md:py-20 md:pb-16 lg:pt-24 lg:pb-20"
      aria-labelledby="projects-heading"
    >
      <div className="site-container">
        <div className="max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)] gap-8 lg:gap-14 items-end mb-8 md:mb-10 lg:mb-12">
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

            {/* Right: description, controls, CTA */}
            <div className="flex flex-col gap-5 lg:pb-1">
              <p className="body-main text-brand-muted max-w-md leading-relaxed">
                {projects.subtitle}
              </p>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => onSelectProject(featured)}
                  className="group inline-flex items-center gap-2 font-display font-bold text-sm text-brand-navy hover:text-brand-orange transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-sm"
                >
                  <span>{projects.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>

                {hasControls && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goTo(-1)}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                      aria-label="Projet précédent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => goTo(1)}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                      aria-label="Projet suivant"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured project */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(280px,0.9fr)] gap-6 lg:gap-8 mb-8 md:mb-10 lg:mb-12">
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
                  className="group relative w-full h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
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
                  className="flex flex-col justify-end h-full lg:min-h-[420px] pt-2 lg:pt-0"
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
                    className="group/cta inline-flex items-center gap-3 self-start font-display font-bold text-sm text-brand-navy hover:text-brand-orange transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span>{projects.viewDetails}</span>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-orange text-white transition-all duration-500 group-hover/cta:bg-brand-navy group-hover/cta:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </motion.div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Supporting projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {supportingItems.map((project) => (
              <article key={project.title}>
                <button
                  onClick={() => onSelectProject(project)}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-md"
                  aria-label={`Voir le projet ${project.title}`}
                >
                  <div className="relative w-full h-[200px] md:h-[170px] lg:h-[190px] overflow-hidden rounded-md mb-4">
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
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
