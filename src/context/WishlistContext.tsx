import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { getActiveProducts } from '../data/products';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'thireeshaw_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Strict deduplication
          return Array.from(new Set(parsed.filter((id): id is string => typeof id === 'string' && id.length > 0)));
        }
      }
      return ['td-bls-01', 'td-sar-01']; // default sample favorites
    } catch {
      return ['td-bls-01', 'td-sar-01'];
    }
  });

  const [allProducts, setAllProducts] = useState<Product[]>(() => getActiveProducts());
  const { addToast } = useToast();

  // Listen to product updates (e.g. from admin panel or storage)
  useEffect(() => {
    const handleProductsChange = () => {
      setAllProducts(getActiveProducts());
    };
    window.addEventListener('storage', handleProductsChange);
    window.addEventListener('products-updated', handleProductsChange);
    return () => {
      window.removeEventListener('storage', handleProductsChange);
      window.removeEventListener('products-updated', handleProductsChange);
    };
  }, []);

  // Save to localStorage whenever wishlistIds changes
  useEffect(() => {
    try {
      const uniqueIds = Array.from(new Set(wishlistIds));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(uniqueIds));
      window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: uniqueIds }));
    } catch (e) {
      console.error('Could not save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast('Removed from Wishlist', `${product.name} removed from your saved pieces`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast('Saved to Wishlist', `${product.name} added to your personal curation`, 'success');
        return Array.from(new Set([...prev, product.id]));
      }
    });
  }, [addToast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => {
      const product = allProducts.find((p) => p.id === productId);
      const name = product ? product.name : 'Item';
      addToast('Removed from Wishlist', `${name} removed from your wishlist`, 'info');
      return prev.filter((id) => id !== productId);
    });
  }, [addToast, allProducts]);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    addToast('Wishlist Cleared', 'All saved pieces have been cleared', 'info');
  }, [addToast]);

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
