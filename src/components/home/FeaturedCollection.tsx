import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../shop/ProductCard';
import { QuickViewModal } from '../modals/QuickViewModal';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

export const FeaturedCollection: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 8 products for "THE EDIT"
  const featuredIds = [
    'td-sar-01',
    'td-sar-02',
    'td-sal-01',
    'td-gag-01',
    'td-bls-01',
    'td-bls-02',
    'td-sal-02',
    'td-gag-02'
  ];

  const featuredProducts = featuredIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-[#0b0b10] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8">
          <SectionHeading
            badge="HANDPICKED COUTURE"
            badgeVariant="yellow"
            title="THE EDIT"
            subtitle="An exclusive showcase of our most coveted sarees, signature bridal blouses, and royal wedding gagras."
            align="left"
            className="mb-0 md:mb-0"
          />

          <Link
            to="/shop"
            className="btn-press mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#fbbf24] hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW ALL CREATIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Products Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-8 sm:mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#ff2a85]" />
            <span>Looking for custom necklines, sleeve lengths, or heirloom zari?</span>
            <Link
              to="/custom-blouse"
              className="text-[#fbbf24] hover:text-[#fde047] font-semibold underline underline-offset-4 ml-1"
            >
              Explore Bespoke Studio →
            </Link>
          </div>
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
