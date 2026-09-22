import React from 'react';

const TICKER_ITEMS = [
  'HAND EMBROIDERY',
  'MACHINE EMBROIDERY',
  'PATTU BLOUSE EMBROIDERY',
  'BRIDAL BLOUSES',
  'CUSTOMIZED DESIGNS',
  'WORLDWIDE DELIVERY',
  'U THINK V CREATE'
];

export const BrandTicker: React.FC = () => {
  return (
    <div className="relative bg-[#060608] border-y border-white/10 py-3.5 overflow-hidden select-none">
      {/* Subtle side fade overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center space-x-8 sm:space-x-12">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 sm:space-x-8 shrink-0">
            <span className="text-xs sm:text-sm tracking-[0.22em] font-medium uppercase text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              {item === 'HAND EMBROIDERY' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />}
              {item === 'MACHINE EMBROIDERY' && <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />}
              {item === 'U THINK V CREATE' ? (
                <span className="text-[#fbbf24] font-semibold">{item}</span>
              ) : item === 'BRIDAL BLOUSES' ? (
                <span className="text-[#ff62a6] font-semibold">{item}</span>
              ) : (
                item
              )}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};
