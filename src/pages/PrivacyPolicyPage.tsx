import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, Phone, Mail, MapPin, Settings } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const PrivacyPolicyPage: React.FC = () => {
  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'));
  };

  const sections = [
    { id: 'fiduciary', title: '1. Data Fiduciary & Atelier Identification' },
    { id: 'grounds', title: '2. Grounds for Processing Under DPDP Act' },
    { id: 'data-collected', title: '3. Personal Data We Collect' },
    { id: 'purpose', title: '4. Purpose of Personal Data Collection' },
    { id: 'consent', title: '5. Notice, Consent & Revocation' },
    { id: 'rights', title: '6. Rights of the Data Principal (You)' },
    { id: 'retention', title: '7. Data Retention & Storage Policy' },
    { id: 'processors', title: '8. Third-Party Data Processors & Logistics' },
    { id: 'minors', title: '9. Protection of Children & Minors' },
    { id: 'grievance', title: '10. Grievance Redressal Officer' },
    { id: 'updates', title: '11. Updates to This Privacy Policy' },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-gray-300 pt-28 pb-20">
      {/* Header Banner */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-[#12121c] to-[#08080a] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 text-xs font-semibold text-[#fbbf24] tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Personal Data Protection (DPDP) Act, 2023 Aligned</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Privacy Policy & Data Protection Notice
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            At Thireeshaw Designers, safeguarding your privacy and personal data is central to our tradition of artisanal trust.
            This policy outlines how your information is handled with utmost integrity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-gray-400">
            <span>Effective Date: January 1, 2026</span>
            <span>•</span>
            <span>Version: 2.1 (DPDP Compliant)</span>
            <span>•</span>
            <span>Salem, Tamil Nadu, India</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 p-5 rounded-2xl bg-[#0e0e16] border border-white/10 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#fbbf24] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Contents</span>
              </h3>
              <nav className="space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={openCookiePreferences}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#fbbf24] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Manage Cookie Choices</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Policy Document Body */}
          <main className="lg:col-span-3 space-y-12 leading-relaxed text-sm">
            {/* 1. Data Fiduciary */}
            <section id="fiduciary" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">01.</span>
                <span>Data Fiduciary & Atelier Identification</span>
              </h2>
              <p className="text-gray-300 font-light">
                Under the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act),
                <strong className="text-white font-medium"> THIREESHAW DESIGNERS</strong> operates as the Data Fiduciary
                responsible for determining the purpose and means of processing personal data collected through our
                e-commerce storefront and boutique consultations.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1.5 text-gray-300 font-mono">
                <p><span className="text-gray-400">Atelier Name:</span> Thireeshaw Designers</p>
                <p><span className="text-gray-400">Address:</span> {BRAND_INFO.address.full}</p>
                <p><span className="text-gray-400">Jurisdiction:</span> Salem, Tamil Nadu, India</p>
                <p><span className="text-gray-400">Contact:</span> {BRAND_INFO.email} | {BRAND_INFO.phones.join(' / ')}</p>
              </div>
            </section>

            {/* 2. Grounds for Processing */}
            <section id="grounds" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">02.</span>
                <span>Grounds for Processing Under DPDP Act</span>
              </h2>
              <p className="text-gray-300 font-light">
                In compliance with Section 4 and Section 6 of the DPDP Act, personal data is processed solely under the following valid legal grounds:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-300 font-light pl-2">
                <li><strong className="text-white">Freely Given Consent:</strong> Affirmative, clear, and unambiguous consent obtained for bridal consultations, marketing communication, or custom tailoring measurements.</li>
                <li><strong className="text-white">Performance of a Contract (Certain Legitimate Uses):</strong> Processing necessary to fulfill your fashion purchase, generate tax invoices, tailor custom blouses according to client measurements, and dispatch orders via international/domestic courier logistics.</li>
                <li><strong className="text-white">Legal Obligations:</strong> Compliance with applicable Indian taxation (GST), accounting, and regulatory standards.</li>
              </ul>
            </section>

            {/* 3. Personal Data Collected */}
            <section id="data-collected" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">03.</span>
                <span>Personal Data We Collect</span>
              </h2>
              <p className="text-gray-300 font-light">
                We only gather data necessary for fulfilling our bespoke tailoring and order dispatch services:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Identity & Contact</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    Full name, primary mobile number, WhatsApp contact, billing/shipping address, PIN code, and email address.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Bespoke Measurements</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    Bust, waist, shoulder, armhole, sleeve length, front/back neckline depth, and fabric embroidery preferences.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Order & Transaction State</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    Selected designs, quantity, courier destination, payment preference reference, and order fulfillment status.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                    <span>Technical & Cookie Data</span>
                  </h4>
                  <p className="text-xs text-gray-400">
                    Browser type, session identifiers, shopping bag state, and consent preference flags.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Purpose of Collection */}
            <section id="purpose" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">04.</span>
                <span>Purpose of Personal Data Collection</span>
              </h2>
              <p className="text-gray-300 font-light">
                Your data is collected strictly to support our haute couture boutique operations:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-300 font-light pl-2">
                <li>Customized cutting, hand embroidery (Zardosi/Aari), and precision fitting of bridal and pattu blouses.</li>
                <li>Real-time shipping notifications, tracking sharing, and worldwide courier logistics.</li>
                <li>Prompt responses to boutique enquiries, WhatsApp bridal consultations, and after-sales fitting advice.</li>
                <li>Maintaining browser bag state and wishlist persistence across your visit.</li>
              </ul>
            </section>

            {/* 5. Notice & Consent */}
            <section id="consent" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">05.</span>
                <span>Notice, Consent & Revocation</span>
              </h2>
              <p className="text-gray-300 font-light">
                In compliance with Section 6(1) of the DPDP Act, prior to or at the time of collecting your personal data,
                you are provided with a clear notice specifying the categories of data and the purposes of processing.
              </p>
              <p className="text-gray-300 font-light">
                <strong className="text-white">Right to Withdraw Consent:</strong> You have the absolute statutory right
                to withdraw your consent at any time as easily as giving it. You can manage your preferences using our
                interactive Cookie Settings modal or by emailing our Grievance Officer at{' '}
                <a href={`mailto:${BRAND_INFO.email}`} className="text-[#fbbf24] underline">
                  {BRAND_INFO.email}
                </a>.
              </p>
            </section>

            {/* 6. Data Principal Rights */}
            <section id="rights" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">06.</span>
                <span>Rights of the Data Principal (You)</span>
              </h2>
              <p className="text-gray-300 font-light">
                As a Data Principal under Chapter III of the DPDP Act, you are entitled to exercise the following rights:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">A. Right to Access Summary of Information</h4>
                  <p className="text-xs text-gray-400 mt-1">Request a concise summary of personal data being processed and identities of all entities with whom it was shared.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">B. Right to Correction & Erasure</h4>
                  <p className="text-xs text-gray-400 mt-1">Request correction of inaccurate data, completion of incomplete records, or erasure of personal data that is no longer necessary for the specified purpose.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">C. Right of Grievance Redressal</h4>
                  <p className="text-xs text-gray-400 mt-1">Access an accessible and transparent mechanism to resolve any grievance regarding our data processing within stipulated statutory timelines.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">D. Right to Nominate</h4>
                  <p className="text-xs text-gray-400 mt-1">Nominate any other individual to exercise your data principal rights in the event of death or incapacity.</p>
                </div>
              </div>
            </section>

            {/* 7. Data Retention */}
            <section id="retention" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">07.</span>
                <span>Data Retention & Storage Policy</span>
              </h2>
              <p className="text-gray-300 font-light">
                We adhere strictly to the principle of storage limitation under Section 8(7) of the DPDP Act.
                We retain personal data only for as long as necessary to satisfy the purpose for which it was gathered,
                including meeting accounting and taxation mandates (e.g. 7 years for GST audit requirements in India).
              </p>
              <p className="text-gray-300 font-light">
                Measurements for bespoke bridal blouses are safely archived to allow hassle-free reordering for returning
                clients, but can be permanently deleted upon verified request.
              </p>
            </section>

            {/* 8. Third-Party Processors */}
            <section id="processors" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">08.</span>
                <span>Third-Party Data Processors & Logistics</span>
              </h2>
              <p className="text-gray-300 font-light">
                Thireeshaw Designers does <strong className="text-white">NOT sell, rent, or trade</strong> your personal data to third parties.
                We only share minimal required details with certified Data Processors under valid processing agreements:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-300 font-light pl-2">
                <li><strong className="text-white">Logistics & Courier Partners (e.g. DTDC, DHL, Professional Couriers):</strong> Recipient name, destination delivery address, and contact number for parcel delivery.</li>
                <li><strong className="text-white">Communication Gateways:</strong> Official WhatsApp Business API providers and SMS gateways for order status updates.</li>
              </ul>
            </section>

            {/* 9. Minors */}
            <section id="minors" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">09.</span>
                <span>Protection of Children & Minors</span>
              </h2>
              <p className="text-gray-300 font-light">
                In compliance with Section 9 of the DPDP Act, Thireeshaw Designers does not intentionally collect
                personal data of individuals below 18 years of age without verifiable parental or legal guardian consent,
                nor do we engage in targeted behavioral advertising directed toward minors.
              </p>
            </section>

            {/* 10. Grievance Redressal Officer */}
            <section id="grievance" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-[#fbbf24]/30 space-y-5">
              <div className="flex items-center gap-2.5 text-[#fbbf24]">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  10. Grievance Redressal & Data Protection Officer
                </h2>
              </div>
              <p className="text-gray-300 font-light">
                If you have questions, feedback, or wish to exercise any Data Principal rights under the DPDP Act,
                please contact our designated Grievance Officer:
              </p>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#ff2a85] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Atelier Office</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{BRAND_INFO.address.full}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Direct Telephone / WhatsApp</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{BRAND_INFO.phones.join('  •  ')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Official Email</h4>
                      <a href={`mailto:${BRAND_INFO.email}`} className="text-xs text-gray-300 hover:text-white underline">
                        {BRAND_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Response Commitment</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Acknowledgment within 48 business hours; resolution within 30 days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Policy Updates */}
            <section id="updates" className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#ff2a85]">11.</span>
                <span>Updates to This Privacy Policy</span>
              </h2>
              <p className="text-gray-300 font-light">
                We may periodically update this policy to reflect modifications in our boutique operations or amendments
                to the DPDP Act and relevant statutory rules. The updated policy will always be published on this page
                with the revised effective date.
              </p>
              <div className="pt-2">
                <button
                  onClick={openCookiePreferences}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#ff4797] hover:brightness-110 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Review & Update Your Consent Settings</span>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
