export type ProtocolType = 'all' | 'knx' | 'zigbee' | 'wifi' | 'dali';

export interface SmartDeviceNode {
  id: string;
  name: string;
  category: 'lighting' | 'shades' | 'security' | 'climate' | 'entertainment' | 'infrastructure' | 'sensors';
  room: string;
  protocol: 'knx' | 'zigbee' | 'wifi' | 'dali';
  status: 'active' | 'idle' | 'triggered' | 'off';
  x: number;
  y: number;
  icon: string;
  primaryMetric: string;
  controlState: {
    power?: boolean;
    level?: number; // 0-100% (brightness, curtain position, volume)
    temperature?: number;
    locked?: boolean;
    mode?: string;
  };
  description: string;
  catalogPage: number;
  specDetails: {
    interfaceType: string;
    wiring: string;
    voltage: string;
    latency: string;
  };
  image?: string;
}

export interface ConnectivityLink {
  fromId: string;
  toId: string;
  protocol: 'knx' | 'zigbee' | 'wifi' | 'dali';
  signalQuality: number; // 0-100%
  description: string;
}

export interface AutomationFlowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  label: string;
  icon: string;
  detail: string;
  targetDevice?: string;
  actionValue?: string;
}

export interface AutomationFlowPreset {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  trigger: AutomationFlowStep;
  conditions: AutomationFlowStep[];
  actions: AutomationFlowStep[];
}

export interface LifestyleScene {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image?: string;
  roomPreset: {
    lighting: string;
    lightingLevel: number;
    curtains: string;
    curtainLevel: number;
    climate: string;
    temperature: number;
    audio: string;
    security: string;
    securityArmed: boolean;
  };
}

export interface CatalogProduct {
  id: string;
  page: number;
  category: string;
  title: string;
  headline: string;
  description: string;
  image?: string;
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
  specifications: string[];
  supportedProtocols: string[];
  recommendedUse: string;
}

export interface SensorItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  typicalTrigger: string;
  actuationExample: string;
}
