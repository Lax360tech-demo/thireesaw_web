import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'pink' | 'yellow' | 'neutral';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'pink',
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} mb-6 sm:mb-8 md:mb-10 ${className}`}>
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 flex items-center gap-1.5 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="w-8 h-[2px] bg-[#ff2a85]" />
        <div className="w-2.5 h-[2px] bg-[#fbbf24]" />
      </div>
    </div>
  );
};
