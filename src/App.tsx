import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { MobileMenu } from './components/common/MobileMenu';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/search/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { ContactPopup } from './components/common/ContactPopup';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { CookieConsent } from './components/common/CookieConsent';

// Store Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CustomBlousePage } from './pages/CustomBlousePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

// Admin Panel Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminPrivacyLogs } from './pages/admin/AdminPrivacyLogs';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // If visiting Admin Portal, render dedicated Admin layout
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#07070a] text-[#f3f4f6]">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="privacy" element={<AdminPrivacyLogs />} />
          </Route>
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#08080a] text-[#f3f4f6]">
      <ScrollToTop />

      {/* Global Luxury Sticky Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Slide-in Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Interactive Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartDrawer />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/custom-blouse" element={<CustomBlousePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* First-Visit Boutique Enquiry Popup */}
      <ContactPopup />

      {/* Direct WhatsApp Floating Support Button */}
      <FloatingWhatsApp />

      {/* DPDP Aligned Cookie & Privacy Consent Banner & Preferences */}
      <CookieConsent />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
