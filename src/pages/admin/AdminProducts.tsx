import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  RefreshCw, 
  Check, 
  X
} from 'lucide-react';
import { Product, ProductCategory, CraftType, OccasionType } from '../../types';
import { getActiveProducts, saveActiveProducts, INITIAL_PRODUCTS } from '../../data/products';
import kanchipuramBridalImg from '../../assets/products/sarees/kanchipuram_bridal.jpg';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('sarees');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formMaterial, setFormMaterial] = useState('Pure Silk & Gold Zari');
  const [formCraftType, setFormCraftType] = useState<CraftType>('Pattu Blouse Work');
  const [formOccasion, setFormOccasion] = useState<OccasionType>('Wedding');
  const [formDescription, setFormDescription] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formInStock, setFormInStock] = useState(true);
  const [formIsBridal, setFormIsBridal] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  const loadProducts = () => {
    setProducts(getActiveProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('sarees');
    setFormSubcategory('');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormImage(kanchipuramBridalImg);
    setFormMaterial('Pure Mulberry Silk & Zari');
    setFormCraftType('Pattu Blouse Work');
    setFormOccasion('Wedding');
    setFormDescription('Bespoke boutique creation hand-finished at Thireeshaw Designers Salem atelier.');
    setFormShortDesc('Handcrafted bridal boutique design.');
    setFormInStock(true);
    setFormIsBridal(false);
    setFormIsFeatured(false);
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormSubcategory(product.subcategory || '');
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormImage(product.images[0] || '');
    setFormMaterial(product.material);
    setFormCraftType(product.craftType);
    setFormOccasion(product.occasion);
    setFormDescription(product.description);
    setFormShortDesc(product.shortDescription);
    setFormInStock(product.inStock);
    setFormIsBridal(product.isBridal);
    setFormIsFeatured(product.isFeatured);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    const priceNum = parseInt(formPrice, 10);
    const origPriceNum = formOriginalPrice ? parseInt(formOriginalPrice, 10) : undefined;
    const discount = origPriceNum && origPriceNum > priceNum 
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) 
      : undefined;

    let updatedList: Product[];

    if (editingProduct) {
      // Edit
      updatedList = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName.trim(),
            category: formCategory,
            subcategory: formSubcategory.trim() || p.subcategory,
            price: priceNum,
            originalPrice: origPriceNum,
            discount,
            images: [formImage.trim() || p.images[0]],
            material: formMaterial,
            craftType: formCraftType,
            occasion: formOccasion,
            description: formDescription.trim(),
            shortDescription: formShortDesc.trim(),
            inStock: formInStock,
            isBridal: formIsBridal,
            isFeatured: formIsFeatured,
          };
        }
        return p;
      });
      showNotification('Product updated successfully!');
    } else {
      // Add new
      const newProduct: Product = {
        id: `td-cust-${Date.now().toString().slice(-6)}`,
        name: formName.trim(),
        category: formCategory,
        subcategory: formSubcategory.trim() || 'Custom Atelier',
        price: priceNum,
        originalPrice: origPriceNum,
        discount,
        images: [formImage.trim() || kanchipuramBridalImg],
        colors: [{ name: 'Bridal Wine', hex: '#881337' }, { name: 'Gold', hex: '#ca8a04' }],
        sizes: ['Free Size / Custom Stitching'],
        description: formDescription.trim() || 'Handcrafted bespoke piece from Thireeshaw Designers Salem.',
        shortDescription: formShortDesc.trim() || 'Exquisite craftsmanship tailored for festive grandeur.',
        material: formMaterial,
        craftType: formCraftType,
        occasion: formOccasion,
        isBridal: formIsBridal,
        isNew: true,
        isFeatured: formIsFeatured,
        inStock: formInStock,
        rating: 5.0,
        reviewsCount: 1,
        details: [
          'Handcrafted at Salem Atelier',
          'Premium artisan hand/machine embroidery',
          'Custom sizing available on request'
        ],
        careInstructions: ['Strictly dry clean only']
      };
      updatedList = [newProduct, ...products];
      showNotification('New product added to catalog!');
    }

    saveActiveProducts(updatedList);
    setProducts(updatedList);
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveActiveProducts(updated);
    setProducts(updated);
    setDeleteConfirmId(null);
    showNotification('Product removed from catalog.');
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog back to the original 20 boutique reference products?')) {
      localStorage.removeItem('thireeshaw_custom_products');
      setProducts(INITIAL_PRODUCTS);
      showNotification('Catalog reset to original 20 products.');
    }
  };

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'all' || 
      p.category === selectedCategory ||
      (selectedCategory === 'bridal' && p.isBridal);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Products Catalog Management
          </h2>
          <p className="text-xs text-gray-400">
            Create, edit, or remove products across Sarees, Salwar, Gagra, and Blouse collections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetCatalog}
            title="Reset to 20 Default Products"
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Reset 20 Defaults</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_12px_rgba(255,42,133,0.3)] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by title, category, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0c0c12] border border-white/10 text-white text-xs placeholder-gray-500 outline-none focus:border-[#fbbf24] transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['all', 'sarees', 'salwar', 'gagra', 'blouses', 'bridal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#fbbf24] text-black font-semibold shadow-sm'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Craft / Material</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Item Image & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-11 h-14 object-cover rounded-lg border border-white/10 shrink-0 bg-neutral-900"
                      />
                      <div className="max-w-xs">
                        <span className="font-semibold text-white block truncate">{p.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{p.id}</span>
                        {p.isBridal && (
                          <span className="ml-2 inline-block text-[9px] px-1.5 py-0.2 rounded bg-[#ff2a85]/20 text-[#ff62a6] font-medium border border-[#ff2a85]/30">
                            Bridal
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="uppercase text-[10px] font-semibold tracking-wider text-[#fbbf24]">
                      {p.category}
                    </span>
                    <span className="text-gray-400 block text-[11px] truncate">
                      {p.subcategory}
                    </span>
                  </td>

                  {/* Craft & Material */}
                  <td className="py-3 px-4">
                    <span className="text-gray-300 block">{p.craftType}</span>
                    <span className="text-gray-400 text-[10px] block truncate max-w-[150px]">
                      {p.material}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-mono font-medium">
                    <div className="text-white">₹{p.price.toLocaleString('en-IN')}</div>
                    {p.originalPrice && (
                      <div className="text-gray-400 line-through text-[10px]">
                        ₹{p.originalPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>

                  {/* In Stock */}
                  <td className="py-3 px-4">
                    {p.inStock ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Sold Out
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0e0e16] border border-white/15 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Confirm Removal</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Are you sure you want to remove this product from the atelier catalog? This change will reflect immediately in the customer storefront.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0e0e16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg font-bold text-white">
                {editingProduct ? 'Edit Atelier Product' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peacock Motifs Aari Bridal Blouse"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs outline-none cursor-pointer"
                  >
                    <option value="sarees">Sarees</option>
                    <option value="salwar">Salwar</option>
                    <option value="gagra">Gagra</option>
                    <option value="blouses">Blouses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Subcategory / Style
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bridal Aari Embroidery"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 14500"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Original MRP (INR ₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 18000"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Image URL *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Image URL or local asset path"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                  />
                  {formImage && (
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-10 h-12 object-cover rounded border border-white/10 shrink-0 bg-neutral-900"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Fabric & Material
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Silk, Zari & Beads"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Craft Technique
                  </label>
                  <select
                    value={formCraftType}
                    onChange={(e) => setFormCraftType(e.target.value as CraftType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs outline-none cursor-pointer"
                  >
                    <option value="Pattu Blouse Work">Pattu Blouse Work</option>
                    <option value="Zardozi & Aari">Zardozi & Aari</option>
                    <option value="Hand Embroidery">Hand Embroidery</option>
                    <option value="Machine Embroidery">Machine Embroidery</option>
                    <option value="Zari Weave">Zari Weave</option>
                    <option value="Kundan & Cutwork">Kundan & Cutwork</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Occasion
                </label>
                <select
                  value={formOccasion}
                  onChange={(e) => setFormOccasion(e.target.value as OccasionType)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs outline-none cursor-pointer"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Festive">Festive</option>
                  <option value="Party">Party</option>
                  <option value="Casual">Casual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-[#fbbf24] text-white text-xs outline-none transition-colors resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-[#fbbf24] focus:ring-0"
                  />
                  <span>Mark as In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formIsBridal}
                    onChange={(e) => setFormIsBridal(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-[#ff2a85] focus:ring-0"
                  />
                  <span>Bridal Collection Exclusive</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-[#fbbf24] focus:ring-0"
                  />
                  <span>Featured on Home Page</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
