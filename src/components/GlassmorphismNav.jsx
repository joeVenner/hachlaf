import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * Full-width glassmorphism navigation bar.
 *
 * Handles both in-page anchor links (#id) and React Router routes (/path).
 */
export default function GlassmorphismNav({ nav, lang, setLang }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On the subcontractor page we are not over a dark hero, so keep the solid bar.
  const isSubcontractorPage = location.pathname === '/sous-traitant';
  const solid = isScrolled || isSubcontractorPage;

  const textColor = solid ? 'text-brand-navy' : 'text-white';
  const hoverColor = 'hover:text-brand-cyan';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500 ${
        solid ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Left Nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1">
          {nav.links.slice(0, Math.ceil(nav.links.length / 2)).map((link) => (
            <NavLink
              key={link.id || link.to}
              link={link}
              className={`font-display text-[14px] font-semibold tracking-wide transition-colors uppercase ${textColor} ${hoverColor}`}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Link to="/" className="pointer-events-auto flex items-center justify-center">
            <span
              className={`font-display font-extrabold text-xl tracking-wider uppercase transition-colors ${
                solid ? 'text-brand-navy' : 'text-white'
              }`}
            >
              HACHLAF.
            </span>
          </Link>
        </div>

        {/* Right Nav & Actions */}
        <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
          <nav className="flex items-center gap-6">
            {nav.links.slice(Math.ceil(nav.links.length / 2)).map((link) => (
              <NavLink
                key={link.id || link.to}
                link={link}
                className={`font-display text-[14px] font-semibold tracking-wide transition-colors uppercase ${textColor} ${hoverColor}`}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          <div
            className={`flex items-center rounded-full p-1 border ${
              solid ? 'border-brand-muted/30' : 'border-white/30'
            }`}
          >
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                lang === 'en'
                  ? solid
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-brand-navy'
                  : solid
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
                  ? solid
                    ? 'bg-brand-navy text-white'
                    : 'bg-white text-brand-navy'
                  : solid
                  ? 'text-brand-muted'
                  : 'text-white/80'
              }`}
            >
              FR
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex-1 flex justify-end">
          <button
            className="p-2 -mr-2 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${solid ? 'text-brand-navy' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${solid ? 'text-brand-navy' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 glass border border-black/5 shadow-lg rounded-lg mx-4">
          <nav className="flex flex-col px-4 py-5 gap-4">
            {nav.links.map((link) => (
              <NavLink
                key={link.id || link.to}
                link={link}
                className="font-display text-base font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
                onClick={() => setMobileOpen(false)}
              />
            ))}
            <div className="pt-2">
              <Link
                to="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {nav.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
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

/**
 * Renders an anchor tag for in-page links or a React Router Link for routes.
 */
function NavLink({ link, className, onClick }) {
  if (link.to) {
    return (
      <Link to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={`#${link.id}`}
      className={className}
      onClick={onClick}
    >
      {link.label}
    </a>
  );
}
