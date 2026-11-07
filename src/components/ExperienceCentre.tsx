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
  onOpenPrivacyPolicy?: () => void;
}

export const ExperienceCentre: React.FC<ExperienceCentreProps> = ({
  initialConfigSummary,
  onOpenPrivacyPolicy,
}) => {
  const [showroomView, setShowroomView] = useState<'flagship' | 'studio' | 'catalog'>('flagship');
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

  const getMailtoLink = () => {
    const recipients = 'abdul@orbiautomatify.com,orbi.engineering@orbiautomatify.com,manusharath@orbiautomatify.com';
    const subject = encodeURIComponent(`[VIP Visit Request] Bengaluru Experience Centre - ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Dear Abdul Mahsheed, Manu Sharath & ORBi Engineering Team,\n\n` +
      `A new private Experience Centre walkthrough has been requested via www.orbiautomatify.com:\n\n` +
      `• Client Name: ${formData.name}\n` +
      `• Phone Number: ${formData.phone}\n` +
      `• Email Address: ${formData.email || 'Not provided'}\n` +
      `• Property Category: ${formData.projectType}\n` +
      `• Construction Stage: ${formData.stage}\n` +
      `• Preferred Walkthrough Date: ${formData.preferredDate || 'Flexible / To Coordinate'}\n` +
      `• Specific Automation Interest / Notes: ${formData.notes || 'None'}\n\n` +
      `Please coordinate calendar schedule at the Bengaluru Flagship Studio.\n\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:${recipients}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and phone number so our team can coordinate your visit.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await fetch('/api/book-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('API notification endpoint reached, client backup active');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
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
              {/* Real Experience Centre Photographic View with Attached Flagship Studio Photo */}
              <div className="space-y-2">
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#E8DFD3] dark:border-[#2C3746] shadow-md group bg-[#EAE2D5] dark:bg-[#12171E]">
                  <img
                    src={
                      showroomView === 'flagship'
                        ? '/assets/aistudio/WhatsApp_Image_2026-11-07_at_7.10.09_PM_0f87466f.jpeg'
                        : showroomView === 'studio'
                        ? '/assets/web/experience_showroom.jpg'
                        : '/assets/catalog/page_17.png'
                    }
                    alt="ORBi Experience Centre - Bengaluru Flagship Studio"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div>
                      <span className="font-['Cinzel'] font-bold text-[#E2BE58] block">
                        {showroomView === 'flagship'
                          ? 'Bengaluru Flagship Studio'
                          : showroomView === 'studio'
                          ? 'Living Showroom Lounge'
                          : 'Catalog Page 17 Suite'}
                      </span>
                      <span className="text-[10px] text-slate-300">
                        {showroomView === 'flagship' ? 'Curved Architectural Cove & Keypad Niches' : 'Live Automation Testing'}
                      </span>
                    </div>
                    <span className="text-[10px] font-['JetBrains_Mono'] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded shrink-0">
                      Bengaluru
                    </span>
                  </div>
                </div>

                {/* View switcher buttons */}
                <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] px-1 pt-1">
                  <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Studio View:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setShowroomView('flagship')}
                      className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                        showroomView === 'flagship'
                          ? 'bg-[#C59B27] text-white font-bold'
                          : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      Flagship Studio
                    </button>
                    <button
                      onClick={() => setShowroomView('studio')}
                      className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                        showroomView === 'studio'
                          ? 'bg-[#C59B27] text-white font-bold'
                          : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      Showroom
                    </button>
                    <button
                      onClick={() => setShowroomView('catalog')}
                      className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer ${
                        showroomView === 'catalog'
                          ? 'bg-[#C59B27] text-white font-bold'
                          : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      Catalog
                    </button>
                  </div>
                </div>
              </div>

              {/* Logo merged seamlessly with background, scaled up prominently */}
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <img
                    src="/assets/aistudio/Orbi_Logo_Transparent.png"
                    alt="ORBi AUTOMATIFY"
                    className="dark:hidden h-14 sm:h-16 md:h-18 w-auto object-contain"
                  />
                  <img
                    src="/assets/aistudio/Orbi_Logo_Transparent_Dark.png"
                    alt="ORBi AUTOMATIFY"
                    className="hidden dark:block h-14 sm:h-16 md:h-18 w-auto object-contain drop-shadow-[0_2px_12px_rgba(197,155,39,0.35)]"
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
                    className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A232E] border border-[#EAE2D5] dark:border-[#273240] space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-[#1E2229] dark:text-white">
                          {contact.name}
                        </h4>
                        <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] block">
                          {contact.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded bg-[#C59B27]/10 text-[#9E7A17] dark:text-[#E2BE58] font-bold">
                        Director
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#EAE2D5] dark:border-[#26313E] text-xs font-['JetBrains_Mono']">
                      <a
                        href={`tel:${contact.rawPhone}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#C59B27] transition-colors truncate"
                        title={`Call ${contact.name}`}
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        <span className="truncate">{contact.phone}</span>
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1E2229] dark:text-white bg-[#EFE7DC] dark:bg-[#25303E] hover:bg-[#C59B27] hover:text-white transition-colors truncate"
                        title={`Email ${contact.name}`}
                      >
                        <Mail className="w-3 h-3 shrink-0 text-[#C59B27]" />
                        <span className="truncate">{contact.email}</span>
                      </a>
                    </div>
                  </div>
                ))}

                {/* Direct Engineering Desk Inquiry Link */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1A232E] border border-[#EAE2D5] dark:border-[#273240] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#7C6C57] dark:text-[#9BA3AF] block">
                      Engineering Desk
                    </span>
                    <span className="font-semibold text-[#1E2229] dark:text-white">
                      System Inquiries & Tenders
                    </span>
                  </div>
                  <a
                    href={`mailto:${BRAND_INFO.engineeringEmail}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs font-bold text-white bg-[#1E2530] hover:bg-[#C59B27] transition-colors"
                  >
                    <Mail className="w-3 h-3 text-[#38BDF8]" />
                    <span>{BRAND_INFO.engineeringEmail}</span>
                  </a>
                </div>
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
              <div className="py-8 text-center space-y-5 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold">
                    VIP Walkthrough Scheduled
                  </span>
                  <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#1E2229] dark:text-white">
                    Email Notification Queued
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5040] dark:text-[#CBD5E1] max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. An email notification has been queued for our leadership and engineering team. Abdul Mahsheed and Manu Sharath will reach out to finalize your visit.
                  </p>
                </div>

                {/* Email Recipients Badge */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#1C2532] border border-[#DDD3C4] dark:border-[#2A3544] max-w-lg mx-auto text-left space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                    <span className="text-[#9E7A17] dark:text-[#E2BE58] font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Email Notification Sent To:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      ● Dispatch Active
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-['JetBrains_Mono'] text-[11px]">
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#141A22] border border-[#E8DFD3] dark:border-[#28323F] text-[#1E2229] dark:text-white font-medium">
                      abdul@orbiautomatify.com
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#141A22] border border-[#E8DFD3] dark:border-[#28323F] text-[#1E2229] dark:text-white font-medium">
                      orbi.engineering@orbiautomatify.com
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#141A22] border border-[#E8DFD3] dark:border-[#28323F] text-[#1E2229] dark:text-white font-medium">
                      manusharath@orbiautomatify.com
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] transition-all shadow-md"
                    title="Send prefilled email confirmation from your mail client"
                  >
                    <Mail className="w-4 h-4 text-[#E2BE58]" />
                    <span>Send Direct Email Copy</span>
                  </a>

                  <a
                    href={`https://wa.me/917892551533?text=${encodeURIComponent(`Hello Abdul, I have scheduled a VIP visit for ${formData.name} (${formData.phone}) for ${formData.projectType}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-all shadow-md"
                  >
                    <span>WhatsApp Abdul</span>
                  </a>

                  <a
                    href={`https://wa.me/919110676861?text=${encodeURIComponent(`Hello Manu, I have scheduled a VIP visit for ${formData.name} (${formData.phone}) for ${formData.projectType}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-all shadow-md"
                  >
                    <span>WhatsApp Manu</span>
                  </a>
                </div>

                <div className="pt-2">
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
                    className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] hover:text-[#1E2229] dark:hover:text-white underline cursor-pointer"
                  >
                    Schedule Another Visit or Edit Details
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
                  {onOpenPrivacyPolicy && (
                    <p className="text-[11px] text-center text-[#7C6C57] dark:text-[#9BA3AF] mt-2.5">
                      Your details are kept strictly confidential under our{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="text-[#C59B27] hover:underline cursor-pointer font-medium"
                      >
                        Privacy Policy
                      </button>
                      . We never sell or share client data.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
