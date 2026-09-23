import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../../data/brand';

const HERO_VIDEO_PATH = '/videos/Fashion_brand_creating_luxury_co\u2026_20260922173139.mp4';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay fallback handling
      });
    }
  }, []);

  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-12 bg-[#08080a] perspective-1000">
      {/* Background Cinematic Hero Video - Clear, Vibrant & Natural */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#08080a]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none filter brightness-[0.98] contrast-[1.02] transition-opacity duration-700"
        >
          <source src="/videos/hero_video.mp4" type="video/mp4" />
          <source src={HERO_VIDEO_PATH} type="video/mp4" />
        </video>

        {/* Refined subtle cinematic gradient overlay preserving video details */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[#08080a]/90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08080a] to-transparent pointer-events-none" />
      </div>

      {/* Content Container with 3D Depth */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center preserve-3d">
        {/* Subtle Brand Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ transform: 'translateZ(10px)' }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-white/15 backdrop-blur-md mb-6 shadow-lg shadow-black/40"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#fbbf24] font-medium drop-shadow-sm">
            {BRAND_CONFIG.tagline}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-200 drop-shadow-sm">
            HAND & MACHINE EMBROIDERY
          </span>
        </motion.div>

        {/* Editorial Brand Heading with High Contrast Shadow */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ transform: 'translateZ(25px)' }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white uppercase leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
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
          style={{ transform: 'translateZ(18px)' }}
          className="mt-5 font-serif italic text-base sm:text-xl md:text-2xl text-gray-100 font-light tracking-wide max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          &ldquo;Where Every Detail Becomes A Statement&rdquo;
        </motion.p>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transform: 'translateZ(12px)' }}
          className="mt-3 text-xs sm:text-sm text-gray-200 max-w-lg mx-auto font-light leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
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
          <div className="w-12 h-[2px] bg-[#ff2a85] shadow-[0_0_8px_rgba(255,42,133,0.6)]" />
          <div className="w-3 h-[2px] bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        </motion.div>

        {/* Action Buttons with 3D Depth & Press Effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ transform: 'translateZ(20px)' }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto"
        >
          <Link
            to="/shop"
            className="btn-press w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/35 hover:shadow-2xl hover:shadow-[#ff2a85]/50 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/custom-blouse"
            className="btn-press w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-[#fbbf24] hover:text-white border border-[#fbbf24]/50 hover:border-white/40 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-black/60 flex items-center justify-center cursor-pointer"
          >
            <span>CUSTOMIZE YOUR BLOUSE</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
