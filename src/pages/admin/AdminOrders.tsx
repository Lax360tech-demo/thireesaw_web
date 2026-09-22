import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X,
  Filter,
  Truck,
  MapPin
} from 'lucide-react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  city: string;
  address?: string;
  itemsCount: number;
  items?: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  date: string;
  status: 'Confirmed' | 'Pattern Cutting' | 'Hand Embroidery' | 'Quality Check' | 'Dispatched' | 'Delivered';
}

const STORAGE_KEY = 'thireeshaw_orders';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const loadOrders = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setOrders(JSON.parse(raw));
      } else {
        const seedOrders: Order[] = [
          {
            id: 'TD-ORD-98231',
            customer: 'Revathi Subramaniam',
            phone: '98651 22345',
            city: 'Chennai',
            address: 'No. 42, 2nd Main Road, Gandhi Nagar, Adyar',
            itemsCount: 2,
            items: [
              { name: 'Royal Kanchipuram Pure Silk Bridal Saree', price: 24500, quantity: 1, selectedSize: 'Free Size', selectedColor: 'Bridal Crimson Red' },
              { name: 'Peacock Motif Heavy Bridal Aari Blouse', price: 13900, quantity: 1, selectedSize: '36', selectedColor: 'Antique Gold' }
            ],
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
            address: '15/3, Alagapuram Main Road, Fairlands',
            itemsCount: 1,
            items: [
              { name: 'Temple Architecture Kasavu Bridal Blouse', price: 18500, quantity: 1, selectedSize: '34', selectedColor: 'Gold Zari' }
            ],
            totalAmount: 18500,
            paymentMethod: 'CASH ON DELIVERY',
            date: '20 Sep 2026',
            status: 'Quality Check'
          },
          {
            id: 'TD-ORD-98229',
            customer: 'Sneha Venkatesh',
            phone: '98840 99456',
            city: 'Bangalore',
            address: 'Flat 402, Prestige Palms, Whitefield',
            itemsCount: 3,
            items: [
              { name: 'Bridal Crimson Raw Silk Zardosi Blouse', price: 16500, quantity: 1, selectedSize: '38' },
              { name: 'Burgundy Velvet Heavy Bridal Gagra Choli', price: 32700, quantity: 1, selectedSize: 'M' }
            ],
            totalAmount: 49200,
            paymentMethod: 'CREDIT CARD',
            date: '19 Sep 2026',
            status: 'Dispatched'
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedOrders));
        setOrders(seedOrders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = (id: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setOrders(updated);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showToast(`Order status updated to ${newStatus}`);
  };

  const deleteOrder = (id: string) => {
    if (window.confirm('Delete this order record?')) {
      const updated = orders.filter((o) => o.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setOrders(updated);
      if (selectedOrder?.id === id) setSelectedOrder(null);
      showToast('Order record removed.');
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Atelier Orders & Dispatch
          </h2>
          <p className="text-xs text-gray-400">
            Track customer orders placed across store checkout, manage craft stages, and monitor courier delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            Active Orders: <strong className="text-emerald-400">{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0c0c12] border border-white/10 text-white text-xs placeholder-gray-500 outline-none focus:border-[#fbbf24] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" />
          {['all', 'Confirmed', 'Hand Embroidery', 'Quality Check', 'Dispatched', 'Delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer & City</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Craft / Dispatch Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No order records found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Order ID & Date */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-semibold text-white block">{ord.id}</span>
                      <span className="text-[11px] text-gray-400">{ord.date}</span>
                    </td>

                    {/* Customer & City */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{ord.customer}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#ff2a85]" />
                        <span>{ord.city}</span>
                        <span>•</span>
                        <span className="font-mono text-gray-300">{ord.phone}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-200 font-medium">
                        {ord.itemsCount || 1} Item(s)
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3 px-4 font-mono font-semibold text-[#fbbf24]">
                      ₹{ord.totalAmount?.toLocaleString('en-IN')}
                      <span className="block text-[10px] text-gray-400 font-normal">
                        {ord.paymentMethod}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateStatus(ord.id, e.target.value as Order['status'])}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium outline-none cursor-pointer border ${
                          ord.status === 'Dispatched' || ord.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : ord.status === 'Hand Embroidery'
                            ? 'bg-[#ff2a85]/20 text-[#ff62a6] border-[#ff2a85]/30'
                            : ord.status === 'Quality Check'
                            ? 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        <option value="Confirmed" className="bg-[#14141c] text-white">Confirmed</option>
                        <option value="Pattern Cutting" className="bg-[#14141c] text-white">Pattern Cutting</option>
                        <option value="Hand Embroidery" className="bg-[#14141c] text-white">Hand Embroidery</option>
                        <option value="Quality Check" className="bg-[#14141c] text-white">Quality Check</option>
                        <option value="Dispatched" className="bg-[#14141c] text-white">Dispatched</option>
                        <option value="Delivered" className="bg-[#14141c] text-white">Delivered</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteOrder(ord.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          title="Delete Order Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0e0e16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden space-y-4">
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-400">{selectedOrder.id}</span>
                <h3 className="font-serif text-lg font-bold text-white">
                  Order & Atelier Dispatch Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Customer</span>
                  <span className="font-semibold text-white">{selectedOrder.customer}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Phone</span>
                  <span className="font-mono text-gray-200">{selectedOrder.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block text-[10px] uppercase">Delivery Address</span>
                  <span className="text-gray-200">{selectedOrder.address || selectedOrder.city}</span>
                </div>
              </div>

              {/* Items breakdown */}
              <div>
                <span className="text-gray-400 block text-[10px] uppercase mb-1.5">
                  Ordered Boutique Pieces
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-[11px] text-gray-400">Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}</p>
                        </div>
                        <span className="font-mono text-[#fbbf24]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2.5 rounded-lg bg-white/5 text-gray-400">
                      Standard Atelier Order Package ({selectedOrder.itemsCount || 1} Piece)
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12121a] border border-white/10 flex justify-between items-center">
                <span className="text-gray-300 font-medium">Total Billed Amount:</span>
                <span className="font-mono font-bold text-base text-[#fbbf24]">₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Salem Boutique Courier Packaging</span>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
