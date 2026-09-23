import React, { useState, useEffect } from 'react';
import { Lock, Check, AlertCircle } from 'lucide-react';
import { TermsModal } from './TermsModal';

interface TermsConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  className?: string;
  compact?: boolean;
}

export const TermsConsent: React.FC<TermsConsentProps> = ({
  checked,
  onChange,
  error,
  className = '',
  compact = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const reviewed = sessionStorage.getItem('thireeshaw_terms_reviewed') === 'true';
    if (reviewed) {
      setHasReviewed(true);
    }
  }, []);

  const handleOpenTerms = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(true);
  };

  const handleAcceptTerms = () => {
    setHasReviewed(true);
    sessionStorage.setItem('thireeshaw_terms_reviewed', 'true');
    onChange(true);
  };

  const handleReviewed = () => {
    setHasReviewed(true);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    if (!hasReviewed) {
      e.preventDefault();
      // Prompt user to review terms first
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className={`space-y-1.5 ${className}`}>
        <div
          className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all ${
            error
              ? 'border-red-500/60 bg-red-950/20'
              : checked
              ? 'border-[#ff2a85]/40 bg-[#ff2a85]/5'
              : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          {/* Custom Checkbox Container */}
          <div className="relative flex items-center pt-0.5 shrink-0" onClick={handleCheckboxClick}>
            <input
              id="terms-checkbox"
              type="checkbox"
              disabled={!hasReviewed}
              checked={checked}
              onChange={(e) => {
                if (hasReviewed) {
                  onChange(e.target.checked);
                }
              }}
              className={`w-4 h-4 rounded appearance-none border transition-all cursor-pointer ${
                !hasReviewed
                  ? 'border-gray-600 bg-black/40 cursor-not-allowed opacity-60'
                  : checked
                  ? 'border-[#ff2a85] bg-[#ff2a85] cursor-pointer'
                  : 'border-white/30 bg-black/40 hover:border-white/60'
              }`}
            />
            {checked && (
              <Check className="w-3 h-3 text-white absolute top-1 left-0.5 pointer-events-none stroke-[3]" />
            )}
            {!hasReviewed && !checked && (
              <Lock className="w-2.5 h-2.5 text-gray-500 absolute top-1.5 left-1 pointer-events-none" />
            )}
          </div>

          {/* Consent Text */}
          <div className="flex-1 min-w-0 text-gray-300 leading-snug">
            <label
              htmlFor="terms-checkbox"
              className={`text-xs ${hasReviewed ? 'cursor-pointer' : 'cursor-pointer'} select-none`}
              onClick={handleCheckboxClick}
            >
              I agree to the{' '}
              <button
                type="button"
                onClick={handleOpenTerms}
                className="text-[#fbbf24] hover:text-[#fde047] underline underline-offset-2 font-medium transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>{' '}
              and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#ff62a6] hover:text-[#ff80ba] underline underline-offset-2 font-medium transition-colors"
              >
                Privacy Policy
              </a>
              .
            </label>

            {!hasReviewed && !compact && (
              <p className="text-[11px] text-[#fbbf24]/80 mt-1 flex items-center gap-1 font-light">
                <Lock className="w-3 h-3 text-[#fbbf24] shrink-0" />
                <span>Click &ldquo;Terms & Conditions&rdquo; to read and unlock consent.</span>
              </p>
            )}
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-[11px] flex items-center gap-1 px-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>

      {/* Dedicated Terms Modal */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleAcceptTerms}
        onReviewed={handleReviewed}
      />
    </>
  );
};
