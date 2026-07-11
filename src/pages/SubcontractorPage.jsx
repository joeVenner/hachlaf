import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TypeformEmbed from '../components/TypeformEmbed';

/**
 * Dedicated subcontractor application page.
 *
 * Embeds the Typeform application form fullscreen-style below a compact
 * header, so the form itself is the primary focus of the page.
 */
export default function SubcontractorPage({ content, logoSrc }) {
  // Ensure the page starts at the top when landing from another route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = content.subcontractor;

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col">
      {/* Simple header for the page */}
      <header className="relative z-[100] h-16 bg-white border-b border-black/5 shadow-sm flex-shrink-0">
        <div className="site-container h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Hachlaf Akhawayne"
              className="h-10 w-auto object-contain"
            />
            <span className="font-display font-bold text-lg text-brand-navy">
              Hachlaf.
            </span>
          </Link>

          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backLabel}
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Embedded form — fills remaining viewport */}
        <section className="flex-1 w-full">
          <TypeformEmbed url={t.formUrl} liveId={t.formLiveId} title={t.title} />
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="relative z-[100] border-t border-black/5 py-4 bg-white flex-shrink-0">
        <div className="site-container flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="body-small text-brand-muted">{content.footer.legal}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-navy hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backLabel}
          </Link>
        </div>
      </footer>

      {/* Mobile fallback link */}
      <p className="py-4 text-center body-small text-brand-muted bg-white sm:hidden">
        {t.formFallback}{' '}
        <a
          href={t.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-cyan hover:text-brand-navy transition-colors"
        >
          {t.openExternal}
        </a>
      </p>
    </div>
  );
}
