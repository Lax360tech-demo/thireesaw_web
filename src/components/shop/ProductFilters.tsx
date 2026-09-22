import React from 'react';
import { FilterState } from '../../types';
import { X, RotateCcw, Check } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Sarees', value: 'sarees' },
  { label: 'Salwar', value: 'salwar' },
  { label: 'Gagra', value: 'gagra' },
  { label: 'Blouses', value: 'blouses' }
];

const COLLECTIONS = [
  { label: 'All Collections', value: 'all' },
  { label: 'Bridal Couture', value: 'bridal' },
  { label: 'Festive Editions', value: 'festive' },
  { label: 'Party Wear', value: 'party' },
  { label: 'New Arrivals', value: 'new' }
];

const PRICE_TIERS = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₹5,000', value: 'under-5000' },
  { label: '₹5,000 – ₹10,000', value: '5000-10000' },
  { label: '₹10,000 – ₹20,000', value: '10000-20000' },
  { label: 'Above ₹20,000', value: 'above-20000' }
];

const COLOR_SWATCHES = [
  { name: 'All', hex: 'transparent', border: true },
  { name: 'Pink', hex: '#ff2a85' },
  { name: 'Red', hex: '#b91c1c' },
  { name: 'Gold', hex: '#eab308' },
  { name: 'Black', hex: '#0f0f13' },
  { name: 'Green', hex: '#047857' },
  { name: 'Blue', hex: '#0284c7' },
  { name: 'Yellow', hex: '#fde047' }
];

const OCCASIONS = [
  { label: 'All Occasions', value: 'all' },
  { label: 'Wedding', value: 'Wedding' },
  { label: 'Reception', value: 'Reception' },
  { label: 'Festive', value: 'Festive' },
  { label: 'Party', value: 'Party' },
  { label: 'Casual', value: 'Casual' }
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const activeFiltersCount = [
    filters.category !== 'all' ? 1 : 0,
    filters.collection !== 'all' ? 1 : 0,
    filters.priceRange !== 'all' ? 1 : 0,
    filters.color !== 'all' ? 1 : 0,
    filters.occasion !== 'all' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg tracking-wider text-white uppercase">Refine By</h3>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#ff2a85] text-white text-[11px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs text-gray-400 hover:text-[#fbbf24] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => updateFilter('category', cat.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs tracking-wide transition-colors flex items-center justify-between ${
                filters.category === cat.value
                  ? 'bg-[#ff2a85]/15 text-[#ff62a6] font-semibold border border-[#ff2a85]/40'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.value && <Check className="w-3.5 h-3.5 text-[#ff2a85]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
          Collection
        </h4>
        <div className="space-y-1">
          {COLLECTIONS.map((col) => (
            <button
              key={col.value}
              onClick={() => updateFilter('collection', col.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs tracking-wide transition-colors flex items-center justify-between ${
                filters.collection === col.value
                  ? 'bg-[#fbbf24]/15 text-[#fbbf24] font-semibold border border-[#fbbf24]/40'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{col.label}</span>
              {filters.collection === col.value && <Check className="w-3.5 h-3.5 text-[#fbbf24]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Tiers */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
          Price Range
        </h4>
        <div className="space-y-1">
          {PRICE_TIERS.map((tier) => (
            <button
              key={tier.value}
              onClick={() => updateFilter('priceRange', tier.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs tracking-wide transition-colors flex items-center justify-between ${
                filters.priceRange === tier.value
                  ? 'bg-white/10 text-white font-semibold border border-white/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{tier.label}</span>
              {filters.priceRange === tier.value && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
          Color Tone: <span className="text-white capitalize">{filters.color === 'all' ? 'All' : filters.color}</span>
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = (filters.color === 'all' && swatch.name === 'All') ||
              filters.color.toLowerCase() === swatch.name.toLowerCase();

            return (
              <button
                key={swatch.name}
                onClick={() => updateFilter('color', swatch.name === 'All' ? 'all' : swatch.name.toLowerCase())}
                className={`w-7 h-7 rounded-full border-2 transition-all relative flex items-center justify-center ${
                  isSelected
                    ? 'border-[#ff2a85] scale-110 shadow-md shadow-[#ff2a85]/40'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              >
                {swatch.name === 'All' && (
                  <span className="text-[10px] text-gray-400 font-bold">ALL</span>
                )}
                {isSelected && swatch.name !== 'All' && (
                  <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
          Occasion
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {OCCASIONS.map((occ) => {
            const isSelected = filters.occasion === occ.value;
            return (
              <button
                key={occ.value}
                onClick={() => updateFilter('occasion', occ.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-[#ff2a85] border-[#ff2a85] text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {occ.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Bottom Apply CTA */}
      {isMobileDrawer && onCloseMobile && (
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold rounded-xl"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
