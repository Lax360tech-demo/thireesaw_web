import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'yellow' | 'neutral' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pink',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    pink: 'bg-[#ff2a85]/15 text-[#ff62a6] border border-[#ff2a85]/40 font-medium tracking-wider uppercase',
    yellow: 'bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/40 font-medium tracking-wider uppercase',
    neutral: 'bg-white/10 text-gray-300 border border-white/15 font-medium tracking-wider uppercase',
    outline: 'bg-transparent text-gray-300 border border-white/20 font-medium tracking-wider uppercase'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
