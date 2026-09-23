import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Palette, Scissors, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Share Your Vision',
    desc: 'Provide your saree color, event details, neckline preferences, or wedding moodboard inspirations.',
    icon: MessageSquare,
    accent: '#ff2a85'
  },
  {
    step: '02',
    title: 'Choose Your Design',
    desc: 'Select between temple aari needlework, French zardozi bullion, pearl maggam, or cutwork patterns.',
    icon: Palette,
    accent: '#fbbf24'
  },
  {
    step: '03',
    title: 'Craft The Details',
    desc: 'Our master Salem artisans meticulously hand-embroider every motif, tassel, and customized lining.',
    icon: Scissors,
    accent: '#ff2a85'
  },
  {
    step: '04',
    title: 'Wear Your Story',
    desc: 'Delivered securely anywhere worldwide via insured express courier, ready to grace your monumental day.',
    icon: HeartHandshake,
    accent: '#fbbf24'
  }
];

export const CustomBlouseSteps: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 relative bg-[#07070a] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-xs text-[#ff62a6] uppercase tracking-[0.25em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85]" />
            <span>BESPOKE BRIDAL SERVICE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight">
            WE DELIVER YOUR DREAMS
          </h2>

          <p className="mt-3 text-sm sm:text-base tracking-[0.2em] uppercase text-[#fbbf24] font-semibold">
            CUSTOMIZED WEDDING BLOUSES
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="w-16 h-[2px] bg-[#ff2a85]" />
            <div className="w-4 h-[2px] bg-[#fbbf24]" />
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            Every bride carries a distinct story. At Thireeshaw Designers, we offer an end-to-end bespoke journey from Salem to your doorstep anywhere across the globe.
          </p>
        </div>

        {/* 4 Interactive Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-[#ff2a85]/20 via-[#fbbf24]/30 to-[#ff2a85]/20 -translate-y-12 z-0" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative z-10 p-6 sm:p-7 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${step.accent}15`,
                        borderColor: `${step.accent}40`,
                        color: step.accent
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="font-serif text-3xl font-light text-white/20 group-hover:text-white/40 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl text-white font-normal mb-2 group-hover:text-[#fbbf24] transition-colors">
                    {step.title}
                  </h4>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                  <span>Phase {step.step}</span>
                  <span>•</span>
                  <span style={{ color: step.accent }}>Atelier Crafted</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Conversion Box */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#111118] via-[#161622] to-[#111118] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
              PERSONALIZED CONSULTATION AVAILABLE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Have a design or Pinterest board ready?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Use our interactive custom studio or consult with our Salem designers directly on WhatsApp.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/custom-blouse"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#ff2a85]/30 flex items-center justify-center gap-2 group"
            >
              <span>START YOUR CUSTOM DESIGN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
