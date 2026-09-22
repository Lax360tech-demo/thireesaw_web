import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { QuickViewModal } from '../modals/QuickViewModal';
import type { Product } from '../../types';

export const JewelleryEditSection: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Get jewellery products
  const jewelleryProducts = PRODUCTS.filter((p) => p.category === 'jewellery');

  return (
    <section className="py-24 sm:py-32 relative bg-[#07070a] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#fbbf24]/5 via-[#ff2a85]/10 to-[#fbbf24]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#fbbf24] uppercase tracking-[0.25em] mb-4">
              <Gem className="w-3 h-3 text-[#fbbf24]" />
              <span>FINE ATELIER CRAFT</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight">
              THE JEWELLERY EDIT
            </h2>

            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-12 h-[2px] bg-[#fbbf24]" />
              <div className="w-3 h-[2px] bg-[#ff2a85]" />
            </div>

            <p className="mt-4 font-serif italic text-base sm:text-xl text-gray-300 font-light">
              &ldquo;Timeless details for unforgettable moments.&rdquo;
            </p>
          </div>

          <Link
            to="/category/jewellery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#fbbf24] hover:text-white font-semibold transition-colors group self-start md:self-end pb-1 border-b border-[#fbbf24]/40 hover:border-white"
          >
            <span>EXPLORE JEWELLERY</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Jewellery Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {jewelleryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black via-[#121218] to-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-semibold">
              COMPLETE YOUR CELEBRATION
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">
              Bespoke Temple & Kundan Jewellery Styling
            </h3>
            <p className="text-xs text-gray-400 font-light mt-1 max-w-xl">
              Pair your handcrafted bridal blouse and Kanchipuram silk with curated South Indian jewellery sets, designed to harmoniously crown your wedding day.
            </p>
          </div>

          <Link
            to="/category/jewellery"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-black text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#fbbf24]/20"
          >
            EXPLORE JEWELLERY
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
