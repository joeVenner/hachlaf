import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

/**
 * Project detail modal.
 *
 * Spec:
 * - fade-in overlay + scale-up modal
 * - overlay click, × button, or Escape closes
 * - body scroll locked while open
 * - shows full image, name, location, and description
 */
export default function ProjectModal({ project, onClose, labels }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKey);
      };
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-scroll shadow-2xl card-sharp"
          >
            {/* Header image */}
            <div className="relative h-56 md:h-80">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                aria-label={labels.closeLabel}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 md:left-8">
                <span className="inline-block text-[11px] font-display font-bold uppercase tracking-[0.18em] text-brand-cyan mb-2">
                  {project.type}
                </span>
                <h3 className="heading-3 font-display text-white">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-2 text-brand-muted mb-5">
                <MapPin className="w-4 h-4 text-brand-navy" />
                <span className="body-small font-semibold">{project.location}</span>
              </div>

              <p className="body-main text-brand-dark leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="pt-6 border-t border-black/5 flex justify-end">
                <button
                  onClick={onClose}
                  className="btn-primary"
                >
                  {labels.closeLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
