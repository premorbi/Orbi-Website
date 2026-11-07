import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'automation-flow', label: 'Home Automation' },
    { id: 'connectivity-map', label: 'Device Connectivity' },
    { id: 'ecosystem', label: 'Wired & Wireless' },
    { id: 'catalog', label: 'Product Catalog' },
    { id: 'scenes', label: 'Living Scenes' },
    { id: 'experience-centre', label: 'Experience Centre' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 dark:bg-[#11161B]/90 backdrop-blur-md border-b border-[#E8DFD3] dark:border-[#222B35] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark with real logo merged seamlessly into background */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center text-left group whitespace-nowrap shrink-0 cursor-pointer"
          title="ORBi AUTOMATIFY - Engineered to UPSCALE"
        >
          {/* Transparent Logo - Merged with background, no white bounding box */}
          <img
            src="/assets/aistudio/Orbi_Logo_Transparent.png"
            alt="ORBi AUTOMATIFY - Engineered to UPSCALE"
            className="dark:hidden h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <img
            src="/assets/aistudio/Orbi_Logo_Transparent_Dark.png"
            alt="ORBi AUTOMATIFY - Engineered to UPSCALE"
            className="hidden dark:block h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(197,155,39,0.25)]"
          />
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-[#C59B27] border-[#C59B27] font-bold'
                    : 'text-[#635747] dark:text-[#CBD5E1] border-transparent hover:text-[#1E2229] dark:hover:text-white hover:border-[#C59B27]/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dual Theme Switcher */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#635747] dark:text-[#D1D5DB] hover:text-[#C59B27] hover:bg-[#EFE8DD] dark:hover:bg-[#1E2630] border border-[#E4DACD] dark:border-[#2C3744] transition-colors cursor-pointer"
            title={isDark ? 'Switch to Warm Travertine Day Theme' : 'Switch to Obsidian Night Theme'}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#E2BE58]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#16202C] via-[#1F2E40] to-[#0F4C81] hover:from-[#C59B27] hover:to-[#9E7A17] rounded-lg shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Book VIP Visit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation drawer"
            className="lg:hidden p-2 rounded-lg text-[#1E2229] dark:text-white hover:bg-[#EFE8DD] dark:hover:bg-[#1F2733] border border-[#E4DACD] dark:border-[#2B3542] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Strictly honoring 15% mobile sticky cap by only opening on user tap) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] dark:bg-[#11161B] border-b border-[#E8DFD3] dark:border-[#222B35] px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 text-sm font-medium tracking-wide ${
                currentSection === link.id
                  ? 'text-[#C59B27] font-bold'
                  : 'text-[#635747] dark:text-[#CBD5E1]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E8DFD3] dark:border-[#222B35]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C59B27] to-[#9E7A17] rounded-lg shadow"
            >
              <span>Schedule Experience Centre Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
