import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  Sliders,
  Sun,
  ShieldCheck,
  Maximize2,
  Thermometer,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { BRAND_INFO, CORE_POSSIBILITIES } from '../data/catalogData';

interface HeroProps {
  onExploreAutomation: () => void;
  onExploreConnectivity: () => void;
  onSelectPossibility: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreAutomation,
  onExploreConnectivity,
  onSelectPossibility,
}) => {
  // Interactive Room Mini-Sim in the Hero Carrier
  const [heroView, setHeroView] = useState<'interior' | 'villa' | 'touchpanel'>('interior');
  const [lightsOn, setLightsOn] = useState(true);
  const [lightLevel, setLightLevel] = useState(75);
  const [curtainOpen, setCurtainOpen] = useState(true);
  const [climateTemp, setClimateTemp] = useState(22.5);
  const [securityArmed, setSecurityArmed] = useState(false);

  const heroImages = {
    interior: {
      src: '/assets/web/smart_living_lighting.jpg',
      label: 'Architectural Living Suite',
      badge: 'Cove & Recessed Lighting',
    },
    villa: {
      src: '/assets/web/hero_luxury_villa.jpg',
      label: 'Smart Villa Exterior',
      badge: 'Façade & Landscape Automation',
    },
    touchpanel: {
      src: '/assets/catalog/page_01.png',
      label: 'Catalog Page 1 Suite',
      badge: 'Wall Touch Screen Sync',
    },
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#E8DFD3] dark:border-[#202833]">
      {/* Subtle luxury ambient background glows */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#E2BE58]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-40 w-80 h-80 rounded-full bg-[#0F4C81]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Column 1: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Brand Kicker */}
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.25em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
              <span className="w-8 h-[1px] bg-[#C59B27]" />
              <span>Complete Home Automation</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-['Cinzel'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161B22] dark:text-[#F3F4F6] leading-[1.08] text-balance">
              The Intelligent <br />
              <span className="font-['Cormorant_Garamond'] italic font-normal text-[#C59B27] dark:text-[#E2BE58]">
                Home.
              </span>
            </h1>

            {/* Catalog Subheading */}
            <p className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl italic text-[#4A4033] dark:text-[#D1D5DB] font-normal">
              "{BRAND_INFO.subheadline}"
            </p>

            <p className="text-base text-[#574D3F] dark:text-[#9BA3AF] max-w-xl leading-relaxed">
              Bring everyday systems together through one connected, thoughtfully designed ecosystem. 
              From architectural wired KNX backbones to seamless wireless smart relays, experience effortless living engineered without compromise.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreAutomation}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              >
                <span>Interactive Automation Flow</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreConnectivity}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#1E2229] dark:text-white bg-white/80 dark:bg-[#1B232D] hover:bg-[#F2ECE1] dark:hover:bg-[#25303D] border border-[#DDD3C4] dark:border-[#2D3847] rounded-lg transition-colors cursor-pointer"
              >
                <span>Device Connectivity Map</span>
                <Sliders className="w-4 h-4 text-[#C59B27]" />
              </button>

              <a
                href={BRAND_INFO.catalogPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-medium tracking-wide text-[#7C6C57] dark:text-[#9BA3AF] hover:text-[#C59B27] transition-colors"
                title="View original 17-page product brochure"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Catalog</span>
              </a>
            </div>

            {/* Adjacency Trust Markers (§1.H) */}
            <div className="pt-4 border-t border-[#E8DFD3] dark:border-[#222B35] grid grid-cols-3 gap-4">
              <div>
                <span className="font-['JetBrains_Mono'] block text-2xl font-bold text-[#1E2229] dark:text-white tabular-nums">
                  12+
                </span>
                <span className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] font-medium">
                  Integrated Domains
                </span>
              </div>
              <div>
                <span className="font-['JetBrains_Mono'] block text-2xl font-bold text-[#C59B27] tabular-nums">
                  100%
                </span>
                <span className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] font-medium">
                  In-Wall Retrofit Ready
                </span>
              </div>
              <div>
                <span className="font-['JetBrains_Mono'] block text-2xl font-bold text-[#0F4C81] dark:text-[#38BDF8] tabular-nums">
                  KNX · Zigbee
                </span>
                <span className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] font-medium">
                  Open Certified Bus
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Smart Living Room Preview Carrier with Real Web Images */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#F5EFEB] to-[#EBE2D5] dark:from-[#182029] dark:to-[#12161B] p-6 sm:p-7 border border-[#DDD3C4] dark:border-[#2B3542] shadow-xl">
              {/* Header inside carrier */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD3C4] dark:border-[#26313E]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C59B27]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1E2229] dark:text-white font-['Cinzel']">
                    Living Suite · Live Room State
                  </span>
                </div>
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Connected: KNX Bus
                </span>
              </div>

              {/* View Switcher Controls (Interior / Villa / Touchpanel) */}
              <div className="pt-3 flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-['JetBrains_Mono'] text-[#7C6C57] dark:text-[#9BA3AF]">
                  Perspective:
                </span>
                <div className="flex items-center gap-1.5">
                  {(['interior', 'villa', 'touchpanel'] as const).map((viewKey) => (
                    <button
                      key={viewKey}
                      onClick={() => setHeroView(viewKey)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer capitalize ${
                        heroView === viewKey
                          ? 'bg-[#1E2530] text-white ring-1 ring-[#C59B27] shadow-sm'
                          : 'bg-white/70 dark:bg-[#1E2631] text-[#635747] dark:text-[#CBD5E1] hover:text-[#1E2229]'
                      }`}
                    >
                      {viewKey === 'interior' ? 'Living Room' : viewKey === 'villa' ? 'Villa Facade' : 'Wall Touch'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real Architectural Web Photography with Live Ambient Lighting Simulation */}
              <div className="relative my-4 rounded-xl h-52 sm:h-56 overflow-hidden border border-[#DDD3C4] dark:border-[#2E3948] shadow-inner group">
                <img
                  src={heroImages[heroView].src}
                  alt={heroImages[heroView].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Real-time Lighting simulation overlay on the real photo */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundColor: lightsOn ? '#E2BE58' : '#0B0F14',
                    opacity: lightsOn ? (lightLevel / 100) * 0.28 : 0.65,
                    mixBlendMode: lightsOn ? 'color-dodge' : 'multiply',
                  }}
                />

                {/* Status Badges Overlay */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded text-[11px] font-['JetBrains_Mono'] text-white shadow">
                  Lighting: {lightsOn ? `${lightLevel}% Tunable` : 'Off'}
                </div>
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded text-[11px] font-['JetBrains_Mono'] text-[#E2BE58] shadow">
                  Curtains: {curtainOpen ? 'Open (85%)' : 'Closed'}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] text-slate-300">
                  {heroImages[heroView].badge}
                </div>
              </div>

              {/* Interactive Direct Controls */}
              <div className="space-y-4 pt-1">
                {/* 1. Lighting Control */}
                <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/70 dark:bg-[#1E2631] border border-[#DDD3C4] dark:border-[#2E3947]">
                  <div className="flex items-center gap-3">
                    <Sun className={`w-4 h-4 ${lightsOn ? 'text-[#C59B27]' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold text-[#1E2229] dark:text-white">
                      Architectural Lighting
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={lightLevel}
                      disabled={!lightsOn}
                      onChange={(e) => setLightLevel(Number(e.target.value))}
                      className="w-20 sm:w-24 accent-[#C59B27] cursor-pointer"
                    />
                    <button
                      onClick={() => setLightsOn(!lightsOn)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                        lightsOn
                          ? 'bg-[#C59B27] text-white'
                          : 'bg-[#DDD3C4] dark:bg-[#2F3A48] text-[#554A3B] dark:text-[#9BA3AF]'
                      }`}
                    >
                      {lightsOn ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>

                {/* 2. Motorized Curtains & Climate */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCurtainOpen(!curtainOpen)}
                    className="p-3 rounded-lg bg-white/70 dark:bg-[#1E2631] border border-[#DDD3C4] dark:border-[#2E3947] flex items-center justify-between text-left hover:border-[#C59B27] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-[#C59B27]" />
                      <div>
                        <span className="block text-xs font-semibold text-[#1E2229] dark:text-white">
                          Curtains
                        </span>
                        <span className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF]">
                          {curtainOpen ? 'Open (Daylight)' : 'Blackout Closed'}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="p-3 rounded-lg bg-white/70 dark:bg-[#1E2631] border border-[#DDD3C4] dark:border-[#2E3947] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-[#0F4C81] dark:text-[#38BDF8]" />
                      <div>
                        <span className="block text-xs font-semibold text-[#1E2229] dark:text-white">
                          Climate VRV
                        </span>
                        <span className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF]">
                          {climateTemp.toFixed(1)}°C
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setClimateTemp(Math.max(18, climateTemp - 0.5))}
                        className="w-6 h-6 rounded bg-[#EAE2D5] dark:bg-[#2B3542] text-xs font-bold text-[#1E2229] dark:text-white hover:bg-[#C59B27] hover:text-white cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setClimateTemp(Math.min(28, climateTemp + 0.5))}
                        className="w-6 h-6 rounded bg-[#EAE2D5] dark:bg-[#2B3542] text-xs font-bold text-[#1E2229] dark:text-white hover:bg-[#C59B27] hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Perimeter Security Arming */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-[#1E2631] border border-[#DDD3C4] dark:border-[#2E3947]">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck
                      className={`w-4 h-4 ${
                        securityArmed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs font-semibold text-[#1E2229] dark:text-white">
                      Perimeter Intrusion System
                    </span>
                  </div>
                  <button
                    onClick={() => setSecurityArmed(!securityArmed)}
                    className={`px-3 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                      securityArmed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#DDD3C4] dark:bg-[#2E3947] text-[#554A3B] dark:text-[#9BA3AF]'
                    }`}
                  >
                    {securityArmed ? 'ARMED' : 'DISARMED'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12 Core Possibilities Ribbon (From Page 2 of Catalog) */}
        <div className="mt-16 pt-8 border-t border-[#E8DFD3] dark:border-[#202833]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58]">
                The Possibilities
              </span>
              <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#1E2229] dark:text-white mt-1">
                Every Element. One Intelligent Home.
              </h2>
            </div>
            <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] max-w-md">
              Bring everyday systems together through one connected, thoughtfully designed home.
            </p>
          </div>

          {/* Grid of the 12 catalog categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CORE_POSSIBILITIES.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectPossibility(item.id)}
                className="group p-4 rounded-xl text-left bg-white/70 dark:bg-[#182029] hover:bg-[#FAF5EC] dark:hover:bg-[#202B37] border border-[#E4DACD] dark:border-[#26313E] hover:border-[#C59B27] transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
              >
                <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center bg-[#F3EBDD] dark:bg-[#222C38] text-[#9E7A17] dark:text-[#E2BE58] group-hover:bg-[#C59B27] group-hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-[#1E2229] dark:text-white group-hover:text-[#C59B27] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] mt-1 leading-snug">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
