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
  const [allProducts, setAllProducts] = useState<Product[]>(() => getActiveProducts());
  const { addToast } = useToast();

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const active = getActiveProducts();
      const validProductIds = new Set(active.map((p) => p.id));
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Strictly keep only valid existing product IDs
          const valid = parsed.filter(
            (id): id is string => typeof id === 'string' && validProductIds.has(id)
          );
          return Array.from(new Set(valid));
        }
      }
    } catch (e) {
      console.error('Failed to parse wishlist storage', e);
    }
    return []; // Start empty by default
  });

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

  // Auto-prune any phantom/stale IDs that do not exist in current catalog
  useEffect(() => {
    const validProductIds = new Set(allProducts.map((p) => p.id));
    const sanitized = wishlistIds.filter((id) => validProductIds.has(id));
    if (sanitized.length !== wishlistIds.length) {
      setWishlistIds(sanitized);
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(sanitized));
      } catch (e) {
        console.error('Could not save sanitized wishlist', e);
      }
    }
  }, [allProducts, wishlistIds]);

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

  // Derived list of real wishlist products
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  // Wishlist count is ALWAYS strictly the number of actual rendered products
  const wishlistCount = wishlistProducts.length;

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.includes(productId) && allProducts.some((p) => p.id === productId);
  }, [wishlistIds, allProducts]);

  const toggleWishlist = useCallback((product: Product) => {
    if (!product || !product.id) return;
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
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
    addToast('Wishlist Cleared', 'All saved pieces have been cleared', 'info');
  }, [addToast]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount,
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
