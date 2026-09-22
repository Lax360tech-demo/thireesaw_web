import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Bridal Saree',
  'Pattu Blouse',
  'Aari Work',
  'Emerald Gagra',
  'Anarkali Salwar',
  'Hand Embroidery',
  'Wedding Blouse'
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.craftType.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q) ||
        p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    });

    setResults(filtered.slice(0, 6));
  }, [query]);

  const handleSelectProduct = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const handleSearchSuggestion = (term: string) => {
    setQuery(term);
  };

  const handleViewAllResults = () => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="relative w-full max-w-2xl bg-[#111116] border border-white/15 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#ff2a85] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    handleViewAllResults();
                  }
                }}
                placeholder="Search bridal blouses, Kanchipuram sarees, gagras..."
                className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder:text-gray-500 font-light"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-white px-2 py-1 border border-white/10 rounded-md ml-1"
              >
                ESC
              </button>
            </div>

            {/* Popular Suggestions */}
            <div className="p-4 sm:p-5 bg-[#0d0d11]">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-400 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearchSuggestion(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#ff2a85]/15 text-gray-300 hover:text-[#ff62a6] border border-white/10 hover:border-[#ff2a85]/40 transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            {query.trim() && (
              <div className="p-4 sm:p-5 max-h-[55vh] overflow-y-auto divide-y divide-white/5">
                {results.length > 0 ? (
                  <>
                    <div className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                      Found {results.length} results
                    </div>
                    <div className="space-y-3">
                      {results.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.id)}
                          className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-16 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-widest text-[#ff62a6]">
                              {product.category} • {product.craftType}
                            </span>
                            <h4 className="text-sm font-medium text-white group-hover:text-[#fbbf24] transition-colors truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-semibold text-white">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 mt-2">
                      <button
                        onClick={handleViewAllResults}
                        className="w-full py-2.5 px-4 bg-white/5 hover:bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        View All Matching Products
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-center text-gray-400">
                    <p className="text-sm">No pieces found matching &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Try searching for &ldquo;saree&rdquo;, &ldquo;blouse&rdquo;, &ldquo;salwar&rdquo;, or &ldquo;gagra&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
