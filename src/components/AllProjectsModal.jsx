import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, X } from 'lucide-react';

export default function AllProjectsModal({
  open,
  projects,
  onClose,
  onSelectProject,
}) {
  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  const handleSelect = (project) => {
    onClose();
    onSelectProject(project);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-6xl max-h-[90vh] shadow-2xl card-sharp flex flex-col overflow-hidden"
          >
            <div className="flex items-start justify-between gap-6 border-b border-black/10 px-5 py-5 md:px-8 md:py-6">
              <div>
                <span className="eyebrow">{projects.eyebrow}</span>
                <h3 className="font-display font-extrabold text-brand-navy leading-tight text-2xl md:text-4xl">
                  {projects.allProjectsTitle}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="w-11 h-11 flex flex-shrink-0 items-center justify-center rounded-full bg-brand-navy text-white hover:bg-brand-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                aria-label={projects.closeLabel}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="modal-scroll overflow-y-auto px-5 py-5 md:px-8 md:py-7">
              <div className="space-y-5">
                {projects.items.map((project) => (
                  <article
                    key={`${project.title}-${project.location}`}
                    className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)] gap-4 md:gap-6 border-b border-black/10 pb-5 last:border-b-0 last:pb-0"
                  >
                    <button
                      onClick={() => handleSelect(project)}
                      className="group relative aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-md bg-brand-light text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                      aria-label={`${projects.viewDetails} ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.type} — ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </button>

                    <div className="flex flex-col justify-center">
                      <span className="text-brand-cyan font-display text-xs font-bold tracking-[0.18em] uppercase mb-2">
                        {project.type}
                      </span>
                      <h4 className="font-display text-2xl md:text-3xl font-bold text-brand-navy leading-tight">
                        {project.title}
                      </h4>
                      <div className="mt-2 mb-4 flex items-center gap-2 text-brand-muted">
                        <MapPin className="w-4 h-4 text-brand-navy" />
                        <span className="body-small font-semibold">{project.location}</span>
                      </div>
                      <p className="body-main text-brand-dark/85 leading-relaxed">
                        {project.description}
                      </p>
                      <button
                        onClick={() => handleSelect(project)}
                        className="group/cta mt-5 inline-flex min-h-[44px] items-center gap-3 self-start font-display font-bold text-sm text-brand-navy hover:text-brand-orange transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 rounded-sm"
                      >
                        <span>{projects.viewDetails}</span>
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-orange text-white transition-all duration-500 group-hover/cta:bg-brand-navy group-hover/cta:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
