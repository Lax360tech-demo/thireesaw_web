import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { TermsConsent } from './TermsConsent';

const STORAGE_SESSION_KEY = 'thireeshaw_contact_popup_shown';
const ENQUIRIES_STORAGE_KEY = 'thireeshaw_enquiries';

export const ContactPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Bespoke Bridal Blouse',
    message: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Only check and show once per browser session
    const hasBeenShown = sessionStorage.getItem(STORAGE_SESSION_KEY);
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lock background body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_SESSION_KEY, 'true');
    setIsOpen(false);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid contact/WhatsApp number';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please let us know what you would like to design';
    }
    if (!termsAccepted) {
      errs.terms = 'Please accept the Terms & Conditions and Privacy Policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newEnquiry = {
        id: `ENQ-${Date.now().toString().slice(-6)}`,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'Not specified',
        service: formData.service,
        message: formData.message.trim(),
        source: 'First-Visit Welcome Popup',
        termsAccepted: true,
        status: 'New',
        createdAt: new Date().toISOString()
      };

      const existingRaw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      const enquiries = existingRaw ? JSON.parse(existingRaw) : [];
      enquiries.unshift(newEnquiry);
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));

      // Dispatch event to update Admin enquiries in real time if open
      window.dispatchEvent(new CustomEvent('thireeshaw_enquiry_added', { detail: newEnquiry }));

      setSubmitted(true);
      sessionStorage.setItem(STORAGE_SESSION_KEY, 'true');

      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      console.error('Failed to save enquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal / Mobile Bottom Sheet Card */}
      <div className="relative w-full max-w-lg max-h-[92dvh] sm:max-h-[90vh] flex flex-col bg-[#0d0d12] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 transition-transform duration-300">
        {/* Top ambient luxury accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff2a85] via-[#fbbf24] to-[#ff2a85] shrink-0" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
          aria-label="Close welcome enquiry popup"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
              THANK YOU FOR REACHING OUT
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto font-light">
              Your boutique enquiry has been registered with our Salem Atelier. Our master artisan will reach out to you on WhatsApp or call shortly.
            </p>
            <div className="pt-2 text-xs text-[#fbbf24] font-medium tracking-widest uppercase">
              U THINK V CREATE
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
            {/* Header branding */}
            <div className="text-center mb-4 pr-6 sm:pr-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[11px] font-semibold text-[#ff62a6] tracking-widest uppercase mb-2">
                <span>BESPOKE BRIDAL & EMBROIDERY</span>
              </div>
              <h2 id="contact-popup-title" className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                LET'S CREATE SOMETHING BEAUTIFUL
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1.5 font-light">
                Have a custom blouse, bridal styling or boutique enquiry? Share your details and our Salem atelier will craft your vision.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Full Name <span className="text-[#ff2a85]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sundaram"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full max-w-full box-border px-3.5 py-2.5 rounded-lg bg-white/5 border ${
                    errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#fbbf24]'
                  } text-white placeholder-gray-500 text-base sm:text-sm outline-none transition-colors`}
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Phone / WhatsApp <span className="text-[#ff2a85]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 98653 66447"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full max-w-full box-border px-3.5 py-2.5 rounded-lg bg-white/5 border ${
                      errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#fbbf24]'
                    } text-white placeholder-gray-500 text-base sm:text-sm outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Email <span className="text-gray-500 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full max-w-full box-border px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white placeholder-gray-500 text-base sm:text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Craft / Service Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full max-w-full box-border px-3.5 py-2.5 rounded-lg bg-[#14141c] border border-white/10 focus:border-[#fbbf24] text-white text-base sm:text-sm outline-none transition-colors cursor-pointer"
                >
                  <option value="Bespoke Bridal Blouse">Bespoke Bridal Blouse (Hand Zardosi / Aari)</option>
                  <option value="Pattu Blouse Embroidery">Pattu Blouse Embroidery Work</option>
                  <option value="Pure Silk Saree Consultation">Pure Silk Saree Inquiry</option>
                  <option value="Designer Salwar / Gagra">Designer Salwar / Wedding Gagra</option>
                  <option value="Temple & Bridal Jewellery">Temple & Bridal Jewellery</option>
                  <option value="Worldwide Courier / Bulk Orders">Worldwide Courier / International Dispatch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Your Requirements / Vision <span className="text-[#ff2a85]">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your event date, neckline, fabric preference, or questions..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full max-w-full box-border px-3.5 py-2 rounded-lg bg-white/5 border ${
                    errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#fbbf24]'
                  } text-white placeholder-gray-500 text-base sm:text-sm outline-none transition-colors resize-none`}
                />
                {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
              </div>

              {/* Terms & Conditions Consent */}
              <TermsConsent
                checked={termsAccepted}
                onChange={(val) => {
                  setTermsAccepted(val);
                  if (errors.terms) {
                    const newErrs = { ...errors };
                    delete newErrs.terms;
                    setErrors(newErrs);
                  }
                }}
                error={errors.terms}
                compact
              />

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-[0_4px_15px_rgba(255,42,133,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'SENDING ENQUIRY...' : 'SUBMIT ENQUIRY'}</span>
                </button>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Continue browsing
                  </button>
                  <a
                    href={`https://wa.me/919865366447?text=${encodeURIComponent(
                      'Hi Thireeshaw Designers, I would like to inquire about customized blouses and bridal collections.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#25D366] hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
