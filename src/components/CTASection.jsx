import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';

/**
 * Bottom call-to-action section.
 *
 * Supports an optional secondary subcontractor CTA.
 */
export default function CTASection({ cta }) {
  return (
    <section className="py-24 md:py-32 bg-brand-navy text-center">
      <div className="site-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-2 font-display text-white mb-6">
            {cta.title}
          </h2>
          <p className="body-large text-white/80 mb-10">
            {cta.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary inline-flex">
              {cta.button}
              <ArrowRight className="w-5 h-5" />
            </a>

            {cta.subcontractor && (
              <Link
                to={cta.subcontractor.to}
                className="btn-secondary inline-flex"
              >
                <Briefcase className="w-4 h-4" />
                {cta.subcontractor.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
