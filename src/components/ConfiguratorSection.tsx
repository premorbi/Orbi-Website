import React, { useState } from 'react';
import {
  Sliders,
  Check,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface ConfiguratorSectionProps {
  onScheduleVisit: (summary: string) => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({
  onScheduleVisit,
}) => {
  const [propertyType, setPropertyType] = useState<'villa' | 'apartment' | 'penthouse' | 'commercial'>('villa');
  const [techPreference, setTechPreference] = useState<'hybrid' | 'knx' | 'wireless'>('hybrid');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'lighting',
    'shades',
    'climate',
    'security',
    'av',
  ]);
  const [roomsCount, setRoomsCount] = useState<number>(4);

  const modulesList = [
    { id: 'lighting', name: 'Architectural Lighting (DALI / Dimming)' },
    { id: 'shades', name: 'Motorized Curtains & Blinds' },
    { id: 'climate', name: 'HVAC VRV/VRF Direct Bus Integration' },
    { id: 'security', name: 'Biometric Access & Video Intercom' },
    { id: 'av', name: 'Multi-Room Audio & Private Screening' },
    { id: 'gates', name: 'Motorized Gates & Rolling Shutters' },
    { id: 'surveillance', name: '4K CCTV IP & AI Perimeter Guard' },
    { id: 'sensors', name: 'mmWave Human Presence & Lux Sensors' },
  ];

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter((m) => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleBookWithConfig = () => {
    const summary = `${propertyType.toUpperCase()} (${roomsCount} Rooms) · Tech: ${techPreference.toUpperCase()} · Modules: ${selectedModules.join(', ')}`;
    onScheduleVisit(summary);
  };

  return (
    <section className="py-20 bg-[#FAF7F2] dark:bg-[#11161B] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive System Configurator</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            Architectural System Planner
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF]">
            Tailor a complete smart automation blueprint for your residence or commercial project. Select your space type, infrastructure preference, and core functional modules.
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#283342] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Configuration Steps (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Property Type */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono'] block">
                  1. Property Architecture
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'villa', label: 'Luxury Villa' },
                    { id: 'apartment', label: 'Apartment' },
                    { id: 'penthouse', label: 'Penthouse' },
                    { id: 'commercial', label: 'Commercial' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPropertyType(item.id as any)}
                      className={`p-3 rounded-lg text-xs font-bold transition-all text-center border cursor-pointer ${
                        propertyType === item.id
                          ? 'bg-[#1E2530] text-white border-[#C59B27] ring-1 ring-[#C59B27]'
                          : 'bg-[#FAF7F2] dark:bg-[#1B232E] text-[#554A3B] dark:text-[#CBD5E1] border-[#E4DACD] dark:border-[#2B3544] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Infrastructure Preference */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono'] block">
                  2. Automation Technology Framework
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'hybrid',
                      title: 'Wired + Wireless Hybrid',
                      desc: 'Recommended: KNX backbone for main areas + Zigbee relays in bedrooms.',
                    },
                    {
                      id: 'knx',
                      title: 'Pure Wired KNX',
                      desc: 'Dedicated low-voltage bus cabling with zero wireless traffic.',
                    },
                    {
                      id: 'wireless',
                      title: 'Wireless Zigbee & Relays',
                      desc: 'Ideal for existing finished apartments without wall modifications.',
                    },
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setTechPreference(tech.id as any)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        techPreference === tech.id
                          ? 'bg-[#FAF7F2] dark:bg-[#1B232E] border-[#C59B27] ring-2 ring-[#C59B27]/40 shadow-sm'
                          : 'bg-white dark:bg-[#151B23] border-[#E4DACD] dark:border-[#27313F]'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-[#1E2229] dark:text-white">
                        {tech.title}
                      </h4>
                      <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] mt-1 leading-snug">
                        {tech.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Modules Selection */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono'] block">
                  3. Solution Modules ({selectedModules.length} Selected)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modulesList.map((mod) => {
                    const isSelected = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`p-3 rounded-lg text-left border flex items-center justify-between transition-colors cursor-pointer text-xs ${
                          isSelected
                            ? 'bg-white dark:bg-[#1A222E] border-[#C59B27] font-semibold text-[#1E2229] dark:text-white'
                            : 'bg-[#FAF7F2]/60 dark:bg-[#171D26] border-[#E8DFD3] dark:border-[#273240] text-[#7C6C57] dark:text-[#9BA3AF]'
                        }`}
                      >
                        <span>{mod.name}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#C59B27] text-white' : 'border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Number of Rooms Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono']">
                    4. Scope of Rooms: {roomsCount} Living Zones / Rooms
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#1E2229] dark:text-white">
                    {roomsCount} Zones
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className="w-full accent-[#C59B27] cursor-pointer"
                />
              </div>
            </div>

            {/* Right Summary Specification Carrier (lg:col-span-5) */}
            <div className="lg:col-span-5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222E] border border-[#DDD3C4] dark:border-[#2A3544] p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58]">
                  Automated Architecture Scope
                </span>
                <h3 className="font-['Cinzel'] text-xl font-bold text-[#1E2229] dark:text-white mt-1">
                  Tailored Blueprint
                </h3>

                <div className="mt-5 space-y-3 text-xs font-['JetBrains_Mono']">
                  <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F] flex justify-between">
                    <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Property Classification</span>
                    <span className="font-bold text-[#1E2229] dark:text-white uppercase">{propertyType}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F] flex justify-between">
                    <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Control Infrastructure</span>
                    <span className="font-bold text-[#C59B27] uppercase">{techPreference}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F] flex justify-between">
                    <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Coverage</span>
                    <span className="font-bold text-[#0F4C81] dark:text-[#38BDF8]">{roomsCount} Core Zones</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F] flex justify-between">
                    <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Active Modules</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedModules.length} Subsystems</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#EFE8DD] dark:bg-[#202936] text-[11px] text-[#635747] dark:text-[#CBD5E1] space-y-1">
                  <span className="font-bold text-[#1E2229] dark:text-white block">
                    Engineering Consultation Included:
                  </span>
                  <p>
                    Every configuration includes on-site electrical survey in Bengaluru, CAD coordination with your interior architect, and live staging at our Experience Centre.
                  </p>
                </div>
              </div>

              <button
                onClick={handleBookWithConfig}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] rounded-lg shadow-md transition-all cursor-pointer"
              >
                <span>Request Blueprint & Experience Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
