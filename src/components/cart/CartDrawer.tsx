import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    subtotal,
    total,
    shippingFee,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    itemCount,
    addToCart
  } = useCart();

  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Recommendations: pick 2 products not currently in the cart
  const cartProductIds = items.map((i) => i.product.id);
  const recommendations = PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 2);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="w-screen max-w-md bg-[#0e0e13] border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#13131a]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#ff2a85]" />
                  <h3 className="font-serif text-lg tracking-wide text-white uppercase">
                    Your Shopping Bag ({itemCount})
                  </h3>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Courier Progress Bar */}
              <div className="px-5 py-3 bg-[#171720] border-b border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Truck className="w-3.5 h-3.5 text-[#fbbf24]" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-[#fbbf24] font-medium">You unlocked Complimentary Courier!</span>
                    ) : (
                      <span>
                        Add <strong className="text-white">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for Free Courier
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-white/5">
                {items.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-serif text-xl text-white mb-2">Your Bag is Empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                      Explore our handcrafted Kanchipuram sarees, bridal blouses, and designer collections.
                    </p>
                    <button
                      onClick={() => {
                        closeCart();
                        navigate('/shop');
                      }}
                      className="px-6 py-2.5 bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors"
                    >
                      Explore The Edit
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-lg border border-white/10 shrink-0 cursor-pointer"
                        onClick={() => {
                          closeCart();
                          navigate(`/product/${item.product.id}`);
                        }}
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4
                              onClick={() => {
                                closeCart();
                                navigate(`/product/${item.product.id}`);
                              }}
                              className="text-sm font-medium text-white hover:text-[#fbbf24] cursor-pointer line-clamp-1 transition-colors"
                            >
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5 space-x-2">
                            <span>Size: <strong className="text-gray-300">{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span>Color: <strong className="text-gray-300">{item.selectedColor}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-white/15 rounded-lg bg-black/40">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-white min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-gray-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <span className="text-sm font-semibold text-white">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Upsell / You May Also Like */}
                {items.length > 0 && recommendations.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 flex items-center justify-between">
                      <span>You May Also Like</span>
                      <span className="text-[10px] text-[#fbbf24]">Handpicked</span>
                    </p>
                    <div className="space-y-2.5">
                      {recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                        >
                          <img
                            src={rec.images[0]}
                            alt={rec.name}
                            className="w-12 h-14 object-cover rounded-lg shrink-0 border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-medium text-white truncate">{rec.name}</h5>
                            <p className="text-xs font-semibold text-[#fbbf24] mt-0.5">
                              ₹{rec.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <button
                            onClick={() => addToCart(rec, rec.sizes[0], rec.colors[0]?.name, 1)}
                            className="text-[11px] px-2.5 py-1 bg-[#ff2a85]/20 hover:bg-[#ff2a85] text-[#ff62a6] hover:text-white border border-[#ff2a85]/40 rounded-lg transition-colors font-medium shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer / Checkout CTA */}
              {items.length > 0 && (
                <div className="p-5 border-t border-white/10 bg-[#13131a] space-y-3.5">
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Courier Delivery</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-[#fbbf24] font-medium">COMPLIMENTARY</span>
                        ) : (
                          <span className="text-white">₹{shippingFee}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                      <span className="font-semibold text-white">Estimated Total</span>
                      <span className="font-serif text-lg font-bold text-white">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={handleViewCart}
                      className="py-3 px-4 rounded-xl border border-white/20 text-white hover:bg-white/10 text-xs uppercase tracking-widest font-semibold transition-colors text-center"
                    >
                      View Bag
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="py-3 px-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#ff2a85]/25 flex items-center justify-center gap-1.5 group"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Salem Boutique Craftsmanship • Worldwide Courier Available</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
