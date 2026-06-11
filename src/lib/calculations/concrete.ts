import type { LengthUnit, Region } from "../units/conversion";
import { toMillimeters, fromMillimeters, displayValue, REGION_CONFIGS } from "../units/conversion";

export interface ConcreteInput {
  length: number;
  width: number;
  depth: number;
  unit: LengthUnit;
  wastage: number;
  region: Region;
}

export interface ConcreteOutput {
  volumeM3: number;
  volumeFt3: number;
  volumeYd3: number;
  volumeLiters: number;
  weightKg: number;
  weightLbs: number;
  bagsRequired: number;
  bagSize: number;
  bagUnit: string;
  display: Record<string, string>;
}

export function calculateConcrete(input: ConcreteInput): ConcreteOutput {
  const lMm = toMillimeters(input.length, input.unit);
  const wMm = toMillimeters(input.width, input.unit);
  const dMm = toMillimeters(input.depth, input.unit);

  let volumeMm3 = lMm * wMm * dMm;
  let volumeM3 = volumeMm3 / 1e9;
  let wastageFactor = 1 + input.wastage / 100;
  volumeM3 *= wastageFactor;

  const volumeFt3 = volumeM3 / 0.0283168;
  const volumeYd3 = volumeM3 / 0.764555;
  const volumeLiters = volumeM3 * 1000;
  const weightKg = volumeM3 * 2400;
  const weightLbs = weightKg * 2.20462;

  const config = REGION_CONFIGS[input.region];
  const bagsRequired = weightKg / config.bagSize;

  return {
    volumeM3,
    volumeFt3,
    volumeYd3,
    volumeLiters,
    weightKg,
    weightLbs,
    bagsRequired: Math.ceil(bagsRequired),
    bagSize: config.bagSize,
    bagUnit: config.bagUnit,
    display: {
      volumeM3: displayValue(volumeM3),
      volumeFt3: displayValue(volumeFt3),
      volumeYd3: displayValue(volumeYd3, 3),
      volumeLiters: displayValue(volumeLiters),
      weightKg: displayValue(weightKg),
      weightLbs: displayValue(weightLbs),
      bagsRequired: String(Math.ceil(bagsRequired)),
    },
  };
}
