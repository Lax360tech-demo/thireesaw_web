import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ShieldCheck, Truck, CreditCard, QrCode, CheckCircle2, ArrowRight, ShoppingBag, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../data/brand';
import { useToast } from '../context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, shippingFee, total, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    country: 'India',
    paymentMethod: 'upi',
    upiId: '',
    deliveryMethod: 'standard'
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      addToast('Missing Details', 'Please complete your shipping address details', 'error');
      return;
    }

    const generatedId = `TD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsOrdered(true);

    // Save order to localStorage for Admin Orders panel
    try {
      const existing = JSON.parse(localStorage.getItem('thireeshaw_orders') || '[]');
      const newOrder = {
        id: generatedId,
        customerName: formData.fullName,
        phone: formData.phone,
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        products: items.map((i) => `${i.product.name} (x${i.quantity})`).join(', '),
        totalAmount: total,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Confirmed'
      };
      localStorage.setItem('thireeshaw_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error(err);
    }

    // Celebratory confetti
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#ff2a85', '#fbbf24', '#ffffff', '#ec4899']
    });

    clearCart();
    addToast('Order Placed!', `Your order ${generatedId} has been confirmed`, 'success');
  };

  if (items.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-[#0f0f14] border border-white/10 shadow-2xl">
          <ShoppingBag className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-white mb-2">No Items to Checkout</h2>
          <p className="text-xs text-gray-400 mb-6">Your shopping bag is empty.</p>
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-xl bg-[#ff2a85] text-white text-xs uppercase tracking-widest font-semibold"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  // ORDER SUCCESS CONFIRMATION
  if (isOrdered) {
    return (
      <div className="min-h-screen pt-28 pb-24 px-4 bg-[#08080a] flex items-center justify-center">
        <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-[#101016] border border-[#ff2a85]/30 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#ff2a85]/15 border border-[#ff2a85]/40 text-[#ff2a85] flex items-center justify-center mx-auto shadow-xl shadow-[#ff2a85]/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#fbbf24] font-semibold">
              CONGRATULATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
              Order Confirmed!
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Order Reference: <strong className="text-white">{orderId}</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-2.5">
            <div className="flex justify-between text-gray-400">
              <span>Customer:</span>
              <span className="text-white font-medium">{formData.fullName}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Contact:</span>
              <span className="text-white font-medium">{formData.phone}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Dispatch Atelier:</span>
              <span className="text-white font-medium">{BRAND_CONFIG.address.locality}, Salem</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping Address:</span>
              <span className="text-white font-medium text-right max-w-[220px] truncate">
                {formData.address}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 pt-2 border-t border-white/10">
              <span>Delivery Status:</span>
              <span className="text-[#fbbf24] font-semibold">Preparing for Courier Dispatch</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Our master Salem artisans are inspecting and carefully packing your handcrafted pieces with tamper-proof luxury packaging. We will send courier tracking details directly to your phone.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              to="/shop"
              className="py-3 px-6 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-lg shadow-[#ff2a85]/30"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-6 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ff62a6] font-semibold">
            ATELIER CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white uppercase tracking-tight mt-1">
            SECURE CHECKOUT
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Address & Payment (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101015] border border-white/10 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Truck className="w-5 h-5 text-[#fbbf24]" />
                <h3 className="font-serif text-xl text-white">Shipping Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananya Raman"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Phone Number (for Courier SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98653 66447"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ananya@gmail.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Street Address, Door No., Landmark *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 14/B, Gokulam Apartments, Fairlands"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Salem / Chennai"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-gray-400 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="636005"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101015] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <CreditCard className="w-5 h-5 text-[#ff2a85]" />
                <h3 className="font-serif text-xl text-white">Payment Method</h3>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'upi', name: 'Instant UPI / GPay / PhonePe', desc: 'Scan QR or enter UPI ID for instantaneous zero-fee transfer', icon: QrCode },
                  { id: 'card', name: 'Credit or Debit Card', desc: 'Visa, MasterCard, RuPay with 256-bit SSL encryption', icon: CreditCard },
                  { id: 'netbanking', name: 'Net Banking', desc: 'All major Indian banks supported', icon: Building2 },
                  { id: 'cod', name: 'Cash on Delivery (Available in India)', desc: 'Pay cash upon delivery to the courier executive', icon: ShieldCheck }
                ].map((pay) => {
                  const Icon = pay.icon;
                  return (
                    <div
                      key={pay.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pay.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        formData.paymentMethod === pay.id
                          ? 'bg-[#18141d] border-[#ff2a85] shadow-lg shadow-[#ff2a85]/15'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === pay.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: pay.id })}
                        className="w-4 h-4 accent-[#ff2a85] mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#fbbf24]" />
                          <h4 className="text-xs sm:text-sm font-semibold text-white">{pay.name}</h4>
                        </div>
                        <p className="text-xs text-gray-400 font-light mt-0.5">{pay.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2">
                  <p>Atelier Official UPI ID: <strong className="text-[#fbbf24]">thireeshaw.designers@okaxis</strong></p>
                  <p className="text-[11px] text-gray-400">Payment confirmation is verified on submit.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary (Span 5) */}
          <div className="lg:col-span-5 bg-[#111117] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl sticky top-28 space-y-6">
            <h3 className="font-serif text-xl text-white pb-3 border-b border-white/10">
              Order Review
            </h3>

            {/* Compact Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-white/5">
              {items.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-medium text-white truncate">{item.product.name}</h5>
                    <p className="text-gray-400 mt-0.5">
                      Qty: {item.quantity} • Size: {item.selectedSize}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-white shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#ff62a6]">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#fbbf24] font-semibold">COMPLIMENTARY</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-base">
                <span className="font-semibold text-white">Grand Total</span>
                <span className="font-serif text-2xl font-bold text-white">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 flex items-center justify-center gap-2"
              >
                <span>CONFIRM & PLACE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1 text-center">
              <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
              <span>Worldwide Courier from Salem Atelier Guaranteed</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
