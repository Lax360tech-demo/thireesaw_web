import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Laptop, 
  Smartphone,
  Lock
} from 'lucide-react';

interface ConsentLog {
  id: string;
  timestamp: string;
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  action: string;
  device: string;
}

const STORAGE_KEY = 'thireeshaw_consent_logs';

export const AdminPrivacyLogs: React.FC = () => {
  const [logs, setLogs] = useState<ConsentLog[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const loadLogs = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLogs(JSON.parse(raw));
      } else {
        const seedLogs: ConsentLog[] = [
          {
            id: 'CONSENT-104921',
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            essential: true,
            preferences: true,
            analytics: true,
            marketing: true,
            action: 'Accepted All',
            device: 'Desktop Browser'
          },
          {
            id: 'CONSENT-104920',
            timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
            essential: true,
            preferences: true,
            analytics: false,
            marketing: false,
            action: 'Custom Preferences',
            device: 'Mobile Browser'
          },
          {
            id: 'CONSENT-104919',
            timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
            essential: true,
            preferences: false,
            analytics: false,
            marketing: false,
            action: 'Rejected Non-Essential',
            device: 'Desktop Browser'
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedLogs));
        setLogs(seedLogs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
    const handleUpdate = () => loadLogs();
    window.addEventListener('thireeshaw_consent_updated', handleUpdate);
    return () => window.removeEventListener('thireeshaw_consent_updated', handleUpdate);
  }, []);

  const simulateNewConsent = () => {
    const newLog: ConsentLog = {
      id: `CONSENT-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      essential: true,
      preferences: true,
      analytics: Math.random() > 0.5,
      marketing: Math.random() > 0.5,
      action: 'Simulated User Consent',
      device: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser'
    };

    const updated = [newLog, ...logs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLogs(updated);
    showToast('Simulated user consent recorded in audit trail.');
  };

  const clearLogs = () => {
    if (window.confirm('Clear all audit consent logs?')) {
      localStorage.removeItem(STORAGE_KEY);
      setLogs([]);
      showToast('Consent logs cleared.');
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `thireeshaw_dpdp_consent_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported DPDP audit records as JSON.');
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
              DPDP Act Privacy & Consent Audit Trail
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold uppercase">
              Statutory Log
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Records of user cookie consent and privacy choices logged in accordance with India's Digital Personal Data Protection Act, 2023.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={simulateNewConsent}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Simulate Log</span>
          </button>

          <button
            onClick={exportJSON}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit JSON</span>
          </button>

          <button
            onClick={clearLogs}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Clear Logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0c0c12] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-gray-400">Total Consent Events</span>
          <p className="text-2xl font-serif font-bold text-white mt-1">{logs.length}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0c12] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-emerald-400">Strictly Essential</span>
          <p className="text-2xl font-serif font-bold text-emerald-400 mt-1">100%</p>
          <span className="text-[10px] text-gray-400">Mandatory for basket</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0c12] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-[#fbbf24]">Analytics Opt-In</span>
          <p className="text-2xl font-serif font-bold text-[#fbbf24] mt-1">
            {logs.length > 0 ? Math.round((logs.filter((l) => l.analytics).length / logs.length) * 100) : 0}%
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0c12] border border-white/10">
          <span className="text-[10px] uppercase font-semibold text-[#ff2a85]">Marketing Opt-In</span>
          <p className="text-2xl font-serif font-bold text-[#ff2a85] mt-1">
            {logs.length > 0 ? Math.round((logs.filter((l) => l.marketing).length / logs.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Log ID & Timestamp</th>
                <th className="py-3.5 px-4">User Action</th>
                <th className="py-3.5 px-4">Essential</th>
                <th className="py-3.5 px-4">Preferences</th>
                <th className="py-3.5 px-4">Analytics</th>
                <th className="py-3.5 px-4">Marketing</th>
                <th className="py-3.5 px-4">Client Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No consent audit logs recorded.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Log ID & Timestamp */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-white block font-medium">{log.id}</span>
                      <span className="text-[11px] text-gray-400">
                        {new Date(log.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          log.action.includes('Accept')
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : log.action.includes('Reject')
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/20'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* Essential */}
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <Lock className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    </td>

                    {/* Preferences */}
                    <td className="py-3 px-4">
                      {log.preferences ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Granted</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Denied</span>
                        </span>
                      )}
                    </td>

                    {/* Analytics */}
                    <td className="py-3 px-4">
                      {log.analytics ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Granted</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Denied</span>
                        </span>
                      )}
                    </td>

                    {/* Marketing */}
                    <td className="py-3 px-4">
                      {log.marketing ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Granted</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-500">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Denied</span>
                        </span>
                      )}
                    </td>

                    {/* Client Device */}
                    <td className="py-3 px-4 text-gray-400 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {log.device.includes('Mobile') ? (
                          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <Laptop className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        <span>{log.device}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
