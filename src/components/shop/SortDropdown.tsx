import React from 'react';
import { ChevronDown, ArrowDownWideNarrow } from 'lucide-react';
import { FilterState } from '../../types';

interface SortDropdownProps {
  value: FilterState['sortBy'];
  onChange: (value: FilterState['sortBy']) => void;
}

const SORT_OPTIONS: { label: string; value: FilterState['sortBy'] }[] = [
  { label: 'Featured Couture', value: 'featured' },
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' }
];

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#121217] border border-white/10 rounded-xl text-xs text-gray-300">
        <ArrowDownWideNarrow className="w-3.5 h-3.5 text-[#fbbf24]" />
        <span className="text-gray-400 hidden sm:inline">Sort:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
          aria-label="Sort products by"
          className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-4"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#121217] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none -ml-4" />
      </div>
    </div>
  );
};
