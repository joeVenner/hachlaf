import { ArrowRight } from 'lucide-react';

/**
 * Interactive service cards with hover background shift.
 *
 * Skanska spec:
 * - 4-5 cards in a row
 * - image + title + arrow icon
 * - hover shifts entire card background to brand navy
 * - sharp corners
 */
export default function ServiceCards({ serviceCards }) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <span className="eyebrow">{serviceCards.eyebrow}</span>
        <h2 className="heading-2 font-display text-brand-navy mb-12 md:mb-16">
          {serviceCards.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {serviceCards.items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group card-sharp bg-white block"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/10 transition-colors duration-300" />
              </div>

              <div className="p-5 flex items-center justify-between gap-4 bg-white group-hover:bg-brand-navy transition-colors duration-300">
                <h3 className="heading-5 font-display text-brand-navy group-hover:text-white transition-colors duration-300 leading-tight"
                >
                  {item.title}
                </h3>
                <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-brand-orange text-white group-hover:rotate-45 transition-transform duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
