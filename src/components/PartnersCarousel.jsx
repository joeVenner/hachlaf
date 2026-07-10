/**
 * Client/partner logo showcase.
 * Displays verified client logos in a clean responsive wall.
 */
export default function PartnersCarousel({ partners }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-end mb-12 md:mb-16">
          <div>
            <span className="eyebrow">{partners.eyebrow}</span>
            <h2 className="heading-2 font-display text-brand-navy">
              {partners.title}
            </h2>
          </div>
          <p className="body-main text-brand-muted max-w-xl lg:justify-self-end">
            {partners.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 border-l border-t border-brand-navy/10">
          {partners.logos.map((logo) => (
            <div
              key={logo.name}
              className="group min-h-[190px] bg-white border-r border-b border-brand-navy/10 p-5 md:p-6 flex flex-col items-center justify-between transition-colors duration-300 hover:bg-brand-light"
            >
              <div className="flex-1 flex items-center justify-center w-full h-24 md:h-28">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-20 md:max-h-24 max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pt-5 text-center">
                <p className="text-xs md:text-sm font-display font-extrabold text-brand-navy uppercase tracking-[0.12em]">
                  {logo.name}
                </p>
                {logo.detail && (
                  <p className="mt-1 text-[11px] leading-snug text-brand-muted">
                    {logo.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
