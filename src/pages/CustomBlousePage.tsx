import React from 'react';
import { CustomBlouseStudio } from '../components/custom-blouse/CustomBlouseStudio';
import { Scissors, Globe, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const CustomBlousePage: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff2a85]/15 border border-[#ff2a85]/30 text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold mb-3">
          <span>BESPOKE BRIDAL ARTISTRY</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight">
          CUSTOMIZED WEDDING BLOUSES
        </h1>
        <p className="mt-3 font-serif italic text-lg sm:text-2xl text-[#fbbf24]">
          &ldquo;{BRAND_INFO.promise} • {BRAND_INFO.tagline}&rdquo;
        </p>
        <p className="mt-3 text-xs sm:text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          From traditional Kanchipuram pattu blouse embroidery to contemporary bridal cutwork, our master Salem artisans handcraft your dream blouse tailored to your precise measurements.
        </p>
      </div>

      {/* Interactive Studio Engine */}
      <CustomBlouseStudio />

      {/* Studio Guarantees */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/20">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">Hand & Machine Embroidery</h4>
              <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                Specialized in pattu blouse embroidery, real gold zari threads, kundan stone embellishments, and custom latkans.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">Worldwide Express Courier</h4>
              <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                Doorstep delivery across USA, Canada, UK, Australia, Singapore, Malaysia, UAE, and all over India with tracking.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10 text-white border border-white/15">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white">Tailoring Master Consultation</h4>
              <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                Video call or WhatsApp consultation with our master pattern cutters in Salem for fitting guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
