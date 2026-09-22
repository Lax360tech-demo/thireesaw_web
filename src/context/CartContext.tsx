import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

interface PromoCode {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  description: string;
  minOrder: number;
}

const VALID_PROMOS: PromoCode[] = [
  { code: 'BRIDAL2026', type: 'percent', value: 10, description: '10% Bridal Studio Privilege Discount', minOrder: 5000 },
  { code: 'WELCOME500', type: 'fixed', value: 500, description: '₹500 Atelier Welcome Gift', minOrder: 3000 },
  { code: 'THIREESHAW', type: 'percent', value: 15, description: '15% VIP Festive Privilege', minOrder: 10000 }
];

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  isCartOpen: boolean;
  appliedPromo: PromoCode | null;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number, notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'thireeshaw_cart_v1';
const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    }
    // Default initial luxury item for instant interactive preview
    const sampleProduct = PRODUCTS.find((p) => p.id === 'td-bls-01') || PRODUCTS[0];
    return [
      {
        id: `${sampleProduct.id}-38-${sampleProduct.colors[0]?.name || 'default'}`,
        product: sampleProduct,
        selectedSize: sampleProduct.sizes[1] || sampleProduct.sizes[0] || 'Standard',
        selectedColor: sampleProduct.colors[0]?.name || 'Classic',
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [items]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback((
    product: Product,
    size?: string,
    color?: string,
    quantity = 1,
    notes?: string
  ) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity, customNotes: notes || item.customNotes }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity,
            customNotes: notes
          }
        ];
      }
    });

    addToast(
      'Added to Shopping Bag',
      `${product.name} (${chosenSize}) added to your bag`,
      'success'
    );
    setIsCartOpen(true);
  }, [addToast]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === cartItemId);
      if (target) {
        addToast('Item Removed', `${target.product.name} removed from bag`, 'info');
      }
      return prev.filter((item) => item.id !== cartItemId);
    });
  }, [addToast]);

  const updateQuantity = useCallback((cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
    addToast('Shopping Bag Cleared', 'All items have been removed', 'info');
  }, [addToast]);

  const applyPromo = useCallback((rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    const found = VALID_PROMOS.find((p) => p.code === code);

    if (!found) {
      addToast('Invalid Coupon', `Code "${rawCode}" is invalid or expired. Try "BRIDAL2026" or "WELCOME500"`, 'error');
      return { success: false, message: 'Invalid promo code' };
    }

    const currentSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (currentSubtotal < found.minOrder) {
      addToast('Minimum Order Required', `Promo requires minimum order of ₹${found.minOrder.toLocaleString('en-IN')}`, 'error');
      return { success: false, message: `Minimum order ₹${found.minOrder.toLocaleString('en-IN')} required` };
    }

    setAppliedPromo(found);
    addToast('Promo Applied!', `${found.description} applied to your order`, 'success');
    return { success: true, message: `${found.description} applied successfully!` };
  }, [items, addToast]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    addToast('Promo Removed', 'Coupon code has been removed', 'info');
  }, [addToast]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.round((subtotal * appliedPromo.value) / 100);
    }
    return Math.min(appliedPromo.value, subtotal);
  }, [subtotal, appliedPromo]);

  const shippingFee = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [items.length, subtotal]);

  const total = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [items.length, subtotal, discountAmount, shippingFee]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        applyPromo,
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
