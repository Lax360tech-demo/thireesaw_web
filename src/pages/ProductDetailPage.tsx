import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, ChevronRight, Check, ZoomIn, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/shop/ProductCard';
import { Badge } from '../components/common/Badge';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Classic');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'sizeGuide' | 'care' | 'delivery'>('details');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Reset states when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(product.colors[0]?.name || 'Classic');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  // Related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-24 md:pt-28 pb-24 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <Link to={`/category/${product.category}`} className="hover:text-white transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
          <span className="text-gray-200 truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero: Left Gallery & Right Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Multi-Image Showcase & Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image with Zoom Trigger */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="group relative aspect-[3/3.8] rounded-2xl overflow-hidden bg-[#101015] border border-white/10 cursor-zoom-in"
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isBridal && (
                  <Badge variant="yellow">Bridal Edition</Badge>
                )}
                {product.discount && (
                  <Badge variant="pink">{product.discount}% OFF</Badge>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomOpen(true);
                }}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/15 transition-all opacity-80 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-medium"
              >
                <ZoomIn className="w-4 h-4 text-[#fbbf24]" />
                <span>Zoom</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#ff2a85] scale-105 shadow-md shadow-[#ff2a85]/20'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Specs & Purchase Engine (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Craft Type */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ff62a6] font-semibold">
                  {product.category} • {product.craftType}
                </span>
                <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                  <Star className="w-4 h-4 fill-[#fbbf24]" />
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-[#ff2a85]/15 text-[#ff62a6] border border-[#ff2a85]/30">
                    Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Inclusive of all local atelier taxes</p>

              {/* Description */}
              <p className="mt-5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Material Highlight without sparkles */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#fbbf24] shrink-0" />
                <span>Fabric: <strong className="text-white">{product.material}</strong></span>
              </div>

              {/* Color Selector */}
              <div className="mt-6">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-2.5">
                  Color: <span className="text-white font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#ff2a85] scale-110 shadow-lg shadow-[#ff2a85]/40'
                          : 'border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                    Size / Fit: <span className="text-white font-normal">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setActiveTab('sizeGuide')}
                    className="text-[11px] text-[#fbbf24] hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedSize === s
                          ? 'bg-[#ff2a85] border-[#ff2a85] text-white shadow-lg shadow-[#ff2a85]/30'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                  Quantity
                </label>
                <div className="flex items-center border border-white/20 rounded-xl bg-white/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-white min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Bag, Buy Now, Wishlist */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="btn-press py-4 px-6 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl shadow-[#ff2a85]/30 hover:shadow-2xl hover:shadow-[#ff2a85]/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-press py-4 px-6 rounded-xl bg-[#fbbf24] hover:bg-[#fde047] text-black text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl shadow-[#fbbf24]/20 hover:shadow-2xl hover:shadow-[#fbbf24]/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>BUY NOW</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`btn-press w-full py-3.5 px-4 rounded-xl border text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inWishlist
                    ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-[#ff62a6] shadow-lg shadow-[#ff2a85]/20'
                    : 'border-white/15 text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform ${inWishlist ? 'fill-[#ff2a85] scale-110' : ''}`} />
                <span>{inWishlist ? 'SAVED IN YOUR WISHLIST' : 'ADD TO WISHLIST'}</span>
              </button>

              {/* Courier Assurances */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#fbbf24] shrink-0" />
                  <span>Worldwide Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ff2a85] shrink-0" />
                  <span>Salem Atelier Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Editorial Specifications Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          {/* Tab Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-6 border-b border-white/10 overflow-x-auto pb-px">
            {[
              { id: 'details', label: 'PRODUCT DETAILS' },
              { id: 'fabric', label: 'FABRIC & MATERIAL' },
              { id: 'sizeGuide', label: 'SIZE GUIDE' },
              { id: 'care', label: 'CARE INSTRUCTIONS' },
              { id: 'delivery', label: 'DELIVERY & COURIER' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs uppercase tracking-[0.18em] py-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#ff2a85] text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-8 max-w-4xl">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-white">Craftsmanship Specifications</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-light">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] mt-2 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] mt-2 shrink-0" />
                    <span>Occasion: {product.occasion} Wear</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] mt-2 shrink-0" />
                    <span>Specialty: {product.craftType} handcrafted at Thireeshaw Designers Salem atelier</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-white">Authentic Fabric & Weave</h4>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Every thread in our creations is sourced for durability, hand-feel, and bridal prestige.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-200">
                  <p><strong>Primary Composition:</strong> {product.material}</p>
                  <p className="mt-1"><strong>Embroidery Method:</strong> {product.craftType}</p>
                  <p className="mt-1"><strong>Origin:</strong> Salem, Tamil Nadu, India</p>
                </div>
              </div>
            )}

            {activeTab === 'sizeGuide' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-white">Standard Measurements (Inches)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-gray-300 border border-white/10 rounded-xl overflow-hidden">
                    <thead className="bg-white/5 text-white uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="p-3">Size</th>
                        <th className="p-3">Bust</th>
                        <th className="p-3">Waist</th>
                        <th className="p-3">Hip</th>
                        <th className="p-3">Blouse Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr><td className="p-3 font-semibold text-white">S (34)</td><td className="p-3">34&quot;</td><td className="p-3">28&quot;</td><td className="p-3">36&quot;</td><td className="p-3">13.5&quot;</td></tr>
                      <tr><td className="p-3 font-semibold text-white">M (36)</td><td className="p-3">36&quot;</td><td className="p-3">30&quot;</td><td className="p-3">38&quot;</td><td className="p-3">14&quot;</td></tr>
                      <tr><td className="p-3 font-semibold text-white">L (38)</td><td className="p-3">38&quot;</td><td className="p-3">32&quot;</td><td className="p-3">40&quot;</td><td className="p-3">14.5&quot;</td></tr>
                      <tr><td className="p-3 font-semibold text-white">XL (40)</td><td className="p-3">40&quot;</td><td className="p-3">34&quot;</td><td className="p-3">42&quot;</td><td className="p-3">15&quot;</td></tr>
                      <tr><td className="p-3 font-semibold text-white">XXL (42)</td><td className="p-3">42&quot;</td><td className="p-3">36&quot;</td><td className="p-3">44&quot;</td><td className="p-3">15.5&quot;</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400">
                  Need tailored measurements? Visit our{' '}
                  <Link to="/custom-blouse" className="text-[#fbbf24] underline">
                    Bespoke Design Studio
                  </Link>{' '}
                  for customized fit.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-white">Preserving Your Heirloom</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-light">
                  {product.careInstructions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] mt-2 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-white">Salem Atelier Delivery & Courier</h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-300 font-light">
                  <p>• <strong>Domestic India:</strong> Dispatch within 2-4 working days via DTDC / BlueDart express with live tracking.</p>
                  <p>• <strong>Worldwide International:</strong> Express insured shipping to USA, UK, Canada, Australia, Singapore, UAE, and Europe via DHL / FedEx.</p>
                  <p>• <strong>Custom Blouse Orders:</strong> Require 7-12 days hand needlework crafting before dispatch.</p>
                  <p>• <strong>Complimentary Shipping:</strong> On all domestic orders above ₹5,000.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#ff62a6] font-semibold">
                  COMPLETE THE ENSEMBLE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                  You May Also Admire
                </h3>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="text-xs uppercase tracking-widest text-[#fbbf24] hover:underline font-semibold"
              >
                View More {product.category}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-md"
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt="zoom view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
