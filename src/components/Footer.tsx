import React from 'react';
import { Download, ArrowUp, MapPin, Phone, Globe } from 'lucide-react';
import { BRAND_INFO } from '../data/catalogData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12161B] text-[#D1D5DB] border-t border-[#222B35] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#222B35]">
          {/* Brand Info (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src="/assets/aistudio/Orbi_Logo_Transparent_Dark.png"
                alt="ORBi AUTOMATIFY - Engineered to UPSCALE"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_2px_16px_rgba(197,155,39,0.3)]"
              />
            </div>

            <p className="font-['Cormorant_Garamond'] italic text-base text-[#9CA3AF]">
              "{BRAND_INFO.subheadline}"
            </p>

            <p className="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
              Complete luxury home automation, KNX wired backbones, DALI-2 architectural illumination, motorized shading, and biometric entrance security systems.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-['JetBrains_Mono'] text-[#9CA3AF]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                {BRAND_INFO.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0F4C81]" />
                {BRAND_INFO.website}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2BE58] font-['JetBrains_Mono'] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              {['overview', 'automation-flow', 'connectivity-map', 'ecosystem', 'catalog', 'scenes'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate(item)}
                      className="text-[#9CA3AF] hover:text-[#C59B27] transition-colors capitalize cursor-pointer"
                    >
                      {item.replace('-', ' ')}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Catalog Solutions */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2BE58] font-['JetBrains_Mono'] block">
              Systems
            </span>
            <ul className="space-y-2 text-xs text-[#9CA3AF]">
              <li>Wired KNX & Bus Pro</li>
              <li>DALI-2 Architectural Lighting</li>
              <li>Motorized Curtains & Blinds</li>
              <li>Sliding & Swing Gates</li>
              <li>Biometric Entrance Security</li>
              <li>mmWave Presence Sensors</li>
              <li>Dolby Atmos Home Cinema</li>
            </ul>
          </div>

          {/* Column 4: Experience Centre Contacts */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2BE58] font-['JetBrains_Mono'] block">
              Direct Inquiries
            </span>
            <div className="space-y-2 text-xs">
              {BRAND_INFO.contacts.map((contact, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-white font-medium block">{contact.name}</span>
                  <a
                    href={`tel:${contact.rawPhone}`}
                    className="text-[#9CA3AF] hover:text-[#C59B27] font-['JetBrains_Mono'] transition-colors block"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={BRAND_INFO.catalogPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E2BE58] hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brochure PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            © {new Date().getFullYear()} ORBi AUTOMATIFY. All rights reserved. Engineered to UPSCALE.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
