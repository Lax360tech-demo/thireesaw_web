import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
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
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#0f0f14] border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/20 flex items-center justify-center mx-auto mb-4 text-[#ff62a6]">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-white mb-2">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mb-6">
            You haven&apos;t saved any pieces yet. Explore our bridal blouses, handloom Kanchipuram sarees, and couture gagras.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#ff2a85]/30"
          >
            <span>Explore The Edit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold">
              CURATED FAVORITES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight mt-1">
              YOUR WISHLIST ({wishlistCount})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-gray-400 hover:text-white transition-colors underline"
          >
            Clear All Saved Pieces
          </button>
        </div>

        {/* Saved Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl bg-[#101015] border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl"
            >
              {/* Image */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-red-500/80 text-white backdrop-blur-md transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info & Actions */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff62a6]">
                    {product.subcategory}
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

                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md shadow-[#ff2a85]/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
