import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isActive('/') ? 'text-[#ff2a85]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Home</span>
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isActive('/shop') || isActive('/category') ? 'text-[#ff2a85]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Shop</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            isActive('/wishlist') ? 'text-[#ff2a85]' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 bg-[#ff2a85] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Wishlist</span>
        </Link>

        {/* Bag */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center py-1 px-3 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#fbbf24] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="text-[10px] font-medium tracking-wider uppercase mt-1">Bag</span>
        </button>
      </div>
    </div>
  );
};
