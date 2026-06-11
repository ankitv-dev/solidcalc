import type { LengthUnit } from "../units/conversion";
import { toMillimeters } from "../units/conversion";
import { calculateConcrete, type ConcreteInput, type ConcreteOutput } from "./concrete";

export interface SlabInput {
  length: number;
  width: number;
  thickness: number;
  unit: LengthUnit;
  wastage: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export interface MaterialQuantities {
  cementKg: number;
  sandKg: number;
  aggregateKg: number;
  waterLiters: number;
  cementBags: number;
  display: Record<string, string>;
}

const MIX_RATIO = { cement: 1, sand: 1.5, aggregate: 3 };
const WATER_CEMENT_RATIO = 0.5;
const CEMENT_DENSITY = 1440;

export function calculateMaterials(volumeM3: number): MaterialQuantities {
  const totalParts = MIX_RATIO.cement + MIX_RATIO.sand + MIX_RATIO.aggregate;
  const dryVolume = volumeM3 * 1.54;

  const cementVol = (MIX_RATIO.cement / totalParts) * dryVolume;
  const sandVol = (MIX_RATIO.sand / totalParts) * dryVolume;
  const aggregateVol = (MIX_RATIO.aggregate / totalParts) * dryVolume;

  const cementKg = cementVol * CEMENT_DENSITY;
  const sandKg = sandVol * 1600;
  const aggregateKg = aggregateVol * 1500;
  const waterLiters = cementKg * WATER_CEMENT_RATIO;
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

export function calculateSlab(input: SlabInput): {
  concrete: ConcreteOutput;
  materials: MaterialQuantities;
} {
  const concreteInput: ConcreteInput = {
    length: input.length,
    width: input.width,
    depth: input.thickness,
    unit: input.unit,
    wastage: input.wastage,
    region: input.region,
  };
  const concrete = calculateConcrete(concreteInput);
  const materials = calculateMaterials(concrete.volumeM3);
  return { concrete, materials };
}
