import React, { useState } from 'react';
import {
  Sparkles,
  Home,
  Sunrise,
  Film,
  Moon,
  ShieldAlert,
  Music,
  CheckCircle2,
  Sliders,
  Volume2,
  Sun,
  Maximize2,
  Thermometer,
  ShieldCheck,
} from 'lucide-react';
import { LIFESTYLE_SCENES } from '../data/catalogData';
import { LifestyleScene } from '../types';

export const ScenesSection: React.FC = () => {
  const [activeSceneId, setActiveSceneId] = useState<string>('scene-1');
  const [isActuating, setIsActuating] = useState<boolean>(false);

  const activeScene: LifestyleScene =
    LIFESTYLE_SCENES.find((s) => s.id === activeSceneId) || LIFESTYLE_SCENES[0];

  const handleSelectScene = (id: string) => {
    setIsActuating(true);
    setActiveSceneId(id);
    setTimeout(() => {
      setIsActuating(false);
    }, 600);
  };

  const renderSceneIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'Sunrise': return <Sunrise className={className} />;
      case 'Film': return <Film className={className} />;
      case 'Moon': return <Moon className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Music': return <Music className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <section id="scenes" className="py-20 bg-[#F5EFEB] dark:bg-[#0D1117] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Page 3 of Catalog · The Experience</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            One Touch. A Different Experience.
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF]">
            A scene brings several actions together, so your home can respond to a moment, a routine or a single command. Tap any scene below to trigger the environmental response.
          </p>
        </div>

        {/* 6 Scenes Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {LIFESTYLE_SCENES.map((scene) => {
            const isActive = scene.id === activeSceneId;
            return (
              <button
                key={scene.id}
                onClick={() => handleSelectScene(scene.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer relative ${
                  isActive
                    ? 'bg-white dark:bg-[#1A232E] border-[#C59B27] ring-2 ring-[#C59B27]/40 shadow-lg scale-[1.03]'
                    : 'bg-white/70 dark:bg-[#141A22] border-[#DDD3C4] dark:border-[#26313F] hover:bg-white dark:hover:bg-[#18202A] hover:border-[#C59B27]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#9E7A17] dark:text-[#E2BE58]">
                    {scene.number}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#C59B27] text-white'
                        : 'bg-[#FAF7F2] dark:bg-[#202936] text-[#7C6C57] dark:text-[#CBD5E1]'
                    }`}
                  >
                    {renderSceneIcon(scene.icon, 'w-3.5 h-3.5')}
                  </div>
                </div>

                <h3 className="font-['Cinzel'] text-xs font-bold text-[#1E2229] dark:text-white tracking-wide">
                  {scene.title}
                </h3>
                <p className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] mt-1 line-clamp-2 leading-tight">
                  {scene.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scene Visualizer & Actuation Readout */}
        <div className="rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#283342] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Scene Narrative & Real Photography */}
            <div className="lg:col-span-5 space-y-4">
              {/* Real Scene Architectural Web Photograph */}
              <div className="relative h-52 sm:h-56 rounded-xl overflow-hidden border border-[#EAE2D5] dark:border-[#2A3442] shadow-md group">
                <img
                  src={
                    activeScene.id === 'scene-1'
                      ? '/assets/web/smart_living_lighting.jpg'
                      : activeScene.id === 'scene-2'
                      ? '/assets/web/home_theatre_cinema.jpg'
                      : activeScene.id === 'scene-3'
                      ? '/assets/web/hero_luxury_villa.jpg'
                      : activeScene.id === 'scene-4'
                      ? '/assets/web/motorized_curtains.jpg'
                      : activeScene.id === 'scene-5'
                      ? '/assets/web/smart_lock_door.jpg'
                      : '/assets/web/smart_living_lighting.jpg'
                  }
                  alt={activeScene.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-['Cinzel'] font-bold text-[#E2BE58]">
                    {activeScene.title}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                    Real Architectural Setup
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-['JetBrains_Mono'] font-bold bg-[#C59B27] text-white">
                  SCENE {activeScene.number}
                </span>
                <span className="text-xs font-semibold text-[#9E7A17] dark:text-[#E2BE58]">
                  Orchestrated Living Routine
                </span>
              </div>

              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#1E2229] dark:text-white">
                {activeScene.title}
              </h3>

              <p className="font-['Cormorant_Garamond'] italic text-lg text-[#7C6C57] dark:text-[#D1D5DB]">
                "{activeScene.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#5C5040] dark:text-[#9BA3AF] leading-relaxed">
                {activeScene.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleSelectScene(activeScene.id)}
                  disabled={isActuating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#182330] to-[#0F4C81] hover:from-[#C59B27] hover:to-[#9E7A17] transition-all cursor-pointer shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isActuating ? 'Harmonizing Home...' : 'Re-Trigger Scene Pulse'}</span>
                </button>
              </div>
            </div>

            {/* Right: Environmental Actuation Matrix */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#7C6C57] dark:text-[#9BA3AF] block mb-2">
                Simulated Room Parameter States
              </span>

              {/* 1. Lighting Level */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#EAE2D5] dark:border-[#273240] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2ECE1] dark:bg-[#25303E] text-[#C59B27] flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E2229] dark:text-white block">
                      Architectural Lighting
                    </span>
                    <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                      {activeScene.roomPreset.lighting}
                    </span>
                  </div>
                </div>
                <div className="text-right font-['JetBrains_Mono'] text-xs font-bold text-[#C59B27]">
                  {activeScene.roomPreset.lightingLevel}%
                </div>
              </div>

              {/* 2. Window Shades */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#EAE2D5] dark:border-[#273240] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2ECE1] dark:bg-[#25303E] text-[#0F4C81] dark:text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E2229] dark:text-white block">
                      Curtains & Blinds
                    </span>
                    <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                      {activeScene.roomPreset.curtains}
                    </span>
                  </div>
                </div>
                <div className="text-right font-['JetBrains_Mono'] text-xs font-bold text-[#1E2229] dark:text-white">
                  {activeScene.roomPreset.curtainLevel}% Position
                </div>
              </div>

              {/* 3. Climate Setpoint */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#EAE2D5] dark:border-[#273240] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2ECE1] dark:bg-[#25303E] text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1E2229] dark:text-white block">
                      VRV/VRF Air Conditioning
                    </span>
                    <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                      {activeScene.roomPreset.climate}
                    </span>
                  </div>
                </div>
                <div className="text-right font-['JetBrains_Mono'] text-xs font-bold text-[#0F4C81] dark:text-[#38BDF8]">
                  {activeScene.roomPreset.temperature}°C
                </div>
              </div>

              {/* 4. Audio & Security */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#EAE2D5] dark:border-[#273240] flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-[#9E7A17] dark:text-[#E2BE58] shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#1E2229] dark:text-white block">
                      Audio Zone
                    </span>
                    <span className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] truncate block">
                      {activeScene.roomPreset.audio}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#EAE2D5] dark:border-[#273240] flex items-center gap-3">
                  <ShieldCheck
                    className={`w-4 h-4 shrink-0 ${
                      activeScene.roomPreset.securityArmed
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1E2229] dark:text-white block">
                      Security Status
                    </span>
                    <span className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] truncate block">
                      {activeScene.roomPreset.security}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
