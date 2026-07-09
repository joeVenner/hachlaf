import { ArrowRight } from 'lucide-react';

/**
 * Bottom call-to-action section.
 */
export default function CTASection({ cta }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-navy text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-2 font-display text-white mb-6">
          {cta.title}
        </h2>
        <p className="body-large text-white/80 mb-10">
          {cta.body}
        </p>
        <a href="#contact" className="btn-primary inline-flex">
          {cta.button}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
