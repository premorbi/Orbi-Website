import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  Building,
  User,
  Sparkles,
  Download,
} from 'lucide-react';
import { BRAND_INFO } from '../data/catalogData';

interface ExperienceCentreProps {
  initialConfigSummary?: string;
}

export const ExperienceCentre: React.FC<ExperienceCentreProps> = ({
  initialConfigSummary,
}) => {
  const [showroomView, setShowroomView] = useState<'showroom' | 'catalog'>('showroom');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Villa / Standalone Residence',
    stage: 'Under Construction (Rough-in Wiring)',
    preferredDate: '',
    notes: initialConfigSummary || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and phone number so our team can coordinate your visit.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="experience-centre" className="py-20 bg-[#F5EFEB] dark:bg-[#0D1117] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Page 17 of Catalog · Get in Touch</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            Visit Our Experience Centre
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF]">
            Step into a fully functioning, immersive intelligent residence in Bengaluru. Test tactile thermostatic glass keypads, experience silent motorized drapery, and witness real-time KNX bus reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts & Location details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Experience Center Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#283342] shadow-xl space-y-6">
              {/* Real Experience Centre Photographic View with Web/Catalog Switcher */}
              <div className="space-y-2">
                <div className="relative h-48 rounded-xl overflow-hidden border border-[#E8DFD3] dark:border-[#2C3746] shadow-md group">
                  <img
                    src={
                      showroomView === 'showroom'
                        ? '/assets/web/experience_showroom.jpg'
                        : '/assets/catalog/page_17.png'
                    }
                    alt="ORBi Experience Centre - Bengaluru"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-['Cinzel'] font-bold text-[#E2BE58]">
                      {showroomView === 'showroom' ? 'Bengaluru Flagship Studio' : 'Catalog Page 17 Suite'}
                    </span>
                    <span className="text-[10px] font-['JetBrains_Mono'] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      Karnataka
                    </span>
                  </div>
                </div>

                {/* View switcher buttons */}
                <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] px-1">
                  <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Gallery View:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowroomView('showroom')}
                      className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                        showroomView === 'showroom'
                          ? 'bg-[#C59B27] text-white font-bold'
                          : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      Studio Interior
                    </button>
                    <button
                      onClick={() => setShowroomView('catalog')}
                      className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                        showroomView === 'catalog'
                          ? 'bg-[#C59B27] text-white font-bold'
                          : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      Catalog Page 17
                    </button>
                  </div>
                </div>
              </div>

              {/* Logo merged seamlessly with background, no white rectangle */}
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <img
                    src="/assets/aistudio/Orbi_Logo_Transparent.png"
                    alt="ORBi AUTOMATIFY"
                    className="dark:hidden h-10 w-auto object-contain"
                  />
                  <img
                    src="/assets/aistudio/Orbi_Logo_Transparent_Dark.png"
                    alt="ORBi AUTOMATIFY"
                    className="hidden dark:block h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(197,155,39,0.25)]"
                  />
                </div>
                <div>
                  <h3 className="font-['Cinzel'] text-base font-bold text-[#1E2229] dark:text-white">
                    Private Engineering Suite
                  </h3>
                  <span className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                    {BRAND_INFO.location}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5C5040] dark:text-[#CBD5E1] leading-relaxed">
                Our private experience centre allows architects, interior designers, and prospective homeowners to test live automation scenes in a simulated luxury villa setting before laying a single conduit.
              </p>

              {/* Direct Leadership Contacts from Catalog */}
              <div className="space-y-4 pt-4 border-t border-[#EAE2D5] dark:border-[#26313E]">
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold block">
                  Executive Consultation Directors
                </span>

                {BRAND_INFO.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A232E] border border-[#EAE2D5] dark:border-[#273240] flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1E2229] dark:text-white">
                        {contact.name}
                      </h4>
                      <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] block">
                        {contact.role}
                      </span>
                    </div>

                    <a
                      href={`tel:${contact.rawPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold text-white bg-[#0F4C81] hover:bg-[#C59B27] transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* PDF Catalog Link */}
              <div className="pt-2">
                <a
                  href={BRAND_INFO.catalogPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#1E2229] dark:text-white bg-[#F2ECE1] dark:bg-[#202936] hover:bg-[#C59B27] hover:text-white transition-colors cursor-pointer border border-[#DDD3C4] dark:border-[#2C3848]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Architecture Catalog (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive VIP Visit Booking Form (lg:col-span-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#283342] p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1E2229] dark:text-white">
                  Appointment Confirmed
                </h3>
                <p className="text-sm text-[#5C5040] dark:text-[#CBD5E1] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Abdul Mahsheed and Manu Sharath have received your project details. We will coordinate your private walkthrough at the Bengaluru Experience Centre shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        projectType: 'Villa / Standalone Residence',
                        stage: 'Under Construction (Rough-in Wiring)',
                        preferredDate: '',
                        notes: '',
                      });
                    }}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1E2229] dark:text-white bg-[#F2ECE1] dark:bg-[#202936] rounded-lg hover:bg-[#DDD3C4] transition-colors cursor-pointer"
                  >
                    Schedule Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold">
                    Private Appointment Scheduling
                  </span>
                  <h3 className="font-['Cinzel'] text-xl font-bold text-[#1E2229] dark:text-white mt-1">
                    Book a Guided Walkthrough
                  </h3>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF]">
                    Experience live automation scenes and bring your floorplans for immediate engineering review.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs border border-rose-200 dark:border-rose-900">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Property Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    >
                      <option>Villa / Standalone Residence</option>
                      <option>High-End Apartment / Flat</option>
                      <option>Penthouse / Duplex</option>
                      <option>Commercial Office / Studio</option>
                      <option>Architect / Interior Consultant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                      Construction Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                    >
                      <option>Under Construction (Rough-in Wiring)</option>
                      <option>Planning / Architectural Blueprint</option>
                      <option>Interior Finishing / False Ceiling</option>
                      <option>Already Completed (Retrofit Relays)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2229] dark:text-white mb-1">
                    Specific Automation Interest or Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Interested in KNX lighting and motorized curtains for a 4BHK villa in Bengaluru."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-[#FAF7F2] dark:bg-[#1C2531] border border-[#DDD3C4] dark:border-[#2D394A] text-[#1E2229] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Experience Centre Visit'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
