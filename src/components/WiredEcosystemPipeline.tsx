import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Cpu,
  Boxes,
  Home,
  CheckCircle2,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const WiredEcosystemPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulatingSignal, setIsSimulatingSignal] = useState(false);
  const [retrofitSwitchOn, setRetrofitSwitchOn] = useState(true);

  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'USER INTERFACES',
      subtitle: 'Keypads · Touch Panels · Mobile App',
      description: 'The tactile and digital interaction layer. Wall keypads with thermostatic glass, motorized scene selectors, and customized smartphone dashboards where homeowner intent originates.',
      icon: 'SlidersHorizontal',
      actionLabel: 'User Taps Scene Button',
    },
    {
      id: 'step-2',
      number: '02',
      title: 'CONTROL LAYER',
      subtitle: 'Controllers · Logic Engines',
      description: 'The central intelligence brain. DIN-rail mounted KNX logic engines and microprocessors that evaluate incoming commands, schedule astronomical clocks, and dispatch bus telegrams.',
      icon: 'Cpu',
      actionLabel: 'Engine Evaluates Rules',
    },
    {
      id: 'step-3',
      number: '03',
      title: 'FIELD DEVICES',
      subtitle: 'Actuators · Dimmers · Motor Relays',
      description: 'Heavy-duty industrial DIN-rail modules mounted in centralized electrical panels that switch 230V circuits, modulate 0-10V/DALI drivers, and command shutter motors.',
      icon: 'Boxes',
      actionLabel: 'Actuators Switch Relays',
    },
    {
      id: 'step-4',
      number: '04',
      title: 'HOME SYSTEMS',
      subtitle: 'Lights · HVAC · Motorized Curtains',
      description: 'The living environment itself. Lighting groups fade gracefully, Daikin VRV air conditioners adjust setpoints, and motorized draperies glide to position in silence.',
      icon: 'Home',
      actionLabel: 'Room Harmonizes',
    },
  ];

  const handleTriggerSignal = (startIndex: number = 0) => {
    setIsSimulatingSignal(true);
    setActiveStep(startIndex);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => setIsSimulatingSignal(false), 500);
          return 3;
        }
      });
    }, 600);
  };

  return (
    <section id="ecosystem" className="py-20 bg-[#FAF7F2] dark:bg-[#11161B] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Layers className="w-3.5 h-3.5" />
            <span>Pages 4-7 of Catalog</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            A Connected Wired Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF]">
            A typical wired solution brings together control devices, field devices and the systems they operate. Explore the 4-tier architectural pipeline and our retrofit insert relay technology.
          </p>
        </div>

        {/* 4-Tier Interactive Pipeline */}
        <div className="rounded-2xl bg-white dark:bg-[#161D26] border border-[#DDD3C4] dark:border-[#273241] p-6 sm:p-8 shadow-xl mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] dark:border-[#26313E]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E7A17] dark:text-[#E2BE58]">
                Interactive Signal Tracing
              </span>
              <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-[#1E2229] dark:text-white mt-0.5">
                4-Stage Automation Pipeline
              </h3>
            </div>

            <button
              onClick={() => handleTriggerSignal(0)}
              disabled={isSimulatingSignal}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-lg shadow transition-all cursor-pointer ${
                isSimulatingSignal
                  ? 'bg-[#C59B27] animate-pulse cursor-wait'
                  : 'bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17]'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isSimulatingSignal ? 'Propagating Signal...' : 'Simulate Wall Tap'}</span>
            </button>
          </div>

          {/* 4-Step Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const isCompleted = activeStep > idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer relative ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE3] dark:from-[#1E2632] dark:to-[#171E28] border-[#C59B27] ring-2 ring-[#C59B27]/40 scale-[1.02] shadow-md'
                      : isCompleted
                      ? 'bg-white dark:bg-[#161D26] border-emerald-500/40'
                      : 'bg-[#FAF7F2]/60 dark:bg-[#18202A] border-[#DDD3C4] dark:border-[#2A3442]'
                  }`}
                >
                  {/* Step Number & Status Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#9E7A17] dark:text-[#E2BE58]">
                      Tier {step.number}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] animate-ping" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                    )}
                  </div>

                  <h4 className="font-['Cinzel'] text-sm font-bold text-[#1E2229] dark:text-white">
                    {step.title}
                  </h4>
                  <span className="block text-[11px] font-semibold text-[#0F4C81] dark:text-[#38BDF8] mt-0.5">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-[#5C5040] dark:text-[#9BA3AF] mt-2 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Signal Pulse Progress Bar on Active Card */}
                  {isCurrent && isSimulatingSignal && (
                    <div className="mt-3 h-1 w-full bg-[#C59B27]/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C59B27] animate-pulse rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Supported Technology Families Ribbon (Page 4 & 6 of Catalog) */}
          <div className="pt-6 border-t border-[#EAE2D5] dark:border-[#26313E] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6C57] dark:text-[#9BA3AF]">
              Certified Technology Families:
            </span>
            <div className="flex flex-wrap items-center gap-6 text-xs font-['JetBrains_Mono'] font-bold text-[#1E2229] dark:text-white">
              <span className="px-3 py-1 rounded bg-[#0F4C81]/10 text-[#0F4C81] dark:text-[#38BDF8] border border-[#0F4C81]/30">
                KNX® Certified
              </span>
              <span className="px-3 py-1 rounded bg-[#0F4C81]/10 text-[#0F4C81] dark:text-[#38BDF8] border border-[#0F4C81]/30">
                Bus Pro™
              </span>
              <span className="px-3 py-1 rounded bg-[#0F4C81]/10 text-[#0F4C81] dark:text-[#38BDF8] border border-[#0F4C81]/30">
                Cresnet®
              </span>
              <span className="px-3 py-1 rounded bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30">
                Zigbee 3.0
              </span>
              <span className="px-3 py-1 rounded bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/30">
                Z-Wave® Plus
              </span>
              <span className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                Wi-Fi 6
              </span>
            </div>
          </div>
        </div>

        {/* Retrofit Insert Relays Interactive Showcase (Catalog Page 7) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#F5EFEB] to-[#EAE0D3] dark:from-[#161E28] dark:to-[#0F141B] border border-[#DDD3C4] dark:border-[#2B3645] p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58]">
                Smart Upgrades · Page 7
              </span>
              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-[#1E2229] dark:text-white">
                Retrofit Insert Relays
              </h3>
              <p className="text-sm text-[#5C5040] dark:text-[#CBD5E1] leading-relaxed">
                Add smart control to selected existing circuits by fitting compact relay or dimmer modules behind compatible switches or at suitable electrical points.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/80 dark:bg-[#1A232E] border border-[#DDD3C4] dark:border-[#2C3848]">
                  <span className="font-bold text-xs text-[#1E2229] dark:text-white block mb-1">
                    Keep the Familiar Switch
                  </span>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF]">
                    Existing wall controls may be retained, subject to wiring and product compatibility.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 dark:bg-[#1A232E] border border-[#DDD3C4] dark:border-[#2C3848]">
                  <span className="font-bold text-xs text-[#1E2229] dark:text-white block mb-1">
                    Add Connected Control
                  </span>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF]">
                    Enable app, schedule, voice, or scene control with compatible modules and gateways.
                  </p>
                </div>
              </div>

              {/* A good fit for tags */}
              <div className="pt-2">
                <span className="text-xs text-[#7C6C57] dark:text-[#9BA3AF]">
                  A good fit for:{' '}
                  <strong className="text-[#1E2229] dark:text-white">
                    Renovations · Existing apartments · Selective smart upgrades
                  </strong>
                </span>
              </div>
            </div>

            {/* Interactive Switchplate & Concealed Relay Exploded Visualizer */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#131922] border border-[#DDD3C4] dark:border-[#26313F] shadow-lg text-center space-y-4">
                <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58]">
                  Real Hardware Installation · Page 7
                </span>

                {/* Real Photograph of Retrofit Insert Relay fitted behind switch */}
                <div className="relative h-48 rounded-xl overflow-hidden border border-[#E8DFD3] dark:border-[#2B3544] shadow-md group">
                  <img
                    src="/assets/catalog/page_07.png"
                    alt="Real Retrofit Insert Relay fitted in wall gang box"
                    className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Active circuit glow indicator */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      backgroundColor: retrofitSwitchOn ? '#E2BE58' : '#000000',
                      opacity: retrofitSwitchOn ? 0.15 : 0.4,
                      mixBlendMode: retrofitSwitchOn ? 'color-dodge' : 'multiply',
                    }}
                  />

                  {/* Relay Status Chip Overlay */}
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-['JetBrains_Mono'] text-white">
                    Module: 16A Micro Relay Fitted
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-['JetBrains_Mono'] font-bold text-[#E2BE58]">
                    {retrofitSwitchOn ? '● Relay Closed (Load ON)' : '○ Standby'}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#5C5040] dark:text-[#9BA3AF]">
                    Switch Status:{' '}
                    <strong className="text-[#1E2229] dark:text-white">
                      {retrofitSwitchOn ? 'Circuit Energized (Light ON)' : 'Circuit Open (Standby)'}
                    </strong>
                  </span>
                  <button
                    onClick={() => setRetrofitSwitchOn(!retrofitSwitchOn)}
                    className="px-3 py-1 rounded bg-[#C59B27] text-white text-xs font-bold hover:bg-[#9E7A17] transition-colors cursor-pointer"
                  >
                    Click to Flip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
