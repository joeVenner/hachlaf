import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Mail, MessageCircle } from 'lucide-react';

/**
 * Bottom call-to-action and contact section.
 *
 * Displays the headline CTA and buttons, followed by the contact form.
 * The form can be sent via WhatsApp click-to-chat or a pre-filled email.
 */
export default function CTASection({ cta, contact }) {
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
    <section id="contact" className="py-16 md:py-20 bg-brand-navy">
      <div className="site-container">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="heading-2 font-display text-white mb-4">
            {cta.title}
          </h2>
          <p className="body-large text-white/80 mb-8">
            {cta.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact-form" className="btn-primary inline-flex">
              {cta.button}
              <ArrowRight className="w-5 h-5" />
            </a>

            {cta.subcontractor && (
              <Link
                to={cta.subcontractor.to}
                className="btn-secondary inline-flex"
              >
                <Briefcase className="w-4 h-4" />
                {cta.subcontractor.label}
              </Link>
            )}
          </div>
        </div>

        {/* Contact form */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-display font-bold uppercase tracking-wider text-white/90">
                  {contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  required
                  className="input-field input-field-dark"
                  placeholder={contact.nameLabel}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-sm font-display font-bold uppercase tracking-wider text-white/90">
                  {contact.companyLabel}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  required
                  className="input-field input-field-dark"
                  placeholder={contact.companyLabel}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-display font-bold uppercase tracking-wider text-white/90">
                {contact.messageLabel}
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={update('message')}
                required
                rows={4}
                className="textarea-field textarea-field-dark"
                placeholder={contact.messageLabel}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 font-medium" role="alert">
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
                className="btn-outline-light w-full justify-center"
              >
                <Mail className="w-5 h-5" />
                {contact.emailButton}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
