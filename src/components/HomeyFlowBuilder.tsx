import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Tv,
  KeyRound,
  Activity,
  Sun,
  Clock,
  Lightbulb,
  Maximize2,
  Thermometer,
  ShieldCheck,
  Music,
  ArrowRight,
  Sliders,
  Moon,
  ChevronRight,
} from 'lucide-react';
import { HOMEY_FLOW_PRESETS } from '../data/catalogData';
import { AutomationFlowPreset } from '../types';

export const HomeyFlowBuilder: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [pulseStage, setPulseStage] = useState<'idle' | 'trigger' | 'condition' | 'action' | 'complete'>('idle');

  // Simulated physical home state reflecting the flow execution
  const [simulatedState, setSimulatedState] = useState({
    lightingLevel: 75,
    lightingColor: 'Warm White',
    curtainsState: 'Open',
    climateSetPoint: 24,
    securityArmed: false,
    audioPlaying: false,
    message: 'System in idle equilibrium · awaiting trigger',
  });

  const activePreset: AutomationFlowPreset = HOMEY_FLOW_PRESETS[activePresetIndex];

  // Execute the Homey-style flow animation
  const handleExecuteFlow = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setPulseStage('trigger');
    setSimulatedState((prev) => ({
      ...prev,
      message: `Trigger detected: "${activePreset.trigger.detail}"`,
    }));

    // Stage 1: Trigger fires
    setTimeout(() => {
      setPulseStage('condition');
      setSimulatedState((prev) => ({
        ...prev,
        message: 'Evaluating environmental conditions (Lux, Clock & Presence)...',
      }));
    }, 700);

    // Stage 2: Conditions pass -> Actuation pulses to devices
    setTimeout(() => {
      setPulseStage('action');
      setSimulatedState((prev) => ({
        ...prev,
        message: 'All conditions met. Dispatching KNX bus & Zigbee commands...',
      }));
    }, 1500);

    // Stage 3: Actions completed, physical room state updated
    setTimeout(() => {
      setPulseStage('complete');
      if (activePreset.id === 'cinema-flow') {
        setSimulatedState({
          lightingLevel: 10,
          lightingColor: 'Cinema Amber Cove',
          curtainsState: 'Blackout Closed (0%)',
          climateSetPoint: 21.5,
          securityArmed: true,
          audioPlaying: true,
          message: 'Flow Complete: Private Cinema Mode fully active.',
        });
      } else if (activePreset.id === 'arrival-flow') {
        setSimulatedState({
          lightingLevel: 65,
          lightingColor: '2700K Welcoming Gold',
          curtainsState: 'Terrace Open (80%)',
          climateSetPoint: 23.0,
          securityArmed: false,
          audioPlaying: true,
          message: 'Flow Complete: Welcome Home atmosphere initialized.',
        });
      } else {
        setSimulatedState({
          lightingLevel: 50,
          lightingColor: 'Adaptive Reading White',
          curtainsState: 'Daylight Optimized',
          climateSetPoint: 22.5,
          securityArmed: false,
          audioPlaying: false,
          message: 'Flow Complete: mmWave presence logic maintaining active comfort.',
        });
      }
      setIsExecuting(false);
    }, 2400);
  };

  const handleReset = () => {
    setIsExecuting(false);
    setPulseStage('idle');
    setSimulatedState({
      lightingLevel: 75,
      lightingColor: 'Standard Neutral',
      curtainsState: 'Open',
      climateSetPoint: 24,
      securityArmed: false,
      audioPlaying: false,
      message: 'State reset to standard daytime profile.',
    });
  };

  useEffect(() => {
    handleReset();
  }, [activePresetIndex]);

  return (
    <section id="automation-flow" className="py-20 bg-[#FAF7F2] dark:bg-[#11161B] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Flow Engine</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            When. And. Then.
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF] leading-relaxed">
            True automation isn't opening an app to flick a switch. It is a home that senses your intentions, evaluates real-time context, and coordinates multiple systems in one synchronized motion.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {HOMEY_FLOW_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activePresetIndex === idx
                  ? 'bg-gradient-to-r from-[#182330] to-[#0F4C81] text-white shadow-md ring-1 ring-[#C59B27]/50'
                  : 'bg-white/80 dark:bg-[#19222C] text-[#554A3B] dark:text-[#CBD5E1] border border-[#DDD3C4] dark:border-[#2A3442] hover:bg-[#F2ECE1] dark:hover:bg-[#222D3A]'
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>

        {/* The Interactive Homey Flow Board */}
        <div className="relative rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#2A3543] p-6 sm:p-8 shadow-xl overflow-hidden">
          {/* Subtle gold line accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />

          {/* Preset Title & Control Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] dark:border-[#26313E]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9E7A17] dark:text-[#E2BE58]">
                <span>{activePreset.subtitle}</span>
              </div>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-[#1E2229] dark:text-white mt-1">
                {activePreset.title}
              </h3>
              <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] mt-0.5">
                {activePreset.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                disabled={isExecuting}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#7C6C57] dark:text-[#CBD5E1] hover:text-[#1E2229] dark:hover:text-white bg-[#F2ECE1] dark:bg-[#202935] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleExecuteFlow}
                disabled={isExecuting}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow-md transition-all duration-200 cursor-pointer ${
                  isExecuting
                    ? 'bg-[#C59B27] animate-pulse cursor-wait'
                    : 'bg-gradient-to-r from-[#C59B27] to-[#9E7A17] hover:from-[#E2BE58] hover:to-[#B38822]'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isExecuting ? 'Transmitting Flow...' : 'Test Flow Live'}</span>
              </button>
            </div>
          </div>

          {/* Flow Cards Flow Layout (WHEN -> AND -> THEN) */}
          <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
            {/* SVG Connecting Flow Lines Overlay for Desktop */}
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Line from Trigger to Condition */}
              <line
                x1="28%"
                y1="50%"
                x2="35%"
                y2="50%"
                stroke={pulseStage !== 'idle' ? '#C59B27' : '#D1C7B7'}
                strokeWidth={pulseStage !== 'idle' ? '3' : '2'}
                strokeDasharray={pulseStage === 'trigger' || pulseStage === 'condition' ? '4 4' : 'none'}
                className={pulseStage === 'trigger' ? 'animate-pulse-flow' : ''}
              />
              {/* Line from Condition to Actions */}
              <line
                x1="63%"
                y1="50%"
                x2="70%"
                y2="50%"
                stroke={pulseStage === 'action' || pulseStage === 'complete' ? '#C59B27' : '#D1C7B7'}
                strokeWidth={pulseStage === 'action' || pulseStage === 'complete' ? '3' : '2'}
                strokeDasharray={pulseStage === 'action' ? '4 4' : 'none'}
                className={pulseStage === 'action' ? 'animate-pulse-flow' : ''}
              />
            </svg>

            {/* Zone 1: WHEN (Trigger Card) */}
            <div className="lg:col-span-4 z-10 flex flex-col">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0F4C81] dark:text-[#38BDF8] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0F4C81] dark:bg-[#38BDF8]" />
                <span>1. WHEN (Event Trigger)</span>
              </div>

              <div
                className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                  pulseStage === 'trigger'
                    ? 'bg-[#0F4C81]/10 dark:bg-[#0F4C81]/20 border-[#0F4C81] ring-2 ring-[#0F4C81]/40 scale-[1.02]'
                    : pulseStage !== 'idle'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-[#FAF7F2] dark:bg-[#1B232D] border-[#DDD3C4] dark:border-[#2C3746]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] font-bold bg-[#0F4C81] text-white">
                    WHEN
                  </span>
                  {pulseStage !== 'idle' && (
                    <span className="text-[11px] font-['JetBrains_Mono'] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Triggered
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0F4C81]/10 dark:bg-[#0F4C81]/30 text-[#0F4C81] dark:text-[#38BDF8] shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E2229] dark:text-white">
                      {activePreset.trigger.detail}
                    </h4>
                    <span className="block text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] mt-1 font-['JetBrains_Mono']">
                      Source: {activePreset.trigger.targetDevice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone 2: AND (Condition Gate) */}
            <div className="lg:col-span-4 z-10 flex flex-col">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                <span>2. AND (Context & Filters)</span>
              </div>

              <div
                className={`flex-1 p-5 rounded-xl border space-y-3 transition-all duration-300 ${
                  pulseStage === 'condition'
                    ? 'bg-[#C59B27]/10 dark:bg-[#C59B27]/20 border-[#C59B27] ring-2 ring-[#C59B27]/40 scale-[1.02]'
                    : pulseStage === 'action' || pulseStage === 'complete'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-[#FAF7F2] dark:bg-[#1B232D] border-[#DDD3C4] dark:border-[#2C3746]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] font-bold bg-[#C59B27] text-white">
                    AND
                  </span>
                  {(pulseStage === 'action' || pulseStage === 'complete') && (
                    <span className="text-[11px] font-['JetBrains_Mono'] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Satisfied
                    </span>
                  )}
                </div>

                {activePreset.conditions.map((cond) => (
                  <div
                    key={cond.id}
                    className="p-2.5 rounded-lg bg-white/80 dark:bg-[#171E27] border border-[#E4DACD] dark:border-[#28323F] flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded bg-[#F2ECE1] dark:bg-[#222C38] flex items-center justify-center text-[#9E7A17] dark:text-[#E2BE58] shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-[#1E2229] dark:text-[#F3F4F6]">
                      {cond.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone 3: THEN (Actuation Outcomes) */}
            <div className="lg:col-span-4 z-10 flex flex-col">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>3. THEN (Synchronized Actions)</span>
              </div>

              <div
                className={`flex-1 p-5 rounded-xl border space-y-2.5 transition-all duration-300 ${
                  pulseStage === 'action'
                    ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/40 scale-[1.02]'
                    : pulseStage === 'complete'
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-[#FAF7F2] dark:bg-[#1B232D] border-[#DDD3C4] dark:border-[#2C3746]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] font-bold bg-emerald-600 text-white">
                    THEN
                  </span>
                  {pulseStage === 'complete' && (
                    <span className="text-[11px] font-['JetBrains_Mono'] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Actuated
                    </span>
                  )}
                </div>

                {activePreset.actions.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-lg bg-white/80 dark:bg-[#171E27] border border-[#E4DACD] dark:border-[#28323F] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-[#1E2229] dark:text-[#F3F4F6] font-medium leading-tight">
                        {act.detail}
                      </span>
                    </div>
                    {act.actionValue && (
                      <span className="text-[10px] font-['JetBrains_Mono'] font-semibold px-2 py-0.5 rounded bg-[#F2ECE1] dark:bg-[#202936] text-[#7C6C57] dark:text-[#9BA3AF] shrink-0">
                        {act.actionValue}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real Living Space Photography for the active flow */}
          <div className="mt-8 rounded-xl overflow-hidden border border-[#DDD3C4] dark:border-[#273241] relative h-48 sm:h-52 group shadow-md">
            <img
              src={
                activePreset.id === 'cinema-flow'
                  ? '/assets/web/home_theatre_cinema.jpg'
                  : activePreset.id === 'arrival-flow'
                  ? '/assets/web/hero_luxury_villa.jpg'
                  : '/assets/web/smart_living_lighting.jpg'
              }
              alt="Real Intelligent Living Space"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-['JetBrains_Mono']">
              <div>
                <span className="font-bold text-[#E2BE58] block text-sm font-['Cinzel']">
                  {activePreset.title}
                </span>
                <span className="text-[11px] text-slate-300">
                  {simulatedState.message}
                </span>
              </div>
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px]">
                {pulseStage === 'complete' ? '● Flow Synchronized' : isExecuting ? '⚡ Actuating...' : '○ Ready'}
              </span>
            </div>
          </div>

          {/* Physical Living Space Real-Time Actuation Status Readout */}
          <div className="mt-4 pt-4 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE3] dark:from-[#171F29] dark:to-[#12171E] p-5 border border-[#DDD3C4] dark:border-[#273241]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#9E7A17] dark:text-[#E2BE58]">
                  Live Environmental Actuation Response
                </span>
                <p className="text-sm font-semibold text-[#1E2229] dark:text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-[#C59B27] animate-ping' : 'bg-emerald-500'}`} />
                  {simulatedState.message}
                </p>
              </div>

              {/* Status Metric Readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-['JetBrains_Mono']">
                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-[#1E2733] border border-[#DDD3C4] dark:border-[#2F3A48]">
                  <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Lighting Bus
                  </span>
                  <span className="font-bold text-[#1E2229] dark:text-white">
                    {simulatedState.lightingLevel}% · {simulatedState.lightingColor}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-[#1E2733] border border-[#DDD3C4] dark:border-[#2F3A48]">
                  <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Window Treatments
                  </span>
                  <span className="font-bold text-[#1E2229] dark:text-white">
                    {simulatedState.curtainsState}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-[#1E2733] border border-[#DDD3C4] dark:border-[#2F3A48]">
                  <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    VRV Climate
                  </span>
                  <span className="font-bold text-[#0F4C81] dark:text-[#38BDF8]">
                    {simulatedState.climateSetPoint}°C Modulating
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/90 dark:bg-[#1E2733] border border-[#DDD3C4] dark:border-[#2F3A48]">
                  <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Security Layer
                  </span>
                  <span className={`font-bold ${simulatedState.securityArmed ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {simulatedState.securityArmed ? 'Perimeter Armed' : 'Disarmed / Normal'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
