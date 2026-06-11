import { MIX_RATIOS } from "./mix-design";

export interface MaterialInput {
  volumeM3: number;
  ratio: "1:1.5:3" | "1:2:4" | "1:3:6" | "1:1:2" | "1:0.75:1.5" | "custom";
  customCement?: number;
  customSand?: number;
  customAggregate?: number;
}

const RATIO_MAP: Record<string, { cement: number; sand: number; aggregate: number }> = {
  "1:1.5:3": MIX_RATIOS.M20,
  "1:2:4": MIX_RATIOS.M15,
  "1:3:6": MIX_RATIOS.M10,
  "1:1:2": MIX_RATIOS.M25,
  "1:0.75:1.5": MIX_RATIOS.M30,
};

const CEMENT_DENSITY = 1440;
const SAND_DENSITY = 1600;
const AGGREGATE_DENSITY = 1500;

export function calculateMaterial(input: MaterialInput) {
  let ratio;
  if (input.ratio === "custom") {
    ratio = {
      cement: input.customCement || 1,
      sand: input.customSand || 1,
      aggregate: input.customAggregate || 1,
    };
  } else {
    ratio = RATIO_MAP[input.ratio] || RATIO_MAP["1:1.5:3"];
  }

  const totalParts = ratio.cement + ratio.sand + ratio.aggregate;
  const dryVolume = input.volumeM3 * 1.54;

  const cementVol = (ratio.cement / totalParts) * dryVolume;
  const sandVol = (ratio.sand / totalParts) * dryVolume;
  const aggregateVol = (ratio.aggregate / totalParts) * dryVolume;

  const cementKg = cementVol * CEMENT_DENSITY;
  const sandKg = sandVol * SAND_DENSITY;
  const aggregateKg = aggregateVol * AGGREGATE_DENSITY;
  const cementBags = cementKg / 50;

  return {
    cementKg,
    sandKg,
    aggregateKg,
    cementBags: Math.ceil(cementBags),
    display: {
      cementKg: cementKg.toFixed(1),
      sandKg: sandKg.toFixed(1),
      aggregateKg: aggregateKg.toFixed(1),
      cementBags: String(Math.ceil(cementBags)),
    },
  };
}
