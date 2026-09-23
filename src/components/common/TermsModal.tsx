import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  onReviewed?: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onReviewed
}) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reset scroll detection when modal opens
  useEffect(() => {
    if (isOpen) {
      // If already marked as reviewed in this session, keep true
      const alreadyReviewed = sessionStorage.getItem('thireeshaw_terms_reviewed') === 'true';
      if (alreadyReviewed) {
        setScrolledToBottom(true);
      }
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // Trigger when scrolled to within 25px of the bottom
    if (scrollTop + clientHeight >= scrollHeight - 25) {
      if (!scrolledToBottom) {
        setScrolledToBottom(true);
        sessionStorage.setItem('thireeshaw_terms_reviewed', 'true');
        onReviewed?.();
      }
    }
  };

  const handleAccept = () => {
    sessionStorage.setItem('thireeshaw_terms_reviewed', 'true');
    onReviewed?.();
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col bg-[#0d0d14] border-t sm:border border-white/20 rounded-t-3xl sm:rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-slideUp">
        {/* Top Accent Luxury Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff2a85] via-[#fbbf24] to-[#ff2a85]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0d0d14]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#ff62a6] font-semibold block">
                ATELIER POLICIES & ETHICAL CRAFT
              </span>
              <h2 id="terms-modal-title" className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                TERMS & CONDITIONS
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close Terms and Conditions"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Instruction Ribbon if not yet at bottom */}
        {!scrolledToBottom && (
          <div className="bg-[#fbbf24]/15 border-b border-[#fbbf24]/30 px-4 py-2 text-xs text-[#fbbf24] flex items-center justify-between shrink-0 animate-pulse">
            <span className="font-medium">Please scroll through to the bottom to acknowledge the terms</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        )}

        {/* Scrollable Terms Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6 text-gray-300 text-xs sm:text-sm font-light leading-relaxed select-text"
        >
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-400">
            <strong className="text-white">Effective Date:</strong> January 2026 |{' '}
            <strong className="text-white">Governing Brand:</strong> {BRAND_CONFIG.name} ({BRAND_CONFIG.address.city}, Tamil Nadu, India).
            By ordering bespoke couture, ready collections, or inquiring via our atelier digital platform, you agree to the conditions stated below.
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              1. SCOPE & ATELIER CRAFTSMANSHIP
            </h3>
            <p>
              {BRAND_CONFIG.name} operates as a luxury artisanal fashion house based in Salem, Tamil Nadu, specializing in handcrafted bridal blouses, custom Aari & Zardosi embroidery, pure Kanchipuram silk sarees, designer salwar suits, wedding gagras, and temple bridal jewellery.
            </p>
            <p>
              Each couture piece is individually handcrafted by skilled hereditary artisans. Because hand embroidery and handloom weaving are bespoke arts, minor variations in motif tension, thread shades, bead placements, and weaving textures are celebrated hallmarks of genuine authenticity rather than manufacturing defects.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              2. BESPOKE CUSTOM MEASUREMENTS & FIT CONSULTATION
            </h3>
            <p>
              For custom bridal blouses and tailored garments, clients are requested to submit accurate bodily measurements either through our online Custom Studio or via WhatsApp consultation with our Salem master tailors.
            </p>
            <p>
              If a client opts for our &ldquo;Share Measurements Later via WhatsApp&rdquo; feature, production commences upon mutual confirmation of measurements. We provide complimentary fit guidance and stitch in safety margin allowances inside side seams to accommodate future personal adjustments.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              3. PRODUCTION TIMELINES & BRIDAL SCHEDULING
            </h3>
            <p>
              Standard handcrafted bridal orders require a craft gestation window of 10 to 21 business days, depending on embroidery complexity. Ready-to-ship sarees and jewellery dispatch within 24 to 48 hours. Express bridal commissions for urgent wedding dates must be mutually scheduled in advance with our atelier director.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              4. PRICING, INVOICING & PAYMENT VERIFICATION
            </h3>
            <p>
              All prices displayed are in Indian Rupees (INR ₹) inclusive of applicable goods taxes. Payments through UPI, Net Banking, credit/debit cards, and bank wire transfers are processed via secure encrypted payment channels. An official digital atelier tax invoice and order summary are generated upon payment confirmation.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              5. WORLDWIDE COURIER DISPATCH & SAFE TRANSIT
            </h3>
            <p>
              We provide insured worldwide shipping from our Salem flagship showroom across all pincodes in India and internationally to the United States, United Kingdom, Canada, Singapore, Malaysia, UAE, Australia, and European destinations.
            </p>
            <p>
              Real-time courier consignment tracking numbers are dispatched via SMS, email, and WhatsApp upon parcel handover. International consignments may be subject to local customs duties and VAT as mandated by the destination country's regulations.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              6. BESPOKE RETURN, ALTERATION & CANCELLATION POLICY
            </h3>
            <p>
              Because customized bridal blouses and bespoke tailored garments are cut and embroidered exclusively to individual body measurements, custom pieces cannot be returned for cash refunds.
            </p>
            <p>
              However, your satisfaction is our foremost priority:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li><strong>Complimentary Alterations:</strong> If you experience any fit variance, our Salem master tailors will alter the piece with priority turnaround.</li>
              <li><strong>Transit Damage or Defect:</strong> In the rare instance of parcel damage during courier transit, notify us within 48 hours with parcel unpacking photographs for an immediate replacement or store credit.</li>
              <li><strong>Standard Saree / Jewellery Exchange:</strong> Unaltered, unstitched sarees and jewellery with intact original security tags can be exchanged within 7 days of delivery.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              7. INTELLECTUAL PROPERTY & DESIGN RIGHTS
            </h3>
            <p>
              All photography, embroidery motifs, blouse design patterns, catalog collections, brand marks, and digital assets published by {BRAND_CONFIG.name} are protected under copyright and intellectual property laws. Unauthorized reproduction or commercial imitation is strictly prohibited.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide">
              8. ATELIER GRIEVANCE & CONTACT ASSISTANCE
            </h3>
            <p>
              For questions concerning orders, bespoke designs, alteration requests, or shipping inquiries, please contact our Salem atelier:
            </p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
              <p><strong className="text-white">Flagship Atelier:</strong> {BRAND_CONFIG.name}, {BRAND_CONFIG.address.full}.</p>
              <p><strong className="text-white">Phone / WhatsApp:</strong> +91 {BRAND_CONFIG.phones[0]} / +91 {BRAND_CONFIG.phones[1]}</p>
              <p><strong className="text-white">Email:</strong> {BRAND_CONFIG.email}</p>
            </div>
          </section>

          {/* Distinct End Marker */}
          <div className="pt-6 pb-2 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold tracking-widest text-[#fbbf24] uppercase">
              <span>— End of Terms & Conditions —</span>
            </div>
          </div>
        </div>

        {/* Modal Footer / Acceptance CTA */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#09090e] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <div className="text-[11px] text-gray-400 text-center sm:text-left">
            {scrolledToBottom ? (
              <span className="text-[#fbbf24] font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#fbbf24]" />
                Terms successfully reviewed. You can now accept.
              </span>
            ) : (
              <span>Scroll to the end to enable acceptance</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/15 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              disabled={!scrolledToBottom}
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] text-black font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:brightness-110 flex items-center justify-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>I Have Read & Accept</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
