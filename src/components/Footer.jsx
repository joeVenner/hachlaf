import { Phone, Mail, MapPin } from 'lucide-react';

/**
 * Site footer.
 *
 * 3-column layout:
 * - about + logo + social
 * - quick links
 * - contact info
 * Bottom bar: copyright + legal links.
 */
export default function Footer({ footer, logoSrc }) {
  return (
    <footer id="contact" className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* About */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-3 mb-6">
              <img
                src={logoSrc}
                alt="Hachlaf Akhawayne"
                className="h-12 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-brand-navy">
                Hachlaf.
              </span>
            </a>
            <p className="body-main text-brand-muted leading-relaxed max-w-sm">
              {footer.description}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-navy mb-6">
              {footer.linksLabel}
            </h4>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="body-main text-brand-muted hover:text-brand-navy transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-brand-navy mb-6">
              {footer.contactLabel}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange mt-1 flex-shrink-0" />
                <span className="body-main text-brand-muted">
                  {footer.contact.find((c) => c.label.toLowerCase().includes('siège') || c.label.toLowerCase().includes('headquarters'))?.value ||
                    '186, Hay Riad 2 — Midelt'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a
                  href="tel:0535360341"
                  className="body-main text-brand-muted hover:text-brand-navy transition-colors"
                >
                  {footer.contact.find((c) => c.label.toLowerCase().includes('tél') || c.label.toLowerCase().includes('phone'))?.value ||
                    '05 35 36 03 41'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a
                  href="mailto:h.hamza@stehachlaf.com"
                  className="body-main text-brand-muted hover:text-brand-navy transition-colors"
                >
                  {footer.contact.find((c) => c.label.toLowerCase().includes('e-mail') || c.label.toLowerCase().includes('email'))?.value ||
                    'h.hamza@stehachlaf.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-small text-brand-muted text-center md:text-left">
            {footer.legal}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="body-small text-brand-muted hover:text-brand-navy transition-colors">
              {footer.privacyLabel}
            </a>
            <a href="#" className="body-small text-brand-muted hover:text-brand-navy transition-colors">
              {footer.termsLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
