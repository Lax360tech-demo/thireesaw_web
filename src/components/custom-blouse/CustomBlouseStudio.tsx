import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, MessageCircle, Scissors, ShieldCheck, Ruler, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/ToastContext';

import necklineSweetheartImg from '../../assets/studio/neckline_sweetheart.jpg';
import necklineTempleUImg from '../../assets/studio/neckline_temple_u.jpg';
import necklineHighNeckImg from '../../assets/studio/neckline_high_neck.jpg';
import necklineBoatNeckImg from '../../assets/studio/neckline_boat_neck.jpg';

const NECKLINES = [
  { id: 'sweetheart', name: 'Deep Sweetheart', desc: 'Classic bridal front with flattering bust framing', image: necklineSweetheartImg },
  { id: 'temple-u', name: 'Temple U Neck', desc: 'Heritage deep U back framed with sacred temple motifs', image: necklineTempleUImg },
  { id: 'high-neck', name: 'Royal High Neck', desc: 'Imperial mandarin collar adorned with bullion zari', image: necklineHighNeckImg },
  { id: 'boat-neck', name: 'Boat Neck & Keyhole', desc: 'Sophisticated modern silhouette with cut-out back', image: necklineBoatNeckImg }
];

const EMBROIDERY_STYLES = [
  { id: 'pattu-aari', name: 'Traditional Pattu Aari Work', desc: 'Handcrafted peacock arches, gold zari cords & kundan stones', priceAdd: 6500 },
  { id: 'heavy-zardozi', name: 'French Bullion & Zardozi', desc: 'Dense metallic dabka wire and antique French bullion embroidery', priceAdd: 8500 },
  { id: 'pearl-maggam', name: 'Micro-Pearl Maggam Detailing', desc: 'Luminous micro-seed pearls clustered with golden bullion knots', priceAdd: 7800 },
  { id: 'cutwork-applique', name: 'Scalloped Cutwork Lace', desc: 'Contemporary openwork lattice with gold cord embroidery', priceAdd: 5200 },
  { id: 'machine-precision', name: 'High-Precision Machine Fill', desc: 'Computerized dense floral embroidery with crisp symmetry', priceAdd: 3400 }
];

const FABRICS = [
  { id: 'raw-silk', name: 'Pure Kanchipuram Raw Silk', desc: 'Rich textured handloom silk that holds heavy needlework flawlessly' },
  { id: 'micro-velvet', name: 'Micro Velvet 9000', desc: 'Ultra-luxurious plush velvet ideal for evening wedding galas' },
  { id: 'brocade-silk', name: 'Banarasi Brocade Silk', desc: 'Pre-woven golden zari motifs augmented with hand stone craft' },
  { id: 'pure-organza', name: 'Pure Tissue Organza', desc: 'Modern translucent sleeves with delicate scalloped borders' }
];

const COLORS = [
  { name: 'Rani Hot Pink', hex: '#ff2a85', border: false },
  { name: 'Bridal Crimson Red', hex: '#b91c1c', border: false },
  { name: 'Temple Zari Gold', hex: '#eab308', border: false },
  { name: 'Emerald Green', hex: '#047857', border: false },
  { name: 'Royal Maroon', hex: '#881337', border: false },
  { name: 'Obsidian Black', hex: '#0a0a0c', border: true },
  { name: 'Champagne Yellow', hex: '#fde047', border: false },
  { name: 'Peacock Blue', hex: '#0284c7', border: false }
];

const SLEEVE_OPTIONS = [
  { id: 'elbow-heavy', name: 'Elbow Length (Heavy Cuff Border)', popular: true },
  { id: 'full-zardozi', name: 'Full Length (All-Over Zardozi Trellis)', popular: false },
  { id: 'cap-sleeve', name: 'Cap Sleeve (Delicate Motif)', popular: false },
  { id: 'sleeveless', name: 'Contemporary Sleeveless Strap', popular: false }
];

