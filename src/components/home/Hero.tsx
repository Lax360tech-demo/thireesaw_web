import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../../data/brand';
import heroBannerImg from '../../assets/home/hero_banner.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-12 bg-[#08080a]">
      {/* Background High-Fashion Hero Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="Thireeshaw Designers Bridal Couture"
          className="w-full h-full object-cover object-[center_28%] filter brightness-[0.40] contrast-[1.08] scale-105"
        />
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-[#08080a]/75" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle Brand Tagline Pill without sparkle icon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#fbbf24] font-medium">
            {BRAND_CONFIG.tagline}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-300">
            HAND & MACHINE EMBROIDERY
          </span>
        </motion.div>

        {/* Editorial Brand Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white uppercase leading-[1.12]"
        >
          THIREESHAW <br />
          <span className="font-light italic tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-[#ff62a6]">
            DESIGNERS
          </span>
        </motion.h1>

        {/* Statement Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 font-serif italic text-base sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto"
        >
          &ldquo;Where Every Detail Becomes A Statement&rdquo;
        </motion.p>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-light leading-relaxed tracking-wide"
        >
          Handcrafted fashion, bridal blouse artistry, and designer creations made especially for you.
        </motion.p>

        {/* Accent Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 flex items-center justify-center gap-1.5"
        >
          <div className="w-12 h-[2px] bg-[#ff2a85]" />
          <div className="w-3 h-[2px] bg-[#fbbf24]" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#ff2a85]/25 flex items-center justify-center gap-2 group"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/custom-blouse"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black/60 hover:bg-white/10 backdrop-blur-md text-[#fbbf24] hover:text-white border border-[#fbbf24]/40 hover:border-white/30 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center"
          >
            <span>CUSTOMIZE YOUR BLOUSE</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
