import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  MessageSquare, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowUpRight, 
  MapPin
} from 'lucide-react';
import { getActiveProducts, BRAND_INFO } from '../../data/products';

export const AdminDashboard: React.FC = () => {
  const [productCount, setProductCount] = useState(0);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [consentLogs, setConsentLogs] = useState<any[]>([]);

  useEffect(() => {
    // 1. Products
    const products = getActiveProducts();
    setProductCount(products.length);

    // 2. Enquiries
    try {
      const enqRaw = localStorage.getItem('thireeshaw_enquiries');
      if (enqRaw) {
        setEnquiries(JSON.parse(enqRaw));
      } else {
        // Seed default realistic enquiries so admin looks alive immediately
        const initialEnquiries = [
          {
            id: 'ENQ-892101',
            name: 'Kavitha Ramachandran',
            phone: '98402 11234',
            email: 'kavitha.r@gmail.com',
            service: 'Bespoke Bridal Blouse',
            message: 'Need heavy Aari work peacock bridal blouse for muhurtham saree on Dec 12.',
            source: 'Contact Page',
            status: 'In Progress',
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
          },
          {
            id: 'ENQ-892102',
            name: 'Dr. Meenakshi S.',
            phone: '97901 88321',
            email: 'meenakshi.s@outlook.com',
            service: 'Pattu Blouse Embroidery',
            message: 'Custom elbow sleeve zardosi embroidery with antique beads for silk saree.',
            source: 'Welcome Popup',
            status: 'New',
            createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
          },
          {
            id: 'ENQ-892103',
            name: 'Ananya Deshmukh (USA)',
            phone: '+1 408 555 0199',
            email: 'ananya.d@yahoo.com',
            service: 'Worldwide Courier Consultation',
            message: 'Looking for 3 custom blouses and Kanchi silk saree dispatch to California.',
            source: 'Welcome Popup',
            status: 'Contacted',
            createdAt: new Date(Date.now() - 3600000 * 22).toISOString()
          }
        ];
        localStorage.setItem('thireeshaw_enquiries', JSON.stringify(initialEnquiries));
        setEnquiries(initialEnquiries);
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Orders
    try {
      const ordRaw = localStorage.getItem('thireeshaw_orders');
      if (ordRaw) {
        setOrders(JSON.parse(ordRaw));
      } else {
        const initialOrders = [
          {
            id: 'TD-ORD-98231',
            customer: 'Revathi Subramaniam',
            phone: '98651 22345',
            city: 'Chennai',
            itemsCount: 2,
            totalAmount: 38400,
            paymentMethod: 'UPI / GPAY',
            date: '21 Sep 2026',
            status: 'Hand Embroidery'
          },
          {
            id: 'TD-ORD-98230',
            customer: 'Lakshmi Narayanan',
            phone: '94432 77123',
            city: 'Salem',
            itemsCount: 1,
            totalAmount: 18500,
            paymentMethod: 'COD',
            date: '20 Sep 2026',
            status: 'Quality Check'
          },
          {
            id: 'TD-ORD-98229',
            customer: 'Sneha Venkatesh',
            phone: '98840 99456',
            city: 'Bangalore',
            itemsCount: 3,
            totalAmount: 49200,
            paymentMethod: 'CARD',
            date: '19 Sep 2026',
            status: 'Dispatched'
          }
        ];
        localStorage.setItem('thireeshaw_orders', JSON.stringify(initialOrders));
        setOrders(initialOrders);
      }
    } catch (e) {
      console.error(e);
    }

    // 4. Consent logs
    try {
      const logsRaw = localStorage.getItem('thireeshaw_consent_logs');
      if (logsRaw) {
        setConsentLogs(JSON.parse(logsRaw));
      } else {
        const initialConsent = [
          {
            id: 'CONSENT-104921',
            timestamp: new Date().toISOString(),
            essential: true,
            preferences: true,
            analytics: true,
            marketing: true,
            action: 'Accepted All',
            device: 'Desktop Browser'
          }
        ];
        localStorage.setItem('thireeshaw_consent_logs', JSON.stringify(initialConsent));
        setConsentLogs(initialConsent);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#12121e] via-[#0e0e16] to-[#141018] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
              Atelier Command Center
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff2a85]/10 text-[#ff2a85] border border-[#ff2a85]/30 text-[11px] font-semibold">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light">
            Real-time control for Thireeshaw Designers Salem atelier: bespoke catalog, bridal enquiries, orders & DPDP compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_12px_rgba(255,42,133,0.3)] flex items-center gap-1.5"
          >
            <span>Manage Catalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Products */}
        <Link
          to="/admin/products"
          className="p-5 rounded-2xl bg-[#0e0e16] border border-white/10 hover:border-[#fbbf24]/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Active Catalog
            </span>
            <div className="p-2.5 rounded-xl bg-[#fbbf24]/10 text-[#fbbf24] group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white">{productCount}</span>
            <span className="text-xs text-emerald-400 font-medium">Boutique items</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Sarees, Salwars, Gagras, Blouses</p>
        </Link>

        {/* Metric 2: Enquiries */}
        <Link
          to="/admin/enquiries"
          className="p-5 rounded-2xl bg-[#0e0e16] border border-white/10 hover:border-[#ff2a85]/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Client Enquiries
            </span>
            <div className="p-2.5 rounded-xl bg-[#ff2a85]/10 text-[#ff2a85] group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white">{enquiries.length}</span>
            <span className="text-xs text-[#ff62a6] font-medium">
              {enquiries.filter((e) => e.status === 'New').length} Pending
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">From contact page & welcome popup</p>
        </Link>

        {/* Metric 3: Orders */}
        <Link
          to="/admin/orders"
          className="p-5 rounded-2xl bg-[#0e0e16] border border-white/10 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Simulated Orders
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white">{orders.length}</span>
            <span className="text-xs text-emerald-400 font-medium">Recorded</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Tracked through checkout flow</p>
        </Link>

        {/* Metric 4: Consent Logs */}
        <Link
          to="/admin/privacy"
          className="p-5 rounded-2xl bg-[#0e0e16] border border-white/10 hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              DPDP Consent Logs
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white">{consentLogs.length}</span>
            <span className="text-xs text-blue-400 font-medium">Auditable</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Digital Data Protection audit records</p>
        </Link>
      </div>

      {/* Atelier Status Banner */}
      <div className="p-4 rounded-xl bg-[#11111a] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#fbbf24]/10 text-[#fbbf24]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-medium">Salem Atelier Craft Units: </span>
            <span className="text-gray-300">Hand Zardosi (Active) • Computer Embroidery (Active) • Worldwide Courier (Operational)</span>
          </div>
        </div>
        <div className="text-gray-400 font-mono text-[11px]">
          Location: {BRAND_INFO.address.city}, Tamil Nadu
        </div>
      </div>

      {/* Two Column Section: Recent Enquiries & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="p-6 rounded-2xl bg-[#0e0e16] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#ff2a85]" />
              <h3 className="font-serif text-base font-bold text-white">
                Recent Client Enquiries
              </h3>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs text-[#fbbf24] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{enq.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      enq.status === 'New'
                        ? 'bg-[#ff2a85]/20 text-[#ff62a6] border border-[#ff2a85]/30'
                        : enq.status === 'In Progress'
                        ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-400 text-[11px]">
                  <span>{enq.service}</span>
                  <span className="font-mono text-gray-400">{enq.phone}</span>
                </div>
                <p className="text-gray-400 truncate text-[11px] italic font-light">
                  "{enq.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="p-6 rounded-2xl bg-[#0e0e16] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <h3 className="font-serif text-base font-bold text-white">
                Recent Atelier Orders
              </h3>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs text-[#fbbf24] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-400">{ord.id}</span>
                    <span className="font-semibold text-white">{ord.customer}</span>
                  </div>
                  <span className="text-[#fbbf24] font-semibold">
                    ₹{ord.totalAmount?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-400 text-[11px]">
                  <span>{ord.city} • {ord.itemsCount || 1} Item(s)</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-medium">
                    {ord.status || 'Confirmed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
