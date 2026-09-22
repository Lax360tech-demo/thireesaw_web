import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const phoneNumber = '919865366447';
  const defaultMessage = encodeURIComponent(
    'Hi Thireeshaw Designers, I would like to know more about your collections and customized blouse designs.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 sm:bottom-7 right-4 sm:right-7 z-40 flex items-center gap-3">
      {/* Tooltip badge on desktop */}
      <div className="hidden md:flex items-center gap-2 bg-[#0e0e14]/95 text-white px-3.5 py-2 rounded-xl border border-white/15 shadow-2xl backdrop-blur-md animate-fadeIn">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <div className="text-xs">
          <p className="font-medium text-white">Salem Atelier Online</p>
          <p className="text-[11px] text-[#fbbf24]">Instant WhatsApp Support</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp consultation with Thireeshaw Designers"
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
      >
        {/* Animated radar ping effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75 duration-1000" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none relative z-10" />
      </a>
    </div>
  );
};
