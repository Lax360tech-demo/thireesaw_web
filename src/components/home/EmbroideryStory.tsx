import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Scissors, Layers, Gem } from 'lucide-react';

import craftHandImg from '../../assets/home/craft_hand.jpg';
import craftMachineImg from '../../assets/home/craft_machine.jpg';
import craftCustomImg from '../../assets/home/craft_custom.jpg';

const STORIES = [
  {
    id: 'hand-embroidery',
    title: 'HAND EMBROIDERY',
    subtitle: 'Aari & Zardozi Needlecraft',
    description: 'Generations of needlecraft heritage manifested in intricate zardozi, kundan stones, kasavu zari cords, and handcrafted peacock motifs, patiently woven one stitch at a time.',
    image: craftHandImg,
    icon: Scissors,
    accent: '#ff2a85',
    tag: 'Artisan Needlecraft'
  },
  {
    id: 'machine-embroidery',
    title: 'MACHINE EMBROIDERY',
    subtitle: 'Precision Symmetry & Speed',
    description: 'High-speed multi-head computerized craftsmanship delivering flawless geometric borders, dense floral fill, and consistent decorative accents for bridal and festive silhouettes.',
    image: craftMachineImg,
    icon: Layers,
    accent: '#fbbf24',
    tag: 'Computerized Precision'
  },
  {
    id: 'custom-design',
    title: 'CUSTOM DESIGN',
    subtitle: 'U Think V Create',
    description: 'From personal bridal moodboards to custom temple neckline carvings, we translate your wedding dreams into tailor-made heirloom couture with bespoke fittings and worldwide dispatch.',
    image: craftCustomImg,
    icon: Gem,
    accent: '#ffffff',
    tag: 'Bespoke Couture'
  }
];

export const EmbroideryStory: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#09090d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ATELIER PILLARS"
          badgeVariant="yellow"
          title="CRAFTED BY HAND. PERFECTED BY DETAIL."
          subtitle="Discover the artistry behind our Salem embroidery studio, where traditional Indian techniques converge with contemporary boutique design."
        />

        {/* Magazine-style 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {STORIES.map((story, idx) => {
            const Icon = story.icon;
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group flex flex-col"
              >
                {/* Magazine Photo Card */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#121218] border border-white/10 mb-6">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Corner Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-medium">
                      {story.tag}
                    </span>
                  </div>

                  {/* Floating Number (01, 02, 03) */}
                  <div className="absolute bottom-4 right-4 font-serif text-4xl sm:text-5xl font-light text-white/20 group-hover:text-white/40 transition-colors">
                    0{idx + 1}
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: story.accent }} />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-400">
                        {story.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-wide uppercase mb-3 group-hover:text-[#fbbf24] transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs uppercase tracking-widest text-[#ff62a6] font-medium">
                    <span>Atelier Handcrafted</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
