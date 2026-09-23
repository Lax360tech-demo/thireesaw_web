import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  onResetFilters?: () => void;
  isLoading?: boolean;
  isSearchActive?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  onResetFilters,
  isLoading = false,
  isSearchActive = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse flex flex-col space-y-3">
            <div className="aspect-[3/4] bg-white/5 rounded-xl border border-white/5" />
            <div className="h-3 bg-white/5 rounded w-1/3" />
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 px-4 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-4">
          <PackageSearch className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl text-white mb-2">
          {isSearchActive ? 'No pieces found' : 'No Matching Creations Found'}
        </h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          {isSearchActive
            ? 'Try another search or explore our collections.'
            : "We couldn't find any items matching your selected criteria. Try adjusting your filters or price range."}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg hover:shadow-[#ff2a85]/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isSearchActive ? 'VIEW ALL COLLECTIONS' : 'Reset All Filters'}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
