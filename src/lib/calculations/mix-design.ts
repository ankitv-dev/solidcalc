export type MixGrade = "M10" | "M15" | "M20" | "M25" | "M30" | "custom";

export interface MixRatio {
  cement: number;
  sand: number;
  aggregate: number;
}

export const MIX_RATIOS: Record<string, MixRatio> = {
  M10: { cement: 1, sand: 3, aggregate: 6 },
  M15: { cement: 1, sand: 2, aggregate: 4 },
  M20: { cement: 1, sand: 1.5, aggregate: 3 },
  M25: { cement: 1, sand: 1, aggregate: 2 },
  M30: { cement: 1, sand: 0.75, aggregate: 1.5 },
};

export interface MixDesignInput {
  grade: MixGrade;
  customRatio?: MixRatio;
  volumeM3: number;
  waterCementRatio: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export interface MixDesignOutput {
  cementKg: number;
  sandKg: number;
  aggregateKg: number;
  waterLiters: number;
  cementBags: number;
  display: Record<string, string>;
}

const CEMENT_DENSITY = 1440;
const SAND_DENSITY = 1600;
const AGGREGATE_DENSITY = 1500;

const DEFAULT_WATER_CEMENT_RATIOS: Record<string, number> = {
  M10: 0.6,
  M15: 0.55,
  M20: 0.5,
  M25: 0.45,
  M30: 0.4,
};

export function calculateMixDesign(input: MixDesignInput): MixDesignOutput {
  const ratio =
    input.grade === "custom" && input.customRatio
      ? input.customRatio
      : MIX_RATIOS[input.grade] || MIX_RATIOS.M20;

  const wcRatio =
    input.grade === "custom"
      ? input.waterCementRatio
      : input.waterCementRatio || DEFAULT_WATER_CEMENT_RATIOS[input.grade] || 0.5;

  const totalParts = ratio.cement + ratio.sand + ratio.aggregate;
  const dryVolume = input.volumeM3 * 1.54;

  const cementVol = (ratio.cement / totalParts) * dryVolume;
  const sandVol = (ratio.sand / totalParts) * dryVolume;
  const aggregateVol = (ratio.aggregate / totalParts) * dryVolume;

  const cementKg = cementVol * CEMENT_DENSITY;
  const sandKg = sandVol * SAND_DENSITY;
  const aggregateKg = aggregateVol * AGGREGATE_DENSITY;
  const waterLiters = cementKg * wcRatio;
  const cementBags = cementKg / 50;

  return {
    cementKg,
    sandKg,
    aggregateKg,
    waterLiters,
    cementBags: Math.ceil(cementBags),
    display: {
      cementKg: cementKg.toFixed(1),
      sandKg: sandKg.toFixed(1),
      aggregateKg: aggregateKg.toFixed(1),
      waterLiters: waterLiters.toFixed(1),
      cementBags: String(Math.ceil(cementBags)),
    },
  };
}
