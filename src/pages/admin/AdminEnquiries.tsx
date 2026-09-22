import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Eye, 
  Phone, 
  CheckCircle2, 
  X,
  Filter
} from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  source: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed';
  createdAt: string;
}

const STORAGE_KEY = 'thireeshaw_enquiries';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const loadEnquiries = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEnquiries(JSON.parse(raw));
      } else {
        const seedEnquiries: Enquiry[] = [
          {
            id: 'ENQ-892101',
            name: 'Kavitha Ramachandran',
            phone: '9840211234',
            email: 'kavitha.r@gmail.com',
            service: 'Bespoke Bridal Blouse',
            message: 'Need heavy Aari work peacock bridal blouse for muhurtham saree on Dec 12. Have maroon raw silk fabric.',
            source: 'Contact Page',
            status: 'In Progress',
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
          },
          {
            id: 'ENQ-892102',
            name: 'Dr. Meenakshi S.',
            phone: '9790188321',
            email: 'meenakshi.s@outlook.com',
            service: 'Pattu Blouse Embroidery',
            message: 'Custom elbow sleeve zardosi embroidery with antique gold beads for green Kanchipuram silk saree.',
            source: 'First-Visit Welcome Popup',
            status: 'New',
            createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
          },
          {
            id: 'ENQ-892103',
            name: 'Ananya Deshmukh',
            phone: '14085550199',
            email: 'ananya.d@yahoo.com',
            service: 'Worldwide Courier / Bulk Orders',
            message: 'Looking for 3 custom blouses and Kanchi silk saree dispatch to California, USA. Please share international shipping timelines.',
            source: 'First-Visit Welcome Popup',
            status: 'Contacted',
            createdAt: new Date(Date.now() - 3600000 * 22).toISOString()
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEnquiries));
        setEnquiries(seedEnquiries);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadEnquiries();

    const handleNewEnquiry = () => loadEnquiries();
    window.addEventListener('thireeshaw_enquiry_added', handleNewEnquiry);
    return () => window.removeEventListener('thireeshaw_enquiry_added', handleNewEnquiry);
  }, []);

  const updateStatus = (id: string, newStatus: Enquiry['status']) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    showToast(`Status updated to ${newStatus}`);
  };

  const deleteEnquiry = (id: string) => {
    if (window.confirm('Delete this client enquiry?')) {
      const updated = enquiries.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setEnquiries(updated);
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      showToast('Enquiry deleted.');
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Client Boutique Enquiries
          </h2>
          <p className="text-xs text-gray-400">
            Incoming consultation requests from the contact page and first-visit welcome popup.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            Total Enquiries: <strong className="text-[#fbbf24]">{enquiries.length}</strong>
          </span>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Controls: Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, phone, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0c0c12] border border-white/10 text-white text-xs placeholder-gray-500 outline-none focus:border-[#fbbf24] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" />
          {['all', 'New', 'Contacted', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#ff2a85] text-white font-semibold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Source & Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No client enquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Client info */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{enq.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline font-mono text-[11px] flex items-center gap-1"
                          title="Open WhatsApp chat with client"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{enq.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-gray-200 font-medium">
                        {enq.service}
                      </span>
                    </td>

                    {/* Snippet */}
                    <td className="py-3 px-4 max-w-xs truncate text-gray-400">
                      "{enq.message}"
                    </td>

                    {/* Source & Date */}
                    <td className="py-3 px-4 text-[11px] text-gray-400">
                      <div className="text-gray-300 font-medium">{enq.source}</div>
                      <div>{new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq.id, e.target.value as Enquiry['status'])}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium outline-none cursor-pointer border ${
                          enq.status === 'New'
                            ? 'bg-[#ff2a85]/20 text-[#ff62a6] border-[#ff2a85]/30'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : enq.status === 'In Progress'
                            ? 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/30'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <option value="New" className="bg-[#14141c] text-white">New</option>
                        <option value="Contacted" className="bg-[#14141c] text-white">Contacted</option>
                        <option value="In Progress" className="bg-[#14141c] text-white">In Progress</option>
                        <option value="Completed" className="bg-[#14141c] text-white">Completed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="View Full Enquiry"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteEnquiry(enq.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          title="Delete Enquiry"
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

      {/* View Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0e0e16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden space-y-4">
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-400">{selectedEnquiry.id}</span>
                <h3 className="font-serif text-lg font-bold text-white">
                  Client Consultation Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Client Name</span>
                  <span className="font-semibold text-white text-sm">{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Service Required</span>
                  <span className="font-semibold text-[#fbbf24]">{selectedEnquiry.service}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Contact Number</span>
                  <span className="font-mono text-gray-200">{selectedEnquiry.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Email</span>
                  <span className="text-gray-300">{selectedEnquiry.email || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase mb-1">
                  Customer Requirement / Notes
                </span>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 leading-relaxed font-light text-sm whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Namaste ${selectedEnquiry.name}, greetings from Thireeshaw Designers Salem. Regarding your enquiry for ${selectedEnquiry.service}: `
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
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
