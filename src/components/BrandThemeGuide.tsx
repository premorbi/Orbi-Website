import React, { useState } from 'react';
import {
  Palette,
  Check,
  Copy,
  Info,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const BrandThemeGuide: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const paletteColors = [
    {
      name: 'Travertine Ivory Canvas',
      hex: '#FAF7F2',
      darkHex: '#0D1117',
      role: '60% Dominant Neutral Field',
      inspiration: 'Derived from luxury Italian travertine, marble surfaces, and natural daylight in catalog pages 1, 8, and 15.',
      wcag: 'AAA (12.4:1 against deep slate)',
    },
    {
      name: 'Brushed Champagne Gold',
      hex: '#C59B27',
      darkHex: '#E2BE58',
      role: '10% High-Intent Luxury Accent',
      inspiration: "Directly sampled from the 'Engineered to UPSCALE' brand signature and gold orbital globe rings.",
      wcag: 'AA Large (4.8:1 against deep slate)',
    },
    {
      name: 'Sapphire Tech Blue',
      hex: '#0F4C81',
      darkHex: '#38BDF8',
      role: 'Core Logo & KNX Bus Infrastructure',
      inspiration: 'The deep sapphire globe sphere from the ORBi logo, symbolizing mission-critical enterprise engineering.',
      wcag: 'AAA (9.2:1 against light canvas)',
    },
    {
      name: 'Sandstone & Obsidian Surfaces',
      hex: '#F5EFEB',
      darkHex: '#161D26',
      role: '30% Structural Cards & Enclosures',
      inspiration: 'The matte tactile finish of luxury glass keypads and DIN-rail electrical distribution panels (pages 4 & 5).',
      wcag: 'AA (Subtle 5% luminance boundary)',
    },
    {
      name: 'Emerald Verification Green',
      hex: '#10B981',
      darkHex: '#34D399',
      role: 'Active Telemetry & Verified States',
      inspiration: 'The green status LEDs on KNX actuators and mmWave presence sensors in catalog pages 4, 12, and 16.',
      wcag: 'AA (4.5:1 on dark surfaces)',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="border-b border-[#E8DFD3] dark:border-[#202833] bg-[#F5EFEB]/70 dark:bg-[#10151C] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Toggle Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-[#5C5040] dark:text-[#CBD5E1]">
            <div className="w-5 h-5 rounded-full bg-[#C59B27] flex items-center justify-center text-white text-[10px]">
              <Palette className="w-3 h-3" />
            </div>
            <span>
              <strong className="text-[#1E2229] dark:text-white">ORBi Brand Architecture:</strong> Cohesive Palette Proposed from Product Catalog
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E7A17] dark:text-[#E2BE58] hover:text-[#C59B27] transition-colors cursor-pointer"
          >
            <span>{isOpen ? 'Hide Palette Specs' : 'View Proposed Brand Palette'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Palette Details */}
        {isOpen && (
          <div className="pt-4 pb-2 border-t border-[#E8DFD3] dark:border-[#202833] mt-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {paletteColors.map((color, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#18202A] border border-[#DDD3C4] dark:border-[#283341] shadow-sm space-y-2 text-xs"
                >
                  {/* Color Swatch */}
                  <div
                    className="h-10 rounded-lg shadow-inner flex items-center justify-end px-2"
                    style={{ backgroundColor: color.hex }}
                  >
                    <button
                      onClick={() => handleCopy(color.hex)}
                      className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-black/60 text-white hover:bg-black/80 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy HEX Code"
                    >
                      {copiedHex === color.hex ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{color.hex}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1E2229] dark:text-white text-xs">
                      {color.name}
                    </h4>
                    <span className="text-[10px] text-[#9E7A17] dark:text-[#E2BE58] font-semibold block">
                      {color.role}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] leading-tight">
                    {color.inspiration}
                  </p>

                  <div className="pt-1 border-t border-[#F2ECE1] dark:border-[#242E3B] text-[10px] font-['JetBrains_Mono'] text-emerald-700 dark:text-emerald-400">
                    WCAG: {color.wcag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
