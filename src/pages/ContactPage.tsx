import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';
import { useToast } from '../context/ToastContext';
import { TermsConsent } from '../components/common/TermsConsent';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bridal Blouse Customization',
    message: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your enquiry';
    } else if (formData.message.trim().length < 8) {
      errs.message = 'Message must be at least 8 characters long';
    }
    if (!termsAccepted) {
      errs.terms = 'Please accept the Terms & Conditions and Privacy Policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      if (!termsAccepted) {
        addToast('Terms Acceptance Required', 'Please review and accept our Terms & Conditions to submit your enquiry.', 'error');
      } else {
        addToast('Validation Error', 'Please check the highlighted fields', 'error');
      }
      return;
    }

    // Save to localStorage for Admin Enquiries view
    try {
      const existing = JSON.parse(localStorage.getItem('thireeshaw_enquiries') || '[]');
      const newEnquiry = {
        id: `ENQ-${Date.now().toString().slice(-5)}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'New'
      };
      localStorage.setItem('thireeshaw_enquiries', JSON.stringify([newEnquiry, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
    addToast('Enquiry Sent', 'Thank you! Your enquiry has been received.', 'success');
  };

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff2a85]/15 border border-[#ff2a85]/30 text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
          <span>CONNECT WITH ATELIER</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight">
          VISIT OR CONTACT US
        </h1>
        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#fbbf24]">
          &ldquo;{BRAND_CONFIG.tagline}&rdquo;
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-16 h-[2px] bg-[#ff2a85]" />
          <div className="w-4 h-[2px] bg-[#fbbf24]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Action CTAs (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#101015] border border-white/10 shadow-2xl space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-white">
                  {BRAND_CONFIG.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-[#fbbf24] font-semibold mt-1">
                  {BRAND_CONFIG.tagline}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-light">
                  {BRAND_CONFIG.subtitle}
                </p>
              </div>

              {/* Worldwide courier badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-xs text-[#fbbf24]">
                <Globe className="w-4 h-4 shrink-0" />
                <span className="font-semibold uppercase tracking-wider">WORLDWIDE COURIER AVAILABLE</span>
              </div>

              <div className="space-y-4 pt-3 border-t border-white/10 text-xs sm:text-sm">
                {/* Phones */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#fbbf24] border border-white/10 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-0.5">
                      TELEPHONE
                    </span>
                    <a href={`tel:${BRAND_CONFIG.phones[0].replace(/[^0-9]/g, '')}`} className="text-white hover:text-[#fbbf24] font-medium block">
                      +91 {BRAND_CONFIG.phones[0]}
                    </a>
                    <a href={`tel:${BRAND_CONFIG.phones[1].replace(/[^0-9]/g, '')}`} className="text-white hover:text-[#fbbf24] font-medium block mt-0.5">
                      +91 {BRAND_CONFIG.phones[1]}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#ff2a85] border border-white/10 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-0.5">
                      EMAIL ATELIER
                    </span>
                    <a href={`mailto:${BRAND_CONFIG.email}`} className="text-white hover:text-[#ff62a6] underline font-medium">
                      {BRAND_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#fbbf24] border border-white/10 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block mb-0.5">
                      STUDIO & BOUTIQUE
                    </span>
                    <p className="text-gray-300 font-light leading-relaxed">
                      {BRAND_CONFIG.address.complex},<br />
                      {BRAND_CONFIG.address.road},<br />
                      {BRAND_CONFIG.address.landmark},<br />
                      {BRAND_CONFIG.address.locality},<br />
                      {BRAND_CONFIG.address.city} - {BRAND_CONFIG.address.pincode}, Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${BRAND_CONFIG.phones[0].replace(/[^0-9]/g, '')}`}
                  className="btn-press py-3 px-4 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Call Us</span>
                </a>

                <a
                  href={BRAND_CONFIG.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Official Instagram Atelier Channel Button */}
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit THIREESHAW DESIGNERS on Instagram"
                className="btn-press w-full py-3.5 px-4 rounded-xl border border-[#ff2a85]/40 bg-[#ff2a85]/10 hover:bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#ff2a85]/20 group cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Visit Us On Instagram</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Message Form (Span 7) */}
          <div className="lg:col-span-7 bg-[#101015] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <span className="text-xs uppercase tracking-widest text-[#ff62a6] font-semibold">
              DROP AN ENQUIRY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1 mb-2">
              Send a Message to Our Salem Designers
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light mb-8">
              Whether you need bridal consultation, fabric advice, or custom order timelines, our boutique team will respond promptly.
            </p>

            {isSubmitted ? (
              <div className="py-12 px-6 rounded-2xl bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#ff2a85]/20 text-[#ff2a85] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-white">Thank You! Your enquiry has been received.</h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Our Salem atelier has recorded your message. We look forward to creating your dream design.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'Bridal Blouse Customization',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-white/20 text-xs uppercase tracking-widest text-white hover:bg-white/10"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Sangeetha Raman"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-white/15 focus:border-[#ff2a85]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. 98653 66447"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#ff2a85]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. yourname@gmail.com"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#ff2a85]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Subject / Service</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#15151c] border border-white/15 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                    >
                      <option value="Bridal Blouse Customization">Bridal Blouse Customization</option>
                      <option value="Pattu Blouse Embroidery">Pattu Blouse Embroidery</option>
                      <option value="Bridal Saree Consultation">Bridal Saree Consultation</option>
                      <option value="Wedding Gagra / Lehenga">Wedding Gagra / Lehenga</option>
                      <option value="Salwar Custom Set">Salwar Custom Set</option>
                      <option value="Worldwide Courier Inquiry">Worldwide Courier Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1.5 font-medium">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell us about your event, wedding date, or any specific embroidery pattern you love..."
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/15 focus:border-[#ff2a85]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions Consent */}
                <TermsConsent
                  checked={termsAccepted}
                  onChange={(val) => {
                    setTermsAccepted(val);
                    if (errors.terms) {
                      const next = { ...errors };
                      delete next.terms;
                      setErrors(next);
                    }
                  }}
                  error={errors.terms}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND ENQUIRY</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
