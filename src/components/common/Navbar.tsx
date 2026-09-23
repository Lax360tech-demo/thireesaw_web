import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BRAND_CONFIG } from '../../data/brand';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

const NAV_LINKS = [
  { name: 'HOME', path: '/' },
  { name: 'SHOP', path: '/shop' },
  { name: 'SAREES', path: '/category/sarees' },
  { name: 'SALWAR', path: '/category/salwar' },
  { name: 'GAGRA', path: '/category/gagra' },
  { name: 'JEWELLERY', path: '/category/jewellery' },
  { name: 'BRIDAL', path: '/category/bridal' },
  { name: 'BLOUSES', path: '/category/blouses' },
  { name: 'CUSTOM BLOUSE', path: '/custom-blouse', highlight: true },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#08080a]/92 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/70'
          : 'py-3.5 bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-white/5'
      }`}
    >
      {/* Full-width container with generous padding */}
      <div className="w-full px-3 sm:px-6 md:px-8 xl:px-12">
        <div className="grid grid-cols-[auto_1fr_auto] lg:flex items-center justify-between gap-2 sm:gap-4 w-full">
          {/* Mobile Left: Menu Hamburger */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={onOpenMobileMenu}
              className="btn-press p-2 -ml-1 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Brand: Uploaded Logo + Wordmark (Centered on mobile, left on desktop) */}
          <Link to="/" className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 min-w-0 group overflow-hidden">
            {/* Logo Image */}
            <div className="relative flex items-center justify-center shrink-0">
              <img
                src={BRAND_CONFIG.logoUrl}
                alt="Thireeshaw Designers Logo"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 rounded-full object-contain shadow-sm shadow-black/40 transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Compact Brand Typography */}
            <div className="flex flex-col min-w-0 text-center lg:text-left overflow-hidden">
              <div className="flex items-center justify-center lg:justify-start gap-1 truncate">
                <span className="font-serif text-xs xs:text-sm sm:text-base font-medium tracking-[0.14em] text-white uppercase group-hover:text-[#fbbf24] transition-colors truncate">
                  THIREESHAW
                </span>
                <span className="font-serif text-xs xs:text-sm sm:text-base font-light tracking-[0.14em] text-[#ff2a85] uppercase shrink-0">
                  DESIGNERS
                </span>
              </div>
              <span className="hidden xs:block text-[7.5px] sm:text-[9px] tracking-[0.2em] text-gray-400 uppercase font-sans font-medium truncate">
                {BRAND_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-6 flex-1 px-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[11px] xl:text-xs tracking-[0.14em] font-medium transition-all py-1 whitespace-nowrap hover:-translate-y-0.5 ${
                    active
                      ? 'text-white font-semibold'
                      : link.highlight
                      ? 'text-[#fbbf24] hover:text-[#fde047]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute -bottom-1 inset-x-0 h-[2px] bg-[#ff2a85] rounded-full shadow-sm shadow-[#ff2a85]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 justify-end">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn-press relative p-2 text-gray-300 hover:text-[#ff62a6] rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#ff2a85] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#08080a] animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <button
              onClick={openCart}
              className="btn-press relative p-2 text-gray-300 hover:text-[#fbbf24] rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={`Shopping bag (${itemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#fbbf24] text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#08080a] animate-scaleIn">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
