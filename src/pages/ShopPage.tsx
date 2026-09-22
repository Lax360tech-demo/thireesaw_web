import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductFilters } from '../components/shop/ProductFilters';
import { ProductGrid } from '../components/shop/ProductGrid';
import { SortDropdown } from '../components/shop/SortDropdown';
import { QuickViewModal } from '../components/modals/QuickViewModal';
import { PRODUCTS } from '../data/products';
import { FilterState, Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const initialCategory = searchParams.get('category') || 'all';
  const initialCollection = searchParams.get('collection') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    collection: initialCollection,
    priceRange: 'all',
    color: 'all',
    occasion: 'all',
    searchQuery: initialSearch,
    sortBy: 'featured'
  });

  // Keep search params in sync if url params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const col = searchParams.get('collection');
    const q = searchParams.get('search');
    if (cat || col || q) {
      setFilters((prev) => ({
        ...prev,
        category: cat || prev.category,
        collection: col || prev.collection,
        searchQuery: q !== null ? q : prev.searchQuery
      }));
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      collection: 'all',
      priceRange: 'all',
      color: 'all',
      occasion: 'all',
      searchQuery: '',
      sortBy: 'featured'
    });
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Collection filter
      if (filters.collection !== 'all') {
        if (filters.collection === 'bridal' && !product.isBridal) return false;
        if (filters.collection === 'festive' && product.occasion !== 'Festive') return false;
        if (filters.collection === 'party' && product.occasion !== 'Party' && product.occasion !== 'Reception') return false;
        if (filters.collection === 'new' && !product.isNew) return false;
      }

      // Price filter
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-5000' && product.price >= 5000) return false;
        if (filters.priceRange === '5000-10000' && (product.price < 5000 || product.price > 10000)) return false;
        if (filters.priceRange === '10000-20000' && (product.price < 10000 || product.price > 20000)) return false;
        if (filters.priceRange === 'above-20000' && product.price <= 20000) return false;
      }

      // Color filter
      if (filters.color !== 'all') {
        const matchesColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(filters.color.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      // Occasion filter
      if (filters.occasion !== 'all' && product.occasion !== filters.occasion) {
        return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.craftType.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0); // default 'featured'
    });
  }, [filters]);

  // Active filter chips
  const activeChips = [
    filters.category !== 'all' ? { key: 'category', label: `Category: ${filters.category}` } : null,
    filters.collection !== 'all' ? { key: 'collection', label: `Collection: ${filters.collection}` } : null,
    filters.priceRange !== 'all' ? { key: 'priceRange', label: `Price: ${filters.priceRange}` } : null,
    filters.color !== 'all' ? { key: 'color', label: `Color: ${filters.color}` } : null,
    filters.occasion !== 'all' ? { key: 'occasion', label: `Occasion: ${filters.occasion}` } : null,
    filters.searchQuery ? { key: 'searchQuery', label: `Search: "${filters.searchQuery}"` } : null
  ].filter(Boolean) as { key: keyof FilterState; label: string }[];

  return (
    <div className="pt-24 md:pt-28 pb-20 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-medium">
            ATELIER CATALOG
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight">
                SHOP ALL CREATIONS
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-light mt-2 max-w-xl">
                Explore handloom sarees, customized bridal blouses, flared anarkalis, and handcrafted royal wedding gagras.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> creations
            </div>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#121217] border border-white/10 rounded-xl text-xs font-medium text-white hover:bg-white/10 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ff2a85]" />
            <span>Filters</span>
            {activeChips.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#ff2a85] text-white text-[10px] font-bold flex items-center justify-center">
                {activeChips.length}
              </span>
            )}
          </button>

          {/* Active Chips (Desktop) */}
          <div className="hidden lg:flex items-center flex-wrap gap-2 flex-1">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-gray-300"
              >
                <span>{chip.label}</span>
                <button
                  onClick={() => setFilters({ ...filters, [chip.key]: chip.key === 'searchQuery' ? '' : 'all' })}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {activeChips.length > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#fbbf24] hover:underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="ml-auto">
            <SortDropdown
              value={filters.sortBy}
              onChange={(val) => setFilters({ ...filters, sortBy: val })}
            />
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left: Filters Sidebar (Span 3) */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#0f0f14] border border-white/10 rounded-2xl p-6 sticky top-28">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Right: Products Grid (Span 9) */}
          <main className="lg:col-span-9">
            <ProductGrid
              products={filteredProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#0e0e13] border-l border-white/10 p-6 overflow-y-auto z-10">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
