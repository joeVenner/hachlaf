import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


/**
 * Suffolk-style navigation bar.
 *
 * Embedded over the hero with full-width dropdown submenus on hover,
 * split logo-center layout with uppercase nav items.
 */
export default function SuffolkNav({ nav, lang, setLang, logoSrc }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isSubcontractorPage = location.pathname === '/sous-traitant';

  // Split links into left and right halves
  const half = Math.ceil(nav.links.length / 2);
  const leftLinks = nav.links.slice(0, half);
  const rightLinks = nav.links.slice(half);

  const textColor = isSubcontractorPage ? 'text-brand-navy' : 'text-white';
  const hoverColor = 'hover:text-brand-cyan';
  const shellClass = isSubcontractorPage
    ? 'border border-brand-navy/10 bg-white/95 shadow-lg md:backdrop-blur-[18px]'
    : 'border border-white/10 bg-transparent';
  const langInactiveClass = isSubcontractorPage ? 'text-brand-navy/60' : 'text-white/70';
  const langWrapClass = isSubcontractorPage
    ? 'border-brand-navy/20 bg-brand-navy/5'
    : 'border-white/35 bg-white/5';
  const mobileButtonColor = isSubcontractorPage ? 'text-brand-navy' : 'text-white';

  return (
    <header className="absolute top-3 md:top-4 left-0 right-0 z-50 site-container">
      <div
        className={`h-[4rem] lg:h-[4.75rem] relative z-20 transition-all duration-300 ease-in-out flex items-center justify-between rounded-none ${shellClass}`}
      >
        {/* LEFT NAV */}
        <nav className="hidden lg:flex items-center gap-0 flex-1">
          {leftLinks.map((link) => (
            <NavItem
              key={link.id || link.to}
              link={link}
              textColor={textColor}
              hoverColor={hoverColor}
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
              isActive={activeDropdown === link.label}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Link to="/" className="pointer-events-auto flex items-center justify-center" aria-label="Hachlaf Akhawayne">
            <img
              src={logoSrc}
              alt="Hachlaf Akhawayne"
              className="h-12 md:h-16 w-auto max-w-[11rem] object-contain"
            />
          </Link>
        </div>

        {/* RIGHT NAV + LANG */}
        <div className="hidden lg:flex items-center justify-end gap-0 flex-1">
          <nav className="flex items-center">
            {rightLinks.map((link) => (
              <NavItem
                key={link.id || link.to}
                link={link}
                textColor={textColor}
                hoverColor={hoverColor}
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
                isActive={activeDropdown === link.label}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          {/* Lang switcher */}
          <div className={`flex items-center ml-3 mr-3 rounded-full p-0.5 border ${langWrapClass}`}>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                lang === 'en' ? 'bg-white text-brand-navy' : langInactiveClass
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                lang === 'fr' ? 'bg-white text-brand-navy' : langInactiveClass
              }`}
            >
              FR
            </button>
          </div>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 ${mobileButtonColor}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 bg-white/95 md:backdrop-blur-xl border border-brand-navy/10 rounded-none shadow-xl p-6">
          <nav className="flex flex-col gap-3">
            {nav.links.map((link) => (
              <NavLink
                key={link.id || link.to}
                link={link}
                className="font-display text-sm font-semibold uppercase text-brand-navy hover:text-brand-cyan transition-colors min-h-[44px] flex items-center py-2"
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-brand-navy/10">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                lang === 'en' ? 'bg-brand-navy text-white' : 'text-brand-navy/60'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                lang === 'fr' ? 'bg-brand-navy text-white' : 'text-brand-navy/60'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ link, textColor, hoverColor, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavLink
        link={link}
        className={`font-display text-[13px] font-semibold tracking-wider uppercase transition-colors px-2.5 xl:px-3 lg:py-4 flex items-center gap-1 ${textColor} ${hoverColor}`}
        onClick={onClick}
      />
    </div>
  );
}

function NavLink({ link, className, onClick }) {
  const location = useLocation();

  if (link.id) {
    // Anchor link: navigate within page
    const isCurrentPage = location.pathname === '/';
    if (isCurrentPage) {
      return (
        <a href={`/#${link.id}`} className={className} onClick={onClick}>
          {link.label}
        </a>
      );
    } else {
      return (
        <Link to={`/#${link.id}`} className={className} onClick={onClick}>
          {link.label}
        </Link>
      );
    }
  }

  // React Router route
  return (
    <Link to={link.to} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}
