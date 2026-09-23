import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brand';

export const SalemAtelierBanner: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-[#09090d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Salem Boutique */}
          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/20 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#ff62a6] font-semibold">
                VISIT THE ATELIER
              </span>
              <h4 className="font-serif text-lg text-white font-normal mt-0.5">Salem Boutique</h4>
              <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                {BRAND_CONFIG.address.complex}, {BRAND_CONFIG.address.road}, {BRAND_CONFIG.address.landmark}, {BRAND_CONFIG.address.locality}, Salem - 636 005
              </p>
              <Link to="/contact" className="inline-flex items-center gap-1 text-[11px] text-[#fbbf24] hover:underline mt-2 font-medium">
                <span>Directions & Boutique Hours</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Worldwide Courier */}
          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-semibold">
                GLOBAL LOGISTICS
              </span>
              <h4 className="font-serif text-lg text-white font-normal mt-0.5">Worldwide Courier</h4>
              <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                Insured express delivery to USA, UK, Canada, Australia, Singapore, Malaysia, UAE, and all across India.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-300 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Tamper-Proof Luxury Packaging</span>
              </div>
            </div>
          </div>

          {/* Card 3: Direct Artisan Consultation */}
          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 text-white border border-white/15 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">
                DIRECT DESIGNER LINE
              </span>
              <h4 className="font-serif text-lg text-white font-normal mt-0.5">Consult Our Designers</h4>
              <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                Call or WhatsApp our bridal stylists directly for fabric samples, blouse necklines, and bridal orders.
              </p>
              <p className="text-xs font-semibold text-white mt-2">
                {BRAND_CONFIG.phones[0]} • {BRAND_CONFIG.phones[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
