import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Globe, MapPin, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brand';
import atelierHeritageImg from '../assets/home/atelier_heritage.jpg';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      {/* Brand Hero Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff2a85]/15 border border-[#ff2a85]/30 text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
          <span>OUR ATELIER HERITAGE</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white uppercase tracking-tight">
          THE ART OF CREATING
        </h1>
        <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#fbbf24]">
          &ldquo;{BRAND_CONFIG.tagline}&rdquo;
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-16 h-[2px] bg-[#ff2a85]" />
          <div className="w-4 h-[2px] bg-[#fbbf24]" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111116] border border-white/10 shadow-2xl">
            <img
              src={atelierHeritageImg}
              alt="Salem Hand Embroidery Studio"
              className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0f0f15]/90 backdrop-blur-md border border-white/15">
              <span className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-semibold">
                SALEM ATELIER
              </span>
              <p className="font-serif text-sm sm:text-base text-white mt-0.5">
                We Do Hand & Machine Embroidery Works
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ff62a6] font-semibold">
              ABOUT THIREESHAW DESIGNERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Where Your Vision Is Created with Passion & Precision
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              <strong className="text-white font-medium">Thireeshaw Designers</strong> is a boutique fashion and embroidery studio based in Salem, Tamil Nadu, focused on creating beautiful Indian fashion pieces and customized bridal blouse designs.
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Guided by our foundational philosophy — <em className="text-[#fbbf24]">&ldquo;U Think V Create&rdquo;</em> — we dedicate ourselves to turning each client&apos;s personal ideas into timeless wearable art. From royal muhurtham ceremonies to festive galas, we deliver your dreams with meticulous attention to detail.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fbbf24] font-semibold">
              ATELIER SPECIALIZATIONS
            </span>
            <h3 className="font-serif text-3xl text-white mt-1">
              Hallmarks of Our Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#101015] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ff2a85]/15 text-[#ff2a85] border border-[#ff2a85]/30 flex items-center justify-center mb-4">
                  <Scissors className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-white">Hand & Machine Embroidery</h4>
                <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                  Combining authentic hand aari needlework with precision computerized machine embroidery for rich textures and flawless finishing.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#ff62a6] font-semibold mt-4">
                Core Craftsmanship
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#101015] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-sm text-[#fbbf24]">P&B</span>
                </div>
                <h4 className="font-serif text-xl text-white">Pattu Blouse & Bridal Works</h4>
                <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                  Specialized in bridal pattu blouses adorned with kundan stones, real zardozi, kasavu gold threads, and custom back necklines.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-semibold mt-4">
                Brand Specialty
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#101015] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white border border-white/15 flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-white">Worldwide Courier Available</h4>
                <p className="text-xs text-gray-400 font-light mt-2 leading-relaxed">
                  Safe, insured international courier delivery to clients across the globe, bringing Salem craftsmanship to brides worldwide.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold mt-4">
                Global Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Location & Atelier Address */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111118] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fbbf24]">
              <MapPin className="w-4 h-4 text-[#ff2a85]" />
              <span>SALEM BOUTIQUE ATELIER</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Visit Our Atelier in Salem
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl leading-relaxed">
              {BRAND_CONFIG.address.full}
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-8 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#ff2a85]/30"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};
