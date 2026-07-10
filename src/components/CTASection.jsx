import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const contactVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const contactItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Premium contact CTA section.
 *
 * Dark navy gradient background with a subtle blueprint texture, two-column
 * layout (intro + glass form), gold primary CTA, outline email CTA, and a
 * discreet WhatsApp text link. Inputs reveal sequentially on scroll.
 */
export default function CTASection({ contact }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const validate = () => {
    const { name, company, email, message } = form;
    if (!name.trim() || !company.trim() || !email.trim() || !message.trim()) {
      setError(contact.requiredError);
      return false;
    }
    return true;
  };

  const composeBody = () => {
    const { name, company, email, phone, projectType, budget, message } = form;
    const parts = [
      'Bonjour,',
      '',
      `Je suis ${name.trim()} de la société ${company.trim()}.`,
      `Email : ${email.trim()}${phone ? ` | Téléphone : ${phone.trim()}` : ''}`,
      projectType ? `Type de projet : ${projectType}` : '',
      budget ? `Budget estimé : ${budget}` : '',
      '',
      message.trim(),
      '',
      'Cordialement,',
      name.trim(),
    ];
    return parts.filter(Boolean).join('\n');
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

  const contactItems = [
    { icon: MapPin, label: contact.address },
    { icon: Phone, label: contact.phoneDisplay, href: `tel:${contact.phoneDisplay.replace(/\s/g, '')}` },
    { icon: Mail, label: contact.emailAddress, href: `mailto:${contact.emailAddress}` },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden pt-24 pb-24 md:pt-28 md:pb-28 bg-contact-gradient text-white"
    >
      {/* Subtle blueprint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      <div className="site-container relative z-10 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left column — premium introduction */}
          <motion.div
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="lg:col-span-5"
          >
            <motion.span
              variants={contactItemVariants}
              className="block text-[11px] md:text-xs font-display font-bold uppercase tracking-[0.22em] text-brand-orange mb-5"
            >
              {contact.eyebrowNew}
            </motion.span>

            <motion.h2
              variants={contactItemVariants}
              className="font-display text-white text-[clamp(3rem,5vw,5rem)] leading-[0.96] font-extrabold tracking-[-0.035em] mb-5"
            >
              {contact.titleNew}
            </motion.h2>

            <motion.p
              variants={contactItemVariants}
              className="text-lg md:text-xl leading-relaxed text-white/70 max-w-[440px] mb-9"
            >
              {contact.paragraph}
            </motion.p>

            <motion.ul
              variants={contactVariants}
              className="space-y-5"
            >
              {contactItems.map((item) => (
                <motion.li
                  key={item.label}
                  variants={contactItemVariants}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-0.5 text-white/40 group-hover:text-brand-orange transition-colors duration-300">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="body-main text-white/80 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="body-main text-white/80">
                      {item.label}
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right column — glass contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <motion.form
              variants={formContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              onSubmit={(e) => e.preventDefault()}
              className="glass-form p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-name" className="premium-label">
                    {contact.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    required
                    className="premium-input"
                    placeholder={contact.nameLabel}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-company" className="premium-label">
                    {contact.companyLabel}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    required
                    className="premium-input"
                    placeholder={contact.companyLabel}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-email" className="premium-label">
                    {contact.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                    className="premium-input"
                    placeholder={contact.emailLabel}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-phone" className="premium-label">
                    {contact.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="premium-input"
                    placeholder={contact.phoneLabel}
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-project" className="premium-label">
                    {contact.projectTypeLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="contact-project"
                      value={form.projectType}
                      onChange={update('projectType')}
                      className="premium-input premium-select appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {contact.projectTypeLabel}
                      </option>
                      {contact.projectTypes?.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <label htmlFor="contact-budget" className="premium-label">
                    {contact.budgetLabel}{' '}
                    <span className="text-white/40 font-normal">
                      {contact.optionalLabel}
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={update('budget')}
                      className="premium-input premium-select appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {contact.budgetLabel}
                      </option>
                      {contact.budgets?.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={formItemVariants} className="mt-5 md:mt-6">
                <label htmlFor="contact-message" className="premium-label">
                  {contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={update('message')}
                  required
                  rows={5}
                  className="premium-input premium-textarea"
                  placeholder={contact.messageLabel}
                />
              </motion.div>

              {error && (
                <motion.p
                  variants={formItemVariants}
                  className="mt-4 text-sm text-red-300 font-medium"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                variants={formItemVariants}
                className="mt-8 flex flex-col sm:flex-row items-stretch gap-4"
              >
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="btn-gold group flex-1 justify-center"
                >
                  {contact.quoteButton}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={sendEmail}
                  className="btn-outline-white group flex-1 justify-center"
                >
                  <Mail className="w-4 h-4" />
                  {contact.emailButton}
                </button>
              </motion.div>

              <motion.div
                variants={formItemVariants}
                className="mt-6 flex justify-center"
              >
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  {contact.whatsappLinkText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
