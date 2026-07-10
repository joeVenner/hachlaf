import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

/**
 * Contact form section.
 *
 * Layout: title block on the left, form on the right.
 * Collects name, company and message, then lets the visitor send the inquiry
 * either via WhatsApp click-to-chat or a pre-filled email (mailto:).
 *
 * Both transports are client-side and require no backend; the user still taps
 * the final send button inside their WhatsApp/email app.
 */
export default function ContactSection({ contact }) {
  const [form, setForm] = useState({ name: '', company: '', message: '' });
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    const { name, company, message } = form;
    if (!name.trim() || !company.trim() || !message.trim()) {
      setError(contact.requiredError);
      return false;
    }
    return true;
  };

  const composeBody = () => {
    const { name, company, message } = form;
    return `Bonjour,\n\nJe suis ${name.trim()} de la société ${company.trim()}.\n\n${message.trim()}\n\nCordialement,\n${name.trim()}`;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const text = encodeURIComponent(composeBody());
    const url = `https://wa.me/${contact.whatsappNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(contact.emailSubject);
    const body = encodeURIComponent(composeBody());
    const mailto = `mailto:${contact.emailAddress}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            <span className="eyebrow">{contact.eyebrow}</span>
            <h2 className="heading-2 font-display text-brand-navy mb-4">
              {contact.title}
            </h2>
            <p className="body-large text-brand-muted">
              {contact.subtitle}
            </p>

            {/* Direct contact info */}
            <div className="mt-8 space-y-4">
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block body-small text-brand-muted hover:text-brand-navy transition-colors"
              >
                <span className="block font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">WhatsApp</span>
                +{contact.whatsappNumber}
              </a>
              <a
                href={`mailto:${contact.emailAddress}`}
                className="block body-small text-brand-muted hover:text-brand-navy transition-colors"
              >
                <span className="block font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">Email</span>
                {contact.emailAddress}
              </a>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-light p-6 md:p-8"
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-display font-bold uppercase tracking-wider text-brand-navy">
                    {contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    required
                    className="input-field"
                    placeholder={contact.nameLabel}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-company" className="text-sm font-display font-bold uppercase tracking-wider text-brand-navy">
                    {contact.companyLabel}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    required
                    className="input-field"
                    placeholder={contact.companyLabel}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-display font-bold uppercase tracking-wider text-brand-navy">
                  {contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={update('message')}
                  required
                  rows={4}
                  className="textarea-field"
                  placeholder={contact.messageLabel}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-1">
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="btn-whatsapp"
                >
                  <MessageCircle className="w-5 h-5" />
                  {contact.whatsappButton}
                </button>

                <button
                  type="button"
                  onClick={sendEmail}
                  className="btn-outline-dark w-full justify-center"
                >
                  <Mail className="w-5 h-5" />
                  {contact.emailButton}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
