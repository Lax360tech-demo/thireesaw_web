import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToBag = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0]?.name, 1);
    removeFromWishlist(product.id);
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 bg-[#08080a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full text-center p-8 sm:p-10 rounded-3xl bg-[#0f0f14] border border-white/10 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/20 flex items-center justify-center mx-auto mb-4 text-[#ff62a6]">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
            WISHLIST
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#fbbf24] mb-3 font-medium">
            Your curated collection of pieces you love.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 font-light mb-8 leading-relaxed">
            You haven&apos;t saved any pieces yet. Explore our bridal blouses, handloom Kanchipuram sarees, and couture jewellery.
          </p>
          <Link
            to="/shop"
            className="btn-press inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-xl shadow-[#ff2a85]/35 hover:shadow-2xl hover:shadow-[#ff2a85]/50 cursor-pointer"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold">
              CURATED COLLECTION
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight mt-1">
              WISHLIST
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
              Your curated collection of pieces you love. ({wishlistCount} {wishlistCount === 1 ? 'piece' : 'pieces'})
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="btn-press inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs uppercase tracking-wider text-gray-200 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>

            <button
              onClick={clearWishlist}
              className="text-xs text-gray-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Clear All Saved Pieces
            </button>
          </div>
        </div>

        {/* Saved Products Responsive Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative rounded-2xl bg-[#101015] border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300"
            >
              {/* Product Image & Remove Button */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-red-500/90 text-white backdrop-blur-md transition-colors cursor-pointer border border-white/10"
                  title="Remove from wishlist"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info & Move to Bag CTA */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff62a6]">
                    {product.subcategory || product.category}
                  </span>
                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="font-serif text-base text-white hover:text-[#fbbf24] cursor-pointer transition-colors line-clamp-1 mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <div className="text-sm font-semibold text-white mt-1">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="btn-press flex-1 py-2.5 px-3 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md shadow-[#ff2a85]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
