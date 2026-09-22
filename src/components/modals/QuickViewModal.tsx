import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, Star, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Badge } from '../common/Badge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0]?.name || 'Classic');
      setQuantity(1);
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleGoToProduct = () => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-[#101015] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white rounded-full bg-black/60 hover:bg-black border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image Showcase */}
            <div className="relative bg-[#0a0a0e] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="pink">{product.discount}% OFF</Badge>
                  </div>
                )}
                {product.isBridal && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="yellow">Bridal Edition</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-[#ff2a85] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#ff62a6] font-medium">
                    {product.category} • {product.craftType}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                    <Star className="w-3.5 h-3.5 fill-[#fbbf24]" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-semibold text-[#fbbf24]">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {product.shortDescription}
                </p>

                {/* Fabric detail pill */}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                  <span>Fabric: <strong className="text-gray-200">{product.material}</strong></span>
                </div>

                {/* Colors */}
                <div className="mt-5">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
                    Color: <span className="text-white">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform relative ${
                          selectedColor === c.name ? 'border-[#ff2a85] scale-110 shadow-lg shadow-[#ff2a85]/40' : 'border-white/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Select Size
                    </label>
                    <button
                      onClick={handleGoToProduct}
                      className="text-[11px] text-[#fbbf24] hover:underline"
                    >
                      Measurement Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedSize === s
                            ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-md shadow-[#ff2a85]/30'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#ff2a85]/30 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      inWishlist
                        ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-[#ff2a85]'
                        : 'border-white/15 text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#ff2a85]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleGoToProduct}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-gray-400 hover:text-[#fbbf24] transition-colors flex items-center justify-center gap-1.5 group"
                >
                  <span>View Full Couture Details & Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
