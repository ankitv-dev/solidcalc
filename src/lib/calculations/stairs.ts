import type { LengthUnit } from "../units/conversion";
import { toMillimeters, fromMillimeters } from "../units/conversion";
import { calculateMaterials } from "./slab";

export interface StairsInput {
  totalRise: number;
  treadDepth: number;
  riserHeight: number;
  stairWidth: number;
  unit: LengthUnit;
  wastage: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export function calculateStairs(input: StairsInput) {
  const totalRiseMm = toMillimeters(input.totalRise, input.unit);
  const riserMm = toMillimeters(input.riserHeight, input.unit);
  const treadMm = toMillimeters(input.treadDepth, input.unit);
  const widthMm = toMillimeters(input.stairWidth, input.unit);

  const numberOfSteps = Math.round(totalRiseMm / riserMm);
  const actualRiser = totalRiseMm / numberOfSteps;

  const waistMm = Math.max(100, riserMm * 0.4);
  const landingThickness = waistMm;

  const stepVolume = (treadMm * actualRiser / 2 + treadMm * waistMm) * widthMm;
  const totalStepsVolume = stepVolume * numberOfSteps;

  const landingLength = treadMm * 1.5;
  const landingVolume = landingLength * widthMm * landingThickness;

  let volumeMm3 = totalStepsVolume + landingVolume;
  let volumeM3 = volumeMm3 / 1e9;
  const wastageFactor = 1 + input.wastage / 100;
  volumeM3 *= wastageFactor;

  const materials = calculateMaterials(volumeM3);

  return {
    numberOfSteps,
    actualRiser: fromMillimeters(actualRiser, input.unit),
    actualTread: fromMillimeters(treadMm, input.unit),
    volumeM3,
    materials,
    display: {
      numberOfSteps: String(numberOfSteps),
      actualRiser: fromMillimeters(actualRiser, input.unit).toFixed(1),
      actualTread: fromMillimeters(treadMm, input.unit).toFixed(1),
      volumeM3: volumeM3.toFixed(2),
      ...materials.display,
    },
  };
}
