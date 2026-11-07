import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Wifi,
  Radio,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
  Lightbulb,
  Maximize2,
  Lock,
  Unlock,
  Video,
  Activity,
  Thermometer,
  Camera,
  DoorOpen,
  Send,
  Info,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SMART_DEVICES, CONNECTIVITY_LINKS } from '../data/catalogData';
import { SmartDeviceNode, ProtocolType } from '../types';

export const DeviceConnectivityVisualizer: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType>('all');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('glass-keypad');
  const [hoveredDeviceId, setHoveredDeviceId] = useState<string | null>(null);
  const [isSimulatingSignal, setIsSimulatingSignal] = useState(false);
  const [isBurstPinging, setIsBurstPinging] = useState(false);

  const [simulatedDeviceState, setSimulatedDeviceState] = useState<Record<string, any>>({
    'glass-keypad': { power: true, level: 60, temp: 23.0 },
    'dali-lighting': { power: true, level: 65 },
    'motorized-curtains': { level: 85, state: 'Open (85%)' },
    'smart-door-lock': { locked: true },
    'sliding-gate': { state: 'Closed' },
    'presence-sensor': { detected: true },
    'climate-vrv': { temperature: 22.5, fan: 'Whisper 1' },
    'ip-surveillance': { recording: true, aiFilter: 'Human Verified' },
  });

  const selectedDevice = SMART_DEVICES.find((d) => d.id === selectedDeviceId) || SMART_DEVICES[0];
  const activeHoverDevice = hoveredDeviceId
    ? SMART_DEVICES.find((d) => d.id === hoveredDeviceId)
    : null;

  // Protocol filter logic
  const filteredDevices = SMART_DEVICES.filter((device) => {
    if (selectedProtocol === 'all') return true;
    if (selectedProtocol === 'knx') return device.protocol === 'knx';
    if (selectedProtocol === 'zigbee') return device.protocol === 'zigbee';
    if (selectedProtocol === 'wifi') return device.protocol === 'wifi';
    if (selectedProtocol === 'dali') return device.protocol === 'dali';
    return true;
  });

  const filteredLinks = CONNECTIVITY_LINKS.filter((link) => {
    if (selectedProtocol === 'all') return true;
    return link.protocol === selectedProtocol;
  });

  // Signal simulation trigger
  const handleSimulateSignal = () => {
    setIsSimulatingSignal(true);
    setTimeout(() => {
      setIsSimulatingSignal(false);
    }, 1800);
  };

  // Burst Ping to all devices
  const handleBurstPing = () => {
    setIsBurstPinging(true);
    setTimeout(() => {
      setIsBurstPinging(false);
    }, 2200);
  };

  // Toggle a device's physical simulated state
  const handleToggleState = (key: string, value: any) => {
    setSimulatedDeviceState((prev) => ({
      ...prev,
      [selectedDeviceId]: {
        ...prev[selectedDeviceId],
        [key]: value,
      },
    }));
    handleSimulateSignal();
  };

  // Helper to format live status label for hover badge
  const getLiveStatusLabel = (device: SmartDeviceNode) => {
    const st = simulatedDeviceState[device.id];
    if (device.id === 'dali-lighting') {
      return st?.power ? `Illuminated at ${st?.level || 65}%` : 'Circuit Off';
    }
    if (device.id === 'glass-keypad') {
      return `Backlight Active · ${st?.temp || 23.0}°C Sensor`;
    }
    if (device.id === 'smart-door-lock') {
      return st?.locked ? 'Deadbolt Secured' : 'Unlocked (Entry Granted)';
    }
    if (device.id === 'climate-vrv') {
      return `Cooling Setpoint: ${st?.temperature || 22.5}°C`;
    }
    if (device.id === 'motorized-curtains') {
      return `Drapery Position: ${st?.level || 85}%`;
    }
    if (device.id === 'ip-surveillance') {
      return '4K Stream Live · AI Human Filter Active';
    }
    if (device.id === 'sliding-gate') {
      return `Gate Motor: ${st?.state || 'Closed'}`;
    }
    return device.primaryMetric;
  };

  return (
    <section id="connectivity-map" className="py-20 bg-[#F5EFEB] dark:bg-[#0D1117] border-b border-[#E8DFD3] dark:border-[#202833] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#9E7A17] dark:text-[#E2BE58]">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive SVG Network Graphic</span>
          </div>
          <h2 className="font-['Cinzel'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] dark:text-white">
            Smart Device Connectivity Map
          </h2>
          <p className="text-sm sm:text-base text-[#615544] dark:text-[#9BA3AF]">
            Explore the physical and logical links unifying your residence. Hover over or click on any smart device (lights, thermostat, camera, lock, curtains, sensors) to inspect live telemetry and actuate hardware in real time.
          </p>
        </div>

        {/* Protocol Filter Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Protocols' },
              { id: 'knx', label: 'KNX Wired Bus' },
              { id: 'zigbee', label: 'Zigbee 3.0 Mesh' },
              { id: 'dali', label: 'DALI-2 Lighting' },
              { id: 'wifi', label: 'Wi-Fi 6 & IP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedProtocol(tab.id as ProtocolType)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedProtocol === tab.id
                    ? 'bg-[#1E2530] text-white ring-1 ring-[#C59B27] shadow'
                    : 'bg-white/80 dark:bg-[#161D26] text-[#554A3B] dark:text-[#CBD5E1] border border-[#DDD3C4] dark:border-[#283341] hover:bg-[#FAF7F2] dark:hover:bg-[#1E2632]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleBurstPing}
            disabled={isBurstPinging}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow transition-all cursor-pointer ${
              isBurstPinging
                ? 'bg-[#C59B27] animate-pulse cursor-wait'
                : 'bg-gradient-to-r from-[#182330] to-[#0F4C81] hover:from-[#C59B27] hover:to-[#9E7A17]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isBurstPinging ? 'Pinging All Nodes...' : 'Ping Entire Mesh'}</span>
          </button>
        </div>

        {/* Main Interactive Map & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Canvas Carrier (lg:col-span-8) */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#131922] border border-[#DDD3C4] dark:border-[#273240] p-4 sm:p-6 shadow-xl relative overflow-hidden">
            {/* Legend / Status ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#EAE2D5] dark:border-[#222B36] text-xs">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5 text-[#1E2229] dark:text-white font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F4C81]" />
                  KNX Wired Bus
                </span>
                <span className="flex items-center gap-1.5 text-[#1E2229] dark:text-white font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27]" />
                  Zigbee 3.0 Mesh
                </span>
                <span className="flex items-center gap-1.5 text-[#1E2229] dark:text-white font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  DALI-2 Lighting
                </span>
                <span className="flex items-center gap-1.5 text-[#1E2229] dark:text-white font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                  Wi-Fi / IP LAN
                </span>
              </div>

              <div className="font-['JetBrains_Mono'] text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                {filteredDevices.length} Connected Devices · 0 Packet Loss
              </div>
            </div>

            {/* The Responsive SVG Topology Map */}
            <div className="relative w-full aspect-[16/10] bg-[#FAF7F2] dark:bg-[#0E131A] rounded-xl border border-[#E8DFD3] dark:border-[#1E2632] overflow-hidden">
              <svg
                viewBox="0 0 950 580"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Architectural Grid Guidelines */}
                <defs>
                  <pattern id="grid-pattern-main" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#808080"
                      strokeWidth="0.5"
                      strokeOpacity="0.08"
                    />
                  </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#grid-pattern-main)" />

                {/* Living Area Zones Outline */}
                <rect
                  x="20"
                  y="20"
                  width="910"
                  height="540"
                  rx="16"
                  fill="none"
                  stroke="#C59B27"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="6 6"
                />

                {/* Room Labels */}
                <text x="50" y="55" fill="#887766" opacity="0.6" fontSize="11" fontWeight="bold" letterSpacing="2">
                  ESTATE PERIMETER & ENTRANCE
                </text>
                <text x="360" y="55" fill="#887766" opacity="0.6" fontSize="11" fontWeight="bold" letterSpacing="2">
                  CENTRAL RESIDENCE & LIVING SUITE
                </text>
                <text x="740" y="55" fill="#887766" opacity="0.6" fontSize="11" fontWeight="bold" letterSpacing="2">
                  TERRACE & UTILITIES
                </text>

                {/* Connectivity Splines / Links */}
                {filteredLinks.map((link, idx) => {
                  const source = SMART_DEVICES.find((d) => d.id === link.fromId);
                  const target = SMART_DEVICES.find((d) => d.id === link.toId);
                  if (!source || !target) return null;

                  const isLinkedToSelected =
                    source.id === selectedDeviceId || target.id === selectedDeviceId;
                  const isLinkedToHovered =
                    hoveredDeviceId && (source.id === hoveredDeviceId || target.id === hoveredDeviceId);

                  let strokeColor = '#C59B27';
                  if (link.protocol === 'knx') strokeColor = '#0F4C81';
                  if (link.protocol === 'dali') strokeColor = '#10B981';
                  if (link.protocol === 'wifi') strokeColor = '#8B5CF6';

                  // Calculate cubic Bezier curve control points
                  const midX = (source.x + target.x) / 2;
                  const midY = (source.y + target.y) / 2 - 20;
                  const pathData = `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`;

                  const shouldHighlight = isLinkedToSelected || isLinkedToHovered || isBurstPinging;

                  return (
                    <g key={`link-${idx}`}>
                      {/* Background Path */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={shouldHighlight ? '3.5' : '1.5'}
                        strokeOpacity={shouldHighlight ? '0.9' : '0.35'}
                        strokeLinecap="round"
                      />

                      {/* Animated traveling data packet particles */}
                      {(shouldHighlight || isSimulatingSignal) && (
                        <path
                          d={pathData}
                          fill="none"
                          stroke={isLinkedToHovered ? '#38BDF8' : shouldHighlight ? '#F59E0B' : strokeColor}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="animate-pulse-flow"
                          strokeDasharray="6 12"
                        />
                      )}
                    </g>
                  );
                })}

                {/* SVG Device Nodes */}
                {filteredDevices.map((device) => {
                  const isSelected = device.id === selectedDeviceId;
                  const isHovered = device.id === hoveredDeviceId;

                  let badgeColor = '#0F4C81';
                  if (device.protocol === 'zigbee') badgeColor = '#C59B27';
                  if (device.protocol === 'dali') badgeColor = '#10B981';
                  if (device.protocol === 'wifi') badgeColor = '#8B5CF6';

                  return (
                    <g
                      key={device.id}
                      transform={`translate(${device.x}, ${device.y})`}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredDeviceId(device.id)}
                      onMouseLeave={() => setHoveredDeviceId(null)}
                      onClick={() => {
                        setSelectedDeviceId(device.id);
                        handleSimulateSignal();
                      }}
                    >
                      {/* Outer pulse wave if active or selected or hovered */}
                      {(isSelected || isHovered || isBurstPinging) && (
                        <circle
                          r="34"
                          fill="none"
                          stroke={isHovered ? '#38BDF8' : badgeColor}
                          strokeWidth="2"
                          strokeOpacity="0.7"
                          className="animate-ripple"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={isSelected || isHovered ? 26 : 22}
                        fill={isSelected ? '#1E2530' : isHovered ? '#FAF7F2' : '#FFFFFF'}
                        stroke={isSelected ? '#C59B27' : isHovered ? '#38BDF8' : badgeColor}
                        strokeWidth={isSelected || isHovered ? 3.5 : 2}
                        className="transition-all duration-200 drop-shadow-md"
                      />

                      {/* Inner Protocol Indicator Ring */}
                      <circle
                        r="6"
                        cx="16"
                        cy="-16"
                        fill={badgeColor}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />

                      {/* Node Label Text */}
                      <text
                        y="38"
                        textAnchor="middle"
                        fill="#1E2229"
                        className="dark:fill-white font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-tight pointer-events-none"
                      >
                        {device.name.length > 22 ? `${device.name.slice(0, 20)}...` : device.name}
                      </text>

                      {/* Room Subtext */}
                      <text
                        y="50"
                        textAnchor="middle"
                        fill="#7C6C57"
                        className="dark:fill-[#9BA3AF] font-['JetBrains_Mono'] text-[9px] pointer-events-none uppercase"
                      >
                        {device.room}
                      </text>

                      {/* On-SVG Floating Hover Tooltip Badge */}
                      {isHovered && (
                        <g transform="translate(0, -52)" className="animate-in fade-in zoom-in-95 duration-150">
                          <rect
                            x="-110"
                            y="-28"
                            width="220"
                            height="44"
                            rx="8"
                            fill="#12161B"
                            stroke="#C59B27"
                            strokeWidth="1.2"
                            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                          />
                          <text
                            x="0"
                            y="-12"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="10"
                            fontWeight="bold"
                            className="font-['Cinzel']"
                          >
                            {device.name}
                          </text>
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#E2BE58"
                            fontSize="9"
                            className="font-['JetBrains_Mono']"
                          >
                            {getLiveStatusLabel(device)}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Floating Instructions Pill inside SVG */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white text-[11px] font-['JetBrains_Mono'] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#E2BE58]" />
                <span>
                  {activeHoverDevice
                    ? `Hovering: ${activeHoverDevice.name} · ${getLiveStatusLabel(activeHoverDevice)}`
                    : 'Hover over or click any smart device to see live status and functions'}
                </span>
              </div>
            </div>
          </div>

          {/* Device Inspector & Control Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#131922] border border-[#DDD3C4] dark:border-[#273240] p-6 shadow-xl space-y-5">
            {/* Real Hardware Photograph from Catalog */}
            <div className="relative h-36 rounded-xl overflow-hidden border border-[#E8DFD3] dark:border-[#2C3746] shadow-inner group">
              <img
                src={`/assets/catalog/page_${String(selectedDevice.catalogPage).padStart(2, '0')}.png`}
                alt={selectedDevice.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-['JetBrains_Mono']">
                <span className="font-bold text-[#E2BE58]">Real Hardware · Page {selectedDevice.catalogPage}</span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">{selectedDevice.protocol.toUpperCase()}</span>
              </div>
            </div>

            {/* Card Header with Protocol Chip */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#EAE2D5] dark:border-[#222B36]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E7A17] dark:text-[#E2BE58] font-['JetBrains_Mono']">
                  {selectedDevice.room}
                </span>
                <h3 className="font-['Cinzel'] text-xl font-bold text-[#1E2229] dark:text-white mt-0.5">
                  {selectedDevice.name}
                </h3>
              </div>

              <span className="px-2.5 py-1 rounded text-xs font-['JetBrains_Mono'] font-bold uppercase tracking-wider bg-[#0F4C81] text-white">
                {selectedDevice.protocol.toUpperCase()}
              </span>
            </div>

            {/* Live Status Callout */}
            <div className="p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#19222E] border border-[#EAE2D5] dark:border-[#26313F] text-xs font-['JetBrains_Mono'] flex items-center justify-between">
              <span className="text-[#7C6C57] dark:text-[#9BA3AF]">Live Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {getLiveStatusLabel(selectedDevice)}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#574D3F] dark:text-[#CBD5E1] leading-relaxed">
              {selectedDevice.description}
            </p>

            {/* Interactive Physical Controls for this Device */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#18202A] border border-[#E4DACD] dark:border-[#26313F] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C6C57] dark:text-[#9BA3AF] block font-['JetBrains_Mono']">
                Device Function & Actuation
              </span>

              {selectedDevice.id === 'glass-keypad' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E2229] dark:text-white">Capacitive Glass Backlight</span>
                    <button
                      onClick={() => handleToggleState('power', !simulatedDeviceState['glass-keypad']?.power)}
                      className="px-3 py-1 rounded text-xs font-bold bg-[#C59B27] text-white cursor-pointer"
                    >
                      {simulatedDeviceState['glass-keypad']?.power ? 'ACTIVE' : 'STANDBY'}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                      <span>Keypad Dim Level</span>
                      <span>{simulatedDeviceState['glass-keypad']?.level || 60}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={simulatedDeviceState['glass-keypad']?.level || 60}
                      onChange={(e) => handleToggleState('level', Number(e.target.value))}
                      className="w-full accent-[#C59B27] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {selectedDevice.id === 'dali-lighting' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E2229] dark:text-white">DALI-2 Chandelier Circuit</span>
                    <button
                      onClick={() => handleToggleState('power', !simulatedDeviceState['dali-lighting']?.power)}
                      className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                        simulatedDeviceState['dali-lighting']?.power
                          ? 'bg-[#10B981] text-white'
                          : 'bg-slate-400 text-white'
                      }`}
                    >
                      {simulatedDeviceState['dali-lighting']?.power ? 'LIT' : 'OFF'}
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#7C6C57] dark:text-[#9BA3AF]">
                      <span>Logarithmic Lux (Tunable White)</span>
                      <span>{simulatedDeviceState['dali-lighting']?.level || 65}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={simulatedDeviceState['dali-lighting']?.level || 65}
                      onChange={(e) => handleToggleState('level', Number(e.target.value))}
                      className="w-full accent-[#10B981] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {selectedDevice.id === 'smart-door-lock' && (
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="font-medium text-[#1E2229] dark:text-white">Stainless Mortise Bolt</span>
                  <button
                    onClick={() => handleToggleState('locked', !simulatedDeviceState['smart-door-lock']?.locked)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold cursor-pointer transition-colors ${
                      simulatedDeviceState['smart-door-lock']?.locked
                        ? 'bg-rose-700 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {simulatedDeviceState['smart-door-lock']?.locked ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>LOCKED</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>UNLOCKED</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {selectedDevice.id === 'climate-vrv' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E2229] dark:text-white">VRV Setpoint</span>
                    <span className="font-bold text-[#0F4C81] dark:text-[#38BDF8]">
                      {simulatedDeviceState['climate-vrv']?.temperature || 22.5}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleToggleState(
                          'temperature',
                          Math.max(18, (simulatedDeviceState['climate-vrv']?.temperature || 22.5) - 0.5)
                        )
                      }
                      className="flex-1 py-1 rounded bg-white dark:bg-[#202936] text-xs font-bold border border-[#DDD3C4] dark:border-[#2C3848] hover:bg-[#EAE2D5] cursor-pointer"
                    >
                      Cooler (-0.5°C)
                    </button>
                    <button
                      onClick={() =>
                        handleToggleState(
                          'temperature',
                          Math.min(28, (simulatedDeviceState['climate-vrv']?.temperature || 22.5) + 0.5)
                        )
                      }
                      className="flex-1 py-1 rounded bg-white dark:bg-[#202936] text-xs font-bold border border-[#DDD3C4] dark:border-[#2C3848] hover:bg-[#EAE2D5] cursor-pointer"
                    >
                      Warmer (+0.5°C)
                    </button>
                  </div>
                </div>
              )}

              {selectedDevice.id === 'motorized-curtains' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1E2229] dark:text-white">Curtain Position</span>
                    <span className="font-bold text-[#C59B27]">
                      {simulatedDeviceState['motorized-curtains']?.level || 85}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simulatedDeviceState['motorized-curtains']?.level || 85}
                    onChange={(e) => handleToggleState('level', Number(e.target.value))}
                    className="w-full accent-[#C59B27] cursor-pointer"
                  />
                </div>
              )}

              {selectedDevice.id !== 'glass-keypad' &&
                selectedDevice.id !== 'dali-lighting' &&
                selectedDevice.id !== 'smart-door-lock' &&
                selectedDevice.id !== 'climate-vrv' &&
                selectedDevice.id !== 'motorized-curtains' && (
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="font-medium text-[#1E2229] dark:text-white">Operational Telemetry</span>
                    <span className="font-['JetBrains_Mono'] text-emerald-600 dark:text-emerald-400 font-bold">
                      {selectedDevice.primaryMetric}
                    </span>
                  </div>
                )}

              {/* Transmit Test Signal Button */}
              <button
                onClick={handleSimulateSignal}
                disabled={isSimulatingSignal}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#1E2229] dark:text-white bg-white dark:bg-[#202A36] border border-[#DDD3C4] dark:border-[#2C3848] rounded-lg hover:border-[#C59B27] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>{isSimulatingSignal ? 'Transmitting Bus Telegram...' : 'Send Test Bus Telegram'}</span>
              </button>
            </div>

            {/* Technical Specifications from Catalog */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C6C57] dark:text-[#9BA3AF] block font-['JetBrains_Mono']">
                Hardware Engineering Specifications
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-['JetBrains_Mono']">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#242E3B]">
                  <span className="block text-[9px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Wiring / Cable
                  </span>
                  <span className="font-semibold text-[#1E2229] dark:text-white truncate block">
                    {selectedDevice.specDetails.wiring}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#242E3B]">
                  <span className="block text-[9px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Voltage
                  </span>
                  <span className="font-semibold text-[#1E2229] dark:text-white truncate block">
                    {selectedDevice.specDetails.voltage}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#242E3B]">
                  <span className="block text-[9px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Interface Standard
                  </span>
                  <span className="font-semibold text-[#1E2229] dark:text-white truncate block">
                    {selectedDevice.specDetails.interfaceType}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-[#18202A] border border-[#EAE2D5] dark:border-[#242E3B]">
                  <span className="block text-[9px] text-[#7C6C57] dark:text-[#9BA3AF] uppercase">
                    Bus Response Time
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                    {selectedDevice.specDetails.latency}
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
