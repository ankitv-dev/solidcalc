import type { LengthUnit } from "../units/conversion";
import { toMillimeters } from "../units/conversion";
import { calculateConcrete, type ConcreteInput } from "./concrete";
import { calculateMaterials } from "./slab";

export type FootingType = "continuous" | "square" | "circular";

export interface FootingInput {
  type: FootingType;
  length: number;
  width: number;
  depth: number;
  diameter: number;
  count: number;
  unit: LengthUnit;
  wastage: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export function calculateFooting(input: FootingInput) {
  let totalVolumeM3 = 0;

  if (input.type === "continuous") {
    const concreteInput: ConcreteInput = {
      length: input.length,
      width: input.width,
      depth: input.depth,
      unit: input.unit,
      wastage: input.wastage,
      region: input.region,
    };
    const result = calculateConcrete(concreteInput);
    totalVolumeM3 = result.volumeM3;
  } else if (input.type === "square") {
    const lMm = toMillimeters(input.length, input.unit);
    const wMm = toMillimeters(input.width, input.unit);
    const dMm = toMillimeters(input.depth, input.unit);
    totalVolumeM3 = (lMm * wMm * dMm) / 1e9 * input.count;
  } else if (input.type === "circular") {
    const dMm = toMillimeters(input.diameter, input.unit);
    const depMm = toMillimeters(input.depth, input.unit);
    const radius = dMm / 2;
    totalVolumeM3 = (Math.PI * radius * radius * depMm) / 1e9 * input.count;
  }

  const wastageFactor = 1 + input.wastage / 100;
  totalVolumeM3 *= wastageFactor;

  const materials = calculateMaterials(totalVolumeM3);

  return {
    volumeM3: totalVolumeM3,
    materials,
    display: {
      volumeM3: totalVolumeM3.toFixed(2),
      ...materials.display,
    },
  };
}
