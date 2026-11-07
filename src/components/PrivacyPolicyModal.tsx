import React, { useEffect } from 'react';
import {
  ShieldCheck,
  X,
  Lock,
  EyeOff,
  Server,
  FileText,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { BRAND_INFO } from '../data/catalogData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#FAF7F2] dark:bg-[#12171E] border border-[#DDD3C4] dark:border-[#273241] shadow-2xl overflow-hidden text-[#1E2229] dark:text-[#E2E8F0]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#161D26]/95 backdrop-blur-md border-b border-[#E8DFD3] dark:border-[#26313F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C59B27]/10 dark:bg-[#C59B27]/20 flex items-center justify-center text-[#C59B27]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold block">
                Trust, Data Security & Compliance
              </span>
              <h2 id="privacy-policy-title" className="font-['Cinzel'] text-lg sm:text-xl font-bold text-[#1E2229] dark:text-white">
                Privacy Policy & Homeowner Data Charter
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close privacy policy"
            className="p-2 rounded-lg text-[#7C6C57] dark:text-[#9BA3AF] hover:text-[#1E2229] dark:hover:text-white hover:bg-[#F2ECE1] dark:hover:bg-[#202936] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs sm:text-sm leading-relaxed text-[#574D3F] dark:text-[#CBD5E1]">
          {/* Executive Summary Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-[#18202A] border border-[#DDD3C4] dark:border-[#293444] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C81] dark:text-[#38BDF8] uppercase tracking-wider font-['JetBrains_Mono']">
              <Lock className="w-4 h-4" />
              <span>Executive Commitment: Local First · Zero Data Monetization</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1E2229] dark:text-white font-medium">
              At <strong>ORBi AUTOMATIFY</strong>, we engineer intelligent residences for clients who value uncompromising elegance and absolute discretion. We do not monetize, harvest, or sell behavioral habits, lifestyle patterns, or sensor telemetry. Your automation operates authoritative logic locally inside your home.
            </p>
            <span className="text-[11px] font-['JetBrains_Mono'] text-[#7C6C57] dark:text-[#9BA3AF] block pt-1">
              Effective Date: January 1, 2026 · Compliant with India's Digital Personal Data Protection Act (DPDP Act, 2023)
            </span>
          </div>

          {/* Section 1: Scope & Local Architecture */}
          <section className="space-y-3">
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#1E2229] dark:text-white flex items-center gap-2">
              <span className="text-[#C59B27] font-['JetBrains_Mono'] text-sm">01.</span>
              Local-First Architectural Philosophy
            </h3>
            <p>
              Unlike mass-market cloud-dependent consumer gadgets, ORBi residential systems are architected on industry-certified wired backbones (<strong>KNX®, Bus Pro™</strong>) and secure local wireless meshes (<strong>Zigbee 3.0</strong>).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-[#FAF7F2] dark:bg-[#161D26] border border-[#E8DFD3] dark:border-[#273240]">
                <strong className="block text-xs text-[#1E2229] dark:text-white mb-1">On-Premises Execution</strong>
                <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Keypad presses, sensor actuations, and lighting scenes process within your local LAN. The system functions fully even during internet ISP outages.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#FAF7F2] dark:bg-[#161D26] border border-[#E8DFD3] dark:border-[#273240]">
                <strong className="block text-xs text-[#1E2229] dark:text-white mb-1">No Profiling or Ad Tracking</strong>
                <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                  We do not build behavioral advertising profiles based on when you wake, sleep, watch films, or adjust temperature.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-[#FAF7F2] dark:bg-[#161D26] border border-[#E8DFD3] dark:border-[#273240]">
                <strong className="block text-xs text-[#1E2229] dark:text-white mb-1">Encrypted Remote Tunnel</strong>
                <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Remote mobile app commands outside the domestic Wi-Fi network route through TLS 1.3 / AES-256 encrypted peer tunnels.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Data We Collect */}
          <section className="space-y-3">
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#1E2229] dark:text-white flex items-center gap-2">
              <span className="text-[#C59B27] font-['JetBrains_Mono'] text-sm">02.</span>
              Information We Collect & How It Is Used
            </h3>
            <p>
              We only collect data strictly necessary to deliver engineering consultations, commission automation hardware, and coordinate appointments:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  <strong>Consultation & Experience Centre Inquiries:</strong> When you book a walkthrough via our website or telephone, we collect your name, phone number, email address, property category (e.g. Villa, Penthouse), and construction stage. This information is used exclusively to contact you and prepare architectural recommendations.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  <strong>Project Design Documents:</strong> CAD files, electrical single-line diagrams (SLDs), and interior floor plans shared with our engineering team are stored in confidential client folders and never shared with unauthorized subcontractors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>
                  <strong>Website Diagnostics:</strong> Standard non-personally identifiable server logs (IP address, browser type, referring pages) to optimize site performance and prevent denial-of-service abuse.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Surveillance & Biometric Security */}
          <section className="space-y-3">
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#1E2229] dark:text-white flex items-center gap-2">
              <span className="text-[#C59B27] font-['JetBrains_Mono'] text-sm">03.</span>
              Video Surveillance, Audio & Biometric Privacy
            </h3>
            <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#273240] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C59B27]">
                <EyeOff className="w-4 h-4" />
                <span>Zero Cloud Recording Interception</span>
              </div>
              <p className="text-xs sm:text-sm">
                All IP surveillance video footage and biometric credentials (digital smart door lock fingerprint hashes, PIN codes, RFID card numbers) are stored directly on the homeowner’s on-premises Network Video Recorder (NVR) and secure door hardware. <strong>ORBi personnel have zero access to your live camera feeds or biometric data</strong> once commissioning is handed over.
              </p>
            </div>
          </section>

          {/* Section 4: Data Retention & Security Measures */}
          <section className="space-y-3">
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#1E2229] dark:text-white flex items-center gap-2">
              <span className="text-[#C59B27] font-['JetBrains_Mono'] text-sm">04.</span>
              Security Safeguards & Zero Third-Party Selling
            </h3>
            <p>
              We implement industry-standard physical, procedural, and technological safeguards to protect client records. We do not sell, rent, lease, or share personal contact details with commercial mailing lists, lead brokers, or marketing intermediaries under any circumstance.
            </p>
          </section>

          {/* Section 5: Your Rights under Indian DPDP Act 2023 */}
          <section className="space-y-3">
            <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-[#1E2229] dark:text-white flex items-center gap-2">
              <span className="text-[#C59B27] font-['JetBrains_Mono'] text-sm">05.</span>
              Your Legal Rights (DPDP Act & GDPR Principles)
            </h3>
            <p>
              As a client or website visitor, you retain complete authority over your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#273240]">
                <strong className="block text-xs text-[#1E2229] dark:text-white mb-0.5">Right to Access & Rectify</strong>
                <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Request an itemized summary of contact information on file, or request corrections to phone numbers or email addresses.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#273240]">
                <strong className="block text-xs text-[#1E2229] dark:text-white mb-0.5">Right to Erasure</strong>
                <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Instruct us to purge your consultation records and contact details from our active booking registers upon project conclusion.
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Grievance Officer & Contact Information */}
          <section className="p-5 rounded-xl bg-gradient-to-br from-[#F5EFEB] to-[#EAE2D5] dark:from-[#17202B] dark:to-[#121822] border border-[#DDD3C4] dark:border-[#293544] space-y-4">
            <div>
              <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold block">
                Official Inquiries & Grievance Redressal
              </span>
              <h4 className="font-['Cinzel'] text-base font-bold text-[#1E2229] dark:text-white mt-0.5">
                Data Protection & Privacy Contact
              </h4>
              <p className="text-xs text-[#635747] dark:text-[#9BA3AF] mt-1">
                For questions regarding data processing or to exercise your rights under the DPDP Act 2023, please reach our leadership directly:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-white dark:bg-[#141B24] border border-[#DDD3C4] dark:border-[#273240] space-y-1">
                <strong className="block text-[#1E2229] dark:text-white">
                  Abdul Mahsheed
                </strong>
                <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] block mb-1">
                  Director of Automation & Systems
                </span>
                <div className="space-y-0.5 text-xs font-['JetBrains_Mono']">
                  <a
                    href="tel:+917892551533"
                    className="text-[#0F4C81] dark:text-[#38BDF8] hover:underline block"
                  >
                    +91 78925 51533
                  </a>
                  <a
                    href="mailto:abdul@orbiautomatify.com"
                    className="text-[#9E7A17] dark:text-[#E2BE58] hover:underline block truncate"
                  >
                    abdul@orbiautomatify.com
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-[#141B24] border border-[#DDD3C4] dark:border-[#273240] space-y-1">
                <strong className="block text-[#1E2229] dark:text-white">
                  Manu Sharath
                </strong>
                <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] block mb-1">
                  Head of Solutions & Architecture
                </span>
                <div className="space-y-0.5 text-xs font-['JetBrains_Mono']">
                  <a
                    href="tel:+919110676861"
                    className="text-[#0F4C81] dark:text-[#38BDF8] hover:underline block"
                  >
                    +91 91106 76861
                  </a>
                  <a
                    href="mailto:manusharath@orbiautomatify.com"
                    className="text-[#9E7A17] dark:text-[#E2BE58] hover:underline block truncate"
                  >
                    manusharath@orbiautomatify.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DDD3C4] dark:border-[#26313F] flex flex-wrap items-center justify-between gap-3 text-xs font-['JetBrains_Mono'] text-[#7C6C57] dark:text-[#9BA3AF]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                ORBi AUTOMATIFY · Bengaluru, Karnataka, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#0F4C81] dark:text-[#38BDF8]" />
                privacy@orbiautomatify.com
              </span>
            </div>
          </section>
        </div>

        {/* Modal Bottom Action */}
        <div className="px-6 py-4 bg-white/95 dark:bg-[#161D26]/95 border-t border-[#E8DFD3] dark:border-[#26313F] flex items-center justify-between">
          <span className="text-[11px] font-['JetBrains_Mono'] text-[#7C6C57] dark:text-[#9BA3AF]">
            ORBi AUTOMATIFY · Engineered to UPSCALE
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] rounded-lg shadow transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
