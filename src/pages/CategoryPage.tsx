import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/shop/ProductGrid';
import { SortDropdown } from '../components/shop/SortDropdown';
import { QuickViewModal } from '../components/modals/QuickViewModal';
import { Product, FilterState } from '../types';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');

  const categoryMeta = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];

  // Filter products by category (or bridal flag)
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (categoryMeta.slug === 'bridal') {
        return p.isBridal;
      }
      return p.category === categoryMeta.id;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [categoryMeta, sortBy]);

  return (
    <div className="min-h-screen bg-[#08080a] pb-24">
      {/* Category Hero Banner */}
      <div className="relative min-h-[45vh] sm:min-h-[50vh] flex items-end pb-12 sm:pb-16 pt-28 overflow-hidden bg-black">
        <img
          src={categoryMeta.image}
          alt={categoryMeta.name}
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.45] contrast-[1.1] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {categoryMeta.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff2a85]/20 border border-[#ff2a85]/40 text-xs uppercase tracking-widest text-[#ff62a6] font-semibold mb-3">
                <span>{categoryMeta.badge}</span>
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white uppercase tracking-tight">
              {categoryMeta.name}
            </h1>
            <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#fbbf24] font-light">
              &ldquo;{categoryMeta.tagline}&rdquo;
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-lg">
              {categoryMeta.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-wider text-gray-400">
            Showing <strong className="text-white">{categoryProducts.length}</strong> creations in {categoryMeta.name}
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={categoryProducts}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Category Special Banner / Custom Blouse Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14141c] via-[#1a1a26] to-[#14141c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#ff62a6] font-semibold">
              BESPOKE SERVICE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Want a custom color or matching blouse for your {categoryMeta.name}?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl">
              Our Salem atelier tailors bespoke blouses and matching accessories to complement any ensemble with worldwide courier dispatch.
            </p>
          </div>
          <Link
            to="/custom-blouse"
            className="shrink-0 px-8 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#ff2a85]/30 flex items-center gap-2"
          >
            <span>START BESPOKE DESIGN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
