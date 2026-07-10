import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const footerColumnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const footerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="body-main text-brand-muted hover:text-brand-navy transition-colors duration-300"
    >
      {children}
    </a>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03H7.898v-2.909h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.475h-1.261c-1.243 0-1.63.776-1.63 1.572v1.888h2.773l-.443 2.909h-2.33V22C18.343 21.245 22 17.083 22 12.061z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ icon, className }) {
  if (icon === 'linkedin') return <LinkedInIcon className={className} />;
  if (icon === 'whatsapp') return <MessageCircle className={className} strokeWidth={1.8} />;
  if (icon === 'facebook') return <FacebookIcon className={className} />;
  if (icon === 'instagram') return <InstagramIcon className={className} />;
  return null;
}

/**
 * Premium site footer.
 *
 * Light warm gray background, 4-column grid, minimal typography and a
 * closing statement banner with an animated gold line above the footer.
 */
export default function Footer({ footer, logoSrc }) {
  return (
    <footer className="relative z-10 bg-[#F8F9FB]">
      {/* Compact closing statement */}
      {footer.tagline && footer.tagline.length > 0 && (
        <div className="site-container max-w-[1380px] mx-auto py-10 md:py-12 border-b border-black/5">
          <h2 className="font-display text-brand-navy text-[clamp(2rem,4.4vw,4.25rem)] leading-[1] font-extrabold tracking-[-0.035em]">
            {footer.tagline.map((line, i) => (
              <span key={i} className="block md:inline">
                {line}
                {i === 0 && ' '}
              </span>
            ))}
          </h2>
        </div>
      )}

      {/* Main footer grid */}
      <div className="site-container max-w-[1380px] mx-auto py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-10">
          {/* Logo + description + social */}
          <motion.div
            variants={footerColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <motion.a
              variants={footerItemVariants}
              href="#top"
              className="flex items-center gap-3 mb-6"
            >
              <img
                src={logoSrc}
                alt="Hachlaf Akhawayne"
                className="h-12 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-brand-navy">
                Hachlaf.
              </span>
            </motion.a>
            <motion.p
              variants={footerItemVariants}
              className="body-main text-brand-muted leading-relaxed max-w-sm mb-6"
            >
              {footer.description}
            </motion.p>
            {footer.socialLinks && footer.socialLinks.length > 0 && (
              <motion.div
                variants={footerItemVariants}
                className="flex items-center gap-3"
              >
                {footer.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-navy/5 text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300"
                  >
                    <SocialIcon icon={social.icon} className="w-4 h-4" />
                  </a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Company links */}
          <motion.div
            variants={footerColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <motion.h4
              variants={footerItemVariants}
              className="footer-heading"
            >
              {footer.companyLabel}
            </motion.h4>
            <motion.ul variants={footerColumnVariants} className="space-y-3">
              {footer.companyLinks?.map((link) => (
                <motion.li key={link.label} variants={footerItemVariants}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="body-main text-brand-muted hover:text-brand-navy transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services links */}
          <motion.div
            variants={footerColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <motion.h4
              variants={footerItemVariants}
              className="footer-heading"
            >
              {footer.servicesLabel}
            </motion.h4>
            <motion.ul variants={footerColumnVariants} className="space-y-3">
              {footer.servicesLinks?.map((link) => (
                <motion.li key={link.label} variants={footerItemVariants}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact details */}
          <motion.div
            variants={footerColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <motion.h4
              variants={footerItemVariants}
              className="footer-heading"
            >
              {footer.contactLabel}
            </motion.h4>
            <motion.ul variants={footerColumnVariants} className="space-y-4">
              <motion.li
                variants={footerItemVariants}
                className="flex items-start gap-3"
              >
                <MapPin
                  className="w-4 h-4 text-brand-muted mt-1 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="body-main text-brand-muted">
                  {footer.address}
                </span>
              </motion.li>
              <motion.li
                variants={footerItemVariants}
                className="flex items-center gap-3"
              >
                <Phone
                  className="w-4 h-4 text-brand-muted flex-shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href={`tel:${footer.phone.replace(/\s/g, '')}`}
                  className="body-main text-brand-muted hover:text-brand-navy transition-colors duration-300"
                >
                  {footer.phone}
                </a>
              </motion.li>
              <motion.li
                variants={footerItemVariants}
                className="flex items-center gap-3"
              >
                <Mail
                  className="w-4 h-4 text-brand-muted flex-shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href={`mailto:${footer.email}`}
                  className="body-main text-brand-muted hover:text-brand-navy transition-colors duration-300"
                >
                  {footer.email}
                </a>
              </motion.li>
              <motion.li
                variants={footerItemVariants}
                className="flex items-center gap-3"
              >
                <span className="w-4 h-4 flex items-center justify-center text-brand-muted flex-shrink-0"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="body-main text-brand-muted">
                  {footer.workingHours}
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/5">
        <div className="site-container max-w-[1380px] mx-auto py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="body-small text-brand-muted text-center md:text-left">
            {footer.legal}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#"
              className="body-small text-brand-muted hover:text-brand-navy transition-colors duration-300"
            >
              {footer.privacyLabel}
            </a>
            <a
              href="#"
              className="body-small text-brand-muted hover:text-brand-navy transition-colors duration-300"
            >
              {footer.termsLabel}
            </a>
            <span className="body-small text-brand-muted/70">
              {footer.credits}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
