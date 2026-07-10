/**
 * Client/partner logo showcase.
 * Displays partner logos in a clean 4-column grid of white cards.
 */
export default function PartnersCarousel({ partners }) {
  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="site-container">
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow">{partners.eyebrow}</span>
          <h2 className="heading-2 font-display text-brand-navy">
            {partners.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partners.logos.map((logo) => (
            <div
              key={logo.name}
              className="bg-white card-sharp p-6 md:p-8 flex flex-col items-center justify-between shadow-sm"
            >
              <div className="flex-1 flex items-center justify-center w-full h-32 md:h-40">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-sm md:text-base font-display font-bold text-brand-navy uppercase tracking-wide text-center">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
