import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    freeShippingThreshold,
    appliedPromo,
    applyPromo,
    removePromo,
    itemCount
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError(res.message);
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#0f0f14] border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-white mb-2">Your Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mb-6">
            Your shopping bag does not contain any creations yet. Explore our handcrafted bridal sarees, blousery, and wedding gagras.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#ff2a85]/30"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-6 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold">
            YOUR SELECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight mt-1">
            YOUR BAG ({itemCount})
          </h1>
        </div>

        {/* Free Shipping Progress Banner */}
        <div className="p-4 rounded-2xl bg-[#121218] border border-white/10 mb-8 max-w-2xl">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Truck className="w-4 h-4 text-[#fbbf24]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#fbbf24] font-semibold">
                  Congratulations! You unlocked Complimentary Express Courier.
                </span>
              ) : (
                <span>
                  Add <strong className="text-white">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for Complimentary Delivery
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-[#fbbf24]">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List (Span 8) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 rounded-2xl bg-[#101015] border border-white/10 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border border-white/10 shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-widest text-[#ff62a6]">
                      {item.product.subcategory}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="font-serif text-lg text-white hover:text-[#fbbf24] cursor-pointer transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-gray-400 mt-1 space-x-2">
                      <span>Size: <strong className="text-gray-200">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-gray-200">{item.selectedColor}</strong></span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-2">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Controls & Total */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="flex items-center border border-white/20 rounded-xl bg-black/40">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-gray-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-gray-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-serif text-base sm:text-lg font-bold text-white">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-400 p-1 rounded-lg transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Promo Code (Span 4) */}
          <div className="lg:col-span-4 bg-[#111117] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl sticky top-28 space-y-6">
            <h3 className="font-serif text-xl text-white pb-3 border-b border-white/10">
              Order Summary
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#ff62a6]">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-300">
                <span>Estimated Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#fbbf24] font-semibold">COMPLIMENTARY</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between text-base">
                <span className="font-semibold text-white">Total Amount</span>
                <span className="font-serif text-2xl font-bold text-white">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-4 border-t border-white/10">
              <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Promo Code</span>
              </label>

              {appliedPromo ? (
                <div className="p-3 rounded-xl bg-[#ff2a85]/15 border border-[#ff2a85]/40 flex items-center justify-between text-xs text-white">
                  <div>
                    <strong>{appliedPromo.code}</strong> applied ({appliedPromo.description})
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs text-[#ff62a6] hover:text-white underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. BRIDAL2026 or WELCOME500"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-[#ff2a85]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-400 mt-1.5">{promoError}</p>
              )}
              <p className="text-[11px] text-gray-500 mt-2">
                Tip: Use <strong>BRIDAL2026</strong> for 10% off or <strong>WELCOME500</strong> for ₹500 discount.
              </p>
            </div>

            {/* Checkout Button */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2 text-center">
              <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
              <span>Salem Boutique Safe & Insured Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
