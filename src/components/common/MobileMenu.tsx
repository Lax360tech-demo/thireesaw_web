import React from 'react';
import { Link } from 'react-router-dom';
import { X, Phone, MapPin, MessageCircle, ChevronRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../../data/brand';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Shop All Collection', path: '/shop' },
  { name: 'Sarees', path: '/category/sarees', badge: 'Pure Silk' },
  { name: 'Salwar', path: '/category/salwar' },
  { name: 'Gagra', path: '/category/gagra', badge: 'Bridal' },
  { name: 'Bridal Edit', path: '/category/bridal', badge: 'Couture' },
  { name: 'Bridal Blouses', path: '/category/blouses', badge: 'Speciality' },
  { name: 'Custom Blouse Studio', path: '/custom-blouse', highlight: true },
  { name: 'About The Atelier', path: '/about' },
  { name: 'Contact Us', path: '/contact' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Slide-in Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#0a0a0f] border-r border-white/10 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            <div>
              {/* Header with Logo */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111116]">
                <div className="flex items-center gap-3">
                  <img
                    src={BRAND_CONFIG.logoUrl}
                    alt="Logo"
                    className="h-10 w-auto max-w-[40px] object-contain"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-serif text-sm font-semibold tracking-wider text-white">
                        THIREESHAW
                      </span>
                      <span className="font-serif text-sm font-light tracking-wider text-[#ff2a85]">
                        DESIGNERS
                      </span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#fbbf24] font-medium">
                      {BRAND_CONFIG.tagline}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Banner without sparkles */}
              <div className="px-5 py-2.5 bg-[#ff2a85]/10 border-b border-[#ff2a85]/20 flex items-center gap-2 text-xs text-[#ff62a6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
                <span className="font-medium tracking-wide">WE DO HAND & MACHINE EMBROIDERY</span>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      item.highlight
                        ? 'bg-[#fbbf24]/10 text-[#fbbf24] font-semibold border border-[#fbbf24]/30'
                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Atelier Contact & Worldwide Courier */}
            <div className="p-5 border-t border-white/10 bg-[#111116]/80 space-y-3.5">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Globe className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>WORLDWIDE COURIER AVAILABLE</span>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-400">
                <MapPin className="w-4 h-4 text-[#ff2a85] shrink-0 mt-0.5" />
                <p className="line-clamp-2 leading-relaxed">
                  {BRAND_CONFIG.address.complex}, {BRAND_CONFIG.address.locality}, {BRAND_CONFIG.address.city} - 636 005
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${BRAND_CONFIG.phones[0].replace(/[^0-9]/g, '')}`}
                  className="py-2.5 px-3 rounded-lg border border-white/15 bg-white/5 text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={BRAND_CONFIG.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#25D366] text-black text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
