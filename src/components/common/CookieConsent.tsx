import React, { useState, useEffect } from 'react';
import { Shield, Settings, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONSENT_STORAGE_KEY = 'thireeshaw_cookie_consent';
const LOGS_STORAGE_KEY = 'thireeshaw_consent_logs';

interface CookiePreferences {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState({
    essential: true, // Always locked to true
    preferences: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check existing consent in localStorage
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) {
      // Small timeout so it doesn't immediately overlap with page transition
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          essential: true,
          preferences: !!parsed.preferences,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } catch {
        // fallback
      }
    }

    // Listen for custom event to open preferences modal from Footer or Privacy page
    const handleOpenModal = () => {
      setShowModal(true);
      setShowBanner(false);
    };

    window.addEventListener('open-cookie-settings', handleOpenModal);
    return () => window.removeEventListener('open-cookie-settings', handleOpenModal);
  }, []);

  const saveConsent = (prefs: { preferences: boolean; analytics: boolean; marketing: boolean }) => {
    const finalConsent: CookiePreferences = {
      essential: true,
      preferences: prefs.preferences,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(finalConsent));

    // Append to consent logs for DPDP audit demonstration in the Admin Panel
    try {
      const existingLogsRaw = localStorage.getItem(LOGS_STORAGE_KEY);
      const logs = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
      logs.unshift({
        id: `CONSENT-${Date.now().toString().slice(-6)}`,
        timestamp: finalConsent.timestamp,
        essential: true,
        preferences: finalConsent.preferences,
        analytics: finalConsent.analytics,
        marketing: finalConsent.marketing,
        action: prefs.preferences && prefs.analytics && prefs.marketing ? 'Accepted All' : (!prefs.preferences && !prefs.analytics && !prefs.marketing ? 'Rejected Non-Essential' : 'Custom Preferences'),
        device: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser'
      });
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs.slice(0, 100)));
      window.dispatchEvent(new CustomEvent('thireeshaw_consent_updated'));
    } catch (err) {
      console.error('Failed to log consent:', err);
    }

    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ preferences: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ preferences: false, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent({
      preferences: preferences.preferences,
      analytics: preferences.analytics,
      marketing: preferences.marketing
    });
  };

  return (
    <>
      {/* Bottom Sticky Banner */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#0c0c12]/95 border-t border-white/15 backdrop-blur-xl shadow-[0_-15px_40px_rgba(0,0,0,0.8)] animate-slideUp">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="p-2.5 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 text-[#fbbf24] shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                  <span>Your Privacy & Cookie Choices</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300 font-normal">
                    DPDP Act Aligned
                  </span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  We use cookies and local storage to preserve your cart, remember custom blouse measurements,
                  and ensure seamless boutique navigation. In accordance with India's Digital Personal Data Protection (DPDP) Act,
                  you can choose your cookie preferences or review our{' '}
                  <Link to="/privacy" className="text-[#fbbf24] hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-gray-200 font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Customize</span>
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-gray-200 font-medium transition-colors cursor-pointer"
              >
                Reject Non-Essential
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-xs font-semibold text-white uppercase tracking-wider transition-all shadow-[0_2px_12px_rgba(255,42,133,0.4)] cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0e0e16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#fbbf24]" />
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close preferences modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Manage how Thireeshaw Designers collects and processes your browser state.
                Essential cookies cannot be disabled as they are required for shopping basket functionality,
                wishlist memory, and checkout security.
              </p>

              {/* Cookie Type 1: Essential (Locked) */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">1. Strictly Essential Cookies</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Maintains your shopping bag items, custom blouse draft measurements, CSRF protection, and session persistence.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              {/* Cookie Type 2: Boutique Preferences */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white">2. Preferences & Personalization</span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Remembers your recently viewed pattu sarees, favorite blouse necklines, and currency display preferences.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff2a85]"></div>
                </label>
              </div>

              {/* Cookie Type 3: Analytics */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white">3. Atelier Analytics</span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Helps us understand which embroidery galleries and bridal fabrics are most popular to refine our seasonal collections.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#fbbf24]"></div>
                </label>
              </div>

              {/* Cookie Type 4: Marketing */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white">4. Tailored Bridal Updates</span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Allows us to notify you about limited-edition festive drops and bespoke bridal discount previews.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff2a85]"></div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 border-t border-white/10 bg-white/[0.02]">
              <Link
                to="/privacy"
                onClick={() => setShowModal(false)}
                className="text-xs text-gray-400 hover:text-white underline underline-offset-2"
              >
                Read Full DPDP Privacy Policy
              </Link>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition-colors"
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-black text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                >
                  Save Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
