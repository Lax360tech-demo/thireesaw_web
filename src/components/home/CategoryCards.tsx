import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';

export const CategoryCards: React.FC = () => {
  const primaryCategories = CATEGORIES.filter((c) => c.id !== 'bridal');

  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="COLLECTIONS"
        title="EXPLORE THE COLLECTION"
        subtitle="Designed for celebrations, crafted for you in our boutique atelier."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {primaryCategories.map((cat, idx) => {
          // Dynamic accurate count
          const count = PRODUCTS.filter((p) => p.category === cat.id).length;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative block aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl"
              >
                {/* Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top filter brightness-[0.75] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.6]"
                />

                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Corner Badge */}
                {cat.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#fbbf24] font-medium">
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Content Box */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff62a6] font-medium mb-1">
                    {count} Designs Available
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal uppercase tracking-wider mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-light leading-relaxed opacity-90 group-hover:opacity-100">
                    {cat.tagline}
                  </p>

                  {/* Animated "EXPLORE →" CTA */}
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#fbbf24] group-hover:text-white transition-colors">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Hot Pink Edge Trim */}
                <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
