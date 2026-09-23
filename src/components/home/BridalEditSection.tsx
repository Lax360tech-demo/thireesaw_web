import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Diamond } from 'lucide-react';
import { motion } from 'framer-motion';

import kanchipuramBridalImg from '../../assets/products/sarees/kanchipuram_bridal.jpg';
import peacockAariBlouseImg from '../../assets/products/blouses/peacock_aari_blouse.jpg';
import burgundyBridalGagraImg from '../../assets/products/gagra/burgundy_bridal_gagra.jpg';
import emeraldVelvetAnarkaliImg from '../../assets/products/salwar/emerald_velvet_anarkali.jpg';

const BRIDAL_PILLARS = [
  {
    title: 'Bridal Sarees',
    desc: 'Pure Kanchipuram & Banarasi silks with heirloom zari work',
    image: kanchipuramBridalImg,
    link: '/category/sarees'
  },
  {
    title: 'Bridal Blouses',
    desc: 'Custom pattu blouse embroidery with intricate aari & pearl maggam',
    image: peacockAariBlouseImg,
    link: '/category/blouses'
  },
  {
    title: 'Wedding Gagra',
    desc: 'Grand volume micro-velvet & raw silk lehengas with dual dupattas',
    image: burgundyBridalGagraImg,
    link: '/category/gagra'
  },
  {
    title: 'Reception Looks',
    desc: 'Modern metallic tissue silk sarees & flared designer anarkalis',
    image: emeraldVelvetAnarkaliImg,
    link: '/shop?collection=party'
  }
];

export const BridalEditSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#050507] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#ff2a85]/10 via-[#fbbf24]/5 to-[#ff2a85]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#fbbf24] uppercase tracking-[0.25em] mb-4">
            <Diamond className="w-3 h-3" />
            <span>EXCLUSIVE COUTURE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight">
            THE BRIDAL EDIT
          </h2>

          <div className="mt-4 flex items-center justify-center gap-1.5">
            <div className="w-12 h-[2px] bg-[#ff2a85]" />
            <div className="w-3 h-[2px] bg-[#fbbf24]" />
          </div>

          <p className="mt-4 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            &ldquo;Statement silhouettes, intricate embroidery and unforgettable details for your most special celebrations.&rdquo;
          </p>
        </div>

        {/* 4 Bridal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BRIDAL_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={pillar.link}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-[#ff2a85]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 preserve-3d"
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.78] group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ transform: 'translateZ(6px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end" style={{ transform: 'translateZ(14px)' }}>
                  <h4 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#fbbf24] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-light mt-1 line-clamp-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#ff62a6] font-semibold">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Central CTA with 3D Press Effect */}
        <div className="text-center pt-4">
          <Link
            to="/category/bridal"
            className="btn-press inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:from-[#ff4396] hover:to-[#fb7185] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 hover:shadow-2xl hover:shadow-[#ff2a85]/50 group cursor-pointer"
          >
            <span>EXPLORE BRIDAL COLLECTION</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