export const CustomBlouseStudio: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNeckline, setSelectedNeckline] = useState(NECKLINES[0].id);
  const [selectedEmbroidery, setSelectedEmbroidery] = useState(EMBROIDERY_STYLES[0].id);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0].id);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSleeve, setSelectedSleeve] = useState(SLEEVE_OPTIONS[0].id);
  const [includeLatkans, setIncludeLatkans] = useState(true);

  // Measurements & Contact
  const [measurements, setMeasurements] = useState({
    bust: '36',
    waist: '30',
    shoulder: '14.5',
    blouseLength: '14',
    sleeveLength: '10.5',
    provideLater: false
  });

  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    city: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const activeEmbroidery = EMBROIDERY_STYLES.find((e) => e.id === selectedEmbroidery) || EMBROIDERY_STYLES[0];
  const activeNeckline = NECKLINES.find((n) => n.id === selectedNeckline) || NECKLINES[0];
  const activeFabric = FABRICS.find((f) => f.id === selectedFabric) || FABRICS[0];

  // Base price calculation estimate
  const estimatedPrice = 2800 + activeEmbroidery.priceAdd + (includeLatkans ? 800 : 0);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.phone) {
      addToast('Information Required', 'Please provide your name and phone number', 'error');
      return;
    }

    // Save to localStorage so admin can view
    try {
      const existing = JSON.parse(localStorage.getItem('thireeshaw_enquiries') || '[]');
      const newEnquiry = {
        id: `ENQ-${Date.now().toString().slice(-5)}`,
        name: contactInfo.name,
        phone: contactInfo.phone,
        email: 'Provided on WhatsApp',
        subject: `Custom Blouse: ${activeNeckline.name} (${activeEmbroidery.name})`,
        message: `Fabric: ${activeFabric.name}, Color: ${selectedColor}, Bust: ${measurements.bust}", Notes: ${contactInfo.notes || 'None'}`,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'New'
      };
      localStorage.setItem('thireeshaw_enquiries', JSON.stringify([newEnquiry, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
    addToast('Custom Design Created!', 'Your bespoke blouse inquiry is ready', 'success');
  };

  // WhatsApp Message Formatter
  const generateWhatsAppMessage = () => {
    const text = `*THIREESHAW DESIGNERS — BESPOKE BLOUSE INQUIRY*%0A%0A` +
      `*Client:* ${contactInfo.name || 'Client'} (${contactInfo.city || 'India'})%0A` +
      `*Phone:* ${contactInfo.phone}%0A%0A` +
      `*Design Specifications:*%0A` +
      `• *Neckline:* ${activeNeckline.name}%0A` +
      `• *Embroidery Style:* ${activeEmbroidery.name}%0A` +
      `• *Fabric:* ${activeFabric.name}%0A` +
      `• *Color:* ${selectedColor}%0A` +
      `• *Sleeve:* ${selectedSleeve}%0A` +
      `• *Handmade Latkans/Tassels:* ${includeLatkans ? 'Yes' : 'No'}%0A` +
      `• *Bust / Waist:* ${measurements.provideLater ? 'Will share on WhatsApp' : `${measurements.bust}" / ${measurements.waist}"`}%0A%0A` +
      `*Notes:* ${contactInfo.notes || 'None'}%0A` +
      `*Estimated Quote:* ₹${estimatedPrice.toLocaleString('en-IN')}%0A%0A` +
      `Please let me know consultation availability and courier timeline.`;

    return `https://wa.me/919865366447?text=${text}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Progress Steps Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {[
            { num: 1, label: 'Silhouette' },
            { num: 2, label: 'Embroidery' },
            { num: 3, label: 'Fabric & Color' },
            { num: 4, label: 'Specs & Consult' }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(s.num)}
                className={`w-10 h-10 rounded-full font-serif text-sm font-semibold flex items-center justify-center transition-all ${
                  currentStep === s.num
                    ? 'bg-[#ff2a85] text-white ring-4 ring-[#ff2a85]/30 shadow-lg shadow-[#ff2a85]/50'
                    : currentStep > s.num
                    ? 'bg-[#fbbf24] text-black'
                    : 'bg-[#181820] text-gray-400 border border-white/15'
                }`}
              >
                {currentStep > s.num ? <Check className="w-5 h-5 stroke-[2.5]" /> : s.num}
              </button>
              <span className={`text-[11px] uppercase tracking-wider mt-2 font-medium hidden sm:block ${
                currentStep === s.num ? 'text-white' : 'text-gray-400'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Configuration Panel (Span 8) */}
        <div className="lg:col-span-8 bg-[#101015] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* STEP 1: SILHOUETTE & NECKLINE */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#ff62a6] font-semibold">
                    STEP 01 OF 04
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    Select Silhouette & Neckline Framing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                    Choose the base collar and framing for your wedding saree or bridal lehenga.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {NECKLINES.map((neck) => (
                    <div
                      key={neck.id}
                      onClick={() => setSelectedNeckline(neck.id)}
                      className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        selectedNeckline === neck.id
                          ? 'bg-[#18141d] border-[#ff2a85] shadow-lg shadow-[#ff2a85]/20'
                          : 'bg-[#15151c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-black/40">
                        <img
                          src={neck.image}
                          alt={neck.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedNeckline === neck.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#ff2a85] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-white font-normal">{neck.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                          {neck.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sleeve option */}
                <div className="pt-4 border-t border-white/10">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-3">
                    Sleeve Silhouette
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SLEEVE_OPTIONS.map((sleeve) => (
                      <button
                        key={sleeve.id}
                        type="button"
                        onClick={() => setSelectedSleeve(sleeve.id)}
                        className={`p-3 rounded-xl text-left border text-xs transition-colors flex items-center justify-between ${
                          selectedSleeve === sleeve.id
                            ? 'bg-[#ff2a85]/15 border-[#ff2a85] text-white font-semibold'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span>{sleeve.name}</span>
                        {sleeve.popular && (
                          <span className="text-[10px] text-[#fbbf24] px-1.5 py-0.5 rounded bg-black/40">
                            Bridal Choice
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: EMBROIDERY ARTISTRY */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
                    STEP 02 OF 04
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    Choose Embroidery Artistry & Craft
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                    Our Salem boutique is renowned across South India for hand aari, zardozi, and micro-pearl maggam works.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {EMBROIDERY_STYLES.map((emb) => (
                    <div
                      key={emb.id}
                      onClick={() => setSelectedEmbroidery(emb.id)}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        selectedEmbroidery === emb.id
                          ? 'bg-[#18141d] border-[#fbbf24] shadow-lg shadow-[#fbbf24]/10'
                          : 'bg-[#15151c] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`w-6 h-6 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                          selectedEmbroidery === emb.id ? 'border-[#fbbf24] bg-[#fbbf24]' : 'border-white/20'
                        }`}>
                          {selectedEmbroidery === emb.id && (
                            <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-white font-normal">{emb.name}</h4>
                          <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">
                            {emb.desc}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 pl-9 sm:pl-0">
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Est. Craft</span>
                        <div className="text-sm font-semibold text-[#fbbf24]">
                          +₹{emb.priceAdd.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Latkans Toggle */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gem className="w-5 h-5 text-[#ff2a85]" />
                    <div>
                      <h5 className="text-xs font-semibold text-white">Include Handcrafted Silk Latkans (Tassels)</h5>
                      <p className="text-[11px] text-gray-400">Hand-made matching fabric tassels with gold bead drops (+₹800)</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeLatkans}
                    onChange={(e) => setIncludeLatkans(e.target.checked)}
                    className="w-5 h-5 accent-[#ff2a85] rounded cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: FABRIC & COLOR */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#ff62a6] font-semibold">
                    STEP 03 OF 04
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    Select Base Fabric & Color Palette
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                    Choose premium handloom pure silks or regal micro-velvet to match your saree.
                  </p>
                </div>

                {/* Fabric Selection */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-3">
                    Base Fabric
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FABRICS.map((fabric) => (
                      <div
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedFabric === fabric.id
                            ? 'bg-[#18141d] border-[#ff2a85] text-white'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <h5 className="text-sm font-semibold text-white mb-1">{fabric.name}</h5>
                        <p className="text-xs text-gray-400 font-light">{fabric.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="pt-4 border-t border-white/10">
                  <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-3">
                    Base Color: <span className="text-white font-normal">{selectedColor}</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#ff2a85] bg-[#ff2a85]/10 shadow-md'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs text-white truncate font-medium">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: MEASUREMENTS & SUBMIT */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#fbbf24] font-semibold">
                    STEP 04 OF 04
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    Measurements & Atelier Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
                    Enter key blouse measurements in inches or choose to coordinate via WhatsApp with our Salem tailoring master.
                  </p>
                </div>

                {/* Toggle Provide Later */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Ruler className="w-5 h-5 text-[#fbbf24]" />
                    <div>
                      <p className="text-xs font-semibold text-white">Share Measurements Later via WhatsApp</p>
                      <p className="text-[11px] text-gray-400">We will guide you with a measurement video tutorial</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={measurements.provideLater}
                    onChange={(e) => setMeasurements({ ...measurements, provideLater: e.target.checked })}
                    className="w-5 h-5 accent-[#fbbf24] rounded cursor-pointer"
                  />
                </div>

                {!measurements.provideLater && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Bust (inches)</label>
                      <input
                        type="text"
                        value={measurements.bust}
                        onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Waist (inches)</label>
                      <input
                        type="text"
                        value={measurements.waist}
                        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Shoulder (inches)</label>
                      <input
                        type="text"
                        value={measurements.shoulder}
                        onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Blouse Length</label>
                      <input
                        type="text"
                        value={measurements.blouseLength}
                        onChange={(e) => setMeasurements({ ...measurements, blouseLength: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Sleeve Length</label>
                      <input
                        type="text"
                        value={measurements.sleeveLength}
                        onChange={(e) => setMeasurements({ ...measurements, sleeveLength: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                    Contact Details for Atelier Consultation
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        placeholder="e.g. Priyadharshini"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="e.g. 98653 66447"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Delivery City / Country</label>
                    <input
                      type="text"
                      value={contactInfo.city}
                      onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                      placeholder="e.g. Salem / Chennai / USA / Singapore"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Special Notes / Wedding Date</label>
                    <textarea
                      rows={2}
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                      placeholder="e.g. Muhurtham on 18th Nov. Matching my yellow Kanchipuram silk saree."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff2a85] resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-xs uppercase tracking-widest text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl bg-[#ff2a85] hover:bg-[#ff4396] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg shadow-[#ff2a85]/30 flex items-center gap-2"
              >
                <span>Continue to Step 0{currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitInquiry}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff2a85] to-[#fbbf24] text-black text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl hover:opacity-95 flex items-center gap-2"
              >
                <span>Submit Custom Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live Summary & Consultation Card (Span 4) */}
        <div className="lg:col-span-4 bg-[#111117] border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#ff62a6] font-semibold">
                LIVE CONFIGURATION
              </span>
              <h4 className="font-serif text-lg text-white font-normal mt-0.5">Bespoke Bridal Blouse</h4>
            </div>
            <Scissors className="w-5 h-5 text-[#fbbf24]" />
          </div>

          {/* Configuration List */}
          <div className="py-4 space-y-3 text-xs border-b border-white/10">
            <div className="flex justify-between">
              <span className="text-gray-400">Neckline:</span>
              <span className="text-white font-medium text-right">{activeNeckline.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Embroidery:</span>
              <span className="text-[#fbbf24] font-medium text-right">{activeEmbroidery.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fabric:</span>
              <span className="text-white font-medium text-right">{activeFabric.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Color:</span>
              <span className="text-[#ff62a6] font-medium text-right">{selectedColor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sleeve:</span>
              <span className="text-white font-medium text-right capitalize">{selectedSleeve.split('-')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Handmade Latkans:</span>
              <span className="text-white font-medium">{includeLatkans ? 'Yes (+₹800)' : 'No'}</span>
            </div>
          </div>

          {/* Price Estimate */}
          <div className="py-4 border-b border-white/10 flex items-baseline justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Estimated Atelier Price</span>
            <div className="text-right">
              <div className="font-serif text-2xl font-bold text-white">
                ₹{estimatedPrice.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-gray-500">Includes stitching & inner cotton lining</span>
            </div>
          </div>

          {/* Direct WhatsApp CTA */}
          <div className="pt-4 space-y-3">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss On WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>Worldwide Courier Available from Salem</span>
            </div>
          </div>

          {/* Submission Success Confirmation Modal */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-2xl bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-center"
              >
                <Check className="w-6 h-6 text-[#fbbf24] mx-auto mb-2" />
                <h5 className="font-serif text-base text-white">Inquiry Created Successfully!</h5>
                <p className="text-xs text-gray-300 mt-1 font-light leading-relaxed">
                  Click the WhatsApp button above to transmit your exact measurements and design to our Salem boutique.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
