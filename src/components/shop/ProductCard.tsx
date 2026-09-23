import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices and prefers-reduced-motion
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

    const maxTilt = 4.5; // subtle luxury fashion tilt in degrees
    setTilt({
      rotateX: -yPct * maxTilt,
      rotateY: xPct * maxTilt
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]?.name, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col cursor-pointer perspective-1000"
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered
          ? 'transform 0.12s ease-out'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Card Image Wrapper with 3D Depth */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#111116] border border-white/10 group-hover:border-white/25 transition-all duration-300 shadow-md group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] preserve-3d">
        {/* Main Image */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
            transition: 'transform 0.4s ease-out'
          }}
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBridal && (
            <Badge variant="yellow" size="sm">Bridal</Badge>
          )}
          {product.discount && (
            <Badge variant="pink" size="sm">{product.discount}% OFF</Badge>
          )}
          {product.isNew && !product.discount && (
            <Badge variant="neutral" size="sm">New</Badge>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            inWishlist
              ? 'bg-[#ff2a85] text-white shadow-lg shadow-[#ff2a85]/50 scale-105'
              : 'bg-black/60 hover:bg-black text-white hover:text-[#ff62a6] border border-white/20'
          }`}
          aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 transition-transform ${inWishlist ? 'fill-white scale-110' : ''}`} />
        </button>

        {/* Quick Actions Bar with 3D Depth */}
        <div
          className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)' }}
        >
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="btn-press flex-1 py-2 px-2.5 rounded-lg bg-black/80 hover:bg-black backdrop-blur-md text-white text-[11px] uppercase tracking-wider font-semibold border border-white/20 hover:border-white/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="hidden sm:inline">Quick View</span>
              <span className="sm:hidden">View</span>
            </button>
          )}

          <button
            onClick={handleQuickAdd}
            className="btn-press flex-1 py-2 px-2.5 rounded-lg bg-[#ff2a85] hover:bg-[#ff4396] text-white text-[11px] uppercase tracking-wider font-semibold transition-colors shadow-md shadow-[#ff2a85]/30 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>+ Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col">
        <div className="flex items-center justify-between gap-1 text-[11px] uppercase tracking-widest text-gray-400">
          <span className="truncate">{product.subcategory}</span>
          <div className="flex items-center gap-0.5 text-[#fbbf24] shrink-0">
            <Star className="w-3 h-3 fill-[#fbbf24]" />
            <span className="font-semibold text-white">{product.rating}</span>
          </div>
        </div>

        <h3 className="font-sans text-sm font-medium text-white group-hover:text-[#fbbf24] transition-colors line-clamp-1 mt-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-white font-sans">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-gray-400">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
