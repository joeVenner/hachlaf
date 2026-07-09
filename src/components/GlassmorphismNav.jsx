import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * Full-width glassmorphism navigation bar.
 *
 * Skanska spec:
 * - fixed top, z-50, height 64px
 * - background transparent at hero, white 91% + blur(30px) after scroll
 * - centered logo, nav links, primary CTA
 * - mobile hamburger drawer
 */
export default function GlassmorphismNav({ nav, logoSrc, lang, setLang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = isScrolled ? 'text-brand-navy' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-brand-cyan' : 'hover:text-brand-cyan';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-black/5 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logoSrc}
            alt="Hachlaf Akhawayne"
            className="h-10 w-auto object-contain"
          />
          <span
            className={`font-display font-bold text-lg tracking-tight transition-colors ${
              isScrolled ? 'text-brand-navy' : 'text-white'
            }`}
          >
            Hachlaf.
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`font-display text-[15px] font-semibold tracking-wide transition-colors ${textColor} ${hoverColor}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language toggle */}
          <div
            className={`flex items-center rounded-full p-1 border ${
              isScrolled ? 'border-brand-muted/30' : 'border-white/30'
            }`}
          >
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                lang === 'en'
                  ? isScrolled
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-brand-navy'
                  : isScrolled
                  ? 'text-brand-muted'
                  : 'text-white/80'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                lang === 'fr'
                  ? isScrolled
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-brand-navy'
                  : isScrolled
                  ? 'text-brand-muted'
                  : 'text-white/80'
              }`}
            >
              FR
            </button>
          </div>

          <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
            {nav.cta}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-brand-navy' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-navy' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 glass border-b border-black/5 shadow-lg">
          <nav className="flex flex-col px-4 py-5 gap-4">
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="font-display text-base font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {nav.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-black/5">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  lang === 'en' ? 'bg-brand-navy text-white' : 'text-brand-muted'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  lang === 'fr' ? 'bg-brand-navy text-white' : 'text-brand-muted'
                }`}
              >
                FR
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
