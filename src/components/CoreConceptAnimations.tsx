import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Smartphone,
  Wifi,
  Cloud,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sun,
  Maximize2,
  Thermometer,
  Lock,
  Unlock,
  Radio,
  Tv,
  CheckCircle2,
  ArrowRight,
  Sliders,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export const CoreConceptAnimations: React.FC = () => {
  const [activeConceptTab, setActiveConceptTab] = useState<'connectivity' | 'scenes' | 'remote'>('connectivity');

  // --- Concept 1: Device Connectivity & Self-Healing Mesh State ---
  const [isMeshObstructed, setIsMeshObstructed] = useState<boolean>(false);
  const [meshAnimSpeed, setMeshAnimSpeed] = useState<number>(1);
  const [packetCount, setPacketCount] = useState<number>(142);
  const [isSimulatingMeshPing, setIsSimulatingMeshPing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 3) + 1);
    }, 1200 / meshAnimSpeed);
    return () => clearInterval(timer);
  }, [meshAnimSpeed]);

  // --- Concept 2: Scene Activation Timeline Scrubber State ---
  const [isPlayingScene, setIsPlayingScene] = useState<boolean>(false);
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0 to 100
  const sceneAnimRef = useRef<any>(null);

  useEffect(() => {
    if (isPlayingScene) {
      sceneAnimRef.current = setInterval(() => {
        setSceneProgress((prev) => {
          if (prev >= 100) {
            return 0; // loop
          }
          return prev + 2;
        });
      }, 50);
    } else {
      if (sceneAnimRef.current) clearInterval(sceneAnimRef.current);
    }
    return () => {
      if (sceneAnimRef.current) clearInterval(sceneAnimRef.current);
    };
  }, [isPlayingScene]);

  // Determine which step in scene activation is triggered based on progress
  const sceneStepIndex = Math.min(4, Math.floor(sceneProgress / 20));

  // --- Concept 3: Remote Control & Handshake State ---
  const [remoteMode, setRemoteMode] = useState<'local' | 'cloud'>('cloud');
  const [remoteSignalState, setRemoteSignalState] = useState<'idle' | 'transmitting' | 'executed'>('idle');
  const [simulatedDeviceStates, setSimulatedDeviceStates] = useState({
    chandelier: true,
    curtainsOpen: true,
    doorLocked: true,
    acTemp: 22,
  });

  const triggerRemoteCommand = (device: string) => {
    setRemoteSignalState('transmitting');
    setTimeout(() => {
      if (device === 'chandelier') {
        setSimulatedDeviceStates((prev) => ({ ...prev, chandelier: !prev.chandelier }));
      } else if (device === 'curtains') {
        setSimulatedDeviceStates((prev) => ({ ...prev, curtainsOpen: !prev.curtainsOpen }));
      } else if (device === 'lock') {
        setSimulatedDeviceStates((prev) => ({ ...prev, doorLocked: !prev.doorLocked }));
      } else if (device === 'ac') {
        setSimulatedDeviceStates((prev) => ({
          ...prev,
          acTemp: prev.acTemp === 22 ? 24 : 22,
        }));
      }
      setRemoteSignalState('executed');
      setTimeout(() => setRemoteSignalState('idle'), 800);
    }, remoteMode === 'local' ? 150 : 650);
  };

  return (
    <section id="core-concepts" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFEB] dark:from-[#11161B] dark:to-[#0A0D10] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Concept Studio</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            How Intelligent Automation Works
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF] leading-relaxed">
            Experience the three core principles behind true smart living inspired by world-class automation systems: resilient connectivity, effortless scene harmony, and instant remote responsiveness.
          </p>
        </div>

        {/* 3 Main Concept Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            {
              id: 'connectivity',
              number: '01',
              title: 'Device Connectivity',
              subtitle: 'Mesh & Bus Reliability',
              icon: Zap,
            },
            {
              id: 'scenes',
              number: '02',
              title: 'Scene Activation',
              subtitle: 'Parallel Multi-System Symphony',
              icon: Layers,
            },
            {
              id: 'remote',
              number: '03',
              title: 'Instant Remote Control',
              subtitle: 'LAN vs Encrypted Cloud',
              icon: Smartphone,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeConceptTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveConceptTab(tab.id as any)}
                className={`p-4 rounded-xl text-left transition-all duration-300 cursor-pointer min-w-[240px] border flex items-center gap-3.5 ${
                  isActive
                    ? 'bg-white dark:bg-[#1A232F] border-[#C59B27] ring-2 ring-[#C59B27]/40 shadow-lg scale-[1.02]'
                    : 'bg-white/70 dark:bg-[#151C25] border-[#DDD3C4] dark:border-[#273241] hover:bg-white dark:hover:bg-[#18202A] hover:border-[#C59B27]/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#182330] to-[#0F4C81] text-[#E2BE58]'
                      : 'bg-[#F2ECE1] dark:bg-[#202936] text-[#7C6C57] dark:text-[#CBD5E1]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#9E7A17] dark:text-[#E2BE58] uppercase">
                    Concept {tab.number}
                  </span>
                  <h3 className="font-['Cinzel'] text-sm font-bold text-[#1E2229] dark:text-white">
                    {tab.title}
                  </h3>
                  <span className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF] block leading-tight">
                    {tab.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Concept Interactive Canvas */}
        <div className="rounded-2xl bg-white dark:bg-[#141B23] border border-[#DDD3C4] dark:border-[#273241] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top subtle gold accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent" />

          {/* ============================================================== */}
          {/* CONCEPT 1: DEVICE CONNECTIVITY & SELF-HEALING MESH */}
          {/* ============================================================== */}
          {activeConceptTab === 'connectivity' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] dark:border-[#242E3B]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C81] dark:text-[#38BDF8]">
                    <Zap className="w-4 h-4" />
                    <span>Self-Healing Dual-Layer Protocol: KNX Bus + Zigbee 3.0 Mesh</span>
                  </div>
                  <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1E2229] dark:text-white mt-1">
                    Visualizing Multi-Hop Connectivity
                  </h3>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] max-w-xl mt-0.5">
                    Every mains-powered smart switch and relay acts as a wireless signal repeater. If a direct path is blocked, the network dynamically discovers an alternate route in under 20 milliseconds.
                  </p>
                </div>

                {/* Interactive Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsMeshObstructed(!isMeshObstructed)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isMeshObstructed
                        ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                        : 'bg-[#FAF7F2] dark:bg-[#202936] text-[#1E2229] dark:text-white border border-[#DDD3C4] dark:border-[#2C3848]'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isMeshObstructed ? 'Obstacle Active (Rerouting)' : 'Simulate Wall Interference'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] dark:bg-[#1C2430] p-1 rounded-lg border border-[#DDD3C4] dark:border-[#2B3544] text-xs">
                    <span className="text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] px-1 font-['JetBrains_Mono']">
                      Speed:
                    </span>
                    {[0.5, 1, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setMeshAnimSpeed(spd)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                          meshAnimSpeed === spd
                            ? 'bg-[#C59B27] text-white'
                            : 'text-[#5C5040] dark:text-[#9BA3AF] hover:bg-[#EAE2D5] dark:hover:bg-[#25303E]'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated SVG Connectivity Network */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#FAF7F2] dark:bg-[#0E131A] rounded-xl border border-[#E8DFD3] dark:border-[#222B36] overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 900 380"
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="conn-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0F4C81" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                    <linearGradient id="conn-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C59B27" />
                      <stop offset="100%" stopColor="#E2BE58" />
                    </linearGradient>
                  </defs>

                  {/* Normal Direct Path: Hub (200, 190) -> Living Room Node (450, 190) */}
                  {!isMeshObstructed ? (
                    <g>
                      <line
                        x1="200"
                        y1="190"
                        x2="450"
                        y2="190"
                        stroke="#0F4C81"
                        strokeWidth="3"
                        strokeOpacity="0.8"
                      />
                      <line
                        x1="200"
                        y1="190"
                        x2="450"
                        y2="190"
                        stroke="#38BDF8"
                        strokeWidth="3"
                        className="animate-pulse-flow"
                        strokeDasharray="6 8"
                      />
                    </g>
                  ) : (
                    /* Rerouted Path when direct link is obstructed: Hub -> Relay 1 (320, 80) -> Living Node (450, 190) */
                    <g>
                      {/* Severed direct line */}
                      <line
                        x1="200"
                        y1="190"
                        x2="450"
                        y2="190"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeOpacity="0.4"
                      />
                      {/* Self-healing detour path */}
                      <path
                        d="M 200 190 Q 240 70 320 80 T 450 190"
                        fill="none"
                        stroke="#C59B27"
                        strokeWidth="3.5"
                        strokeOpacity="0.9"
                      />
                      <path
                        d="M 200 190 Q 240 70 320 80 T 450 190"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3.5"
                        className="animate-pulse-flow"
                        strokeDasharray="6 10"
                      />
                    </g>
                  )}

                  {/* Secondary mesh links to downstream endpoints */}
                  {/* Living Node (450, 190) -> Curtains (680, 100) */}
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="100"
                    stroke="#C59B27"
                    strokeWidth="2.5"
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="100"
                    stroke="#E2BE58"
                    strokeWidth="2.5"
                    className="animate-pulse-flow"
                    strokeDasharray="5 7"
                  />

                  {/* Living Node (450, 190) -> Chandelier (680, 190) */}
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="190"
                    stroke="#0F4C81"
                    strokeWidth="2.5"
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="190"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    className="animate-pulse-flow"
                    strokeDasharray="5 7"
                  />

                  {/* Living Node (450, 190) -> Thermostat (680, 280) */}
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="280"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="450"
                    y1="190"
                    x2="680"
                    y2="280"
                    stroke="#34D399"
                    strokeWidth="2.5"
                    className="animate-pulse-flow"
                    strokeDasharray="5 7"
                  />

                  {/* If obstructed: Show obstruction indicator */}
                  {isMeshObstructed && (
                    <g transform="translate(325, 190)">
                      <circle r="16" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
                      <text
                        textAnchor="middle"
                        y="5"
                        fill="#EF4444"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        ✕
                      </text>
                      <text
                        textAnchor="middle"
                        y="30"
                        fill="#EF4444"
                        fontSize="10"
                        fontWeight="bold"
                        className="font-['JetBrains_Mono']"
                      >
                        Interference Blocked
                      </text>
                    </g>
                  )}

                  {/* ================= NODES ================= */}
                  {/* 1. CENTRAL KNX & WIRELESS HUB */}
                  <g transform="translate(200, 190)" className="cursor-pointer">
                    <circle r="36" fill="#182330" stroke="#0F4C81" strokeWidth="3" />
                    <circle r="42" fill="none" stroke="#C59B27" strokeWidth="1.5" className="animate-ripple" />
                    <text textAnchor="middle" y="-4" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      ORBi Core
                    </text>
                    <text textAnchor="middle" y="10" fill="#E2BE58" fontSize="9" className="font-['JetBrains_Mono']">
                      KNX / Gateway
                    </text>
                    <text textAnchor="middle" y="55" fill="#1E2229" className="dark:fill-white" fontSize="11" fontWeight="bold">
                      Central Hub
                    </text>
                  </g>

                  {/* Detour Relay Node at (320, 80) */}
                  <g transform="translate(320, 80)">
                    <circle
                      r="22"
                      fill={isMeshObstructed ? '#C59B27' : '#FFFFFF'}
                      stroke="#C59B27"
                      strokeWidth="2.5"
                      className="dark:fill-[#1E2632]"
                    />
                    <text
                      textAnchor="middle"
                      y="4"
                      fill={isMeshObstructed ? '#FFFFFF' : '#1E2229'}
                      className="dark:fill-white"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Relay 1
                    </text>
                    <text textAnchor="middle" y="34" fill="#7C6C57" className="dark:fill-[#9BA3AF]" fontSize="9">
                      In-Wall Mesh Hop
                    </text>
                  </g>

                  {/* Living Room Node (450, 190) */}
                  <g transform="translate(450, 190)">
                    <circle r="28" fill="#FFFFFF" stroke="#0F4C81" strokeWidth="3" className="dark:fill-[#1E2632]" />
                    <text textAnchor="middle" y="4" fill="#1E2229" className="dark:fill-white" fontSize="10" fontWeight="bold">
                      Living
                    </text>
                    <text textAnchor="middle" y="44" fill="#1E2229" className="dark:fill-white" fontSize="11" fontWeight="bold">
                      Thermostatic Keypad
                    </text>
                  </g>

                  {/* Endpoint 1: Curtains (680, 100) */}
                  <g transform="translate(680, 100)">
                    <circle r="22" fill="#FFFFFF" stroke="#C59B27" strokeWidth="2" className="dark:fill-[#1E2632]" />
                    <text textAnchor="middle" y="4" fill="#1E2229" className="dark:fill-white" fontSize="9" fontWeight="bold">
                      Shades
                    </text>
                    <text textAnchor="middle" y="34" fill="#7C6C57" className="dark:fill-[#9BA3AF]" fontSize="9">
                      Motorized Track
                    </text>
                  </g>

                  {/* Endpoint 2: Chandelier (680, 190) */}
                  <g transform="translate(680, 190)">
                    <circle r="22" fill="#FFFFFF" stroke="#0F4C81" strokeWidth="2" className="dark:fill-[#1E2632]" />
                    <text textAnchor="middle" y="4" fill="#1E2229" className="dark:fill-white" fontSize="9" fontWeight="bold">
                      DALI
                    </text>
                    <text textAnchor="middle" y="34" fill="#7C6C57" className="dark:fill-[#9BA3AF]" fontSize="9">
                      Chandelier
                    </text>
                  </g>

                  {/* Endpoint 3: Thermostat (680, 280) */}
                  <g transform="translate(680, 280)">
                    <circle r="22" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" className="dark:fill-[#1E2632]" />
                    <text textAnchor="middle" y="4" fill="#1E2229" className="dark:fill-white" fontSize="9" fontWeight="bold">
                      HVAC
                    </text>
                    <text textAnchor="middle" y="34" fill="#7C6C57" className="dark:fill-[#9BA3AF]" fontSize="9">
                      VRV Modulator
                    </text>
                  </g>
                </svg>

                {/* Telemetry pill overlay */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white font-['JetBrains_Mono'] text-[11px] flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Mesh Health: 99.98%
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-[#E2BE58]">Packets: {packetCount}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-cyan-400">Latency: {isMeshObstructed ? '18ms (Detour)' : '11ms (Direct)'}</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* CONCEPT 2: SCENE ACTIVATION (MULTI-SYSTEM SYMPHONY) */}
          {/* ============================================================== */}
          {activeConceptTab === 'scenes' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] dark:border-[#242E3B]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#9E7A17] dark:text-[#E2BE58]">
                    <Layers className="w-4 h-4" />
                    <span>Synchronized Environmental Modulation: 'Private Cinema' Routine</span>
                  </div>
                  <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1E2229] dark:text-white mt-1">
                    Timeline-Based Scene Coordination
                  </h3>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] max-w-xl mt-0.5">
                    A single tap triggers a cascaded sequence of events across power, lighting, shading, HVAC, and acoustics. Scrub or play the timeline to watch the synchronized physical response.
                  </p>
                </div>

                {/* Timeline Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingScene(!isPlayingScene)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#182330] via-[#0F4C81] to-[#1C3B5E] hover:from-[#C59B27] hover:to-[#9E7A17] transition-all cursor-pointer shadow"
                  >
                    {isPlayingScene ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlayingScene ? 'Pause Sequence' : 'Play Sequence'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlayingScene(false);
                      setSceneProgress(0);
                    }}
                    className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#1E2632] border border-[#DDD3C4] dark:border-[#2B3544] text-[#7C6C57] dark:text-white hover:text-[#C59B27] cursor-pointer"
                    title="Reset Timeline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Real Cinema Architecture Photography */}
              <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden border border-[#EAE2D5] dark:border-[#2C3848] shadow-md group">
                <img
                  src="/assets/web/home_theatre_cinema.jpg"
                  alt="Real Dolby Atmos Private Cinema Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-['JetBrains_Mono']">
                  <span className="font-bold text-[#E2BE58]">
                    Private Screening Mode · Dolby Atmos
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px]">
                    Curtains: Closed · Lights: 10% · Audio: Atmos 7.2.4
                  </span>
                </div>
              </div>

              {/* Interactive Timeline Scrubber */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#9E7A17] dark:text-[#E2BE58] font-bold">
                    Timeline Progression: {(sceneProgress * 0.02).toFixed(1)}s elapsed
                  </span>
                  <span className="text-[#7C6C57] dark:text-[#9BA3AF]">
                    {sceneProgress}% Complete
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sceneProgress}
                  onChange={(e) => {
                    setIsPlayingScene(false);
                    setSceneProgress(Number(e.target.value));
                  }}
                  className="w-full accent-[#C59B27] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>

              {/* 5-Step Visualizer Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  {
                    step: 'T+0.0s',
                    title: '1. User Intent',
                    desc: "Wall Keypad 'Movie' button pressed",
                    icon: Tv,
                    activeAt: 10,
                  },
                  {
                    step: 'T+0.4s',
                    title: '2. DALI Lighting',
                    desc: 'Chandeliers fade to 10% cove glow',
                    icon: Sun,
                    activeAt: 30,
                  },
                  {
                    step: 'T+0.8s',
                    title: '3. Motorized Shades',
                    desc: 'Blackout velvet curtains glide closed',
                    icon: Maximize2,
                    activeAt: 55,
                  },
                  {
                    step: 'T+1.2s',
                    title: '4. Climate VRV',
                    desc: 'AC setpoint lowers to 21.5°C silent mode',
                    icon: Thermometer,
                    activeAt: 75,
                  },
                  {
                    step: 'T+1.8s',
                    title: '5. Audio Cinema',
                    desc: 'Dolby Atmos 7.2.4 surround initializes',
                    icon: ShieldCheck,
                    activeAt: 95,
                  },
                ].map((item, idx) => {
                  const isPast = sceneProgress >= item.activeAt;
                  const isCurrent =
                    sceneProgress >= item.activeAt - 20 && sceneProgress < item.activeAt + 10;
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#C59B27]/10 dark:bg-[#C59B27]/20 border-[#C59B27] ring-2 ring-[#C59B27]/40 scale-[1.03]'
                          : isPast
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-[#FAF7F2] dark:bg-[#18202A] border-[#DDD3C4] dark:border-[#273240] opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#9E7A17] dark:text-[#E2BE58]">
                          {item.step}
                        </span>
                        {isPast ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Icon className="w-4 h-4 text-[#7C6C57] dark:text-[#9BA3AF]" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#1E2229] dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#5C5040] dark:text-[#9BA3AF] mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* CONCEPT 3: INSTANT REMOTE CONTROL (LAN VS ENCRYPTED CLOUD) */}
          {/* ============================================================== */}
          {activeConceptTab === 'remote' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE2D5] dark:border-[#242E3B]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4C81] dark:text-[#38BDF8]">
                    <Smartphone className="w-4 h-4" />
                    <span>Instant Local LAN vs Global Encrypted Cloud Handshake</span>
                  </div>
                  <h3 className="font-['Cinzel'] text-2xl font-bold text-[#1E2229] dark:text-white mt-1">
                    Direct Response Anywhere in the World
                  </h3>
                  <p className="text-xs text-[#7C6C57] dark:text-[#9BA3AF] max-w-xl mt-0.5">
                    Whether connected to home Wi-Fi or travelling abroad on 5G mobile data, commands reach your residence securely in milliseconds.
                  </p>
                </div>

                {/* Network Mode Switcher */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#FAF7F2] dark:bg-[#18202A] border border-[#DDD3C4] dark:border-[#273240]">
                  <button
                    onClick={() => setRemoteMode('local')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      remoteMode === 'local'
                        ? 'bg-[#0F4C81] text-white shadow'
                        : 'text-[#5C5040] dark:text-[#9BA3AF] hover:text-[#1E2229]'
                    }`}
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Local Home Wi-Fi (&lt;10ms)</span>
                  </button>

                  <button
                    onClick={() => setRemoteMode('cloud')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      remoteMode === 'cloud'
                        ? 'bg-[#C59B27] text-white shadow'
                        : 'text-[#5C5040] dark:text-[#9BA3AF] hover:text-[#1E2229]'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Remote Cloud / 5G (&lt;50ms)</span>
                  </button>
                </div>
              </div>

              {/* Side-by-Side: Smartphone Mockup on Left vs Residence Response on Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left: Luxury Smartphone Controller Mockup (md:col-span-5) */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-72 rounded-[2.5rem] bg-[#12161B] p-4 ring-8 ring-slate-800 shadow-2xl text-white">
                    {/* Phone speaker notch */}
                    <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    </div>

                    {/* App Header inside phone */}
                    <div className="pb-3 border-b border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-['Cinzel'] font-bold text-sm block">ORBi Mobile</span>
                        <span className="text-[10px] text-[#E2BE58]">
                          {remoteMode === 'local' ? '● Local LAN Linked' : '● TLS 1.3 Cloud Secure'}
                        </span>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-slate-400">
                        {remoteMode === 'local' ? '8ms' : '42ms'}
                      </span>
                    </div>

                    {/* Phone Interactive Control Buttons */}
                    <div className="py-4 space-y-2.5">
                      <button
                        onClick={() => triggerRemoteCommand('chandelier')}
                        className={`w-full p-3 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          simulatedDeviceStates.chandelier ? 'bg-[#C59B27]/20 border border-[#C59B27]' : 'bg-slate-800/80 border border-slate-700'
                        }`}
                      >
                        <span className="font-semibold">Living Chandelier</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#E2BE58]">
                          {simulatedDeviceStates.chandelier ? 'ON (80%)' : 'OFF'}
                        </span>
                      </button>

                      <button
                        onClick={() => triggerRemoteCommand('curtains')}
                        className={`w-full p-3 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          simulatedDeviceStates.curtainsOpen ? 'bg-[#0F4C81]/20 border border-[#0F4C81]' : 'bg-slate-800/80 border border-slate-700'
                        }`}
                      >
                        <span className="font-semibold">Terrace Curtains</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-sky-400">
                          {simulatedDeviceStates.curtainsOpen ? 'OPEN (85%)' : 'CLOSED'}
                        </span>
                      </button>

                      <button
                        onClick={() => triggerRemoteCommand('lock')}
                        className={`w-full p-3 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          simulatedDeviceStates.doorLocked ? 'bg-emerald-950/40 border border-emerald-500' : 'bg-rose-950/40 border border-rose-500'
                        }`}
                      >
                        <span className="font-semibold">Front Door Lock</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-emerald-400">
                          {simulatedDeviceStates.doorLocked ? 'LOCKED' : 'UNLOCKED'}
                        </span>
                      </button>

                      <button
                        onClick={() => triggerRemoteCommand('ac')}
                        className="w-full p-3 rounded-xl flex items-center justify-between text-xs bg-slate-800/80 border border-slate-700 cursor-pointer"
                      >
                        <span className="font-semibold">Master AC Setpoint</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-cyan-400">
                          {simulatedDeviceStates.acTemp}°C
                        </span>
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-slate-400 pb-2">
                      Tap any button above to test handshake
                    </p>
                  </div>
                </div>

                {/* Right: Real Residence Actuation Response (md:col-span-7) */}
                <div className="md:col-span-7 space-y-5">
                  {/* Real Smart Living Space Photograph responding to remote control */}
                  <div className="relative h-48 sm:h-52 rounded-xl overflow-hidden border border-[#EAE2D5] dark:border-[#2C3848] shadow-md group">
                    <img
                      src="/assets/web/smart_living_lighting.jpg"
                      alt="Real Wireless Smart Home Remote Operation"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-['JetBrains_Mono']">
                      <span className="font-bold text-[#E2BE58]">
                        Living Suite · Instant Remote Sync
                      </span>
                      <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px]">
                        {remoteMode === 'local' ? '● Local LAN Linked' : '● Cloud WebSocket'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#FAF7F2] dark:bg-[#1A222D] border border-[#DDD3C4] dark:border-[#273241] space-y-3">
                    <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-bold">
                      Transmission Tunnel Status
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1E2229] dark:text-white">
                          {remoteMode === 'local' ? 'Direct LAN Zero-Hop Connection' : 'End-to-End Encrypted Cloud WebSocket'}
                        </h4>
                        <p className="text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                          {remoteMode === 'local'
                            ? 'Bypasses the internet entirely. Instantaneous sub-10ms response on your domestic Wi-Fi network.'
                            : 'AES-256 encrypted tunnel routed through Orbi secure cloud cluster with mutual TLS certificate validation.'}
                        </p>
                      </div>
                    </div>

                    {/* Animated Transmission Indicator */}
                    <div className="pt-2 border-t border-[#EAE2D5] dark:border-[#26313F] flex items-center justify-between text-xs font-['JetBrains_Mono']">
                      <span className="text-[#5C5040] dark:text-[#9BA3AF]">
                        Signal State:{' '}
                        <strong className="text-[#1E2229] dark:text-white capitalize">
                          {remoteSignalState === 'transmitting'
                            ? '⚡ Dispatching Telegram...'
                            : remoteSignalState === 'executed'
                            ? '✓ Acknowledged & Actuated'
                            : 'Idle (Standby)'}
                        </strong>
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {remoteMode === 'local' ? 'Roundtrip: 8ms' : 'Roundtrip: 42ms'}
                      </span>
                    </div>
                  </div>

                  {/* Physical Hardware State Readout */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-['JetBrains_Mono']">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F]">
                      <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                        Living Chandelier
                      </span>
                      <span className="font-bold text-[#1E2229] dark:text-white">
                        {simulatedDeviceStates.chandelier ? '80% Warm Lumens' : '0% Off'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F]">
                      <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                        Motorized Drapery
                      </span>
                      <span className="font-bold text-[#C59B27]">
                        {simulatedDeviceStates.curtainsOpen ? 'Open (85%)' : 'Closed (0%)'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F]">
                      <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                        Front Door Mortise
                      </span>
                      <span className={`font-bold ${simulatedDeviceStates.doorLocked ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {simulatedDeviceStates.doorLocked ? 'Deadbolt Secured' : 'Unlocked'}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-white dark:bg-[#151C25] border border-[#EAE2D5] dark:border-[#26313F]">
                      <span className="block text-[10px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                        VRV AC Thermostat
                      </span>
                      <span className="font-bold text-[#0F4C81] dark:text-[#38BDF8]">
                        {simulatedDeviceStates.acTemp}.0°C Steady
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
