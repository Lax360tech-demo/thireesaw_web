import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowLeft, 
  ExternalLink,
  Store
} from 'lucide-react';
import { BRAND } from '../../data/brand';

export const AdminLayout: React.FC = () => {
  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products Catalog', icon: Package },
    { to: '/admin/enquiries', label: 'Client Enquiries', icon: MessageSquare },
    { to: '/admin/orders', label: 'Orders & Dispatch', icon: ShoppingBag },
    { to: '/admin/privacy', label: 'DPDP Consent Logs', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-gray-200 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#0c0c12] border-r border-white/10 flex flex-col shrink-0">
        {/* Atelier Admin Header */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={BRAND.logo} 
              alt={BRAND.name} 
              className="h-9 w-9 rounded-full object-contain shadow-sm shadow-black/40 transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="font-serif text-sm font-bold tracking-wider text-white">
                THIREESHAW
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-[#ff2a85] uppercase font-semibold">
                Atelier Admin
              </p>
            </div>
          </Link>
          <div className="mt-3 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Salem Studio Live</span>
            </span>
            <span className="font-mono text-[#fbbf24]">Frontend Demo</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff2a85]/20 to-transparent text-white border-l-2 border-[#ff2a85] font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Return to Store & Footer snippet */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Boutique Store</span>
          </Link>

          <a
            href="https://wa.me/919865366447"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[11px] text-[#25D366] transition-all flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Direct Atelier WhatsApp</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 px-6 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Management Console</span>
            <span>/</span>
            <span className="text-white font-medium">Boutique Operations</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>View Live Storefront</span>
            </Link>
          </div>
        </header>

        {/* Nested Route Outlet */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
