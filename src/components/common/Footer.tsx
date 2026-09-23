import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, MessageCircle, ArrowUpRight, ShieldCheck, Settings } from 'lucide-react';
import { BRAND_INFO } from '../../data/products';
import { BRAND } from '../../data/brand';

export const Footer: React.FC = () => {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-gray-400 pt-16 pb-28 lg:pb-16 mt-20 relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.7)]">
      {/* Subtle luxury 3D lighting / radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#ff2a85]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#fbbf24]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2a85]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND.logo}
                  alt={BRAND.name}
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-contain shadow-md shadow-black/50 transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-white">
                      THIREESHAW
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.2em] text-[#ff2a85]">
                      DESIGNERS
                    </span>
                  </div>
                  <div className="text-[11px] tracking-[0.25em] text-[#fbbf24] uppercase font-sans font-semibold mt-0.5">
                    {BRAND_INFO.tagline}
                  </div>
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md font-light">
              Bespoke Indian fashion atelier in Salem. Dedicated to fine hand & machine embroidery,
              exquisite pattu blouse artistry, and customized bridal creations crafted to make your moments eternal.
            </p>

            {/* Courier Highlight Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <Globe className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="tracking-wider uppercase font-medium">{BRAND_INFO.logistics}</span>
            </div>

            {/* Direct Contact Snippet with 3D Depth Card */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)] space-y-2.5 text-sm text-gray-300 max-w-md backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ff2a85] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {BRAND_INFO.address.full}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-200">
                  {BRAND_INFO.phones.join('  •  ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="text-xs sm:text-sm text-gray-300 hover:text-white underline underline-offset-2">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] text-white font-semibold uppercase mb-5">
              COLLECTIONS
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/category/sarees" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Pure Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/category/salwar" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Salwar Kameez
                </Link>
              </li>
              <li>
                <Link to="/category/gagra" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Designer Gagra Choli
                </Link>
              </li>
              <li>
                <Link to="/category/blouses" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Pattu & Bridal Blouses
                </Link>
              </li>
              <li>
                <Link to="/category/jewellery" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Temple & Bridal Jewellery
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-[#fbbf24] hover:text-white transition-colors flex items-center gap-1.5 font-medium pt-1">
                  <span>Explore All Products</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ATELIER & SERVICES */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] text-white font-semibold uppercase mb-5">
              ATELIER CRAFT
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/custom-blouse" className="text-[#fbbf24] hover:text-[#fde047] font-semibold hover:translate-x-1 transition-all inline-block">
                  Customized Wedding Blouse
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Hand & Machine Embroidery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Artisan Salem Atelier
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Bridal Trousseau Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Custom Neckline & Back Framing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CLIENT CARE & COMPLIANCE */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] text-white font-semibold uppercase mb-5">
              CLIENT CARE
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Contact Our Boutique
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Worldwide Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Exchange & Atelier Guarantee
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <button
                  onClick={openCookiePreferences}
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Privacy & Cookie Choices</span>
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-6">
              <h5 className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-3 font-medium">
                FOLLOW OUR ATELIER
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_INFO.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press p-2.5 rounded-xl bg-white/5 hover:bg-[#25D366] text-gray-300 hover:text-black border border-white/10 hover:border-transparent transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-105"
                  aria-label="Chat with THIREESHAW DESIGNERS on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press p-2.5 rounded-xl bg-white/5 hover:bg-[#ff2a85] text-gray-300 hover:text-white border border-white/10 hover:border-transparent transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-105"
                  aria-label="Visit THIREESHAW DESIGNERS on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={BRAND_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white border border-white/10 hover:border-transparent transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-105"
                  aria-label="Follow on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & micro statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <p>© 2026 Thireeshaw Designers. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
            <span>Salem, Tamil Nadu</span>
            <span className="text-white/20">•</span>
            <span className="text-[#fbbf24] font-medium tracking-wider">U THINK V CREATE</span>
            <span className="text-white/20">•</span>
            <Link to="/privacy" className="hover:text-white underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <button
              onClick={openCookiePreferences}
              className="hover:text-white underline underline-offset-2 transition-colors"
            >
              Cookie Settings
            </button>
            <span className="text-white/20">•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-[#fbbf24] transition-colors"
              title="Atelier Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

