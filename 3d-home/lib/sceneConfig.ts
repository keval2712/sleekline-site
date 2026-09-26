// lib/sceneConfig.ts

export const SCENE_CONFIG = {
  ceiling: {
    width: 9,
    depth: 7,
    height: 3.4,
    slatCount: 36,
    slatWidth: 0.10,
    slatHeight: 0.038,
    slatGap: 0.055,
    slatLength: 9,
  },
  frame: {
    channelWidth: 0.035,
    channelHeight: 0.055,
    channelCount: 5,
    rodCount: 6,
    rodLength: 0.32,
    rodRadius: 0.007,
  },
  camera: {
    initial:  { x: 0.0,  y: 1.5, z: 7.5, lx: 0, ly: 2.6, lz: 0 },
    mid:      { x: -1.2, y: 1.9, z: 6.5, lx: 0, ly: 2.9, lz: 0 },
    final:    { x: 0.5,  y: 2.2, z: 5.8, lx: 0, ly: 3.1, lz: 0 },
  },
  timeline: {
    rodsStart: 0.08,    rodsEnd: 0.20,
    frameStart: 0.18,   frameEnd: 0.32,
    secondaryStart: 0.30, secondaryEnd: 0.42,
    slatsStart: 0.40,   slatsEnd: 0.78,
    edgesStart: 0.76,   edgesEnd: 0.88,
    lightsStart: 0.86,  lightsEnd: 0.94,
    finalStart: 0.93,   finalEnd: 1.00,
  },
  colors: {
    wood1: 0xb87840,
    wood2: 0xa06830,
    wood3: 0xc89050,
    metal: 0x7a8090,
    metalDark: 0x555b66,
    concrete: 0xc0bbb5,
    sky: 0xd4e8f0,
    edgeTrim: 0x6a7080,
    light: 0xfff3d0,
  },
};

export interface SlatData {
  x: number; y: number; z: number; index: number;
}

export function getSlatPositions(): SlatData[] {
  const { slatCount, slatGap, slatWidth, height } = SCENE_CONFIG.ceiling;
  const totalSpan = slatCount * (slatWidth + slatGap) - slatGap;
  const startZ = -totalSpan / 2;
  return Array.from({ length: slatCount }, (_, i) => ({
    x: 0,
    y: height,
    z: startZ + i * (slatWidth + slatGap) + slatWidth / 2,
    index: i,
  }));
}

export function getSlatFinalY(): number {
  const { height } = SCENE_CONFIG.ceiling;
  const { rodLength, channelHeight, slatHeight } = { ...SCENE_CONFIG.frame, slatHeight: SCENE_CONFIG.ceiling.slatHeight };
  return height - rodLength - channelHeight - slatHeight / 2 - 0.01;
}

export function getSlatInstallProgress(index: number, total: number): number {
  const { slatsStart, slatsEnd } = SCENE_CONFIG.timeline;
  return slatsStart + (index / (total - 1)) * (slatsEnd - slatsStart);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export function inverseLerp(min: number, max: number, val: number): number {
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}

export function easeOut(t: number, power = 3): number {
  return 1 - Math.pow(1 - t, power);
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
