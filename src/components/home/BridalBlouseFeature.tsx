import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../common/Badge';
import bridalBlouseSpotlightImg from '../../assets/home/bridal_blouse_spotlight.jpg';

export const BridalBlouseFeature: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden bg-[#08080a]">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ff2a85]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Close-up Imagery Showcase (Span 6) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[4/4.8] rounded-3xl overflow-hidden bg-[#111116] border border-white/15 shadow-2xl">
              <img
                src={bridalBlouseSpotlightImg}
                alt="Intricate Hand & Machine Embroidered Bridal Blouse Artistry"
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.08] hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Float Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#111118]/90 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff62a6] font-semibold">
                    HALLMARK SPECIALIZATION
                  </span>
                  <h4 className="font-serif text-base text-white">
                    Pattu Blouse & Bridal Embroidery
                  </h4>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24] text-xs font-serif font-bold">
                  TD
                </div>
              </div>
            </div>

            {/* Accent border lines tribute to business card */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#ff2a85] rounded-tl-2xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#fbbf24] rounded-br-2xl pointer-events-none" />
          </motion.div>

          {/* Right: Editorial Typography (Span 6) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="mb-4">
              <Badge variant="pink">ATELIER HIGHLIGHT</Badge>
            </div>

            <div className="space-y-1">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight leading-[1.08]">
                YOUR DREAM. <br />
                <span className="text-[#ff2a85] italic">YOUR DESIGN.</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-[#fbbf24]">
                  YOUR BLOUSE.
                </span>
              </h2>
            </div>

            {/* Pink & Yellow Accent Lines */}
            <div className="flex items-center gap-2 my-6">
              <div className="w-20 h-[3px] bg-[#ff2a85]" />
              <div className="w-6 h-[3px] bg-[#fbbf24]" />
              <div className="w-2 h-[3px] bg-white/40" />
            </div>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              &ldquo;From traditional pattu embroidery to contemporary bridal detailing, every blouse is created to complement your special moment.&rdquo;
            </p>

            <p className="mt-4 text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              At Thireeshaw Designers Salem, our master craftsmen transform your ideas into heirloom embroidered blouses. Whether you seek temple architecture aari, heavy French zardozi, or delicate micro-pearl maggam work, we bring your vision to life.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-8 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff2a85] shrink-0" />
                <span>Custom Neckline & Back Framing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>Hand Aari & Precision Machine Work</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>Handmade Latkans & Designer Tassels</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ff2a85] shrink-0" />
                <span>Worldwide Courier with Perfect Fit</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link
                to="/custom-blouse"
                className="btn-press inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 hover:shadow-2xl hover:shadow-[#ff2a85]/50 group cursor-pointer"
              >
                <span>DESIGN YOUR BLOUSE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
